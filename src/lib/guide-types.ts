// Text fields may contain internal links written as [descriptive text](/path/).
export interface GuideSubsection { heading: string; paragraphs: string[]; bullets?: string[] }
export interface GuideSection {
  id: string; heading: string; paragraphs: string[]; bullets?: string[];
  example?: string; exampleLabel?: string;
  subsections?: GuideSubsection[];
  table?: { caption: string; head: string[]; rows: string[][] };
}
export interface Guide {
  slug: string; title: string; seoTitle: string; description: string; category: string;
  intro: string; sections: GuideSection[]; takeaway: string;
  /** A real render from this site: a template thumbnail, a fictional example CV, or a cover letter layout. */
  image?: { kind: "template" | "example" | "letter"; id: string; alt: string; caption: string };
  faqs?: { question: string; answer: string }[];
  /** The most useful free tool for the reader of this guide. */
  tool?: { href: string; label: string; text: string };
  /** ISO date the guide was first published, when known. */
  published?: string;
  /** Primary references for factual guidance, shown with the article. */
  sources?: { title: string; url: string }[];
}
