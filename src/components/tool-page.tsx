import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Header, Footer } from "./site-chrome";
import { Breadcrumbs } from "./breadcrumbs";
import { StructuredData } from "./structured-data";
import { FaqList, type FAQ } from "./faq-list";
import { RichText } from "./rich-text";
import { ToolIcon } from "./tool-icon";
import { NewCVButton } from "./start-cv-button";
import { breadcrumbSchema } from "@/lib/seo";
import { faqSchema, toolSchema } from "@/lib/structured-data";
import { tool, tools, toolsHub, type ToolPath } from "@/lib/tools";

export interface ToolGuideSection { id: string; heading: string; paragraphs: string[]; bullets?: string[]; example?: { label: string; text: string } }

/** Shared page for a free browser tool: the tool first, then guidance a reader can use without it. */
export function ToolPage({ path, heading, intro, points, featureList, guide, faqs, children, extra }: {
  path: ToolPath; heading: string; intro: string; points: string[]; featureList: string[]; guide: ToolGuideSection[]; faqs: FAQ[]; children: ReactNode;
  /** Optional content between the tool and the guidance, e.g. a browsable reference list. */
  extra?: ReactNode;
}) {
  const page = tool(path);
  return <><Header /><main id="main-content">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: toolsHub.label, path: toolsHub.path }, { name: page.name, path }])} />
    <StructuredData data={toolSchema({ path, name: `Folio ${page.name}`, description: page.description, featureList })} />
    <StructuredData data={faqSchema(faqs)} />
    <section className="page-hero tool-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: toolsHub.label, href: toolsHub.path }, { name: page.name }]} /><h1>{heading}</h1><p>{intro}</p><ul className="page-hero-points">{points.map(point => <li key={point}><Check size={16} />{point}</li>)}</ul></div></section>
    <section className="tool-section" aria-label={page.name}><div className="container">{children}</div></section>
    {extra}
    <div className="section tool-guide"><div className="container tool-guide-grid"><nav className="guide-toc" aria-label="On this page"><h2>On this page</h2>{guide.map(section => <a key={section.id} href={`#${section.id}`}>{section.heading}</a>)}<a href="#faq">Frequently asked questions</a></nav><article className="article">
      {guide.map(section => <section id={section.id} key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}><RichText text={paragraph} /></p>)}{section.example && <aside className="article-example"><span>{section.example.label}</span>{section.example.text.split(/\n{2,}/).map(text => <p key={text}>{text}</p>)}</aside>}{section.bullets && <ul>{section.bullets.map(point => <li key={point}><RichText text={point} /></li>)}</ul>}</section>)}
      <section id="faq" className="article-faq"><h2>Frequently asked questions</h2><FaqList faqs={faqs} /></section>
    </article></div></div>
    <section className="section related-tools"><div className="container"><h2>More free tools.</h2><ul className="tool-grid is-compact">{tools.filter(item => item.path !== path).map(item => <li key={item.path}><Link href={item.path} className="tool-card"><span className="tool-card-icon"><ToolIcon name={item.icon} size={19} /></span><h3>{item.name}</h3><p>{item.summary}</p><span className="tool-card-link">Open <ArrowRight size={15} /></span></Link></li>)}</ul></div></section>
    <section className="closing-cta"><div className="container closing-inner"><div><h2>Put it all together.</h2><p>Build the CV to go with it, free from start to finish.</p></div><div className="closing-actions"><NewCVButton className="button dark large">Create my free CV</NewCVButton><span>No sign-up. No payment. No watermark.</span></div></div></section>
  </main><Footer /></>;
}
