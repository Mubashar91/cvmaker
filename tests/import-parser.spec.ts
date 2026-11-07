import { test, expect } from "@playwright/test";
import { parseCVText } from "../src/lib/import-cv";
import { emptyCV, isCV } from "../src/lib/model";

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
