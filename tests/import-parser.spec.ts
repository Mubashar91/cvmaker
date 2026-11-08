import { test, expect } from "@playwright/test";
import { parseCVText } from "../src/lib/import-cv";
import { accentColors, contrastOnWhite, emptyCV, isCV, readableAccent, templateCountWord, templates } from "../src/lib/model";

test("missing fields stay blank and source text is not replaced with sample information", () => {
  const { cv } = parseCVText("Sam Rivera\nSummary\nCommunity volunteer learning web development.\nSkills\nHTML, CSS");
  expect(cv.personal.name).toBe("Sam Rivera");
  for (const value of [cv.personal.email, cv.personal.phone, cv.personal.location, cv.personal.website, cv.personal.headline]) expect(value).toBe("");
  expect(cv.experience).toEqual([]); expect(cv.education).toEqual([]); expect(cv.projects).toEqual([]); expect(cv.certifications).toEqual([]);
  expect(cv.summary).toBe("Community volunteer learning web development.");
});

test("ambiguous entry text is preserved without assigning an invented company", () => {
  const { cv } = parseCVText("Sam Rivera\nExperience\nDeveloper\nSmall community team\nBuilt a useful tool.");
  expect(cv.experience[0].title).toBe("Developer"); expect(cv.experience[0].organization).toBe(""); expect(cv.experience[0].dates).toBe("");
  expect(cv.experience[0].description).toBe("Small community team\nBuilt a useful tool.");
});

test("invalid and incomplete portable drafts are rejected", () => {
  expect(isCV(emptyCV())).toBe(true); expect(isCV(null)).toBe(false); expect(isCV({ version: 1 })).toBe(false);
  expect(isCV({ ...emptyCV(), sectionOrder: ["summary", "summary", "summary", "summary", "summary", "summary"] })).toBe(false);
  expect(isCV({ ...emptyCV(), personal: { name: "Invalid" } })).toBe(false);
});

test("custom accent colours are darkened only as far as print legibility needs", () => {
  for (const pick of ["#ffff00", "#f3b53f", "#7fd4ff", "#ffffff", "#ff69b4"]) expect(contrastOnWhite(readableAccent(pick))).toBeGreaterThanOrEqual(4.5);
  for (const { value } of accentColors) expect(readableAccent(value)).toBe(value);
  for (const template of templates) expect(contrastOnWhite(template.color)).toBeGreaterThanOrEqual(4.5);
  expect(readableAccent("#1F3A5F")).toBe("#1f3a5f");
  expect(readableAccent("not a colour")).toMatch(/^#[0-9a-f]{6}$/);
});

test("typeface, spacing, and custom colour survive a portable draft", () => {
  const draft = { ...emptyCV(), template: "gazette", accent: readableAccent("#3fa7d6"), font: "serif", density: "compact" };
  expect(isCV(JSON.parse(JSON.stringify(draft)))).toBe(true);
  expect(isCV({ ...draft, font: "mono" })).toBe(false);
  expect(isCV({ ...draft, density: "huge" })).toBe(false);
  expect(templateCountWord).toMatch(/^[A-Z][a-z]+(-[a-z]+)?$/); // a word such as "Thirty-six", never digits
});
