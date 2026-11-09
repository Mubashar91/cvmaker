import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Logo } from "./logo";
import { templates } from "@/lib/model";
import { collectionPath, templateCollections } from "@/lib/template-collections";
import { informationPages, siteOperator } from "@/lib/site-info";
import { studentPage, tools, toolsHub } from "@/lib/tools";
export { Logo } from "./logo";
export { Header } from "./header";

const footerGuides = [
  { href: "/tips/", label: "All CV writing guides" },
  { href: "/tips/resume-vs-cv/", label: "Resume vs CV" },
  { href: "/tips/uk-cv-format/", label: "UK CV format" },
  { href: "/tips/us-resume-format/", label: "US resume format" },
  { href: "/tips/canadian-resume-format/", label: "Canadian resume format" },
  { href: "/tips/australian-resume-format/", label: "Australian resume format" },
  { href: "/tips/how-to-write-a-cover-letter/", label: "How to write a cover letter" },
  { href: "/tips/ats-friendly-cv/", label: "ATS-friendly CV tips" },
];

export function Footer() {
  return <footer className="site-footer"><div className="container footer-top">
    <div className="footer-brand"><Logo /><p>A professional CV for your next chapter. Free to create, private by design.</p><span className="footer-privacy"><ShieldCheck size={16} /> Your CV is processed on your device</span><Link href="/about/" className="footer-maintainer">Maintained by {siteOperator.name}</Link></div>
    <div className="footer-column"><h2>Create your CV</h2><Link href="/editor/">Free CV maker</Link><Link href={studentPage.path}>CV maker for students</Link><Link href="/templates/">All CV templates</Link><Link href="/cv-examples/">CV examples by job</Link><Link href="/#how-it-works">How it works</Link><Link href="/privacy/">Privacy promise</Link><Link href="/privacy/#drafts">Saving & deleting drafts</Link></div>
    <div className="footer-column"><h2>Free tools</h2>{tools.map(item => <Link key={item.path} href={item.path}>{item.name}</Link>)}<Link href={toolsHub.path}>All free tools</Link></div>
    <div className="footer-column"><h2>Guides</h2>{footerGuides.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
    <div className="footer-column footer-templates"><h2>Templates</h2>{templates.map(t => <Link key={t.id} href={`/templates/${t.id}/`}>{t.name}</Link>)}{templateCollections.map(collection => <Link key={collection.slug} href={collectionPath(collection.slug)}>{collection.name} CVs</Link>)}</div>
  </div><nav className="container footer-information" aria-label="About and policies">{informationPages.map(page => <Link key={page.path} href={page.path}>{page.label}</Link>)}</nav><div className="container footer-bottom"><span>Folio. Made for your next chapter.</span><span>{templates.length} templates · Free PDF downloads · No watermarks</span></div></footer>;
}
