import { test, expect } from "@playwright/test";
import { freeToolGuides } from "../src/lib/guides-free-tools";
import { writingExampleGuides } from "../src/lib/guides-writing-examples";
import { careerBlogGuides } from "../src/lib/guides-career-blogs";
import { countryBlogGuides } from "../src/lib/guides-country-blogs";
import { relatedGuides, tips } from "../src/lib/tips";

const blogs = [...freeToolGuides, ...writingExampleGuides, ...careerBlogGuides, ...countryBlogGuides];

test("each blog offers a direct answer, practical example, checklist, and valid next reading", () => {
  for (const blog of blogs) {
    expect(blog.quickAnswer?.trim(), blog.slug).toBeTruthy();
    expect(blog.sections.filter(section => section.id === "worked-example"), blog.slug).toHaveLength(1);
    expect(blog.checklist?.items.length, blog.slug).toBeGreaterThan(0);
    expect(new Set(blog.relatedSlugs).size, blog.slug).toBe(blog.relatedSlugs?.length);
    for (const slug of blog.relatedSlugs || []) {
      expect(slug).not.toBe(blog.slug);
      expect(tips.some(tip => tip.slug === slug), `${blog.slug} links to ${slug}`).toBe(true);
    }
    expect(relatedGuides(blog.slug).map(tip => tip.slug), blog.slug).toEqual(blog.relatedSlugs);
  }
});

test("all 21 blogs have dated research and references tied to their sections", () => {
  expect(blogs).toHaveLength(21);
  for (const blog of blogs) {
    expect(blog.sourcesChecked, blog.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const urls = blog.sources?.map(source => source.url) || [];
    expect(urls.length, blog.slug).toBeGreaterThan(0);
    expect(new Set(urls).size, blog.slug).toBe(urls.length);
    const cited = blog.sections.flatMap(section => section.sourceUrls || []);
    expect(new Set(cited), blog.slug).toEqual(new Set(urls));
    for (const url of urls) expect(new URL(url).protocol).toBe("https:");
  }
});

test("guide index exposes all 21 new blogs", async ({ page }) => {
  expect(blogs).toHaveLength(21);
  await page.goto("/tips/");
  for (const blog of blogs) {
    await expect(page.getByRole("link").filter({ has: page.getByRole("heading", { name: blog.title, exact: true }) })).toHaveAttribute("href", `/tips/${blog.slug}/`);
  }
});

test("new blog articles show examples, references, and working tool links on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const slug of ["ai-cv-maker-vs-template-builder", "resume-action-verbs-and-bullet-points", "teacher-cv-personal-statement", "canadian-newcomer-resume"]) {
    const blog = blogs.find(item => item.slug === slug)!;
    await page.goto(`/tips/${slug}/`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(blog.title);
    await expect(page.locator("article .article-tool a")).toHaveAttribute("href", blog.tool!.href);
    await expect(page.locator("article")).toContainText(blog.takeaway);
    await expect(page.locator("#quick-answer")).toContainText(blog.quickAnswer!);
    await expect(page.locator("#worked-example")).toBeVisible();
    await expect(page.locator("#checklist h2")).toHaveText(blog.checklist!.heading);
    for (const source of blog.sources || []) {
      await expect(page.locator("#sources").getByRole("link", { name: source.title, exact: true })).toHaveAttribute("href", source.url);
      await expect(page.locator(".article-section-sources a").filter({ hasText: source.title }).first()).toHaveAttribute("href", source.url);
    }
    await expect(page.locator("#sources time")).toHaveAttribute("datetime", blog.sourcesChecked!);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  }
  await page.locator("article .article-tool a").click();
  await expect(page).toHaveURL(/\/editor\/?$/);
});

test("a reader can jump from the short answer to the example and completion checklist", async ({ page }, testInfo) => {
  await page.goto("/tips/resume-summary-examples-for-students/");
  await expect(page.locator("#quick-answer")).toContainText("A student summary is optional");
  await page.locator("#quick-answer").screenshot({ path: testInfo.outputPath("short-answer-desktop.png") });
  await page.getByRole("link", { name: "See the worked example" }).click();
  await expect(page).toHaveURL(/#worked-example$/);
  await expect(page.locator("#worked-example .article-example")).toContainText("Before:");
  await page.locator(".guide-toc").getByRole("link", { name: "Check your student summary before sending" }).click();
  await expect(page).toHaveURL(/#checklist$/);
  await expect(page.locator("#checklist li")).toHaveCount(4);
  await expect(page.locator(".related-guides .guide-row").first()).toHaveAttribute("href", "/tips/skills-for-a-first-job-resume/");
  await expect(page.locator("article .article-cta")).toHaveCount(0);
  await page.setViewportSize({ width: 320, height: 800 });
  await page.locator("#checklist").screenshot({ path: testInfo.outputPath("checklist-mobile.png") });
});
