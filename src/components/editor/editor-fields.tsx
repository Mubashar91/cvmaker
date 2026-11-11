"use client";
import { useState } from "react";
import { CircleAlert, Plus } from "lucide-react";

export type ContactKey = "email" | "phone" | "website";

/** Gentle format checks for contact details. They never block editing or downloading. */
export function contactProblem(key: ContactKey, value: string): string {
  const text = value.trim();
  if (!text) return "";
  if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text)) return "This doesn’t look like a complete email address, e.g. name@example.com.";
  if (key === "phone" && (/[a-wyz]/i.test(text) || text.replace(/\D/g, "").length < 7)) return "Check the number. Include the country code if you’re applying abroad.";
  if (key === "website" && (/\s/.test(text) || !/\.[a-z]{2,}/i.test(text))) return "Check the link, e.g. linkedin.com/in/your-name.";
  return "";
}

interface FieldProps {
  label: string; value: string; onChange: (value: string) => void;
  multiline?: boolean; placeholder?: string; type?: string; error?: string;
  onBlur?: () => void; autoComplete?: string; rows?: number;
}

/**
 * A labelled input or textarea. A format problem sits after the label (so it never becomes
 * part of the field's name) and is announced as the field's description.
 */
export function Field({ label, value, onChange, multiline = false, placeholder, type = "text", error, onBlur, autoComplete, rows = 5 }: FieldProps) {
  const errorId = `${label.toLowerCase().replace(/[^a-z]+/g, "-")}-problem`;
  const shared = { value, placeholder, onBlur, "aria-invalid": error ? true : undefined, "aria-describedby": error ? errorId : undefined };
  return <div className="field-group">
    <label className={`field${error ? " has-problem" : ""}`}>
      <span>{label}</span>
      {multiline
        ? <textarea {...shared} rows={rows} onChange={e => onChange(e.target.value)} />
        : <input {...shared} type={type} autoComplete={autoComplete} onChange={e => onChange(e.target.value)} />}
    </label>
    {error && <small className="field-problem" id={errorId}><CircleAlert size={14} aria-hidden="true" />{error}</small>}
  </div>;
}

export const languageLevels = ["Native or bilingual", "Fluent", "Professional working proficiency", "Conversational", "Basic"];

export function LanguageAdder({ onAdd }: { onAdd: (line: string) => void }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(languageLevels[2]);
  function add() { if (!name.trim()) return; onAdd(`${name.trim()}: ${level}`); setName(""); }
  return <div className="language-adder" role="group" aria-label="Add a language">
    <div>
      <label htmlFor="language-name">Language</label>
      <input id="language-name" data-native-undo value={name} placeholder="e.g. Spanish" onChange={e => setName(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(); } }} />
    </div>
    <div>
      <label htmlFor="language-level">Level</label>
      <select id="language-level" value={level} onChange={e => setLevel(e.target.value)}>{languageLevels.map(item => <option key={item}>{item}</option>)}</select>
    </div>
    <button type="button" className="button outline" disabled={!name.trim()} onClick={add}><Plus size={15} /> Add language</button>
  </div>;
}
