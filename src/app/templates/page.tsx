import Link from "next/link";
import { Check, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TemplateGallery } from "@/components/template-gallery";
import { TemplateCollections } from "@/components/template-collections";
import { StartCVButton } from "@/components/start-cv-button";
import { StructuredData } from "@/components/structured-data";
import { templateCountWord, templateStyles, templates } from "@/lib/model";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { faqSchema, templateCollectionSchema } from "@/lib/structured-data";
import { FaqList } from "@/components/faq-list";
import { RichText } from "@/components/rich-text";
export const metadata = pageMetadata({ title: `${templates.length} Free CV Templates (UK) — Edit & Download PDF`, description: `Compare ${templates.length} free CV templates for UK jobs, from traditional to modern. Edit online, then download a PDF or an editable Word file. No sign-up.`, path: "/templates/", image: "/social/templates.png" });

// Written for this page only: choosing by situation, and UK-template questions.
const chooseNotes = [
  { heading: "Leaving school, college, or university", text: "If education is your strongest section, pick a layout that lets it lead without the page looking thin. [Student](/templates/student/) puts a centred header over clear section bands, and [Linear](/templates/linear/) keeps everything in one plain column, so a short CV still reads as finished. The [student CV maker](/cv-maker-for-students/) explains what to include." },
  { heading: "Several years of experience", text: "When work history fills most of the page, employers and dates need to scan in seconds. [Professional](/templates/professional/) and [Regent](/templates/regent/) use restrained serif headings with fine rules, while [Executive](/templates/executive/) adds a full-width header band that suits senior and client-facing roles." },
  { heading: "Applying through an online portal", text: "Large employers often load CVs into an applicant tracking system before anyone reads them. One column with standard section names is the safest choice: [Clarity](/templates/clarity/) has no graphics or side panels at all, and the [ATS-friendly collection](/templates/category/ats-friendly/) lists the other plain layouts." },
  { heading: "Design, marketing, and digital roles", text: "Where the CV itself shows judgement, a little character helps, as long as it still reads well printed in black and white. [Creative](/templates/creative/) pairs editorial serif headings with warm accents, and [Atelier](/templates/atelier/) organises the page into numbered chapters." },
];
const templateFaqs = [
  { question: "Is there a free CV template in Word?", answer: "Yes. Any CV you make here downloads as an editable Word (.docx) file as well as a PDF, free. The Word file keeps your sections, headings, dates, accent colour, and typeface in one clean column; side panels, bands, and icons are part of the PDF design only. Send the .docx when an employer asks for Word, and the PDF otherwise." },
  { question: "What makes a CV template suitable for the UK?", answer: "A4 pages, a short profile at the top, work history in reverse date order, and no date of birth, marital status, or photo unless the employer asks. Every template here follows that order by default, and the editor lets you rename or hide any section that doesn't apply to you." },
  { question: "Do UK employers expect a photo on a CV?", answer: "Usually not, and leaving it out keeps the focus on your experience. The templates with a photo space are there for roles and countries where a photo is customary; filter by With photo to find them. Each of those layouts still works without one." },
  { question: "How many pages should my CV be?", answer: "Two A4 pages is the usual length for an experienced UK applicant, and one page is often enough for a first job. If you are over two pages, choose a denser layout such as [Compact](/templates/compact/) before cutting content, then remove anything older or less relevant." },
  { question: "Can I switch templates after I've written my CV?", answer: "Yes. Your details are stored separately from the design, so moving between templates keeps every entry and bullet point. Download two or three versions as PDFs and compare them side by side before you apply." },
];
export default function Templates() {
  return <><Header /><main id="main-content"><StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV templates", path: "/templates/" }])} /><StructuredData data={templateCollectionSchema()} /><StructuredData data={faqSchema(templateFaqs)} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV templates" }]} /><h1>{templateCountWord} free CV templates for UK jobs.</h1><p>Every free CV template here is set on A4, the UK standard, with careful typography and room for your experience. Edit online and download a PDF in the design you choose, plus an editable Word copy of the same content if an employer asks for one. Every colour is yours to choose, and switching never loses your details.</p><ul className="page-hero-points"><li><Check size={16} />Free PDF and Word downloads</li><li><Check size={16} />No watermarks</li><li><Check size={16} />Any accent colour</li><li><Check size={16} />Optional photo layouts</li><li><Check size={16} />Switch without starting over</li></ul></div></section>
    <section className="section templates-catalog" aria-label="Choose a CV template"><div className="container"><TemplateGallery headingLevel={2} /><p className="catalog-privacy"><ShieldCheck size={18} />The examples use fictional details. Your CV starts blank, and your information stays on your device.</p></div></section>
    <section className="section collection-section"><div className="container"><div className="section-head"><div><h2>Start with what you need.</h2><p>Practical collections for different applications, with advice on choosing your layout.</p></div></div><TemplateCollections /></div></section>
    <section className="section template-writing" id="choose"><div className="container">
      <div className="section-head"><div><h2>How to choose a CV template for UK applications.</h2><p>Start from your situation, not the look. The best CV template is the one that puts your strongest evidence where an employer looks first.</p></div></div>
      <div className="writing-grid is-pairs">{chooseNotes.map(note => <article key={note.heading}><h3>{note.heading}</h3><p><RichText text={note.text} /></p></article>)}</div>
      <p className="template-choose-more">Still deciding? Fill in your real details once, then switch between two or three layouts and compare the PDFs. The <Link href="/tips/choose-your-template/">guide to choosing a template</Link> covers employer instructions, photos, and reading order in more depth.</p>
    </div></section>
    <section className="section template-faq"><div className="container faq-grid">
      <div><h2>Questions about free CV templates.</h2><p>Downloads, formats, and UK conventions. The <Link href="/">CV maker homepage</Link> answers questions about the editor itself.</p></div>
      <FaqList faqs={templateFaqs} />
    </div></section>
    <section className="section template-advice"><div className="container advice-grid"><h2>A good template makes your experience easy to follow.</h2><div><p>Compare traditional serif layouts, contemporary introductions, expressive headings, and simple formats. Need a photo? Use the “With photo” filter.</p><ul className="template-style-links">{templateStyles.map(style => <li key={style}><strong>{style} CV templates</strong><span>{templates.filter(template => template.style === style).map((template, index) => <span key={template.id}>{index > 0 && ", "}<Link href={`/templates/${template.id}/`}>{template.name}</Link></span>)}</span></li>)}</ul><p>The right choice depends on your information and any instructions from the employer. Try a few designs in the live editor — your details stay with you when you switch.</p><Link href="/tips/choose-your-template/" className="text-link">Read the template guide <ArrowUpRight size={15} /></Link></div></div></section>
    <section className="closing-cta"><div className="container closing-inner"><div><h2>Found your kind of first impression?</h2><p>Start with your details. The layout is taken care of.</p></div><div className="closing-actions"><StartCVButton className="button dark large" /><span>No account. No payment. No watermark.</span></div></div></section>
  </main><Footer /></>;
}
