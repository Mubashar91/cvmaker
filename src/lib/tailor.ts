import { cvPlainText } from "./cv-review";
import { compareKeywords } from "./keyword-match";
import { hasEntry, type CV, type Entry, type Section } from "./model";

// Builds the request for /api/tailor-cv and merges its answer into a copy of the CV.
// Only CV content is sent: never the name, contact details, or photo. The answer can only
// replace the profile, the skills, and entry descriptions; titles, employers, dates,
// education, and certifications stay exactly as they were.

export type TailorSection = "summary" | "skills" | "experience" | "projects";
export interface TailorResponse {
  summary: string;
  skills: string;
  experience: { id: string; description: string }[];
  projects: { id: string; description: string }[];
  changes: { section: TailorSection; note: string }[];
  missing: { requirement: string; advice: string }[];
  removedSkills: string[];
  kept: { section: string; id?: string; reason: string }[];
}
export interface TailorEdit { label: string; before: string; after: string }
export interface TailoredCV {
  before: CV;
  after: CV;
  changes: TailorResponse["changes"];
  missing: TailorResponse["missing"];
  removedSkills: string[];
  /** Places where the original wording was kept because the AI version could not be trusted. */
  kept: string[];
  /** What changed, for a before-and-after comparison. */
  edits: TailorEdit[];
  /** Share of the advert's keywords found in the CV, before and after. */
  keywords: { before: number; after: number };
}

const LIMITS = { headline: 200, summary: 3_000, skills: 3_000, languages: 1_000, field: 300, description: 3_000, entries: 15, total: 15_000 };
const visible = (cv: CV, key: Section) => !cv.hiddenSections.includes(key);
const filled = (entries: Entry[]) => entries.filter(hasEntry);

/** Why this CV can't be sent for tailoring, or an empty string when it can. */
export function tailorProblem(cv: CV): string {
  const entries = (["experience", "projects", "education", "certifications"] as const).filter(key => visible(cv, key)).map(key => filled(cv[key]));
  if (entries.some(list => list.length > LIMITS.entries)) return "One section has more than 15 entries. Hide or remove older entries in the editor, then try again.";
  if (entries.flat().some(entry => [entry.title, entry.organization, entry.dates].some(value => value.length > LIMITS.field))) return "An entry has a title, organisation, or date longer than 300 characters. Shorten it in the editor, then try again.";
  if (entries.flat().some(entry => entry.description.length > LIMITS.description)) return "An entry description is longer than 3,000 characters. Shorten it in the editor, then try again.";
  if (cv.personal.headline.length > LIMITS.headline || cv.summary.length > LIMITS.summary || cv.skills.length > LIMITS.skills || cv.languages.length > LIMITS.languages) return "Your profile, skills, or languages are unusually long. Shorten them in the editor, then try again.";
  const hasMaterial = (visible(cv, "summary") && cv.summary.trim()) || (visible(cv, "skills") && cv.skills.trim())
    || (["experience", "projects"] as const).some(key => visible(cv, key) && filled(cv[key]).some(entry => entry.description.trim()));
  if (!hasMaterial) return "We couldn’t find a profile, skills, or job descriptions in this CV. Open it in the editor to check its sections, then try again.";
  return "";
}

/** The request body, and a map from the short ids sent to the entries' real ids. */
export function tailorRequest(cv: CV, job: string) {
  const ids = new Map<string, string>();
  const pack = (key: "experience" | "projects" | "education" | "certifications", prefix: string) => visible(cv, key) ? filled(cv[key]).map((entry, index) => {
    const base = { title: entry.title, organization: entry.organization, dates: entry.dates, description: entry.description };
    if (!prefix) return base;
    const id = `${prefix}${index + 1}`; ids.set(id, entry.id);
    return { id, ...base };
  }) : [];
  const body = {
    job: job.trim(),
    cv: {
      headline: cv.personal.headline,
      summary: visible(cv, "summary") ? cv.summary : "",
      skills: visible(cv, "skills") ? cv.skills : "",
      languages: visible(cv, "languages") ? cv.languages : "",
      experience: pack("experience", "e"),
      projects: pack("projects", "p"),
      education: pack("education", ""),
      certifications: pack("certifications", ""),
    },
  };
  return { body, ids };
}

const isText = (value: unknown): value is string => typeof value === "string";
const isList = (value: unknown, fields: string[]) => Array.isArray(value) && value.every(item => !!item && typeof item === "object" && fields.every(field => isText((item as Record<string, unknown>)[field])));

export function parseTailorResponse(data: unknown): TailorResponse | null {
  if (!data || typeof data !== "object") return null;
  const raw = data as Record<string, unknown>;
  if (!isText(raw.summary) || !isText(raw.skills) || !isList(raw.experience, ["id", "description"]) || !isList(raw.projects, ["id", "description"])) return null;
  return {
    summary: raw.summary, skills: raw.skills,
    experience: raw.experience as TailorResponse["experience"], projects: raw.projects as TailorResponse["projects"],
    changes: isList(raw.changes, ["section", "note"]) ? raw.changes as TailorResponse["changes"] : [],
    missing: isList(raw.missing, ["requirement", "advice"]) ? raw.missing as TailorResponse["missing"] : [],
    removedSkills: Array.isArray(raw.removedSkills) ? raw.removedSkills.filter(isText) : [],
    kept: isList(raw.kept, ["section", "reason"]) ? raw.kept as TailorResponse["kept"] : [],
  };
}

const entryLabel = (entry: Entry) => [entry.title, entry.organization].map(value => value.trim()).filter(Boolean).join(" · ") || "Untitled entry";

/** Applies the AI wording to a copy of the CV and describes the result. */
export function applyTailoring(before: CV, response: TailorResponse, ids: Map<string, string>, job: string): TailoredCV {
  const descriptions = new Map([...response.experience, ...response.projects].filter(item => ids.has(item.id)).map(item => [ids.get(item.id)!, item.description.trim()]));
  const rewrite = (entries: Entry[]) => entries.map(entry => descriptions.get(entry.id) ? { ...entry, description: descriptions.get(entry.id)! } : entry);
  const after: CV = {
    ...before,
    summary: visible(before, "summary") && response.summary.trim() ? response.summary.trim() : before.summary,
    skills: visible(before, "skills") && response.skills.trim() ? response.skills.trim() : before.skills,
    experience: rewrite(before.experience),
    projects: rewrite(before.projects),
  };
  const edits: TailorEdit[] = [];
  if (after.summary !== before.summary) edits.push({ label: "Profile", before: before.summary, after: after.summary });
  if (after.skills !== before.skills) edits.push({ label: "Skills", before: before.skills, after: after.skills });
  for (const key of ["experience", "projects"] as const) before[key].forEach((entry, index) => {
    if (after[key][index].description !== entry.description) edits.push({ label: entryLabel(entry), before: entry.description, after: after[key][index].description });
  });
  return {
    before, after, edits,
    changes: response.changes, missing: response.missing, removedSkills: response.removedSkills,
    kept: response.kept.map(item => item.reason),
    keywords: { before: compareKeywords(job, cvPlainText(before)).rate, after: compareKeywords(job, cvPlainText(after)).rate },
  };
}
