import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, FileText } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StartCVButton } from "@/components/start-cv-button";
import { StructuredData } from "@/components/structured-data";
import { AdSlot } from "@/components/ad-slot";
import { FaqList } from "@/components/faq-list";
import { RichText } from "@/components/rich-text";
import { GuideImage } from "@/components/guide-image";
import { relatedGuides, tips } from "@/lib/tips";
import { siteOperator } from "@/lib/site-info";
import { breadcrumbSchema, CONTENT_UPDATED, CONTENT_UPDATED_LABEL, formatDate, pageMetadata } from "@/lib/seo";
import { articleSchema, faqSchema } from "@/lib/structured-data";
export function generateStaticParams() { return tips.map(tip => ({ slug: tip.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const tip = tips.find(t => t.slug === slug); if (!tip) return {};
  return pageMetadata({ title: tip.seoTitle, description: tip.description, path: `/tips/${slug}/`, image: `/social/guides/${slug}.png`, article: true });
}
export default async function Tip({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const tip = tips.find(t => t.slug === slug); if (!tip) notFound();
  const related = relatedGuides(slug);
  const toc = [...(tip.quickAnswer ? [{ id: "quick-answer", heading: "The short answer" }] : []), ...tip.sections.map(section => ({ id: section.id, heading: section.heading })), ...(tip.checklist ? [{ id: "checklist", heading: tip.checklist.heading }] : []), ...(tip.faqs?.length ? [{ id: "faq", heading: "Frequently asked questions" }] : []), ...(tip.sources?.length ? [{ id: "sources", heading: "Sources and further reading" }] : [])];
  return <><Header /><main id="main-content"><StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV guides", path: "/tips/" }, { name: tip.title, path: `/tips/${slug}/` }])} /><StructuredData data={articleSchema(tip)} />{tip.faqs && <StructuredData data={faqSchema(tip.faqs)} />}
    <section className="page-hero article-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV guides", href: "/tips/" }, { name: tip.title }]} /><span className="article-category">{tip.category}</span><h1>{tip.title}</h1><div className="article-meta"><Link href="/about/" rel="author"><FileText size={15} />By {siteOperator.name}</Link><span><Clock3 size={15} />{tip.readTime} min read</span>{tip.published && tip.published !== CONTENT_UPDATED ? <><span><CalendarDays size={15} />Published <time dateTime={tip.published}>{formatDate(tip.published)}</time></span><span>Updated <time dateTime={CONTENT_UPDATED}>{CONTENT_UPDATED_LABEL}</time></span></> : <span><CalendarDays size={15} />{tip.published ? "Published" : "Updated"} <time dateTime={CONTENT_UPDATED}>{CONTENT_UPDATED_LABEL}</time></span>}</div></div></section>
    <div className="guide-layout container section"><nav className="guide-toc" aria-label="On this page"><h2>In this guide</h2>{toc.map(item => <a key={item.id} href={`#${item.id}`}>{item.heading}</a>)}</nav><article className="article">
      <div className={`article-lead${tip.image ? " has-image" : ""}`}><p className="article-intro">{tip.intro}</p>{tip.image && <GuideImage image={tip.image} priority />}</div>
      {tip.quickAnswer && <section id="quick-answer" className="article-answer" aria-labelledby="quick-answer-heading"><h2 id="quick-answer-heading">The short answer</h2><p><RichText text={tip.quickAnswer} /></p>{tip.sections.some(section => section.id === "worked-example") && <a href="#worked-example">See the worked example <ArrowRight size={15} aria-hidden="true" /></a>}</section>}
      {tip.sections.map(section => <section id={section.id} key={section.id}><h2>{section.heading}</h2>
        {section.paragraphs.map(paragraph => <p key={paragraph}><RichText text={paragraph} /></p>)}
        {section.table && <div className="article-table" role="region" aria-label={section.table.caption} tabIndex={0}><table><caption>{section.table.caption}</caption><thead><tr>{section.table.head.map(cell => <th key={cell} scope="col">{cell}</th>)}</tr></thead><tbody>{section.table.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={index} scope="row">{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>}
        {section.subsections?.map(sub => <div className="article-subsection" key={sub.heading}><h3>{sub.heading}</h3>{sub.paragraphs.map(paragraph => <p key={paragraph}><RichText text={paragraph} /></p>)}{sub.bullets && <ul>{sub.bullets.map(point => <li key={point}><RichText text={point} /></li>)}</ul>}</div>)}
        {section.example && <aside className="article-example"><span>{section.exampleLabel ?? "Illustrative example"}</span>{section.example.split(/\n{2,}/).map(paragraph => <p key={paragraph}>{paragraph}</p>)}</aside>}
        {section.bullets && <ul>{section.bullets.map(point => <li key={point}><RichText text={point} /></li>)}</ul>}
        {section.sourceUrls?.length ? <p className="article-section-sources"><small>Sources: {section.sourceUrls.map((url, index) => {
          const source = tip.sources?.find(item => item.url === url);
          return source ? <Fragment key={url}>{index > 0 && "; "}<a href={source.url}>{source.title}</a></Fragment> : null;
        })}</small></p> : null}
      </section>)}
      {tip.checklist && <section id="checklist" className="article-checklist" aria-labelledby="checklist-heading"><h2 id="checklist-heading">{tip.checklist.heading}</h2><ul>{tip.checklist.items.map(item => <li key={item}><RichText text={item} /></li>)}</ul></section>}
      <aside className="callout"><p>{tip.takeaway}</p></aside>
      {tip.faqs && <section id="faq" className="article-faq"><h2>Frequently asked questions</h2><FaqList faqs={tip.faqs} /></section>}
      {tip.sources?.length && <section id="sources"><h2>Sources and further reading</h2>{tip.sourcesChecked && <p>Sources checked on <time dateTime={tip.sourcesChecked}>{formatDate(tip.sourcesChecked)}</time>. Examples are fictional; practical suggestions are Folio's own application of the guidance.</p>}<ul>{tip.sources.map(source => <li key={source.url}><a href={source.url}>{source.title}</a></li>)}</ul></section>}
      {tip.tool && <aside className="article-tool"><div><span>Free tool</span><p><RichText text={tip.tool.text} /></p></div><Link href={tip.tool.href} className="button dark">{tip.tool.label}<ArrowRight size={16} /></Link></aside>}
      {!tip.tool && <div className="article-cta"><span>A fresh page for your next chapter.</span><StartCVButton>Open the free editor</StartCVButton></div>}
    </article></div><AdSlot placement="tips" />
    <section className="related-guides"><div className="container"><h2>Related guides.</h2><ul className="guide-list">{related.map(guide => <li key={guide.slug}><Link href={`/tips/${guide.slug}/`} className="guide-row"><span className="guide-meta"><span>{guide.category}</span><span>{guide.readTime} min read</span></span><h3>{guide.title}</h3><p>{guide.description}</p><ArrowUpRight className="guide-arrow" size={22} /></Link></li>)}</ul></div></section></main><Footer /></>;
}
