// Baseline reflects the last recorded editorial release, not the current build date.
const baseline = "2026-11-11";
const changes: Record<string, string> = {
  "/": "2026-11-12",
  "/templates/": "2026-11-12",
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
  "/cv-examples/teacher/": "2026-11-12",
  "/privacy/": "2026-11-12",
};
export function contentModified(path: string): string { return changes[path] || baseline; }
