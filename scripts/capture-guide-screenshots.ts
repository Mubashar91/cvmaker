// Captures the editor screenshots used in /tips/improve-cv-bullet-points-with-ai/.
// Run against a running site (npm run build && npm start, or npm run dev):
//   BASE_URL=http://127.0.0.1:3000 npm run guides:screenshots
// The AI request is answered inside the browser with the guide's own illustrative suggestion,
// so no request reaches OpenAI and the screenshots always match the article text.
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { tips } from "../src/lib/tips";

const base = process.env.BASE_URL || "http://127.0.0.1:3000";
const slug = "improve-cv-bullet-points-with-ai";
const guide = tips.find(tip => tip.slug === slug);
const rows = guide?.sections.find(section => section.id === "worked-example")?.table?.rows;
const row = (stage: string) => rows?.find(item => item[0] === stage)?.[1] ?? "";
const facts = row("Facts supplied to the AI"), suggestion = row("AI suggestion");
if (!facts || !suggestion) throw new Error("The retail example table is missing its facts or suggestion row.");

const outDir = `public/guides/${slug}`;
async function saveWebp(png: Buffer, name: string) {
  const image = await loadImage(png);
  const canvas = createCanvas(image.width, image.height);
  canvas.getContext("2d").drawImage(image, 0, 0);
  await writeFile(`${outDir}/${name}.webp`, canvas.toBuffer("image/webp", 82));
  console.log(`${outDir}/${name}.webp  ${image.width} × ${image.height}`);
}

async function main() {
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  await page.route("**/api/**", route => route.request().url().includes("/api/improve-bullets")
    ? route.fulfill({ json: { description: suggestion } })
    : route.abort());
  await page.goto(`${base}/cv-examples/retail-assistant/`);
  await page.getByRole("button", { name: "Edit this example" }).first().click();
  await page.waitForURL(/\/editor\/$/);
  await page.getByRole("button", { name: /^Work experience/ }).first().click();
  const card = page.locator(".entry-card").first();
  await card.getByLabel("Job title").fill("Sales Assistant (weekend)");
  await card.getByLabel("Company").fill("Greenway Garden Centre");
  await card.getByLabel("Dates").fill("Mar 2025 – Present");
  await card.getByLabel("Description").fill(facts);
  await card.getByLabel("Description").blur();
  await card.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await saveWebp(await card.screenshot({ animations: "disabled" }), "entry");
  await card.getByRole("button", { name: "Improve bullet points with AI" }).click();
  await card.getByLabel("Suggested bullet points").waitFor();
  await card.getByLabel("Suggested bullet points").blur();
  await saveWebp(await card.locator(".ai-summary-result").screenshot({ animations: "disabled" }), "review");
} finally {
  await browser.close();
}
}
main().catch(error => { console.error(error); process.exitCode = 1; });
