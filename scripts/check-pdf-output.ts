import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { buildDocument } from "../src/lib/pdf";
import { emptyCV, templates } from "../src/lib/model";
import { PDF_FONTS, SERIF_FONT_FILES } from "../src/lib/pdf-fonts";
const require = createRequire(import.meta.url);
const pdfMake = require("pdfmake/build/pdfmake");
pdfMake.addVirtualFileSystem({
  ...require("pdfmake/build/vfs_fonts"),
  ...Object.fromEntries(SERIF_FONT_FILES.map(name => [name, readFileSync(`public/fonts/tinos/${name}`).toString("base64")])),
});
pdfMake.fonts = PDF_FONTS;
async function main() {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const cv = emptyCV(); cv.personal.name = "Pagination verification";
  cv.experience = [{ id: "test", title: "Long experience", organization: "Example organization", dates: "2020 - Present", description: Array.from({ length: 100 }, (_, i) => `Evidence ${i + 1}: Built accessible applications, worked with colleagues, and documented the decisions for future maintainers.`).join("\n") + "\nFINAL_PARAGRAPH_VISIBLE" }];
  for (const template of templates) {
    cv.template = template.id;
    const buffer = await new Promise<Buffer>(resolve => pdfMake.createPdf(buildDocument(cv)).getBuffer(resolve));
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer), useSystemFonts: true }).promise;
    try {
      assert(pdf.numPages > 2, `${template.name} must paginate`);
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i); const viewport = page.getViewport({ scale: 1 });
        const content = await page.getTextContent();
        for (const item of content.items) {
          if (!("str" in item)) continue;
          fullText += item.str + " ";
          if (!item.str.trim()) continue;
          assert(item.transform[5] >= 15 && item.transform[5] <= viewport.height - 15, `${template.name}: text outside page vertically`);
          assert(item.transform[4] >= 20 && item.transform[4] + item.width <= viewport.width - 20, `${template.name}: text outside page horizontally`);
        }
      }
      for (let i = 1; i <= 100; i++) assert(fullText.includes(`Evidence ${i}:`), `${template.name}: missing paragraph ${i}`);
      assert(fullText.includes("FINAL_PARAGRAPH_VISIBLE"), `${template.name}: final paragraph missing`);
      console.log(`${template.name}: ${pdf.numPages} pages, all 100 paragraphs present, no text outside page boundaries.`);
    } finally { await pdf.destroy(); }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
