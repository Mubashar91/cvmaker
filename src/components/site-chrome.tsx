import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Logo } from "./logo";
import { templates } from "@/lib/model";
import { collectionPath, templateCollections } from "@/lib/template-collections";
import { informationPages, siteOperator } from "@/lib/site-info";
import { noExperiencePage, studentPage, toolsHub } from "@/lib/tools";
export { Logo } from "./logo";
export { Header } from "./header";

// Short, scannable labels. Every template page stays one click away via /templates/ and the collections.
const footerColumns = [
  { heading: "CV maker", links: [
    { href: "/editor/", label: "Create your CV" },
    { href: studentPage.path, label: "CV maker for students" },
    { href: noExperiencePage.path, label: "CV with no experience" },
    { href: "/templates/", label: "CV templates" },
    { href: "/cv-examples/", label: "CV examples by job" },
    { href: "/#how-it-works", label: "How it works" },
  ] },
  { heading: "Free tools", links: [
    { href: "/cover-letter-maker/", label: "Cover letter maker" },
    { href: "/resume-keyword-checker/", label: "Keyword checker" },
    { href: "/resume-summary-builder/", label: "Summary builder" },
    { href: "/resume-objective-generator/", label: "Objective generator" },
    { href: "/resume-bullet-point-generator/", label: "Bullet point builder" },
    { href: "/resume-skills/", label: "Skills for your resume" },
  ], more: { href: toolsHub.path, label: "All free tools" } },
  { heading: "CV guides", links: [
    { href: "/tips/resume-vs-cv/", label: "Resume vs CV" },
    { href: "/tips/uk-cv-format/", label: "UK CV format" },
    { href: "/tips/us-resume-format/", label: "US resume format" },
    { href: "/tips/canadian-resume-format/", label: "Canadian resume" },
    { href: "/tips/australian-resume-format/", label: "Australian resume" },
    { href: "/tips/how-to-write-a-cover-letter/", label: "Writing a cover letter" },
    { href: "/tips/internship-cv/", label: "Internship CV" },
  ], more: { href: "/tips/", label: "All CV guides" } },
  { heading: "Templates", links: templateCollections.map(collection => ({ href: collectionPath(collection.slug), label: collection.name === "With a photo" ? "CVs with a photo" : `${collection.name} CVs` })),
    more: { href: "/templates/", label: `All ${templates.length} templates` } },
];

export function Footer() {
  return <footer className="site-footer"><div className="container footer-top">
    <div className="footer-brand"><Logo /><p>A professional CV for your next chapter. Free to create, private by design.</p>
      <ul className="footer-trust"><li><ShieldCheck size={16} aria-hidden="true" />Your CV stays on your device</li><li><Check size={16} aria-hidden="true" />Free PDF download, no watermark</li><li><Check size={16} aria-hidden="true" />No account or sign-up</li></ul>
      <Link href="/about/" className="footer-maintainer">Maintained by {siteOperator.name}</Link></div>
    {footerColumns.map(column => <nav className="footer-column" key={column.heading} aria-label={column.heading}><p className="footer-heading">{column.heading}</p>{column.links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}{column.more && <Link href={column.more.href} className="footer-more">{column.more.label}<ArrowRight size={14} aria-hidden="true" /></Link>}</nav>)}
  </div><div className="container footer-bottom"><nav className="footer-information" aria-label="About and policies">{informationPages.map(page => <Link key={page.path} href={page.path}>{page.label}</Link>)}</nav><span>© {new Date().getFullYear()} Folio Free CV Maker</span></div></footer>;
}
