"use client";
import { createContext, useCallback, useContext, useEffect, useReducer, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { emptyCV, hasContent, type CV, type Section } from "@/lib/model";
import { deleteDraft as removeStoredDraft, DRAFTS_KEY, listDrafts, readAutosave, saveDraft as storeDraft, writeAutosave, type SavedDraft } from "@/lib/drafts";

// ---------------------------------------------------------------------------
// Undo history
// ---------------------------------------------------------------------------

const HISTORY_LIMIT = 100;
/** Edits in the same group (typing in one field) within this pause become one undo step. */
const GROUP_PAUSE_MS = 1_200;

interface History { present: CV; past: CV[]; future: CV[]; group: string | null; at: number }
type HistoryAction =
  | { type: "set"; update: SetStateAction<CV>; group?: string; at: number }
  | { type: "load"; cv: CV }
  | { type: "undo" }
  | { type: "redo" };

function historyReducer(state: History, action: HistoryAction): History {
  switch (action.type) {
    case "set": {
      const next = typeof action.update === "function" ? action.update(state.present) : action.update;
      if (next === state.present) return state;
      const merge = !!action.group && action.group === state.group && action.at - state.at < GROUP_PAUSE_MS;
      return { present: next, past: merge ? state.past : [...state.past, state.present].slice(-HISTORY_LIMIT), future: [], group: action.group ?? null, at: action.at };
    }
    case "load":
      return { present: action.cv, past: [], future: [], group: null, at: 0 };
    case "undo":
      if (!state.past.length) return state;
      return { present: state.past[state.past.length - 1], past: state.past.slice(0, -1), future: [state.present, ...state.future].slice(0, HISTORY_LIMIT), group: null, at: 0 };
    case "redo":
      if (!state.future.length) return state;
      return { present: state.future[0], past: [...state.past, state.present].slice(-HISTORY_LIMIT), future: state.future.slice(1), group: null, at: 0 };
  }
}

const startHistory = (): History => ({ present: emptyCV(), past: [], future: [], group: null, at: 0 });

// ---------------------------------------------------------------------------

interface CVState {
  cv: CV;
  /** Changes the CV as one undoable step. Works like a useState setter. */
  setCV: Dispatch<SetStateAction<CV>>;
  /** Like setCV, but consecutive edits with the same group merge into one undo step. */
  editCV: (update: SetStateAction<CV>, group?: string) => void;
  /** Opens a CV with a fresh undo history. `saved: false` marks it as not yet saved in this browser. */
  loadCV: (cv: CV, options?: { draftId?: string | null; saved?: boolean }) => void;
  undo: () => void; redo: () => void; canUndo: boolean; canRedo: boolean;

  /** CVs saved in this browser, most recent first. */
  drafts: SavedDraft[];
  /** The saved CV the open CV belongs to, if any. */
  draftId: string | null;
  /** The open CV has content that is not saved in this browser. */
  unsaved: boolean;
  /** Saves the open CV (or a new copy of it). Throws DraftStorageError. */
  saveDraft: (options?: { asCopy?: boolean }) => SavedDraft;
  /** Deletes a saved CV. The open CV stays open. Throws DraftStorageError. */
  deleteDraft: (id: string) => void;
  /** Treats the open CV as a new CV, so saving does not overwrite the one it came from. */
  detachDraft: () => void;
  autosave: boolean; setAutosave: (on: boolean) => void;
  /** The last automatic save problem, e.g. full storage. Empty when saving works. */
  autosaveError: string;

  pendingFile: File | null; setPendingFile: Dispatch<SetStateAction<File | null>>;
  /** A section the editor should open on next, e.g. after a tool adds a profile. Consumed once. */
  startSection: Section | null; setStartSection: Dispatch<SetStateAction<Section | null>>;
  /** A message the editor shows once when it opens, e.g. after a tool opens a CV there. */
  notice: string | null; setNotice: Dispatch<SetStateAction<string | null>>;
}

const Context = createContext<CVState | null>(null);

export function CVProvider({ children }: { children: ReactNode }) {
  const [history, dispatch] = useReducer(historyReducer, undefined, startHistory);
  const [savedCV, setSavedCV] = useState<CV | null>(history.present);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<SavedDraft[]>([]);
  const [autosave, setAutosaveState] = useState(false);
  const [autosaveError, setAutosaveError] = useState("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [startSection, setStartSection] = useState<Section | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const cv = history.present;
  const unsaved = cv !== savedCV && hasContent(cv);
  // Callbacks read the latest values without being recreated on every keystroke.
  const latest = useRef({ cv, draftId, autosave });
  useEffect(() => { latest.current = { cv, draftId, autosave }; }, [cv, draftId, autosave]);

  useEffect(() => {
    setDrafts(listDrafts());
    setAutosaveState(readAutosave());
    const sync = (event: StorageEvent) => { if (event.key === DRAFTS_KEY || event.key === null) setDrafts(listDrafts()); };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const setCV = useCallback<Dispatch<SetStateAction<CV>>>(update => dispatch({ type: "set", update, at: Date.now() }), []);
  const editCV = useCallback((update: SetStateAction<CV>, group?: string) => dispatch({ type: "set", update, group, at: Date.now() }), []);
  const undo = useCallback(() => dispatch({ type: "undo" }), []);
  const redo = useCallback(() => dispatch({ type: "redo" }), []);
  const loadCV = useCallback((next: CV, options: { draftId?: string | null; saved?: boolean } = {}) => {
    dispatch({ type: "load", cv: next });
    setDraftId(options.draftId ?? null);
    setSavedCV(options.saved === false ? null : next);
  }, []);

  const saveDraft = useCallback((options: { asCopy?: boolean } = {}) => {
    const { cv: current, draftId: id } = latest.current;
    const record = storeDraft(current, options.asCopy ? null : id);
    setDraftId(record.id); setSavedCV(current); setDrafts(listDrafts()); setAutosaveError("");
    return record;
  }, []);

  const deleteDraft = useCallback((id: string) => {
    removeStoredDraft(id);
    setDrafts(listDrafts());
    if (id === latest.current.draftId) {
      setDraftId(null);
      // With autosave on, the open CV counts as handled until it changes again, so deleting
      // does not immediately save it back. Without autosave, leaving the page warns first.
      setSavedCV(latest.current.autosave ? latest.current.cv : null);
    }
  }, []);

  const detachDraft = useCallback(() => setDraftId(null), []);
  const setAutosave = useCallback((on: boolean) => { setAutosaveState(on); writeAutosave(on); if (!on) setAutosaveError(""); }, []);

  // Automatic saving, when turned on: shortly after the last change.
  useEffect(() => {
    if (!autosave || !unsaved) return;
    const timer = setTimeout(() => {
      try { saveDraft(); }
      catch (error) { setAutosaveError(error instanceof Error ? error.message : "This CV couldn’t be saved automatically."); }
    }, 800);
    return () => clearTimeout(timer);
  }, [autosave, unsaved, cv, saveDraft]);

  // Ask before closing or reloading the tab while there is work that isn't saved anywhere.
  useEffect(() => {
    if (!unsaved) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [unsaved]);

  return <Context.Provider value={{
    cv, setCV, editCV, loadCV, undo, redo, canUndo: history.past.length > 0, canRedo: history.future.length > 0,
    drafts, draftId, unsaved, saveDraft, deleteDraft, detachDraft, autosave, setAutosave, autosaveError,
    pendingFile, setPendingFile, startSection, setStartSection, notice, setNotice,
  }}>{children}</Context.Provider>;
}

export function useCV() { const context = useContext(Context); if (!context) throw new Error("CVProvider required"); return context; }
