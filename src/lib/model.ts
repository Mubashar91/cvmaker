export const templateStyles = ["Traditional", "Modern", "Creative", "Simple"] as const;
export type TemplateStyle = typeof templateStyles[number];

// Order is the display order in galleries. `color` is each layout's default accent.
// `photo`: the layout shows the optional profile photo (others ignore it).
export const templates = [
  { id: "classic", name: "Classic", note: "Centered serif · black & white", color: "#171717", style: "Traditional", columns: 1, photo: false },
  { id: "modern", name: "Modern", note: "Two columns · clean & balanced", color: "#2d5159", style: "Modern", columns: 2, photo: false },
  { id: "sidebar", name: "Sidebar", note: "Dark side panel · photo or initials", color: "#2c4a52", style: "Modern", columns: 2, photo: true },
  { id: "executive", name: "Executive", note: "Full-width header band · formal", color: "#1f3147", style: "Traditional", columns: 1, photo: true },
  { id: "atlas", name: "Atlas", note: "Light side panel on the right", color: "#94562f", style: "Modern", columns: 2, photo: true },
  { id: "timeline", name: "Timeline", note: "Hanging dates · vertical timeline", color: "#3b5bb5", style: "Modern", columns: 1, photo: false },
  { id: "duo", name: "Duo", note: "Two-tone split header", color: "#5a3e8c", style: "Modern", columns: 1, photo: true },
  { id: "professional", name: "Professional", note: "Formal serif · fine rules", color: "#253748", style: "Traditional", columns: 1, photo: false },
  { id: "swiss", name: "Swiss", note: "Bold grid · heavy rules", color: "#cf3a22", style: "Simple", columns: 1, photo: false },
  { id: "minimal", name: "Minimal", note: "Left labels · quiet typography", color: "#171717", style: "Simple", columns: 1, photo: false },
  { id: "tech", name: "Tech", note: "Skills as tags · crisp entries", color: "#0f6e8c", style: "Simple", columns: 1, photo: false },
  { id: "compact", name: "Compact", note: "Dense single column · fits more", color: "#2a5d48", style: "Simple", columns: 1, photo: false },
  { id: "elegant", name: "Elegant", note: "Monogram or photo · refined serif", color: "#86663a", style: "Traditional", columns: 1, photo: true },
  { id: "portrait", name: "Portrait", note: "Round photo header · dotted leaders", color: "#7b3f6e", style: "Creative", columns: 1, photo: true },
  { id: "creative", name: "Creative", note: "Editorial serif · warm accents", color: "#9c5e43", style: "Creative", columns: 1, photo: false },
  { id: "corner", name: "Corner", note: "Geometric colour corner · airy", color: "#b4561c", style: "Creative", columns: 1, photo: false },
  { id: "bold", name: "Bold", note: "Large name · solid section tabs", color: "#c0394f", style: "Creative", columns: 1, photo: false },
  { id: "student", name: "Student", note: "Academic · clear section bands", color: "#354e68", style: "Simple", columns: 1, photo: false },
  { id: "academic", name: "Academic", note: "Serif masthead · double rules", color: "#263c35", style: "Traditional", columns: 1, photo: false },
  { id: "monogram", name: "Monogram", note: "Initials tile · optional photo", color: "#375b52", style: "Modern", columns: 1, photo: true },
  { id: "horizon", name: "Horizon", note: "Soft header · crisp dividing lines", color: "#315c80", style: "Modern", columns: 1, photo: true },
  { id: "ribbon", name: "Ribbon", note: "Full-width ribbons · warm colour", color: "#963f54", style: "Creative", columns: 1, photo: false },
  { id: "outline", name: "Outline", note: "Framed header · outlined sections", color: "#343f50", style: "Simple", columns: 1, photo: false },
  { id: "editorial", name: "Editorial", note: "Oversized serif · chapter headings", color: "#8b4d36", style: "Creative", columns: 1, photo: false },
] as const satisfies readonly { id: string; name: string; note: string; color: string; style: TemplateStyle; columns: 1 | 2; photo: boolean }[];
export type Template = typeof templates[number]["id"];
export const newTemplates: readonly Template[] = ["academic", "monogram", "horizon", "ribbon", "outline", "editorial"];

// Print-safe accents. Every value keeps at least 4.5:1 contrast against white,
// so it works both as heading text and as a background behind white text.
export const accentColors = [
  { name: "Charcoal", value: "#1f2328" },
  { name: "Navy", value: "#1f3a5f" },
  { name: "Cobalt", value: "#2f54b3" },
  { name: "Teal", value: "#1d6b68" },
  { name: "Forest", value: "#2f5d3a" },
  { name: "Plum", value: "#5b3a70" },
  { name: "Burgundy", value: "#8a2a3b" },
  { name: "Raspberry", value: "#c0394f" },
  { name: "Terracotta", value: "#a4532f" },
  { name: "Bronze", value: "#86663a" },
] as const;

export const sectionLabels = { summary: "Profile", experience: "Work experience", education: "Education", skills: "Skills", projects: "Projects", certifications: "Certifications" };
export type Section = keyof typeof sectionLabels;
export type EntrySection = Exclude<Section, "summary" | "skills">;
export interface Entry { id: string; title: string; organization: string; dates: string; description: string }
export interface CV {
  version: 1; template: Template;
  /** Optional accent override (#rrggbb). When absent, the template's own colour is used. */
  accent?: string;
  /** Optional circular profile photo as a PNG/JPEG data URL, prepared on the device. */
  photo?: string;
  /** Body typography overrides; omitted values keep the template's defaults. */
  font?: "sans" | "serif";
  density?: "compact" | "relaxed";
  personal: { name: string; headline: string; email: string; phone: string; location: string; website: string };
  summary: string; skills: string;
  experience: Entry[]; education: Entry[]; projects: Entry[]; certifications: Entry[];
  sectionOrder: Section[]; hiddenSections: Section[];
}
export const DRAFT_KEY = "folio-draft-v1";
const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty", "Twenty-one", "Twenty-two", "Twenty-three", "Twenty-four"];
/** The template count as a word for headlines, e.g. "Twelve". */
export const templateCountWord = numberWords[templates.length] ?? String(templates.length);
export function templateById(id: Template) { return templates.find(t => t.id === id) ?? templates[0]; }
export function emptyEntry(): Entry { return { id: crypto.randomUUID(), title: "", organization: "", dates: "", description: "" }; }
export function emptyCV(): CV { return { version: 1, template: "classic", personal: { name: "", headline: "", email: "", phone: "", location: "", website: "" }, summary: "", skills: "", experience: [], education: [], projects: [], certifications: [], sectionOrder: Object.keys(sectionLabels) as Section[], hiddenSections: [] }; }
export function hasEntry(entry: Entry) { return [entry.title, entry.organization, entry.dates, entry.description].some(v => v.trim()); }
export function hasContent(cv: CV) { return Object.values(cv.personal).some(v => v.trim()) || Boolean(cv.summary.trim() || cv.skills.trim()) || [cv.experience, cv.education, cv.projects, cv.certifications].some(es => es.some(hasEntry)); }
export function sectionHasContent(cv: CV, key: Section) { return key === "summary" ? !!cv.summary.trim() : key === "skills" ? !!cv.skills.trim() : cv[key].some(hasEntry); }
export const MAX_PHOTO_LENGTH = 3_000_000;
export function isPhoto(value: unknown): value is string {
  return typeof value === "string" && value.length < MAX_PHOTO_LENGTH && /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/]+={0,2}$/.test(value);
}
export function isCV(value: unknown): value is CV {
  if (!value || typeof value !== "object") return false;
  const cv = value as CV;
  if (cv.font !== undefined && cv.font !== "sans" && cv.font !== "serif") return false;
  if (cv.density !== undefined && cv.density !== "compact" && cv.density !== "relaxed") return false;
  return cv.version === 1 && templates.some(t => t.id === cv.template) && (cv.accent === undefined || (typeof cv.accent === "string" && /^#[0-9a-f]{6}$/i.test(cv.accent))) && (cv.photo === undefined || isPhoto(cv.photo)) && !!cv.personal && ["name", "headline", "email", "phone", "location", "website"].every(k => typeof cv.personal[k as keyof CV["personal"]] === "string") && typeof cv.summary === "string" && typeof cv.skills === "string" && ["experience", "education", "projects", "certifications"].every(k => Array.isArray(cv[k as EntrySection]) && cv[k as EntrySection].every(e => e && ["id", "title", "organization", "dates", "description"].every(f => typeof e[f as keyof Entry] === "string"))) && Array.isArray(cv.sectionOrder) && cv.sectionOrder.length === 6 && new Set(cv.sectionOrder).size === 6 && cv.sectionOrder.every(k => k in sectionLabels) && Array.isArray(cv.hiddenSections) && cv.hiddenSections.every(k => k in sectionLabels);
}
export function move<T>(items: T[], index: number, direction: number): T[] { const next = [...items]; const target = index + direction; if (target < 0 || target >= next.length) return next; [next[index], next[target]] = [next[target], next[index]]; return next; }
