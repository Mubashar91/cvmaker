import { mkdir, writeFile } from "node:fs/promises";
import { Document, Packer, Paragraph } from "docx";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pdfMake = require("pdfmake/build/pdfmake");
pdfMake.addVirtualFileSystem(require("pdfmake/build/vfs_fonts"));
const lines = [
  "Jordan Taylor",
  "Headline: Software Engineer",
  "jordan@example.com | +44 7700 900123",
  "Location: Bristol, UK",
  "https://github.com/jordantaylor",
  "", "Professional Summary",
  "Software engineer building accessible web applications and useful developer tools.",
  "", "Work Experience",
  "Software Engineer | Example Studio | 2022 - Present",
  "Built accessible interfaces and improved the release workflow.",
  "", "Junior Developer | Example Labs | 2020 - 2022",
  "Maintained internal tools and wrote clear documentation.",
  "", "Education",
  "BSc Computer Science | Example University | 2017 - 2020",
  "Completed a final-year project on accessible interfaces.",
  "", "Skills",
  "TypeScript, React, Accessibility, Testing",
  "", "Projects",
  "Community Directory | Personal project | 2023",
  "Created a searchable directory for a local volunteer group.",
  "", "Certifications",
  "Web Accessibility Foundations | Example Training | 2024",
  "Completed practical accessibility training.",
];
async function main() {
await mkdir("tests/fixtures", { recursive: true });
await writeFile("tests/fixtures/sample.docx", await Packer.toBuffer(new Document({ sections: [{ children: lines.map(line => new Paragraph(line)) }] })));
const def = { defaultStyle: { font: "Roboto", fontSize: 11 }, content: lines.map(line => ({ text: line || " ", margin: [0, 0, 0, 3] })) };
await new Promise<void>(resolve => pdfMake.createPdf(def).getBuffer(async (buffer: Buffer) => { await writeFile("tests/fixtures/sample.pdf", buffer); resolve(); }));
await new Promise<void>(resolve => pdfMake.createPdf({ content: [{ canvas: [{ type: "rect", x: 10, y: 10, w: 300, h: 300, color: "#dddddd" }] }] }).getBuffer(async (buffer: Buffer) => { await writeFile("tests/fixtures/scanned.pdf", buffer); resolve(); }));
console.log("Created illustrative sample PDF, DOCX, and image-only PDF in tests/fixtures.");
}
main().catch(error => { console.error(error); process.exitCode = 1; });
