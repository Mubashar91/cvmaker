import { hasEntry, sectionHasContent, sectionLabels, type CV, type EntrySection, type Section } from "./model";

export type ReviewSection = "personal" | Section;
export interface CVCheck { id: string; title: string; detail: string; passed: boolean; section: ReviewSection }
const entrySections: EntrySection[] = ["experience", "education", "projects", "certifications"];

/** The visible content only, in the user's section order. Useful for application text fields. */
export function cvPlainText(cv: CV): string {
  const contact = [cv.personal.email, cv.personal.phone, cv.personal.location, cv.personal.website].filter(value => value.trim());
  const blocks = [[cv.personal.name, cv.personal.headline, contact.join(" | ")].filter(value => value.trim()).join("\n")];
  for (const key of cv.sectionOrder) {
    if (cv.hiddenSections.includes(key) || !sectionHasContent(cv, key)) continue;
    const body = key === "summary" ? cv.summary.trim() : key === "skills" ? cv.skills.trim() : cv[key].filter(hasEntry).map(entry => [
      [entry.title, entry.organization, entry.dates].filter(value => value.trim()).join(" | "),
      entry.description.trim(),
    ].filter(Boolean).join("\n")).join("\n\n");
    blocks.push(`${sectionLabels[key].toUpperCase()}\n${body}`);
  }
  return blocks.filter(Boolean).join("\n\n");
}

export function reviewCV(cv: CV): CVCheck[] {
  const shown = entrySections.filter(key => !cv.hiddenSections.includes(key));
  const entries = shown.flatMap(key => cv[key].filter(hasEntry).map(entry => ({ key, entry })));
  const incomplete = entries.find(({ entry }) => !entry.title.trim() || !entry.organization.trim());
  const undated = entries.find(({ key, entry }) => (key === "experience" || key === "education") && !entry.dates.trim());
  const unexplained = entries.find(({ key, entry }) => (key === "experience" || key === "projects") && !entry.description.trim());
  const hasEvidence = (["experience", "education", "projects"] as const).some(key => !cv.hiddenSections.includes(key) && sectionHasContent(cv, key));
  const email = cv.personal.email.trim();
  const contactOK = email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : !!(cv.personal.phone.trim() || cv.personal.website.trim());
  const summaryWords = cv.summary.trim().split(/\s+/).filter(Boolean).length;
  const longSummary = !cv.hiddenSections.includes("summary") && summaryWords > 100;
  const placeholder = /\b(lorem ipsum|your name|your company|insert (?:text|name)|replace this)\b/i.test(cvPlainText(cv));
  return [
    { id: "name", title: "Your name", passed: !!cv.personal.name.trim(), detail: cv.personal.name.trim() ? "Your name is included in the introduction." : "Add the name you want employers to use.", section: "personal" },
    { id: "contact", title: "A way to reach you", passed: contactOK, detail: contactOK ? "Contact details are present. Double-check they are correct." : email ? "The email address looks incomplete. Check its spelling and domain." : "Add an email address, phone number, or professional profile.", section: "personal" },
    { id: "evidence", title: "Experience or learning", passed: hasEvidence, detail: hasEvidence ? "Your visible CV includes experience, education, or a project." : "Add relevant education, experience, or a project. Volunteer work counts too.", section: "education" },
    { id: "entries", title: "Identifiable entries", passed: !incomplete, detail: incomplete ? `Check “${incomplete.entry.title || incomplete.entry.organization || "Untitled entry"}”: add its title and organisation, institution, or project link where applicable.` : "Every visible entry has a title and an organisation or link.", section: incomplete?.key ?? "experience" },
    { id: "dates", title: "Dates for roles and education", passed: !undated, detail: undated ? `Add dates to “${undated.entry.title || undated.entry.organization}” so the timeline is clear.` : "Your visible work and education entries include dates.", section: undated?.key ?? "experience" },
    { id: "descriptions", title: "Context for your contributions", passed: !unexplained, detail: unexplained ? `Describe what you did in “${unexplained.entry.title || unexplained.entry.organization}” and give a specific outcome when you can.` : "Your visible roles and projects include a description.", section: unexplained?.key ?? "experience" },
    { id: "profile", title: "A focused introduction", passed: !longSummary, detail: longSummary ? `Your profile is ${summaryWords} words. Consider a shorter introduction that leaves the detail to your experience.` : "Your profile is concise or left out. A profile is optional.", section: "summary" },
    { id: "placeholders", title: "Your own words", passed: !placeholder, detail: placeholder ? "Some text looks like a placeholder. Search your entries and replace anything left from a draft." : "No common placeholder phrases were found. Proofread names and claims yourself.", section: "summary" },
  ];
}
