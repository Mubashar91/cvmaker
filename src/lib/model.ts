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
  { id: "summit", name: "Summit", note: "Colour header · tinted side column", color: "#24476b", style: "Modern", columns: 2, photo: true },
  { id: "compass", name: "Compass", note: "Section icons · icon contact row", color: "#1e5f8c", style: "Modern", columns: 1, photo: true },
  { id: "halo", name: "Halo", note: "Centred photo over a colour band", color: "#9a3b5c", style: "Modern", columns: 1, photo: true },
  { id: "clarity", name: "Clarity", note: "Plain structure · application-system safe", color: "#1f2328", style: "Simple", columns: 1, photo: false },
  { id: "prism", name: "Prism", note: "Angled colour header · faceted edge", color: "#3d3a8c", style: "Creative", columns: 1, photo: false },
  { id: "gazette", name: "Gazette", note: "Newspaper masthead · ruled columns", color: "#8f2d2a", style: "Creative", columns: 2, photo: false },
  { id: "heritage", name: "Heritage", note: "Framed page · engraved serif", color: "#6a4b2f", style: "Traditional", columns: 1, photo: false },
  { id: "ledger", name: "Ledger", note: "Labels beside a fine vertical rule", color: "#2c3e63", style: "Traditional", columns: 1, photo: false },
  { id: "mosaic", name: "Mosaic", note: "Tinted tiles for the essentials", color: "#6b4c9a", style: "Modern", columns: 1, photo: false },
  { id: "tide", name: "Tide", note: "Wave header · optional photo", color: "#0f6a73", style: "Creative", columns: 1, photo: true },
  { id: "edge", name: "Edge", note: "Edge stripe · connected headings", color: "#b8432a", style: "Modern", columns: 1, photo: false },
  { id: "signature", name: "Signature", note: "Italic serif name · calm sans body", color: "#2e5a4c", style: "Traditional", columns: 1, photo: false },
  { id: "linear", name: "Linear", note: "Plain text hierarchy · no decoration", color: "#202b36", style: "Simple", columns: 1, photo: false },
  { id: "aurora", name: "Aurora", note: "Layered colour arcs · optional photo", color: "#40518a", style: "Modern", columns: 1, photo: true },
  { id: "atelier", name: "Atelier", note: "Editorial masthead · numbered chapters", color: "#8b4534", style: "Creative", columns: 1, photo: false },
  { id: "regent", name: "Regent", note: "Serif nameplate · framed contact line", color: "#263c54", style: "Traditional", columns: 1, photo: false },
] as const satisfies readonly { id: string; name: string; note: string; color: string; style: TemplateStyle; columns: 1 | 2; photo: boolean }[];
export type Template = typeof templates[number]["id"];
export const newTemplates: readonly Template[] = ["linear", "aurora", "atelier", "regent", "summit", "compass", "halo", "clarity", "prism", "gazette", "heritage", "ledger", "mosaic", "tide", "edge", "signature"];

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

// Order is the default section order for a new CV.
export const sectionLabels = { summary: "Profile", experience: "Work experience", education: "Education", skills: "Skills", languages: "Languages", projects: "Projects", certifications: "Certifications", additional: "Additional information" };
export type Section = keyof typeof sectionLabels;
/** Sections written as free text (one line or group per line) rather than as entries. */
export type TextSection = "summary" | "skills" | "languages" | "additional";
export const textSections: readonly TextSection[] = ["summary", "skills", "languages", "additional"];
export type EntrySection = Exclude<Section, TextSection>;
export const entrySections: readonly EntrySection[] = ["experience", "education", "projects", "certifications"];
export function isTextSection(key: Section): key is TextSection { return (textSections as readonly Section[]).includes(key); }
/** Visible heading for a section. "Additional information" can be renamed, e.g. to Interests or Referees. */
export function sectionTitle(cv: Pick<CV, "additionalTitle">, key: Section): string {
  return key === "additional" ? cv.additionalTitle?.trim() || sectionLabels.additional : sectionLabels[key];
}
export const MAX_SECTION_TITLE = 40;
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
  /** One language per line, e.g. "French — professional working proficiency". */
  languages: string;
  /** Free-form extra section (interests, awards, volunteering, referees…). */
  additional: string;
  /** Optional custom heading for `additional`. */
  additionalTitle?: string;
  experience: Entry[]; education: Entry[]; projects: Entry[]; certifications: Entry[];
  sectionOrder: Section[]; hiddenSections: Section[];
}
const units = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
function numberWord(n: number): string {
  if (n < 20) return units[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? `-${units[n % 10].toLowerCase()}` : "");
  return String(n);
}
/** The template count as a word for headlines, e.g. "Thirty-six". */
export const templateCountWord = numberWord(templates.length);

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return .2126 * r + .7152 * g + .0722 * b;
}
/** Contrast ratio of a #rrggbb colour against white paper. */
export function contrastOnWhite(hex: string): number { return 1.05 / (luminance(hex) + .05); }
/**
 * Darken a custom accent just enough to keep 4.5:1 against white, so it still works as
 * small heading text and as a background behind white text. Returns lowercase #rrggbb.
 */
export function readableAccent(hex: string): string {
  let value = hex.toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(value)) return "#1f2328";
  const base = [1, 3, 5].map(i => parseInt(value.slice(i, i + 2), 16));
  for (let step = 1; contrastOnWhite(value) < 4.5 && step <= 20; step++) {
    value = "#" + base.map(channel => Math.round(channel * (1 - step * .05)).toString(16).padStart(2, "0")).join("");
  }
  return value;
}
export function templateById(id: Template) { return templates.find(t => t.id === id) ?? templates[0]; }
export function emptyEntry(): Entry { return { id: crypto.randomUUID(), title: "", organization: "", dates: "", description: "" }; }
const SECTION_KEYS = Object.keys(sectionLabels) as Section[];
export function emptyCV(): CV { return { version: 1, template: "classic", personal: { name: "", headline: "", email: "", phone: "", location: "", website: "" }, summary: "", skills: "", languages: "", additional: "", experience: [], education: [], projects: [], certifications: [], sectionOrder: [...SECTION_KEYS], hiddenSections: [] }; }
export function hasEntry(entry: Entry) { return [entry.title, entry.organization, entry.dates, entry.description].some(v => v.trim()); }
export function hasContent(cv: CV) { return Object.values(cv.personal).some(v => v.trim()) || textSections.some(key => !!cv[key].trim()) || entrySections.some(key => cv[key].some(hasEntry)); }
export function sectionHasContent(cv: CV, key: Section) { return isTextSection(key) ? !!cv[key].trim() : cv[key].some(hasEntry); }
export const MAX_PHOTO_LENGTH = 3_000_000;
export function isPhoto(value: unknown): value is string {
  return typeof value === "string" && value.length < MAX_PHOTO_LENGTH && /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/]+={0,2}$/.test(value);
}
export function isCV(value: unknown): value is CV {
  if (!value || typeof value !== "object") return false;
  const cv = value as CV;
  if (cv.font !== undefined && cv.font !== "sans" && cv.font !== "serif") return false;
  if (cv.density !== undefined && cv.density !== "compact" && cv.density !== "relaxed") return false;
  if (cv.additionalTitle !== undefined && (typeof cv.additionalTitle !== "string" || cv.additionalTitle.length > MAX_SECTION_TITLE)) return false;
  return cv.version === 1 && templates.some(t => t.id === cv.template) && (cv.accent === undefined || (typeof cv.accent === "string" && /^#[0-9a-f]{6}$/i.test(cv.accent))) && (cv.photo === undefined || isPhoto(cv.photo)) && !!cv.personal && ["name", "headline", "email", "phone", "location", "website"].every(k => typeof cv.personal[k as keyof CV["personal"]] === "string") && textSections.every(k => typeof cv[k] === "string") && entrySections.every(k => Array.isArray(cv[k]) && cv[k].every(e => e && ["id", "title", "organization", "dates", "description"].every(f => typeof e[f as keyof Entry] === "string"))) && Array.isArray(cv.sectionOrder) && cv.sectionOrder.length === SECTION_KEYS.length && new Set(cv.sectionOrder).size === SECTION_KEYS.length && cv.sectionOrder.every(k => k in sectionLabels) && Array.isArray(cv.hiddenSections) && cv.hiddenSections.every(k => k in sectionLabels);
}
/**
 * Drafts saved before the Languages and Additional information sections existed have six
 * sections. They gain both, empty: Languages after Skills, Additional information last.
 * Anything else is returned unchanged for `isCV` to judge.
 */
export function upgradeCV(value: unknown): unknown {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  const draft = value as Record<string, unknown>;
  if (!Array.isArray(draft.sectionOrder) || draft.sectionOrder.length !== 6) return value;
  const order: unknown[] = [...draft.sectionOrder];
  if (!order.includes("languages")) { const skills = order.indexOf("skills"); order.splice(skills >= 0 ? skills + 1 : order.length, 0, "languages"); }
  if (!order.includes("additional")) order.push("additional");
  return { ...draft, languages: draft.languages ?? "", additional: draft.additional ?? "", sectionOrder: order };
}
/** A validated CV from stored or uploaded JSON, upgrading older drafts; otherwise null. */
export function parseCV(value: unknown): CV | null { const cv = upgradeCV(value); return isCV(cv) ? cv : null; }
export function move<T>(items: T[], index: number, direction: number): T[] { const next = [...items]; const target = index + direction; if (target < 0 || target >= next.length) return next; [next[index], next[target]] = [next[target], next[index]]; return next; }
/** Moves one item to a new position, shifting the items in between. */
export function moveTo<T>(items: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || from >= items.length || to < 0 || to >= items.length) return items;
  const next = [...items]; const [item] = next.splice(from, 1); next.splice(to, 0, item); return next;
}
