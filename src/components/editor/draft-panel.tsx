"use client";
import { useEffect, useRef, useState } from "react";
import { Copy, Download, FolderOpen, Save, Trash2, Upload } from "lucide-react";
import { useCV } from "@/components/cv-context";
import { draftDetail, draftName, MAX_DRAFTS, type SavedDraft } from "@/lib/drafts";
import { downloadBlob } from "@/lib/pdf";

const savedTime = (time: number) => new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(time);

interface DraftPanelProps {
  onSave: () => void;
  onSaveCopy: () => void;
  onOpen: (draft: SavedDraft) => void;
  onRestoreClick: () => void;
  onMessage: (message: string) => void;
  onError: (error: string) => void;
}

/** Saved CVs in this browser, automatic saving, and portable JSON drafts. */
export function DraftPanel({ onSave, onSaveCopy, onOpen, onRestoreClick, onMessage, onError }: DraftPanelProps) {
  const { cv, drafts, draftId, deleteDraft, autosave, setAutosave, autosaveError } = useCV();
  const [target, setTarget] = useState<SavedDraft | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (target) dialog.current?.showModal(); else dialog.current?.close(); }, [target]);
  const current = drafts.find(draft => draft.id === draftId) ?? null;
  const others = drafts.filter(draft => draft.id !== draftId);

  function confirmDelete() {
    if (!target) return;
    const wasOpen = target.id === draftId;
    try {
      deleteDraft(target.id);
      onMessage(wasOpen ? "Saved draft deleted from this browser. Your open CV is still here." : `“${draftName(target.cv)}” deleted from this browser.`);
    } catch (error) { onError(error instanceof Error ? error.message : "The saved CV couldn’t be deleted."); }
    setTarget(null);
  }

  return <><div className="draft-tools">
    <h3>Your drafts, your device.</h3>
    <p>Save versions in this browser, for example one per job, or keep a portable copy. {autosave ? "Changes are saved automatically in this browser." : "Details aren’t saved automatically unless you turn it on."}</p>
    <label className="autosave-toggle">
      <input type="checkbox" role="switch" checked={autosave} onChange={event => { setAutosave(event.target.checked); onMessage(event.target.checked ? "Automatic saving is on. Changes are saved in this browser on this device." : "Automatic saving is off. Choose Save draft to keep your changes."); }} />
      <span className="autosave-track" aria-hidden="true" />
      <span>Save changes automatically on this device</span>
    </label>
    {autosave && <p className="autosave-note">Anyone using this browser profile can open saved CVs. Turn this off on shared computers.</p>}
    {autosaveError && <p className="notice error" role="alert">{autosaveError}</p>}
    <div className="draft-actions">
      <button onClick={onSave}><Save size={14} /> Save draft</button>
      {current && <button onClick={onSaveCopy} disabled={drafts.length >= MAX_DRAFTS} title={drafts.length >= MAX_DRAFTS ? `Up to ${MAX_DRAFTS} saved CVs` : undefined}><Copy size={14} /> Save as a copy</button>}
      <button onClick={() => downloadBlob(new Blob([JSON.stringify(cv, null, 2)], { type: "application/json" }), "folio-draft.json")}><Download size={14} /> Download draft</button>
      <button onClick={onRestoreClick}><Upload size={14} /> Restore draft</button>
      {current && <button className="danger" onClick={() => setTarget(current)}><Trash2 size={14} /> Delete saved draft</button>}
    </div>
    {drafts.length > 0 && <div className="saved-cvs">
      <h4>Saved in this browser <span>{drafts.length} of {MAX_DRAFTS}</span></h4>
      <ul>
        {current && <li className="is-open">
          <span className="saved-cv-name"><strong>{draftName(current.cv)}</strong><small>{draftDetail(current.cv)} · saved {savedTime(current.updatedAt)}</small></span>
          <span className="saved-cv-badge">Open now</span>
        </li>}
        {others.map(draft => <li key={draft.id}>
          <span className="saved-cv-name"><strong>{draftName(draft.cv)}</strong><small>{draftDetail(draft.cv)} · saved {savedTime(draft.updatedAt)}</small></span>
          <span className="saved-cv-actions">
            <button onClick={() => onOpen(draft)} aria-label={`Open saved CV: ${draftName(draft.cv)}, saved ${savedTime(draft.updatedAt)}`}><FolderOpen size={14} /> Open</button>
            <button className="danger" onClick={() => setTarget(draft)} aria-label={`Delete saved CV: ${draftName(draft.cv)}, saved ${savedTime(draft.updatedAt)}`}><Trash2 size={14} /></button>
          </span>
        </li>)}
      </ul>
    </div>}
  </div>
    <dialog ref={dialog} className="delete-dialog" onCancel={() => setTarget(null)} onClose={() => setTarget(null)}>
      <h2>{target && target.id !== draftId ? `Delete “${draftName(target.cv)}”?` : "Delete the saved draft?"}</h2>
      <p>This removes the copy saved in this browser. {target?.id === draftId ? "Your open CV stays in the editor. " : ""}Downloaded files stay on your device until you delete them yourself.</p>
      <div>
        <button className="button subtle" onClick={() => setTarget(null)}>Keep draft</button>
        <button className="button delete-confirm" onClick={confirmDelete}>Delete saved draft</button>
      </div>
    </dialog>
  </>;
}
