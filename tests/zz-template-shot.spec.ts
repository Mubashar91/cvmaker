import { test, expect } from "@playwright/test";
const out = "C:/Users/mmuba/AppData/Local/Temp/claude/5f35ff0b0fc0bac5/45ae34c0-4b89-4829-90ad-4a3c390a6fff/scratchpad/shots";
test("template page screenshots", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/templates/sidebar/");
    await page.locator(".faq-list details").first().click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `${out}/template-${width}.png`, fullPage: true });
  }
});
