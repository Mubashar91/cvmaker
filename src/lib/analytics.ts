// Cookie-free usage counts through Vercel Web Analytics, loaded only in Vercel builds
// (see src/app/layout.tsx). Events carry a name and a few non-personal labels, such as a file
// format or template id, and never any CV content. Custom events need a Vercel plan that
// includes them; otherwise only page views are counted and these calls do nothing.

type EventData = Record<string, string | number | boolean>;
declare global { interface Window { va?: (event: "event", payload: { name: string; data?: EventData }) => void } }

export function trackEvent(name: string, data?: EventData) {
  try { window.va?.("event", { name, data }); } catch { /* analytics must never affect the page */ }
}
