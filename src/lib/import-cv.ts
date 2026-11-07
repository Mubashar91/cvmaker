import { emptyCV, emptyEntry, type CV, type Entry, type EntrySection, type Section } from "./model";

const headings: Record<string, Section> = {
  summary: "summary", profile: "summary", "personal profile": "summary", "professional profile": "summary", "professional summary": "summary", "career objective": "summary", objective: "summary", "about me": "summary",
  experience: "experience", "work experience": "experience", "professional experience": "experience", "employment history": "experience", employment: "experience", "career history": "experience",
  education: "education", "academic background": "education", qualifications: "education",
  skills: "skills", "technical skills": "skills", "key skills": "skills", competencies: "skills", "core competencies": "skills",
  projects: "projects", "selected projects": "projects", "personal projects": "projects",
  certifications: "certifications", certificates: "certifications", "certifications and licenses": "certifications", "licenses and certifications": "certifications",
};
const clean = (s: string) => s.replace(/^[\s•●▪·]+/, "").trim();
function heading(line: string) { return headings[line.toLowerCase().replace(/[：:]$/, "").replace(/&/g, "and").trim()]; }
const datePattern = /(?:\b(?:19|20)\d{2}\b|\bpresent\b|\bcurrent\b)/i;
function parseEntryBlock(lines: string[]): Entry {
  const entry = emptyEntry();
  const first = clean(lines[0] || "");
  const parts = first.split(/\s*[|]\s*/);
  if (parts.length > 1) {
    entry.title = parts[0];
    const others = parts.slice(1);
    entry.dates = others.filter(p => datePattern.test(p)).join(" | ");
    entry.organization = others.filter(p => !datePattern.test(p)).join(" | ");
    entry.description = lines.slice(1).map(clean).join("\n");
  } else {
    entry.title = first;
    // Only assign a complete date line. Ambiguous text stays editable in the description.
    entry.dates = lines.slice(1).find(l => /^(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+)?(?:19|20)\d{2}\s*[-–—]\s*(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+)?(?:(?:19|20)\d{2}|present|current)$/i.test(l.trim()))?.trim() || "";
    entry.description = lines.slice(1).filter(l => l.trim() !== entry.dates).map(clean).join("\n");
  }
  return entry;
}
function entries(lines: string[]) {
  const blocks: string[][] = []; let block: string[] = [];
  for (const line of lines) {
    if (!line.trim()) { if (block.length) { blocks.push(block); block = []; } continue; }
    if (block.length && line.includes("|") && !/^[•●▪-]/.test(line.trim())) { blocks.push(block); block = []; }
    block.push(line);
  }
  if (block.length) blocks.push(block);
  return blocks.filter(b => b.some(l => l.trim())).map(parseEntryBlock);
}
export function parseCVText(text: string): { cv: CV; notes: string[] } {
  const cv = emptyCV(); const notes: string[] = [];
  const sections: Partial<Record<Section, string[]>> = {}; const header: string[] = []; const unassigned: string[] = [];
  let current: Section | undefined;
  for (const line of text.replace(/\r\n?/g, "\n").split("\n")) {
    const matched = heading(line.trim());
    if (matched) { current = matched; sections[current] ??= []; }
    else if (current) sections[current]!.push(line);
    else header.push(line);
  }
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
  cv.personal.email = email;
  const phoneCandidates = header.join("\n").match(/\+?[\d(][\d(). -]{6,}\d/g) || [];
  cv.personal.phone = phoneCandidates.find(p => { const digits = p.replace(/\D/g, ""); return digits.length >= 7 && digits.length <= 15 && !/^\d{4}\s*[-–]\s*\d{4}$/.test(p); })?.trim() || "";
  cv.personal.website = header.join("\n").match(/(?:https?:\/\/|www\.|linkedin\.com\/|github\.com\/)[^\s|,]+/i)?.[0] || "";
  const headerLines = header.map(l => l.trim()).filter(Boolean);
  const nameLine = headerLines.find(l => !/@|\d|https?:|www\.|linkedin\.com|github\.com|curriculum vitae|^resume$|^cv$|\|/i.test(l) && l.length < 90 && l.split(/\s+/).length <= 8);
  cv.personal.name = nameLine?.replace(/^name\s*:\s*/i, "") || "";
  for (const l of headerLines) {
    if (/^location\s*:/i.test(l)) cv.personal.location = l.replace(/^location\s*:\s*/i, "");
    else if (/^(?:headline|job title|title)\s*:/i.test(l)) cv.personal.headline = l.replace(/^(?:headline|job title|title)\s*:\s*/i, "");
    else if (l !== nameLine && !l.includes(email || "\0") && !(cv.personal.phone && l.includes(cv.personal.phone)) && !(cv.personal.website && l.includes(cv.personal.website)) && !/^(curriculum vitae|resume|cv)$/i.test(l)) unassigned.push(l);
  }
  cv.summary = (sections.summary || []).join("\n").trim();
  cv.skills = (sections.skills || []).map(clean).filter(Boolean).join("\n");
  for (const key of ["experience", "education", "projects", "certifications"] as EntrySection[]) cv[key] = entries(sections[key] || []);
  if (unassigned.length) notes.push("Some header text could not be confidently assigned. Check the extracted text below and copy any missing details into the form.");
  if (!Object.keys(sections).length) notes.push("Section headings were not recognized. Your extracted text is available below; use it to fill in the form.");
  notes.push("Extraction is a starting point. Review every field, especially dates and entry boundaries. Missing details have been left blank.");
  return { cv, notes };
}

export async function importCV(file: File): Promise<{ cv: CV; text: string; notes: string[] }> {
  if (file.size > 15 * 1024 * 1024) throw new Error("This file is larger than 15 MB. Please choose a smaller PDF or DOCX, or enter your details manually.");
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext !== "pdf" && ext !== "docx") throw new Error("Please choose a PDF or DOCX file. Older .doc files are not supported. You can also enter your details manually.");
  let text = "";
  try {
    const buffer = await file.arrayBuffer();
    if (ext === "docx") {
      const mammoth = await import("mammoth/mammoth.browser");
      // Mammoth separates every Word paragraph with two newlines. Normalize those
      // while retaining genuinely empty paragraphs as entry boundaries.
      text = (await mammoth.extractRawText({ arrayBuffer: buffer })).value.replace(/\n\n/g, "\n");
    } else {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const pdf = await pdfjs.getDocument({ data: buffer }).promise;
      try {
        if (pdf.numPages > 40) throw new Error("TOO_MANY_PAGES");
        const pages: string[] = [];
        for (let n = 1; n <= pdf.numPages; n++) {
          const page = await pdf.getPage(n); const content = await page.getTextContent();
          const rows = new Map<number, { x: number; text: string }[]>();
          for (const item of content.items) {
            if (!("str" in item)) continue;
            const y = Math.round(item.transform[5] / 3) * 3;
            const row = rows.get(y) || []; row.push({ x: item.transform[4], text: item.str }); rows.set(y, row);
          }
          let lastY: number | undefined;
          const lines: string[] = [];
          for (const [y, row] of [...rows].sort(([a], [b]) => b - a)) {
            if (lastY !== undefined && lastY - y > 23) lines.push("");
            lines.push(row.sort((a, b) => a.x - b.x).map(i => i.text).join(" ").trim()); lastY = y;
          }
          pages.push(lines.join("\n"));
        }
        text = pages.join("\n\n");
      } finally { await pdf.destroy(); }
    }
  } catch (error) {
    if (error instanceof Error && error.message === "TOO_MANY_PAGES") throw new Error("Please upload a CV with 40 pages or fewer, or enter your details manually.");
    if (error instanceof Error && /password/i.test(error.message)) throw new Error("This PDF is password protected. Save an unlocked copy and try again, or enter your details manually.");
    throw new Error("We couldn’t read this file. It may be damaged, encrypted, or not a valid PDF or DOCX. Try another copy, or enter your details manually.");
  }
  if (text.replace(/\s/g, "").length < 35) throw new Error("We couldn’t find enough readable text. This may be a scanned or image-only document. Try a text-based PDF or DOCX, or enter your details manually. Nothing has been guessed.");
  return { ...parseCVText(text), text };
}
