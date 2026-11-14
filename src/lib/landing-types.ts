import type { SampleCVData } from "./sample-cv";

/** A block of guide text. Paragraphs and bullets accept [label](/path/) links (see rich-text.ts). */
export interface LandingSection {
  id: string; heading: string; paragraphs: string[];
  subsections?: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  bullets?: string[];
  table?: { caption: string; head: string[]; rows: string[][] };
  example?: { label: string; text: string };
}

/**
 * A scheduled, guide-style page at /<slug>/: its title, description, and go-live date live in
 * scheduled-pages.ts; everything on the page lives here. Write every paragraph for this page only.
 */
export interface LandingPage {
  slug: string;
  /** Small label above the heading, e.g. "Free template · Google Docs". */
  kicker: string;
  h1: string;
  intro: string;
  points: string[];
  /** Sections before the worked example. */
  sections: LandingSection[];
  /** The full worked example CV, shown as text and openable in the editor. */
  example: { heading: string; paragraphs: string[]; cv: SampleCVData; notes: { heading: string; text: string }[] };
  /** Sections after the worked example. */
  after: LandingSection[];
  /** An editable .docx built from the example by `npm run word:templates` into /word-templates/. */
  download?: { label: string; note: string };
  /** A Google Docs "Make a copy" link. The button shows only once a real URL is set. */
  googleDocsCopyUrl?: string;
  faqs: { question: string; answer: string }[];
  /** Related pages. Links to scheduled pages are dropped until those pages are live. */
  related: { href: string; label: string }[];
  /** One plain sentence shown near the top, e.g. a no-affiliation note. */
  note?: string;
}
