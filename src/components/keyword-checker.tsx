"use client";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleAlert, FileUp, Info, LoaderCircle, LockKeyhole, RotateCcw, Sparkles, UserRound } from "lucide-react";
import { useCV } from "./cv-context";
import { TextInput } from "./tool-fields";
import { compareKeywords } from "@/lib/keyword-match";
import { cvPlainText } from "@/lib/cv-review";
import { hasContent } from "@/lib/model";

export function KeywordChecker() {
  const { cv } = useCV(); const fileInput = useRef<HTMLInputElement>(null);
  const [job, setJob] = useState(""); const [resume, setResume] = useState("");
  const [busy, setBusy] = useState(false); const [note, setNote] = useState(""); const [error, setError] = useState("");
  const deferredJob = useDeferredValue(job), deferredResume = useDeferredValue(resume);
  const result = useMemo(() => compareKeywords(deferredJob, deferredResume), [deferredJob, deferredResume]);
  const ready = job.trim().split(/\s+/).length >= 15 && resume.trim().length > 0;

  async function readFile(file: File) {
    setBusy(true); setError(""); setNote("");
    try { const { importCV } = await import("@/lib/import-cv"); const { text } = await importCV(file); setResume(text); setNote(`Text read from ${file.name} on this device.`); }
    catch (e) { setError(e instanceof Error ? e.message : "This file couldn’t be read. Paste your CV text instead."); }
    finally { setBusy(false); if (fileInput.current) fileInput.current.value = ""; }
  }
  return <div className="tool-workspace keyword-workspace">
    <div className="tool-form"><section className="tool-step" aria-labelledby="keyword-inputs"><div className="tool-step-head"><h2 id="keyword-inputs"><span className="step-number">1</span>Paste both texts</h2></div>
      <TextInput label="Job description" value={job} onChange={setJob} multiline rows={9} placeholder="Paste the full job advert, including requirements and responsibilities." />
      <div className="resume-source"><span>Your CV:</span>{hasContent(cv) && <button type="button" className="inline-action" onClick={() => { setResume(cvPlainText(cv)); setNote("Using the CV open in your editor."); setError(""); }}><UserRound size={15} aria-hidden="true" />Use the CV in my editor</button>}<button type="button" className="inline-action" disabled={busy} onClick={() => fileInput.current?.click()}>{busy ? <LoaderCircle size={15} className="spin" aria-hidden="true" /> : <FileUp size={15} aria-hidden="true" />}Read a PDF or DOCX</button><input ref={fileInput} type="file" className="sr-only" accept=".pdf,.docx" aria-label="Read CV text from a PDF or DOCX file" onChange={event => { const file = event.target.files?.[0]; if (file) void readFile(file); }} /></div>
      <TextInput label="Your CV text" value={resume} onChange={setResume} multiline rows={9} placeholder="Paste the text of your CV or resume." />
      <div aria-live="polite">{note && <p className="notice success">{note}</p>}{error && <p className="notice error" role="alert">{error}</p>}</div>
      {(job || resume) && <button type="button" className="text-button" onClick={() => { setJob(""); setResume(""); setNote(""); setError(""); }}><RotateCcw size={13} aria-hidden="true" />Clear both</button>}
    </section></div>
    <div className="tool-output"><div className="tool-output-head"><h2 className="tool-output-title">Keyword comparison</h2><span>{result.keywords.length ? `${result.keywords.length} terms from the advert` : "Waiting for text"}</span></div>
      {!ready ? <p className="tool-empty">Paste a job description of at least a few sentences and your CV text. Matching and missing keywords appear here as you type.</p> : <>
        <div className="match-summary"><div className="match-rate"><strong>{result.rate}%</strong><span>of the advert’s key terms appear in your CV</span></div><meter min={0} max={100} low={40} high={70} optimum={100} value={result.rate} aria-label="Share of key terms found">{result.rate}%</meter><p>{result.matched.length} found · {result.missing.length} missing</p></div>
        <div className="keyword-columns">
          <section aria-labelledby="missing-terms"><h3 id="missing-terms"><CircleAlert size={16} aria-hidden="true" />Missing from your CV</h3>{result.missing.length ? <ul className="keyword-list is-missing">{result.missing.map(item => <li key={item.key}>{item.term}<span>{item.count}× in advert</span></li>)}</ul> : <p className="tool-empty">Every key term was found. Check that each one is backed by an example.</p>}</section>
          <section aria-labelledby="matched-terms"><h3 id="matched-terms">Found in your CV</h3>{result.matched.length ? <ul className="keyword-list is-matched">{result.matched.map(item => <li key={item.key}>{item.term}<span>{item.inCV}× in CV</span></li>)}</ul> : <p className="tool-empty">None of the key terms were found yet.</p>}</section>
        </div>
        <p className="tool-note"><Info size={15} aria-hidden="true" />Add a missing term only where it is true for you, ideally beside an example. This is a word comparison, not a prediction of how any employer’s system will rank your application.</p>
        <p className="tool-note"><Sparkles size={15} aria-hidden="true" />Want to know whether your CV <em>proves</em> these terms? The <Link href="/ai-cv-job-match/">AI CV job match</Link> reads both texts, shows evidence and gaps, and suggests honest fixes.<ArrowRight size={14} aria-hidden="true" /></p>
      </>}
      <p className="tool-privacy"><LockKeyhole size={14} aria-hidden="true" />Compared in your browser with plain text matching. Nothing is uploaded or stored.</p>
    </div>
  </div>;
}
