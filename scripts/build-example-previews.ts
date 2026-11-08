import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { createCanvas } from "@napi-rs/canvas";
import { buildDocument } from "../src/lib/pdf-document";
import { PDF_FONTS, SERIF_FONT_FILES } from "../src/lib/pdf-fonts";
import { cvExamples, exampleCV } from "../src/lib/cv-examples";

// Renders page one of each job-specific example CV through the real PDF pipeline,
// so the image on /cv-examples/<slug>/ is exactly what the editor will produce.
const require = createRequire(import.meta.url);

async function main() {
  const requested = new Set(process.argv.slice(2));
  for (const slug of requested) if (!cvExamples.some(example => example.slug === slug)) throw new Error(`Unknown CV example: ${slug}`);
  const pdfMake = require("pdfmake/build/pdfmake");
  pdfMake.addVirtualFileSystem({
    ...require("pdfmake/build/vfs_fonts"),
    ...Object.fromEntries(await Promise.all(SERIF_FONT_FILES.map(async name => [name, (await readFile(`public/fonts/tinos/${name}`)).toString("base64")]))),
  });
  pdfMake.fonts = PDF_FONTS;
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  await mkdir("public/examples", { recursive: true });
  for (const example of cvExamples.filter(example => requested.size === 0 || requested.has(example.slug))) {
    const buffer = await new Promise<Buffer>(resolve => pdfMake.createPdf(buildDocument(exampleCV(example))).getBuffer(resolve));
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
    try {
      const page = await pdf.getPage(1); const viewport = page.getViewport({ scale: 1.6 });
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
      await page.render({ canvas: canvas as never, canvasContext: canvas.getContext("2d") as never, viewport }).promise;
      await writeFile(`public/examples/${example.slug}.webp`, canvas.toBuffer("image/webp", 88));
      console.log(`${example.job}: rendered example CV (${pdf.numPages} page${pdf.numPages === 1 ? "" : "s"}).`);
    } finally { await pdf.destroy(); }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
