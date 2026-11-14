import { scheduledPage } from "./scheduled-pages";

// Baseline reflects the last recorded editorial release, not the current build date.
const baseline = "2026-11-11";
const changes: Record<string, string> = {
  "/ai-cv-job-match/": "2026-11-14",
  "/cv-examples/retail-assistant/": "2026-11-14",
  "/tips/us-resume-format/": "2026-11-14",
  "/templates/category/simple/": "2026-11-14",
  "/cv-examples/accountant/": "2026-11-14",
  "/cv-examples/receptionist/": "2026-11-14",
  "/cv-examples/customer-service/": "2026-11-14",
  "/cv-examples/project-manager/": "2026-11-14",
  "/cv-examples/administrator/": "2026-11-14",
  "/cv-with-no-experience/": "2026-11-14",
  "/cv-examples/nurse/": "2026-11-14",
  "/cover-letter-maker/": "2026-11-14",
  "/resume-summary-builder/": "2026-11-14",
  "/cv-maker-for-students/": "2026-11-14",
  "/templates/category/ats-friendly/": "2026-11-14",
  "/templates/student/": "2026-11-14",
  "/templates/academic/": "2026-11-14",
  "/templates/clarity/": "2026-11-14",
  "/cv-examples/": "2026-11-14",
  "/": "2026-11-14",
  "/templates/": "2026-11-14",
  "/templates/category/student/": "2026-11-12",
  "/tips/uk-cv-format/": "2026-11-12",
  "/tips/common-cv-mistakes/": "2026-11-12",
  "/tips/before-you-send/": "2026-11-12",
  "/tips/free-resume-builder-without-payment/": "2026-11-12",
  "/tips/ai-cv-maker-vs-template-builder/": "2026-11-12",
  "/tips/improve-cv-bullet-points-with-ai/": "2026-11-12",
  "/tips/us-first-job-resume/": "2026-11-12",
  "/tips/canadian-resume-format/": "2026-11-12",
  "/tips/australian-resume-format/": "2026-11-12",
  "/cv-examples/teacher/": "2026-11-14",
  "/privacy/": "2026-11-12",
};
// Every template page gained its jobs, ATS verdict, and extra question on this date.
const templatePagesUpdated = "2026-11-14";
const isTemplatePage = (path: string) => /^\/templates\/[a-z-]+\/$/.test(path);

/** Last substantive change. A scheduled page is never dated before it goes live. */
export function contentModified(path: string): string {
  const recorded = changes[path] || baseline;
  const changed = isTemplatePage(path) && templatePagesUpdated > recorded ? templatePagesUpdated : recorded;
  const published = scheduledPage(path)?.publishAt;
  return published && published > changed ? published : changed;
}
