import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { bodyParagraphs, contactLine, greeting, letterLayouts, recipientLines, type CoverLetter } from "./cover-letter";

const SIZES = { A4: { width: 595.28, height: 841.89 }, LETTER: { width: 612, height: 792 } } as const;
const INK = "#202329", MUTED = "#5c636c";

/** The cover letter as a one-or-more-page PDF with selectable text, in the chosen layout and paper size. */
export function letterDocument(letter: CoverLetter): TDocumentDefinitions {
  const layout = letterLayouts.find(item => item.id === letter.layout) ?? letterLayouts[0];
  const accent = layout.accent; const page = SIZES[letter.paper];
  const classic = layout.id === "classic", modern = layout.id === "modern";
  const font = classic ? "Tinos" : "Roboto";
  const size = classic ? 11.2 : 10.4;
  const name = letter.name.trim() || "Your name";
  const contacts = contactLine(letter);
  const margin = classic ? 66 : 60;
  const header: Content[] = modern ? [
    { text: name, fontSize: 22, bold: true, color: "#ffffff", margin: [0, 0, 0, 6] },
    { text: contacts.join("   ·   "), fontSize: 9.4, color: "#dbe3ee" },
  ] : classic ? [
    { text: name, fontSize: 20, bold: true, alignment: "center", characterSpacing: .4, color: INK },
    { text: contacts.join("   ·   "), fontSize: 9.6, alignment: "center", color: MUTED, margin: [0, 6, 0, 12] },
    { canvas: [{ type: "line", x1: 0, y1: 0, x2: page.width - margin * 2, y2: 0, lineWidth: .6, lineColor: "#b9bfc5" }] },
  ] : [
    { canvas: [{ type: "rect", x: 0, y: 0, w: 28, h: 3, color: accent }], margin: [0, 0, 0, 12] },
    { text: name, fontSize: 17, bold: true, color: INK },
    { text: contacts.join("  |  "), fontSize: 9.2, color: MUTED, margin: [0, 5, 0, 0] },
  ];
  const recipient = recipientLines(letter);
  const content: Content[] = [
    ...header,
    { text: letter.date.trim(), fontSize: size - .6, color: MUTED, margin: [0, modern ? 52 : 26, 0, 0] },
    ...(recipient.length ? [{ stack: recipient.map(line => ({ text: line })), fontSize: size - .4, lineHeight: 1.25, margin: [0, 16, 0, 0] } as Content] : []),
    { text: greeting(letter), margin: [0, 22, 0, 12] },
    ...bodyParagraphs(letter).map(paragraph => ({ text: paragraph, alignment: "left", margin: [0, 0, 0, 10] } as Content)),
    { text: `${letter.signOff.trim() || "Kind regards"},`, margin: [0, 8, 0, 0], unbreakable: true },
    { text: name, bold: true, margin: [0, 18, 0, 0], color: modern ? accent : INK },
  ];
  return {
    pageSize: letter.paper, pageMargins: [margin, modern ? 44 : 56, margin, 56],
    info: { title: `${name} cover letter`, author: name, creator: "Folio cover letter maker" },
    defaultStyle: { font, fontSize: size, lineHeight: classic ? 1.32 : 1.4, color: INK },
    background: (currentPage: number) => modern && currentPage === 1 ? { canvas: [{ type: "rect", x: 0, y: 0, w: page.width, h: 112, color: accent }] } : null,
    content,
  } as TDocumentDefinitions;
}
