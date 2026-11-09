// Resume summaries and objectives from predefined sentence patterns and the visitor's own details.
// Sentences whose details are missing are left out, so nothing is invented.
import { formatList, splitSkills } from "./cover-letter";

const cap = (text: string) => text ? text[0].toUpperCase() + text.slice(1) : text;
/** Lowercase the first letter unless the word is an acronym ("SQL", "UX"). */
const lowerFirst = (text: string) => /^[A-Z][A-Z]/.test(text) ? text : text ? text[0].toLowerCase() + text.slice(1) : text;
const clean = (text: string) => text.trim().replace(/\s+/g, " ").replace(/[.!;,]+$/, "");
export function articleFor(phrase: string): string { return /^(?:[aeio]|u(?!ni|s[eu]))/i.test(phrase) && !/^one\b/i.test(phrase) ? "an" : "a"; }
function withArticle(phrase: string): string { return /^(?:a|an|the|my|your)\s/i.test(phrase) ? phrase : `${articleFor(phrase)} ${phrase}`; }
const sentences = (parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ").replace(/\s+/g, " ").replace(/\s+\./g, ".").trim();

export const summaryStages = [
  { id: "experienced", name: "Experienced", note: "You have relevant experience in this kind of role." },
  { id: "early", name: "Student or graduate", note: "Your evidence comes from study, projects, or part-time work." },
  { id: "change", name: "Changing careers", note: "You are moving into a new field." },
] as const;
export type SummaryStage = typeof summaryStages[number]["id"];
export interface SummaryInput { stage: SummaryStage; title: string; years: string; context: string; skills: string; achievement: string; strength: string; target: string }
export const emptySummary = (): SummaryInput => ({ stage: "experienced", title: "", years: "", context: "", skills: "", achievement: "", strength: "", target: "" });

/** Three summary drafts in different shapes: experience first, result first, and strengths first. */
export function buildSummaries(input: SummaryInput): { label: string; text: string }[] {
  const title = clean(input.title) || "[job title]"; const Title = cap(title);
  const n = Number.parseInt(input.years, 10); const yrs = Number.isFinite(n) && n > 0 ? `${n} year${n === 1 ? "" : "s"} of experience` : "";
  const context = clean(input.context); const skills = formatList(splitSkills(input.skills).slice(0, 3));
  const achievement = clean(input.achievement); const strength = lowerFirst(clean(input.strength)); const target = clean(input.target);
  const known = strength && `Known for being ${strength}.`;
  if (input.stage === "early") return [
    { label: "Experience first", text: sentences([`${Title} with practical experience${context ? ` from ${lowerFirst(context)}` : ""}.`, skills && `Developing strengths in ${skills}.`, achievement && `${cap(achievement)}.`, known, target && `Looking for ${withArticle(lowerFirst(target))} to build on these skills.`]) },
    { label: "Goal first", text: sentences([target ? `${Title} looking for ${withArticle(lowerFirst(target))}.` : `${Title}.`, context && `Experience includes ${lowerFirst(context)}.`, skills && `Comfortable with ${skills}${strength ? `, and known for being ${strength}` : ""}.`, achievement && `${cap(achievement)}.`]) },
    { label: "Skills first", text: sentences([skills ? `${Title} with skills in ${skills}.` : `${Title}.`, achievement && `Recently ${lowerFirst(achievement)}.`, context && `Gained experience through ${lowerFirst(context)}.`, known, target && `Ready to start ${withArticle(lowerFirst(target))}.`]) },
  ];
  if (input.stage === "change") {
    const field = target || "[new field]";
    return [
      { label: "Transition first", text: sentences([`${Title} moving into ${field}${yrs ? `, bringing ${yrs}` : ""}.`, skills && `Transferable strengths include ${skills}.`, achievement && `${cap(achievement)}.`, context && `Recent preparation includes ${lowerFirst(context)}.`, known]) },
      { label: "New field first", text: sentences([`${Title} building a career in ${field}.`, context && `Recent preparation includes ${lowerFirst(context)}.`, skills && `Brings transferable skills in ${skills}${strength ? `, and is known for being ${strength}` : ""}.`, achievement && `${cap(achievement)}.`]) },
      { label: "Background first", text: sentences([`Brings ${yrs ? `${yrs} as` : "experience as"} ${withArticle(lowerFirst(title))} to ${field}.`, skills && `Transferable skills include ${skills}.`, achievement && `${cap(achievement)}.`, known]) },
    ];
  }
  const inContext = context ? ` in ${lowerFirst(context)}` : "";
  return [
    { label: "Experience first", text: sentences([yrs ? `${Title} with ${yrs}${inContext}.` : `Experienced ${lowerFirst(title)}${inContext}.`, skills && `Skilled in ${skills}${strength ? `, and known for being ${strength}` : ""}.`, achievement && `${cap(achievement)}.`, target && `Now looking for ${lowerFirst(target)}.`]) },
    { label: "Result first", text: sentences([achievement ? `${Title}${inContext} who ${lowerFirst(achievement)}.` : `${Title}${inContext}.`, skills && `Strengths include ${skills}.`, yrs && `Brings ${yrs}.`, known, target && `Keen to bring this to ${lowerFirst(target)}.`]) },
    { label: "Strengths first", text: sentences([skills ? `${Title} specialising in ${skills}${yrs ? `, with ${yrs}` : ""}${inContext}.` : `${Title}${yrs ? ` with ${yrs}` : ""}${inContext}.`, known, achievement && `${cap(achievement)}.`, target && `Seeking ${lowerFirst(target)}.`]) },
  ];
}

export const objectiveStages = [
  { id: "student", name: "Student or internship", note: "An internship, placement, or part-time role while studying." },
  { id: "graduate", name: "Graduate or first job", note: "Your first full-time role after school or university." },
  { id: "change", name: "Career change", note: "A first role in a new field." },
  { id: "return", name: "Returning to work", note: "Coming back after a career break." },
] as const;
export type ObjectiveStage = typeof objectiveStages[number]["id"];
export interface ObjectiveInput { stage: ObjectiveStage; target: string; organisation: string; background: string; skills: string; goal: string; availability: string }
export const emptyObjective = (): ObjectiveInput => ({ stage: "student", target: "", organisation: "", background: "", skills: "", goal: "", availability: "" });

const skillSource: Record<ObjectiveStage, string> = { student: "developed through coursework and projects", graduate: "developed through study and work experience", change: "gained in a previous career", return: "from previous professional experience" };

/** Three objective drafts: background first, goal first, and skills first. */
export function buildObjectives(input: ObjectiveInput): { label: string; text: string }[] {
  const target = clean(input.target) || "[target role]"; const role = withArticle(lowerFirst(target));
  const organisation = clean(input.organisation); const at = organisation ? ` at ${organisation}` : "";
  const background = cap(clean(input.background)); const skills = formatList(splitSkills(input.skills).slice(0, 3));
  const goal = lowerFirst(clean(input.goal).replace(/^to\s+/i, "")); const availability = clean(input.availability);
  const fallback = { student: "Student", graduate: "Recent graduate", change: "Career changer", return: "Experienced professional returning to work" }[input.stage];
  const available = availability && `${cap(availability)}.`;
  return [
    { label: "Background first", text: sentences([`${background || fallback} seeking ${role}${at}.`, skills && `Offers ${skills}, ${skillSource[input.stage]}.`, goal && `Keen to ${goal}.`, available]) },
    { label: "Goal first", text: sentences([`To secure ${role}${at}${goal ? ` and ${goal}` : ""}.`, background && `${background}${skills ? ` with skills in ${skills}` : ""}.`, !background && skills && `Brings skills in ${skills}.`, available]) },
    { label: "Skills first", text: sentences([`${background || fallback} ready to bring ${skills || "[your key skills]"} to ${role}${at}.`, goal && `Particularly interested in the chance to ${goal}.`, available]) },
  ];
}
