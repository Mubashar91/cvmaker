# Folio — free CV maker

A mobile-friendly Next.js + TypeScript CV maker. CV import, editing, and PDF generation happen locally in the browser, with no account, analytics, or active advertisements. Optional AI summary improvement uses a server endpoint and an OpenAI API key.

## Run locally

Use Node.js 22.13+ (Node.js 24 LTS recommended) and npm.

```powershell
npm install
npm run dev
```

Open **http://localhost:3000**.

For an optimized production build:

```powershell
npm run build
npm start
```

The build produces a static website in `out/`. `npm start` serves that output and the optional AI endpoints locally. The website can also be hosted by any static hosting service; the AI features additionally require the server endpoints described below. Keep the self-hosted `pdf.worker.min.mjs` file: it is copied into `public/` by the install script and included in the export.

## AI features

There are two optional AI features, both off until `OPENAI_API_KEY` is configured:

- **Improve summary with AI** — in the editor, open **Profile**, write a summary, and choose **Improve summary with AI**. The suggestion can be edited, applied, or discarded. Applying a suggestion marks the CV as changed; save a draft to keep it. A suggestion cannot overwrite text you changed while the request was running.
- **AI CV job match** (`/ai-cv-job-match/`) — paste a job description, add CV text (the CV open in the editor, a PDF/DOCX read on the device, or pasted text), and choose **Check my match**. The report lists requirements the CV demonstrates with evidence, missing or unclear requirements, suggested improvements, and optional wording changes to review.

To enable real requests locally, create `.env.local` (ignored by Git) and add `OPENAI_API_KEY=your-key`, then restart `npm run dev` or `npm start`. Never use a `NEXT_PUBLIC_` variable for the key or paste it into chat. Without a key, both actions report that AI is not available and leave the visitor's text untouched.

`api/improve-summary.mjs` and `api/cv-job-match.mjs` are Node.js/Vercel serverless endpoints. On Vercel, configure the key in server environment settings and redeploy; the endpoints read `OPENAI_API_KEY` or, as this project's Vercel settings name it, `oprnaikey`. Other static-only hosts need a Node.js service or serverless function serving `/api/improve-summary` and `/api/cv-job-match`; uploading `out/` alone does not enable AI. The local dev wrapper runs the same handlers alongside Next, and the static production server also serves them. No runtime secret is included in the static export.

Only the text the visitor chose is sent to OpenAI's [Responses API](https://developers.openai.com/api/docs/guides/text), using `gpt-5-mini`, `store: false`, a bounded response size, and a timeout: the summary and professional title for summary improvement, or the CV text and job advert for the job match (which also uses a strict JSON schema for the report). The prompts instruct AI to preserve facts and never invent qualifications or achievements. Requests are limited per IP per server instance (five per minute for summaries, three per minute for match reports); a production deployment can add hosting-level limits across instances, and an OpenAI spend limit is recommended. These features make billable API requests when enabled. The browser never contacts OpenAI directly. Tests use mocked responses and do not need an API key.

Use `npm run build` so its postbuild step also runs. On Windows, the installed Next.js version exports some route-prefetch files into nested folders while its client requests flat filenames. `scripts/normalize-static-export.mjs` adds the matching flat files without altering the original output, so client navigation works on ordinary static hosts. On platforms where Next already writes flat files, the step makes no changes.

## What works

- Create a blank CV or import a real text-based PDF or DOCX (15 MB maximum; PDFs up to 40 pages).
- Extract and edit contact information, profile, experience, education, skills, languages, projects, certifications, and one renamable extra section (Interests, Volunteering, Awards, References, Referees…). Imports recognise Languages, Interests, Awards, Volunteering, and References/Referees headings.
- Forty free layouts. The newest sixteen — Linear, Aurora, Atelier, Regent, Summit, Compass, Halo, Clarity, Prism, Gazette, Heritage, Ledger, Mosaic, Tide, Edge, and Signature — are marked New and featured on the homepage; the full catalogue includes every layout. Switching keeps your content.
- Optional profile photo, cropped to a circle in the browser (never uploaded) and shown by thirteen photo layouts (Sidebar, Executive, Atlas, Duo, Elegant, Portrait, Monogram, Horizon, Summit, Compass, Halo, Tide, Aurora); other layouts ignore it.
- Ten print-safe accent colours, any custom colour, or each template’s own default. Custom colours are darkened just enough to keep 4.5:1 contrast on white (`readableAccent` in `src/lib/model.ts`).
- Body typeface (template default, sans, or serif) and document spacing (compact, balanced, airy). Colour, typeface, and spacing are saved with drafts.
- Section-by-section writing guidance and a Next button that walks through every section, then on to the design. Per-section placeholders, a profile word count, gentle email/phone/link checks after a field is left (never blocking), a language adder with plain proficiency levels, and predefined skill ideas for 22 professions (guessed from the professional title).
- Live, paginated A4 preview rendered from the generated PDF, including all pages.
- Add, remove, and reorder entries; reorder or hide sections. Empty sections are automatically excluded.
- Download a selectable-text PDF without an account, advertisement, or watermark. Long paragraphs flow across pages.
- Explicitly save one draft in browser local storage, resume it from the home page, or delete it. Download and restore portable JSON drafts.
- Search templates by name, style, or application intent; filter by columns and style; sort by newest or name. Full-size previews support previous/next controls, arrow keys, Escape, and focus restoration.
- Review CV checks visible content for missing names, malformed contact details, incomplete entries, dates, descriptions, long profiles, and placeholder phrases. Suggestions link directly to the relevant editor fields.
- Read and download a plain-text CV for application forms. Hidden and empty sections are omitted, and section order is preserved.
- Six static template collections (ATS-friendly, professional, modern, simple, student, and photo), with original guidance, curated designs, breadcrumbs, social images, and structured data.
- Thirty-seven CV and resume guides, including 20 keyword-focused blog posts on free tools, writing examples, students and graduates, professions, and country applications. Each has a real-render image, FAQs, related reading, and a relevant tool. All 20 blog posts have researched revisions, section citations, source lists, and reference-check dates; see [BLOG-RESEARCH.md](BLOG-RESEARCH.md).
- Sixteen job-specific CV examples, including student, data analyst, graphic designer, and frontend developer.
- Free browser tools (no AI, no server): a cover letter maker (three templates, three layouts, A4 or US Letter PDF, copy, print, optional browser save), a resume keyword checker (job description vs CV, reads PDF/DOCX on the device), a resume summary builder, a resume objective generator, and skills suggestions for 22 jobs. Summary, objective, and skills results can be added to the CV open in the editor. The separate AI CV job match tool is the one tool that uses the AI endpoint described above.
- A student landing page (`/cv-maker-for-students/`) that opens the editor with the Student template and an education-first section order.
- A privacy page, and disabled advertising slots on home/tips pages only.

## Import behavior and limits

PDF.js extracts PDF text; Mammoth extracts DOCX paragraphs. A deterministic parser recognizes common English section headings and common contact formats. It does **not** call AI or invent missing information. The original extracted text remains visible for review. A heading like `Job title | Company | 2022 - Present` is parsed into separate fields; ambiguous information stays in editable text rather than being guessed into a company or date field.

Complex columns, tables, uncommon headings, and inconsistent spacing can require manual corrections or splitting entries. Always review imported data. Scanned/image-only, corrupt, and password-protected files show an explanation and a manual-entry option. OCR is not included. No file is uploaded to a server.

PDFs use embedded Tinos serif and Roboto sans-serif fonts, supporting Latin, Greek, and Cyrillic. These fonts do not cover every writing system or emoji. Additional writing systems require appropriate embedded fonts and shaping support. Tinos is self-hosted in `public/fonts/tinos/`, with its SIL Open Font License included. CV contents are never sent to a font service.

## Templates

Classic follows a traditional serif CV: a centered uppercase name, centered section headings with fine rules, bold employers/institutions, italic roles/qualifications, right-aligned dates, and indented bullets. It is the default for new CVs.

| Template | Style | Layout |
| --- | --- | --- |
| Classic | Traditional | Centered serif, black and white |
| Modern | Modern | Full-width profile, two-column body |
| Sidebar | Modern | Full-height colour panel (photo or initials, contact, education, skills, certifications) beside a main column |
| Executive | Traditional | Full-bleed colour header band (optional photo), formal single column |
| Atlas | Modern | Light tinted panel on the right (optional photo, contact, education, skills, certifications) |
| Timeline | Modern | Dates in a left gutter beside a continuous vertical line with entry markers |
| Duo | Modern | Two-tone split header (name and optional photo / contact details) |
| Professional | Traditional | Formal serif with fine rules |
| Swiss | Simple | Large name, heavy rule above each section, labels in a left column |
| Minimal | Simple | Section labels in a left rail |
| Tech | Simple | Skills rendered as tags (grouped by “Category:” lines) |
| Compact | Simple | Dense single column; title and employer on one line |
| Elegant | Traditional | Photo or initials monogram, spaced serif capitals, centered titles between rules |
| Portrait | Creative | Large round photo or initials, dotted section leaders |
| Creative | Creative | Numbered editorial serif headings |
| Corner | Creative | Geometric colour corners, short accent rules under titles |
| Bold | Creative | Large name, solid colour section tabs, accent strip on every page |
| Student | Simple | Academic section bands |
| Academic | Traditional | Centered serif masthead, double rules, institution-led entries |
| Monogram | Modern | Square initials tile or optional photo, vertical section accents |
| Horizon | Modern | Softly tinted header, optional photo, section labels beside fine rules |
| Ribbon | Creative | Full-width colour section ribbons, bold name, italic professional title |
| Outline | Simple | Framed introduction, outlined section headings, restrained typography |
| Editorial | Creative | Oversized serif name, large chapter numbers, strong accent rule |
| Summit | Modern | Full-width colour header (optional photo or initials) above a tinted side column with icon contact details |
| Compass | Modern | Icon in a colour circle for every section, two-column icon contact grid, optional photo |
| Halo | Modern | Photo or initials centred over the edge of a colour band, centred introduction and headings |
| Clarity | Simple | Plain single column with standard headings and no graphics, for online application systems |
| Prism | Creative | Angled colour header with a faceted edge, slanted section markers |
| Gazette | Creative | Newspaper masthead, italic profile lede, two columns divided by a vertical rule |
| Heritage | Traditional | Double-ruled frame on every page, spaced serif capitals, diamond ornaments |
| Ledger | Traditional | Right-aligned section labels beside one continuous vertical rule |
| Mosaic | Modern | Tinted contact tiles; education, skills, and certifications as equal-height tiles |
| Tide | Creative | Two-layer wave header, optional photo, wave section markers |
| Edge | Modern | Colour stripe down the page edge with lines reaching to the name and each heading |
| Signature | Traditional | Large italic serif name, right-aligned contact block, italic serif section titles |

Template metadata (name, style, default colour, display order) lives in `src/lib/model.ts`; layouts live in `src/lib/pdf-document.ts`; catalogue copy for each template page lives in `src/lib/template-details.ts`. Vector icons used by Summit and Compass are Lucide outlines (ISC licence) in `src/lib/pdf-icons.ts`. Section headings are kept with their first line of content, so a heading never ends a page on its own.

The home page and template picker use real PDF renders of fictional sample content, generated by the same layout code as the editor. They contain no uploaded personal data. When changing the PDF layouts or demonstration content, refresh the committed thumbnails with:

```powershell
npm run templates:preview
```

Full sample PDFs are also written to the ignored `.local-review/templates/` directory for local visual review. Photo layouts use a fictional illustrated portrait (`scripts/assets/sample-avatar.svg`) in these previews only. After regenerating, bump `PREVIEW_VERSION` in `src/lib/previews.ts` so browsers fetch the new images.

## Privacy and drafts

The editor uses React state in the current tab. It does not automatically persist personal information. Drafts saved before the Languages and Additional information sections existed are upgraded when opened (`upgradeCV` / `parseCV` in `src/lib/model.ts`); both sections start empty. The header shows “Unsaved changes” after edits to a saved draft. `Save draft` writes `folio-draft-v1` to local storage; `Delete saved draft` removes it without clearing the open CV. Browser reloads discard unsaved edits. A downloaded JSON or PDF is a separate local file, and must be deleted using the device's file manager.

The PDF worker, fonts, and application libraries are served locally. There are no analytics SDKs or third-party requests during ordinary import and download; an end-to-end test monitors this. Choosing an AI feature explicitly sends only the text the visitor provided through the server to OpenAI: the summary and professional title for summary improvement, or the CV text and job advert for the job match. The handlers do not log submitted text. Ordinary hosting request logs may contain IP addresses and asset paths. The privacy page explains the AI exception and provider data practices.

## Site information and publisher transparency

- `/about/` introduces Muhammad Mubashar Shahzad using the professional background supplied in his CV: frontend experience, BIT education, skills, and selected project experience. It does not publish the original CV, private phone number, or street address, and does not imply employer sponsorship.
- `/contact/` provides a real email contact and topic-specific email drafts for bugs, corrections, privacy questions, and feedback. There is no simulated form submission or promised response time.
- `/editorial-policy/` explains the scope of the guides, fictional examples, sources, software assistance, corrections, and advertising independence. Guide bylines link to it.
- `/privacy/` covers on-device processing, optional drafts, local downloads, page requests, contact emails, cookies, and the current disabled advertising state.
- `/terms/` explains use of the tool, content responsibilities, backups, import limitations, and the absence of hiring or parsing guarantees.

Public operator details and information-page metadata live in `src/lib/site-info.ts`. Update that file if the public contact email changes. Shared information-page presentation lives in `src/components/site-info-page.tsx` and `src/app/information.css`. All five pages have breadcrumbs, social images, canonical URLs, structured data, sitemap entries, and links from the footer. The About page includes Person structured data; the Contact page identifies the same email shown to visitors.

These pages support transparency, but do not guarantee advertising approval. Before an AdSense application, publish the completed site and verify its actual navigation, contact address, original content, and current privacy practices against [Google’s site-readiness guidance](https://support.google.com/adsense/answer/7299563?hl=en).

## Advertising configuration

`src/config/ads.ts` is deliberately disabled:

```ts
export const adConfig = {
  enabled: false,
  providerEmbedUrl: null,
};
```

To prepare a provider, set a provider's isolated embed URL and enable the flag after reviewing its privacy and consent requirements. The `AdSlot` component labels the placement **Advertisement** and uses a sandboxed iframe with no referrer. It is mounted only on home/tips pages, never in the editor or PDF code. Never add CV data, drafts, identifiers, or extraction text to an embed URL or ad service. Providers that require scripts in the parent page need a separate, carefully reviewed integration; this scaffold does not inject them.

The existing switch does **not** implement Google AdSense. No publisher ID, AdSense script, fabricated `ads.txt` entry, or consent popup has been added. Enabling AdSense requires the owner’s real account configuration, accurate vendor disclosures, and consent management where required. Review Google’s [advertising privacy disclosures](https://support.google.com/adsense/answer/1348695?hl=en) and [consent guidance](https://support.google.com/adsense/answer/7670013?hl=en) before loading an advertising script. The privacy page explicitly distinguishes the current site from possible future advertising.

## SEO and sharing

The long-tail keyword clusters, existing content destinations, new first-job page and bullet point tool, deferred AI targets, and measurement workflow are documented in [SEO-STRATEGY.md](SEO-STRATEGY.md).

Every public page has a unique title and description. Each template has a statically rendered detail page with layout information, intended uses, and links to other designs. The catalogue links to all templates by style. The editor is marked `noindex, follow` and excluded from the sitemap.

Social previews include a 1200 × 630 image for the homepage, catalogue, guide index, every template, every writing guide, every template collection, and all five information pages. These are generated from the actual CV previews and site typography. The app icon is also generated locally; no image service or paid API is required.

```powershell
npm run templates:preview
npm run seo:assets
npm run build
npm run seo:check
```

Production builds use `https://www.freecvmaker.online` (the host Vercel serves; the bare domain redirects to it), configured through `NEXT_PUBLIC_SITE_URL` in `.env.production`. This enables absolute canonical URLs, Open Graph URLs, sitemap entries, image sitemap entries, and URL-based WebSite, WebApplication, template, collection, Article, and breadcrumb structured data for that domain. Development keeps public URLs unset unless you override them. To change the production address, update `.env.production` or the hosting environment variable and rebuild. Use a complete origin without a path.

Optionally set `GOOGLE_SITE_VERIFICATION` to the content value of your Search Console HTML verification tag. After deploying, run the strict launch check and submit the real `/sitemap.xml` address in Search Console:

```powershell
npm run build
npm run seo:check -- --require-origin
```

The audit checks every exported page for unique titles and descriptions, a single main heading, indexing policy, preview assets, and image alternative text. With an origin configured, it also verifies canonical and social URLs, structured data, breadcrumbs, the complete sitemap, internal page links, category list consistency, and the robots.txt sitemap reference. This follows [Google’s SEO starter guidance](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) and [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Indexing and search placement are controlled by search engines.

## Tests

```powershell
npx playwright install chromium
npm run test:fixtures
npm test
node --test tests/ai-summary-api.mjs
npm run test:pdf
npm run typecheck
npm run build
```

Playwright starts the development server automatically when port 3000 is available. Generated fixtures are illustrative and contain no real personal information. Tests cover:

- PDF and DOCX upload → correct a name → switch through all 40 templates and pick an accent colour → download and parse the finished PDF.
- All imported sections present, no sample-template content in exports, and no third-party network requests.
- Long, multi-page CV exports across all 40 layouts, including the final paragraph.
- Image-only/corrupt-file errors and manual entry.
- Entry reorder/removal, section hiding, empty-section omission, local draft save/resume/delete, and portable draft restore.
- Mobile home/editor width, live preview, tips routes, and hidden ad spaces.
- Template search/reset, layout filtering, sorting, modal keyboard navigation, and focus restoration.
- CV review suggestions, direct field correction, hidden-content handling, and plain-text downloads.
- All six category pages and viewport overflow at 320px, 390px, and 768px.

Screenshot artifacts are written into `test-results/`. PDF.js may report optional Node.js font warnings while tests extract PDF text; browser preview uses its bundled embedded fonts.

If you already have Google Chrome installed, you can use it without downloading Playwright's Chromium build:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chrome'
npm test
```

## Main files

- `src/app/page.tsx`: home page and onboarding.
- `src/app/editor/page.tsx`: editing, imports, drafts, and download controls.
- `src/lib/import-cv.ts`: browser file extraction and conservative parsing.
- `src/lib/photo.ts`: on-device photo crop to a circular PNG.
- `src/lib/pdf-document.ts`: all 40 PDF layouts, accent colours, typography, entry styling, and pagination.
- `src/lib/pdf-icons.ts`: outline icons embedded as SVG in the PDF.
- `src/lib/pdf.ts`: browser font loading and download generation.
- `src/lib/pdf-fonts.ts`: embedded font registry.
- `src/lib/template-sample.ts`: fictional content used only for template thumbnails.
- `src/components/pdf-preview.tsx`: PDF.js live preview.
- `src/lib/model.ts`: shared CV schema, template list, accent colours, and draft validation.
- `src/app/globals.css`, `templates.css`, `editor.css`: the site design (self-hosted Archivo variable font from `@fontsource-variable/archivo`).
- `src/config/ads.ts`: disabled provider configuration.
- `src/lib/tips.ts`, `guides-early-career.ts`, `guides-applications.ts`, `guides-country.ts`, `guide-types.ts`: guide content. Text may contain internal links as `[text](/path/)` (`src/lib/rich-text.ts`).
- `src/lib/tools.ts`: the free tools registry used by navigation, the homepage, and the tools hub.
- `src/lib/cover-letter.ts`, `cover-letter-pdf.ts`: cover letter templates and PDF layouts. `npm run letters:preview` renders `public/cover-letters/*.webp`.
- `src/lib/keyword-match.ts`, `statements.ts`, `skills-library.ts`: keyword comparison, summary/objective sentence patterns, and predefined skills.
- `src/lib/pdf-engine.ts`: shared pdfmake loader, so the cover letter page does not load the 40 CV layouts.
- `src/components/tool-page.tsx`, `tool-fields.tsx`: shared tool page layout and form controls. `src/app/tools.css`: tools, guides index, student page, and editor additions.
