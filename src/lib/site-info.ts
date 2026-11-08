// Public professional details supplied by the site owner in their CV.
// Keep the original CV, phone number, and street address out of public assets.
export const siteOperator = {
  name: "Muhammad Mubashar Shahzad",
  role: "Frontend Developer",
  country: "Pakistan",
  email: "mmubasharshahzad40@gmail.com",
  education: "Bachelor of Information Technology (BIT)",
  university: "University of Education, Lahore",
  educationDates: "2021–2024",
  skills: ["React", "Vue.js", "JavaScript", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Webflow"],
} as const;

export const informationPages = [
  { path: "/about/", label: "About us", title: "About Folio & Its Developer", description: "Meet Muhammad Mubashar Shahzad, the frontend developer behind Folio. Learn about his experience, education, and the principles behind this free CV maker." },
  { path: "/contact/", label: "Contact", title: "Contact Folio — Support & Feedback", description: "Contact Folio’s maintainer for help with the CV maker, bug reports, writing-guide corrections, privacy questions, or feedback about the website." },
  { path: "/editorial-policy/", label: "Editorial standards", title: "Editorial Standards & Corrections", description: "Learn how Folio approaches CV writing guides, fictional examples, sources, corrections, software assistance, and the separation of advertising from content." },
  { path: "/privacy/", label: "Privacy", title: "Privacy — How Folio Handles Your CV", description: "Understand Folio’s on-device CV processing, optional browser drafts, contact emails, hosting requests, and current advertising and cookie practices." },
  { path: "/terms/", label: "Terms of use", title: "Terms of Use — Folio CV Maker", description: "Read the terms for using Folio’s free CV maker, templates, downloads, and writing guides, including your responsibilities and the limits of the service." },
] as const;
export type InformationPath = typeof informationPages[number]["path"];
export function informationPage(path: InformationPath) { return informationPages.find(page => page.path === path)!; }

export function contactEmailLink(subject = "Folio website enquiry") {
  return `mailto:${siteOperator.email}?subject=${encodeURIComponent(subject)}`;
}
