import { test, expect } from "@playwright/test";
import { freeToolGuides } from "../src/lib/guides-free-tools";
import { writingExampleGuides } from "../src/lib/guides-writing-examples";
import { careerBlogGuides } from "../src/lib/guides-career-blogs";
import { countryBlogGuides } from "../src/lib/guides-country-blogs";

const blogs = [...freeToolGuides, ...writingExampleGuides, ...careerBlogGuides, ...countryBlogGuides];

test("guide index exposes all 20 new blogs", async ({ page }) => {
  expect(blogs).toHaveLength(20);
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
    for (const source of blog.sources || []) {
      await expect(page.getByRole("link", { name: source.title, exact: true })).toHaveAttribute("href", source.url);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  }
  await page.locator("article .article-tool a").click();
  await expect(page).toHaveURL(/\/editor\/?$/);
});
