import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { buildDocument } from "../src/lib/pdf-document";
import { PDF_FONTS, SERIF_FONT_FILES } from "../src/lib/pdf-fonts";
import { templates } from "../src/lib/model";
import { templateSample } from "../src/lib/template-sample";

const require = createRequire(import.meta.url);

async function main() {
  const requested = new Set(process.argv.slice(2));
  for (const id of requested) if (!templates.some(template => template.id === id)) throw new Error(`Unknown template: ${id}`);
  const pdfMake = require("pdfmake/build/pdfmake");
  pdfMake.addVirtualFileSystem({
    ...require("pdfmake/build/vfs_fonts"),
    ...Object.fromEntries(await Promise.all(SERIF_FONT_FILES.map(async name => [name, (await readFile(`public/fonts/tinos/${name}`)).toString("base64")]))),
  });
  pdfMake.fonts = PDF_FONTS;
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  // Fictional sample portrait (scripts/assets/sample-avatar.svg), masked to a circle exactly like
  // an uploaded photo. It is only used for these public previews, never in a user's CV.
  const avatar = await loadImage(await readFile("scripts/assets/sample-avatar.svg"));
  const photoCanvas = createCanvas(320, 320); const photoContext = photoCanvas.getContext("2d");
  photoContext.beginPath(); photoContext.arc(160, 160, 160, 0, Math.PI * 2); photoContext.clip();
  photoContext.drawImage(avatar, 0, 0, 320, 320);
  const samplePhoto = `data:image/png;base64,${photoCanvas.toBuffer("image/png").toString("base64")}`;
  await mkdir("public/templates", { recursive: true });
  await mkdir(".local-review/templates", { recursive: true });
  for (const template of templates.filter(template => requested.size === 0 || requested.has(template.id))) {
    const cv = templateSample(); cv.template = template.id;
    if (template.photo) cv.photo = samplePhoto;
    const buffer = await new Promise<Buffer>(resolve => pdfMake.createPdf(buildDocument(cv)).getBuffer(resolve));
    await writeFile(`.local-review/templates/${template.id}.pdf`, buffer);
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
    try {
      const page = await pdf.getPage(1); const viewport = page.getViewport({ scale: 1.6 });
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
      await page.render({ canvas: canvas as never, canvasContext: canvas.getContext("2d") as never, viewport }).promise;
      await writeFile(`public/templates/${template.id}.png`, canvas.toBuffer("image/png"));
      await writeFile(`public/templates/${template.id}.webp`, canvas.toBuffer("image/webp", 88));
      console.log(`${template.name}: generated actual PDF thumbnail (${pdf.numPages} page${pdf.numPages === 1 ? "" : "s"}).`);
    } finally { await pdf.destroy(); }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
