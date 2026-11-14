// Text fields may contain internal links written as [descriptive text](/path/).
import type { SampleCVData } from "./sample-cv";
export interface GuideSubsection { heading: string; paragraphs: string[]; bullets?: string[] }
export interface GuideSection {
  id: string; heading: string; paragraphs: string[]; bullets?: string[];
  example?: string; exampleLabel?: string;
  subsections?: GuideSubsection[];
  table?: { caption: string; head: string[]; rows: string[][] };
  /** A real screenshot of the site's own interface, shown after the section text. */
  figure?: { src: string; alt: string; caption: string; width: number; height: number };
  /** URLs from the article's source list supporting this section. */
  sourceUrls?: string[];
  /** A complete fictional CV shown in full, with a button that opens it in the editor. */
  sample?: { data: SampleCVData; caption: string };
}
export interface Guide {
  slug: string; title: string; seoTitle: string; description: string; category: string;
  intro: string; sections: GuideSection[]; takeaway: string;
  /** A direct answer to the main question, before the detailed walkthrough. */
  quickAnswer?: string;
  /** Concrete completion checks for this article's task. */
  checklist?: { heading: string; items: string[] };
  /** Editorially chosen next steps, ahead of category-based related reading. */
  relatedSlugs?: string[];
  /** A real render from this site: a template thumbnail, a fictional example CV, or a cover letter layout. */
  image?: { kind: "template" | "example" | "letter"; id: string; alt: string; caption: string };
  faqs?: { question: string; answer: string }[];
  /** The most useful free tool for the reader of this guide. */
  tool?: { href: string; label: string; text: string };
  /** ISO date the guide was first published, when known. */
  published?: string;
  /** Primary references for factual guidance, shown with the article. */
  sources?: { title: string; url: string }[];
  /** Date this article's external references were checked; does not imply third-party review. */
  sourcesChecked?: string;
}
