"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, RotateCcw } from "lucide-react";
import { useCV } from "./cv-context";
import { ChoiceGroup, CopyButton, TextInput } from "./tool-fields";
import { buildObjectives, buildSummaries, emptyObjective, emptySummary, objectiveStages, summaryStages, type ObjectiveInput, type SummaryInput } from "@/lib/statements";

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

/** Editable drafts with copy and "use in my CV". Edits survive until the details change. */
function Drafts({ drafts, kind }: { drafts: { label: string; text: string }[]; kind: "summary" | "objective" }) {
  const { setCV, setStartSection } = useCV(); const router = useRouter();
  const [edits, setEdits] = useState<Record<string, string>>({});
  const source = drafts.map(draft => draft.text).join("|");
  const [seen, setSeen] = useState(source);
  if (seen !== source) { setSeen(source); setEdits({}); } // New details: start from the fresh drafts.
  function use(text: string) { setCV(current => ({ ...current, summary: text })); setStartSection("summary"); router.push("/editor/"); }
  return <ol className="draft-list">{drafts.map(draft => {
    const text = edits[draft.label] ?? draft.text; const count = words(text);
    return <li key={draft.label} className="draft-card"><div className="draft-head"><h3>{draft.label}</h3><span className={count > 90 ? "is-long" : undefined}>{count} words</span></div>
      <label className="sr-only" htmlFor={`draft-${draft.label}`}>{draft.label} {kind}, editable</label>
      <textarea id={`draft-${draft.label}`} value={text} rows={5} onChange={event => setEdits(current => ({ ...current, [draft.label]: event.target.value }))} />
      <div className="draft-actions"><CopyButton text={text} label="Copy" className="button outline small" /><button type="button" className="button dark small" disabled={/\[[^\]]+\]/.test(text)} onClick={() => use(text)}>Use as my CV profile<ArrowRight size={15} aria-hidden="true" /></button>{edits[draft.label] !== undefined && <button type="button" className="text-button" onClick={() => setEdits(current => { const next = { ...current }; delete next[draft.label]; return next; })}><RotateCcw size={13} aria-hidden="true" />Undo edits</button>}</div>
    </li>;
  })}</ol>;
}

export function SummaryBuilder() {
  const [input, setInput] = useState<SummaryInput>(emptySummary);
  const set = (key: keyof SummaryInput) => (value: string) => setInput(current => ({ ...current, [key]: value }));
  const early = input.stage === "early", change = input.stage === "change";
  return <div className="tool-workspace">
    <div className="tool-form"><section className="tool-step" aria-labelledby="summary-details"><div className="tool-step-head"><h2 id="summary-details"><span className="step-number">1</span>Your details</h2></div>
      <ChoiceGroup legend="Where are you in your career?" name="summary-stage" value={input.stage} options={summaryStages} onChange={value => setInput(current => ({ ...current, stage: value }))} className="is-compact" />
      <div className="field-grid">
        <TextInput label={early ? "Your course or current situation" : change ? "Your current or previous job title" : "Your job title"} value={input.title} onChange={set("title")} placeholder={early ? "e.g. Business Management graduate" : change ? "e.g. Primary school teacher" : "e.g. Customer service advisor"} />
        {!early && <TextInput label="Years of experience (optional)" type="number" value={input.years} onChange={set("years")} placeholder="e.g. 5" />}
        <TextInput label={early ? "Where your experience comes from (optional)" : change ? "Training or projects in the new field (optional)" : "Industry or setting (optional)"} value={input.context} onChange={set("context")} placeholder={early ? "e.g. a summer internship and part-time retail work" : change ? "e.g. a usability testing course" : "e.g. retail banking"} />
        <TextInput label={change ? "The field you are moving into" : early ? "The role you want (optional)" : "What you want next (optional)"} value={input.target} onChange={set("target")} placeholder={change ? "e.g. UX research" : early ? "e.g. graduate marketing role" : "e.g. a team leader role"} />
      </div>
      <TextInput label="Two or three key skills" value={input.skills} onChange={set("skills")} placeholder="e.g. complaint handling, Zendesk, coaching new starters" hint="Separate with commas. The first three are used." />
      <TextInput label="A result you are proud of (optional)" value={input.achievement} onChange={set("achievement")} placeholder="e.g. reduced repeat complaints by 20% in a year" hint="Start with a verb, and only use figures you can explain." />
      <TextInput label="How colleagues would describe you (optional)" value={input.strength} onChange={set("strength")} placeholder="e.g. calm under pressure" />
      <button type="button" className="text-button" onClick={() => setInput(emptySummary())}><RotateCcw size={13} aria-hidden="true" />Clear all details</button>
    </section></div>
    <div className="tool-output"><div className="tool-output-head"><h2 className="tool-output-title">Your summary drafts</h2><span>Updates as you type</span></div><Drafts drafts={buildSummaries(input)} kind="summary" /><p className="tool-privacy"><LockKeyhole size={14} aria-hidden="true" />Built in your browser from predefined sentence patterns. No AI, nothing uploaded.</p></div>
  </div>;
}

export function ObjectiveGenerator() {
  const [input, setInput] = useState<ObjectiveInput>(emptyObjective);
  const set = (key: keyof ObjectiveInput) => (value: string) => setInput(current => ({ ...current, [key]: value }));
  const placeholders = { student: "e.g. Second-year Economics student", graduate: "e.g. Recent Biology graduate", change: "e.g. Retail manager with eight years of team leadership", return: "e.g. Registered nurse returning after a three-year career break" }[input.stage];
  return <div className="tool-workspace">
    <div className="tool-form"><section className="tool-step" aria-labelledby="objective-details"><div className="tool-step-head"><h2 id="objective-details"><span className="step-number">1</span>Your details</h2></div>
      <ChoiceGroup legend="What kind of role are you applying for?" name="objective-stage" value={input.stage} options={objectiveStages} onChange={value => setInput(current => ({ ...current, stage: value }))} className="is-compact" />
      <div className="field-grid">
        <TextInput label="The role you want" value={input.target} onChange={set("target")} placeholder="e.g. summer internship in finance" />
        <TextInput label="Company or industry (optional)" value={input.organisation} onChange={set("organisation")} placeholder="e.g. Northbridge Bank" />
      </div>
      <TextInput label="Your background" value={input.background} onChange={set("background")} placeholder={placeholders} />
      <TextInput label="Two or three skills you offer" value={input.skills} onChange={set("skills")} placeholder="e.g. Excel, financial modelling, teamwork" hint="Separate with commas." />
      <TextInput label="What you hope to learn or contribute (optional)" value={input.goal} onChange={set("goal")} placeholder="e.g. learn how client portfolios are managed" hint="Start with a verb." />
      <TextInput label="Availability (optional)" value={input.availability} onChange={set("availability")} placeholder="e.g. available from June 2027" />
      <button type="button" className="text-button" onClick={() => setInput(emptyObjective())}><RotateCcw size={13} aria-hidden="true" />Clear all details</button>
    </section></div>
    <div className="tool-output"><div className="tool-output-head"><h2 className="tool-output-title">Your objective drafts</h2><span>Updates as you type</span></div><Drafts drafts={buildObjectives(input)} kind="objective" /><p className="tool-privacy"><LockKeyhole size={14} aria-hidden="true" />Built in your browser from predefined sentence patterns. No AI, nothing uploaded.</p></div>
  </div>;
}
