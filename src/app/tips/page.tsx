import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StartCVButton } from "@/components/start-cv-button";
import { StructuredData } from "@/components/structured-data";
import { AdSlot } from "@/components/ad-slot";
import { tips } from "@/lib/tips";
import { templates } from "@/lib/model";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "CV Writing Guides & Practical Resume Tips", description: "Practical CV advice for your next application. Learn how to write a profile, describe experience, build your first CV, and review your finished PDF.", path: "/tips/", image: "/social/tips.png" });
export default function Tips() {
  return <><Header /><main id="main-content"><StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV writing guides", path: "/tips/" }])} /><section className="page-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV writing guides" }]} /><h1>A clearer CV. A more confident next step.</h1><p>Helpful advice for telling your story honestly and presenting it well — from your first profile to the final check before you apply.</p></div></section><section className="section" aria-label="CV writing guides"><div className="container"><ul className="guide-list">{tips.map(tip => <li key={tip.slug}><Link href={`/tips/${tip.slug}/`} className="guide-row"><span className="guide-meta"><span>{tip.category}</span><span><Clock3 size={14} /> {tip.readTime} min read</span></span><h2>{tip.title}</h2><p>{tip.description}</p><ArrowUpRight className="guide-arrow" size={22} /></Link></li>)}</ul></div></section><AdSlot placement="tips" /><section className="closing-cta"><div className="container closing-inner"><div><h2>Ready to make it your own?</h2><p>Your story, thoughtfully presented.</p></div><div className="closing-actions"><StartCVButton className="button dark large" /><span>No sign-up. No fees. {templates.length} free templates.</span></div></div></section></main><Footer /></>;
}
