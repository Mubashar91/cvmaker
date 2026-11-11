// The AI endpoints by public path, for the local development and static servers.
// On Vercel, each file in this folder that does not start with "_" is its own function.
import improveSummary from './improve-summary.mjs';
import improveBullets from './improve-bullets.mjs';
import cvJobMatch from './cv-job-match.mjs';
import coverLetterDraft from './cover-letter-draft.mjs';
import tailorCV from './tailor-cv.mjs';

const routes = new Map([
  ['/api/improve-summary', improveSummary],
  ['/api/improve-bullets', improveBullets],
  ['/api/cv-job-match', cvJobMatch],
  ['/api/cover-letter-draft', coverLetterDraft],
  ['/api/tailor-cv', tailorCV],
]);

/** The handler for a request path, with or without a trailing slash. */
export function apiHandler(pathname) {
  return routes.get(pathname.replace(/\/$/, '')) ?? null;
}
