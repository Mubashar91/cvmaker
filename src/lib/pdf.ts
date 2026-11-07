import type { CV } from "./model";
import { buildDocument } from "./pdf-document";
import { PDF_FONTS, SERIF_FONT_FILES } from "./pdf-fonts";
export { buildDocument } from "./pdf-document";

function base64(bytes: Uint8Array): string {
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 8192) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
  }
  return btoa(binary);
}

type PDFEngine = typeof import("pdfmake/build/pdfmake") & {
  addVirtualFileSystem: (files: Record<string, string>) => void;
};
let pdfLibrary: Promise<PDFEngine> | undefined;
export async function generatePDF(cv: CV): Promise<Blob> {
  pdfLibrary ??= import("pdfmake/build/pdfmake").then(async mod => {
    const pdfMake = (mod.default || mod) as PDFEngine;
    const fonts = await import("pdfmake/build/vfs_fonts");
    const serifFonts = await Promise.all(SERIF_FONT_FILES.map(async file => {
      const response = await fetch(`/fonts/tinos/${file}`, { cache: "force-cache" });
      if (!response.ok) throw new Error(`Could not load local font ${file}`);
      return [file, base64(new Uint8Array(await response.arrayBuffer()))] as const;
    }));
    pdfMake.addVirtualFileSystem({ ...(fonts.default || fonts), ...Object.fromEntries(serifFonts) });
    pdfMake.fonts = PDF_FONTS;
    return pdfMake;
  }).catch(error => { pdfLibrary = undefined; throw error; });
  const pdfMake = await pdfLibrary;
  return new Promise((resolve, reject) => {
    try { pdfMake.createPdf(buildDocument(cv), undefined, PDF_FONTS).getBlob(resolve); } catch (err) { reject(err); }
  });
}

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
