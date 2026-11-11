"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, LoaderCircle, Sparkles, X } from "lucide-react";

/** Optional AI rewrite of one experience entry's bullet points, applied only on the visitor's choice. */
export function AIBullets({ description, title, onApply }: { description: string; title: string; onApply: (value: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState<{ text: string; original: string } | null>(null);
  const controller = useRef<AbortController | null>(null);
  const suggestionRef = useRef<HTMLTextAreaElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  useEffect(() => () => { controller.current?.abort(); controller.current = null; }, []);
  const valid = description.trim().length >= 30 && description.trim().length <= 3_000 && title.trim().length <= 200;
  const stale = suggestion !== null && description !== suggestion.original;

  async function improve() {
    if (!valid || controller.current) return;
    const request = new AbortController(); controller.current = request;
    const timeout = setTimeout(() => request.abort(), 25_000);
    setLoading(true); setError(""); setSuggestion(null);
    try {
      const response = await fetch("/api/improve-bullets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ description, title }), signal: request.signal });
      const data = await response.json().catch(() => null);
      if (!response.ok || typeof data?.description !== "string" || !data.description.trim() || data.description.length > 4_000) throw new Error(typeof data?.error === "string" ? data.error : "AI bullet improvement is unavailable right now. Please try again later.");
      setSuggestion({ text: data.description.trim(), original: description });
      requestAnimationFrame(() => suggestionRef.current?.focus());
    } catch (cause) {
      if (controller.current === request) setError(request.signal.aborted ? "The request timed out. Please try again. Your original points are safe." : cause instanceof Error && !(cause instanceof TypeError) ? cause.message : "Could not connect to AI. Please try again.");
    } finally {
      clearTimeout(timeout);
      if (controller.current === request) { controller.current = null; setLoading(false); }
    }
  }

  return <div className="ai-summary">
    <button ref={actionRef} type="button" className="text-button" disabled={!valid || loading} onClick={improve} aria-describedby={undefined}>
      {loading ? <LoaderCircle size={14} className="spin" aria-hidden="true" /> : <Sparkles size={14} aria-hidden="true" />}{loading ? "Improving points…" : "Improve bullet points with AI"}
    </button>
    <span className="sr-only" role="status">{loading ? "AI is improving your bullet points." : suggestion ? "Your suggested bullet points are ready to review." : ""}</span>
    {error && <p className="ai-summary-error" role="alert">{error}</p>}
    {suggestion && <div className="ai-summary-result">
      <label htmlFor="ai-bullets-suggestion">Suggested bullet points</label>
      <p>Same facts, clearer wording — check each line before using it. Sending used your description and job title only. <Link href="/privacy/#ai">Privacy details</Link>.</p>
      <textarea ref={suggestionRef} id="ai-bullets-suggestion" value={suggestion.text} maxLength={4_000} rows={5} onChange={event => setSuggestion({ ...suggestion, text: event.target.value })} />
      {stale && <p role="status">The description has changed. Improve it again to get a suggestion for your latest text.</p>}
      <div className="ai-summary-buttons">
        <button type="button" className="button dark" disabled={stale || !suggestion.text.trim()} onClick={() => { onApply(suggestion.text.trim()); setSuggestion(null); actionRef.current?.focus(); }}><Check size={15} aria-hidden="true" />Use these points</button>
        <button type="button" className="button subtle" onClick={() => { setSuggestion(null); actionRef.current?.focus(); }}><X size={15} aria-hidden="true" />Discard</button>
      </div>
    </div>}
  </div>;
}
