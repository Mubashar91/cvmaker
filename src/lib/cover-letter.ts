// Cover letters built from predefined paragraph templates and the visitor's own details.
// This is plain string formatting in the browser: there is no AI and no server.
// Missing details become [bracketed prompts] so nothing is invented on the visitor's behalf.

export const letterStyles = [
  { id: "experienced", name: "Experienced professional", note: "For a role that builds on your current experience." },
  { id: "graduate", name: "Student or graduate", note: "For internships, graduate schemes, and first jobs." },
  { id: "career-change", name: "Career change", note: "For moving into a new field with transferable skills." },
] as const;
export type LetterStyle = typeof letterStyles[number]["id"];

export const letterLayouts = [
  { id: "classic", name: "Classic", note: "Serif type, traditional business letter", accent: "#1f2328" },
  { id: "modern", name: "Modern", note: "Colour header band, clean sans-serif", accent: "#1f3a5f" },
  { id: "minimal", name: "Minimal", note: "Quiet sans-serif with a fine accent rule", accent: "#2e5a4c" },
] as const;
export type LetterLayout = typeof letterLayouts[number]["id"];

export const signOffs = ["Kind regards", "Yours sincerely", "Yours faithfully", "Sincerely", "Best regards"] as const;
export const LETTER_KEY = "folio-cover-letter-v1";

export interface CoverLetter {
  version: 1; style: LetterStyle; layout: LetterLayout; paper: "A4" | "LETTER"; signOff: string;
  name: string; email: string; phone: string; address: string; date: string;
  company: string; companyAddress: string; manager: string; jobTitle: string; jobDescription: string;
  experience: string; skills: string; additional: string;
  /** The visitor's own edits to the letter body. `null` means "write it from the details". */
  body: string | null;
}

const TEXT_FIELDS = ["signOff", "name", "email", "phone", "address", "date", "company", "companyAddress", "manager", "jobTitle", "jobDescription", "experience", "skills", "additional"] as const;

export function emptyLetter(): CoverLetter {
  return { version: 1, style: "experienced", layout: "classic", paper: "A4", signOff: "Kind regards", name: "", email: "", phone: "", address: "", date: "", company: "", companyAddress: "", manager: "", jobTitle: "", jobDescription: "", experience: "", skills: "", additional: "", body: null };
}

export function isLetter(value: unknown): value is CoverLetter {
  if (!value || typeof value !== "object") return false;
  const letter = value as CoverLetter;
  return letter.version === 1 && letterStyles.some(style => style.id === letter.style) && letterLayouts.some(layout => layout.id === letter.layout)
    && (letter.paper === "A4" || letter.paper === "LETTER") && TEXT_FIELDS.every(key => typeof letter[key] === "string" && letter[key].length < 20_000)
    && (letter.body === null || (typeof letter.body === "string" && letter.body.length < 20_000));
}

/** "a", "a and b", "a, b, and c". */
export function formatList(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}
export function splitSkills(text: string): string[] {
  return [...new Set(text.split(/[\n,;•·|]+/).map(item => item.replace(/^[^:]{1,24}:\s*/, "").trim()).filter(item => item.length > 1))];
}
/** Make free text into a sentence-like paragraph: trimmed, capitalised, with closing punctuation. */
function sentence(text: string): string {
  const value = text.trim().replace(/\s*\n+\s*/g, " ");
  if (!value) return "";
  const capital = value[0].toUpperCase() + value.slice(1);
  return /[.!?…)\]"”]$/.test(capital) ? capital : `${capital}.`;
}
function mentions(text: string, phrase: string): boolean {
  const escaped = phrase.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, "u").test(text.toLowerCase());
}

/** The visitor's skills that the job description also mentions, in the visitor's order. */
export function skillsInAdvert(letter: Pick<CoverLetter, "skills" | "jobDescription">): string[] {
  return letter.jobDescription.trim() ? splitSkills(letter.skills).filter(skill => mentions(letter.jobDescription, skill)) : [];
}

export function greeting(letter: Pick<CoverLetter, "manager">): string {
  return `Dear ${letter.manager.trim() || "Hiring Manager"},`;
}

/** The letter body written from the details, as paragraphs separated by blank lines. */
export function composeBody(letter: CoverLetter): string {
  const role = letter.jobTitle.trim() || "[job title]";
  const company = letter.company.trim() || "[company name]";
  const skills = splitSkills(letter.skills).slice(0, 5);
  const matched = skillsInAdvert(letter).slice(0, 4);
  const experience = sentence(letter.experience);
  const additional = sentence(letter.additional);
  const paragraphs: string[] = [];
  if (letter.style === "experienced") {
    paragraphs.push(`I am writing to apply for the ${role} position at ${company}. ${skills.length ? `With experience in ${formatList(skills.slice(0, 2))}, I am confident that I can make a valuable contribution to your team.` : "I would welcome the opportunity to bring my experience to your team."}`);
    paragraphs.push(experience || "[Describe your current or most recent role, what you are responsible for, and one result you are proud of.]");
    if (matched.length) paragraphs.push(`Your advert highlights ${formatList(matched)}. ${matched.length > 1 ? "These are areas" : "This is an area"} where I have hands-on experience, and I would bring the same care to the work at ${company}.`);
    else if (skills.length) paragraphs.push(`My key skills include ${formatList(skills)}. I would be glad to give examples of each at an interview.`);
  } else if (letter.style === "graduate") {
    paragraphs.push(`I am writing to apply for the ${role} position at ${company}. I am at the start of my career and keen to build on what I have learned through my studies, projects, and experience so far.`);
    paragraphs.push(experience || "[Describe your studies and a relevant project, placement, or part-time job, and what you learned or achieved.]");
    if (matched.length) paragraphs.push(`Your advert mentions ${formatList(matched)}, which I have developed through my studies and practical work.`);
    else if (skills.length) paragraphs.push(`Along the way, I have developed skills in ${formatList(skills)}.`);
  } else {
    paragraphs.push(`I am writing to apply for the ${role} position at ${company}. I am moving into this field after building experience elsewhere, and the skills I have developed transfer directly to this role.`);
    paragraphs.push(experience || "[Describe your current or previous career, and the transferable skills, training, or projects that prepare you for this role.]");
    if (matched.length) paragraphs.push(`Your advert highlights ${formatList(matched)}, and I have used ${matched.length > 1 ? "each of these" : "this"} in my previous work.`);
    else if (skills.length) paragraphs.push(`The skills I would bring include ${formatList(skills)}.`);
  }
  if (additional) paragraphs.push(additional);
  paragraphs.push(letter.style === "graduate"
    ? `Thank you for considering my application. I would welcome the opportunity to learn from your team and contribute to ${company}, and I look forward to hearing from you.`
    : letter.style === "career-change"
      ? `Thank you for considering my application. I would welcome the chance to discuss how my background could bring a fresh perspective to ${company}, and I look forward to hearing from you.`
      : `Thank you for considering my application. I would welcome the chance to discuss how my experience could support ${company}, and I look forward to hearing from you.`);
  return paragraphs.join("\n\n");
}

export function letterBody(letter: CoverLetter): string { return letter.body ?? composeBody(letter); }
export function bodyParagraphs(letter: CoverLetter): string[] { return letterBody(letter).split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean); }
export function contactLine(letter: CoverLetter): string[] { return [letter.email, letter.phone, letter.address].map(value => value.trim()).filter(Boolean); }
export function recipientLines(letter: CoverLetter): string[] {
  return [letter.manager, letter.company, ...letter.companyAddress.split("\n")].map(value => value.trim()).filter(Boolean);
}
/** True while the letter still contains a [bracketed prompt] to replace. */
export function hasPrompts(letter: CoverLetter): boolean { return /\[[^\]]{3,}\]/.test(letterBody(letter)); }

/** The whole letter as plain text, for copying into an application form or email. */
export function letterText(letter: CoverLetter): string {
  const name = letter.name.trim() || "[Your name]";
  return [
    [name, contactLine(letter).join(" | ")].filter(Boolean).join("\n"),
    letter.date.trim(),
    recipientLines(letter).join("\n"),
    greeting(letter),
    ...bodyParagraphs(letter),
    `${letter.signOff.trim() || "Kind regards"},\n${name}`,
  ].filter(Boolean).join("\n\n");
}

/** A short, safe file name such as "Amara Lewis cover letter.pdf". */
export function letterFileName(letter: CoverLetter, extension: string): string {
  const name = letter.name.trim().replace(/[^\p{L}\p{N} _-]/gu, "").slice(0, 80);
  return `${name || "My"} cover letter.${extension}`;
}

/** Fictional demonstration letter used for layout previews only. */
export function sampleLetter(layout: LetterLayout = "classic"): CoverLetter {
  return { ...emptyLetter(), layout, style: "graduate", name: "Amara Lewis", email: "amara.lewis@example.com", phone: "+44 7700 900150", address: "Bristol, United Kingdom", date: "9 November 2026",
    company: "Harbour Insights", companyAddress: "12 Quay Street\nBristol", manager: "Ms Okoro", jobTitle: "Junior Data Analyst",
    jobDescription: "We are looking for a junior data analyst with SQL, Power BI, and stakeholder reporting experience.",
    experience: "During a summer internship at Lakeside Retail Group, I cleaned and combined weekly sales data from twelve stores and built a dashboard that the regional manager now uses in her Monday meetings. My final-year economics project analysed five years of local transport data in Python.",
    skills: "SQL, Power BI, Python, stakeholder reporting", additional: "I am available to start in July." };
}
