import { test, expect } from "@playwright/test";

test("header links directly to the matching tool on desktop and mobile", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const desktopLink = page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Match job to CV", exact: true });
  await expect(desktopLink).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1280);
  await desktopLink.click();
  await expect(page).toHaveURL(/\/ai-cv-job-match\/$/);
  await expect(desktopLink).toHaveAttribute("aria-current", "page");
  await page.setViewportSize({ width: 390, height: 600 });
  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation", exact: true });
  await expect(mobileNav.getByRole("link", { name: "Match job to CV", exact: true })).toBeVisible();
  await mobileNav.getByRole("link", { name: "Match job to CV", exact: true }).click();
  await expect(mobileNav).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

const job = "We are hiring a customer support specialist. You will answer customer emails and calls, resolve billing questions, keep our CRM records accurate, and work closely with the product team. Experience with written customer communication is essential.";
const cvText = "Alex Morgan. Customer support assistant at Retail Co, 2022 to 2025. Handled 40 to 60 customer emails and calls a day, resolving billing and delivery questions. Logged every case in the ticket system and wrote weekly summaries for the product team. Skills: written communication, patience, time management.";
const report = {
  matches: [{ requirement: "Answer customer emails and calls", evidence: "Handled 40 to 60 customer emails and calls a day, resolving billing and delivery questions." }],
  gaps: [{ requirement: "CRM experience", advice: "The CV mentions a ticket system but names no CRM. Name the system you used only if that is true for you." }],
  improvements: [{ section: "summary", suggestion: "Open with your support experience and the daily email and call volume." }],
  rewrites: [{ current: "Logged every case in the ticket system", suggested: "Kept CRM-style ticket records accurate and up to date for every case", reason: "Uses the advert's own vocabulary for the same fact." }],
};

test("development server exposes the AI job match endpoint", async ({ request }) => {
  const response = await request.get("/api/cv-job-match");
  expect(response.status()).toBe(405);
  expect(response.headers().allow).toBe("POST");
});

test("checking a match sends only the provided texts and renders the full report", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/ai-cv-job-match/");
  const action = page.getByRole("button", { name: "Check my match", exact: true });
  await expect(action).toBeDisabled();
  await page.getByRole("textbox", { name: "Job description", exact: true }).fill(job);
  await page.getByRole("textbox", { name: "Your CV text", exact: true }).fill(cvText);
  await page.route("**/api/cv-job-match", async route => {
    expect(route.request().postDataJSON()).toEqual({ cv: cvText, job });
    await route.fulfill({ json: report });
  });
  await action.click();
  const reportArea = page.locator(".ai-report");
  await expect(page.getByRole("heading", { name: "Requirements you demonstrate" })).toBeVisible();
  await expect(reportArea.getByText("Handled 40 to 60 customer emails and calls a day", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Missing or unclear" })).toBeVisible();
  await expect(reportArea.getByText("names no CRM", { exact: false })).toBeVisible();
  await expect(reportArea.getByText("Open with your support experience", { exact: false })).toBeVisible();
  await expect(reportArea.getByText("Kept CRM-style ticket records accurate", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Copy new wording", exact: true }).click();
  await expect(page.getByRole("button", { name: "Copied", exact: true })).toBeVisible();
});

test("service errors show a friendly message and a retry can succeed", async ({ page }) => {
  await page.goto("/ai-cv-job-match/");
  await page.getByRole("textbox", { name: "Job description", exact: true }).fill(job);
  await page.getByRole("textbox", { name: "Your CV text", exact: true }).fill(cvText);
  let attempt = 0;
  await page.route("**/api/cv-job-match", route => {
    attempt++;
    if (attempt === 1) return route.fulfill({ status: 503, json: { error: "The AI job match is not available yet." } });
    return route.fulfill({ json: report });
  });
  const action = page.getByRole("button", { name: "Check my match", exact: true });
  await action.click();
  await expect(page.locator(".tool-form").getByRole("alert")).toContainText("not available yet");
  await action.click();
  await expect(page.getByRole("heading", { name: "Requirements you demonstrate" })).toBeVisible();
});

test("the job match page fits a mobile screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/ai-cv-job-match/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test("the editor review opens the matching tool with the current CV available", async ({ page }) => {
  await page.goto("/editor/");
  await page.getByLabel("Full name", { exact: true }).fill("Alex Morgan");
  await page.getByRole("button", { name: "Profile", exact: true }).click();
  await page.getByRole("textbox", { name: "Profile summary", exact: true }).fill(cvText);
  await page.getByRole("button", { name: "Review CV", exact: true }).click();
  await page.getByRole("link", { name: "Match this CV to a job advert with AI", exact: true }).click();
  await expect(page).toHaveURL(/\/ai-cv-job-match\/$/);
  await page.getByRole("button", { name: "Use the CV in my editor", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Your CV text", exact: true })).toHaveValue(new RegExp(cvText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("changing either input marks the previous report as out of date", async ({ page }) => {
  await page.goto("/ai-cv-job-match/");
  await page.getByRole("textbox", { name: "Job description", exact: true }).fill(job);
  await page.getByRole("textbox", { name: "Your CV text", exact: true }).fill(cvText);
  await page.route("**/api/cv-job-match", route => route.fulfill({ json: report }));
  await page.getByRole("button", { name: "Check my match", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Requirements you demonstrate" })).toBeVisible();
  await page.getByRole("textbox", { name: "Job description", exact: true }).fill(job + " SQL required.");
  await expect(page.getByText("This report is for the previous text.", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Check my match", exact: true }).click();
  await expect(page.getByText("This report is for the previous text.", { exact: false })).toHaveCount(0);
  await page.getByRole("textbox", { name: "Your CV text", exact: true }).fill(cvText + " SQL reporting.");
  await expect(page.getByText("This report is for the previous text.", { exact: false })).toBeVisible();
});
