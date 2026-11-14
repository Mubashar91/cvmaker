import type { LandingPage } from "./landing-types";
import { isVisible } from "./scheduled-pages";
import { googleDocsCvTemplate } from "./landing/google-docs-cv-template";
import { harvardCvTemplate } from "./landing/harvard-cv-template";
import { cvTemplateWord } from "./landing/cv-template-word";
import { resumeTemplateWord } from "./landing/resume-template-word";
import { personalStatementExamples } from "./landing/personal-statement-examples";
import { cvFormatPakistan } from "./landing/cv-format-pakistan";
import { canadianCvFormat } from "./landing/canadian-cv-format";
import { uaeCvFormat } from "./landing/uae-cv-format";
import { teacherCvFormat } from "./landing/teacher-cv-format";

/** Every scheduled guide-style page, in go-live order. Metadata and dates: scheduled-pages.ts. */
export const allLandingPages: LandingPage[] = [
  googleDocsCvTemplate, harvardCvTemplate, cvTemplateWord, resumeTemplateWord, personalStatementExamples,
  cvFormatPakistan, canadianCvFormat, uaeCvFormat, teacherCvFormat,
];

export const landingPath = (slug: string) => `/${slug}/`;
/** The pages this build publishes: live ones, plus scheduled ones in a preview build. */
export const landingPages = allLandingPages.filter(page => isVisible(landingPath(page.slug)));
export function landingPage(slug: string) { return landingPages.find(page => page.slug === slug); }
