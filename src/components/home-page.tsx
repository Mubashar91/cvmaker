"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Download, FileDown, FilePlus2, FileText, FileUp, Laptop, LockKeyhole, ServerOff, ShieldCheck } from "lucide-react";
import { Header, Footer } from "./site-chrome";
import { MiniCV } from "./template-card";
import { TemplateGallery } from "./template-gallery";
import { TemplateCollections } from "./template-collections";
import { AdSlot } from "./ad-slot";
import { useCV } from "./cv-context";
import { accentColors, DRAFT_KEY, emptyCV, isCV, newTemplates, templateById, templateCountWord, templates, type Template } from "@/lib/model";
import { faqs } from "@/lib/faqs";
import { tips } from "@/lib/tips";

const FAN: Template[] = ["linear", "aurora", "summit", "atelier", "regent"];

export function HomePage() {
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
    try { const data: unknown = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null"); if (!isCV(data)) throw new Error(); setCV(data); router.push("/editor/"); }
    catch { setDraftError("This draft couldn’t be opened. Create a new CV, or restore a downloaded draft in the editor."); }
  }
  const frontIndex = FAN.indexOf(front);
  function slot(index: number) { let s = index - frontIndex; if (s > FAN.length / 2) s -= FAN.length; if (s < -FAN.length / 2) s += FAN.length; return s; }

  return <><Header /><main id="main-content">
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1><span className="hero-kicker">Free CV maker · no sign-up</span> Your story<br />deserves <span className="hero-highlight">a great CV.</span></h1>
          <p className="hero-lede">Create your CV with {templates.length} thoughtfully designed templates, a live editor, and a helpful final review. A CV that feels like you — ready to download, completely free.</p>
          <div className="hero-actions"><button className="button accent large" onClick={start}><FilePlus2 size={19} />Create a new CV<ArrowRight size={18} /></button><button className="button on-dark large" onClick={() => input.current?.click()}><FileUp size={19} />Upload my existing CV</button></div>
          <input ref={input} type="file" className="sr-only" aria-label="Upload existing CV" accept=".pdf,.docx" onChange={e => { const file = e.target.files?.[0]; if (file) { setPendingFile(file); router.push("/editor/"); } }} />
          <ul className="hero-promises"><li><Check size={16} />No sign-up</li><li><Check size={16} />No watermarks</li><li><Check size={16} />PDF & DOCX import</li></ul>
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
    </section>

    <div className="benefits-band"><div className="container benefits-grid"><div><span>{templates.length}</span><p>thoughtfully crafted templates</p></div><div><span>100<small>%</small></span><p>free, from start to finish</p></div><div><span>PDF<Download size={22} strokeWidth={1.5} aria-hidden="true" /></span><p>ready for your next opportunity</p></div><div><span>Just you.</span><p>no account or sign-up needed</p></div></div></div>

    <section className="section home-templates" id="templates">
      <div className="container">
        <div className="section-head"><div><h2>A first impression.<br /><span className="editorial-type">Entirely your own.</span></h2><p>{templateCountWord} distinct designs. The same great story. Find your fit, then make it yours.</p></div><Link href="/templates/" className="button outline">Explore all {templates.length} templates <ArrowUpRight size={17} /></Link></div>
        <TemplateGallery onChoose={choose} initialLimit={6} featured={newTemplates} />
      </div>
    </section>

    <section className="section collection-section"><div className="container"><div className="section-head"><div><h2>A starting point<br /><span className="editorial-type">for every next step.</span></h2><p>Your first job, a new direction, or a more senior role. Find the format that fits.</p></div></div><TemplateCollections /></div></section>

    <section className="how-section" id="how-it-works"><div className="container">
      <div className="section-head"><div><h2>A little less effort.<br /><span className="editorial-type">A lot more possibility.</span></h2><p>From a blank page to your next opportunity, in three simple steps.</p></div><span className="section-aside">Your experience. Beautifully put together.</span></div>
      <ol className="steps">
        <li className="step">
          <div className="step-vignette" aria-hidden="true"><div className="vig-drop"><FileUp size={22} /><strong>my-cv.pdf</strong><span>Read on this device</span></div><div className="vig-found"><Check size={14} />Name, experience, education and skills found</div></div>
          <h3><span className="step-number">1</span>Start with your story</h3>
          <p>Create a blank CV or import your existing PDF or DOCX. Review the extracted details and fill in what matters.</p>
        </li>
        <li className="step">
          <div className="step-vignette" aria-hidden="true"><div className="vig-field"><span>Professional title</span><div className="vig-input">Frontend Developer<i /></div></div><div className="vig-swatches">{accentColors.slice(0, 7).map((c, i) => <span key={c.value} className={i === 2 ? "is-on" : undefined} style={{ background: c.value }} />)}</div></div>
          <h3><span className="step-number">2</span>Make it your own</h3>
          <p>Choose a template and an accent colour, then see every change in a live preview. Reorder entries and keep only the sections you need.</p>
        </li>
        <li className="step">
          <div className="step-vignette" aria-hidden="true"><div className="vig-file"><span className="vig-pdf">PDF</span><div><strong>Alex Morgan CV.pdf</strong><span>2 pages · A4 · No watermark</span></div><Download size={18} /></div></div>
          <h3><span className="step-number">3</span>Send with confidence</h3>
          <p>Review every page, then download a clean PDF. Longer CVs flow onto more pages. Save a draft if you want to refine it later.</p>
        </li>
      </ol>
    </div></section>

    <AdSlot placement="home" />

    <section className="privacy-band"><div className="container privacy-grid">
      <div className="privacy-copy"><span className="privacy-emblem" aria-hidden="true"><ShieldCheck size={27} strokeWidth={1.4} /></span><h2>Your story stays<br /><span className="editorial-type">your business.</span></h2><p>Your CV holds a lot about you. That’s why file imports, editing, previews, and PDF generation all happen right in your browser.</p><ul className="check-list"><li><Check size={18} />No account or server upload required</li><li><Check size={18} />Save a draft only when you choose to</li><li><Check size={18} />No CV data sent to advertising or analytics</li><li><Check size={18} />Delete your saved browser draft anytime</li></ul><Link href="/privacy/" className="text-link">Read our privacy promise <ArrowUpRight size={16} /></Link></div>
      <figure className="data-path">
        <div className="path-row">
          <div className="path-node"><FileText size={22} /><strong>Your file</strong><small>PDF or DOCX</small></div>
          <span className="path-link" aria-hidden="true" />
          <div className="path-node is-main"><Laptop size={22} /><strong>Your browser</strong><small>Reads, edits & typesets</small></div>
          <span className="path-link" aria-hidden="true" />
          <div className="path-node"><FileDown size={22} /><strong>Your PDF</strong><small>Saved on your device</small></div>
        </div>
        <div className="path-blocked"><span className="path-drop" aria-hidden="true" /><div className="path-node is-off"><ServerOff size={22} /><strong>No upload server</strong><small>Your CV never leaves the tab</small></div></div>
        <figcaption>Your CV moves from your file, through your browser, to your PDF. It is never sent to a server.</figcaption>
      </figure>
    </div></section>

    <section className="section guides-section"><div className="container">
      <div className="section-head"><div><h2>A little guidance.<br /><span className="editorial-type">For what comes next.</span></h2><p>Practical advice to help your experience shine through.</p></div><Link href="/tips/" className="text-link">Browse all CV guides <ArrowUpRight size={16} /></Link></div>
      <ul className="guide-list">{tips.slice(0, 4).map(tip => <li key={tip.slug}><Link href={`/tips/${tip.slug}/`} className="guide-row"><span className="guide-meta"><span>{tip.category}</span><span>{tip.readTime} min read</span></span><h3>{tip.title}</h3><p>{tip.description}</p><ArrowUpRight className="guide-arrow" size={22} /></Link></li>)}</ul>
    </div></section>

    <section className="section faq-section"><div className="container faq-grid"><div><h2>A few things worth knowing.</h2><p>Everything you need to feel comfortable getting started.</p><Link href="/privacy/" className="text-link">Your privacy, explained <ArrowUpRight size={15} /></Link></div><div className="faq-list">{faqs.map(faq => <details key={faq.question}><summary>{faq.question}<ChevronDown size={20} /></summary><p>{faq.answer}</p></details>)}</div></div></section>

    <section className="closing-cta"><div className="container closing-inner"><div><h2>Your next chapter<br /><span className="editorial-type">starts right here.</span></h2><p>You bring the story. We’ll help you tell it.</p></div><div className="closing-actions"><button className="button dark large" onClick={start}>Create my free CV <ArrowRight size={18} /></button><span>No sign-up. No payment. Just possibilities.</span></div></div></section>
  </main><Footer /></>;
}

