"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, LoaderCircle, Wand2, X } from "lucide-react";

export function AISummary({ summary, headline, onApply }: { summary: string; headline: string; onApply: (value: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState<{ text: string; original: string } | null>(null);
  const [applied, setApplied] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const suggestionRef = useRef<HTMLTextAreaElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  useEffect(() => () => { controller.current?.abort(); controller.current = null; }, []);
  const valid = summary.trim().length >= 20 && summary.trim().length <= 5_000 && headline.trim().length <= 200;
  const stale = suggestion !== null && summary !== suggestion.original;

  async function improve() {
    if (!valid || controller.current) return;
    const request = new AbortController(); controller.current = request;
    const timeout = setTimeout(() => request.abort(), 25_000);
    setLoading(true); setError(""); setSuggestion(null); setApplied(false);
    try {
      const response = await fetch("/api/improve-summary", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ summary, headline }), signal: request.signal });
      const data = await response.json().catch(() => null);
      if (!response.ok || typeof data?.summary !== "string" || !data.summary.trim() || data.summary.length > 3_000) throw new Error(typeof data?.error === "string" ? data.error : "AI summary improvement is unavailable right now. Please try again later.");
      setSuggestion({ text: data.summary.trim(), original: summary });
      requestAnimationFrame(() => suggestionRef.current?.focus());
    } catch (cause) {
      if (controller.current === request) setError(request.signal.aborted ? "The request timed out. Please try again. Your original summary is safe." : cause instanceof Error && !(cause instanceof TypeError) ? cause.message : "Could not connect to AI. Please try again.");
    } finally {
      clearTimeout(timeout);
      if (controller.current === request) { controller.current = null; setLoading(false); }
    }
  }

  return <div className="ai-summary">
    <button ref={actionRef} type="button" className="button dark ai-summary-action" disabled={!valid || loading} onClick={improve} aria-describedby="ai-summary-note">
      {loading ? <LoaderCircle size={16} className="spin" aria-hidden="true" /> : <Wand2 size={16} aria-hidden="true" />}{loading ? "Improving summary…" : "Improve summary with AI"}
    </button>
    <p id="ai-summary-note" className="ai-summary-note">{!valid ? "Write 20–5,000 characters and keep your professional title under 200 characters. " : ""}Choosing AI sends your summary and professional title to OpenAI for rewriting. Review the result before using it. <Link href="/privacy/#ai">Privacy details</Link>.</p>
    <span className="sr-only" role="status">{loading ? "AI is improving your summary." : applied ? "AI summary applied. You can continue editing it." : suggestion ? "Your suggested summary is ready to review." : ""}</span>
    {error && <p className="ai-summary-error" role="alert">{error}</p>}
    {suggestion && <div className="ai-summary-result">
      <label htmlFor="ai-summary-suggestion">Suggested summary</label>
      <p>Check the facts and make any edits before using this version.</p>
      <textarea ref={suggestionRef} id="ai-summary-suggestion" value={suggestion.text} maxLength={3_000} rows={6} onChange={event => setSuggestion({ ...suggestion, text: event.target.value })} />
      {stale && <p role="status">Your original summary has changed. Improve it again to get a suggestion for your latest text.</p>}
      <div className="ai-summary-buttons">
        <button type="button" className="button dark" disabled={stale || !suggestion.text.trim()} onClick={() => { onApply(suggestion.text.trim()); setSuggestion(null); setApplied(true); actionRef.current?.focus(); }}><Check size={15} aria-hidden="true" />Use this summary</button>
        <button type="button" className="button subtle" onClick={() => { setSuggestion(null); actionRef.current?.focus(); }}><X size={15} aria-hidden="true" />Discard</button>
      </div>
    </div>}
  </div>;
}
