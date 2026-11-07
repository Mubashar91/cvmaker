import { test, expect } from "@playwright/test";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { templates } from "../src/lib/model";
const templateNames = templates.map(template => template.name);

async function pdfText(filePath: string) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await readFile(filePath)), useSystemFonts: true }).promise;
  const pages: string[] = []; const bodies: string[] = []; let outOfBounds = 0;
  try {
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i); const items = await page.getTextContent(); const viewport = page.getViewport({ scale: 1 });
      for (const item of items.items) if ("str" in item && item.str.trim() && (item.transform[5] < 15 || item.transform[5] > viewport.height - 15 || item.transform[4] < 20 || item.transform[4] + item.width > viewport.width - 20)) outOfBounds++;
      pages.push(items.items.map(item => "str" in item ? item.str : "").join(" "));
      bodies.push(items.items.filter(item => "str" in item && item.transform[5] > 43).map(item => "str" in item ? item.str : "").join(" "));
    }
    return { text: pages.join("\n"), pages: pages.length, outOfBounds, nonEmptyPages: bodies.filter(p => /\p{L}/u.test(p)).length };
  } finally { await pdf.destroy(); }
}
for (const ext of ["pdf", "docx"]) test(`${ext}: upload, correct a detail, switch templates, and download`, async ({ page, baseURL }) => {
  const unexpectedRequests: string[] = [];
  const localOrigin = new URL(baseURL!).origin;
  page.on("request", request => { if (!request.url().startsWith(localOrigin + "/") && !request.url().startsWith("blob:") && !request.url().startsWith("data:")) unexpectedRequests.push(request.url()); });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Create a new CV" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Upload my existing CV" })).toBeVisible();
  if (ext === "pdf") await page.screenshot({ path: "test-results/desktop-home.png", fullPage: true });
  await page.getByLabel("Upload existing CV", { exact: true }).setInputFiles(path.resolve(`tests/fixtures/sample.${ext}`));
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Jordan Taylor");
  await expect(page.getByLabel("Email address", { exact: true })).toHaveValue("jordan@example.com");
  await expect(page.getByLabel("Phone number", { exact: true })).toHaveValue("+44 7700 900123");
  await expect(page.getByLabel("Location", { exact: true })).toHaveValue("Bristol, UK");
  await page.getByLabel("Full name", { exact: true }).fill("Jordan Corrected");
  await page.getByRole("button", { name: "Profile", exact: true }).click();
  await expect(page.getByLabel("Profile summary")).toHaveValue(/Software engineer/);
  await page.getByRole("button", { name: "Work experience", exact: true }).click();
  await expect(page.getByLabel("Job title", { exact: true })).toHaveCount(2);
  await expect(page.getByLabel("Company", { exact: true }).first()).toHaveValue("Example Studio");
  await page.getByRole("button", { name: "Templates & layout" }).click();
  for (const template of templateNames) {
    await page.getByRole("button", { name: `Use ${template} template`, exact: true }).click();
    await expect(page.getByRole("button", { name: `Use ${template} template`, exact: true })).toHaveAttribute("aria-pressed", "true");
  }
  await page.getByRole("button", { name: "Plum", exact: true }).click();
  await expect(page.getByRole("button", { name: "Plum", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Your content", exact: true }).click();
  await page.getByRole("button", { name: /Personal details/ }).click();
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Jordan Corrected");
  await expect(page.getByAltText("CV preview, page 1", { exact: true })).toBeVisible();
  if (ext === "pdf") await page.screenshot({ path: "test-results/desktop-editor.png", fullPage: true });
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download PDF" }).click();
  const download = await downloadPromise; const downloadedPath = await download.path();
  await download.saveAs(path.resolve(`test-results/finished-from-${ext}.pdf`));
  expect(download.suggestedFilename()).toBe("Jordan Corrected CV.pdf");
  const result = await pdfText(downloadedPath!);
  expect(result.nonEmptyPages).toBe(result.pages);
  for (const expected of ["Jordan Corrected", "jordan@example.com", "Example Studio", "Example University", "TypeScript", "Community Directory", "Web Accessibility Foundations"]) expect(result.text).toContain(expected);
  expect(result.text).not.toContain("Alex Morgan"); expect(result.text).not.toContain("Advertisement");
  expect(unexpectedRequests).toEqual([]);
});

test("long CV paginates in all templates with the final paragraph intact", async ({ page }) => {
  test.setTimeout(360_000);
  await page.goto("/editor/");
  await page.getByLabel("Full name", { exact: true }).fill("Long CV Test");
  await page.getByRole("button", { name: "Work experience", exact: true }).click();
  await page.getByRole("button", { name: "Add experience", exact: true }).click();
  await page.getByLabel("Job title", { exact: true }).fill("Long-running project");
  const description = Array.from({ length: 100 }, (_, i) => `Evidence ${i + 1}: Built accessible applications, worked with colleagues, and documented the decisions for future maintainers.`).join("\n") + "\nFINAL_PARAGRAPH_VISIBLE";
  await page.getByLabel("Description", { exact: true }).fill(description);
  await page.getByRole("button", { name: "Templates & layout" }).click();
  for (const template of templateNames) {
    await page.getByRole("button", { name: `Use ${template} template` }).click();
    const pending = page.waitForEvent("download"); await page.getByRole("button", { name: "Download PDF" }).click();
    const result = await pdfText((await (await pending).path())!);
    expect(result.pages).toBeGreaterThan(2); expect(result.text).toContain("FINAL_PARAGRAPH_VISIBLE"); expect(result.outOfBounds).toBe(0); expect(result.nonEmptyPages).toBe(result.pages);
    for (let i = 1; i <= 100; i++) expect(result.text).toContain(`Evidence ${i}:`);
  }
});

test("scanned and invalid files offer manual entry without guessing", async ({ page }) => {
  await page.goto("/editor/");
  await page.getByLabel("Import CV file", { exact: true }).setInputFiles(path.resolve("tests/fixtures/scanned.pdf"));
  await expect(page.locator(".editor-notifications").getByRole("alert")).toContainText("scanned or image-only");
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("");
  await page.getByRole("button", { name: "Enter details manually" }).click();
  await page.getByLabel("Full name", { exact: true }).fill("Manual Entry");
  await page.getByLabel("Import CV file", { exact: true }).setInputFiles({ name: "broken.pdf", mimeType: "application/pdf", buffer: Buffer.from("not a real PDF") });
  await expect(page.locator(".editor-notifications").getByRole("alert")).toContainText("couldn’t read this file");
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Manual Entry");
});

test("entries reorder, hidden sections are omitted, drafts save, restore and delete", async ({ page }) => {
  await page.goto("/editor/");
  await page.getByLabel("Full name", { exact: true }).fill("Draft Person");
  await page.getByRole("button", { name: "Work experience", exact: true }).click();
  await page.getByRole("button", { name: "Add experience", exact: true }).click();
  await page.getByLabel("Job title").first().fill("First role");
  await page.getByRole("button", { name: "Add experience", exact: true }).click();
  await page.getByLabel("Job title").nth(1).fill("Second role");
  await page.getByRole("button", { name: "Move entry 2 up", exact: true }).click();
  await expect(page.getByLabel("Job title").first()).toHaveValue("Second role");
  await page.getByRole("button", { name: "Remove entry 2", exact: true }).click();
  await expect(page.getByLabel("Job title")).toHaveCount(1);
  await page.getByRole("button", { name: "Skills", exact: true }).click();
  await page.getByLabel("Your skills").fill("HIDDEN_SKILL");
  await page.getByRole("button", { name: "Hide Skills", exact: true }).click();
  const pending = page.waitForEvent("download"); await page.getByRole("button", { name: "Download PDF" }).click();
  const result = await pdfText((await (await pending).path())!);
  expect(result.text).toContain("Second role"); expect(result.text).not.toContain("First role"); expect(result.text).not.toContain("HIDDEN_SKILL"); expect(result.text).not.toContain("EDUCATION");
  await page.getByRole("button", { name: "Save draft", exact: true }).first().click();
  expect(await page.evaluate(() => localStorage.getItem("folio-draft-v1"))).toContain("Draft Person");
  await page.goto("/"); await page.reload();
  await page.getByRole("button", { name: "Welcome back. Continue your saved draft" }).click();
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Draft Person");
  await page.getByRole("button", { name: "Delete saved draft", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Delete saved draft", exact: true }).click();
  expect(await page.evaluate(() => localStorage.getItem("folio-draft-v1"))).toBeNull();
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Draft Person");
  const draftPending = page.waitForEvent("download"); await page.getByRole("button", { name: "Download draft", exact: true }).click();
  const draftPath = await (await draftPending).path();
  await page.getByLabel("Full name", { exact: true }).fill("Changed");
  await page.getByLabel("Restore draft file", { exact: true }).setInputFiles(draftPath!);
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("Draft Person");
});

test("mobile home and editor fit the viewport and allow preview", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.screenshot({ path: "test-results/mobile-home.png", fullPage: true });
  await page.getByRole("button", { name: "Create a new CV" }).click();
  await page.getByLabel("Full name", { exact: true }).fill("Mobile Person");
  await page.getByRole("button", { name: "Live preview", exact: true }).click();
  await expect(page.getByAltText("CV preview, page 1", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.screenshot({ path: "test-results/mobile-preview.png", fullPage: true });
  await expect(page.getByRole("button", { name: "Download PDF" })).toBeVisible();
});

test("an optional photo is prepared locally, shown, and removable", async ({ page }) => {
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", "base64");
  await page.goto("/editor/");
  await page.getByLabel("Full name", { exact: true }).fill("Photo Person");
  await page.getByLabel("Choose CV photo", { exact: true }).setInputFiles({ name: "me.png", mimeType: "image/png", buffer: png });
  await expect(page.getByAltText("Your CV photo", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Templates & layout" }).click();
  await page.getByRole("button", { name: "With photo", exact: false }).click();
  await page.getByRole("button", { name: "Use Portrait template", exact: true }).click();
  await expect(page.getByAltText("CV preview, page 1", { exact: true })).toBeVisible();
  const pending = page.waitForEvent("download"); await page.getByRole("button", { name: "Download PDF" }).click();
  const result = await pdfText((await (await pending).path())!);
  expect(result.text).toContain("Photo Person");
  await page.getByRole("button", { name: "Your content", exact: true }).click();
  await page.getByRole("button", { name: "Remove photo", exact: true }).click();
  await expect(page.getByAltText("Your CV photo", { exact: true })).toHaveCount(0);
});

test("tips pages work and ad spaces stay hidden", async ({ page }) => {
  for (const route of ["/", "/tips/", "/tips/before-you-send/", "/privacy/", "/editor/"]) {
    await page.goto(route); await expect(page.locator("main")).toBeVisible(); await expect(page.locator("iframe")).toHaveCount(0); await expect(page.locator(".ad-space")).toHaveCount(0);
  }
});
