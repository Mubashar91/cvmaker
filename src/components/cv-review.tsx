"use client";
import Link from "next/link";
import { ArrowRight, Check, Circle, ClipboardCheck, FileText, LockKeyhole } from "lucide-react";
import { cvPlainText, reviewCV, type ReviewSection } from "@/lib/cv-review";
import { downloadBlob } from "@/lib/pdf";
import { type CV } from "@/lib/model";

export function CVReview({ cv, onEdit }: { cv: CV; onEdit: (section: ReviewSection) => void }) {
  const checks = reviewCV(cv);
  const ready = checks.filter(check => check.passed).length;
  const text = cvPlainText(cv);
  const words = text.split(/\s+/).filter(Boolean).length;
  return <div className="cv-review-panel" id="review-panel" tabIndex={-1}>
    <div className="form-heading"><h2>A final look, before you send.</h2></div>
    <p className="form-description">A few practical checks for a clearer application. You decide what belongs in your CV.</p>
    <div className="review-overview"><span className="review-symbol"><ClipboardCheck size={26} /></span><div><strong>{ready} of {checks.length} checks ready</strong><p>{words} {words === 1 ? "word" : "words"} in your visible content</p></div><span className="review-fraction">{ready}/{checks.length}</span></div>
    <progress className="review-progress" value={ready} max={checks.length} aria-label="CV checks ready" />
    <ul className="review-checks">{checks.map(check => <li key={check.id} className={check.passed ? "is-ready" : "needs-attention"}>
      <span className="review-check-icon" aria-hidden="true">{check.passed ? <Check size={18} /> : <Circle size={18} />}</span><div><h3>{check.title}<span className="sr-only">{check.passed ? ": ready" : ": review suggested"}</span></h3><p>{check.detail}</p></div>{!check.passed && <button onClick={() => onEdit(check.section)} aria-label={`Edit ${check.title.toLowerCase()}`}>Edit<ArrowRight size={14} /></button>}
    </li>)}</ul>
    <div className="review-note"><LockKeyhole size={17} /><p>These checks run on your device. They do not predict an ATS result or an employer’s decision. Check facts, spelling, and the vacancy instructions yourself.</p></div>
    <details className="review-text"><summary><FileText size={17} />Read your CV as plain text</summary><p>Useful for checking wording or pasting into an application form. Hidden and empty sections are left out.</p><pre>{text || "Your CV text will appear here as you add details."}</pre><button className="button outline" disabled={!text.trim()} onClick={() => { const name = cv.personal.name.trim().replace(/[^\p{L}\p{N} _-]/gu, "").slice(0, 100) || "My"; downloadBlob(new Blob([text], { type: "text/plain;charset=utf-8" }), `${name} CV.txt`); }}>Download text version<FileText size={15} /></button></details>
    <Link className="text-link" href="/tips/before-you-send/" target="_blank" rel="noopener noreferrer">Read the final CV checklist<ArrowRight size={15} /></Link>
  </div>;
}
