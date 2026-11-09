import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { parseCVText } from "../src/lib/import-cv";
import { emptyCV, isCV, parseCV, sectionTitle } from "../src/lib/model";
import { compareKeywords } from "../src/lib/keyword-match";
import { buildObjectives, buildSummaries, emptySummary } from "../src/lib/statements";
import { composeBody, emptyLetter, hasPrompts, letterText } from "../src/lib/cover-letter";
import { addSkill, hasSkill, professions } from "../src/lib/skills-library";
import { cvPlainText } from "../src/lib/cv-review";
import { tips } from "../src/lib/tips";
import { plainText } from "../src/lib/rich-text";

async function pdfText(filePath: string) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await readFile(filePath)), useSystemFonts: true }).promise;
  try {
    const pages: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) pages.push((await (await pdf.getPage(i)).getTextContent()).items.map(item => "str" in item ? item.str : "").join(" "));
    return { text: pages.join("\n"), pages: pdf.numPages };
  } finally { await pdf.destroy(); }
}

// ---------- Data and text logic (no browser needed) ----------

test("drafts saved before Languages and Additional information still open", () => {
  const legacy = { ...emptyCV(), sectionOrder: ["education", "experience", "skills", "projects", "certifications", "summary"], skills: "SQL" } as Record<string, unknown>;
  delete legacy.languages; delete legacy.additional;
  expect(isCV(legacy)).toBe(false);
  const upgraded = parseCV(JSON.parse(JSON.stringify(legacy)))!;
  expect(upgraded).not.toBeNull();
  expect(upgraded.sectionOrder).toEqual(["education", "experience", "skills", "languages", "projects", "certifications", "summary", "additional"]);
  expect(upgraded.languages).toBe(""); expect(upgraded.additional).toBe(""); expect(upgraded.skills).toBe("SQL");
  expect(parseCV({ ...legacy, sectionOrder: ["summary", "summary", "summary", "summary", "summary", "summary"] })).toBeNull();
  expect(parseCV({ ...emptyCV(), additionalTitle: "x".repeat(200) })).toBeNull();
});

test("imported languages and extra sections are kept with their own headings", () => {
  const { cv } = parseCVText("Sam Rivera\nSkills\nExcel\nLanguages\nFrench: Fluent\nGerman: Basic\nReferees\nAvailable on request");
  expect(cv.languages).toBe("French: Fluent\nGerman: Basic");
  expect(cv.additionalTitle).toBe("Referees"); expect(cv.additional).toBe("Available on request");
  expect(sectionTitle(cv, "additional")).toBe("Referees");
  const mixed = parseCVText("Sam Rivera\nInterests\nChess\nAwards\nDean’s list").cv;
  expect(mixed.additionalTitle).toBeUndefined();
  expect(mixed.additional).toBe("Interests: Chess\nAwards: Dean’s list");
  expect(cvPlainText({ ...mixed, personal: { ...mixed.personal, name: "Sam" } })).toContain("ADDITIONAL INFORMATION\nInterests: Chess");
});

test("keyword comparison finds phrases, tools, and missing terms without stop words", () => {
  const job = "We need a data analyst with SQL and Power BI. You will build dashboards, present findings to stakeholders, and own stakeholder management. Experience with Python is a plus. SQL is essential.";
  const result = compareKeywords(job, "Analyst building dashboards in SQL and Excel.");
  const terms = result.keywords.map(item => item.term);
  expect(terms.map(term => term.toLowerCase())).toEqual(expect.arrayContaining(["sql", "power bi", "python", "stakeholder management"]));
  expect(terms).not.toEqual(expect.arrayContaining(["experience", "will", "team"]));
  expect(result.matched.map(item => item.term)).toContain("SQL");
  expect(result.missing.map(item => item.term)).toContain("Power BI");
  expect(result.rate).toBeGreaterThan(0); expect(result.rate).toBeLessThan(100);
  expect(compareKeywords("", "anything").keywords).toEqual([]);
});

test("summary, objective, and letter templates only use details that were given", () => {
  const empty = buildSummaries(emptySummary());
  for (const draft of empty) expect(draft.text).toMatch(/\[job title\]/);
  const filled = buildSummaries({ ...emptySummary(), title: "Nurse", years: "1", skills: "triage, wound care", target: "a senior role" });
  expect(filled[0].text).toBe("Nurse with 1 year of experience. Skilled in triage and wound care. Now looking for a senior role.");
  for (const draft of [...filled, ...buildObjectives({ stage: "graduate", target: "graduate scheme", organisation: "", background: "History graduate", skills: "research", goal: "", availability: "" })]) expect(draft.text).not.toMatch(/\[|undefined|\s\./);
  const letter = { ...emptyLetter(), name: "Ada Lee", jobTitle: "Data Analyst", company: "Harbour", skills: "SQL, Excel, Power BI", jobDescription: "Must know SQL and Power BI.", experience: "two years of reporting" };
  const body = composeBody(letter);
  expect(body).toContain("Data Analyst position at Harbour");
  expect(body).toContain("Your advert highlights SQL and Power BI.");
  expect(body).toContain("Two years of reporting.");
  expect(hasPrompts(letter)).toBe(false);
  expect(hasPrompts(emptyLetter())).toBe(true);
  expect(letterText(letter)).toMatch(/^Ada Lee[\s\S]*Dear Hiring Manager,[\s\S]*Kind regards,\nAda Lee$/);
});

test("skill helpers group skills by line and never duplicate them", () => {
  expect(professions).toHaveLength(22);
  let skills = addSkill("", "Skills", "SQL");
  skills = addSkill(skills, "Tools", "Excel"); skills = addSkill(skills, "Skills", "Python"); skills = addSkill(skills, "Skills", "sql");
  expect(skills).toBe("Skills: SQL, Python\nTools: Excel");
  expect(hasSkill("Tools: Microsoft Excel", "Excel")).toBe(true);
  expect(hasSkill("Excellent writing", "Excel")).toBe(false);
});

test("every guide has unique sections and readable text without link markup", () => {
  for (const tip of tips) {
    expect(new Set(tip.sections.map(section => section.id)).size).toBe(tip.sections.length);
    expect(plainText(tip.intro)).not.toMatch(/\]\(/);
    expect(tip.words).toBeGreaterThan(400);
  }
});

// ---------- In the browser ----------

test("cover letter maker writes, edits, and downloads a letter", async ({ page }) => {
  await page.goto("/cover-letter-maker/");
  await page.getByLabel("Full name", { exact: true }).fill("Jordan Letter");
  await page.getByLabel("Job title", { exact: true }).fill("Support Lead");
  await page.getByLabel("Company name", { exact: true }).fill("Brightwell Energy");
  await page.getByLabel("Job description (optional)").fill("We want a support lead with coaching and Zendesk experience who can handle complaints.");
  await page.getByLabel("Your relevant experience").fill("three years leading an evening support shift");
  await page.getByLabel("Key skills").fill("coaching, Zendesk, reporting");
  const sheet = page.locator(".letter-sheet");
  await expect(sheet).toContainText("Support Lead position at Brightwell Energy");
  await expect(sheet).toContainText("Your advert highlights coaching and Zendesk.");
  await expect(page.locator(".tool-warning")).toHaveCount(0);
  await page.locator(".choice-card", { hasText: "Student or graduate" }).click();
  await expect(sheet).toContainText("at the start of my career");
  await page.locator(".choice-card", { hasText: "Modern" }).click();
  await expect(page.getByRole("radio", { name: /^Modern/ })).toBeChecked();
  await expect(sheet).toHaveClass(/layout-modern/);
  const body = page.getByLabel("Letter text", { exact: true });
  await body.fill(`${await body.inputValue()}\n\nEDITED_BY_HAND`);
  await page.getByLabel("Company name", { exact: true }).fill("Changed Company");
  await expect(sheet).toContainText("EDITED_BY_HAND");
  await page.getByLabel("Paper size").selectOption("LETTER");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download PDF" }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe("Jordan Letter cover letter.pdf");
  const result = await pdfText((await download.path())!);
  expect(result.text).toContain("Jordan Letter"); expect(result.text).toContain("EDITED_BY_HAND"); expect(result.text).toContain("Kind regards");
  await page.getByRole("button", { name: "Save in this browser" }).click();
  expect(await page.evaluate(() => localStorage.getItem("folio-cover-letter-v1"))).toContain("EDITED_BY_HAND");
});

test("keyword checker compares a job advert with the CV open in the editor", async ({ page }) => {
  await page.goto("/editor/");
  await page.getByLabel("Full name", { exact: true }).fill("Key Person");
  await page.getByRole("button", { name: "Skills", exact: true }).click();
  await page.getByLabel("Your skills").fill("Tools: SQL, Excel");
  // Client-side navigation keeps the in-memory CV, as it does for a visitor.
  await page.getByRole("link", { name: "Folio home" }).click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Free tools", exact: true }).click();
  await page.getByRole("link", { name: /Open the resume keyword checker/ }).click();
  await page.getByRole("button", { name: "Use the CV in my editor" }).click();
  await expect(page.getByLabel("Your CV text", { exact: true })).toHaveValue(/Key Person[\s\S]*SQL, Excel/);
  await page.getByLabel("Job description", { exact: true }).fill("Data analyst needed. Strong SQL and Power BI skills. You will build Power BI dashboards and write SQL queries for stakeholder reporting every week.");
  await expect(page.locator(".match-rate strong")).toHaveText(/\d+%/);
  await expect(page.locator(".keyword-list.is-missing")).toContainText("Power BI");
  await expect(page.locator(".keyword-list.is-matched")).toContainText("SQL");
});

test("summary builder and skills finder add to the CV and open the right section", async ({ page }) => {
  await page.goto("/resume-summary-builder/");
  await page.getByLabel("Your job title", { exact: true }).fill("Data analyst");
  await page.getByLabel("Years of experience (optional)").fill("4");
  await page.getByLabel("Two or three key skills").fill("SQL, Power BI");
  const first = page.locator(".draft-card").first();
  await expect(first.locator("textarea")).toHaveValue("Data analyst with 4 years of experience. Skilled in SQL and Power BI.");
  await first.getByRole("button", { name: "Use as my CV profile" }).click();
  await expect(page).toHaveURL(/\/editor\/$/);
  await expect(page.getByLabel("Profile summary")).toHaveValue("Data analyst with 4 years of experience. Skilled in SQL and Power BI.");
  await page.goto("/resume-skills/");
  await page.getByLabel("Profession", { exact: true }).selectOption("data-analyst");
  await page.getByRole("button", { name: "Power BI", exact: true }).click();
  await page.getByRole("button", { name: "Data visualisation", exact: true }).click();
  await expect(page.locator(".skills-preview")).toHaveText("Skills: Data visualisation\nTools: Power BI");
  await page.getByRole("button", { name: "Add to my CV" }).click();
  await expect(page.getByLabel("Your skills")).toHaveValue("Skills: Data visualisation\nTools: Power BI");
});

test("languages and a renamed extra section reach the PDF", async ({ page }) => {
  await page.goto("/editor/");
  await page.getByLabel("Full name", { exact: true }).fill("Section Person");
  await page.getByLabel("Email address", { exact: true }).fill("not-an-email");
  await page.getByLabel("Phone number", { exact: true }).click();
  await expect(page.locator(".field-problem")).toContainText("complete email address");
  await page.getByLabel("Email address", { exact: true }).fill("section@example.com");
  await expect(page.locator(".field-problem")).toHaveCount(0);
  await page.getByRole("button", { name: "Languages", exact: true }).click();
  await page.getByLabel("Language", { exact: true }).fill("Spanish");
  await page.getByLabel("Level", { exact: true }).selectOption("Conversational");
  await page.getByRole("button", { name: "Add language" }).click();
  await expect(page.getByLabel("Your languages")).toHaveValue("Spanish: Conversational");
  await page.getByRole("button", { name: "Additional information", exact: true }).click();
  await page.getByRole("group", { name: "Suggested section headings" }).getByRole("button", { name: "Referees", exact: true }).click();
  await page.getByLabel("Details", { exact: true }).fill("Maria Lopez, Operations Manager");
  await expect(page.locator(".section-nav")).toContainText("Referees");
  for (const template of ["Use Sidebar template", "Use Compass template", "Use Timeline template"]) {
    await page.getByRole("button", { name: "Templates & layout" }).click();
    await page.getByRole("button", { name: template, exact: true }).click();
    const pending = page.waitForEvent("download"); await page.getByRole("button", { name: "Download PDF" }).click();
    // Some templates letter-space small uppercase labels, which splits words when text is extracted.
    const text = (await pdfText((await (await pending).path())!)).text.toLowerCase().replace(/\s+/g, "");
    for (const expected of ["spanish", "conversational", "referees", "marialopez", "languages"]) expect(text, template).toContain(expected);
  }
});

test("new pages fit a 320px screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const route of ["/cover-letter-maker/", "/resume-keyword-checker/", "/resume-summary-builder/", "/resume-skills/", "/tools/", "/cv-maker-for-students/", "/tips/", "/tips/resume-vs-cv/"]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBeLessThanOrEqual(320);
  }
  await page.goto("/editor/");
  for (const section of ["Skills", "Languages", "Additional information"]) {
    await page.getByRole("button", { name: section, exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth), section).toBeLessThanOrEqual(320);
  }
});
