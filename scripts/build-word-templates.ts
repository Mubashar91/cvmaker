import { mkdir, writeFile } from "node:fs/promises";
import { allLandingPages } from "../src/lib/landing-pages";
import { sampleCV } from "../src/lib/sample-cv";
import { generateDOCX } from "../src/lib/docx-export";

// Writes each scheduled page's worked example as an editable Word file in public/word-templates/,
// using the same Word export as the editor. Run after changing an example: npm run word:templates
async function main() {
  await mkdir("public/word-templates", { recursive: true });
  let written = 0;
  for (const page of allLandingPages.filter(item => item.download)) {
    const blob = await generateDOCX(sampleCV(page.example.cv));
    await writeFile(`public/word-templates/${page.slug}.docx`, Buffer.from(await blob.arrayBuffer()));
    written++;
  }
  console.log(`Wrote ${written} Word templates to public/word-templates/.`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
