import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StartCVButton } from "@/components/start-cv-button";
import { StructuredData } from "@/components/structured-data";
import { templates } from "@/lib/model";
import { templateDetails } from "@/lib/template-details";
import { templatePreview } from "@/lib/previews";
import { templateSchema } from "@/lib/structured-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
export function generateStaticParams() { return templates.map(template => ({ slug: template.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const template = templates.find(t => t.id === slug); if (!template) return {};
  return pageMetadata({ title: `Free ${template.name} CV Template — Edit & Download PDF`, description: templateDetails[template.id].description, path: `/templates/${slug}/`, image: `/social/${slug}.png` });
}
export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const template = templates.find(t => t.id === slug); if (!template) notFound();
  const details = templateDetails[template.id];
  const index = templates.findIndex(t => t.id === template.id);
  const other = [1, 2, 3].map(step => templates[(index + step) % templates.length]);
  return <><Header /><main id="main-content"><StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV templates", path: "/templates/" }, { name: `${template.name} CV template`, path: `/templates/${slug}/` }])} />
    <StructuredData data={templateSchema(template.id)} />
    <section className="template-detail-hero"><div className="container template-detail-grid">
      <div className="template-detail-copy"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV templates", href: "/templates/" }, { name: template.name }]} /><p className="template-detail-kind">{details.category} · {template.style}</p><h1>Free {template.name} CV template.</h1><p className="template-detail-description">{details.heading}</p><p>{details.layout}</p><ul className="check-list">{details.features.map(feature => <li key={feature}><Check size={18} />{feature}</li>)}</ul><StartCVButton template={template.id} className="button accent large">Use the {template.name} template</StartCVButton><span className="template-detail-privacy"><LockKeyhole size={14} />Free PDF. No sign-up. Your details stay private.</span></div>
      <figure className="template-detail-example"><img src={templatePreview(template.id)} alt={`${template.name} CV template example with ${details.features[0].toLowerCase()}`} width={953} height={1348} fetchPriority="high" /><figcaption>Fictional example · A4 PDF · your CV starts blank</figcaption></figure>
    </div></section>
    <section className="section template-detail-information"><div className="container info-grid"><article><h2>Who it suits</h2><p>{details.bestFor}</p></article><article><h2>Your information, your order</h2><p>Add or remove entries, move sections, and keep only what matters for your application. Empty sections stay out of your CV, and longer documents flow across multiple pages.</p><p>Pick any of ten accent colours, or keep the template’s own.{template.photo ? " Add an optional photo under Personal details — it’s cropped on your device and never uploaded." : ""} You can switch templates in the editor without losing your details, and preview every page before downloading your free PDF.</p></article></div></section>
    <section className="section related-templates"><div className="container"><div className="section-head"><div><h2>Compare a few more styles.</h2></div><Link className="text-link" href="/templates/">View all {templates.length} templates <ArrowUpRight size={15} /></Link></div><div className="related-template-grid">{other.map(t => <Link key={t.id} href={`/templates/${t.id}/`} className="related-template"><span className="template-sheet"><img src={templatePreview(t.id)} alt="" width={953} height={1348} loading="lazy" /></span><span className="related-name">{t.name} <ArrowUpRight size={17} /></span><span className="template-note">{t.note}</span></Link>)}</div></div></section>
  </main><Footer /></>;
}
