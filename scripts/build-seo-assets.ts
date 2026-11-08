import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import { templates } from "../src/lib/model";
import { tips } from "../src/lib/tips";
import { templateCollections } from "../src/lib/template-collections";
import { informationPages, siteOperator } from "../src/lib/site-info";
import { cvExamples } from "../src/lib/cv-examples";

const GREEN = "#10352b", GOLD = "#f3b53f", PAPER = "#f8f7f2";
GlobalFonts.registerFromPath("public/fonts/tinos/Tinos-Italic.ttf", "Folio Serif");
GlobalFonts.registerFromPath("node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2", "Folio Sans");

async function socialCard(file: string, title: string, subtitle: string, template?: string, category = "Free CV maker") {
  const canvas = createCanvas(1200, 630), ctx = canvas.getContext("2d");
  ctx.fillStyle = GREEN; ctx.fillRect(0, 0, 1200, 630);
  ctx.strokeStyle = "#2b5649"; ctx.lineWidth = 1;
  for (const radius of [200, 245, 290]) { ctx.beginPath(); ctx.arc(985, 315, radius, 0, Math.PI * 2); ctx.stroke(); }
  ctx.fillStyle = GOLD; ctx.fillRect(56, 49, 23, 30);
  ctx.fillStyle = PAPER; ctx.font = '700 43px "Folio Sans", Arial, sans-serif'; ctx.fillText("folio.", 91, 80);
  ctx.fillStyle = "#b7c9be"; ctx.font = '22px "Folio Sans", Arial, sans-serif'; ctx.fillText(category, 57, 131);
  const maxWidth = template ? 650 : 1030;
  const lines: string[] = []; let line = "";
  ctx.font = '600 65px "Folio Sans", Arial, sans-serif';
  for (const word of title.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) { lines.push(line); line = word; } else line = next;
  }
  if (line) lines.push(line);
  ctx.fillStyle = PAPER;
  lines.forEach((text, index) => ctx.fillText(text, 56, 240 + index * 76));
  ctx.fillStyle = GOLD; ctx.font = 'italic 37px "Folio Serif", Georgia, serif';
  ctx.fillText(subtitle, 57, Math.max(370, 260 + lines.length * 76));
  ctx.fillStyle = "#b7c9be"; ctx.font = '22px "Folio Sans", Arial, sans-serif';
  ctx.fillText("No sign-up. No watermark. Your details stay yours.", 57, 552);
  ctx.fillStyle = GOLD; ctx.fillRect(0, 613, 1200, 17);
  if (template) {
    const image = await loadImage(await readFile(template.includes("/") ? template : `public/templates/${template}.webp`));
    ctx.save(); ctx.translate(939, 315); ctx.rotate(.045);
    ctx.shadowColor = "#00000055"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 13;
    ctx.fillStyle = "#fff"; ctx.fillRect(-156, -220, 312, 441);
    ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    ctx.drawImage(image, -156, -220, 312, 441); ctx.restore();
  }
  await writeFile(`public/social/${file}.png`, canvas.toBuffer("image/png"));
}

async function main() {
  await mkdir("public/social/guides", { recursive: true });
  await mkdir("public/social/collections", { recursive: true });
  await mkdir("public/social/examples", { recursive: true });
  await socialCard("folio", "Your story deserves a great CV.", `${templates.length} templates. Entirely free.`, "monogram");
  await socialCard("templates", `${templates.length} free CV templates.`, "Find a first impression that feels like you.", "horizon", "CV templates & resume layouts");
  await socialCard("tips", "A little guidance for your next chapter.", "Practical CV advice, from start to send.", undefined, "CV writing guides");
  await socialCard("about", "A useful tool. A person behind it.", siteOperator.name, undefined, "About Folio");
  await socialCard("contact", "Let’s make Folio more useful.", "Questions, corrections, and ideas are welcome.", undefined, "Contact the maintainer");
  await socialCard("editorial-policy", "Useful guidance. Clear standards.", "How we approach our guides and corrections.", undefined, "Folio editorial standards");
  await socialCard("privacy", "Your details. Your device. Your choice.", "Understand how your information is handled.", undefined, "Folio privacy policy");
  await socialCard("terms", "A clear understanding.", "Your CV, your choices, and the service we provide.", undefined, "Folio terms of use");
  for (const template of templates) await socialCard(template.id, `${template.name} CV template.`, "Edit online. Download your PDF for free.", template.id, `${template.style} CV template`);
  for (const collection of templateCollections) await socialCard(`collections/${collection.slug}`, collection.title, `${collection.templates.length} designs. Free to make your own.`, collection.templates[0], "Find your CV format");
  await socialCard("cv-examples", "CV examples for real jobs.", "Complete examples you can edit for free.", "public/examples/nurse.webp", "CV examples by job");
  for (const example of cvExamples) await socialCard(`examples/${example.slug}`, `${example.job} CV example.`, "Fictional example · free to edit", `public/examples/${example.slug}.webp`, example.category);
  for (const tip of tips) await socialCard(`guides/${tip.slug}`, tip.title, `${tip.readTime} minute guide · By ${siteOperator.name}`, undefined, tip.category);
  const icon = createCanvas(180, 180), ctx = icon.getContext("2d");
  ctx.fillStyle = GREEN; ctx.fillRect(0, 0, 180, 180);
  ctx.fillStyle = GOLD; ctx.beginPath(); ctx.moveTo(53, 34); ctx.lineTo(104, 34); ctx.lineTo(129, 60); ctx.lineTo(129, 146); ctx.lineTo(53, 146); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = GREEN; ctx.lineWidth = 6;
  for (const [y, end] of [[83, 110], [102, 110], [121, 96]]) { ctx.beginPath(); ctx.moveTo(70, y); ctx.lineTo(end, y); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(104, 34); ctx.lineTo(104, 60); ctx.lineTo(129, 60); ctx.stroke();
  await writeFile("public/apple-touch-icon.png", icon.toBuffer("image/png"));
  console.log(`Generated ${templates.length + templateCollections.length + tips.length + informationPages.length + cvExamples.length + 4} social cards (1200 × 630) and the 180 × 180 app icon.`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
