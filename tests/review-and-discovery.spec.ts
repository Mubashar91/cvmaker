import { test, expect } from "@playwright/test";
import { emptyCV, emptyEntry } from "../src/lib/model";
import { reviewCV, cvPlainText } from "../src/lib/cv-review";
import { matchesTemplateSearch, sortTemplates } from "../src/lib/template-search";
import { templates } from "../src/lib/model";
import { templateCollections, collectionPath } from "../src/lib/template-collections";

test("review flags invalid contacts and incomplete visible entries", () => {
  const cv = emptyCV(); cv.personal.name = "Sam Rivera"; cv.personal.email = "sam@";
  cv.experience = [{ ...emptyEntry(), title: "Developer" }];
  const checks = reviewCV(cv);
  for (const id of ["contact", "entries", "dates", "descriptions"]) expect(checks.find(check => check.id === id)?.passed).toBe(false);
  cv.personal.email = "sam@example.org";
  cv.experience[0] = { ...cv.experience[0], organization: "Community Group", dates: "2024–2026", description: "Built an accessible directory." };
  expect(reviewCV(cv).every(check => check.passed)).toBe(true);
  cv.personal.email = ""; cv.personal.phone = "+44 7700 900123";
  expect(reviewCV(cv).find(check => check.id === "contact")?.passed).toBe(true);
});

test("review and text export respect hidden content and section order", () => {
  const cv = emptyCV(); cv.personal.name = "Sam"; cv.personal.email = "sam@example.org";
  cv.experience = [{ ...emptyEntry(), title: "HIDDEN_EMPLOYMENT" }];
  cv.education = [{ ...emptyEntry(), title: "BA Design", organization: "College", dates: "2024" }];
  cv.summary = "PROFILE_LAST"; cv.skills = "HIDDEN_SKILL";
  cv.hiddenSections = ["skills", "experience"];
  cv.sectionOrder = ["education", "experience", "skills", "projects", "certifications", "summary"];
  const text = cvPlainText(cv);
  expect(text).not.toContain("HIDDEN_");
  expect(text.indexOf("BA Design")).toBeLessThan(text.indexOf("PROFILE_LAST"));
  expect(reviewCV(cv).every(check => check.passed)).toBe(true);
});

test("discovery finds intent and applies all search terms", () => {
  expect(matchesTemplateSearch("linear", "ATS")).toBe(true);
  expect(matchesTemplateSearch("student", "first job")).toBe(true);
  expect(matchesTemplateSearch("aurora", "photo modern")).toBe(true);
  expect(matchesTemplateSearch("linear", "photo modern")).toBe(false);
  expect(sortTemplates([...templates], "newest")[0].id).toBe("linear");
});

test("gallery search, layout filter, sorting, and keyboard preview work", async ({ page }) => {
  await page.goto("/templates/");
  const search = page.getByRole("searchbox", { name: "Search CV templates" });
  await search.fill("no-such-design-987");
  await expect(page.getByText("No designs match these filters.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await page.getByLabel("Template columns").selectOption("2");
  await expect(page.locator(".template-tile")).toHaveCount(5);
  await page.getByLabel("Template columns").selectOption("all");
  await search.fill("ATS");
  await expect(page.getByRole("button", { name: "Use Linear template", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Clear template search" }).click();
  await page.getByLabel("Sort templates").selectOption("newest");
  await expect(page.locator(".template-name").first()).toHaveText("Linear");
  const previewButton = page.getByRole("button", { name: "Preview Linear template", exact: true });
  await previewButton.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Linear", exact: true })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading", { name: "Aurora", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(previewButton).toBeFocused();
});

test("review provides direct corrections and downloads visible text", async ({ page }) => {
  await page.goto("/editor/");
  await page.getByRole("button", { name: "Review CV", exact: true }).click();
  await page.getByRole("button", { name: "Edit your name", exact: true }).click();
  await expect(page.getByLabel("Full name", { exact: true })).toBeFocused();
  await page.getByLabel("Full name", { exact: true }).fill("Review Person");
  await page.getByLabel("Email address", { exact: true }).fill("review@example.org");
  await page.getByRole("button", { name: "Education", exact: true }).click();
  await page.getByRole("button", { name: "Add education", exact: true }).click();
  await page.getByLabel("Degree or qualification", { exact: true }).fill("BSc Design");
  await page.getByLabel("School or university", { exact: true }).fill("Example College");
  await page.getByLabel("Dates", { exact: true }).fill("2024–2026");
  await page.getByRole("button", { name: "Review CV", exact: true }).click();
  await expect(page.getByText("8 of 8 checks ready", { exact: true })).toBeVisible();
  await page.getByText("Read your CV as plain text", { exact: true }).click();
  await expect(page.locator(".review-text pre")).toContainText("BSc Design");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download text version" }).click();
  expect((await pending).suggestedFilename()).toBe("Review Person CV.txt");
});

test("category pages contain their actual collection and useful guidance", async ({ page }) => {
  for (const collection of templateCollections) {
    await page.goto(collectionPath(collection.slug));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(collection.title);
    await expect(page.locator(".template-tile")).toHaveCount(collection.templates.length);
    await expect(page.getByRole("heading", { name: collection.advice[0].heading, exact: true })).toBeVisible();
  }
});

test("new controls fit small screens", async ({ page }) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ["/", "/templates/", "/templates/category/ats-friendly/", "/editor/"]) {
      await page.goto(route);
      if (route === "/editor/") await page.getByRole("button", { name: "Review CV", exact: true }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }
  }
});
