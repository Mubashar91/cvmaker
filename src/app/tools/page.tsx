import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, FileText, GraduationCap, LayoutTemplate, PencilLine } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { ToolIcon } from "@/components/tool-icon";
import { NewCVButton } from "@/components/start-cv-button";
import { templates } from "@/lib/model";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";
import { studentPage, toolCardLabel, tools, toolsHub } from "@/lib/tools";

export const metadata = pageMetadata({ title: toolsHub.title, description: toolsHub.description, path: toolsHub.path, image: "/social/tools.png" });

const alsoFree = [
  { href: "/editor/", label: "CV maker", text: "Write, preview, and download your CV as a PDF.", icon: PencilLine },
  { href: "/templates/", label: `${templates.length} CV templates`, text: "Traditional, modern, creative, and simple layouts.", icon: LayoutTemplate },
  { href: "/cv-examples/", label: "CV examples by job", text: "Complete, fictional CVs you can edit.", icon: FileText },
  { href: studentPage.path, label: "CV maker for students", text: "An education-first start for your first CV.", icon: GraduationCap },
];

export default function ToolsPage() {
  return <><Header /><main id="main-content">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: toolsHub.label, path: toolsHub.path }])} />
    <StructuredData data={collectionPageSchema({ path: toolsHub.path, name: "Free CV and resume tools", description: toolsHub.description, items: tools.map(item => ({ name: item.name, path: item.path })) })} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: toolsHub.label }]} /><h1>Free CV and resume tools</h1><p>Practical help for every part of a job application, from the cover letter to the keywords. The classic tools run in your browser using predefined templates and plain text matching; the AI job match is optional and sends only the text you choose.</p><ul className="page-hero-points"><li><Check size={16} />No sign-up</li><li><Check size={16} />Free to use</li><li><Check size={16} />Classic tools: nothing uploaded</li><li><Check size={16} />Optional AI job match</li></ul></div></section>
    <section className="section"><div className="container"><h2 className="sr-only">Application tools</h2><ul className="tool-grid is-hub">{tools.map(item => <li key={item.path}><Link href={item.path} className="tool-card"><span className="tool-card-icon"><ToolIcon name={item.icon} size={22} /></span><h3>{item.name}</h3><p>{item.description}</p><span className="tool-card-link">Open the {toolCardLabel(item.name)} <ArrowRight size={15} /></span></Link></li>)}</ul></div></section>
    <section className="section tools-also"><div className="container"><div className="section-head"><div><h2>Also free on Folio.</h2><p>The tools work best alongside a CV you are happy with.</p></div><Link href="/tips/" className="text-link">Read the CV guides <ArrowUpRight size={16} /></Link></div><ul className="also-grid">{alsoFree.map(item => <li key={item.href}><Link href={item.href}><item.icon size={19} aria-hidden="true" /><span><strong>{item.label}</strong><small>{item.text}</small></span><ArrowRight size={16} aria-hidden="true" /></Link></li>)}</ul></div></section>
    <section className="section template-advice"><div className="container advice-grid"><h2>Where AI helps, and where it doesn’t.</h2><div><p>Your CV is personal, and your application should sound like you. The writing tools combine the details you type with predefined, human-written templates, and the keyword checker compares text with simple, transparent rules — all on your device, with nothing sent to a server, an AI service, or an advertiser.</p><p>AI earns its place where rules fall short: reading a whole advert and weighing your evidence against it. The <Link href="/ai-cv-job-match/">AI CV job match</Link> does exactly that, sends only the text you choose, and is instructed to use your real experience and never invent qualifications. Read the <Link href="/privacy/">privacy promise</Link> for details.</p></div></div></section>
    <section className="closing-cta"><div className="container closing-inner"><div><h2>Start with your CV.</h2><p>Then let the tools help with the rest.</p></div><div className="closing-actions"><NewCVButton className="button dark large">Create my free CV</NewCVButton><span>No sign-up. No payment. No watermark.</span></div></div></section>
  </main><Footer /></>;
}
