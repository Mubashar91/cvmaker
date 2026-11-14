import Link from "next/link";
import { Check, LockKeyhole } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { FaqList } from "@/components/faq-list";
import { NewCVButton, StartCVButton } from "@/components/start-cv-button";
import { DETAIL_PREVIEW_SIZES, examplePreview, previewSrcSet } from "@/lib/previews";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/structured-data";
import { noExperiencePage as page } from "@/lib/tools";
import { SampleDocument } from "@/components/collection-example";
import { UseExampleButton } from "@/components/use-example-button";
import { noExperienceExample } from "@/lib/no-experience-example";
import { sampleCV } from "@/lib/sample-cv";

const exampleCV = sampleCV(noExperienceExample.cv);
import type { Section } from "@/lib/model";

export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path, image: "/social/cv-with-no-experience.png" });
const firstCVOrder: Section[] = ["summary", "education", "projects", "experience", "skills", "languages", "certifications", "additional"];
const faqs = [
  { question: "How do I create a CV with no work experience?", answer: "Choose a simple layout, add your contact details and a short introduction, then describe relevant education, projects, volunteering, activities, or responsibilities. Use examples of what you did to support each skill. Empty sections are omitted from your PDF." },
  { question: "Is this resume builder free without payment?", answer: "Yes. Creating, editing, and downloading the A4 PDF are free. There is no account, subscription, credit card requirement, or watermark." },
  { question: "Can I make a first-job CV if I am not a student?", answer: "Yes. Use relevant training, personal projects, community activities, or everyday responsibilities. You can move your strongest section above education in the editor. Do not invent employment to fill a gap." },
  { question: "What should I write if I have no qualifications?", answer: "Include any relevant training, certificates, practical projects, or responsibilities you can explain. Leave empty education entries out and put your strongest evidence first. Keep dates and course completion status accurate." },
  { question: "How long should my first resume be?", answer: "Aim for a focused page when you have little relevant experience. Use more space only when the application needs it. Check the employer's instructions and proofread the preview before downloading." },
];

export default function NoExperiencePage() {
  return <><Header /><main id="main-content">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: page.label, path: page.path }])} />
    <StructuredData data={faqSchema(faqs)} />
    <section className="template-detail-hero"><div className="container template-detail-grid"><div className="template-detail-copy">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: page.label }]} />
      <p className="template-detail-kind">First jobs · Returning to work · New beginnings</p>
      <h1>CV example with no experience</h1>
      <p className="template-detail-description">Your first CV can start with what you have already done.</p>
      <p>You do not need a job history to show how you learn, solve problems, or help others. Below is a complete CV example with no paid work in it at all, plus a free resume builder that starts you on the same structure: projects, education, volunteering, and responsibilities you can explain in an interview.</p>
      <ul className="check-list"><li><Check size={18} />Start with education and projects before employment</li><li><Check size={18} />Empty sections stay out of your PDF</li><li><Check size={18} />Free PDF download, no sign-up or watermark</li></ul>
      <NewCVButton template="clarity" sectionOrder={firstCVOrder} className="button accent large">Create my first CV</NewCVButton>
      <span className="template-detail-privacy"><LockKeyhole size={14} />Your CV details stay on your device.</span>
    </div><figure className="template-detail-example"><img src={examplePreview("student")} srcSet={previewSrcSet(examplePreview("student"))} sizes={DETAIL_PREVIEW_SIZES} width={953} height={1348} fetchPriority="high" alt="Fictional student CV showing education, a university project, activities, skills, and part-time work" /><figcaption>A fictional student example with part-time experience. Use only the sections that fit your background.</figcaption></figure></div></section>

    <section className="section student-structure"><div className="container advice-grid"><h2>What to put on a CV instead of work experience.</h2><div>
      <p>Choose evidence that relates to the role you want. A practical project can show problem solving; regular volunteering can show reliability. Explain your part, rather than listing personal qualities without examples.</p>
      <ol className="student-order">{["Contact details: a name, professional email, phone, and location.", "A short objective: the role you want and one relevant strength.", "Education or training: relevant courses, modules, and accurate completion dates.", "Projects: what you made, researched, fixed, or organised.", "Volunteering and responsibilities: your contribution and how often you helped.", "Skills and languages: tools you can use and honest proficiency levels."].map((item, index) => <li key={item}><span className="step-number">{index + 1}</span>{item}</li>)}</ol>
      <p>If you are not studying, move your strongest project or relevant activity above education. Add volunteer work as an experience entry, or rename the additional section to Volunteering. Leave unused sections empty or hide them.</p>
    </div></div></section>

    <section className="section hub-examples" id="worked-example"><div className="container"><div className="article">
      <h2>A full CV example with no work experience</h2>
      <p>Leah is 17 and has never had a paid job. Her CV still fills a page, because everything on it is something she did regularly and can talk about. Read it as a model of structure, then open it in the editor and replace every line with your own.</p>
      <SampleDocument cv={exampleCV} label="Fictional CV for Leah Carter, a student with no work experience" />
      <p className="sample-caption">Fictional student, school, and community run · Clarity template</p>
      <h3>Why this CV works without a job</h3><ul>{noExperienceExample.why.map(point => <li key={point}>{point}</li>)}</ul>
      <div className="landing-actions"><UseExampleButton cv={exampleCV} className="button dark">Edit this example free</UseExampleButton></div>
    </div></div></section>

    <section className="section student-evidence"><div className="container"><div className="section-head"><div><h2>Turn a responsibility into evidence.</h2><p>These examples are fictional. Replace them with details that are true for you.</p></div></div><div className="country-grid">
      <article><h3>A personal project</h3><p>“Built a simple booking page using HTML, CSS, and JavaScript; tested the form on mobile and fixed keyboard navigation.”</p><p>Shows practical tools, testing, and attention to usability.</p></article>
      <article><h3>A community activity</h3><p>“Prepared tables and welcomed visitors at a weekly community lunch; helped the coordinator record attendance.”</p><p>Shows a regular commitment and clear responsibilities.</p></article>
      <article><h3>A group assignment</h3><p>“Coordinated a four-person coursework presentation; combined research notes and checked references before submission.”</p><p>Shows organisation and a specific contribution to a team.</p></article>
      <article><h3>Everyday responsibilities</h3><p>“Planned weekly appointments and maintained a shared household calendar alongside part-time study.”</p><p>Shows planning without sharing sensitive family information.</p></article>
    </div><p className="student-tools">Write your own line with the <Link href="/resume-bullet-point-generator/">free resume bullet point builder</Link>. Start your introduction with the <Link href="/resume-objective-generator/">resume objective generator</Link>, and choose <Link href="/resume-skills/">skills you can demonstrate</Link>.</p></div></section>

    <section className="section student-structure"><div className="container advice-grid"><h2>A simple first-job CV format.</h2><div><p>The button above starts a blank CV in Clarity, a plain single-column template, with education and projects near the top. Add your own content and preview the A4 PDF before downloading.</p><p>Already started a CV? Choose Clarity while keeping your current details, then arrange your sections in the editor.</p><StartCVButton template="clarity" className="button outline">Use Clarity with my current CV</StartCVButton><p className="student-tools">For school and university applications, see the <Link href="/cv-maker-for-students/">CV maker for students and graduates</Link>. For a detailed walkthrough, read <Link href="/tips/your-first-cv/">how to write your first CV</Link> or the <Link href="/tips/projects-on-a-cv/">projects guide</Link>.</p></div></div></section>

    <section className="section faq-section"><div className="container faq-grid"><div><h2>First CV questions.</h2><p>A short, honest application is a useful place to start.</p></div><FaqList faqs={faqs} /></div></section>
    <section className="closing-cta"><div className="container closing-inner"><div><h2>Ready for your first application?</h2><p>Add your own evidence, review the preview, and download your PDF.</p></div><div className="closing-actions"><NewCVButton template="clarity" sectionOrder={firstCVOrder} className="button dark large">Create my first CV</NewCVButton><span>No sign-up. No payment. No watermark.</span></div></div></section>
  </main><Footer /></>;
}
