import { emptyCV, type CV, type Entry, type Section, type Template } from "./model";

// Fictional worked-example CVs shown in full on guide-style pages. Every person, employer, and
// school is invented. UK phone numbers use Ofcom's drama range, and emails use example.com.
export type EntryData = Omit<Entry, "id">;
export const entry = (title: string, organization: string, dates: string, lines: string[] = []): EntryData => ({ title, organization, dates, description: lines.join("\n") });

export interface SampleCVData {
  /** Stable id prefix, so server and client render identical entry ids. */
  id: string;
  template: Template;
  person: { name: string; headline: string; location: string; phone: string; email: string; website?: string };
  summary: string; skills: string; languages?: string;
  additional?: { title: string; text: string };
  sectionOrder?: Section[];
  experience?: EntryData[]; education?: EntryData[]; projects?: EntryData[]; certifications?: EntryData[];
  font?: CV["font"];
}

/** The sample as an editable CV for the editor ("Edit this example"). */
export function sampleCV(data: SampleCVData): CV {
  const cv = emptyCV();
  cv.template = data.template;
  if (data.font) cv.font = data.font;
  cv.personal = { ...cv.personal, website: "", ...data.person };
  cv.summary = data.summary; cv.skills = data.skills; cv.languages = data.languages ?? "";
  if (data.additional) { cv.additional = data.additional.text; cv.additionalTitle = data.additional.title; }
  if (data.sectionOrder) cv.sectionOrder = [...data.sectionOrder];
  const withIds = (section: string, entries: EntryData[] = []) => entries.map((item, index) => ({ id: `${data.id}-${section}-${index + 1}`, ...item }));
  cv.experience = withIds("experience", data.experience); cv.education = withIds("education", data.education);
  cv.projects = withIds("projects", data.projects); cv.certifications = withIds("certifications", data.certifications);
  return cv;
}
