import type { Content, ContentText, TDocumentDefinitions } from "pdfmake/interfaces";
import { type CV, type Entry, type EntrySection, type Section, hasEntry, isTextSection, sectionHasContent, sectionTitle, templateById } from "./model";
import { type IconName, iconSVG } from "./pdf-icons";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const BODY_WIDTH = PAGE_WIDTH - MARGIN * 2;
const labels: Record<Section, string> = {
  summary: "Professional summary", experience: "Work experience", education: "Education",
  skills: "Skills", languages: "Languages", projects: "Projects", certifications: "Certifications",
  additional: "Additional information",
};

/** Mix two #rrggbb colours. `amount` is the share of `target` (0–1). */
export function mixColor(hex: string, target: string, amount: number): string {
  const a = parseInt(hex.slice(1), 16), b = parseInt(target.slice(1), 16);
  return "#" + [16, 8, 0].map(shift => {
    const value = Math.round(((a >> shift) & 255) * (1 - amount) + ((b >> shift) & 255) * amount);
    return value.toString(16).padStart(2, "0");
  }).join("");
}
const tint = (color: string, amount: number) => mixColor(color, "#ffffff", amount);

function initials(name: string): string {
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 3).map(part => Array.from(part)[0] ?? "").join("").toUpperCase();
}

// Layout constants for the newer templates.
const SIDEBAR = { left: 28, width: 152, gap: 36, right: 40 };
const SIDEBAR_FILL = SIDEBAR.left + SIDEBAR.width + SIDEBAR.gap / 2;
const TIMELINE = { gutter: 86, gap: 12, pad: 16 };
const TIMELINE_INDENT = TIMELINE.gutter + TIMELINE.gap + TIMELINE.pad;
const ATLAS = { left: 44, width: 152, gap: 36, right: 28 };
const ATLAS_FILL = ATLAS.right + ATLAS.width + ATLAS.gap / 2;
const SWISS_LABEL = 112;
const SWISS_MARGIN = 52;
const BODY_WIDTH_SWISS = PAGE_WIDTH - SWISS_MARGIN * 2;
const SUMMIT = { left: 30, width: 156, gap: 30, right: 40 };
const SUMMIT_FILL = SUMMIT.left + SUMMIT.width + SUMMIT.gap / 2;
const EDGE = { stripe: 14, margin: 66 };
const LEDGER = { label: 112, gap: 14, pad: 16 };
const HALO = { band: 104, photo: 88 };
const PRISM = { left: 150, right: 104, contentTop: 180 };
const TIDE = { base: 134, photo: 88, contentTop: 172 };

/** A display size that keeps a one-line name inside `width` (Roboto/Tinos average glyph ≈ factor × size). */
function fitSize(text: string, max: number, min: number, width: number, factor = .56): number {
  return Math.max(min, Math.min(max, width / (Math.max(1, Array.from(text.trim()).length) * factor)));
}
/** Points along a wave from the right page edge to the left, for closing a filled header shape. */
function waveEdge(base: number, amp: number, cycles: number, phase: number, steps = 90) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = PAGE_WIDTH * (1 - i / steps);
    return { x, y: base + amp * Math.sin((x / PAGE_WIDTH) * cycles * Math.PI * 2 + phase) };
  });
}

/** dark: on a solid accent panel; panel: on a light tinted panel; narrow: a side column. */
interface Context { dark?: boolean; panel?: boolean; narrow?: boolean; width: number }

// Every node that belongs to a section heading carries this (unregistered) style name,
// so the page-break check can tell a heading's own parts from the content after it.
const HEADING_STYLE = "cv-heading";
// pdfmake lays the footer out through the same node list; mark it so it never counts as body content.
const FOOTER_STYLE = "cv-footer";
function markHeading<T>(node: T): T {
  if (Array.isArray(node)) node.forEach(markHeading);
  else if (node && typeof node === "object") {
    const item = node as Record<string, unknown>;
    item.style = HEADING_STYLE;
    if (Array.isArray(item.stack)) markHeading(item.stack);
    if (Array.isArray(item.columns)) markHeading(item.columns);
    const table = item.table as { body?: unknown[][] } | undefined;
    if (table?.body) markHeading(table.body.flat());
  }
  return node;
}

/**
 * pdfmake starts a new (empty) page when the final block's bottom margin no longer fits.
 * Remove the trailing bottom margin from the last block — and from the last block of
 * every column — so a CV that ends exactly at a page foot doesn't gain a blank page.
 */
function trimTrailingMargin(node: unknown): void {
  if (Array.isArray(node)) { if (node.length) trimTrailingMargin(node[node.length - 1]); return; }
  if (!node || typeof node !== "object") return;
  const item = node as Record<string, unknown>;
  const margin = item.margin;
  if (typeof margin === "number") item.margin = [margin, margin, margin, 0];
  else if (Array.isArray(margin) && margin.length === 2) item.margin = [margin[0], margin[1], margin[0], 0];
  else if (Array.isArray(margin) && margin.length === 4) item.margin = [margin[0], margin[1], margin[2], 0];
  if (Array.isArray(item.stack)) trimTrailingMargin(item.stack);
  if (Array.isArray(item.ul)) trimTrailingMargin(item.ul);
  if (Array.isArray(item.columns)) item.columns.forEach(trimTrailingMargin);
}

export function buildDocument(cv: CV): TDocumentDefinitions {
  const template = cv.template;
  const classic = template === "classic";
  const professional = template === "professional";
  const creative = template === "creative";
  const minimal = template === "minimal";
  const modern = template === "modern";
  const student = template === "student";
  const executive = template === "executive";
  const sidebar = template === "sidebar";
  const timeline = template === "timeline";
  const compact = template === "compact";
  const elegant = template === "elegant";
  const bold = template === "bold";
  const atlas = template === "atlas";
  const duo = template === "duo";
  const swiss = template === "swiss";
  const tech = template === "tech";
  const corner = template === "corner";
  const portrait = template === "portrait";
  const academic = template === "academic";
  const monogram = template === "monogram";
  const horizon = template === "horizon";
  const ribbon = template === "ribbon";
  const outline = template === "outline";
  const editorial = template === "editorial";
  const summit = template === "summit";
  const compass = template === "compass";
  const halo = template === "halo";
  const clarity = template === "clarity";
  const prism = template === "prism";
  const gazette = template === "gazette";
  const heritage = template === "heritage";
  const ledger = template === "ledger";
  const mosaic = template === "mosaic";
  const tide = template === "tide";
  const edge = template === "edge";
  const signature = template === "signature";
  const linear = template === "linear";
  const aurora = template === "aurora";
  const atelier = template === "atelier";
  const regent = template === "regent";
  const serif = classic || professional || creative || elegant || academic || editorial || gazette || heritage || regent;
  const photo = cv.photo;
  const accent = cv.accent ?? templateById(template).color;
  const ink = "#202329";
  const muted = "#5c636c";
  const onDark = "#ffffff";
  const onDarkMuted = tint(accent, 0.74);
  const rule = "#cbd2d6";
  const gapScale = (cv.density === "compact" ? .72 : cv.density === "relaxed" ? 1.35 : 1) * (atelier || regent ? .88 : 1);
  const leadingScale = cv.density === "compact" ? .96 : cv.density === "relaxed" ? 1.09 : 1;
  const lineHeight = (classic || ribbon || outline || editorial ? 1.08 : compact || gazette || heritage ? 1.1 : 1.15) * leadingScale;
  const labelFor = (key: Section) => key === "additional" ? sectionTitle(cv, key) : labels[key];
  const visibleSections = cv.sectionOrder.filter(key => !cv.hiddenSections.includes(key) && sectionHasContent(cv, key));
  const sectionNumber = (key: Section) => String(visibleSections.indexOf(key) + 1).padStart(2, "0");
  const sizes = {
    title: compact ? 9.9 : regent ? 10.5 : editorial || gazette ? 10.5 : heritage ? 10.9 : elegant ? 11 : serif ? 11.3 : 10.3,
    secondary: compact ? 9.3 : regent ? 10 : editorial || gazette ? 10 : heritage ? 10.3 : serif ? 10.8 : 9.5,
    date: compact ? 8.6 : regent ? 9.3 : editorial || gazette || heritage ? 9.5 : serif ? 10.5 : 9,
  };
  const margins: [number, number, number, number] = sidebar ? [SIDEBAR.left, 44, SIDEBAR.right, 43]
    : atlas ? [ATLAS.left, 44, ATLAS.right, 43]
    : summit ? [SUMMIT.left, 40, SUMMIT.right, 43]
    : compact ? [38, 34, 38, 40] : tech ? [42, 38, 42, 40] : elegant ? [56, 40, 56, 42] : swiss ? [SWISS_MARGIN, 48, SWISS_MARGIN, 44]
    : heritage ? [68, 50, 68, 50] : edge ? [EDGE.margin, 44, 46, 43] : clarity ? [54, 46, 54, 44] : gazette ? [44, 40, 44, 43]
    : prism || tide || halo ? [MARGIN, 46, MARGIN, 43]
    : executive || duo ? [MARGIN, 40, MARGIN, 43] : corner ? [MARGIN, 44, MARGIN, 43]
    : [MARGIN, classic ? 39 : 44, MARGIN, 43];
  const marginWidth = PAGE_WIDTH - margins[0] - margins[2];

  function paragraph(text: string, ctx?: Context): ContentText {
    return { text, margin: [0, 0, 0, (compact ? 3 : 5) * gapScale], lineHeight, ...(ctx?.dark ? { color: onDark } : {}) };
  }

  function descriptions(text: string, key: EntrySection, ctx: Context): Content[] {
    const lines = text.replace(/\r\n?/g, "\n").split(/\n+/).map(line => line.trim()).filter(Boolean);
    if (!lines.length) return [];
    if (key === "experience" || key === "projects" || lines.some(line => /^[•●▪*-]\s+/.test(line))) {
      return [{
        ul: lines.map(line => ({ text: line.replace(/^[•●▪*-]\s+/, ""), margin: [0, 0, 0, (compact ? 1.5 : 3) * gapScale], lineHeight })),
        type: elegant ? "circle" : "disc", margin: compact ? [10, 1, 0, 3 * gapScale] : [12, 1, 0, 5 * gapScale],
        ...(ctx.dark ? { color: onDark, markerColor: onDarkMuted } : bold || timeline || duo || tech || corner || portrait || atlas || summit || compass || halo || prism || tide || edge || mosaic || signature ? { markerColor: accent } : {}),
      } as Content];
    }
    return lines.map(line => paragraph(line, ctx));
  }

  function entryContent(entry: Entry, key: EntrySection, ctx: Context): Content[] {
    // Classic and Professional follow a traditional CV: employer/institution, followed by role/degree.
    const institutionFirst = (classic || professional || academic || heritage) && (key === "experience" || key === "education");
    const primary = institutionFirst ? entry.organization || entry.title : entry.title || entry.organization;
    const secondary = institutionFirst ? entry.organization ? entry.title : "" : entry.title ? entry.organization : "";
    const hasDates = !!entry.dates.trim() && !timeline; // Timeline shows dates in its own gutter.
    const unbreakable = primary.length + secondary.length + entry.dates.length < 300;

    if (compact) return [{
      columns: [
        { width: "*", text: [{ text: primary, bold: true, fontSize: sizes.title }, ...(secondary.trim() ? [{ text: `  ·  ${secondary}`, color: muted, fontSize: sizes.secondary }] : [])] },
        ...(hasDates ? [{ width: "auto", text: entry.dates, fontSize: sizes.date, color: muted, alignment: "right", margin: [0, 1, 0, 0] }] : []),
      ], columnGap: 12, margin: [0, 3 * gapScale, 0, 2 * gapScale], unbreakable,
    } as Content, ...descriptions(entry.description, key, ctx)];

    const titleColor = ctx.dark ? onDark : ink;
    const secondaryColor = ctx.dark ? onDarkMuted : executive || bold || timeline || duo || tech || portrait || compass || halo || prism || tide || edge || signature || ((atlas || summit) && !ctx.panel) ? accent : classic ? ink : muted;
    const dateColor = ctx.dark ? onDarkMuted : classic ? ink : elegant || corner || heritage ? accent : muted;
    const title: ContentText = { text: primary, bold: true, fontSize: ctx.dark ? 9.8 : sizes.title, color: titleColor };
    const date: ContentText = { text: entry.dates, fontSize: ctx.dark ? 8.6 : sizes.date, color: dateColor, italics: elegant || heritage || signature, alignment: "right" };
    const top: Content = ctx.narrow ? {
      stack: [title, ...(hasDates ? [{ ...date, alignment: "left", margin: [0, 2, 0, 1] } as Content] : [])],
    } : {
      columns: [{ ...title, width: "*" }, ...(hasDates ? [{ ...date, width: 112 }] : [])], columnGap: 12,
    };
    return [{
      stack: [top, ...(secondary.trim() ? [{
        text: secondary, italics: classic || professional || elegant || heritage || gazette, color: secondaryColor,
        bold: (executive || bold) && !ctx.dark,
        fontSize: ctx.dark ? 9 : sizes.secondary, margin: [0, 2, 0, 0],
      } as Content] : [])],
      margin: [0, 3 * gapScale, 0, 4 * gapScale], unbreakable,
    }, ...descriptions(entry.description, key, ctx)];
  }

  /** Tech: each skill becomes a tag; "Category: a, b" lines keep their label. */
  function skillTags(width: number): Content[] {
    const gap = 3;
    return cv.skills.split(/\n+/).map(line => line.trim()).filter(Boolean).map(line => {
      const match = line.match(/^([^:]{1,32}):\s*(.*)$/);
      const label = match && !/^https?:/i.test(line) ? match[1] : "";
      const items = (label ? match![2] : line).split(/\s*[,;•·|]\s*/).map(item => item.trim()).filter(Boolean);
      const labelWidth = label ? 84 : 0;
      const perRow = Math.max(2, Math.floor((width - labelWidth) / 96));
      const rows: Content[][] = [];
      for (let i = 0; i < items.length; i += perRow) {
        const row: Content[] = items.slice(i, i + perRow).map(text => ({ text, fontSize: 8.6, bold: true, color: mixColor(accent, "#000000", 0.18), fillColor: tint(accent, 0.86), alignment: "center", margin: [4, 3, 4, 2.6] } as Content));
        while (row.length < perRow) row.push({ text: "" });
        rows.push(row);
      }
      if (!rows.length) return paragraph(line);
      const tags: Content = {
        table: { widths: Array(perRow).fill("*"), body: rows },
        layout: { hLineWidth: () => gap, vLineWidth: () => gap, hLineColor: () => "#ffffff", vLineColor: () => "#ffffff", paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 },
      } as Content;
      return label
        ? { columns: [{ width: labelWidth, text: label, bold: true, fontSize: 9.2, margin: [0, 3.6, 0, 0] }, { width: "*", stack: [tags], margin: [-gap, -gap, -gap, 0] }], columnGap: 8, margin: [0, 0, 0, 3] } as Content
        : { stack: [tags], margin: [-gap, -gap, -gap, 3] } as Content;
    });
  }

  function sectionBody(key: Section, ctx: Context): Content[] {
    if (cv.hiddenSections.includes(key)) return [];
    if (key === "summary") return cv.summary.trim() ? [paragraph(cv.summary, ctx)] : [];
    if (key === "skills" && tech) return skillTags(ctx.width);
    // Skills, languages, and additional information: one line or "Label: details" group per line.
    if (key === "skills" || key === "languages" || key === "additional") return cv[key].split(/\n+/).filter(line => line.trim()).map(line => {
      const category = line.match(/^([^:]{1,32}:)\s*(.*)$/);
      if (!category || /^https?:/i.test(line)) return paragraph(line, ctx);
      if (ctx.narrow && ctx.dark) return { ...paragraph(line, ctx), text: [{ text: `${category[1].slice(0, -1).toUpperCase()}\n`, fontSize: 7.4, characterSpacing: 0.9, color: onDarkMuted, bold: true }, { text: category[2] }], margin: [0, 0, 0, 7] };
      return { ...paragraph(line, ctx), text: [{ text: category[1], bold: true }, { text: ` ${category[2]}` }] };
    });
    return cv[key].filter(hasEntry).flatMap(entry => entryContent(entry, key, ctx));
  }

  function darkHeading(label: string, width: number, top = 16): Content {
    return {
      stack: [
        { text: label.toUpperCase(), bold: true, fontSize: 8.6, characterSpacing: 1.5, color: tint(accent, 0.62), margin: [0, 0, 0, 4] },
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: width, y2: 0, lineWidth: 0.5, lineColor: tint(accent, 0.3) }] },
      ], margin: [0, top, 0, 7], headlineLevel: 1, unbreakable: true,
    };
  }

  /** Uppercase label over a fine tinted rule, for light panels and tiles. */
  function panelHeading(label: string, width: number, top = 16): Content {
    return {
      stack: [
        { text: label.toUpperCase(), bold: true, fontSize: 8.6, characterSpacing: 1.5, color: accent, margin: [0, 0, 0, 4] },
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: width, y2: 0, lineWidth: 0.6, lineColor: tint(accent, 0.55) }] },
      ], margin: [0, top, 0, 7], headlineLevel: 1, unbreakable: true,
    };
  }

  /** Heritage: fine rules either side of a small diamond, centred in `width`. */
  function ornament(width: number, arm: number, margin: [number, number, number, number] = [0, 0, 0, 0]): Content {
    const c = width / 2, y = 3;
    return { canvas: [
      { type: "line", x1: c - arm - 7, y1: y, x2: c - 7, y2: y, lineWidth: .6, lineColor: accent },
      { type: "polyline", closePath: true, color: accent, points: [{ x: c, y: y - 2.9 }, { x: c + 2.9, y }, { x: c, y: y + 2.9 }, { x: c - 2.9, y }] },
      { type: "line", x1: c + 7, y1: y, x2: c + arm + 7, y2: y, lineWidth: .6, lineColor: accent },
    ], margin };
  }

  /** An outline icon beside one line of text (contact details). */
  function iconRow(kind: IconName, value: string, iconColor: string, textColor: string, fontSize = 9): Content {
    return {
      columns: [
        { svg: iconSVG(kind, iconColor, 2.1), width: fontSize, height: fontSize, margin: [0, fontSize * .14, 0, 0] },
        { width: "*", text: value, fontSize, color: textColor, lineHeight: 1.2 },
      ], columnGap: 7, margin: [0, 0, 0, 6],
    } as Content;
  }

  function heading(key: Section, ctx: Context): Content {
    const label = labelFor(key);
    if (linear) return { text: label.toUpperCase(), fontSize: 10.5, bold: true, color: ink, margin: [0, 15, 0, 6], headlineLevel: 1, unbreakable: true };
    if (aurora) return {
      columns: [
        { width: 10, canvas: [{ type: "ellipse", x: 4, y: 7, r1: 4, r2: 4, color: accent }] },
        { width: "*", text: label, fontSize: 12, bold: true, color: accent },
      ], columnGap: 7, margin: [0, 14, 0, 7], headlineLevel: 1, unbreakable: true,
    };
    if (atelier) return {
      columns: [
        { width: 38, text: sectionNumber(key), font: "Tinos", italics: true, fontSize: 20, color: tint(accent, .28), lineHeight: 1 },
        { width: "*", stack: [
          { text: label.toUpperCase(), font: "Roboto", fontSize: 9, bold: true, characterSpacing: 2, margin: [0, 4, 0, 5] },
          { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width - 50, y2: 0, lineWidth: .6, lineColor: tint(accent, .6) }] },
        ] },
      ], columnGap: 12, margin: [0, 13, 0, 6], headlineLevel: 1, unbreakable: true,
    };
    if (regent) return {
      stack: [
        { text: label.toUpperCase(), fontSize: 10.2, characterSpacing: 1.8, color: accent, bold: true, margin: [0, 0, 0, 5] },
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: 40, y2: 0, lineWidth: 1.8, lineColor: accent }] },
      ], margin: [0, 15, 0, 7], headlineLevel: 1, unbreakable: true,
    };
    if (compass) return {
      columns: [
        { width: 20, stack: [
          { canvas: [{ type: "ellipse", x: 10, y: 10, r1: 10, r2: 10, color: accent }] },
          { svg: iconSVG(key, "#ffffff", 2.1), width: 10.5, height: 10.5, margin: [4.75, -15.25, 0, 0] },
        ] },
        { width: "*", stack: [
          { text: label, bold: true, fontSize: 12.2, color: ink, margin: [0, 1.6, 0, 0] },
          { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width - 30, y2: 0, lineWidth: .6, lineColor: tint(accent, .65) }], margin: [0, 3.6, 0, 0] },
        ] },
      ], columnGap: 10, margin: [0, 11, 0, 6], headlineLevel: 1, unbreakable: true,
    };
    if (halo) return {
      stack: [
        { text: label.toUpperCase(), bold: true, fontSize: 9.6, characterSpacing: 2, color: accent, alignment: "center", margin: [0, 0, 0, 5] },
        { canvas: [
          { type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: .6, lineColor: tint(accent, .6) },
          { type: "ellipse", x: ctx.width / 2, y: 0, r1: 2.4, r2: 2.4, color: accent },
        ] },
      ], margin: [0, 13, 0, 7], headlineLevel: 1, unbreakable: true,
    };
    if (clarity) return {
      stack: [
        { text: label.toUpperCase(), bold: true, fontSize: 10.4, characterSpacing: .8, color: accent, margin: [0, 0, 0, 3] },
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: .8, lineColor: accent }] },
      ], margin: [0, 13, 0, 6], headlineLevel: 1, unbreakable: true,
    };
    if (prism) return {
      stack: [
        { columns: [
          { width: 13, canvas: [{ type: "polyline", closePath: true, color: accent, points: [{ x: 0, y: 9.6 }, { x: 4.2, y: 1.2 }, { x: 12.2, y: 1.2 }, { x: 8, y: 9.6 }] }] },
          { width: "*", text: label.toUpperCase(), bold: true, fontSize: 10, characterSpacing: 1.4, color: ink },
        ], columnGap: 7 },
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: .6, lineColor: tint(accent, .62) }], margin: [0, 5, 0, 0] },
      ], margin: [0, 11, 0, 6], headlineLevel: 1, unbreakable: true,
    };
    if (gazette) return {
      stack: [
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: 1.4, lineColor: ink }] },
        { text: label.toUpperCase(), font: "Roboto", bold: true, fontSize: 8.6, characterSpacing: 1.8, color: accent, margin: [0, 4.5, 0, 3.5] },
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: .4, lineColor: ink }] },
      ], margin: [0, 14, 0, 6], headlineLevel: 1, unbreakable: true,
    };
    if (heritage) return {
      stack: [
        { text: label.toUpperCase(), fontSize: 10.6, characterSpacing: 2.6, color: accent, alignment: "center", margin: [0, 0, 0, 5] },
        ornament(ctx.width, 30),
      ], margin: [0, 12, 0, 7], headlineLevel: 1, unbreakable: true,
    };
    if (edge) {
      const reach = EDGE.margin - EDGE.stripe - 10;
      return {
        columns: [
          { width: reach, canvas: [{ type: "line", x1: 0, y1: 5.4, x2: reach, y2: 5.4, lineWidth: 1.4, lineColor: accent }] },
          { width: "*", text: label.toUpperCase(), bold: true, fontSize: 10, characterSpacing: 1.5, color: accent },
        ], columnGap: 10, margin: [-(EDGE.margin - EDGE.stripe), 16, 0, 7], headlineLevel: 1, unbreakable: true,
      };
    }
    if (signature) return {
      stack: [
        { text: label, font: "Tinos", italics: true, fontSize: 15.5, color: accent, margin: [0, 0, 0, 3] },
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: .5, lineColor: tint(accent, .6) }] },
      ], margin: [0, 13, 0, 7], headlineLevel: 1, unbreakable: true,
    };
    if (tide) {
      const points = Array.from({ length: 25 }, (_, i) => ({ x: i * 15 / 24, y: 5.8 + 2.3 * Math.sin(i / 24 * Math.PI * 3) }));
      return {
        stack: [
          { columns: [
            { width: 16, canvas: [{ type: "polyline", lineWidth: 1.6, lineColor: accent, points }] },
            { width: "*", text: label, bold: true, fontSize: 12.5, color: ink },
          ], columnGap: 8 },
          { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: .6, lineColor: tint(accent, .65) }], margin: [0, 4.5, 0, 0] },
        ], margin: [0, 11, 0, 6], headlineLevel: 1, unbreakable: true,
      };
    }
    if (mosaic) return {
      columns: [
        { width: 11, canvas: [0, 1].flatMap(row => [0, 1].map(col => ({ type: "rect", x: col * 5.4, y: 2.2 + row * 5.4, w: 4.4, h: 4.4, color: row === col ? accent : tint(accent, .55) }))) },
        { width: "*", text: label, bold: true, fontSize: 12.5, color: ink },
      ], columnGap: 9, margin: [0, 16, 0, 7], headlineLevel: 1, unbreakable: true,
    } as Content;
    if (academic) return {
      stack: [
        { text: label.toUpperCase(), bold: true, fontSize: 10.8, characterSpacing: 1.1, color: accent, margin: [0, 0, 0, 4] },
        { canvas: [
          { type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: 1, lineColor: accent },
          { type: "line", x1: 0, y1: 2.5, x2: ctx.width, y2: 2.5, lineWidth: .35, lineColor: accent },
        ] },
      ], margin: [0, 13, 0, 6], headlineLevel: 1, unbreakable: true,
    };
    if (monogram) return {
      table: { widths: ["*"], body: [[{ text: label.toUpperCase(), fontSize: 9.3, bold: true, characterSpacing: 1.4, color: accent, margin: [10, 3, 0, 3] }]] },
      layout: { hLineWidth: () => 0, vLineWidth: i => i === 0 ? 3 : 0, vLineColor: () => accent, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 },
      margin: [0, 15, 0, 6], headlineLevel: 1, unbreakable: true,
    };
    if (horizon) return {
      columns: [
        { width: 150, text: label.toUpperCase(), bold: true, fontSize: 9.2, characterSpacing: 1.1, color: accent },
        { width: "*", canvas: [{ type: "line", x1: 0, y1: 5.5, x2: ctx.width - 162, y2: 5.5, lineWidth: .7, lineColor: tint(accent, .55) }] },
      ], columnGap: 12, margin: [0, 16, 0, 8], headlineLevel: 1, unbreakable: true,
    };
    if (ribbon) return {
      table: { widths: ["*"], body: [[{ text: label.toUpperCase(), bold: true, fontSize: 9.2, characterSpacing: 1.5, color: onDark, fillColor: accent, margin: [10, 3, 10, 3] }]] },
      layout: "noBorders", margin: [0, 10, 0, 5], headlineLevel: 1, unbreakable: true,
    };
    if (outline) return {
      table: { widths: ["*"], body: [[{ text: label.toUpperCase(), bold: true, fontSize: 9.1, characterSpacing: 1.2, color: accent, margin: [9, 4, 9, 4] }]] },
      layout: { hLineWidth: () => .6, vLineWidth: () => .6, hLineColor: () => tint(accent, .5), vLineColor: () => tint(accent, .5), paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 },
      margin: [0, 10, 0, 5], headlineLevel: 1, unbreakable: true,
    };
    if (editorial) return {
      columns: [
        { width: 34, text: sectionNumber(key), font: "Tinos", fontSize: 20, color: tint(accent, .2), lineHeight: 1 },
        { width: "*", stack: [
          { text: label, font: "Tinos", fontSize: 14, color: ink, margin: [0, 1, 0, 5] },
          { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width - 46, y2: 0, lineWidth: .6, lineColor: tint(accent, .55) }] },
        ] },
      ], columnGap: 12, margin: [0, 8, 0, 4], headlineLevel: 1, unbreakable: true,
    };
    if (student) return {
      table: { widths: ["*"], body: [[{
        text: label.toUpperCase(), bold: true, fontSize: 9, characterSpacing: 1,
        color: accent, fillColor: cv.accent ? tint(accent, 0.9) : "#edf1f5", margin: [8, 3, 8, 3],
      }]] },
      layout: "noBorders", margin: [0, 10, 0, 4], headlineLevel: 1,
    };
    if (creative) return {
      columns: [
        { text: sectionNumber(key), font: "Roboto", fontSize: 8, color: accent, width: 24, margin: [0, 5, 0, 0] },
        { text: label, font: "Tinos", fontSize: 14, italics: true, color: accent, width: "*" },
      ], margin: [0, 12, 0, 4], headlineLevel: 1,
    };
    if (bold) return {
      table: { widths: ["auto"], body: [[{ text: label.toUpperCase(), bold: true, fontSize: 9, characterSpacing: 1.3, color: onDark, fillColor: accent, margin: [8, 3.5, 8, 3] }]] },
      layout: "noBorders", margin: [0, 12, 0, 5], headlineLevel: 1, unbreakable: true,
    };
    if (elegant) return {
      columns: [
        { width: "*", text: "" },
        { width: 34, canvas: [{ type: "line", x1: 0, y1: 6.5, x2: 34, y2: 6.5, lineWidth: 0.6, lineColor: accent }] },
        { width: "auto", text: label.toUpperCase(), fontSize: 10.2, characterSpacing: 2.4, color: accent },
        { width: 34, canvas: [{ type: "line", x1: 0, y1: 6.5, x2: 34, y2: 6.5, lineWidth: 0.6, lineColor: accent }] },
        { width: "*", text: "" },
      ], columnGap: 10, margin: [0, 12, 0, 6], headlineLevel: 1, unbreakable: true,
    };
    if (ctx.dark) return darkHeading(label, ctx.width);
    if (ctx.panel) return panelHeading(label, ctx.width);
    if (duo) return {
      stack: [
        { columns: [
          { width: 13, canvas: [{ type: "rect", x: 0, y: 3.6, w: 7, h: 7, color: accent }] },
          { width: "*", text: label, bold: true, fontSize: 11.5, color: ink },
        ] },
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: 0.5, lineColor: rule }], margin: [0, 5, 0, 0] },
      ], margin: [0, 15, 0, 6], headlineLevel: 1, unbreakable: true,
    };
    if (corner) return {
      stack: [
        { text: label, bold: true, fontSize: 12.5, color: ink },
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: 26, y2: 0, lineWidth: 3, lineColor: accent }], margin: [0, 4, 0, 0] },
      ], margin: [0, 12, 0, 6], headlineLevel: 1, unbreakable: true,
    };
    if (portrait) {
      const text = label.toUpperCase();
      const leader = Math.max(20, ctx.width - 30 - text.length * 8.6);
      return {
        columns: [
          { width: 14, canvas: [{ type: "ellipse", x: 4.5, y: 6, r1: 4, r2: 4, lineColor: accent, lineWidth: 1.6 }] },
          { width: "auto", text, bold: true, fontSize: 9.6, characterSpacing: 1.6, color: accent },
          { width: "*", canvas: [{ type: "line", x1: 0, y1: 8, x2: leader, y2: 8, lineWidth: 1, lineColor: tint(accent, 0.55), dash: { length: 1, space: 2.5 } }] },
        ], columnGap: 8, margin: [0, 15, 0, 7], headlineLevel: 1, unbreakable: true,
      };
    }
    if (executive) return {
      stack: [
        { text: label.toUpperCase(), bold: true, fontSize: 10, characterSpacing: 1.6, color: accent, margin: [0, 0, 0, 5] },
        { canvas: [
          { type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: 0.6, lineColor: "#d6dbe0" },
          { type: "line", x1: 0, y1: 0, x2: 34, y2: 0, lineWidth: 2.2, lineColor: accent },
        ] },
      ], margin: [0, 15, 0, 6], headlineLevel: 1, unbreakable: true,
    };
    if (compact || tech) return {
      stack: [
        { text: label.toUpperCase(), bold: true, fontSize: tech ? 9.6 : 9.2, characterSpacing: tech ? 1.4 : 1, color: accent, margin: [0, 0, 0, tech ? 4 : 2.5] },
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: tech ? 0.9 : 0.7, lineColor: tint(accent, 0.55) }] },
      ], margin: tech ? [0, 13, 0, 6] : [0, 9, 0, 3], headlineLevel: 1, unbreakable: true,
    };
    const sideMain = sidebar || atlas || summit;
    return {
      stack: [{
        text: label.toUpperCase(), fontSize: classic ? 12.5 : professional ? 11.5 : sideMain ? 9.5 : 9,
        bold: true, color: accent, characterSpacing: classic ? 0.5 : modern || sideMain ? 1.4 : 0.8,
        alignment: classic ? "center" : "left", margin: [0, 0, 0, classic ? 3 : 5],
      }, {
        canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: classic ? 0.6 : 0.5, lineColor: classic ? "#414141" : rule }],
      }], margin: [0, classic ? 12 : 14, 0, 5], headlineLevel: 1, unbreakable: true,
    };
  }

  // Content width for single-column templates whose side margins differ from the default.
  const fullWidth = compact ? PAGE_WIDTH - 76 : tech ? PAGE_WIDTH - 84 : elegant ? PAGE_WIDTH - 112 : heritage || edge || clarity || gazette ? marginWidth : BODY_WIDTH;
  function sectionSpacing(node: Content): Content {
    if (gapScale === 1 || typeof node !== "object" || node === null || Array.isArray(node) || !("margin" in node) || !Array.isArray(node.margin) || node.margin.length !== 4) return node;
    return { ...node, margin: [node.margin[0], node.margin[1] * gapScale, node.margin[2], node.margin[3] * gapScale] } as Content;
  }
  function section(key: Section, ctx: Context = { width: fullWidth }): Content[] {
    const body = sectionBody(key, ctx);
    if (!body.length) return [];
    if (minimal) return [{
      columns: [
        { width: 88, text: labelFor(key).toUpperCase(), fontSize: 8.8, bold: true, characterSpacing: 1, color: muted, margin: [0, 4, 0, 0] },
        { width: "*", stack: body },
      ], columnGap: 20, margin: [0, 15 * gapScale, 0, 4 * gapScale],
    }];
    if (swiss) return [
      markHeading({ canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH_SWISS, y2: 0, lineWidth: 2.4, lineColor: ink }], margin: [0, 16 * gapScale, 0, 0], headlineLevel: 1 } as Content),
      { columns: [
        { width: SWISS_LABEL, text: sectionTitle(cv, key), bold: true, fontSize: 11, lineHeight: 1.1, color: ink, margin: [0, 8, 0, 0] },
        { width: "*", stack: body, margin: [0, 6, 0, 0] },
      ], columnGap: 16 },
    ];
    const head = markHeading(sectionSpacing(heading(key, ctx)));
    // Keep each heading with its first block (an entry header, a skill line, or a short
    // profile) so a heading never ends a page alone. Long profiles stay breakable.
    const [first, ...rest] = body;
    if (key === "summary" && cv.summary.length > 700) return [head, ...body];
    return [{ stack: [head, first], unbreakable: true } as Content, ...rest];
  }

  /** Timeline: dates hang in a left gutter beside a continuous vertical rule. */
  function timelineSection(key: Section): Content[] {
    if (cv.hiddenSections.includes(key)) return [];
    const ctx: Context = { width: BODY_WIDTH - TIMELINE_INDENT };
    const marker: Content = {
      canvas: [{ type: "rect", x: TIMELINE.gutter + TIMELINE.gap - 4, y: 2, w: 8, h: 8, color: accent }],
      relativePosition: { x: 0, y: 0 },
    } as Content;
    const head: Content = markHeading({
      stack: [marker, { text: labelFor(key).toUpperCase(), bold: true, fontSize: 9.5, characterSpacing: 1.5, color: accent, margin: [TIMELINE_INDENT, 0, 0, 0] }],
      margin: [0, 15 * gapScale, 0, 6 * gapScale], headlineLevel: 1, unbreakable: true,
    } as Content);
    if (isTextSection(key)) {
      const body = sectionBody(key, ctx);
      return body.length ? [head, { stack: body, margin: [TIMELINE_INDENT, 0, 0, 0] }] : [];
    }
    const entries = cv[key].filter(hasEntry);
    if (!entries.length) return [];
    const lineColor = tint(accent, 0.6);
    return [head, {
      table: {
        widths: [TIMELINE.gutter, "*"],
        body: entries.map(entry => [
          { text: entry.dates, alignment: "right", fontSize: 8.8, color: muted, lineHeight: 1.2, margin: [0, 3.6, 0, 0] },
          { stack: [
            { canvas: [
              { type: "ellipse", x: 0, y: 0, r1: 5.2, r2: 5.2, color: "#ffffff" },
              { type: "ellipse", x: 0, y: 0, r1: 3.3, r2: 3.3, color: accent },
            ], relativePosition: { x: -TIMELINE.pad, y: 9.5 } },
            ...entryContent(entry, key, ctx),
          ] },
        ]),
      },
      layout: {
        hLineWidth: () => 0,
        vLineWidth: (index: number) => index === 1 ? 1 : 0,
        vLineColor: () => lineColor,
        paddingLeft: (index: number) => index === 1 ? TIMELINE.pad : 0,
        paddingRight: (index: number) => index === 0 ? TIMELINE.gap : 0,
        paddingTop: () => 0,
        paddingBottom: () => 4,
      },
    } as Content];
  }

  const p = cv.personal;
  const contact = [p.email, p.phone, p.location, p.website].filter(value => value.trim());
  const contactLine: Content[] = contact.length ? [{
    text: contact.join("  •  "), fontSize: serif ? 10 : 8.8, color: classic ? ink : muted,
    alignment: classic || student ? "center" : "left", lineHeight: 1.3, margin: [0, 0, 0, 3],
  }] : [];
  const name: ContentText = {
    text: classic ? p.name.toUpperCase() : p.name,
    font: serif || student ? "Tinos" : "Roboto", fontSize: classic ? 30 : creative ? 36 : student ? 27 : 29,
    bold: modern, characterSpacing: classic ? 1.8 : student ? 1.2 : 0,
    color: classic || minimal ? cv.accent ?? "#151515" : accent, alignment: classic || student ? "center" : "left",
    lineHeight: 1.05, margin: [0, 0, 0, 7],
  };
  const headline: Content[] = p.headline.trim() ? [{
    text: p.headline, fontSize: serif ? 11 : 10, italics: classic || professional,
    color: classic ? ink : muted, alignment: classic || student ? "center" : "left", margin: [0, 0, 0, 7],
  }] : [];

  const contactKinds = ([["email", p.email], ["phone", p.phone], ["location", p.location], ["website", p.website]] as const).filter(([, value]) => value.trim());
  const letters = initials(p.name);
  /** Pushes the flow below a header shape that is drawn in the page background. */
  const spacer = (height: number): Content => ({ text: " ", fontSize: 1, lineHeight: 1, margin: [0, Math.max(0, height - 1), 0, 0] });
  const headlineLine = (props: Partial<ContentText>): Content[] => p.headline.trim() ? [{ text: p.headline, ...props } as Content] : [];

  let header: Content[];
  if (linear) header = [
    { ...name, font: "Roboto", fontSize: fitSize(p.name, 28, 18, BODY_WIDTH), bold: true, color: ink, margin: [0, 0, 0, 5] },
    ...headlineLine({ fontSize: 11, color: ink, margin: [0, 0, 0, 6] }),
    ...contactLine.map((item): ContentText => ({ ...(item as ContentText), text: contact.join(" | "), color: ink, margin: [0, 0, 0, 10] })),
  ];
  else if (aurora) header = [{
    columns: [
      { width: "*", stack: [
        { ...name, fontSize: fitSize(p.name, 31, 18, BODY_WIDTH - (photo ? 108 : 0)), bold: true, color: accent },
        ...headlineLine({ fontSize: 11.5, color: ink, margin: [0, 0, 0, 10] }),
        ...contactLine,
      ] },
      ...(photo ? [{ image: photo, width: 78, height: 78 } as Content] : []),
    ], columnGap: 30, margin: [0, 9, 0, 30],
  }];
  else if (atelier) header = [
    { ...name, font: "Tinos", italics: true, fontSize: fitSize(p.name, 43, 22, BODY_WIDTH, .5), color: accent, margin: [0, 0, 0, 8] },
    { columns: [
      { width: "*", stack: headlineLine({ font: "Roboto", bold: true, fontSize: 10, characterSpacing: 1.2, color: ink }) },
      { width: "auto", text: "CURRICULUM VITAE", font: "Roboto", fontSize: 7.2, characterSpacing: 1.6, color: muted },
    ], columnGap: 12 },
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH, y2: 0, lineWidth: 2.5, lineColor: accent }], margin: [0, 5, 0, 8] },
    ...contactLine,
  ];
  else if (regent) header = [
    { ...name, text: p.name.toUpperCase(), font: "Tinos", fontSize: fitSize(p.name, 29, 18, BODY_WIDTH), characterSpacing: 1.6, alignment: "center", margin: [0, 0, 0, 8] },
    ...headlineLine({ alignment: "center", fontSize: 11.5, italics: true, color: muted, margin: [0, 0, 0, 13] }),
    ...(contact.length ? [{
      table: { widths: ["*"], body: [[{ text: contact.join("  |  "), alignment: "center", fontSize: 8.7, color: muted, margin: [8, 7, 8, 7] }]] },
      layout: { hLineWidth: () => .5, vLineWidth: () => .5, hLineColor: () => tint(accent, .55), vLineColor: () => tint(accent, .55), paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 },
      margin: [0, 0, 0, 8],
    } as Content] : []),
  ];
  else if (summit) {
    const avatarSize = photo ? 84 : letters ? 64 : 0;
    const avatar: Content = photo ? { image: photo, width: 84, height: 84 } : letters ? { columns: [{ width: 64, stack: [
      { canvas: [{ type: "ellipse", x: 32, y: 32, r1: 31.5, r2: 31.5, lineColor: tint(accent, .5), lineWidth: 1 }] },
      { text: letters, alignment: "center", fontSize: letters.length > 2 ? 16 : 20, bold: true, color: onDark, characterSpacing: .6, margin: [0, letters.length > 2 ? -41 : -43.2, 0, 0] },
    ] }, { width: "*", text: "" }] } as Content : { text: "" };
    const info: Content[] = [
      ...(p.name.trim() ? [{ text: p.name, bold: true, fontSize: fitSize(p.name, 27, 18, 330), color: onDark, lineHeight: 1.05 } as Content] : []),
      ...headlineLine({ text: p.headline.toUpperCase(), fontSize: 9.4, characterSpacing: 1.6, color: tint(accent, .72), margin: [0, 7, 0, 0] }),
    ];
    const infoHeight = (p.name.trim() ? 29 : 0) + (p.headline.trim() ? 18 : 0);
    header = info.length || avatarSize ? [{
      table: { widths: ["*"], body: [[{ stack: [{
        columns: [{ width: SUMMIT.width, stack: [avatar] }, { width: "*", stack: info, margin: [0, Math.max(0, (avatarSize - infoHeight) / 2), 0, 0] }], columnGap: SUMMIT.gap,
      }], fillColor: accent, margin: [SUMMIT.left, 30, SUMMIT.right, 28] }]] },
      layout: "noBorders", margin: [-SUMMIT.left, -40, -SUMMIT.right, 4],
    }] : [];
  }
  else if (compass) {
    const grid: Content[] = contactKinds.length ? [{
      columns: [0, 1].map(col => ({ width: "*", stack: contactKinds.filter((_, i) => i % 2 === col).map(([kind, value]) => iconRow(kind, value, accent, muted)) })),
      columnGap: 16, margin: [0, 2, 0, -6],
    } as Content] : [];
    const info: Content = { width: "*", stack: [
      ...(p.name.trim() ? [{ text: p.name, bold: true, fontSize: 29, color: ink, lineHeight: 1.05, margin: [0, 0, 0, 4] } as Content] : []),
      ...headlineLine({ bold: true, fontSize: 12, color: accent, margin: [0, 0, 0, 11] }),
      ...grid,
    ], margin: [0, photo ? 4 : 0, 0, 0] } as Content;
    header = [
      { columns: [...(photo ? [{ image: photo, width: 76, height: 76 } as Content] : []), info], columnGap: 20 },
      { canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH, y2: 0, lineWidth: 1, lineColor: tint(accent, .55) }], margin: [0, 11, 0, 1] },
    ];
  }
  else if (halo) {
    const center = PAGE_WIDTH / 2;
    const hasAvatar = !!photo || !!letters;
    const avatar: Content[] = photo ? [{ image: photo, width: HALO.photo, height: HALO.photo, absolutePosition: { x: center - HALO.photo / 2, y: HALO.band - HALO.photo / 2 } } as Content]
      : letters ? [{
        table: { widths: [120], body: [[{ text: letters, bold: true, fontSize: letters.length > 2 ? 23 : 29, characterSpacing: .8, color: accent, alignment: "center" }]] },
        layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 },
        absolutePosition: { x: center - 60, y: HALO.band - (letters.length > 2 ? 13.5 : 17) },
      } as Content] : [];
    header = [
      ...avatar,
      spacer((hasAvatar ? HALO.band + HALO.photo / 2 + 20 : HALO.band + 24) - margins[1]),
      ...(p.name.trim() ? [{ text: p.name, bold: true, fontSize: fitSize(p.name, 28, 18, BODY_WIDTH), color: ink, alignment: "center", lineHeight: 1.05, margin: [0, 0, 0, 6] } as Content] : []),
      ...headlineLine({ text: p.headline.toUpperCase(), fontSize: 9.6, characterSpacing: 2, color: accent, alignment: "center", margin: [0, 0, 0, 8] }),
      ...(contact.length ? [{ text: contact.flatMap((item, i) => i ? [{ text: "   ·   ", color: accent, bold: true }, { text: item }] : [{ text: item }]), fontSize: 9, color: muted, alignment: "center", lineHeight: 1.3 } as Content] : []),
    ];
  }
  else if (clarity) header = [
    ...(p.name.trim() ? [{ text: p.name, bold: true, fontSize: 24, color: ink, lineHeight: 1.05, margin: [0, 0, 0, 4] } as Content] : []),
    ...headlineLine({ fontSize: 11.5, color: ink, margin: [0, 0, 0, 5] }),
    ...(contact.length ? [{ text: contact.join("  |  "), fontSize: 9.6, color: muted, lineHeight: 1.3 } as Content] : []),
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: fullWidth, y2: 0, lineWidth: 1, lineColor: accent }], margin: [0, 9, 0, 2] },
  ];
  else if (prism || tide) {
    const photoSlot = tide && photo ? TIDE.photo + 22 : 0;
    const nameSize = fitSize(p.name, 32, 18, BODY_WIDTH - photoSlot - 12);
    const lightOnBand = tint(accent, .78);
    header = [
      ...(tide && photo ? [{ image: photo, width: TIDE.photo, height: TIDE.photo, absolutePosition: { x: PAGE_WIDTH - MARGIN - TIDE.photo, y: 34 } } as Content] : []),
      ...(p.name.trim() || p.headline.trim() ? [{ columns: [{ width: BODY_WIDTH - photoSlot, stack: [
        ...(p.name.trim() ? [{ text: p.name, bold: true, fontSize: nameSize, color: onDark, lineHeight: 1.05 } as Content] : []),
        ...headlineLine(prism
          ? { text: p.headline.toUpperCase(), fontSize: 9.8, characterSpacing: 1.8, color: lightOnBand, margin: [0, 9, 0, 0] }
          : { fontSize: 13, color: lightOnBand, margin: [0, 7, 0, 0] }),
      ] }], absolutePosition: { x: MARGIN, y: 48 } } as Content] : []),
      spacer((prism ? PRISM.contentTop : TIDE.contentTop) - margins[1]),
      ...(contact.length ? [{ text: contact.flatMap((item, i) => i ? [{ text: prism ? "   /   " : "   ·   ", color: accent, bold: true }, { text: item }] : [{ text: item }]), fontSize: 9, color: muted, lineHeight: 1.3, margin: [0, 0, 0, 2] } as Content] : []),
    ];
  }
  else if (gazette) header = [
    { canvas: [
      { type: "line", x1: 0, y1: 0, x2: fullWidth, y2: 0, lineWidth: 2.6, lineColor: ink },
      { type: "line", x1: 0, y1: 4, x2: fullWidth, y2: 4, lineWidth: .6, lineColor: ink },
    ] },
    ...(p.name.trim() ? [{ text: p.name, font: "Tinos", bold: true, fontSize: fitSize(p.name, 44, 24, fullWidth, .5), alignment: "center", color: ink, lineHeight: 1, margin: [0, 12, 0, 4] } as Content] : [{ text: "", margin: [0, 8, 0, 0] } as Content]),
    ...headlineLine({ font: "Tinos", italics: true, fontSize: 12.5, alignment: "center", color: accent, margin: [0, 0, 0, 9] }),
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: fullWidth, y2: 0, lineWidth: .6, lineColor: ink }] },
    ...(contact.length ? [{ text: contact.join("   ·   "), font: "Roboto", fontSize: 8.6, color: muted, alignment: "center", lineHeight: 1.3, margin: [0, 4.5, 0, 3.5] } as Content] : [{ text: "", margin: [0, 2, 0, 0] } as Content]),
    { canvas: [
      { type: "line", x1: 0, y1: 0, x2: fullWidth, y2: 0, lineWidth: .6, lineColor: ink },
      { type: "line", x1: 0, y1: 4, x2: fullWidth, y2: 4, lineWidth: 2.6, lineColor: ink },
    ], margin: [0, 0, 0, 2] },
  ];
  else if (heritage) header = [
    ...(p.name.trim() ? [{ text: p.name.toUpperCase(), font: "Tinos", fontSize: fitSize(p.name, 25, 15, fullWidth, .92), characterSpacing: 3.4, alignment: "center", color: ink, lineHeight: 1.05, margin: [0, 0, 0, 8] } as Content] : []),
    ornament(fullWidth, 48, [0, 0, 0, 9]),
    ...headlineLine({ font: "Tinos", italics: true, fontSize: 12.5, alignment: "center", color: accent, margin: [0, 0, 0, 6] }),
    ...(contact.length ? [{ text: contact.join("   ·   "), fontSize: 9.6, alignment: "center", color: muted, lineHeight: 1.3, margin: [0, 0, 0, 4] } as Content] : []),
  ];
  else if (edge) header = [
    ...(p.name.trim() ? [{
      columns: [
        { width: EDGE.margin - EDGE.stripe - 10, canvas: [{ type: "line", x1: 0, y1: 18, x2: EDGE.margin - EDGE.stripe - 10, y2: 18, lineWidth: 3, lineColor: accent }] },
        { width: "*", text: p.name, bold: true, fontSize: fitSize(p.name, 33, 20, fullWidth), color: ink, lineHeight: 1.02 },
      ], columnGap: 10, margin: [-(EDGE.margin - EDGE.stripe), 0, 0, 6],
    } as Content] : []),
    ...headlineLine({ bold: true, fontSize: 12.5, color: accent, margin: [0, 0, 0, 8] }),
    ...(contact.length ? [{ text: contact.flatMap((item, i) => i ? [{ text: "   /   ", color: accent, bold: true }, { text: item }] : [{ text: item }]), fontSize: 9, color: muted, lineHeight: 1.3, margin: [0, 0, 0, 2] } as Content] : []),
  ];
  else if (mosaic) {
    const gap = 6;
    header = [
      ...(p.name.trim() ? [{ text: p.name, bold: true, fontSize: 30, color: ink, lineHeight: 1.05, margin: [0, 0, 0, 5] } as Content] : []),
      ...headlineLine({ bold: true, fontSize: 12, color: accent, margin: [0, 0, 0, 12] }),
      ...(contactKinds.length ? [{
        table: { widths: contactKinds.map(() => "*"), body: [contactKinds.map(([kind, value]) => ({
          stack: [
            { text: kind.toUpperCase(), fontSize: 6.8, bold: true, characterSpacing: 1.1, color: accent, margin: [0, 0, 0, 2] },
            { text: value, fontSize: 8.6, color: ink, lineHeight: 1.2 },
          ], fillColor: tint(accent, .9), margin: [9, 7, 9, 7],
        }))] },
        layout: { hLineWidth: () => 0, vLineWidth: (i: number) => i > 0 && i < contactKinds.length ? gap : 0, vLineColor: () => "#ffffff", paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 },
        margin: [0, 0, 0, 2],
      } as Content] : []),
    ];
  }
  else if (signature) header = [
    { columns: [
      { width: "*", stack: [
        ...(p.name.trim() ? [{ text: p.name, font: "Tinos", italics: true, fontSize: fitSize(p.name, 40, 22, BODY_WIDTH - 196, .46), color: ink, lineHeight: 1 } as Content] : []),
        ...headlineLine({ text: p.headline.toUpperCase(), fontSize: 9.2, characterSpacing: 2.2, color: accent, margin: [0, 9, 0, 0] }),
      ] },
      { width: 176, stack: contact.map(text => ({ text, fontSize: 9, alignment: "right", color: muted, margin: [0, 0, 0, 3] })), margin: [0, 5, 0, 0] },
    ], columnGap: 20 },
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH, y2: 0, lineWidth: .9, lineColor: accent }], margin: [0, 14, 0, 1] },
  ];
  else if (ledger) header = [];
  else if (academic) header = [
    { text: p.name, font: "Tinos", bold: true, fontSize: 27, alignment: "center", color: ink, characterSpacing: 1.2, margin: [0, 0, 0, 5] },
    ...(p.headline.trim() ? [{ text: p.headline, italics: true, fontSize: 11.5, alignment: "center", color: accent, margin: [0, 0, 0, 8] } as Content] : []),
    ...(contact.length ? [{ text: contact.join("   |   "), fontSize: 9.5, alignment: "center", color: muted, lineHeight: 1.3 } as Content] : []),
    { canvas: [
      { type: "line", x1: 0, y1: 0, x2: BODY_WIDTH, y2: 0, lineWidth: 1.5, lineColor: accent },
      { type: "line", x1: 0, y1: 4, x2: BODY_WIDTH, y2: 4, lineWidth: .5, lineColor: accent },
    ], margin: [0, 12, 0, 3] },
  ];
  else if (monogram) {
    const letters = initials(p.name);
    const tile: Content | undefined = photo ? { image: photo, width: 72, height: 72 } : letters ? {
      table: { widths: [72], body: [[{ text: letters, bold: true, fontSize: letters.length > 2 ? 22 : 28, color: onDark, fillColor: accent, alignment: "center", margin: [0, 19, 0, 19] }]] },
      layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 },
    } : undefined;
    const info: Content = { width: "*", stack: [
      { text: p.name, bold: true, fontSize: 30, color: ink, lineHeight: 1.05, margin: [0, 0, 0, 6] },
      ...(p.headline.trim() ? [{ text: p.headline.toUpperCase(), fontSize: 9.5, characterSpacing: 1.2, color: accent, margin: [0, 0, 0, 9] } as Content] : []),
      ...contactLine,
    ] } as Content;
    header = [{ columns: [...(tile ? [{ ...tile, width: 72 }] : []), info], columnGap: 20 },
      { canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH, y2: 0, lineWidth: 1, lineColor: tint(accent, .6) }], margin: [0, 15, 0, 1] },
    ];
  }
  else if (horizon) {
    const info: Content = { width: "*", stack: [
      { text: p.name, bold: true, fontSize: 30, color: accent, lineHeight: 1.05, margin: [0, 0, 0, 7] },
      ...(p.headline.trim() ? [{ text: p.headline, fontSize: 12, color: ink, margin: [0, 0, 0, 11] } as Content] : []),
      ...contactLine,
    ] } as Content;
    header = [{
      table: { widths: ["*"], body: [[{ stack: [{ columns: [info, ...(photo ? [{ image: photo, width: 70, height: 70 }] : [])], columnGap: 20 }], fillColor: tint(accent, .92), margin: [22, 22, 22, 19] }]] },
      layout: "noBorders", margin: [0, 0, 0, 0],
    }, { canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH, y2: 0, lineWidth: 3, lineColor: accent }] }];
  }
  else if (ribbon) header = [
    { text: p.name.toUpperCase(), bold: true, fontSize: 31, characterSpacing: 1, color: ink, margin: [0, 0, 0, 7] },
    ...(p.headline.trim() ? [{ text: p.headline, font: "Tinos", italics: true, fontSize: 16, color: accent, margin: [0, 0, 0, 11] } as Content] : []),
    ...contactLine,
  ];
  else if (outline) header = [{
    table: { widths: ["*"], body: [[{ stack: [
      { text: p.name, bold: true, fontSize: 28, color: ink, margin: [0, 0, 0, 6] },
      ...headline, ...contactLine,
    ], margin: [20, 17, 20, 15] }]] },
    layout: { hLineWidth: () => 1, vLineWidth: () => 1, hLineColor: () => accent, vLineColor: () => accent, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 },
    margin: [0, 0, 0, 3],
  }];
  else if (editorial) header = [
    { text: p.name, font: "Tinos", fontSize: 43, color: ink, lineHeight: 1, margin: [0, 0, 0, 7] },
    ...(p.headline.trim() ? [{ text: p.headline.toUpperCase(), font: "Roboto", fontSize: 9.5, characterSpacing: 2, color: accent, margin: [0, 0, 0, 12] } as Content] : []),
    ...contactLine,
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH, y2: 0, lineWidth: 4, lineColor: accent }], margin: [0, 12, 0, 1] },
  ];
  else if (modern || professional) header = [{
    columns: [
      { width: "*", stack: [name, ...headline] },
      { width: 166, stack: contact.map(text => ({ text, fontSize: serif ? 9.5 : 8.6, alignment: "right", color: muted, margin: [0, 0, 0, 3] })), margin: [0, 4, 0, 0] },
    ], columnGap: 25, margin: [0, 0, 0, 11],
  }, {
    canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH, y2: 0, lineWidth: professional ? 1.2 : 1.8, lineColor: accent }],
  }];
  else if (creative) header = [name, ...headline, ...contactLine, {
    canvas: [{ type: "line", x1: 0, y1: 0, x2: 64, y2: 0, lineWidth: 2.5, lineColor: accent }], margin: [0, 11, 0, 6],
  }];
  else if (executive) {
    const band: Content[] = [
      ...(p.name.trim() ? [{ text: p.name, font: "Roboto", bold: true, fontSize: 28, color: onDark, lineHeight: 1.05, characterSpacing: 0.2 } as Content] : []),
      ...(p.headline.trim() ? [{ text: p.headline.toUpperCase(), fontSize: 9.6, characterSpacing: 1.6, color: tint(accent, 0.7), margin: [0, 6, 0, 0] } as Content] : []),
      ...(contact.length ? [{ text: contact.join("     "), fontSize: 9, color: tint(accent, 0.86), lineHeight: 1.35, margin: [0, 12, 0, 0] } as Content] : []),
    ];
    const bandContent: Content = photo ? { columns: [{ width: "*", stack: band }, { image: photo, width: 78, height: 78 }], columnGap: 20 } : { stack: band };
    header = band.length || photo ? [{
      table: { widths: ["*"], body: [[{ stack: [bandContent], fillColor: accent, margin: [MARGIN, photo ? 26 : 32, MARGIN, photo ? 22 : 26] }]] },
      layout: "noBorders", margin: [-MARGIN, -40, -MARGIN, 8],
    }] : [];
  } else if (timeline) header = [
    ...(p.name.trim() ? [{ text: p.name, font: "Roboto", bold: true, fontSize: 28, color: accent, lineHeight: 1.05, margin: [0, 0, 0, 5] } as Content] : []),
    ...(p.headline.trim() ? [{ text: p.headline, fontSize: 11, color: ink, margin: [0, 0, 0, 6] } as Content] : []),
    ...(contact.length ? [{ text: contact.join("   /   "), fontSize: 8.8, color: muted, lineHeight: 1.3 } as Content] : []),
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH, y2: 0, lineWidth: 1.2, lineColor: accent }], margin: [0, 11, 0, 2] },
  ];
  else if (compact) header = [
    ...(p.name.trim() ? [{ text: p.name, font: "Roboto", bold: true, fontSize: 20, color: ink, lineHeight: 1.05, margin: [0, 0, 0, 3] } as Content] : []),
    ...(p.headline.trim() || contact.length ? [{
      text: [
        ...(p.headline.trim() ? [{ text: p.headline, bold: true, color: accent, fontSize: 9.8 }] : []),
        ...contact.map((item, index) => ({ text: `${index || p.headline.trim() ? "   |   " : ""}${item}`, color: muted, fontSize: 8.8 })),
      ], lineHeight: 1.3,
    } as Content] : []),
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: PAGE_WIDTH - 76, y2: 0, lineWidth: 1.4, lineColor: accent }], margin: [0, 7, 0, 1] },
  ];
  else if (elegant) {
    const letters = initials(p.name);
    header = [
      ...(photo ? [{ columns: [{ width: "*", text: "" }, { image: photo, width: 54, height: 54 }, { width: "*", text: "" }], margin: [0, 0, 0, 8] } as Content] : []),
      ...(letters && !photo ? [{
        columns: [
          { width: "*", text: "" },
          { width: 40, stack: [
            { canvas: [{ type: "ellipse", x: 20, y: 20, r1: 19.5, r2: 19.5, lineColor: accent, lineWidth: 0.8 }] },
            { text: letters, alignment: "center", fontSize: letters.length > 2 ? 10 : 12.5, characterSpacing: 0.8, color: accent, margin: [0, letters.length > 2 ? -26 : -27.5, 0, 0] },
          ] },
          { width: "*", text: "" },
        ], margin: [0, 0, 0, 11],
      } as Content] : []),
      ...(p.name.trim() ? [{ text: p.name.toUpperCase(), fontSize: 25, characterSpacing: 3.6, alignment: "center", color: ink, lineHeight: 1.05, margin: [0, 0, 0, 6] } as Content] : []),
      ...(p.headline.trim() ? [{ text: p.headline, italics: true, fontSize: 11.5, alignment: "center", color: accent, margin: [0, 0, 0, 7] } as Content] : []),
      ...(contact.length ? [{ text: contact.join("   ·   "), fontSize: 9.6, alignment: "center", color: muted, lineHeight: 1.3 } as Content] : []),
      { columns: [{ width: "*", text: "" }, { width: 56, canvas: [{ type: "line", x1: 0, y1: 0, x2: 56, y2: 0, lineWidth: 0.9, lineColor: accent }] }, { width: "*", text: "" }], margin: [0, 13, 0, 0] },
    ];
  } else if (bold) header = [
    ...(p.name.trim() ? [{ text: p.name, font: "Roboto", bold: true, fontSize: 38, color: ink, lineHeight: 1, characterSpacing: -0.4, margin: [0, 2, 0, 5] } as Content] : []),
    ...(p.headline.trim() ? [{ text: p.headline, bold: true, fontSize: 12.5, color: accent, margin: [0, 0, 0, 8] } as Content] : []),
    ...(contact.length ? [{ text: contact.flatMap((item, index) => index ? [{ text: "   /   ", color: accent }, { text: item }] : [{ text: item }]), fontSize: 9, color: muted, lineHeight: 1.3, margin: [0, 0, 0, 4] } as Content] : []),
  ];
  else if (sidebar || atlas) header = [];
  else if (duo) {
    const nameBlock: Content[] = [
      ...(p.name.trim() ? [{ text: p.name, font: "Roboto", bold: true, fontSize: 27, color: onDark, lineHeight: 1.05 } as Content] : []),
      ...(p.headline.trim() ? [{ text: p.headline.toUpperCase(), fontSize: 9.4, characterSpacing: 1.5, color: tint(accent, 0.72), margin: [0, 7, 0, 0] } as Content] : []),
    ];
    const left: Content = photo
      ? { columns: [{ image: photo, width: 66, height: 66 }, { width: "*", stack: nameBlock, margin: [0, 6, 0, 0] }], columnGap: 16 }
      : { stack: nameBlock };
    header = nameBlock.length || contact.length || photo ? [{
      table: { widths: ["*", 176], body: [[
        { stack: [left], fillColor: accent, margin: [MARGIN, 30, 18, 26] },
        { stack: contact.map(item => ({ text: item, fontSize: 8.8, color: ink, lineHeight: 1.25, margin: [0, 0, 0, 3] })), fillColor: tint(accent, 0.86), margin: [18, 30, MARGIN, 22] },
      ]] },
      layout: "noBorders", margin: [-MARGIN, -40, -MARGIN, 6],
    }] : [];
  } else if (swiss) header = [
    ...(p.name.trim() ? [{ text: [{ text: p.name }, { text: ".", color: accent }], font: "Roboto", bold: true, fontSize: 40, color: ink, lineHeight: 0.98, characterSpacing: -0.8, margin: [0, 0, 0, 6] } as Content] : []),
    ...(p.headline.trim() ? [{ text: p.headline, fontSize: 13, color: muted, margin: [0, 0, 0, 14] } as Content] : []),
    ...(contact.length ? [{
      columns: ([["Email", p.email], ["Phone", p.phone], ["Location", p.location], ["Web", p.website]] as const).filter(([, value]) => value.trim()).map(([label, value]) => ({
        width: "*", text: [{ text: `${label}\n`, bold: true, fontSize: 8.4, color: ink }, { text: value, fontSize: 8.8, color: muted }], lineHeight: 1.3,
      })), columnGap: 14, margin: [0, 0, 0, 4],
    } as Content] : []),
  ];
  else if (tech) header = [
    ...(p.name.trim() ? [{ text: p.name, font: "Roboto", bold: true, fontSize: 25, color: ink, lineHeight: 1.05, margin: [0, 0, 0, 4] } as Content] : []),
    ...(p.headline.trim() ? [{ text: p.headline, bold: true, fontSize: 11.5, color: accent, margin: [0, 0, 0, 6] } as Content] : []),
    ...(contact.length ? [{ text: contact.flatMap((item, index) => index ? [{ text: "   ·   ", color: accent, bold: true }, { text: item }] : [{ text: item }]), fontSize: 9, color: muted, lineHeight: 1.3 } as Content] : []),
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: PAGE_WIDTH - 84, y2: 0, lineWidth: 0.8, lineColor: ink }], margin: [0, 10, 0, 0] },
  ];
  else if (corner) header = [{
    columns: [{ width: BODY_WIDTH - 150, stack: [
      ...(p.name.trim() ? [{ text: p.name, font: "Roboto", bold: true, fontSize: 34, color: ink, lineHeight: 1, characterSpacing: -0.3, margin: [0, 0, 0, 6] } as Content] : []),
      ...(p.headline.trim() ? [{ text: p.headline, bold: true, fontSize: 12.5, color: accent, margin: [0, 0, 0, 8] } as Content] : []),
      ...(contact.length ? [{ text: contact.join("   |   "), fontSize: 9, color: muted, lineHeight: 1.35 } as Content] : []),
    ] }, { width: "*", text: "" }], margin: [0, 0, 0, 4],
  }];
  else if (portrait) {
    const letters = initials(p.name);
    const avatar = (photo ? { image: photo, width: 86, height: 86 }
      : letters ? { width: 86, stack: [
        { canvas: [{ type: "ellipse", x: 43, y: 43, r1: 43, r2: 43, color: accent }] },
        { text: letters, alignment: "center", bold: true, fontSize: letters.length > 2 ? 22 : 27, color: onDark, margin: [0, letters.length > 2 ? -56 : -59, 0, 0] },
      ] } : null) as Content | null;
    const contactGrid: Content[] = contact.length ? [{
      columns: [0, 1].map(col => ({ width: "*", stack: contact.filter((_, i) => i % 2 === col).map(item => ({ text: item, fontSize: 9, color: muted, margin: [0, 0, 0, 3] })) })),
      columnGap: 14, margin: [0, 2, 0, 0],
    } as Content] : [];
    const info = { width: "*", stack: [
      ...(p.name.trim() ? [{ text: p.name, font: "Roboto", bold: true, fontSize: 28, color: ink, lineHeight: 1.05, margin: [0, 0, 0, 4] } as Content] : []),
      ...(p.headline.trim() ? [{ text: p.headline, bold: true, fontSize: 12, color: accent, margin: [0, 0, 0, 9] } as Content] : []),
      ...contactGrid,
    ], margin: [0, avatar ? 8 : 0, 0, 0] } as unknown as Content;
    header = [
      avatar ? { columns: [avatar, info], columnGap: 22 } as Content : info,
      { canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH, y2: 0, lineWidth: 1.6, lineColor: accent }], margin: [0, 14, 0, 2] },
    ];
  } else {
    header = [name, ...headline, ...contactLine];
    if (student || minimal) header.push({
      canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH, y2: 0, lineWidth: student ? 1 : 0.5, lineColor: student ? accent : "#b7bdc1" }],
      margin: [0, 10, 0, 3],
    });
  }

  const content: Content[] = [...header];
  if (modern) {
    const leftKeys: Section[] = ["experience", "projects"];
    const rightKeys: Section[] = ["education", "skills", "languages", "certifications"];
    const leftWidth = 320;
    const rightWidth = BODY_WIDTH - leftWidth - 25;
    const left = cv.sectionOrder.filter(key => leftKeys.includes(key)).flatMap(key => section(key, { width: leftWidth }));
    const right = cv.sectionOrder.filter(key => rightKeys.includes(key)).flatMap(key => section(key, { width: rightWidth, narrow: true }));
    content.push(...section("summary"));
    if (left.length && right.length) content.push({ columns: [{ width: leftWidth, stack: left }, { width: rightWidth, stack: right }], columnGap: 25 });
    else content.push(...cv.sectionOrder.filter(key => key !== "summary").flatMap(key => section(key)));
  } else if (sidebar) {
    const sideKeys: Section[] = ["education", "skills", "languages", "certifications"];
    const mainWidth = PAGE_WIDTH - SIDEBAR.left - SIDEBAR.width - SIDEBAR.gap - SIDEBAR.right;
    const sideCtx: Context = { dark: true, narrow: true, width: SIDEBAR.width };
    const letters = initials(p.name);
    const contactRows = ([["Email", p.email], ["Phone", p.phone], ["Location", p.location], ["Website", p.website]] as const).filter(([, value]) => value.trim());
    const side: Content[] = [
      ...(photo ? [{ columns: [{ image: photo, width: 76, height: 76 }, { width: "*", text: "" }], margin: [0, 0, 0, 6] } as Content] : []),
      ...(letters && !photo ? [{
        columns: [{ width: 52, stack: [
          { canvas: [{ type: "ellipse", x: 26, y: 26, r1: 25.5, r2: 25.5, lineColor: tint(accent, 0.45), lineWidth: 1 }] },
          { text: letters, alignment: "center", fontSize: letters.length > 2 ? 13 : 16, bold: true, color: onDark, characterSpacing: 0.6, margin: [0, letters.length > 2 ? -34 : -35.5, 0, 0] },
        ] }, { width: "*", text: "" }], margin: [0, 0, 0, 6],
      } as Content] : []),
      ...(contactRows.length ? [markHeading(darkHeading("Contact", SIDEBAR.width, letters || photo ? 16 : 2)), ...contactRows.map(([label, value]) => ({
        text: [{ text: `${label.toUpperCase()}\n`, fontSize: 7.4, characterSpacing: 0.9, bold: true, color: onDarkMuted }, { text: value, fontSize: 9, color: onDark }],
        lineHeight: 1.25, margin: [0, 0, 0, 7],
      } as Content))] : []),
      ...cv.sectionOrder.filter(key => sideKeys.includes(key)).flatMap(key => section(key, sideCtx)),
    ];
    const main: Content[] = [
      ...(p.name.trim() ? [{ text: p.name, font: "Roboto", bold: true, fontSize: 26, color: ink, lineHeight: 1.05, margin: [0, 2, 0, 5] } as Content] : []),
      ...(p.headline.trim() ? [{ text: p.headline, fontSize: 11.5, color: accent, bold: true, margin: [0, 0, 0, 4] } as Content] : []),
      ...cv.sectionOrder.filter(key => !sideKeys.includes(key)).flatMap(key => section(key, { width: mainWidth })),
    ];
    content.push({ columns: [{ width: SIDEBAR.width, stack: side }, { width: "*", stack: main }], columnGap: SIDEBAR.gap });
  } else if (atlas) {
    const sideKeys: Section[] = ["education", "skills", "languages", "certifications"];
    const mainWidth = PAGE_WIDTH - ATLAS.left - ATLAS.width - ATLAS.gap - ATLAS.right;
    const sideCtx: Context = { panel: true, narrow: true, width: ATLAS.width };
    const contactRows = ([["Email", p.email], ["Phone", p.phone], ["Location", p.location], ["Website", p.website]] as const).filter(([, value]) => value.trim());
    const side: Content[] = [
      ...(photo ? [{ columns: [{ image: photo, width: 92, height: 92 }, { width: "*", text: "" }], margin: [0, 0, 0, 4] } as Content] : []),
      ...(contactRows.length ? [markHeading({
        stack: [
          { text: "CONTACT", bold: true, fontSize: 8.6, characterSpacing: 1.5, color: accent, margin: [0, 0, 0, 4] },
          { canvas: [{ type: "line", x1: 0, y1: 0, x2: ATLAS.width, y2: 0, lineWidth: 0.6, lineColor: tint(accent, 0.55) }] },
        ], margin: [0, photo ? 14 : 4, 0, 7], headlineLevel: 1, unbreakable: true,
      } as Content), ...contactRows.map(([label, value]) => ({
        text: [{ text: `${label.toUpperCase()}\n`, fontSize: 7.4, characterSpacing: 0.9, bold: true, color: muted }, { text: value, fontSize: 9, color: ink }],
        lineHeight: 1.25, margin: [0, 0, 0, 7],
      } as Content))] : []),
      ...cv.sectionOrder.filter(key => sideKeys.includes(key)).flatMap(key => section(key, sideCtx)),
    ];
    const main: Content[] = [
      ...(p.name.trim() ? [{ text: p.name, font: "Roboto", bold: true, fontSize: 28, color: ink, lineHeight: 1.05, margin: [0, 2, 0, 5] } as Content] : []),
      ...(p.headline.trim() ? [{ text: p.headline, fontSize: 12, color: accent, bold: true, margin: [0, 0, 0, 4] } as Content] : []),
      ...cv.sectionOrder.filter(key => !sideKeys.includes(key)).flatMap(key => section(key, { width: mainWidth })),
    ];
    content.push({ columns: [{ width: "*", stack: main }, { width: ATLAS.width, stack: side }], columnGap: ATLAS.gap });
  } else if (summit) {
    const sideKeys: Section[] = ["education", "skills", "languages", "certifications"];
    const mainWidth = PAGE_WIDTH - SUMMIT.left - SUMMIT.width - SUMMIT.gap - SUMMIT.right;
    const sideCtx: Context = { panel: true, narrow: true, width: SUMMIT.width };
    const side: Content[] = [
      ...(contactKinds.length ? [markHeading(panelHeading("Contact", SUMMIT.width, 14)), ...contactKinds.map(([kind, value]) => iconRow(kind, value, accent, ink))] : []),
      ...cv.sectionOrder.filter(key => sideKeys.includes(key)).flatMap(key => section(key, sideCtx)),
    ];
    const main = cv.sectionOrder.filter(key => !sideKeys.includes(key)).flatMap(key => section(key, { width: mainWidth }));
    content.push({ columns: [{ width: SUMMIT.width, stack: side }, { width: "*", stack: main }], columnGap: SUMMIT.gap });
  } else if (gazette) {
    // A newspaper front page: the profile as a full-width lede, then two ruled columns.
    const rightKeys: Section[] = ["education", "skills", "languages", "certifications"];
    const leftWidth = 300, gap = 14;
    const rightWidth = fullWidth - leftWidth - gap * 2 - .5;
    if (!cv.hiddenSections.includes("summary") && cv.summary.trim()) content.push({ text: cv.summary.trim(), font: "Tinos", italics: true, fontSize: 11.8, lineHeight: 1.2 * leadingScale, color: ink, margin: [0, 11 * gapScale, 0, 2 * gapScale] });
    const left = cv.sectionOrder.filter(key => key !== "summary" && !rightKeys.includes(key)).flatMap(key => section(key, { width: leftWidth }));
    const right = cv.sectionOrder.filter(key => rightKeys.includes(key)).flatMap(key => section(key, { width: rightWidth, narrow: true }));
    if (left.length && right.length) content.push({
      table: { widths: [leftWidth, "*"], body: [[{ stack: left }, { stack: right }]] },
      layout: {
        hLineWidth: () => 0, vLineWidth: (i: number) => i === 1 ? .5 : 0, vLineColor: () => ink,
        paddingLeft: (i: number) => i === 1 ? gap : 0, paddingRight: (i: number) => i === 0 ? gap : 0, paddingTop: () => 0, paddingBottom: () => 0,
      },
    } as Content);
    else content.push(...cv.sectionOrder.filter(key => key !== "summary").flatMap(key => section(key)));
  } else if (ledger) {
    // One table for the whole CV, so the vertical rule runs unbroken from the name to the last entry.
    const ctx: Context = { width: BODY_WIDTH - LEDGER.label - LEDGER.gap - LEDGER.pad };
    const rows: Content[][] = []; const starts = new Set<number>();
    const intro: Content[] = [
      ...(p.name.trim() ? [{ text: p.name, bold: true, fontSize: fitSize(p.name, 27, 18, ctx.width), color: ink, lineHeight: 1.05, margin: [0, 0, 0, 5] } as Content] : []),
      ...headlineLine({ bold: true, fontSize: 12, color: accent, margin: [0, 0, 0, 9] }),
      ...contactKinds.map(([kind, value]) => ({ text: [{ text: `${kind === "website" ? "Web" : kind[0].toUpperCase() + kind.slice(1)}   `, bold: true, color: ink }, { text: value, color: muted }], fontSize: 9, lineHeight: 1.25, margin: [0, 0, 0, 1.5] } as Content)),
    ];
    if (intro.length) rows.push([{ text: "" }, { stack: intro, margin: [0, 0, 0, 2] }]);
    for (const key of cv.sectionOrder) {
      if (cv.hiddenSections.includes(key) || !sectionHasContent(cv, key)) continue;
      const textual = isTextSection(key);
      const blocks: Content[] = textual ? [{ stack: sectionBody(key, ctx) }] : cv[key].filter(hasEntry).map(entry => ({ stack: entryContent(entry, key, ctx) }));
      starts.add(rows.length);
      blocks.forEach((block, i) => rows.push([i === 0 ? {
        text: sectionTitle(cv, key), alignment: "right", bold: true, fontSize: 9.6, color: accent, lineHeight: 1.2, margin: [0, textual ? .4 : 3 * gapScale + .8, 0, 0],
      } : { text: "" }, block]));
    }
    if (rows.length) content.push({
      table: { widths: [LEDGER.label, "*"], body: rows },
      layout: {
        hLineWidth: () => 0, vLineWidth: (i: number) => i === 1 ? .8 : 0, vLineColor: () => tint(accent, .5),
        paddingLeft: (i: number) => i === 1 ? LEDGER.pad : 0, paddingRight: (i: number) => i === 0 ? LEDGER.gap : 0,
        paddingTop: (row: number) => row > 0 && starts.has(row) ? 15 * gapScale : 0, paddingBottom: () => 1,
      },
    } as Content);
  } else if (mosaic) {
    // Supporting sections become equal-height tinted tiles, placed where the first of them sits in the order.
    const tileKeys: Section[] = ["education", "skills", "certifications"];
    const tiles = cv.sectionOrder.filter(key => tileKeys.includes(key) && !cv.hiddenSections.includes(key) && sectionHasContent(cv, key));
    let placed = false;
    for (const key of cv.sectionOrder) {
      if (!tileKeys.includes(key)) { content.push(...section(key)); continue; }
      if (placed || !tiles.length) continue;
      placed = true;
      const gap = 8, pad = 12;
      const inner = (BODY_WIDTH - gap * (tiles.length - 1)) / tiles.length - pad * 2;
      content.push({
        table: { widths: tiles.map(() => "*"), body: [tiles.map(tileKey => ({
          stack: [
            { text: labelFor(tileKey).toUpperCase(), bold: true, fontSize: 8.4, characterSpacing: 1.4, color: accent, margin: [0, 0, 0, 5] },
            ...sectionBody(tileKey, { panel: true, narrow: true, width: inner }),
          ], fillColor: tint(accent, .91), margin: [pad, 11, pad, 8],
        }))] },
        layout: { hLineWidth: () => 0, vLineWidth: (i: number) => i > 0 && i < tiles.length ? gap : 0, vLineColor: () => "#ffffff", paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 },
        margin: [0, 18 * gapScale, 0, 2],
      } as Content);
    }
  } else if (timeline) content.push(...cv.sectionOrder.flatMap(timelineSection));
  else content.push(...cv.sectionOrder.flatMap(key => section(key)));
  trimTrailingMargin(content);

  const footerLeft = sidebar ? SIDEBAR.left + SIDEBAR.width + SIDEBAR.gap : summit ? SUMMIT.left + SUMMIT.width + SUMMIT.gap : margins[0];
  const footerRight = atlas ? ATLAS.right + ATLAS.width + ATLAS.gap : margins[2];

  return {
    pageSize: "A4", pageMargins: margins,
    defaultStyle: { font: cv.font === "sans" ? "Roboto" : cv.font === "serif" ? "Tinos" : serif ? "Tinos" : "Roboto", fontSize: regent ? 10.4 : editorial || gazette || heritage ? 10.2 : ribbon || outline ? 9.7 : creative ? 10.5 : elegant ? 10.4 : serif ? 11 : compact ? 9.4 : tech ? 9.7 : summit || mosaic || ledger || prism || tide || halo ? 9.7 : 10, color: ink, lineHeight: 1.12 * leadingScale },
    info: { title: p.name ? `${p.name} — CV` : "CV", author: p.name, creator: "Folio CV Maker" },
    background: aurora ? (page: number) => ({ canvas: page === 1 ? [
      { type: "rect", x: 0, y: 0, w: PAGE_WIDTH, h: 168, color: tint(accent, .95) },
      { type: "ellipse", x: PAGE_WIDTH + 6, y: -5, r1: 150, r2: 135, color: tint(accent, .86) },
      { type: "ellipse", x: PAGE_WIDTH + 14, y: -15, r1: 110, r2: 100, color: tint(accent, .74) },
    ] : [{ type: "rect", x: 0, y: 0, w: PAGE_WIDTH, h: 8, color: tint(accent, .74) }] } as Content)
      : sidebar ? () => ({ canvas: [{ type: "rect", x: 0, y: 0, w: SIDEBAR_FILL, h: PAGE_HEIGHT, color: accent }] })
      : bold ? () => ({ canvas: [{ type: "rect", x: 0, y: 0, w: PAGE_WIDTH, h: 7, color: accent }] })
      : atlas ? () => ({ canvas: [{ type: "rect", x: PAGE_WIDTH - ATLAS_FILL, y: 0, w: ATLAS_FILL, h: PAGE_HEIGHT, color: tint(accent, 0.9) }] })
      : summit ? () => ({ canvas: [{ type: "rect", x: 0, y: 0, w: SUMMIT_FILL, h: PAGE_HEIGHT, color: tint(accent, .91) }] })
      : edge ? () => ({ canvas: [{ type: "rect", x: 0, y: 0, w: EDGE.stripe, h: PAGE_HEIGHT, color: accent }] })
      : heritage ? () => ({ canvas: [
        { type: "rect", x: 22, y: 22, w: PAGE_WIDTH - 44, h: PAGE_HEIGHT - 44, lineWidth: 1.2, lineColor: accent },
        { type: "rect", x: 27, y: 27, w: PAGE_WIDTH - 54, h: PAGE_HEIGHT - 54, lineWidth: .45, lineColor: accent },
      ] })
      : prism ? (page: number) => ({ canvas: page === 1 ? [
        { type: "polyline", closePath: true, color: tint(accent, .62), points: [{ x: 0, y: PRISM.left - 4 }, { x: PAGE_WIDTH, y: PRISM.right - 4 }, { x: PAGE_WIDTH, y: PRISM.right + 12 }, { x: 0, y: PRISM.left + 16 }] },
        { type: "polyline", closePath: true, color: accent, points: [{ x: 0, y: 0 }, { x: PAGE_WIDTH, y: 0 }, { x: PAGE_WIDTH, y: PRISM.right }, { x: 0, y: PRISM.left }] },
        { type: "polyline", closePath: true, color: mixColor(accent, "#ffffff", .1), points: [{ x: PAGE_WIDTH * .6, y: 0 }, { x: PAGE_WIDTH, y: 0 }, { x: PAGE_WIDTH, y: PRISM.right }] },
      ] : [
        { type: "polyline", closePath: true, color: accent, points: [{ x: 0, y: 0 }, { x: PAGE_WIDTH, y: 0 }, { x: PAGE_WIDTH, y: 8 }, { x: 0, y: 20 }] },
      ] } as Content)
      : tide ? (page: number) => ({ canvas: page === 1 ? [
        { type: "polyline", closePath: true, color: tint(accent, .6), points: [{ x: 0, y: 0 }, { x: PAGE_WIDTH, y: 0 }, ...waveEdge(TIDE.base + 10, 11, 1.15, 1.9)] },
        { type: "polyline", closePath: true, color: accent, points: [{ x: 0, y: 0 }, { x: PAGE_WIDTH, y: 0 }, ...waveEdge(TIDE.base - 4, 13, 1.15, .9)] },
        ...(photo ? [{ type: "ellipse", x: PAGE_WIDTH - MARGIN - TIDE.photo / 2, y: 34 + TIDE.photo / 2, r1: TIDE.photo / 2 + 4, r2: TIDE.photo / 2 + 4, color: "#ffffff" }] : []),
      ] : [
        { type: "polyline", closePath: true, color: tint(accent, .6), points: [{ x: 0, y: 0 }, { x: PAGE_WIDTH, y: 0 }, ...waveEdge(16, 4, 1.6, 1.9)] },
        { type: "polyline", closePath: true, color: accent, points: [{ x: 0, y: 0 }, { x: PAGE_WIDTH, y: 0 }, ...waveEdge(10, 4, 1.6, .9)] },
      ] } as Content)
      : halo ? (page: number) => ({ canvas: page === 1 ? [
        { type: "rect", x: 0, y: 0, w: PAGE_WIDTH, h: HALO.band, color: accent },
        ...(photo || letters ? [{ type: "ellipse", x: PAGE_WIDTH / 2, y: HALO.band, r1: HALO.photo / 2 + 5, r2: HALO.photo / 2 + 5, color: "#ffffff" }] : []),
        ...(!photo && letters ? [{ type: "ellipse", x: PAGE_WIDTH / 2, y: HALO.band, r1: HALO.photo / 2, r2: HALO.photo / 2, color: tint(accent, .86) }] : []),
      ] : [{ type: "rect", x: 0, y: 0, w: PAGE_WIDTH, h: 9, color: accent }] } as Content)
      : corner ? (page: number) => {
        const big = page === 1 ? 140 : 56;
        return { canvas: [
          { type: "polyline", closePath: true, color: tint(accent, 0.78), points: [{ x: PAGE_WIDTH - big * 1.42, y: 0 }, { x: PAGE_WIDTH, y: 0 }, { x: PAGE_WIDTH, y: big * 1.42 }] },
          { type: "polyline", closePath: true, color: accent, points: [{ x: PAGE_WIDTH - big, y: 0 }, { x: PAGE_WIDTH, y: 0 }, { x: PAGE_WIDTH, y: big }] },
          ...(page === 1 ? [{ type: "polyline", closePath: true, color: tint(accent, 0.86), points: [{ x: 0, y: PAGE_HEIGHT - 54 }, { x: 0, y: PAGE_HEIGHT }, { x: 54, y: PAGE_HEIGHT }] }] : []),
        ] } as Content;
      }
      : undefined,
    content,
    footer: (page, pages) => pages > 1 ? {
      columns: [
        { text: p.name, fontSize: 8, color: "#858a91", width: "*", style: FOOTER_STYLE },
        { text: `${page} / ${pages}`, fontSize: 8, color: "#858a91", width: "auto", alignment: "right", style: FOOTER_STYLE },
      ], margin: [footerLeft, 13, footerRight, 0], style: FOOTER_STYLE,
    } : { text: "" },
    // Never leave a section heading alone at the foot of a page.
    pageBreakBefore: (node, following, nextPage) => node.headlineLevel === 1 && nextPage.length > 0 && following.every(item => item.style === HEADING_STYLE || item.style === FOOTER_STYLE),
  };
}
