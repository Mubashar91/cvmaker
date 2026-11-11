"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CircleAlert, Copy, FileUp, Info, LoaderCircle, LockKeyhole, RotateCcw, Sparkles, UserRound } from "lucide-react";
import { useCV } from "./cv-context";
import { TextInput } from "./tool-fields";
import { cvPlainText } from "@/lib/cv-review";
import { hasContent } from "@/lib/model";

export interface MatchReport {
  matches: { requirement: string; evidence: string }[];
  gaps: { requirement: string; advice: string }[];
  improvements: { section: string; suggestion: string }[];
  rewrites: { current: string; suggested: string; reason: string }[];
}

const sectionLabels: Record<string, string> = { summary: "Summary", skills: "Skills", experience: "Experience", other: "Elsewhere" };
const isEntry = (fields: string[]) => (item: unknown) => !!item && typeof item === "object" && fields.every(field => typeof (item as Record<string, unknown>)[field] === "string");
function parseReport(data: unknown): MatchReport | null {
  if (!data || typeof data !== "object") return null;
  const raw = data as Record<string, unknown[]>;
  const report: MatchReport = {
    matches: (Array.isArray(raw.matches) ? raw.matches : []).filter(isEntry(["requirement", "evidence"])) as MatchReport["matches"],
    gaps: (Array.isArray(raw.gaps) ? raw.gaps : []).filter(isEntry(["requirement", "advice"])) as MatchReport["gaps"],
    improvements: (Array.isArray(raw.improvements) ? raw.improvements : []).filter(isEntry(["section", "suggestion"])) as MatchReport["improvements"],
    rewrites: (Array.isArray(raw.rewrites) ? raw.rewrites : []).filter(isEntry(["current", "suggested", "reason"])) as MatchReport["rewrites"],
  };
  return report.matches.length + report.gaps.length + report.improvements.length ? report : null;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return <button type="button" className="text-button" onClick={() => { navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2_000); }).catch(() => {}); }}>
    <Copy size={13} aria-hidden="true" />{copied ? "Copied" : label}
  </button>;
}

export function JobMatch() {
  const { cv } = useCV(); const fileInput = useRef<HTMLInputElement>(null);
  const [job, setJob] = useState(""); const [resume, setResume] = useState("");
  const [busy, setBusy] = useState(false); const [note, setNote] = useState(""); const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<MatchReport | null>(null);
  const [checkedTexts, setCheckedTexts] = useState<{ cv: string; job: string } | null>(null);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => { controller.current?.abort(); controller.current = null; }, []);

  const cvReady = resume.trim().length >= 200 && resume.trim().length <= 12_000;
  const jobReady = job.trim().length >= 100 && job.trim().length <= 8_000;
  const stale = report !== null && checkedTexts !== null && (checkedTexts.cv !== resume.trim() || checkedTexts.job !== job.trim());

  async function readFile(file: File) {
    setBusy(true); setError(""); setNote("");
    try { const { importCV } = await import("@/lib/import-cv"); const { text } = await importCV(file); setResume(text); setNote(`Text read from ${file.name} on this device. Nothing is sent until you check the match.`); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "This file couldn’t be read. Paste your CV text instead."); }
    finally { setBusy(false); if (fileInput.current) fileInput.current.value = ""; }
  }

  async function check() {
    if (!cvReady || !jobReady || busy || controller.current) return;
    const request = new AbortController(); controller.current = request;
    const timeout = setTimeout(() => request.abort(), 60_000);
    setLoading(true); setError(""); setReport(null);
    try {
      const response = await fetch("/api/cv-job-match", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cv: resume.trim(), job: job.trim() }), signal: request.signal });
      const data = await response.json().catch(() => null);
      const parsed = response.ok ? parseReport(data) : null;
      if (!parsed) throw new Error(typeof (data as { error?: string } | null)?.error === "string" ? (data as { error: string }).error : "The AI job match is unavailable right now. Please try again later.");
      setReport(parsed);
      setCheckedTexts({ cv: resume.trim(), job: job.trim() });
    } catch (cause) {
      if (controller.current === request) setError(request.signal.aborted ? "The request timed out. Please try again." : cause instanceof Error && !(cause instanceof TypeError) ? cause.message : "Could not connect to the AI service. Please try again.");
    } finally {
      clearTimeout(timeout);
      if (controller.current === request) { controller.current = null; setLoading(false); }
    }
  }

  return <div className="tool-workspace keyword-workspace">
    <div className="tool-form"><section className="tool-step" aria-labelledby="match-inputs"><div className="tool-step-head"><h2 id="match-inputs"><span className="step-number">1</span>Add the advert and your CV</h2></div>
      <TextInput label="Job description" value={job} onChange={setJob} multiline rows={9} hint={`${job.trim().length.toLocaleString()} characters · use 100–8,000`} placeholder="Paste the full job advert, including requirements and responsibilities." />
      <div className="resume-source"><span>Your CV:</span>{hasContent(cv) && <button type="button" className="inline-action" onClick={() => { setResume(cvPlainText(cv)); setNote("Using the CV open in your editor. Nothing is sent until you check the match."); setError(""); }}><UserRound size={15} aria-hidden="true" />Use the CV in my editor</button>}<button type="button" className="inline-action" disabled={busy} onClick={() => fileInput.current?.click()}>{busy ? <LoaderCircle size={15} className="spin" aria-hidden="true" /> : <FileUp size={15} aria-hidden="true" />}Read a PDF or DOCX</button><input ref={fileInput} type="file" className="sr-only" accept=".pdf,.docx" aria-label="Read CV text from a PDF or DOCX file" onChange={event => { const file = event.target.files?.[0]; if (file) void readFile(file); }} /></div>
      <TextInput label="Your CV text" value={resume} onChange={setResume} multiline rows={9} hint={`${resume.trim().length.toLocaleString()} characters · use 200–12,000`} placeholder="Paste the text of your CV or resume. Remove anything you’d rather not send." />
      <div aria-live="polite">{note && <p className="notice success">{note}</p>}{error && <p className="notice error" role="alert">{error}</p>}</div>
      <button type="button" className="button dark ai-match-action" disabled={!cvReady || !jobReady || loading || busy} onClick={check} aria-describedby="ai-match-note">
        {loading ? <LoaderCircle size={16} className="spin" aria-hidden="true" /> : <Sparkles size={16} aria-hidden="true" />}{loading ? "Checking your match…" : "Check my match"}
      </button>
      <p id="ai-match-note" className="ai-summary-note">{!jobReady || !cvReady ? "Use 100–8,000 characters for the job description and 200–12,000 for the CV. " : ""}Checking sends this CV text and the advert to OpenAI to write the report. Nothing is sent before you choose, and our server does not store either text. <Link href="/privacy/#ai">Privacy details</Link>.</p>
      {(job || resume) && !loading && <button type="button" className="text-button" onClick={() => { setJob(""); setResume(""); setNote(""); setError(""); setReport(null); }}><RotateCcw size={13} aria-hidden="true" />Clear everything</button>}
    </section></div>
    <div className="tool-output"><div className="tool-output-head"><h2 className="tool-output-title">Your match report</h2><span>{loading ? "Usually 10–30 seconds" : stale ? "Inputs changed" : report ? `${report.matches.length} matched · ${report.gaps.length} to review` : "Waiting for your check"}</span></div>
      {stale && <p className="tool-note" role="status"><Info size={15} aria-hidden="true" />Your CV or job description has changed. This report is for the previous text. Choose Check my match again to update it.</p>}
      <span className="sr-only" role="status">{loading ? "AI is checking your CV against the job description." : report ? "Your match report is ready." : ""}</span>
      {!report && <p className="tool-empty">{loading ? "Reading the advert’s requirements and looking for evidence in your CV…" : "Paste a job description, add your CV, and choose Check my match. The report shows what you already demonstrate, what is missing, and what to improve — using only your real experience."}</p>}
      {report && <div className="ai-report">
        <section aria-labelledby="matched-requirements"><h3 id="matched-requirements">Requirements you demonstrate</h3>
          {report.matches.length ? <ul className="ai-report-list">{report.matches.map(item => <li key={item.requirement}><strong>{item.requirement}</strong><p className="ai-evidence">{item.evidence}</p></li>)}</ul> : <p className="tool-empty">No clear matches were found. Check that the CV text imported correctly, or start from the gaps below.</p>}
        </section>
        <section aria-labelledby="missing-requirements"><h3 id="missing-requirements"><CircleAlert size={16} aria-hidden="true" />Missing or unclear</h3>
          {report.gaps.length ? <ul className="ai-report-list is-gaps">{report.gaps.map(item => <li key={item.requirement}><strong>{item.requirement}</strong><p>{item.advice}</p></li>)}</ul> : <p className="tool-empty">Every requirement the AI identified appears to be covered.</p>}
        </section>
        {report.improvements.length > 0 && <section aria-labelledby="suggested-improvements"><h3 id="suggested-improvements">Suggested improvements</h3>
          <ul className="ai-report-list">{report.improvements.map(item => <li key={item.suggestion}><span className="ai-section-tag">{sectionLabels[item.section] ?? "Elsewhere"}</span><p>{item.suggestion}</p></li>)}</ul>
        </section>}
        {report.rewrites.length > 0 && <section aria-labelledby="wording-changes"><h3 id="wording-changes">Optional wording changes</h3>
          <ul className="ai-report-list">{report.rewrites.map(item => <li key={item.current}><p className="ai-rewrite-current">{item.current}</p><p className="ai-rewrite-suggested">{item.suggested}</p><p className="ai-evidence">{item.reason}</p><CopyButton text={item.suggested} label="Copy new wording" /></li>)}</ul>
        </section>}
        <p className="tool-note"><Info size={15} aria-hidden="true" />AI can misread both texts, and only you know what is true. Check every point against your real experience before changing your CV, and never add a claim that isn’t yours.</p>
      </div>}
      <p className="tool-privacy"><LockKeyhole size={14} aria-hidden="true" />Sent to OpenAI only when you choose Check my match. Our server keeps no copy of your CV or the advert.</p>
    </div>
  </div>;
}
