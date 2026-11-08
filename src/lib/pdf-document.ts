import type { Content, ContentText, TDocumentDefinitions } from "pdfmake/interfaces";
import { type CV, type Entry, type EntrySection, type Section, hasEntry, sectionHasContent, sectionLabels, templateById } from "./model";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const BODY_WIDTH = PAGE_WIDTH - MARGIN * 2;
const labels: Record<Section, string> = {
  summary: "Professional summary", experience: "Work experience", education: "Education",
  skills: "Skills", projects: "Projects", certifications: "Certifications",
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
  const serif = classic || professional || creative || elegant || academic || editorial;
  const photo = cv.photo;
  const accent = cv.accent ?? templateById(template).color;
  const ink = "#202329";
  const muted = "#5c636c";
  const onDark = "#ffffff";
  const onDarkMuted = tint(accent, 0.74);
  const rule = "#cbd2d6";
  const gapScale = cv.density === "compact" ? .72 : cv.density === "relaxed" ? 1.35 : 1;
  const leadingScale = cv.density === "compact" ? .96 : cv.density === "relaxed" ? 1.09 : 1;
  const lineHeight = (classic || ribbon || outline || editorial ? 1.08 : compact ? 1.1 : 1.15) * leadingScale;
  const visibleSections = cv.sectionOrder.filter(key => !cv.hiddenSections.includes(key) && sectionHasContent(cv, key));
  const sectionNumber = (key: Section) => String(visibleSections.indexOf(key) + 1).padStart(2, "0");
  const sizes = {
    title: compact ? 9.9 : editorial ? 10.5 : elegant ? 11 : serif ? 11.3 : 10.3,
    secondary: compact ? 9.3 : editorial ? 10 : serif ? 10.8 : 9.5,
    date: compact ? 8.6 : editorial ? 9.5 : serif ? 10.5 : 9,
  };

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
        ...(ctx.dark ? { color: onDark, markerColor: onDarkMuted } : bold || timeline || duo || tech || corner || portrait || atlas ? { markerColor: accent } : {}),
      } as Content];
    }
    return lines.map(line => paragraph(line, ctx));
  }

  function entryContent(entry: Entry, key: EntrySection, ctx: Context): Content[] {
    // Classic and Professional follow a traditional CV: employer/institution, followed by role/degree.
    const institutionFirst = (classic || professional || academic) && (key === "experience" || key === "education");
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
    const secondaryColor = ctx.dark ? onDarkMuted : executive || bold || timeline || duo || tech || portrait || (atlas && !ctx.panel) ? accent : classic ? ink : muted;
    const dateColor = ctx.dark ? onDarkMuted : classic ? ink : elegant || corner ? accent : muted;
    const title: ContentText = { text: primary, bold: true, fontSize: ctx.dark ? 9.8 : sizes.title, color: titleColor };
    const date: ContentText = { text: entry.dates, fontSize: ctx.dark ? 8.6 : sizes.date, color: dateColor, italics: elegant, alignment: "right" };
    const top: Content = ctx.narrow ? {
      stack: [title, ...(hasDates ? [{ ...date, alignment: "left", margin: [0, 2, 0, 1] } as Content] : [])],
    } : {
      columns: [{ ...title, width: "*" }, ...(hasDates ? [{ ...date, width: 112 }] : [])], columnGap: 12,
    };
    return [{
      stack: [top, ...(secondary.trim() ? [{
        text: secondary, italics: classic || professional || elegant, color: secondaryColor,
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
    if (key === "skills") return cv.skills.split(/\n+/).filter(line => line.trim()).map(line => {
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

  function heading(key: Section, ctx: Context): Content {
    const label = labels[key];
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
    if (ctx.panel) return {
      stack: [
        { text: label.toUpperCase(), bold: true, fontSize: 8.6, characterSpacing: 1.5, color: accent, margin: [0, 0, 0, 4] },
        { canvas: [{ type: "line", x1: 0, y1: 0, x2: ctx.width, y2: 0, lineWidth: 0.6, lineColor: tint(accent, 0.55) }] },
      ], margin: [0, 16, 0, 7], headlineLevel: 1, unbreakable: true,
    };
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
    const sideMain = sidebar || atlas;
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
  const fullWidth = compact ? PAGE_WIDTH - 76 : tech ? PAGE_WIDTH - 84 : elegant ? PAGE_WIDTH - 112 : BODY_WIDTH;
  function sectionSpacing(node: Content): Content {
    if (gapScale === 1 || typeof node !== "object" || node === null || Array.isArray(node) || !("margin" in node) || !Array.isArray(node.margin) || node.margin.length !== 4) return node;
    return { ...node, margin: [node.margin[0], node.margin[1] * gapScale, node.margin[2], node.margin[3] * gapScale] } as Content;
  }
  function section(key: Section, ctx: Context = { width: fullWidth }): Content[] {
    const body = sectionBody(key, ctx);
    if (!body.length) return [];
    if (minimal) return [{
      columns: [
        { width: 88, text: labels[key].toUpperCase(), fontSize: 8.8, bold: true, characterSpacing: 1, color: muted, margin: [0, 4, 0, 0] },
        { width: "*", stack: body },
      ], columnGap: 20, margin: [0, 15 * gapScale, 0, 4 * gapScale],
    }];
    if (swiss) return [
      markHeading({ canvas: [{ type: "line", x1: 0, y1: 0, x2: BODY_WIDTH_SWISS, y2: 0, lineWidth: 2.4, lineColor: ink }], margin: [0, 16 * gapScale, 0, 0], headlineLevel: 1 } as Content),
      { columns: [
        { width: SWISS_LABEL, text: sectionLabels[key], bold: true, fontSize: 11, lineHeight: 1.1, color: ink, margin: [0, 8, 0, 0] },
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
      stack: [marker, { text: labels[key].toUpperCase(), bold: true, fontSize: 9.5, characterSpacing: 1.5, color: accent, margin: [TIMELINE_INDENT, 0, 0, 0] }],
      margin: [0, 15 * gapScale, 0, 6 * gapScale], headlineLevel: 1, unbreakable: true,
    } as Content);
    if (key === "summary" || key === "skills") {
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

  let header: Content[];
  if (academic) header = [
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
    const rightKeys: Section[] = ["education", "skills", "certifications"];
    const leftWidth = 320;
    const rightWidth = BODY_WIDTH - leftWidth - 25;
    const left = cv.sectionOrder.filter(key => leftKeys.includes(key)).flatMap(key => section(key, { width: leftWidth }));
    const right = cv.sectionOrder.filter(key => rightKeys.includes(key)).flatMap(key => section(key, { width: rightWidth, narrow: true }));
    content.push(...section("summary"));
    if (left.length && right.length) content.push({ columns: [{ width: leftWidth, stack: left }, { width: rightWidth, stack: right }], columnGap: 25 });
    else content.push(...cv.sectionOrder.filter(key => key !== "summary").flatMap(key => section(key)));
  } else if (sidebar) {
    const sideKeys: Section[] = ["education", "skills", "certifications"];
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
    const sideKeys: Section[] = ["education", "skills", "certifications"];
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
  } else if (timeline) content.push(...cv.sectionOrder.flatMap(timelineSection));
  else content.push(...cv.sectionOrder.flatMap(key => section(key)));
  trimTrailingMargin(content);

  const margins: [number, number, number, number] = sidebar ? [SIDEBAR.left, 44, SIDEBAR.right, 43]
    : atlas ? [ATLAS.left, 44, ATLAS.right, 43]
    : compact ? [38, 34, 38, 40] : tech ? [42, 38, 42, 40] : elegant ? [56, 40, 56, 42] : swiss ? [SWISS_MARGIN, 48, SWISS_MARGIN, 44]
    : executive || duo ? [MARGIN, 40, MARGIN, 43] : corner ? [MARGIN, 44, MARGIN, 43]
    : [MARGIN, classic ? 39 : 44, MARGIN, 43];
  const footerLeft = sidebar ? SIDEBAR.left + SIDEBAR.width + SIDEBAR.gap : margins[0];
  const footerRight = atlas ? ATLAS.right + ATLAS.width + ATLAS.gap : margins[2];

  return {
    pageSize: "A4", pageMargins: margins,
    defaultStyle: { font: cv.font === "sans" ? "Roboto" : cv.font === "serif" ? "Tinos" : serif ? "Tinos" : "Roboto", fontSize: editorial ? 10.2 : ribbon || outline ? 9.7 : creative ? 10.5 : elegant ? 10.4 : serif ? 11 : compact ? 9.4 : tech ? 9.7 : 10, color: ink, lineHeight: 1.12 * leadingScale },
    info: { title: p.name ? `${p.name} — CV` : "CV", author: p.name, creator: "Folio CV Maker" },
    background: sidebar ? () => ({ canvas: [{ type: "rect", x: 0, y: 0, w: SIDEBAR_FILL, h: PAGE_HEIGHT, color: accent }] })
      : bold ? () => ({ canvas: [{ type: "rect", x: 0, y: 0, w: PAGE_WIDTH, h: 7, color: accent }] })
      : atlas ? () => ({ canvas: [{ type: "rect", x: PAGE_WIDTH - ATLAS_FILL, y: 0, w: ATLAS_FILL, h: PAGE_HEIGHT, color: tint(accent, 0.9) }] })
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
