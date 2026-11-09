import type { CV } from "./model";
import { buildDocument } from "./pdf-document";
import { renderPDF } from "./pdf-engine";
export { buildDocument } from "./pdf-document";
export { downloadBlob } from "./pdf-engine";

export function generatePDF(cv: CV): Promise<Blob> { return renderPDF(buildDocument(cv)); }
