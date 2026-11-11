import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { StartCVButton } from "@/components/start-cv-button";
import { StructuredData } from "@/components/structured-data";
import { templates } from "@/lib/model";
import { noindexTemplates, templateDetails } from "@/lib/template-details";
import { templateContent } from "@/lib/template-content";
import { collectionPath, templateCollections } from "@/lib/template-collections";
import { templatePreview } from "@/lib/previews";
import { templateSchema } from "@/lib/structured-data";
import { cvExamples } from "@/lib/cv-examples";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return templates.map(template => ({ slug: template.id })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = templates.find(t => t.id === slug);
  if (!template) return {};
  return pageMetadata({ title: `Free ${template.name} CV Template — Edit & Download PDF`, description: templateDetails[template.id].description, path: `/templates/${slug}/`, image: `/social/${slug}.png`, noIndex: noindexTemplates.includes(template.id) });
}

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = templates.find(t => t.id === slug);
  if (!template) notFound();
  const details = templateDetails[template.id];
  const content = templateContent[template.id];
  const relatedCollections = templateCollections.filter(collection => collection.templates.includes(template.id));
  const examplesHere = cvExamples.filter(example => example.template === template.id);
  const similarity = (other: typeof templates[number]) => Number(other.style === template.style) * 4 + Number(other.columns === template.columns) * 2 + Number(other.photo === template.photo);
  const other = templates.filter(item => item.id !== template.id).sort((a, b) => similarity(b) - similarity(a)).slice(0, 3);

  return <><Header /><main id="main-content">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV templates", path: "/templates/" }, { name: `${template.name} CV template`, path: `/templates/${slug}/` }])} />
    <StructuredData data={templateSchema(template.id)} />

    <section className="template-detail-hero"><div className="container template-detail-grid">
      <div className="template-detail-copy">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV templates", href: "/templates/" }, { name: template.name }]} />
        <p className="template-detail-kind">{details.category} · {template.style}</p>
        <h1>Free {template.name} CV template</h1>
        <p className="template-detail-description">{details.heading}</p>
        <p>{details.layout}</p>
        <ul className="check-list">{details.features.map(feature => <li key={feature}><Check size={18} />{feature}</li>)}</ul>
        <StartCVButton template={template.id} className="button accent large">Use the {template.name} template</StartCVButton>
        <span className="template-detail-privacy"><LockKeyhole size={14} />Free PDF and Word download. No sign-up.</span>
      </div>
      <figure className="template-detail-example"><img src={templatePreview(template.id)} alt={`${template.name} CV template example with ${details.features[0].toLowerCase()}`} width={953} height={1348} fetchPriority="high" /><figcaption>Fictional example · A4 PDF · your CV starts blank</figcaption></figure>
    </div></section>

    <section className="section template-detail-information"><div className="container info-grid">
      <article><h2>Who it suits</h2><p>{details.bestFor}</p></article>
      <article><h2>Is {template.name} right for you?</h2><p>{content.choose}</p></article>
    </div></section>

    <section className="section template-writing"><div className="container">
      <div className="section-head"><div><h2>Writing for the {template.name} layout.</h2><p>Practical notes that follow from how this template places your name, sections, and dates.</p></div></div>
      <div className="writing-grid">{content.writing.map(note => <article key={note.heading}><h3>{note.heading}</h3><p>{note.text}</p></article>)}</div>
    </div></section>

    <section className="section template-faq"><div className="container faq-grid">
      <div><h2>Questions about {template.name}.</h2><p>Specific to this layout. The <Link href="/templates/">template catalogue</Link> answers the general ones.</p></div>
      <FaqList faqs={content.faqs} />
    </div></section>

    <section className="section related-templates"><div className="container">
      <div className="section-head"><div><h2>Compare a few more styles.</h2></div><Link className="text-link" href="/templates/">View all {templates.length} templates <ArrowUpRight size={15} /></Link></div>
      <div className="related-template-grid">{other.map(t => <Link key={t.id} href={`/templates/${t.id}/`} className="related-template"><span className="template-sheet"><img src={templatePreview(t.id)} alt="" width={953} height={1348} loading="lazy" /></span><span className="related-name">{t.name} <ArrowUpRight size={17} /></span><span className="template-note">{t.note}</span></Link>)}</div>
    </div></section>

    {relatedCollections.length + examplesHere.length > 0 && <section className="section collection-section"><div className="container">
      <h2 className="related-collections-title">Explore this kind of CV.</h2>
      <div className="related-collection-links">
        {relatedCollections.map(collection => <Link key={collection.slug} href={collectionPath(collection.slug)} className="button outline">{collection.name} templates<ArrowUpRight size={15} /></Link>)}
        {examplesHere.map(example => <Link key={example.slug} href={`/cv-examples/${example.slug}/`} className="button outline">{example.job} CV example<ArrowUpRight size={15} /></Link>)}
      </div>
    </div></section>}
  </main><Footer /></>;
}
