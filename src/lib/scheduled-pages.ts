/**
 * Pages that go live on a set date. This is the one place to change a go-live date.
 *
 * The site is a static export, so "live" is decided when the site is built: a page is part of
 * the build (its route, sitemap entry, and every internal link to it) only once its date has
 * started in Asia/Karachi. `.github/workflows/daily-rebuild.yml` rebuilds production every day
 * at 00:30 Karachi time, so each page appears on its date without anyone deploying by hand.
 *
 * Preview: `npm run dev`, or a build with SHOW_SCHEDULED=1 (set it on Vercel for Preview
 * deployments only), includes every scheduled page, marked noindex with a "Scheduled" banner.
 * PUBLISH_NOW=YYYY-MM-DD (or an ISO time) builds the site as it will look on that date.
 */
export interface ScheduledPage {
  kind: "landing" | "cv-example";
  slug: string;
  path: string;
  /** Page title without the " | Folio" suffix: 52 characters at most. */
  title: string;
  /** Meta description: 120 to 155 characters. */
  description: string;
  /** Go-live date, YYYY-MM-DD, starting at 00:00 Asia/Karachi. */
  publishAt: string;
}

const landing = (slug: string, publishAt: string, title: string, description: string): ScheduledPage => ({ kind: "landing", slug, path: `/${slug}/`, title, description, publishAt });
const example = (slug: string, publishAt: string, title: string, description: string): ScheduledPage => ({ kind: "cv-example", slug, path: `/cv-examples/${slug}/`, title, description, publishAt });

export const scheduledPages: readonly ScheduledPage[] = [
  landing("google-docs-cv-template", "2026-11-16", "Google Docs Resume Template — Free, Editable CV",
    "A free Google Docs resume template: download the editable file, open it in Google Docs, and adapt a full worked example. Or build a PDF in the CV maker."),
  landing("harvard-cv-template", "2026-11-16", "Harvard Resume Template — Free Harvard-Style CV",
    "A free Harvard-style resume template with a full worked example: education first, plain serif type, and one column. Edit it online or download Word."),
  landing("cv-template-word", "2026-11-19", "CV Template Word (UK) — Free Editable .docx CV",
    "A free UK CV template for Word: download an editable .docx with a full A4 example, change it in Microsoft Word, or build a designed PDF online instead."),
  landing("resume-template-word", "2026-11-19", "Microsoft Word Resume Template — Free Download",
    "A free Microsoft Word resume template for US jobs: download an editable .docx with a complete example, switch it to Letter size, and make it your own."),
  landing("personal-statement-examples", "2026-11-23", "CV Personal Statement Examples — 18 for UK Jobs",
    "18 CV personal statement examples by job and career stage, a template you can follow, what to leave out, and a free builder for writing your own."),
  landing("cv-format-pakistan", "2026-11-23", "CV Format in Word (Pakistan) — Free Pakistani CV",
    "Pakistani CV format with a free Word download: a full example CV, what to include for private and government jobs, and how to list Matric and FSc."),
  landing("canadian-cv-format", "2026-11-26", "Canadian CV Format for Pakistani & Indian Applicants",
    "Canadian CV format for applicants from Pakistan and India: what to remove, how to explain degrees and overseas jobs, and a full example to edit free."),
  landing("uae-cv-format", "2026-11-26", "UAE CV Format — Dubai CV Example & Free Template",
    "UAE CV format with a full Dubai CV example: visa status, notice period, photo, languages, and length, plus a free template you can edit and download."),
  landing("teacher-cv-format", "2026-11-30", "Teacher CV Format — Example for Pakistani Schools",
    "Teacher CV format for schools in Pakistan, with a full example: B.Ed and M.Ed, classes and subjects taught, results, and a free Word download."),
  example("teaching-assistant", "2026-12-03", "Teaching Assistant CV Example — Free Template & Tips",
    "A teaching assistant CV example with a SEND-focused profile, classroom experience, and safeguarding training. Edit it free and download a PDF."),
  example("chef", "2026-12-10", "Chef CV Example — Free Template & Writing Tips",
    "A chef CV example with kitchen experience, food hygiene certificates, and menu achievements, plus skills and tips. Edit it free and download a PDF."),
  example("electrician", "2026-12-14", "Electrician CV Example — Free Template & Tips",
    "An electrician CV example with NVQ Level 3, 18th Edition, and an ECS card, plus site experience and skills for UK jobs. Edit free and download a PDF."),
  example("apprentice", "2026-12-14", "Apprentice CV Example — Free Template & Writing Tips",
    "An apprentice CV example for school leavers: GCSEs, work experience, and practical skills that suit apprenticeship applications. Edit free, download a PDF."),
  example("computer-science-co-op", "2027-01-28", "Computer Science Co-op Resume Example (Canada)",
    "A computer science co-op resume example for Canada: class projects with your own part in them, courses, skills, and the work term you want. Edit it free."),
];

const KARACHI_OFFSET = "+05:00";
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** The moment a page goes live: midnight at the start of its date in Asia/Karachi. */
export function publishInstant(date: string): Date {
  if (!DATE.test(date)) throw new Error(`publishAt must be YYYY-MM-DD, got "${date}"`);
  return new Date(`${date}T00:00:00${KARACHI_OFFSET}`);
}

/** datePublished for structured data: the real go-live moment, never earlier. */
export function publishedISO(date: string): string { return `${date}T00:00:00${KARACHI_OFFSET}`; }

/** "Now" for this build. PUBLISH_NOW lets a build show the site as it will be on another date. */
export function buildNow(): Date {
  const override = process.env.PUBLISH_NOW?.trim();
  if (!override) return new Date();
  const now = new Date(DATE.test(override) ? `${override}T00:00:00${KARACHI_OFFSET}` : override);
  if (Number.isNaN(now.getTime())) throw new Error(`PUBLISH_NOW is not a valid date: "${override}"`);
  return now;
}

/** Development, or a preview build with SHOW_SCHEDULED=1, shows pages before their date. */
export function showScheduled(): boolean {
  return process.env.NODE_ENV === "development" || process.env.SHOW_SCHEDULED === "1";
}

export function scheduledPage(path: string): ScheduledPage | undefined { return scheduledPages.find(page => page.path === path); }

/** True for every unscheduled page, and for a scheduled page once its date has started. */
export function isLive(path: string, now: Date = buildNow()): boolean {
  const page = scheduledPage(path);
  return !page || publishInstant(page.publishAt) <= now;
}

/** Whether this build includes the page (and links to it): live, or a preview build. */
export function isVisible(path: string): boolean { return isLive(path) || showScheduled(); }

/** A scheduled page this build shows before its date; such a page is noindex and bannered. */
export function isEarlyPreview(path: string): boolean { return !isLive(path) && showScheduled(); }

export function scheduled(path: string): ScheduledPage {
  const page = scheduledPage(path);
  if (!page) throw new Error(`Not a scheduled page: ${path}`);
  return page;
}
