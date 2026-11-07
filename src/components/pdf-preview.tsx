"use client";
import { useEffect, useState } from "react";
import { LoaderCircle, FileText } from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { type CV, hasContent } from "@/lib/model";
import { generatePDF } from "@/lib/pdf";

export function PDFPreview({ cv }: { cv: CV }) {
  const [pages, setPages] = useState<string[]>([]); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    if (!hasContent(cv)) return;
    const timer = setTimeout(async () => {
      setBusy(true); setError("");
      let pdf: PDFDocumentProxy | undefined;
      try {
        const blob = await generatePDF(cv);
        const pdfjs = await import("pdfjs-dist"); pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        if (cancelled) return;
        pdf = await pdfjs.getDocument({ data: await blob.arrayBuffer() }).promise;
        const next: string[] = [];
        for (let n = 1; n <= pdf.numPages; n++) {
          if (cancelled) return;
          const page = await pdf.getPage(n); const viewport = page.getViewport({ scale: 1.35 });
          const canvas = document.createElement("canvas"); canvas.width = viewport.width; canvas.height = viewport.height;
          const context = canvas.getContext("2d"); if (!context) throw new Error("Canvas unavailable");
          await page.render({ canvas, canvasContext: context, viewport }).promise;
          next.push(canvas.toDataURL("image/png"));
        }
        if (!cancelled) setPages(next);
      } catch { if (!cancelled) setError("The preview couldn’t render. Try changing the template or shortening an unusually long entry."); }
      finally { if (pdf) await pdf.destroy(); if (!cancelled) setBusy(false); }
    }, 650);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [cv]);
  if (!hasContent(cv)) return <div className="preview-empty"><FileText size={36} strokeWidth={1} /><h3>Your next chapter starts here.</h3><p>Add your details to see your CV come to life.</p><div className="ghost-line" /><div className="ghost-line short" /><div className="ghost-line" /></div>;
  return <div className="pdf-pages" aria-busy={busy}>
    <div className="preview-status" role="status">{busy ? <><LoaderCircle size={14} className="spin" /> Updating preview</> : `${pages.length || "…"} ${pages.length === 1 ? "page" : "pages"} · A4`}</div>
    {error && <p className="notice error" role="alert">{error}</p>}
    {pages.map((src, i) => <div className="pdf-page" key={i}><img src={src} alt={`CV preview, page ${i + 1}`} /><span className="page-caption">Page {i + 1} of {pages.length}</span></div>)}
    {!pages.length && busy && <div className="preview-loading"><LoaderCircle className="spin" /> Preparing your preview…</div>}
  </div>;
}
