import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StartCVButton } from "@/components/start-cv-button";
import { StructuredData } from "@/components/structured-data";
import { AdSlot } from "@/components/ad-slot";
import { guideImageSrc } from "@/components/guide-image";
import { previewSrcSet } from "@/lib/previews";
import { guideGroups, tips, type Tip } from "@/lib/tips";
import { templates } from "@/lib/model";
import { siteOperator } from "@/lib/site-info";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/structured-data";

const DESCRIPTION = "Free CV and resume writing guides: profiles, work experience, cover letters, ATS-friendly formats, and conventions for the UK, US, Canada, and Australia.";
export const metadata = pageMetadata({ title: "CV & Resume Writing Guides — Practical, Free Advice", description: DESCRIPTION, path: "/tips/", image: "/social/tips.png" });
const FEATURED = "how-to-write-a-cover-letter";

function GuideCard({ tip }: { tip: Tip }) {
  return <Link href={`/tips/${tip.slug}/`} className="guide-card">
    {tip.image && <span className="guide-card-image"><img src={guideImageSrc(tip.image)} srcSet={previewSrcSet(guideImageSrc(tip.image))} sizes="(max-width: 640px) calc(100vw - 88px), 340px" alt={tip.image.alt} width={953} height={1348} loading="lazy" decoding="async" /></span>}
    <span className="guide-card-body"><span className="guide-card-category">{tip.category}</span><h3>{tip.title}</h3><p>{tip.description}</p><span className="guide-card-meta"><Clock3 size={14} aria-hidden="true" />{tip.readTime} min read<span aria-hidden="true">·</span>{siteOperator.name}</span></span>
  </Link>;
}

export default function Tips() {
  const featured = tips.find(tip => tip.slug === FEATURED)!;
  return <><Header /><main id="main-content"><StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV writing guides", path: "/tips/" }])} /><StructuredData data={collectionPageSchema({ path: "/tips/", name: "CV and resume writing guides", description: DESCRIPTION, items: tips.map(tip => ({ name: tip.title, path: `/tips/${tip.slug}/` })) })} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV writing guides" }]} /><h1>CV and resume guides for your next step</h1><p>Practical, honest advice for telling your story well: from your first profile and cover letter to the conventions employers expect in the UK, US, Canada, and Australia.</p><nav className="guide-jump" aria-label="Guide topics">{guideGroups.map(group => <a key={group.id} href={`#${group.id}`}>{group.heading}</a>)}</nav></div></section>
    <section className="section guide-featured-section" aria-labelledby="featured-guide"><div className="container"><Link href={`/tips/${featured.slug}/`} className="guide-featured">
      {featured.image && <span className="guide-featured-image"><img src={guideImageSrc(featured.image)} srcSet={previewSrcSet(guideImageSrc(featured.image))} sizes="(max-width: 640px) 200px, 280px" alt={featured.image.alt} width={953} height={1348} fetchPriority="high" decoding="async" /></span>}
      <span className="guide-featured-body"><span className="guide-card-category">Featured guide · {featured.category}</span><h2 id="featured-guide">{featured.title}</h2><p>{featured.description}</p><span className="guide-card-meta"><Clock3 size={14} aria-hidden="true" />{featured.readTime} min read<span aria-hidden="true">·</span>By {siteOperator.name}</span><span className="text-link">Read the guide <ArrowRight size={15} /></span></span>
    </Link></div></section>
    {guideGroups.map(group => <section className="section guide-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-heading`}><div className="container"><div className="guide-group-head"><h2 id={`${group.id}-heading`}>{group.heading}</h2><p>{group.text}</p></div><ul className="guide-card-grid">{group.slugs.map(slug => tips.find(tip => tip.slug === slug)!).filter(tip => tip.slug !== FEATURED).map(tip => <li key={tip.slug}><GuideCard tip={tip} /></li>)}</ul></div></section>)}
    <section className="section guide-tools-strip"><div className="container"><p>Put the advice into practice with the free <Link href="/cover-letter-maker/">cover letter maker</Link>, <Link href="/resume-keyword-checker/">resume keyword checker</Link>, and <Link href="/resume-summary-builder/">summary builder</Link>, or browse <Link href="/cv-examples/">CV examples by job</Link>.</p><Link href="/tools/" className="text-link">All free tools <ArrowUpRight size={15} /></Link></div></section>
    <AdSlot placement="tips" /><section className="closing-cta"><div className="container closing-inner"><div><h2>Ready to make it your own?</h2><p>Your story, thoughtfully presented.</p></div><div className="closing-actions"><StartCVButton className="button dark large" /><span>No sign-up. No fees. {templates.length} free templates.</span></div></div></section></main><Footer /></>;
}
