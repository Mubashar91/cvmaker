import { test, expect, type Page } from "@playwright/test";

const original = "Frontend developer building accessible websites with React and TypeScript.";
const improved = "Frontend developer with practical experience building accessible websites using React and TypeScript, focused on clear interfaces and maintainable code.";

test("development server exposes the AI endpoint", async ({ request }) => {
  const response = await request.get("/api/improve-summary");
  expect(response.status()).toBe(405);
  expect(response.headers().allow).toBe("POST");
});

async function openProfile(page: Page) {
  await page.goto("/editor/");
  await page.getByLabel("Full name", { exact: true }).fill("Private Name");
  await page.getByLabel("Email address", { exact: true }).fill("private@example.com");
  await page.getByRole("button", { name: "Profile", exact: true }).click();
}

test("AI requires a summary and only sends the summary and professional title", async ({ page }) => {
  await openProfile(page);
  const action = page.getByRole("button", { name: "Improve summary with AI", exact: true });
  await expect(action).toBeDisabled();
  await page.getByRole("textbox", { name: "Profile summary", exact: true }).fill(original);
  await page.route("**/api/improve-summary", async route => {
    expect(route.request().postDataJSON()).toEqual({ summary: original, headline: "" });
    await route.fulfill({ json: { summary: improved } });
  });
  await action.click();
  await expect(page.getByLabel("Suggested summary", { exact: true })).toHaveValue(improved);
  await expect(page.getByRole("textbox", { name: "Profile summary", exact: true })).toHaveValue(original);
  await page.getByLabel("Suggested summary", { exact: true }).fill(improved + " Updated.");
  await page.getByRole("button", { name: "Use this summary", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Profile summary", exact: true })).toHaveValue(improved + " Updated.");
  await page.getByRole("button", { name: "Save draft", exact: true }).first().click();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("folio-drafts-v2") || "[]")[0]?.cv.summary)).toBe(improved + " Updated.");
});

test("discard keeps the original and a second attempt can be applied", async ({ page }) => {
  await openProfile(page);
  await page.getByRole("textbox", { name: "Profile summary", exact: true }).fill(original);
  await page.route("**/api/improve-summary", route => route.fulfill({ json: { summary: improved } }));
  await page.getByRole("button", { name: "Improve summary with AI", exact: true }).click();
  await page.getByRole("button", { name: "Discard", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Profile summary", exact: true })).toHaveValue(original);
  await expect(page.getByLabel("Suggested summary", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Improve summary with AI", exact: true }).click();
  await page.getByRole("button", { name: "Use this summary", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Profile summary", exact: true })).toHaveValue(improved);
});

test("loading prevents duplicate requests and protects edits made during a request", async ({ page }) => {
  await openProfile(page);
  await page.getByRole("textbox", { name: "Profile summary", exact: true }).fill(original);
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/api/improve-summary", async route => { await pending; await route.fulfill({ json: { summary: improved } }); });
  await page.getByRole("button", { name: "Improve summary with AI", exact: true }).click();
  await expect(page.getByRole("button", { name: "Improving summary…", exact: true })).toBeDisabled();
  await page.getByRole("textbox", { name: "Profile summary", exact: true }).fill(original + " New facts.");
  release();
  await expect(page.getByLabel("Suggested summary", { exact: true })).toHaveValue(improved);
  await expect(page.getByRole("button", { name: "Use this summary", exact: true })).toBeDisabled();
  await expect(page.getByRole("textbox", { name: "Profile summary", exact: true })).toHaveValue(original + " New facts.");
});

test("missing configuration, provider errors, and retry preserve the original", async ({ page }) => {
  await openProfile(page);
  await page.getByRole("textbox", { name: "Profile summary", exact: true }).fill(original);
  let attempt = 0;
  await page.route("**/api/improve-summary", route => {
    attempt++;
    if (attempt === 1) return route.fulfill({ status: 503, json: { error: "AI summary improvement is not available yet." } });
    if (attempt === 2) return route.fulfill({ status: 502, contentType: "text/html", body: "Unavailable" });
    return route.fulfill({ json: { summary: improved } });
  });
  const action = page.getByRole("button", { name: "Improve summary with AI", exact: true });
  await action.click();
  await expect(page.locator(".ai-summary").getByRole("alert")).toContainText("not available yet");
  await action.click();
  await expect(page.locator(".ai-summary").getByRole("alert")).toContainText("unavailable right now");
  await expect(page.getByRole("textbox", { name: "Profile summary", exact: true })).toHaveValue(original);
  await action.click();
  await expect(page.getByLabel("Suggested summary", { exact: true })).toHaveValue(improved);
});

test("AI controls and suggestions fit a mobile screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openProfile(page);
  await page.getByRole("textbox", { name: "Profile summary", exact: true }).fill(original);
  await page.route("**/api/improve-summary", route => route.fulfill({ json: { summary: improved } }));
  await page.getByRole("button", { name: "Improve summary with AI", exact: true }).click();
  await expect(page.getByLabel("Suggested summary", { exact: true })).toHaveValue(improved);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.screenshot({ path: "test-results/mobile-ai-summary.png", fullPage: true });
});
