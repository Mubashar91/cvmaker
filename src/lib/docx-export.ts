import type { Paragraph as DocxParagraph } from "docx";
import { entrySections, hasEntry, isTextSection, sectionHasContent, sectionTitle, templateById, type CV, type Entry, type EntrySection, type Template } from "./model";

/** Templates whose PDF body text is serif by default (mirrors the PDF layouts). */
const SERIF_TEMPLATES: readonly Template[] = ["classic", "professional", "creative", "elegant", "academic", "editorial", "gazette", "heritage", "regent"];

// A4 in twentieths of a point, with 18 mm margins.
const PAGE = { width: 11_906, height: 16_838, margin: 1_020 };
const CONTENT_WIDTH = PAGE.width - PAGE.margin * 2;
const BULLETS = "cv-bullets";

const lines = (text: string) => text.replace(/\r\n?/g, "\n").split("\n").map(line => line.trim()).filter(Boolean);
const bulletText = (line: string) => line.replace(/^[•●▪*-]\s+/, "");
const isBulleted = (line: string) => /^[•●▪*-]\s+/.test(line);

/**
 * An editable Word version of the CV: one clean column with real headings, bullet lists, and
 * right-aligned dates. It follows the CV's section order, hidden sections, headings, accent
 * colour, and typeface, but not the template's graphic design, which is PDF-only.
 */
export async function generateDOCX(cv: CV): Promise<Blob> {
  const { AlignmentType, BorderStyle, Document, HeadingLevel, LevelFormat, Packer, Paragraph, Tab, TabStopType, TextRun } = await import("docx");
  const serif = cv.font ? cv.font === "serif" : SERIF_TEMPLATES.includes(cv.template);
  const font = serif ? "Cambria" : "Calibri";
  const accent = (cv.accent ?? templateById(cv.template).color).replace("#", "");
  const muted = "5C636C";
  const gap = cv.density === "compact" ? 0.75 : cv.density === "relaxed" ? 1.35 : 1;
  const space = (before: number, after: number) => ({ before: Math.round(before * gap), after: Math.round(after * gap) });

  /** "Label: a, b" lines keep a bold label, as in the PDF skill groups. */
  function labelledLine(line: string, bullet = false): DocxParagraph {
    const match = line.match(/^([^:]{1,40}):\s+(.+)$/);
    const children = match && !/^https?$/i.test(match[1]) ? [new TextRun({ text: `${match[1]}: `, bold: true }), new TextRun(match[2])] : [new TextRun(bullet ? bulletText(line) : line)];
    return new Paragraph({ children, spacing: space(0, 60), ...(bullet ? { numbering: { reference: BULLETS, level: 0 } } : {}) });
  }

  function description(text: string, key: EntrySection): DocxParagraph[] {
    const items = lines(text);
    const asList = key === "experience" || key === "projects" || items.some(isBulleted);
    return items.map(line => asList
      ? new Paragraph({ children: [new TextRun(bulletText(line))], numbering: { reference: BULLETS, level: 0 }, spacing: space(0, 40) })
      : new Paragraph({ children: [new TextRun(line)], spacing: space(0, 60) }));
  }

  function entry(item: Entry, key: EntrySection): DocxParagraph[] {
    const title = item.title.trim() || item.organization.trim();
    const organization = item.title.trim() ? item.organization.trim() : "";
    const dates = item.dates.trim();
    return [
      new Paragraph({
        keepNext: true, keepLines: true, spacing: space(140, organization ? 0 : 40),
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
        children: [new TextRun({ text: title, bold: true, size: 22 }), ...(dates ? [new TextRun({ children: [new Tab(), dates], color: muted, size: 19 })] : [])],
      }),
      ...(organization ? [new Paragraph({ keepNext: !!item.description.trim(), spacing: space(20, 50), children: [new TextRun({ text: organization, italics: true, color: accent })] })] : []),
      ...description(item.description, key),
    ];
  }

  const contact = [cv.personal.email, cv.personal.phone, cv.personal.location, cv.personal.website].map(value => value.trim()).filter(Boolean);
  const children: DocxParagraph[] = [];
  if (cv.personal.name.trim()) children.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun(cv.personal.name.trim())] }));
  if (cv.personal.headline.trim()) children.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: cv.personal.headline.trim(), color: accent, size: 24 })] }));
  if (contact.length) children.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: contact.join("  |  "), color: muted, size: 19 })] }));

  for (const key of cv.sectionOrder) {
    if (cv.hiddenSections.includes(key) || !sectionHasContent(cv, key)) continue;
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, keepNext: true, children: [new TextRun(sectionTitle(cv, key))] }));
    if (isTextSection(key)) {
      const textLines = lines(cv[key]);
      if (key === "summary") children.push(...textLines.map(line => new Paragraph({ children: [new TextRun(line)], spacing: space(0, 80) })));
      else children.push(...textLines.map(line => labelledLine(line, key === "additional" && isBulleted(line))));
    } else if ((entrySections as readonly string[]).includes(key)) {
      for (const item of cv[key].filter(hasEntry)) children.push(...entry(item, key));
    }
  }

  const document = new Document({
    creator: "Folio CV Maker",
    title: cv.personal.name.trim() ? `${cv.personal.name.trim()} CV` : "CV",
    styles: {
      default: {
        document: { run: { font, size: 21, color: "202329" }, paragraph: { spacing: { line: 264 } } },
        title: { run: { font, size: 40, bold: true, color: "202329" }, paragraph: { spacing: { after: 40 } } },
        heading1: {
          run: { font, size: 23, bold: true, color: accent, allCaps: true },
          paragraph: { spacing: space(280, 100), border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: accent, space: 2 } } },
        },
      },
    },
    numbering: { config: [{ reference: BULLETS, levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 340, hanging: 220 } } } }] }] },
    sections: [{ properties: { page: { size: { width: PAGE.width, height: PAGE.height }, margin: { top: PAGE.margin, right: PAGE.margin, bottom: PAGE.margin, left: PAGE.margin } } }, children }],
  });
  return Packer.toBlob(document);
}
