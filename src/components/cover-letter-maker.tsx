"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CircleAlert, Download, FileText, LoaderCircle, LockKeyhole, Printer, RotateCcw, Save, Sparkles, Trash2, UserRound } from "lucide-react";
import { useCV } from "./cv-context";
import { ChoiceGroup, CopyButton, TextInput } from "./tool-fields";
import { bodyParagraphs, composeBody, contactLine, emptyLetter, greeting, hasPrompts, isLetter, LETTER_KEY, letterBody, letterFileName, letterLayouts, letterStyles, letterText, recipientLines, signOffs, type CoverLetter } from "@/lib/cover-letter";
import { extractKeywords } from "@/lib/keyword-match";
import { letterPreview } from "@/lib/previews";

/** Cover letters from predefined templates and the visitor's details, edited and exported on the device. */
export function CoverLetterMaker() {
  const { cv } = useCV();
  const [letter, setLetter] = useState<CoverLetter>(emptyLetter);
  const [saved, setSaved] = useState(false); const [status, setStatus] = useState(""); const [error, setError] = useState(""); const [exporting, setExporting] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const draftRequest = useRef<AbortController | null>(null);
  useEffect(() => () => { draftRequest.current?.abort(); draftRequest.current = null; }, []);
  useEffect(() => {
    // Today's date in the visitor's own format; set after hydration so the server HTML stays stable.
    setLetter(current => current.date ? current : { ...current, date: new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(new Date()) });
    try { setSaved(!!localStorage.getItem(LETTER_KEY)); } catch { /* saving stays optional */ }
  }, []);
  const set = <K extends keyof CoverLetter>(key: K) => (value: CoverLetter[K]) => { setLetter(current => ({ ...current, [key]: value })); setStatus(""); };
  const text = letterText(letter);
  const prompts = hasPrompts(letter);
  const advertTerms = useMemo(() => extractKeywords(letter.jobDescription, 12), [letter.jobDescription]);
  const written = `${letterBody(letter)} ${letter.skills}`.toLowerCase();
  const cvHasDetails = [cv.personal.name, cv.personal.email, cv.personal.phone].some(value => value.trim());

  function fillFromCV() {
    const cvSkills = cv.skills.split("\n").map(line => line.replace(/^[^:]{1,24}:\s*/, "").trim()).filter(Boolean).join(", ");
    setLetter(current => ({ ...current, name: cv.personal.name || current.name, email: cv.personal.email || current.email, phone: cv.personal.phone || current.phone, address: cv.personal.location || current.address, skills: current.skills || cvSkills }));
    setStatus("Details copied from the CV open in this tab.");
  }
  function save() { try { localStorage.setItem(LETTER_KEY, JSON.stringify(letter)); setSaved(true); setStatus("Letter saved in this browser on this device."); setError(""); } catch { setError("Browser storage is unavailable or full. Copy the text or download a PDF instead."); } }
  function restore() { try { const data: unknown = JSON.parse(localStorage.getItem(LETTER_KEY) || "null"); if (!isLetter(data)) throw new Error(); setLetter(data); setStatus("Your saved letter is back. Keep editing."); setError(""); } catch { setError("The saved letter couldn’t be opened."); } }
  function remove() { try { localStorage.removeItem(LETTER_KEY); setSaved(false); setStatus("Saved letter deleted from this browser. The open letter is still here."); } catch { setError("Browser storage is unavailable."); } }
  function print() {
    const root = document.documentElement; root.classList.add("print-letter");
    const done = () => { root.classList.remove("print-letter"); window.removeEventListener("afterprint", done); };
    window.addEventListener("afterprint", done); window.print(); setTimeout(done, 1000);
  }
  async function draftWithAI() {
    if (letter.experience.trim().length < 40 || draftRequest.current) return;
    if (letter.body !== null && !window.confirm("Replace the current letter text with an AI draft? Your edits to the text will be replaced.")) return;
    const request = new AbortController(); draftRequest.current = request;
    const timeout = setTimeout(() => request.abort(), 50_000);
    setDrafting(true); setError(""); setStatus("");
    try {
      const details = { style: letter.style, jobTitle: letter.jobTitle, company: letter.company, jobDescription: letter.jobDescription, experience: letter.experience, skills: letter.skills, additional: letter.additional };
      const response = await fetch("/api/cover-letter-draft", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(details), signal: request.signal });
      const data = await response.json().catch(() => null);
      if (!response.ok || typeof data?.body !== "string" || !data.body.trim() || data.body.length > 8_000) throw new Error(typeof data?.error === "string" ? data.error : "The AI draft is unavailable right now. The template letter still works.");
      setLetter(current => ({ ...current, body: data.body.trim() }));
      setStatus("AI draft ready. Check every fact, replace any [brackets], and edit freely — it’s your letter.");
    } catch (cause) {
      if (draftRequest.current === request) setError(request.signal.aborted ? "The AI draft timed out. Your letter is unchanged. Please try again." : cause instanceof Error && !(cause instanceof TypeError) ? cause.message : "Could not connect to the AI service. Your letter is unchanged.");
    } finally {
      clearTimeout(timeout);
      if (draftRequest.current === request) { draftRequest.current = null; setDrafting(false); }
    }
  }
  async function downloadPDF() {
    setExporting(true); setError("");
    try {
      const [{ letterDocument }, { renderPDF, downloadBlob }] = await Promise.all([import("@/lib/cover-letter-pdf"), import("@/lib/pdf-engine")]);
      downloadBlob(await renderPDF(letterDocument(letter)), letterFileName(letter, "pdf")); setStatus("Your PDF is ready. Check your browser’s downloads.");
    } catch { setError("The PDF couldn’t be created. Please try again, or copy the text instead."); } finally { setExporting(false); }
  }

  return <div className="tool-workspace letter-workspace">
    <div className="tool-form">
      {saved && <button type="button" className="resume-letter" onClick={restore}><FileText size={17} aria-hidden="true" />Continue your saved letter</button>}
      <section className="tool-step" aria-labelledby="letter-you"><div className="tool-step-head"><h2 id="letter-you"><span className="step-number">1</span>Your details</h2>{cvHasDetails && <button type="button" className="inline-action" onClick={fillFromCV}><UserRound size={15} aria-hidden="true" />Use details from my CV</button>}</div>
        <div className="field-grid"><TextInput label="Full name" value={letter.name} onChange={set("name")} autoComplete="name" placeholder="e.g. Jordan Taylor" /><TextInput label="Email" type="email" value={letter.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" /><TextInput label="Phone" type="tel" value={letter.phone} onChange={set("phone")} autoComplete="tel" placeholder="Include country code" /><TextInput label="Address or city" value={letter.address} onChange={set("address")} autoComplete="address-level2" placeholder="e.g. Manchester, UK" /></div>
      </section>
      <section className="tool-step" aria-labelledby="letter-job"><div className="tool-step-head"><h2 id="letter-job"><span className="step-number">2</span>The job</h2></div>
        <div className="field-grid"><TextInput label="Job title" value={letter.jobTitle} onChange={set("jobTitle")} placeholder="e.g. Marketing Assistant" /><TextInput label="Company name" value={letter.company} onChange={set("company")} autoComplete="off" placeholder="e.g. Brightwell Energy" /><TextInput label="Hiring manager (optional)" value={letter.manager} onChange={set("manager")} placeholder="e.g. Ms Patel" hint="Leave blank for “Dear Hiring Manager”." /><TextInput label="Company address (optional)" value={letter.companyAddress} onChange={set("companyAddress")} multiline rows={2} placeholder="Street and town, one per line" /></div>
        <TextInput label="Job description (optional)" value={letter.jobDescription} onChange={set("jobDescription")} multiline rows={5} placeholder="Paste the advert. Your skills that it mentions are named in the letter." hint="Stays on this device. Used only to spot which of your skills the advert mentions." />
        {advertTerms.length > 0 && <div className="advert-terms"><span>Terms from the advert</span><ul>{advertTerms.map(term => <li key={term.key} className={written.includes(term.term.toLowerCase()) ? "is-covered" : undefined}>{term.term}</li>)}</ul><small>Highlighted terms already appear in your letter or skills. Address others only where they are true for you.</small></div>}
      </section>
      <section className="tool-step" aria-labelledby="letter-story"><div className="tool-step-head"><h2 id="letter-story"><span className="step-number">3</span>Your story</h2></div>
        <ChoiceGroup legend="Letter template" name="letter-style" value={letter.style} options={letterStyles} onChange={set("style")} className="is-compact" />
        <TextInput label="Your relevant experience" value={letter.experience} onChange={set("experience")} multiline rows={4} placeholder="e.g. For three years I have handled customer accounts at Northgate Telecom, where I cut response times by a third." hint="One or two sentences in your own words. This becomes the middle of your letter." />
        <TextInput label="Key skills" value={letter.skills} onChange={set("skills")} placeholder="e.g. Customer service, Excel, scheduling" hint="Separate with commas. Skills the advert mentions are named in the letter." />
        <TextInput label="Additional information (optional)" value={letter.additional} onChange={set("additional")} multiline rows={2} placeholder="e.g. I am available to start in June and happy to work flexible hours." />
      </section>
      <section className="tool-step" aria-labelledby="letter-format"><div className="tool-step-head"><h2 id="letter-format"><span className="step-number">4</span>Format</h2></div>
        <ChoiceGroup legend="Layout" name="letter-layout" value={letter.layout} onChange={set("layout")} className="layout-choices" options={letterLayouts.map(layout => ({ ...layout, media: <img src={letterPreview(layout.id)} alt={`${layout.name} cover letter layout preview`} width={953} height={1348} loading="lazy" decoding="async" /> }))} />
        <div className="field-grid"><div className="tool-field"><label htmlFor="letter-paper">Paper size</label><select id="letter-paper" value={letter.paper} onChange={event => set("paper")(event.target.value as CoverLetter["paper"])}><option value="A4">A4 (UK, Europe, Australia)</option><option value="LETTER">US Letter (US, Canada)</option></select></div><div className="tool-field"><label htmlFor="letter-signoff">Sign-off</label><select id="letter-signoff" value={letter.signOff} onChange={event => set("signOff")(event.target.value)}>{signOffs.map(item => <option key={item}>{item}</option>)}</select></div><TextInput label="Date" value={letter.date} onChange={set("date")} /></div>
      </section>
      <section className="tool-step" aria-labelledby="letter-edit"><div className="tool-step-head"><h2 id="letter-edit"><span className="step-number">5</span>Edit the letter</h2><div className="tool-step-actions"><button type="button" className="inline-action" disabled={drafting || letter.experience.trim().length < 40} onClick={draftWithAI} aria-describedby="letter-ai-note">{drafting ? <LoaderCircle size={15} className="spin" aria-hidden="true" /> : <Sparkles size={15} aria-hidden="true" />}{drafting ? "Drafting…" : "Draft with AI"}</button>{letter.body !== null && <button type="button" className="inline-action" onClick={() => { if (window.confirm("Rewrite the letter from your details? Your edits to the text will be replaced.")) set("body")(null); }}><RotateCcw size={15} aria-hidden="true" />Rewrite from my details</button>}</div></div>
        <p id="letter-ai-note" className="ai-summary-note">{letter.experience.trim().length < 40 ? "Write a sentence or two in “Your relevant experience” first, then AI can draft from it. " : ""}Draft with AI is optional: it sends the job and story details above (not your name or contact details) to OpenAI and writes only from what you typed. <Link href="/privacy/#ai">Privacy details</Link>.</p>
        <TextInput label="Letter text" value={letterBody(letter)} onChange={value => set("body")(value === composeBody(letter) ? null : value)} multiline rows={14} hint={letter.body === null ? "Written from your details and updated as you type above. Edit freely: once you change the text, it stays as you wrote it." : "Your own edits. Changes to the details above no longer rewrite this text."} />
      </section>
    </div>
    <div className="tool-output letter-output" aria-label="Cover letter preview">
      <div className="tool-output-head"><h2 className="preview-title"><span className="live-dot" /> Live preview</h2><span>{letter.paper === "A4" ? "A4" : "US Letter"} · {letterLayouts.find(layout => layout.id === letter.layout)?.name}</span></div>
      {prompts && <p className="notice tool-warning"><CircleAlert size={16} aria-hidden="true" />Replace the text in [square brackets] with your own details before you send.</p>}
      <article className={`letter-sheet layout-${letter.layout} paper-${letter.paper.toLowerCase()}`}><div className="letter-page">
        <header className="letter-head"><strong>{letter.name.trim() || "Your name"}</strong><span>{contactLine(letter).join("  ·  ") || "Email · Phone · City"}</span></header>
        {letter.date.trim() && <p className="letter-date">{letter.date}</p>}
        {recipientLines(letter).length > 0 && <p className="letter-recipient">{recipientLines(letter).map(line => <span key={line}>{line}</span>)}</p>}
        <p>{greeting(letter)}</p>
        {bodyParagraphs(letter).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        <p className="letter-signoff">{letter.signOff.trim() || "Kind regards"},<strong>{letter.name.trim() || "Your name"}</strong></p>
      </div></article>
      <div className="tool-actions"><button type="button" className="button accent" onClick={downloadPDF} disabled={exporting}>{exporting ? <LoaderCircle size={16} className="spin" aria-hidden="true" /> : <Download size={16} aria-hidden="true" />}{exporting ? "Preparing…" : "Download PDF"}</button><CopyButton text={text} label="Copy letter" /><button type="button" className="button outline" onClick={print}><Printer size={16} aria-hidden="true" />Print</button></div>
      <div className="tool-actions is-quiet"><button type="button" className="text-button" onClick={save}><Save size={14} aria-hidden="true" />Save in this browser</button>{saved && <button type="button" className="text-button danger" onClick={remove}><Trash2 size={14} aria-hidden="true" />Delete saved letter</button>}</div>
      <p className="tool-privacy"><LockKeyhole size={14} aria-hidden="true" />Written on your device from predefined templates. Nothing is uploaded unless you choose Draft with AI, which sends only the job and story details to OpenAI.</p>
      <div aria-live="polite" className="tool-status">{status && <p className="notice success">{status}</p>}{error && <p className="notice error" role="alert">{error}</p>}</div>
    </div>
  </div>;
}
