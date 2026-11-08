import Link from "next/link";
import { Check, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TemplateGallery } from "@/components/template-gallery";
import { TemplateCollections } from "@/components/template-collections";
import { StartCVButton } from "@/components/start-cv-button";
import { StructuredData } from "@/components/structured-data";
import { templateCountWord, templateStyles, templates } from "@/lib/model";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { templateCollectionSchema } from "@/lib/structured-data";
export const metadata = pageMetadata({ title: `${templates.length} Free CV Templates — Edit & Download PDF`, description: `Compare ${templates.length} free CV templates in traditional, modern, creative, and simple styles. Edit online, add an optional photo, and download a PDF. No sign-up.`, path: "/templates/", image: "/social/templates.png" });
export default function Templates() {
  return <><Header /><main id="main-content"><StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV templates", path: "/templates/" }])} /><StructuredData data={templateCollectionSchema()} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV templates" }]} /><h1>{templateCountWord} free CV templates. One story, your way.</h1><p>Professional layouts with careful typography and room for your experience. Every design is free, every colour is yours to choose, and switching never loses your details.</p><ul className="page-hero-points"><li><Check size={16} />Free PDF downloads</li><li><Check size={16} />No watermarks</li><li><Check size={16} />Any accent colour</li><li><Check size={16} />Optional photo layouts</li><li><Check size={16} />Switch without starting over</li></ul></div></section>
    <section className="section templates-catalog" aria-label="Choose a CV template"><div className="container"><TemplateGallery headingLevel={2} /><p className="catalog-privacy"><ShieldCheck size={18} />The examples use fictional details. Your CV starts blank, and your information stays on your device.</p></div></section>
    <section className="section collection-section"><div className="container"><div className="section-head"><div><h2>Start with what you need.</h2><p>Practical collections for different applications, with advice on choosing your layout.</p></div></div><TemplateCollections /></div></section>
    <section className="section template-advice"><div className="container advice-grid"><h2>A good template makes your experience easy to follow.</h2><div><p>Compare traditional serif layouts, contemporary introductions, expressive headings, and simple formats. Need a photo? Use the “With photo” filter.</p><ul className="template-style-links">{templateStyles.map(style => <li key={style}><strong>{style} CV templates</strong><span>{templates.filter(template => template.style === style).map((template, index) => <span key={template.id}>{index > 0 && ", "}<Link href={`/templates/${template.id}/`}>{template.name}</Link></span>)}</span></li>)}</ul><p>The right choice depends on your information and any instructions from the employer. Try a few designs in the live editor — your details stay with you when you switch.</p><Link href="/tips/choose-your-template/" className="text-link">Read the template guide <ArrowUpRight size={15} /></Link></div></div></section>
    <section className="closing-cta"><div className="container closing-inner"><div><h2>Found your kind of first impression?</h2><p>Start with your details. The layout is taken care of.</p></div><div className="closing-actions"><StartCVButton className="button dark large" /><span>No account. No payment. No watermark.</span></div></div></section>
  </main><Footer /></>;
}
