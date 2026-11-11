import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Clock3, FileText, LockKeyhole } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { AdSlot } from "@/components/ad-slot";
import { UseExampleButton } from "@/components/use-example-button";
import { cvExample, cvExamples, exampleCV, relatedExamples } from "@/lib/cv-examples";
import { templateById, templates } from "@/lib/model";
import { templateDetails } from "@/lib/template-details";
import { examplePreview } from "@/lib/previews";
import { tips } from "@/lib/tips";
import { siteOperator } from "@/lib/site-info";
import { breadcrumbSchema, CONTENT_UPDATED, CONTENT_UPDATED_LABEL, pageMetadata } from "@/lib/seo";
import { cvExampleSchema } from "@/lib/structured-data";

export function generateStaticParams() { return cvExamples.map(example => ({ slug: example.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const example = cvExample(slug); if (!example) return {};
  return pageMetadata({ title: example.seoTitle, description: example.description, path: `/cv-examples/${slug}/`, image: `/social/examples/${slug}.png`, article: true });
}

export default async function CVExamplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const example = cvExample(slug); if (!example) notFound();
  const template = templateById(example.template); const job = example.job.toLowerCase();
  const guides = example.guides.map(guideSlug => tips.find(tip => tip.slug === guideSlug)!);
  const sections = [
    { id: "profile-examples", heading: `${example.job} CV profile examples` },
    { id: "bullet-points", heading: `${example.job} CV bullet points` },
    { id: "skills", heading: `Skills for a ${job} CV` },
    { id: "tips", heading: `Tips for writing a ${job} CV` },
    { id: "template", heading: "The template in this example" },
  ];
  return <><Header /><main id="main-content">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV examples", path: "/cv-examples/" }, { name: `${example.job} CV example`, path: `/cv-examples/${slug}/` }])} />
    <StructuredData data={cvExampleSchema(example)} />
    <section className="template-detail-hero"><div className="container template-detail-grid">
      <div className="template-detail-copy">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV examples", href: "/cv-examples/" }, { name: example.job }]} />
        <p className="template-detail-kind">{example.category} · Fictional example</p>
        <h1>{example.job} CV example</h1>
        <p className="template-detail-description">A complete {job} CV you can edit and make your own.</p>
        <p>{example.intro}</p>
        <ul className="check-list"><li><Check size={18} />A complete CV in the {template.name} template</li><li><Check size={18} />Three profile examples for different stages</li><li><Check size={18} />Eight bullet points you can adapt</li><li><Check size={18} />Skills and tips specific to the role</li></ul>
        <UseExampleButton cv={exampleCV(example)}>Edit this example</UseExampleButton>
        <span className="template-detail-privacy"><LockKeyhole size={14} />Opens in the free editor. Replace every detail with your own.</span>
      </div>
      <figure className="template-detail-example"><img src={examplePreview(slug)} alt={`${example.job} CV example in the ${template.name} template, showing a profile, work experience, education, and skills`} width={953} height={1348} fetchPriority="high" /><figcaption>Fictional person and employers · A4 PDF</figcaption></figure>
    </div></section>
    <div className="guide-layout container section">
      <nav className="guide-toc" aria-label="On this page"><h2>On this page</h2>{sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.heading}</a>)}</nav>
      <article className="article">
        <div className="article-meta example-meta"><Link href="/about/" rel="author"><FileText size={15} />By {siteOperator.name}</Link><span><Clock3 size={15} />Updated <time dateTime={CONTENT_UPDATED}>{CONTENT_UPDATED_LABEL}</time></span></div>
        <section id="profile-examples"><h2>{sections[0].heading}</h2><p>The first version is used in the example CV above; the alternatives show how a {job} profile reads at other stages.</p>
          <aside className="article-example"><span>Used in the example CV</span><p>{example.summary}</p></aside>
          {example.profiles.map(profile => <aside className="article-example" key={profile.label}><span>{profile.label}</span><p>{profile.text}</p></aside>)}
        </section>
        <section id="bullet-points"><h2>{sections[1].heading}</h2><p>Models for a {job} CV, not lines to copy: swap in your own numbers, settings, and tools, or build one from your own facts with the <Link href="/resume-bullet-point-generator/">bullet point builder</Link>.</p><ul>{example.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></section>
        <section id="skills"><h2>{sections[2].heading}</h2><div className="skill-columns">{example.skillGroups.map(group => <div key={group.label}><h3>{group.label}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section>
        <section id="tips"><h2>{sections[3].heading}</h2>{example.tips.map(tip => <div key={tip.heading}><h3>{tip.heading}</h3><p>{tip.text}</p></div>)}</section>
        <section id="template"><h2>{sections[4].heading}</h2><p>This example uses the <Link href={`/templates/${template.id}/`}>{template.name} template</Link>. {templateDetails[template.id].layout} Any of the {templates.length} templates can take this content without retyping.</p></section>
        <aside className="callout"><p>Every person, employer, and figure in this {job} example is fictional.</p></aside>
        <div className="article-cta"><span>Start from this example, then make it yours.</span><UseExampleButton cv={exampleCV(example)} className="button dark">Edit the {job} example</UseExampleButton></div>
      </article>
    </div>
    <AdSlot placement="tips" />
    <section className="related-guides"><div className="container"><h2>More CV examples.</h2><ul className="guide-list">{relatedExamples(example).map(item => <li key={item.slug}><Link href={`/cv-examples/${item.slug}/`} className="guide-row"><span className="guide-meta"><span>{item.category}</span><span>{templateById(item.template).name} template</span></span><h3>{item.job} CV example</h3><p>{item.description}</p><ArrowUpRight className="guide-arrow" size={22} /></Link></li>)}</ul>
      <h2 className="related-guides-secondary">Helpful CV guides.</h2><ul className="guide-list">{guides.map(guide => <li key={guide.slug}><Link href={`/tips/${guide.slug}/`} className="guide-row"><span className="guide-meta"><span>{guide.category}</span><span>{guide.readTime} min read</span></span><h3>{guide.title}</h3><p>{guide.description}</p><ArrowUpRight className="guide-arrow" size={22} /></Link></li>)}</ul></div></section>
  </main><Footer /></>;
}
