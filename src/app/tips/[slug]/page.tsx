import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock3, FileText } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StartCVButton } from "@/components/start-cv-button";
import { StructuredData } from "@/components/structured-data";
import { AdSlot } from "@/components/ad-slot";
import { tips } from "@/lib/tips";
import { siteOperator } from "@/lib/site-info";
import { breadcrumbSchema, CONTENT_UPDATED, CONTENT_UPDATED_LABEL, pageMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/structured-data";
export function generateStaticParams() { return tips.map(tip => ({ slug: tip.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const tip = tips.find(t => t.slug === slug); if (!tip) return {};
  return pageMetadata({ title: tip.seoTitle, description: tip.description, path: `/tips/${slug}/`, image: `/social/guides/${slug}.png`, article: true });
}
export default async function Tip({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const tip = tips.find(t => t.slug === slug); if (!tip) notFound();
  const related = tips.filter(t => t.slug !== slug).slice(0, 3);
  return <><Header /><main id="main-content"><StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV guides", path: "/tips/" }, { name: tip.title, path: `/tips/${slug}/` }])} /><StructuredData data={articleSchema(tip)} /><section className="page-hero article-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV guides", href: "/tips/" }, { name: tip.category }]} /><h1>{tip.title}</h1><div className="article-meta"><span><Clock3 size={15} />{tip.readTime} min read</span><Link href="/about/" rel="author"><FileText size={15} />By {siteOperator.name}</Link><span>{tip.category}</span><time dateTime={CONTENT_UPDATED}>Updated {CONTENT_UPDATED_LABEL}</time></div></div></section><div className="guide-layout container section"><nav className="guide-toc" aria-label="On this page"><h2>In this guide</h2>{tip.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.heading}</a>)}</nav><article className="article"><p className="article-intro">{tip.intro}</p>{tip.sections.map(section => <section id={section.id} key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.example && <aside className="article-example"><span>Illustrative example</span><p>{section.example}</p></aside>}{section.bullets && <ul>{section.bullets.map(point => <li key={point}>{point}</li>)}</ul>}</section>)}<aside className="callout"><p>{tip.takeaway}</p></aside><div className="article-cta"><span>A fresh page for your next chapter.</span><StartCVButton>Open the free editor</StartCVButton></div></article></div><AdSlot placement="tips" /><section className="related-guides"><div className="container"><h2>A little more useful reading.</h2><ul className="guide-list">{related.map(guide => <li key={guide.slug}><Link href={`/tips/${guide.slug}/`} className="guide-row"><span className="guide-meta"><span>{guide.category}</span><span>{guide.readTime} min read</span></span><h3>{guide.title}</h3><p>{guide.description}</p><ArrowUpRight className="guide-arrow" size={22} /></Link></li>)}</ul></div></section></main><Footer /></>;
}
