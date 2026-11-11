import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Download, FileDown, FileText, FileUp, GraduationCap, Laptop, ServerOff, ShieldCheck } from "lucide-react";
import { Header, Footer } from "./site-chrome";
import { HomeHero } from "./home-hero";
import { TemplateGallery } from "./template-gallery";
import { TemplateCollections } from "./template-collections";
import { AdSlot } from "./ad-slot";
import { FaqList } from "./faq-list";
import { ToolIcon } from "./tool-icon";
import { NewCVButton } from "./start-cv-button";
import { accentColors, newTemplates, templateCountWord, templates } from "@/lib/model";
import { faqs } from "@/lib/faqs";
import { tips } from "@/lib/tips";
import { studentPage, toolCardLabel, tools } from "@/lib/tools";

// Server-rendered: only the hero and the template gallery need JavaScript.
const homeGuides = ["your-first-cv", "ats-friendly-cv", "how-to-write-a-cover-letter", "resume-vs-cv"];

export function HomePage() {
  const guides = homeGuides.map(slug => tips.find(tip => tip.slug === slug)!);
  return <><Header /><main id="main-content">
    <HomeHero />

    <div className="benefits-band"><div className="container benefits-grid"><div><span>{templates.length}</span><p>thoughtfully crafted templates</p></div><div><span>100<small>%</small></span><p>free, from start to finish</p></div><div><span>PDF<Download size={22} strokeWidth={1.5} aria-hidden="true" /></span><p>ready for your next opportunity</p></div><div><span>Just you.</span><p>no account or sign-up needed</p></div></div></div>

    <section className="section home-templates" id="templates">
      <div className="container">
        <div className="section-head"><div><h2>Free CV templates.<br /><span className="editorial-type">Entirely your own.</span></h2><p>{templateCountWord} distinct designs, from traditional to modern. Find your fit, then make it yours. Switching keeps every detail you have typed.</p></div><Link href="/templates/" className="button outline">Explore all {templates.length} templates <ArrowUpRight size={17} /></Link></div>
        <TemplateGallery initialLimit={6} featured={newTemplates} />
      </div>
    </section>

    <section className="section collection-section"><div className="container"><div className="section-head"><div><h2>A starting point<br /><span className="editorial-type">for every next step.</span></h2><p>Your first job, a new direction, or a more senior role. Find the format that fits.</p></div><Link href={studentPage.path} className="text-link"><GraduationCap size={17} />Making your first CV as a student? <ArrowUpRight size={16} /></Link></div><TemplateCollections /></div></section>

    <section className="how-section" id="how-it-works"><div className="container">
      <div className="section-head"><div><h2>How it works.<br /><span className="editorial-type">Three simple steps.</span></h2><p>From a blank page to a finished PDF, with guidance in every section, so it works for beginners too. No account, no payment, and nothing to install.</p></div><span className="section-aside">Your experience. Beautifully put together.</span></div>
      <ol className="steps">
        <li className="step">
          <div className="step-vignette" aria-hidden="true"><div className="vig-drop"><FileUp size={22} /><strong>my-cv.pdf</strong><span>Read on this device</span></div><div className="vig-found"><Check size={14} />Name, experience, education and skills found</div></div>
          <h3><span className="step-number">1</span>Start with your story</h3>
          <p>Create a blank CV or import your existing PDF or DOCX. Review the extracted details and fill in what matters. Applying for your first job? <Link href="/cv-with-no-experience/">Build a CV with no experience</Link> using projects and responsibilities.</p>
        </li>
        <li className="step">
          <div className="step-vignette" aria-hidden="true"><div className="vig-field"><span>Professional title</span><div className="vig-input">Frontend Developer<i /></div></div><div className="vig-swatches">{accentColors.slice(0, 7).map((c, i) => <span key={c.value} className={i === 2 ? "is-on" : undefined} style={{ background: c.value }} />)}</div></div>
          <h3><span className="step-number">2</span>Make it your own</h3>
          <p>Choose a template and an accent colour, then see every change in a live preview. Reorder entries and keep only the sections you need.</p>
        </li>
        <li className="step">
          <div className="step-vignette" aria-hidden="true"><div className="vig-file"><span className="vig-pdf">PDF</span><div><strong>Alex Morgan CV.pdf</strong><span>2 pages · A4 · No watermark</span></div><Download size={18} /></div></div>
          <h3><span className="step-number">3</span>Send with confidence</h3>
          <p>Run the built-in review, then download a clean PDF with selectable text. Longer CVs flow onto more pages. Save a draft if you want to refine it later.</p>
        </li>
      </ol>
    </div></section>

    <section className="section tools-section" aria-labelledby="free-tools-heading"><div className="container">
      <div className="section-head"><div><h2 id="free-tools-heading">More than a CV maker.<br /><span className="editorial-type">Free tools for the whole application.</span></h2><p>The classic tools run in your browser with predefined templates and plain text matching — nothing uploaded. AI help is optional and sends only the text you choose. No account for any of them.</p></div><Link href="/tools/" className="text-link">See all free tools <ArrowUpRight size={16} /></Link></div>
      <ul className="tool-grid">{tools.map(item => <li key={item.path}><Link href={item.path} className="tool-card"><span className="tool-card-icon"><ToolIcon name={item.icon} size={21} /></span><h3>{item.name}</h3><p>{item.summary}</p><span className="tool-card-link">Open the {toolCardLabel(item.name)} <ArrowRight size={15} /></span></Link></li>)}
        <li><Link href="/cv-examples/" className="tool-card"><span className="tool-card-icon"><FileText size={21} aria-hidden="true" /></span><h3>CV examples by job</h3><p>Complete, fictional example CVs with profiles, bullet points, and skills you can adapt and edit for free.</p><span className="tool-card-link">Browse CV examples <ArrowRight size={15} /></span></Link></li>
      </ul>
    </div></section>

    <AdSlot placement="home" />

    <section className="privacy-band"><div className="container privacy-grid">
      <div className="privacy-copy"><span className="privacy-emblem" aria-hidden="true"><ShieldCheck size={27} strokeWidth={1.4} /></span><h2>Why choose Folio?<br /><span className="editorial-type">Your story stays your business.</span></h2><p>Your CV holds a lot about you. That’s why file imports, editing, previews, and PDF generation all happen right in your browser, with no paywall waiting at the download button.</p><ul className="check-list"><li><Check size={18} />No account, trial, or subscription</li><li><Check size={18} />Editing never uploads your CV; AI help is optional</li><li><Check size={18} />Save a draft only when you choose to</li><li><Check size={18} />No CV data sent to advertising or analytics</li></ul><Link href="/privacy/" className="text-link">Read our privacy promise <ArrowUpRight size={16} /></Link></div>
      <figure className="data-path">
        <div className="path-row">
          <div className="path-node"><FileText size={22} /><strong>Your file</strong><small>PDF or DOCX</small></div>
          <span className="path-link" aria-hidden="true" />
          <div className="path-node is-main"><Laptop size={22} /><strong>Your browser</strong><small>Reads, edits & typesets</small></div>
          <span className="path-link" aria-hidden="true" />
          <div className="path-node"><FileDown size={22} /><strong>Your PDF</strong><small>Saved on your device</small></div>
        </div>
        <div className="path-blocked"><span className="path-drop" aria-hidden="true" /><div className="path-node is-off"><ServerOff size={22} /><strong>No upload server</strong><small>Editing stays in your browser</small></div></div>
        <figcaption>Your CV moves from your file, through your browser, to your PDF. Editing never sends it to a server; optional AI help sends only the text you choose.</figcaption>
      </figure>
    </div></section>

    <section className="section guides-section"><div className="container">
      <div className="section-head"><div><h2>A little guidance.<br /><span className="editorial-type">For what comes next.</span></h2><p>Practical advice for CVs and resumes in the UK, US, Canada, and Australia.</p></div><Link href="/tips/" className="text-link">Browse all CV guides <ArrowUpRight size={16} /></Link></div>
      <ul className="guide-list">{guides.map(tip => <li key={tip.slug}><Link href={`/tips/${tip.slug}/`} className="guide-row"><span className="guide-meta"><span>{tip.category}</span><span>{tip.readTime} min read</span></span><h3>{tip.title}</h3><p>{tip.description}</p><ArrowUpRight className="guide-arrow" size={22} /></Link></li>)}</ul>
    </div></section>

    <section className="section faq-section" id="faq"><div className="container faq-grid"><div><h2>Frequently asked questions.</h2><p>Everything you need to feel comfortable getting started.</p><Link href="/privacy/" className="text-link">Your privacy, explained <ArrowUpRight size={15} /></Link></div><FaqList faqs={faqs} /></div></section>

    <section className="closing-cta"><div className="container closing-inner"><div><h2>Your next chapter<br /><span className="editorial-type">starts right here.</span></h2><p>You bring the story. We’ll help you tell it.</p></div><div className="closing-actions"><NewCVButton className="button dark large">Create my free CV</NewCVButton><span>No sign-up. No payment. Just possibilities.</span></div></div></section>
  </main><Footer /></>;
}
