import { test, expect } from "@playwright/test";

for (const path of ["/editor/", "/ai-cv-job-match/", "/privacy/"]) test(`fresh ${path} does not load advertising`, async ({ page, baseURL }) => {
  const advertising: string[] = []; const errors: string[] = [];
  page.on("request", request => { if (/googlesyndication|doubleclick|adtrafficquality/.test(request.url())) advertising.push(request.url()); });
  page.on("pageerror", error => errors.push(error.message));
  await page.route("**/*", route => new URL(route.request().url()).origin === new URL(baseURL!).origin ? route.continue() : route.abort());
  await page.goto(path);
  await page.waitForTimeout(6_000);
  expect(advertising).toEqual([]);
  expect(errors).toEqual([]);
});

test("mobile template cards load smaller responsive previews", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/templates/");
  const image = page.locator(".template-sheet img").first();
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.currentSrc)).toMatch(/\/responsive\/.+-(320|480|640)\.webp/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test("guide dates agree with their sitemap and structured data", async ({ request }) => {
  const path = "/tips/ai-cv-maker-vs-template-builder/";
  const html = await (await request.get(path)).text();
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const article = scripts.find(item => item["@type"] === "Article");
  expect(article.dateModified).toBe("2026-11-12");
  expect(html).toContain('dateTime="2026-11-12"');
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toMatch(/ai-cv-maker-vs-template-builder\/<\/loc>\s*<lastmod>2026-11-12<\/lastmod>/);
  expect(html).not.toContain("Folio does not use AI.");
  expect(html).not.toContain("it does not provide AI rewriting.");
});

test("crawlers skip the API and the 404 page is consistently noindex", async ({ request }) => {
  expect(await (await request.get("/robots.txt")).text()).toMatch(/Disallow: \/api\//);
  const response = await request.get("/this-page-does-not-exist/");
  expect(response.status()).toBe(404);
  const html = await response.text();
  const robots = [...html.matchAll(/<meta name="robots" content="([^"]+)"/g)].map(match => match[1]);
  expect(robots.length).toBeGreaterThan(0);
  for (const value of robots) expect(value).toContain("noindex");
  expect(html).toContain("<title>Page not found | Folio</title>");
});

test("student templates page shows a complete high school resume that opens in the editor", async ({ page }) => {
  await page.goto("/templates/category/student/");
  await expect(page.locator("h1")).toHaveText("Free Student CV & High School Resume Templates");
  const example = page.locator("#high-school-resume-example");
  for (const text of ["Jordan Reyes", "Education", "Food Pantry Volunteer", "School store inventory tracker", "Activities and availability", "What to leave out without work experience"]) await expect(example).toContainText(text);
  await expect(example.locator('a[href="/cv-with-no-experience/"]')).toBeVisible();
  await example.getByRole("button", { name: "Edit this resume" }).click();
  await expect(page).toHaveURL(/\/editor\/$/);
  await expect(page.getByRole("textbox", { name: /full name/i }).first()).toHaveValue("Jordan Reyes");
});

test("AI bullet tutorial shows three worked examples, real screenshots, and is linked from related guides", async ({ page, request }) => {
  const path = "/tips/improve-cv-bullet-points-with-ai/";
  await page.goto(path);
  await expect(page.locator("h1")).toHaveText("How to improve CV bullet points with AI without inventing anything");
  await expect(page.locator(".article-table")).toHaveCount(3);
  for (const stage of ["Facts supplied to the AI", "AI suggestion", "Remove or fix", "Final bullet points"]) await expect(page.locator("tbody th", { hasText: stage })).toHaveCount(3);
  await expect(page.locator("#what-gets-sent")).toContainText("job title and description");
  const screenshots = page.locator(".article-screenshot img");
  await expect(screenshots).toHaveCount(2);
  for (const image of await screenshots.all()) { await image.scrollIntoViewIfNeeded(); await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0); }
  for (const from of ["/tips/ai-cv-maker-vs-template-builder/", "/tips/resume-action-verbs-and-bullet-points/", "/templates/category/student/"]) expect(await (await request.get(from)).text()).toContain(`href="${path}"`);
});
