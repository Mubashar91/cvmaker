import Link from "next/link";
import { ArrowRight, Check, Clock3, Copy, FileDown, FileText, LockKeyhole } from "lucide-react";
import { Header, Footer } from "./site-chrome";
import { Breadcrumbs } from "./breadcrumbs";
import { StructuredData } from "./structured-data";
import { FaqList } from "./faq-list";
import { RichText } from "./rich-text";
import { SampleDocument } from "./collection-example";
import { UseExampleButton } from "./use-example-button";
import { NewCVButton } from "./start-cv-button";
import { ScheduledBanner } from "./scheduled-banner";
import { contentModified } from "@/lib/content-dates";
import { isVisible, scheduled } from "@/lib/scheduled-pages";
import { sampleCV } from "@/lib/sample-cv";
import { templateById } from "@/lib/model";
import { siteOperator } from "@/lib/site-info";
import { breadcrumbSchema, formatDate } from "@/lib/seo";
import { faqSchema, landingSchema } from "@/lib/structured-data";
import type { LandingPage, LandingSection } from "@/lib/landing-types";

/** Where `npm run word:templates` writes each page's editable example. */
export const wordTemplatePath = (slug: string) => `/word-templates/${slug}.docx`;

function Section({ section }: { section: LandingSection }) {
  return <section id={section.id}><h2>{section.heading}</h2>
    {section.paragraphs.map((paragraph, index) => <p key={index}><RichText text={paragraph} /></p>)}
    {section.table && <div className="article-table" role="region" aria-label={section.table.caption} tabIndex={0}><table><caption>{section.table.caption}</caption><thead><tr>{section.table.head.map(cell => <th key={cell} scope="col">{cell}</th>)}</tr></thead><tbody>{section.table.rows.map((row, index) => <tr key={index}>{row.map((cell, index) => index === 0 ? <th key={index} scope="row">{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>}
    {section.subsections?.map(sub => <div className="article-subsection" key={sub.heading}><h3>{sub.heading}</h3>{sub.paragraphs.map((paragraph, index) => <p key={index}><RichText text={paragraph} /></p>)}{sub.bullets && <ul>{sub.bullets.map((point, index) => <li key={index}><RichText text={point} /></li>)}</ul>}</div>)}
    {section.example && <aside className="article-example"><span>{section.example.label}</span>{section.example.text.split(/\n{2,}/).map((text, index) => <p key={index}>{text}</p>)}</aside>}
    {section.bullets && <ul>{section.bullets.map((point, index) => <li key={index}><RichText text={point} /></li>)}</ul>}
  </section>;
}

/** A scheduled guide-style page: guidance, a full worked example CV, downloads, and a FAQ. */
export function LandingArticle({ page }: { page: LandingPage }) {
  const path = `/${page.slug}/`; const meta = scheduled(path); const updated = contentModified(path);
  const cv = sampleCV(page.example.cv); const template = templateById(cv.template);
  const related = page.related.filter(link => isVisible(link.href));
  const toc = [...page.sections, { id: "worked-example", heading: page.example.heading }, ...page.after, { id: "faq", heading: "Frequently asked questions" }];
  // The hero sits on the dark desk colour, so its secondary buttons use the on-dark style.
  const actions = (onDark: boolean) => { const secondary = onDark ? "button on-dark large" : "button outline large"; return <div className="landing-actions">
    <UseExampleButton cv={cv} className={onDark ? "button accent large" : "button dark large"}>Edit this example free</UseExampleButton>
    {page.download && <a className={secondary} href={wordTemplatePath(page.slug)} download><FileDown size={18} aria-hidden="true" />{page.download.label}</a>}
    {page.googleDocsCopyUrl && <a className={secondary} href={page.googleDocsCopyUrl} rel="noopener"><Copy size={18} aria-hidden="true" />Make a copy in Google Docs</a>}
  </div>; };
  return <><Header /><main id="main-content">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: page.h1, path }])} />
    <StructuredData data={landingSchema({ path, headline: page.h1, description: meta.description, publishAt: meta.publishAt, slug: page.slug })} />
    <StructuredData data={faqSchema(page.faqs)} />
    <ScheduledBanner path={path} />
    <section className="page-hero article-hero landing-hero"><div className="container">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: page.h1 }]} />
      <span className="article-category">{page.kicker}</span><h1>{page.h1}</h1>
      <div className="article-meta"><Link href="/about/" rel="author"><FileText size={15} />By {siteOperator.name}</Link><span><Clock3 size={15} />Updated <time dateTime={updated}>{formatDate(updated)}</time></span></div>
      <p className="landing-intro"><RichText text={page.intro} /></p>
      <ul className="page-hero-points">{page.points.map(point => <li key={point}><Check size={16} />{point}</li>)}</ul>
      {actions(true)}
      {page.note && <p className="landing-note">{page.note}</p>}
    </div></section>
    <div className="guide-layout container section"><nav className="guide-toc" aria-label="On this page"><h2>On this page</h2>{toc.map(item => <a key={item.id} href={`#${item.id}`}>{item.heading}</a>)}</nav><article className="article">
      {page.sections.map(section => <Section key={section.id} section={section} />)}
      <section id="worked-example"><h2>{page.example.heading}</h2>
        {page.example.paragraphs.map((paragraph, index) => <p key={index}><RichText text={paragraph} /></p>)}
        <SampleDocument cv={cv} label={`Fictional example CV for ${cv.personal.name}`} />
        <p className="sample-caption">A fictional person, with invented employers and schools. Shown in the {template.name} template; the Word download is the same content in one editable column.</p>
        {page.example.notes.map(note => <div className="article-subsection" key={note.heading}><h3>{note.heading}</h3><p><RichText text={note.text} /></p></div>)}
        {actions(false)}
        {page.download && <p className="landing-download-note"><LockKeyhole size={14} aria-hidden="true" />{page.download.note}</p>}
      </section>
      {page.after.map(section => <Section key={section.id} section={section} />)}
      <section id="faq" className="article-faq"><h2>Frequently asked questions</h2><FaqList faqs={page.faqs} /></section>
      {related.length > 0 && <aside className="landing-related"><h2>Related pages</h2><ul>{related.map(link => <li key={link.href}><Link href={link.href}>{link.label}<ArrowRight size={15} aria-hidden="true" /></Link></li>)}</ul></aside>}
      <div className="article-cta"><span>Build your own CV from this example, free.</span><NewCVButton className="button dark" template={cv.template}>Open the free CV builder</NewCVButton></div>
    </article></div>
  </main><Footer /></>;
}
