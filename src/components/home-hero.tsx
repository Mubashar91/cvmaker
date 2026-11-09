"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, FilePlus2, FileText, FileUp, LockKeyhole, ShieldCheck } from "lucide-react";
import { MiniCV } from "./template-card";
import { useCV } from "./cv-context";
import { DRAFT_KEY, emptyCV, parseCV, templateById, templates, type Template } from "@/lib/model";

const FAN: Template[] = ["linear", "aurora", "summit", "atelier", "regent"];

/** The interactive part of the homepage: start, upload, resume a draft, and the template fan. */
export function HomeHero() {
  const router = useRouter(); const input = useRef<HTMLInputElement>(null);
  const { setCV, setPendingFile } = useCV();
  const [saved, setSaved] = useState(false); const [draftError, setDraftError] = useState("");
  const [front, setFront] = useState<Template>("summit");
  const [dealt, setDealt] = useState(false);
  useEffect(() => { try { setSaved(!!localStorage.getItem(DRAFT_KEY)); } catch { /* saving remains optional */ } }, []);
  // The sheets start stacked (visible without JavaScript), then fan out once.
  useEffect(() => { const frame = requestAnimationFrame(() => setDealt(true)); return () => cancelAnimationFrame(frame); }, []);
  function start() { setCV(emptyCV()); router.push("/editor/"); }
  function choose(template: Template) { setCV(current => ({ ...current, template })); router.push("/editor/"); }
  function resume() {
    try { const data = parseCV(JSON.parse(localStorage.getItem(DRAFT_KEY) || "null")); if (!data) throw new Error(); setCV(data); router.push("/editor/"); }
    catch { setDraftError("This draft couldn’t be opened. Create a new CV, or restore a downloaded draft in the editor."); }
  }
  const frontIndex = FAN.indexOf(front);
  function slot(index: number) { let s = index - frontIndex; if (s > FAN.length / 2) s -= FAN.length; if (s < -FAN.length / 2) s += FAN.length; return s; }

  return <section className="hero">
    <div className="container hero-grid">
      <div className="hero-copy">
        <h1><span className="hero-kicker">Free CV maker &amp; resume builder</span> Create a professional CV <span className="hero-highlight">for free.</span></h1>
        <p className="hero-lede">Build a clear, professional CV online in minutes. Choose from {templates.length} free templates, including plain layouts for online application systems, add your details, and download a PDF. No sign-up, no subscription, no watermark.</p>
        <div className="hero-actions"><button className="button accent large" onClick={start}><FilePlus2 size={19} />Create a new CV<ArrowRight size={18} /></button><button className="button on-dark large" onClick={() => input.current?.click()}><FileUp size={19} />Upload my existing CV</button></div>
        <input ref={input} type="file" className="sr-only" aria-label="Upload existing CV" accept=".pdf,.docx" onChange={e => { const file = e.target.files?.[0]; if (file) { setPendingFile(file); router.push("/editor/"); } }} />
        <ul className="hero-promises"><li><Check size={16} />No sign-up</li><li><Check size={16} />Free PDF download</li><li><Check size={16} />No watermarks</li><li><Check size={16} />PDF &amp; DOCX import</li></ul>
        {saved && <button className="resume-draft" onClick={resume}><FileText size={17} /><span>Welcome back. Continue your saved draft</span><ArrowRight size={17} /></button>}
        {draftError && <p className="notice error" role="alert">{draftError}</p>}
        <p className="hero-privacy"><LockKeyhole size={15} /><span>Just you and your next chapter. Your details stay on your device.</span></p>
      </div>
      <div className="hero-desk">
        <div className="desk-orbit" aria-hidden="true" />
        <div className="template-stamp" aria-hidden="true"><span>{templates.length}</span>ways to<br />tell your story<ArrowUpRight size={20} /></div>
        <div className={`sheet-fan${dealt ? " is-dealt" : ""}`}>
          {FAN.map((id, index) => { const s = slot(index); return <button key={id} className="fan-sheet" data-front={s === 0 || undefined} aria-label={`Preview ${templateById(id).name} template`} aria-pressed={s === 0} style={{ "--slot": s, "--depth": Math.abs(s) } as CSSProperties} onClick={() => setFront(id)}>
            <MiniCV template={id} large={s === 0} alt={s === 0 ? `Example CV in the ${templateById(id).name} template` : ""} />
          </button>; })}
        </div>
        <div className="desk-assurance"><span className="assurance-icon"><ShieldCheck size={21} strokeWidth={1.6} /></span><span><strong>All yours. Always free.</strong><small>No watermark. No compromises.</small></span><Check size={16} /></div>
        <div className="fan-switch" role="group" aria-label="Preview the example CV in another template">{FAN.map(id => <button key={id} aria-pressed={front === id} onClick={() => setFront(id)}>{templateById(id).name}</button>)}</div>
        <button className="fan-note" onClick={() => choose(front)}>Make the {templateById(front).name} template yours <ArrowRight size={14} /></button>
      </div>
    </div>
  </section>;
}
