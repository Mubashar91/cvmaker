import { test, expect } from "@playwright/test";

test("bullet builder requires facts, keeps edits copyable, and clears stale output", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/resume-bullet-point-generator/");
  const build = page.getByRole("button", { name: "Build my bullet point" });
  await expect(build).toBeDisabled();
  await page.getByLabel("Action verb", { exact: true }).fill("tested");
  await expect(build).toBeDisabled();
  await page.getByLabel("Task or contribution", { exact: true }).fill("a booking form");
  await build.click();
  const output = page.getByLabel("Your bullet point, editable", { exact: true });
  await expect(output).toHaveValue("Tested a booking form.");
  await output.fill("Tested a booking form using keyboard navigation.");
  await page.getByRole("button", { name: "Copy bullet point", exact: true }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe("Tested a booking form using keyboard navigation.");
  await output.fill("");
  await expect(output).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy bullet point", exact: true })).toBeDisabled();
  await page.getByLabel("Context or scale (optional)", { exact: true }).fill("on mobile");
  await expect(output).toHaveCount(0);
  await build.click();
  await expect(output).toHaveValue("Tested a booking form on mobile.");
  await page.getByLabel("Result or purpose (optional)", { exact: true }).fill("documented two issues.");
  await build.click();
  await expect(output).toHaveValue("Tested a booking form on mobile; documented two issues.");
  await page.getByRole("button", { name: "Clear", exact: true }).click();
  await expect(build).toBeDisabled();
  await expect(output).toHaveCount(0);
  await page.getByRole("button", { name: "Load fictional example" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Fictional example loaded" })).toBeVisible();
  await build.click();
  await expect(output).toHaveValue("Organised weekly study sessions for 12 classmates; shared revision notes before each session.");
});

test("first-job landing page starts a blank education-first CV in Clarity", async ({ page }) => {
  await page.goto("/cv-with-no-experience/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("no experience");
  await page.getByRole("button", { name: "Create my first CV" }).first().click();
  await expect(page).toHaveURL(/\/editor\/?$/);
  await page.getByRole("button", { name: "Save draft", exact: true }).first().click();
  const draft = await page.evaluate(() => JSON.parse(localStorage.getItem("folio-drafts-v2") || "[]")[0]?.cv);
  expect(draft.template).toBe("clarity");
  expect(draft.personal.name).toBe("");
  expect(draft.sectionOrder.indexOf("education")).toBeLessThan(draft.sectionOrder.indexOf("experience"));
  expect(draft.sectionOrder.indexOf("projects")).toBeLessThan(draft.sectionOrder.indexOf("experience"));
});

test("new pages fit narrow mobile viewports", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const path of ["/cv-with-no-experience/", "/resume-bullet-point-generator/"]) {
    await page.goto(path);
    await expect(page.locator("main")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
  }
});
