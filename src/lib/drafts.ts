import { parseCV, templateById, type CV } from "./model";

/** Saved CVs in this browser's local storage, most recent first. */
export const DRAFTS_KEY = "folio-drafts-v2";
/** The single draft saved by earlier versions; moved into DRAFTS_KEY on first read. */
export const LEGACY_DRAFT_KEY = "folio-draft-v1";
const AUTOSAVE_KEY = "folio-autosave-v1";
export const MAX_DRAFTS = 12;

export interface SavedDraft { id: string; updatedAt: number; cv: CV }

export class DraftStorageError extends Error {}

/** A short label for a saved CV: the person's name, or a placeholder. */
export function draftName(cv: CV): string { return cv.personal.name.trim() || "Untitled CV"; }
/** A second line for a saved CV: the professional title, or the template. */
export function draftDetail(cv: CV): string { return cv.personal.headline.trim() || `${templateById(cv.template).name} template`; }

function writeStore(drafts: SavedDraft[]) {
  try { localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts)); }
  catch { throw new DraftStorageError("Browser storage is unavailable or full. Delete a saved CV, or use Download draft to keep a copy on your device."); }
}

function readStore(): SavedDraft[] {
  let drafts: SavedDraft[] = [];
  const raw = localStorage.getItem(DRAFTS_KEY);
  if (raw) {
    try {
      const data: unknown = JSON.parse(raw);
      if (Array.isArray(data)) drafts = data.flatMap(item => {
        const cv = parseCV(item?.cv);
        return cv && typeof item.id === "string" && typeof item.updatedAt === "number" ? [{ id: item.id, updatedAt: item.updatedAt, cv }] : [];
      });
    } catch { /* an unreadable store is treated as empty */ }
  }
  const legacy = localStorage.getItem(LEGACY_DRAFT_KEY);
  if (legacy !== null) {
    let cv: CV | null = null;
    try { cv = parseCV(JSON.parse(legacy)); } catch { /* left in place, unchanged */ }
    if (cv) {
      drafts = [{ id: crypto.randomUUID(), updatedAt: Date.now(), cv }, ...drafts];
      writeStore(drafts);
      localStorage.removeItem(LEGACY_DRAFT_KEY);
    }
  }
  return drafts.sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Every saved CV, most recent first. Empty when storage is unavailable. */
export function listDrafts(): SavedDraft[] {
  try { return readStore(); } catch { return []; }
}

/** Saves the CV under `id`, or as a new saved CV when `id` is null. Throws DraftStorageError. */
export function saveDraft(cv: CV, id: string | null): SavedDraft {
  let drafts: SavedDraft[];
  try { drafts = readStore(); } catch { throw new DraftStorageError("Browser storage is unavailable. Use Download draft to keep a copy on your device."); }
  const existing = id ? drafts.find(draft => draft.id === id) : undefined;
  if (!existing && drafts.length >= MAX_DRAFTS) throw new DraftStorageError(`You have ${MAX_DRAFTS} saved CVs, the most this browser keeps. Delete one you no longer need, then save again.`);
  const record: SavedDraft = { id: existing?.id ?? id ?? crypto.randomUUID(), updatedAt: Date.now(), cv };
  writeStore([record, ...drafts.filter(draft => draft.id !== record.id)]);
  return record;
}

export function deleteDraft(id: string) {
  let drafts: SavedDraft[];
  try { drafts = readStore(); } catch { throw new DraftStorageError("The saved CV couldn’t be deleted because browser storage is unavailable."); }
  writeStore(drafts.filter(draft => draft.id !== id));
}

/** Whether changes are saved automatically. Off unless the visitor turns it on. */
export function readAutosave(): boolean {
  try { return localStorage.getItem(AUTOSAVE_KEY) === "on"; } catch { return false; }
}
export function writeAutosave(on: boolean) {
  try { if (on) localStorage.setItem(AUTOSAVE_KEY, "on"); else localStorage.removeItem(AUTOSAVE_KEY); } catch { /* the choice lasts for this visit */ }
}
