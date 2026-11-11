"use client";
import { ArrowDown, ArrowUp, FileText, Plus, Trash2 } from "lucide-react";
import { AIBullets } from "@/components/ai-bullets";
import { DragHandle, useDragSort } from "@/components/sortable";
import { emptyEntry, move, moveTo, type Entry, type EntrySection } from "@/lib/model";
import { Field } from "./editor-fields";

const labels: Record<EntrySection, { title: string; organization: string; dates: string; add: string }> = {
  experience: { title: "Job title", organization: "Company", dates: "e.g. Mar 2022 – Present", add: "experience" },
  education: { title: "Degree or qualification", organization: "School or university", dates: "e.g. 2019 – 2022", add: "education" },
  projects: { title: "Project name", organization: "Organization or link", dates: "e.g. Mar 2022 – Present", add: "project" },
  certifications: { title: "Certification name", organization: "Issuing organization", dates: "e.g. 2024", add: "certification" },
};
const hints: Record<EntrySection, string> = {
  experience: "One point per line. Start with an action, e.g. “Led…”, “Built…”, “Improved…”, and add a result where you can.",
  education: "Optional: grade, honours, relevant modules, or a dissertation topic.",
  projects: "What you made, the tools you used, and what changed because of it.",
  certifications: "Optional: credential ID, link, or expiry date.",
};

interface EntryListProps {
  section: EntrySection;
  entries: Entry[];
  /** Edits one field of one entry. */
  onEdit: (id: string, field: keyof Entry, value: string) => void;
  /** Adds, removes, or reorders entries, as one undoable step. */
  onChange: (update: (entries: Entry[]) => Entry[]) => void;
}

export function EntryList({ section, entries, onEdit, onChange }: EntryListProps) {
  const sort = useDragSort((from, to) => onChange(list => moveTo(list, from, to)));
  const text = labels[section];
  return <div className="entries" ref={sort.ref}>
    {entries.length === 0 && <div className="entries-empty"><FileText size={25} strokeWidth={1.3} /><p>A blank space for something worth sharing.</p></div>}
    {entries.map((entry, i) => <div className={`entry-card${sort.itemClass(i)}`} data-sort-item key={entry.id}>
      <div className="entry-toolbar">
        <span>{entries.length > 1 && <DragHandle onPointerDown={event => sort.start(i, event)} />}<span className="entry-number">{String(i + 1).padStart(2, "0")}</span><strong>{entry.title || "New entry"}</strong></span>
        <div>
          <button className="icon-button" aria-label={`Move entry ${i + 1} up`} disabled={i === 0} onClick={() => onChange(list => move(list, i, -1))}><ArrowUp size={14} /></button>
          <button className="icon-button" aria-label={`Move entry ${i + 1} down`} disabled={i === entries.length - 1} onClick={() => onChange(list => move(list, i, 1))}><ArrowDown size={14} /></button>
          <button className="icon-button danger" aria-label={`Remove entry ${i + 1}`} onClick={() => onChange(list => list.filter(item => item.id !== entry.id))}><Trash2 size={14} /></button>
        </div>
      </div>
      <Field label={text.title} value={entry.title} onChange={v => onEdit(entry.id, "title", v)} />
      <div className="field-row">
        <Field label={text.organization} value={entry.organization} onChange={v => onEdit(entry.id, "organization", v)} />
        <Field label="Dates" value={entry.dates} onChange={v => onEdit(entry.id, "dates", v)} placeholder={text.dates} />
      </div>
      <Field label="Description" value={entry.description} onChange={v => onEdit(entry.id, "description", v)} multiline placeholder={hints[section]} />
      {section === "experience" && <AIBullets description={entry.description} title={entry.title} onApply={v => onEdit(entry.id, "description", v)} />}
    </div>)}
    <button className="add-entry" onClick={() => onChange(list => [...list, emptyEntry()])}><Plus size={16} /> Add {text.add}</button>
  </div>;
}
