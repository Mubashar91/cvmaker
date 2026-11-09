"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

/** A labelled text input or textarea. The hint is linked as the field's description. */
export function TextInput({ label, value, onChange, placeholder, hint, type = "text", autoComplete, multiline = false, rows = 4, maxLength }: {
  label: string; value: string; onChange: (value: string) => void; placeholder?: string; hint?: string; type?: string; autoComplete?: string; multiline?: boolean; rows?: number; maxLength?: number;
}) {
  const id = useId(); const hintId = `${id}-hint`;
  const shared = { id, value, placeholder, maxLength, "aria-describedby": hint ? hintId : undefined, onChange: (event: { target: { value: string } }) => onChange(event.target.value) };
  return <div className="tool-field"><label htmlFor={id}>{label}</label>{multiline ? <textarea {...shared} rows={rows} /> : <input {...shared} type={type} autoComplete={autoComplete} />}{hint && <small id={hintId}>{hint}</small>}</div>;
}

/** Radio options shown as cards. */
export function ChoiceGroup<T extends string>({ legend, name, value, options, onChange, className = "" }: {
  legend: string; name: string; value: T; options: readonly { id: T; name: string; note?: string; media?: ReactNode }[]; onChange: (value: T) => void; className?: string;
}) {
  return <fieldset className={`choice-group ${className}`}><legend>{legend}</legend><div className="choice-options">{options.map(option => <label key={option.id} className={`choice-card${value === option.id ? " is-selected" : ""}`}>
    <input type="radio" name={name} value={option.id} checked={value === option.id} onChange={() => onChange(option.id)} />
    {option.media}<span className="choice-text"><strong>{option.name}</strong>{option.note && <small>{option.note}</small>}</span>{value === option.id && <Check className="choice-check" size={16} aria-hidden="true" />}
  </label>)}</div></fieldset>;
}

async function copyText(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    // Fallback for browsers without the asynchronous clipboard API.
    const area = document.createElement("textarea"); area.value = text; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0";
    document.body.append(area); area.select();
    try { return document.execCommand("copy"); } catch { return false; } finally { area.remove(); }
  }
}

export function CopyButton({ text, label = "Copy text", className = "button outline", disabled }: { text: string; label?: string; className?: string; disabled?: boolean }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle"); const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() { const ok = await copyText(text); setState(ok ? "copied" : "failed"); clearTimeout(timer.current); timer.current = setTimeout(() => setState("idle"), 2400); }
  return <button type="button" className={className} onClick={copy} disabled={disabled || !text.trim()}>{state === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}<span>{state === "copied" ? "Copied" : state === "failed" ? "Select and copy manually" : label}</span><span className="sr-only" role="status">{state === "copied" ? "Copied to clipboard" : state === "failed" ? "Copying failed" : ""}</span></button>;
}
