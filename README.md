# Folio — free CV maker

A mobile-friendly Next.js + TypeScript CV maker. All CV processing happens locally in the browser, with no account, backend, paid API, analytics, or active advertisements.

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

The build produces a static website in `out/`. `npm start` serves that output locally. It can also be hosted by any static hosting service. Keep the self-hosted `pdf.worker.min.mjs` file: it is copied into `public/` by the install script and included in the export.

Use `npm run build` so its postbuild step also runs. On Windows, the installed Next.js version exports some route-prefetch files into nested folders while its client requests flat filenames. `scripts/normalize-static-export.mjs` adds the matching flat files without altering the original output, so client navigation works on ordinary static hosts. On platforms where Next already writes flat files, the step makes no changes.

## What works

- Create a blank CV or import a real text-based PDF or DOCX (15 MB maximum; PDFs up to 40 pages).
- Extract and edit contact information, profile, experience, education, skills, projects, and certifications.
- Twenty-four free layouts, including Academic, Monogram, Horizon, Ribbon, Outline, and Editorial alongside the original eighteen. Switching keeps your content. The homepage features the six new designs; the full catalogue includes every layout.
- Optional profile photo, cropped to a circle in the browser (never uploaded) and shown by eight photo layouts (Sidebar, Executive, Atlas, Duo, Elegant, Portrait, Monogram, Horizon); other layouts ignore it.
- Ten print-safe accent colours, or each template’s own default. The colour is saved with drafts.
- Live, paginated A4 preview rendered from the generated PDF, including all pages.
- Add, remove, and reorder entries; reorder or hide sections. Empty sections are automatically excluded.
- Download a selectable-text PDF without an account, advertisement, or watermark. Long paragraphs flow across pages.
- Explicitly save one draft in browser local storage, resume it from the home page, or delete it. Download and restore portable JSON drafts.
- CV advice articles, a privacy page, and disabled advertising slots on home/tips pages only.

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

Template metadata (name, style, default colour, display order) lives in `src/lib/model.ts`; layouts live in `src/lib/pdf-document.ts`. Section headings are kept with their first line of content, so a heading never ends a page on its own.

The home page and template picker use real PDF renders of fictional sample content, generated by the same layout code as the editor. They contain no uploaded personal data. When changing the PDF layouts or demonstration content, refresh the committed thumbnails with:

```powershell
npm run templates:preview
```

Full sample PDFs are also written to the ignored `.local-review/templates/` directory for local visual review. Photo layouts use a fictional illustrated portrait (`scripts/assets/sample-avatar.svg`) in these previews only. After regenerating, bump `PREVIEW_VERSION` in `src/lib/previews.ts` so browsers fetch the new images.

## Privacy and drafts

The editor uses React state in the current tab. It does not automatically persist personal information. `Save draft` writes `folio-draft-v1` to local storage; `Delete saved draft` removes it without clearing the open CV. Browser reloads discard unsaved edits. A downloaded JSON or PDF is a separate local file, and must be deleted using the device's file manager.

The PDF worker, fonts, and application libraries are served locally. There are no analytics SDKs or third-party requests in the default app. An end-to-end test monitors requests during import and download. Ordinary hosting request logs may contain IP addresses and asset paths, but never CV content from this app.

## Advertising configuration

`src/config/ads.ts` is deliberately disabled:

```ts
export const adConfig = {
  enabled: false,
  providerEmbedUrl: null,
};
```

To prepare a provider, set a provider's isolated embed URL and enable the flag after reviewing its privacy and consent requirements. The `AdSlot` component labels the placement **Advertisement** and uses a sandboxed iframe with no referrer. It is mounted only on home/tips pages, never in the editor or PDF code. Never add CV data, drafts, identifiers, or extraction text to an embed URL or ad service. Providers that require scripts in the parent page need a separate, carefully reviewed integration; this scaffold does not inject them.

## SEO and sharing

Every public page has a unique title and description. Each template has a statically rendered detail page with layout information, intended uses, and links to other designs. The catalogue links to all templates by style. The editor is marked `noindex, follow` and excluded from the sitemap.

Social previews include a 1200 × 630 image for the homepage, catalogue, guide index, every template, and every writing guide. These are generated from the actual CV previews and site typography. The app icon is also generated locally; no image service or paid API is required.

```powershell
npm run templates:preview
npm run seo:assets
npm run build
npm run seo:check
```

Production builds use `https://freecvmaker.online`, configured through `NEXT_PUBLIC_SITE_URL` in `.env.production`. This enables absolute canonical URLs, Open Graph URLs, sitemap entries, image sitemap entries, and URL-based WebSite, WebApplication, template, collection, Article, and breadcrumb structured data for that domain. Development keeps public URLs unset unless you override them. To change the production address, update `.env.production` or the hosting environment variable and rebuild. Use a complete origin without a path.

Optionally set `GOOGLE_SITE_VERIFICATION` to the content value of your Search Console HTML verification tag. After deploying, run the strict launch check and submit the real `/sitemap.xml` address in Search Console:

```powershell
npm run build
npm run seo:check -- --require-origin
```

The audit checks every exported page for unique titles and descriptions, a single main heading, indexing policy, preview assets, and image alternative text. With an origin configured, it also verifies canonical and social URLs, structured data, breadcrumbs, the complete sitemap, and the robots.txt sitemap reference. This follows [Google’s SEO starter guidance](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) and [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Indexing and search placement are controlled by search engines.

## Tests

```powershell
npx playwright install chromium
npm run test:fixtures
npm test
npm run test:pdf
npm run typecheck
npm run build
```

Playwright starts the development server automatically when port 3000 is available. Generated fixtures are illustrative and contain no real personal information. Tests cover:

- PDF and DOCX upload → correct a name → switch through all 24 templates and pick an accent colour → download and parse the finished PDF.
- All imported sections present, no sample-template content in exports, and no third-party network requests.
- Long, multi-page CV exports across all 24 layouts, including the final paragraph.
- Image-only/corrupt-file errors and manual entry.
- Entry reorder/removal, section hiding, empty-section omission, local draft save/resume/delete, and portable draft restore.
- Mobile home/editor width, live preview, tips routes, and hidden ad spaces.

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
- `src/lib/pdf-document.ts`: all 24 PDF layouts, accent colours, typography, entry styling, and pagination.
- `src/lib/pdf.ts`: browser font loading and download generation.
- `src/lib/pdf-fonts.ts`: embedded font registry.
- `src/lib/template-sample.ts`: fictional content used only for template thumbnails.
- `src/components/pdf-preview.tsx`: PDF.js live preview.
- `src/lib/model.ts`: shared CV schema, template list, accent colours, and draft validation.
- `src/app/globals.css`, `templates.css`, `editor.css`: the site design (self-hosted Archivo variable font from `@fontsource-variable/archivo`).
- `src/config/ads.ts`: disabled provider configuration.
