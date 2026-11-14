import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StartCVButton } from "@/components/start-cv-button";
import { StructuredData } from "@/components/structured-data";
import { SampleDocument } from "@/components/collection-example";
import { UseExampleButton } from "@/components/use-example-button";
import { cvExamples } from "@/lib/cv-examples";
import { hubExamples, ukFormat } from "@/lib/cv-examples-hub";
import { templateById, templates } from "@/lib/model";
import { examplePreview, previewSrcSet } from "@/lib/previews";
import { sampleCV } from "@/lib/sample-cv";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { cvExamplesCollectionSchema } from "@/lib/structured-data";

// cvExamples holds only published examples, so the count and cards grow as scheduled jobs go live.
const DESCRIPTION = `UK CV examples for ${cvExamples.length} jobs, plus full British CV examples for a career change, a career break, and a manager. Edit any of them free.`;
export const metadata = pageMetadata({ title: `CV Examples UK — ${cvExamples.length} Free British CV Examples by Job`, description: DESCRIPTION, path: "/cv-examples/", image: "/social/cv-examples.png" });

export default function CVExamples() {
  return <><Header /><main id="main-content">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV examples", path: "/cv-examples/" }])} />
    <StructuredData data={cvExamplesCollectionSchema(cvExamples, DESCRIPTION)} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV examples" }]} /><h1>CV examples for UK jobs</h1><p>Each CV example below is a complete, fictional British CV for one job, with profile examples, bullet points, and skills you can adapt. Further down, three more full examples show how a UK CV changes for a career change, a return to work, and a senior role. Open any of them in the free editor and replace every detail with your own.</p></div></section>
    <section className="section" aria-label="CV examples by job"><div className="container"><div className="related-template-grid example-grid">{cvExamples.map(example => <Link key={example.slug} href={`/cv-examples/${example.slug}/`} className="related-template"><span className="template-sheet"><img src={examplePreview(example.slug)} srcSet={previewSrcSet(examplePreview(example.slug))} sizes="(max-width: 640px) 45vw, 280px" alt={`${example.job} CV example`} width={953} height={1348} loading="lazy" decoding="async" /></span><span className="related-name">{example.job} CV <ArrowUpRight size={17} /></span><span className="template-note">{example.category} · {templateById(example.template).name} template</span></Link>)}</div></div></section>
    <section className="section hub-examples"><div className="container"><div className="article">
      <section id="uk-cv-format"><h2>{ukFormat.heading}</h2>{ukFormat.paragraphs.map(text => <p key={text}>{text}</p>)}
        <ol>{ukFormat.order.map(item => <li key={item}>{item}</li>)}</ol>
        <p>{ukFormat.leaveOut} The <Link href="/tips/uk-cv-format/">UK CV format guide</Link> covers length, right to work, and student CVs in more detail.</p>
      </section>
      {hubExamples.map(example => { const cv = sampleCV(example.cv); return <section id={example.id} key={example.id}><h2>{example.heading}</h2><p>{example.intro}</p>
        <SampleDocument cv={cv} label={`Fictional CV for ${cv.personal.name}`} />
        <p className="sample-caption">Fictional person, employers, and college · shown in the {templateById(cv.template).name} template</p>
        <h3>Why this example works</h3><ul>{example.why.map(point => <li key={point}>{point}</li>)}</ul>
        <div className="landing-actions"><UseExampleButton cv={cv} className="button dark">Edit this CV free</UseExampleButton><Link className="button outline" href={example.next.href}>{example.next.label}<ArrowRight size={16} aria-hidden="true" /></Link></div>
      </section>; })}
    </div></div></section>
    <section className="section template-detail-information"><div className="container info-grid">
      <article><h2>How to use these examples</h2><p>Read the example for your role, or the closest one, and notice how each line starts with an action and ends with a useful detail. Then open it in the editor, replace every detail with your own, and remove anything that does not fit your experience.</p><p>The people, employers, and figures are fictional. They show structure and wording, not facts to copy.</p></article>
      <article><h2>Not sure where to start?</h2><p>Begin with a blank CV and use the guides on <Link href="/tips/write-a-clear-profile/">writing a profile</Link> and <Link href="/tips/describe-your-experience/">describing your experience</Link>. You can switch between all {templates.length} templates at any point without retyping.</p></article>
    </div></section>
    <section className="closing-cta"><div className="container closing-inner"><div><h2>Your role. Your story.</h2><p>Start blank, or begin from an example.</p></div><div className="closing-actions"><StartCVButton className="button dark large" /><span>No sign-up. No fees. Free PDF download.</span></div></div></section>
  </main><Footer /></>;
}
