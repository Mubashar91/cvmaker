"use client";
import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { CopyButton, TextInput } from "./tool-fields";

const empty = { action: "", task: "", context: "", result: "" };
type Details = typeof empty;

// Join the visitor's facts. No inferred achievements, metrics, or AI requests.
function phrase(value: string) { return value.trim().replace(/^[•\-\s]+/, "").replace(/[.!?;\s]+$/, ""); }
function buildBullet(details: Details) {
  const action = phrase(details.action), task = phrase(details.task);
  if (!action || !task) return "";
  const context = phrase(details.context), result = phrase(details.result);
  return `${action.charAt(0).toUpperCase()}${action.slice(1)} ${task}${context ? ` ${context}` : ""}${result ? `; ${result}` : ""}.`;
}

export function BulletPointBuilder() {
  const [details, setDetails] = useState(empty);
  const [draft, setDraft] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  function set(key: keyof Details, value: string) {
    setDetails(current => ({ ...current, [key]: value })); setDraft(null); setNotice("");
  }
  function example() {
    setDetails({ action: "Organised", task: "weekly study sessions", context: "for 12 classmates", result: "shared revision notes before each session" });
    setDraft(null); setNotice("Fictional example loaded. Replace these details with your own before using the bullet.");
  }
  return <div className="tool-workspace">
    <form className="tool-form" onSubmit={event => { event.preventDefault(); setDraft(buildBullet(details)); setNotice("Bullet point ready to review."); }}>
      <section className="tool-step" aria-labelledby="bullet-details"><div className="tool-step-head"><h2 id="bullet-details"><span className="step-number">1</span>What did you do?</h2></div>
        <p className="tool-intro">Use a job, project, volunteer role, or everyday responsibility. The builder joins your words into one sentence.</p>
        <TextInput label="Action verb" value={details.action} onChange={value => set("action", value)} placeholder="e.g. Organised" hint="Use present tense for ongoing work or past tense for completed work." maxLength={60} />
        <TextInput label="Task or contribution" value={details.task} onChange={value => set("task", value)} placeholder="e.g. weekly study sessions" maxLength={300} />
        <TextInput label="Context or scale (optional)" value={details.context} onChange={value => set("context", value)} placeholder="e.g. for 12 classmates" hint="Include the setting, tool, frequency, or group size if relevant." maxLength={300} />
        <TextInput label="Result or purpose (optional)" value={details.result} onChange={value => set("result", value)} placeholder="e.g. shared revision notes before each session" hint="Write a short clause. Include numbers only if you can support them; no result is invented when this is blank." maxLength={300} />
        <div className="draft-actions"><button className="button dark" type="submit" disabled={!buildBullet(details)}>Build my bullet point</button><button type="button" className="button outline" onClick={example}>Load fictional example</button><button type="button" className="text-button" onClick={() => { setDetails(empty); setDraft(null); setNotice("Fields cleared."); }}>Clear</button></div>
      </section>
    </form>
    <section className="tool-output" aria-labelledby="bullet-result"><div className="tool-output-head"><h2 id="bullet-result" className="tool-output-title">Review your bullet point</h2></div>
      <p className="tool-status" role="status">{notice}</p>
      {draft !== null ? <div className="draft-card"><TextInput label="Your bullet point, editable" value={draft} onChange={setDraft} multiline rows={5} /><p>Check the grammar and every fact. Copy the line into the relevant experience, education, or project entry in your CV.</p><div className="draft-actions"><CopyButton text={draft} label="Copy bullet point" /></div></div> : <p className="tool-empty">Add an action and a task, then build your bullet point. Optional details add context without inventing achievements.</p>}
      <p className="tool-privacy"><LockKeyhole size={14} aria-hidden="true" />Your details stay in this tab. No account or AI service.</p>
    </section>
  </div>;
}
