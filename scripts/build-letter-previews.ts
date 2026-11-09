import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { createCanvas } from "@napi-rs/canvas";
import { letterDocument } from "../src/lib/cover-letter-pdf";
import { letterLayouts, sampleLetter } from "../src/lib/cover-letter";
import { PDF_FONTS, SERIF_FONT_FILES } from "../src/lib/pdf-fonts";

// Renders page one of the fictional sample letter in each layout through the real PDF code,
// so the cover letter maker and guide show exactly what a download looks like.
const require = createRequire(import.meta.url);

async function main() {
  const pdfMake = require("pdfmake/build/pdfmake");
  pdfMake.addVirtualFileSystem({
    ...require("pdfmake/build/vfs_fonts"),
    ...Object.fromEntries(await Promise.all(SERIF_FONT_FILES.map(async name => [name, (await readFile(`public/fonts/tinos/${name}`)).toString("base64")]))),
  });
  pdfMake.fonts = PDF_FONTS;
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  await mkdir("public/cover-letters", { recursive: true });
  for (const layout of letterLayouts) {
    const buffer = await new Promise<Buffer>(resolve => pdfMake.createPdf(letterDocument(sampleLetter(layout.id))).getBuffer(resolve));
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
    try {
      const page = await pdf.getPage(1); const viewport = page.getViewport({ scale: 1.6 });
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
      await page.render({ canvas: canvas as never, canvasContext: canvas.getContext("2d") as never, viewport }).promise;
      await writeFile(`public/cover-letters/${layout.id}.webp`, canvas.toBuffer("image/webp", 88));
      console.log(`${layout.name}: rendered sample cover letter (${pdf.numPages} page${pdf.numPages === 1 ? "" : "s"}).`);
    } finally { await pdf.destroy(); }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
