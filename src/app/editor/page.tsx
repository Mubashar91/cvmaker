"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlignLeft, ArrowDown, ArrowLeft, ArrowRight, Award, BriefcaseBusiness, Check, ChevronDown, Download, Eye, EyeOff, FileText, FileUp, FolderOpen, GraduationCap, ImagePlus, Languages, LayoutTemplate, ListChecks, ListPlus, LoaderCircle, LockKeyhole, PencilLine, Redo2, Save, Undo2, Upload, UserRound, Wand2, X } from "lucide-react";
import { Logo } from "@/components/site-chrome";
import { useCV } from "@/components/cv-context";
import { CVReview } from "@/components/cv-review";
import { AISummary } from "@/components/ai-summary";
import { CVPhotoField } from "@/components/cv-photo-field";
import { PDFPreview } from "@/components/pdf-preview";
import { SkillSuggestions } from "@/components/skill-suggestions";
import { contactProblem, Field, LanguageAdder, type ContactKey } from "@/components/editor/editor-fields";
import { EntryList } from "@/components/editor/entry-list";
import { DraftPanel } from "@/components/editor/draft-panel";
import { DesignPanel } from "@/components/editor/design-panel";
import { importCV } from "@/lib/import-cv";
import { preparePhoto } from "@/lib/photo";
import { downloadBlob, generatePDF } from "@/lib/pdf";
import { trackEvent } from "@/lib/analytics";
import { draftName, type SavedDraft } from "@/lib/drafts";
import { hasContent, MAX_SECTION_TITLE, parseCV, sectionHasContent, sectionLabels, sectionTitle, templateById, type CV, type Entry, type EntrySection, type Section, type TextSection } from "@/lib/model";

type Step = "personal" | Section;

// What good looks like for each part of the CV, shown under the section title.
const guidance: Record<Step, string> = {
  personal: "A few essentials so the right people can find you.",
  summary: "Two to four sentences: who you are, what you do best, and what you’re looking for next.",
  experience: "Most recent first. Start each line with what you did, and add the result where you can.",
  education: "Most recent first. Grades, honours, or relevant modules can go in the description.",
  skills: "One group per line, like “Tools: Figma, Git, Jira”. Some templates show each group as labelled tags.",
  languages: "One language per line with your level, like “Spanish: Conversational”. Add a recognised level such as CEFR B2 if the employer asks for one.",
  projects: "Personal, academic, and volunteer work all count. Say what you made and what changed because of it.",
  certifications: "Name, issuer, and year. Add a credential ID or link in the description if you have one.",
  additional: "Anything else worth knowing: interests, volunteering, awards, or referees. Rename the heading to match, and use one line per item.",
};
const sectionIcons = { personal: UserRound, summary: AlignLeft, experience: BriefcaseBusiness, education: GraduationCap, skills: ListChecks, languages: Languages, projects: FolderOpen, certifications: Award, additional: ListPlus };
const additionalTitles = ["Interests", "Volunteering", "Awards", "References", "Referees"];
const appendLine = (text: string, line: string) => [text.trimEnd(), line].filter(Boolean).join("\n");
/** A file name for downloads, from the person's name. */
const fileBase = (cv: CV) => cv.personal.name.trim().replace(/[^\p{L}\p{N} _-]/gu, "").slice(0, 100) || "My";

export default function Editor() {
  const {
    cv, setCV, editCV, loadCV, undo, redo, canUndo, canRedo,
    draftId, unsaved, saveDraft, detachDraft, autosave, autosaveError,
    pendingFile, setPendingFile, startSection, setStartSection, notice, setNotice,
  } = useCV();
  const [tab, setTab] = useState<"content" | "design" | "review">("content");
  const [active, setActive] = useState<Step>("personal");
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [touched, setTouched] = useState<Partial<Record<ContactKey, boolean>>>({});
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState<"pdf" | "docx" | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [rawText, setRawText] = useState("");
  const [importNotes, setImportNotes] = useState<string[]>([]);
  const uploadInput = useRef<HTMLInputElement>(null);
  const draftInput = useRef<HTMLInputElement>(null);
  const photoInput = useRef<HTMLInputElement>(null);
  const importingRef = useRef(false);

  // A file chosen on the home page is consumed once; ongoing edits remain in memory.
  useEffect(() => { if (pendingFile && !importingRef.current) { const file = pendingFile; setPendingFile(null); void readFile(file); } }, [pendingFile]);
  // A section or message requested by a tool, consumed once.
  useEffect(() => { if (startSection) { setActive(startSection); setTab("content"); setStartSection(null); } }, [startSection]);
  useEffect(() => { if (notice) { setMessage(notice); setError(""); setNotice(null); } }, [notice]);

  // Ctrl/Cmd+Z undoes and Ctrl+Y or Ctrl/Cmd+Shift+Z redoes CV changes, including inside fields,
  // where the browser's own undo is unreliable for edited form values. Search boxes keep theirs.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.isComposing || event.altKey || !(event.ctrlKey || event.metaKey)) return;
      if (event.target instanceof Element && event.target.closest("[data-native-undo], dialog")) return;
      const key = event.key.toLowerCase();
      if (key === "z" && !event.shiftKey) { event.preventDefault(); undo(); }
      else if ((key === "z" && event.shiftKey) || (key === "y" && event.ctrlKey)) { event.preventDefault(); redo(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo]);

  // ----- Changes ---------------------------------------------------------------------------
  /** Text fields merge consecutive typing into one undo step; other changes are one step each. */
  function update<K extends keyof CV>(key: K, value: CV[K]) {
    const typed = key === "summary" || key === "skills" || key === "languages" || key === "additional" || key === "additionalTitle";
    editCV(current => ({ ...current, [key]: value }), typed ? key : undefined);
  }
  const updateText = (key: TextSection, value: string) => update(key, value);
  const personal = (key: keyof CV["personal"], value: string) => editCV(current => ({ ...current, personal: { ...current.personal, [key]: value } }), `personal.${key}`);
  const editEntry = (section: EntrySection) => (id: string, field: keyof Entry, value: string) =>
    editCV(current => ({ ...current, [section]: current[section].map(e => e.id === id ? { ...e, [field]: value } : e) }), `${section}.${id}.${field}`);
  const changeEntries = (section: EntrySection) => (change: (entries: Entry[]) => Entry[]) => editCV(current => ({ ...current, [section]: change(current[section]) }));
  const reorderSections = (change: (order: Section[]) => Section[]) => editCV(current => ({ ...current, sectionOrder: change(current.sectionOrder) }));
  const toggleSection = (key: Section) => editCV(current => ({ ...current, hiddenSections: current.hiddenSections.includes(key) ? current.hiddenSections.filter(k => k !== key) : [...current.hiddenSections, key] }));

  // ----- Files and drafts --------------------------------------------------------------------
  async function readFile(file: File) {
    if (importingRef.current) return;
    importingRef.current = true; setImporting(true); setError(""); setMessage("");
    try {
      const result = await importCV(file);
      setCV(current => ({ ...result.cv, template: current.template, accent: current.accent, photo: current.photo, font: current.font, density: current.density }));
      detachDraft(); // An imported file is a new CV; saving it never overwrites another saved CV.
      setRawText(result.text); setImportNotes(result.notes); setActive("personal"); setTab("content");
      setMessage(`Imported ${file.name}. Review and correct your details below.`);
      trackEvent("cv_imported", { type: file.name.split(".").pop()?.toLowerCase() || "file" });
    } catch (e) { setError(e instanceof Error ? e.message : "This file couldn’t be read. Enter your details manually below."); }
    finally { setImporting(false); importingRef.current = false; if (uploadInput.current) uploadInput.current.value = ""; }
  }
  function save(asCopy = false) {
    try {
      saveDraft({ asCopy });
      setMessage(asCopy ? "Saved as a new copy in this browser. You’re now editing the copy; the original is unchanged." : "Draft saved in this browser on this device. You can safely return to it later.");
      setError("");
    } catch (e) { setError(e instanceof Error ? e.message : "Browser storage is unavailable or full. Use Download draft to keep a copy on your device."); }
  }
  function openDraft(draft: SavedDraft) {
    if (unsaved && !window.confirm("Open another saved CV? Changes to the CV you have open now haven’t been saved and will be lost.")) return;
    loadCV(draft.cv, { draftId: draft.id });
    setRawText(""); setImportNotes([]); setActive("personal"); setTab("content");
    setMessage(`Opened “${draftName(draft.cv)}”.`); setError("");
    window.scrollTo({ top: 0 });
  }
  async function restore(file: File) {
    try {
      if (file.size > 5 * 1024 * 1024) throw new Error();
      const draft = parseCV(JSON.parse(await file.text()));
      if (!draft) throw new Error();
      loadCV(draft, { saved: false });
      setRawText(""); setImportNotes([]);
      setMessage("Draft restored. Your details and template are ready to edit. Choose Save draft to keep it in this browser."); setError("");
    } catch { setError("This is not a valid Folio draft. Choose a .json file previously downloaded from this editor."); }
    finally { if (draftInput.current) draftInput.current.value = ""; }
  }
  async function download(format: "pdf" | "docx") {
    setExporting(format); setError("");
    try {
      if (format === "pdf") downloadBlob(await generatePDF(cv), `${fileBase(cv)} CV.pdf`);
      else { const { generateDOCX } = await import("@/lib/docx-export"); downloadBlob(await generateDOCX(cv), `${fileBase(cv)} CV.docx`); }
      setMessage(format === "pdf" ? "Your PDF is ready. Check your browser’s downloads." : "Your Word document is ready. It uses a simple, editable layout; the template design is in the PDF.");
      trackEvent("cv_downloaded", { format, template: cv.template });
    } catch { setError(`Your ${format === "pdf" ? "PDF" : "Word document"} couldn’t be generated. Please try again. Your details are still in the editor.`); }
    finally { setExporting(null); }
  }
  async function choosePhoto(file: File) {
    try {
      const photo = await preparePhoto(file); update("photo", photo); setError("");
      setMessage(current.photo ? "Photo added. It appears in your preview." : `Photo added. ${current.name} doesn’t show photos — choose a template marked “Photo” to include it.`);
    } catch (e) { setError(e instanceof Error ? e.message : "This image couldn’t be read."); }
    finally { if (photoInput.current) photoInput.current.value = ""; }
  }

  // ----- Navigation --------------------------------------------------------------------------
  const steps: Step[] = ["personal", ...cv.sectionOrder];
  const nextStep = steps[steps.indexOf(active) + 1];
  function goNext() {
    if (nextStep) setActive(nextStep); else setTab("design");
    window.scrollTo({ top: 0 });
    document.getElementById(nextStep ? "content-panel" : "design-panel")?.focus({ preventScroll: true });
  }
  const current = templateById(cv.template);
  const filledContacts = Object.values(cv.personal).filter(v => v.trim()).length;
  const problem = (key: ContactKey) => touched[key] ? contactProblem(key, cv.personal[key]) : "";
  const blurred = (key: ContactKey) => () => setTouched(current => ({ ...current, [key]: true }));
  const status = autosaveError ? "Not saved automatically" : unsaved ? (autosave ? "Saving…" : "Unsaved changes") : draftId ? "Saved on this device" : autosave ? "Autosave on" : "Changes stay in this tab";
  const busy = exporting !== null || importing || !hasContent(cv);

  return <div className="editor-app">
    <header className="editor-header">
      <div className="editor-brand"><Logo /><span className="editor-divider" /><Link href="/" className="back-home"><ArrowLeft size={15} /> Home</Link></div>
      <h1 className="sr-only">CV editor</h1>
      <div className="editor-header-right">
        <span className="saved-status" role="status"><span className={`status-dot${!unsaved && draftId ? " is-saved" : unsaved ? " is-dirty" : ""}`} />{status}</span>
        <div className="history-buttons" role="group" aria-label="Undo and redo">
          <button className="history-button" aria-label="Undo" title="Undo (Ctrl+Z)" disabled={!canUndo} onClick={undo}><Undo2 size={17} /></button>
          <button className="history-button redo-button" aria-label="Redo" title="Redo (Ctrl+Y)" disabled={!canRedo} onClick={redo}><Redo2 size={17} /></button>
        </div>
        <button className="button on-dark save-button" aria-label="Save draft" onClick={() => save()}><Save size={16} /><span>Save draft</span></button>
        <button className="button on-dark word-button" aria-label="Download Word document" title="Download an editable Word (.docx) file" disabled={busy} onClick={() => download("docx")}>{exporting === "docx" ? <LoaderCircle size={16} className="spin" /> : <FileText size={16} />}<span>Word</span></button>
        <button className="button accent download-button" disabled={busy} aria-label={exporting === "pdf" ? undefined : "Download PDF"} onClick={() => download("pdf")}>{exporting === "pdf" ? <LoaderCircle size={16} className="spin" /> : <Download size={16} />}<span>{exporting === "pdf" ? "Preparing…" : <><span className="download-verb">Download </span>PDF</>}</span><small>FREE</small></button>
      </div>
    </header>

    <div className="editor-notifications" aria-live="polite">
      {importing && <div className="notice"><LoaderCircle className="spin" size={17} /> Reading your file on this device…</div>}
      {error && <div className="notice error" role="alert">
        <div>{error}<button className="inline-button" onClick={() => { setError(""); setActive("personal"); setTab("content"); setMobileView("edit"); document.getElementById("content-panel")?.focus(); }}>Enter details manually <ArrowDown size={13} /></button></div>
        <button className="icon-button" aria-label="Dismiss error" onClick={() => setError("")}><X size={16} /></button>
      </div>}
      {message && <div className="notice success"><Check size={16} /><span>{message}</span><button className="icon-button" aria-label="Dismiss message" onClick={() => setMessage("")}><X size={16} /></button></div>}
    </div>

    <div className="mobile-editor-switch">
      <button className={mobileView === "edit" ? "active" : ""} onClick={() => setMobileView("edit")}><PencilLine size={15} /> Edit details</button>
      <button className={mobileView === "preview" ? "active" : ""} onClick={() => setMobileView("preview")}><Eye size={15} /> Live preview</button>
    </div>

    <main id="main-content" className={`editor-workspace mobile-${mobileView}`}>
      <section className="edit-pane" aria-label="CV editor">
        <div className="editor-tabs">
          <button className={tab === "content" ? "active" : ""} onClick={() => setTab("content")}><PencilLine size={16} /> Your content</button>
          <button className={tab === "design" ? "active" : ""} onClick={() => setTab("design")}><LayoutTemplate size={16} /> Templates & layout</button>
          <button className={tab === "review" ? "active" : ""} onClick={() => setTab("review")}><Check size={16} /> Review CV</button>
        </div>

        {tab === "content" ? <div className="content-editor">
          <div className="import-bar"><div><FileUp size={17} /><span>Already have a CV?</span></div><button onClick={() => uploadInput.current?.click()} disabled={importing}>Import PDF or DOCX <Upload size={13} /></button></div>
          {rawText && <details className="extraction-review"><summary>Review extracted text <ChevronDown size={14} /></summary>{importNotes.map(n => <p key={n}>{n}</p>)}<pre>{rawText}</pre></details>}

          <div className="section-nav" aria-label="CV sections">
            <div className="section-nav-heading">CV sections <span>{steps.length}</span></div>
            <button className={active === "personal" ? "active" : ""} aria-current={active === "personal" ? "step" : undefined} onClick={() => setActive("personal")}><UserRound size={16} aria-hidden="true" /><span className="section-nav-label">Personal details</span><span className="nav-count" title="Contact fields filled; every field is optional">{filledContacts}/6</span></button>
            {cv.sectionOrder.map(k => {
              const SectionIcon = sectionIcons[k];
              const hidden = cv.hiddenSections.includes(k);
              return <button key={k} className={`${active === k ? "active" : ""}${hidden ? " is-hidden" : ""}`} aria-current={active === k ? "step" : undefined} onClick={() => setActive(k)}>
                <SectionIcon size={16} aria-hidden="true" /><span className="section-nav-label">{sectionTitle(cv, k)}</span>
                {hidden ? <EyeOff size={13} aria-hidden="true" /> : <span className={`nav-mark${sectionHasContent(cv, k) ? " is-done" : ""}`} aria-hidden="true" />}
              </button>;
            })}
          </div>

          <div className="content-panel" id="content-panel" tabIndex={-1}>
            <div className="form-heading">
              <div className="form-title"><span className="section-position" aria-label={`Section ${steps.indexOf(active) + 1} of ${steps.length}`}>{String(steps.indexOf(active) + 1).padStart(2, "0")}</span><h2>{active === "personal" ? "Personal details" : sectionTitle(cv, active)}</h2></div>
              {active !== "personal" && <button className={`icon-button ${cv.hiddenSections.includes(active) ? "muted" : ""}`} aria-label={`${cv.hiddenSections.includes(active) ? "Show" : "Hide"} ${sectionTitle(cv, active)}`} onClick={() => toggleSection(active)}>{cv.hiddenSections.includes(active) ? <EyeOff size={17} /> : <Eye size={17} />}</button>}
            </div>
            <p className="form-description">{guidance[active]}</p>
            {active !== "personal" && cv.hiddenSections.includes(active) && <div className="notice">This section is hidden from your preview and PDF. Your details are still here.</div>}

            {active === "personal" ? <div className="personal-fields">
              <CVPhotoField photo={cv.photo} template={current} onChoose={() => photoInput.current?.click()} onRemove={() => update("photo", undefined)} />
              <div className="personal-contact-grid">
                <Field label="Full name" autoComplete="name" value={cv.personal.name} onChange={v => personal("name", v)} placeholder="e.g. Jordan Taylor" />
                <Field label="Professional title" autoComplete="organization-title" value={cv.personal.headline} onChange={v => personal("headline", v)} placeholder="e.g. Product Designer" />
                <Field label="Email address" type="email" autoComplete="email" value={cv.personal.email} onChange={v => personal("email", v)} onBlur={blurred("email")} error={problem("email")} placeholder="you@example.com" />
                <Field label="Phone number" type="tel" autoComplete="tel" value={cv.personal.phone} onChange={v => personal("phone", v)} onBlur={blurred("phone")} error={problem("phone")} placeholder="Include country code" />
                <Field label="Location" autoComplete="address-level2" value={cv.personal.location} onChange={v => personal("location", v)} placeholder="City, Country" />
                <Field label="Website or LinkedIn" type="url" autoComplete="url" value={cv.personal.website} onChange={v => personal("website", v)} onBlur={blurred("website")} error={problem("website")} placeholder="e.g. linkedin.com/in/your-name" />
              </div>
            </div>
            : active === "summary" ? <>
              <Field label="Profile summary" value={cv.summary} onChange={v => updateText("summary", v)} multiline placeholder="A short introduction to your experience, strengths, and what you bring to the role." />
              <p className="field-count" aria-live="polite">{cv.summary.trim().split(/\s+/).filter(Boolean).length} words · aim for 40–90</p>
              <AISummary summary={cv.summary} headline={cv.personal.headline} onApply={value => updateText("summary", value)} />
              <p className="field-helper"><Wand2 size={15} aria-hidden="true" /><span>Not sure where to start? <Link href="/resume-summary-builder/">Build a profile from a few details</Link>. Your CV stays open in this tab.</span></p>
            </>
            : active === "skills" ? <>
              <Field label="Your skills" value={cv.skills} onChange={v => updateText("skills", v)} multiline placeholder={"Skills: Customer service, scheduling\nTools: Excel, Salesforce"} />
              <SkillSuggestions skills={cv.skills} headline={cv.personal.headline} onChange={v => updateText("skills", v)} />
            </>
            : active === "languages" ? <>
              <Field label="Your languages" value={cv.languages} onChange={v => updateText("languages", v)} multiline rows={4} placeholder={"English: Native\nFrench: Professional working proficiency (B2)"} />
              <LanguageAdder onAdd={line => update("languages", appendLine(cv.languages, line))} />
            </>
            : active === "additional" ? <div className="additional-fields">
              <label className="field"><span>Section heading</span><input value={cv.additionalTitle ?? ""} maxLength={MAX_SECTION_TITLE} placeholder={sectionLabels.additional} onChange={e => update("additionalTitle", e.target.value || undefined)} /></label>
              <div className="title-suggestions" role="group" aria-label="Suggested section headings">{additionalTitles.map(title => <button key={title} type="button" aria-pressed={cv.additionalTitle === title} onClick={() => update("additionalTitle", title)}>{title}</button>)}</div>
              <Field label="Details" value={cv.additional} onChange={v => updateText("additional", v)} multiline placeholder={cv.additionalTitle === "Referees" || cv.additionalTitle === "References" ? "Available on request" : "Volunteering: Food bank driver, 2023 – Present\nInterests: Trail running, chess club captain"} />
            </div>
            : <EntryList section={active} entries={cv[active]} onEdit={editEntry(active)} onChange={changeEntries(active)} />}

            <div className="form-bottom">
              <span><LockKeyhole size={13} /> No pressure to fill every field. Empty sections stay out of your CV.</span>
              <button className="button dark next-step" onClick={goNext}>{nextStep ? <>Next: {nextStep === "personal" ? "Personal details" : sectionTitle(cv, nextStep)}</> : "Choose your design"}<ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
        : tab === "review" ? <CVReview cv={cv} onEdit={section => { setActive(section); setTab("content"); requestAnimationFrame(() => { const panel = document.getElementById("content-panel"); (panel?.querySelector<HTMLElement>("input, textarea") ?? panel)?.focus(); }); }} />
        : <DesignPanel cv={cv} update={update} reorder={reorderSections} toggleSection={toggleSection} />}

        <DraftPanel onSave={() => save()} onSaveCopy={() => save(true)} onOpen={openDraft} onRestoreClick={() => draftInput.current?.click()} onMessage={text => { setMessage(text); setError(""); }} onError={setError} />
      </section>

      <section className="preview-pane" aria-label="Live CV preview">
        <div className="preview-heading">
          <div className="preview-heading-copy"><span className="preview-title"><span className="live-dot" /> Live preview</span><span className="preview-subtitle">Your document, as it will download.</span></div>
          <button className="preview-template" onClick={() => { setTab("design"); setMobileView("edit"); }}>{current.name}<span className="a4-label">A4</span><ChevronDown size={14} aria-hidden="true" /></button>
        </div>
        {current.photo && !cv.photo && tab === "design" && <button className="preview-photo-hint" onClick={() => photoInput.current?.click()}><ImagePlus size={18} /><span><strong>Add a photo to {current.name}.</strong> Optional, and stays on your device.</span></button>}
        <PDFPreview cv={cv} />
        <p className="preview-footnote"><LockKeyhole size={13} /> Exactly what you’ll download. Private by design — no watermarks, no surprises.</p>
      </section>
    </main>

    <input ref={photoInput} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" aria-label="Choose CV photo" onChange={e => { const f = e.target.files?.[0]; if (f) void choosePhoto(f); }} />
    <input ref={uploadInput} type="file" accept=".pdf,.docx" className="sr-only" aria-label="Import CV file" onChange={e => { const f = e.target.files?.[0]; if (f) void readFile(f); }} />
    <input ref={draftInput} type="file" accept=".json" className="sr-only" aria-label="Restore draft file" onChange={e => { const f = e.target.files?.[0]; if (f) void restore(f); }} />
  </div>;
}
