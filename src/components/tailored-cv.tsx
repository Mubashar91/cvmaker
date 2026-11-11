"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleAlert, Download, FileText, Info, LoaderCircle, ShieldCheck } from "lucide-react";
import { useCV } from "./cv-context";
import { PDFPreview } from "./pdf-preview";
import { trackEvent } from "@/lib/analytics";
import { downloadBlob, generatePDF } from "@/lib/pdf";
import type { TailoredCV } from "@/lib/tailor";

const fileBase = (name: string) => name.trim().replace(/[^\p{L}\p{N} _-]/gu, "").slice(0, 100) || "My";
const sectionNames: Record<string, string> = { summary: "Profile", skills: "Skills", experience: "Experience", projects: "Projects" };

/** The improved CV from the job match: preview, what changed, downloads, and opening it in the editor. */
export function TailoredCVResult({ result, stale }: { result: TailoredCV; stale: boolean }) {
  const router = useRouter();
  const { unsaved, saveDraft, loadCV, setNotice } = useCV();
  const [confirming, setConfirming] = useState(false);
  const [exporting, setExporting] = useState<"pdf" | "docx" | null>(null);
  const [error, setError] = useState("");
  const { after, edits, changes, missing, removedSkills, kept, keywords } = result;

  function open(saveFirst: boolean) {
    if (saveFirst) {
      try { saveDraft(); }
      catch (cause) { setError(cause instanceof Error ? cause.message : "Your open CV couldn’t be saved."); return; }
    }
    loadCV(after, { saved: false });
    setNotice(`Your improved CV is open as a new CV${saveFirst ? ", and your previous CV is saved in this browser" : ""}. Read every line, then choose Save draft to keep it.`);
    trackEvent("tailored_cv_opened");
    router.push("/editor/");
  }

  async function download(format: "pdf" | "docx") {
    setExporting(format); setError("");
    try {
      const name = `${fileBase(after.personal.name)} CV`;
      if (format === "pdf") downloadBlob(await generatePDF(after), `${name}.pdf`);
      else { const { generateDOCX } = await import("@/lib/docx-export"); downloadBlob(await generateDOCX(after), `${name}.docx`); }
      trackEvent("cv_downloaded", { format, template: after.template, source: "job-match" });
    } catch { setError(`The ${format === "pdf" ? "PDF" : "Word document"} couldn’t be generated. Please try again.`); }
    finally { setExporting(null); }
  }

  return <section className="tailored-cv" aria-labelledby="tailored-title">
    <div className="tool-output-head">
      <h2 id="tailored-title" className="tool-output-title">Your improved CV</h2>
      <span>{stale ? "Inputs changed" : edits.length ? `${edits.length} ${edits.length === 1 ? "part" : "parts"} reworded` : "No changes needed"}</span>
    </div>
    {stale && <p className="tool-note" role="status"><Info size={15} aria-hidden="true" />Your CV or job description has changed. This improved CV is for the previous text. Choose Improve my CV for this job again to update it.</p>}

    <div className="tailor-score" aria-label={`Advert keywords found in your CV: ${keywords.before}% before, ${keywords.after}% after`}>
      <div><strong>{keywords.before}%</strong><span>Advert keywords before</span></div>
      <ArrowRight size={18} aria-hidden="true" />
      <div className="is-after"><strong>{keywords.after}%</strong><span>After</span></div>
    </div>

    <div className="tailor-actions">
      <button type="button" className="button accent" disabled={exporting !== null} onClick={() => download("pdf")}>{exporting === "pdf" ? <LoaderCircle size={16} className="spin" aria-hidden="true" /> : <Download size={16} aria-hidden="true" />}Download PDF</button>
      <button type="button" className="button outline" disabled={exporting !== null} onClick={() => download("docx")} aria-label="Download Word document">{exporting === "docx" ? <LoaderCircle size={16} className="spin" aria-hidden="true" /> : <FileText size={16} aria-hidden="true" />}Word</button>
      <button type="button" className="button dark" onClick={() => unsaved ? setConfirming(true) : open(false)}>Open in editor<ArrowRight size={16} aria-hidden="true" /></button>
    </div>
    {confirming && <div className="tailor-confirm" role="group" aria-labelledby="tailor-confirm-text">
      <p id="tailor-confirm-text">The CV open in your editor has changes that aren’t saved in this browser. Save it first, so you keep both versions?</p>
      <div>
        <button type="button" className="button dark small" onClick={() => open(true)}>Save it, then open</button>
        <button type="button" className="button outline small" onClick={() => open(false)}>Open without saving</button>
        <button type="button" className="text-button" onClick={() => setConfirming(false)}>Cancel</button>
      </div>
    </div>}
    {error && <p className="notice error" role="alert">{error}</p>}

    <div className="tailor-preview"><PDFPreview cv={after} /></div>

    <section aria-labelledby="tailor-changes">
      <h3 id="tailor-changes">What changed</h3>
      {changes.length ? <ul className="ai-report-list">{changes.map(item => <li key={item.note}><span className="ai-section-tag">{sectionNames[item.section] ?? "CV"}</span><p>{item.note}</p></li>)}</ul>
        : <p className="tool-empty">{edits.length ? "The wording below was tightened for this advert." : "Your CV already answers this advert well, so no wording was changed."}</p>}
    </section>

    {edits.length > 0 && <details className="tailor-compare">
      <summary>Compare before and after ({edits.length})</summary>
      {edits.map(edit => <div className="tailor-edit" key={edit.label + edit.before}>
        <h4>{edit.label}</h4>
        <p className="ai-rewrite-current"><span className="sr-only">Before: </span>{edit.before || "(empty)"}</p>
        <p className="ai-rewrite-suggested"><span className="sr-only">After: </span>{edit.after}</p>
      </div>)}
    </details>}

    {(missing.length > 0 || removedSkills.length > 0) && <section aria-labelledby="tailor-missing">
      <h3 id="tailor-missing"><CircleAlert size={16} aria-hidden="true" />Not added: only add these if they’re true</h3>
      <ul className="ai-report-list is-gaps">
        {missing.map(item => <li key={item.requirement}><strong>{item.requirement}</strong><p>{item.advice}</p></li>)}
        {removedSkills.length > 0 && <li><strong>Skills your CV doesn’t mention</strong><p>{removedSkills.join(", ")}. These were left out because nothing in your CV shows them. Add any that are genuinely yours in the editor.</p></li>}
      </ul>
    </section>}
    {kept.length > 0 && <ul className="tool-note tailor-kept">{kept.map(reason => <li key={reason}>{reason}</li>)}</ul>}

    <p className="tool-note"><ShieldCheck size={15} aria-hidden="true" />Job titles, employers, dates, education, certifications, and contact details are never changed. AI can still misread your CV, so read every line before you send it.</p>
  </section>;
}
