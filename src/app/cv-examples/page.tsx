import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StartCVButton } from "@/components/start-cv-button";
import { StructuredData } from "@/components/structured-data";
import { cvExamples } from "@/lib/cv-examples";
import { templateById, templates } from "@/lib/model";
import { examplePreview } from "@/lib/previews";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { CV_EXAMPLES_DESCRIPTION, cvExamplesCollectionSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({ title: "CV Examples for Every Job — Free to Edit", description: CV_EXAMPLES_DESCRIPTION, path: "/cv-examples/", image: "/social/cv-examples.png" });

export default function CVExamples() {
  return <><Header /><main id="main-content">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV examples", path: "/cv-examples/" }])} />
    <StructuredData data={cvExamplesCollectionSchema(cvExamples)} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV examples" }]} /><h1>CV examples for real jobs.</h1><p>See how a strong CV reads for your role. Each example is a complete, fictional CV with profile examples, bullet points, and skills you can adapt. Open any of them in the free editor and replace the details with your own.</p></div></section>
    <section className="section" aria-label="CV examples by job"><div className="container"><div className="related-template-grid example-grid">{cvExamples.map(example => <Link key={example.slug} href={`/cv-examples/${example.slug}/`} className="related-template"><span className="template-sheet"><img src={examplePreview(example.slug)} alt={`${example.job} CV example`} width={953} height={1348} loading="lazy" /></span><span className="related-name">{example.job} CV <ArrowUpRight size={17} /></span><span className="template-note">{example.category} · {templateById(example.template).name} template</span></Link>)}</div></div></section>
    <section className="section template-detail-information"><div className="container info-grid">
      <article><h2>How to use these examples</h2><p>Read the example for your role, or the closest one, and notice how each line starts with an action and ends with a useful detail. Then open it in the editor, replace every detail with your own, and remove anything that does not fit your experience.</p><p>The people, employers, and figures are fictional. They show structure and wording, not facts to copy.</p></article>
      <article><h2>Not sure where to start?</h2><p>Begin with a blank CV and use the guides on <Link href="/tips/write-a-clear-profile/">writing a profile</Link> and <Link href="/tips/describe-your-experience/">describing your experience</Link>. You can switch between all {templates.length} templates at any point without retyping.</p></article>
    </div></section>
    <section className="closing-cta"><div className="container closing-inner"><div><h2>Your role. Your story.</h2><p>Start blank, or begin from an example.</p></div><div className="closing-actions"><StartCVButton className="button dark large" /><span>No sign-up. No fees. Free PDF download.</span></div></div></section>
  </main><Footer /></>;
}
