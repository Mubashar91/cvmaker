import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Check, FolderOpen, Globe2, HeartHandshake, LockKeyhole, ShoppingBag, Users } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { FaqList } from "@/components/faq-list";
import { TemplateGallery } from "@/components/template-gallery";
import { NewCVButton } from "@/components/start-cv-button";
import { UseExampleButton } from "@/components/use-example-button";
import { cvExample, exampleCV } from "@/lib/cv-examples";
import type { Section } from "@/lib/model";
import { examplePreview } from "@/lib/previews";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/structured-data";
import { collectionPath, templateCollections } from "@/lib/template-collections";
import { studentPage } from "@/lib/tools";

export const metadata = pageMetadata({ title: studentPage.title, description: studentPage.description, path: studentPage.path, image: "/social/cv-maker-for-students.png" });

// Education before experience: a student's strongest evidence goes first.
const STUDENT_ORDER: Section[] = ["summary", "education", "projects", "experience", "skills", "languages", "certifications", "additional"];
const evidence = [
  { icon: BookOpen, title: "Education", text: "Your course, grades or predicted grades, and two or three relevant modules or a dissertation topic." },
  { icon: FolderOpen, title: "Projects", text: "Coursework, group projects, and things you have built, written, or organised on your own." },
  { icon: ShoppingBag, title: "Part-time and casual work", text: "Retail, hospitality, tutoring, or babysitting: each shows reliability and working with people." },
  { icon: HeartHandshake, title: "Volunteering", text: "Charity work, mentoring, or helping at events. Say what you did and how often." },
  { icon: Users, title: "Clubs and societies", text: "Committee roles, sports teams, and student societies show leadership and teamwork." },
  { icon: Globe2, title: "Skills and languages", text: "Software you use, languages you speak, and any certificates or awards." },
];
const faqs = [
  { question: "Is the student CV maker really free?", answer: "Yes. Every template, the editor, and the PDF download are free, with no account, trial, or watermark. Your details stay on your device." },
  { question: "How do I make a CV with no work experience?", answer: "Lead with your education, then add projects, volunteering, part-time work, and activities. Describe each one with what you did and what came of it. Our guide to [writing a CV with no experience](/tips/your-first-cv/) walks through it step by step." },
  { question: "How long should a student CV be?", answer: "One page is usually enough for a student, school leaver, or recent graduate. In Australia, two pages is also common. Never stretch content to fill space." },
  { question: "Should I put a photo on my student CV?", answer: "Not for jobs in the UK, US, Canada, or Australia, unless the employer asks for one. Leaving it out keeps the focus on your experience." },
  { question: "Can I use the CV maker for internship applications?", answer: "Yes. Start with the education-first layout, add a short [resume objective](/resume-objective-generator/) that names the internship, and send a tailored [cover letter](/cover-letter-maker/) if the application allows one." },
];

export default function StudentCVMakerPage() {
  const example = cvExample("student")!;
  const studentTemplates = templateCollections.find(collection => collection.slug === "student")!;
  return <><Header /><main id="main-content">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: studentPage.label, path: studentPage.path }])} />
    <StructuredData data={faqSchema(faqs)} />
    <section className="template-detail-hero"><div className="container template-detail-grid">
      <div className="template-detail-copy">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: studentPage.label }]} />
        <p className="template-detail-kind">Students · School leavers · Graduates</p>
        <h1>Free CV maker for students and graduates.</h1>
        <p className="template-detail-description">Make your first CV in minutes, even with no work experience.</p>
        <p>A free CV maker and student resume builder with an education-first layout. Add your projects, part-time jobs, and activities, and download a clean PDF. Built for students, school leavers, and fresh graduates applying for internships, apprenticeships, and first jobs in the UK, US, Canada, or Australia.</p>
        <ul className="check-list"><li><Check size={18} />Education placed first, then projects and experience</li><li><Check size={18} />Writing guidance for every section</li><li><Check size={18} />Free PDF download, no sign-up or watermark</li></ul>
        <NewCVButton template="student" sectionOrder={STUDENT_ORDER} className="button accent large">Start my student CV</NewCVButton>
        <span className="template-detail-privacy"><LockKeyhole size={14} />Your details stay on your device.</span>
      </div>
      <figure className="template-detail-example"><img src={examplePreview("student")} alt="Student CV example with education first, a part-time sales job, a society treasurer role, a university project, skills, and languages" width={953} height={1348} fetchPriority="high" /><figcaption>Fictional student CV · Student template · A4 PDF</figcaption></figure>
    </div></section>

    <section className="section student-structure"><div className="container advice-grid"><h2>The best CV format for students with no experience.</h2><div>
      <p>Use a reverse-chronological CV with your education near the top. Employers reading a student CV look for evidence of how you work, and your course, projects, and activities are where that evidence lives. Once you have a relevant job or placement, it can move above education.</p>
      <ol className="student-order">{["Name and contact details", "A short profile or objective", "Education", "Projects", "Work experience, including part-time and volunteering", "Skills and languages", "Certificates, awards, or interests"].map((item, index) => <li key={item}><span className="step-number">{index + 1}</span>{item}</li>)}</ol>
      <p>Keep it to one page and use a simple layout with standard headings. See how it comes together in the <Link href={`/cv-examples/${example.slug}/`}>student CV example</Link>. Not currently studying? Use the <Link href="/cv-with-no-experience/">first-job CV builder</Link> to start with projects, training, and other responsibilities.</p>
    </div></div></section>

    <section className="section student-evidence"><div className="container"><div className="section-head"><div><h2>A CV with no experience still has evidence.</h2><p>Everything below counts. Describe each one with what you did and what came of it.</p></div><Link href="/tips/your-first-cv/" className="text-link">Read the first CV guide <ArrowUpRight size={16} /></Link></div>
      <ul className="evidence-grid">{evidence.map(item => <li key={item.title}><item.icon size={22} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></li>)}</ul>
    </div></section>

    <section className="section templates-catalog" aria-labelledby="student-templates"><div className="container"><div className="section-head"><div><h2 id="student-templates">Simple student CV templates.</h2><p>{studentTemplates.templates.length} clear layouts that suit a first CV. Switch at any time without retyping.</p></div><Link href={collectionPath("student")} className="text-link">About these templates <ArrowUpRight size={16} /></Link></div><TemplateGallery templateIds={studentTemplates.templates} /></div></section>

    <section className="section student-countries"><div className="container"><h2>Student CVs in different countries.</h2><div className="country-grid">
      <article><h3>United Kingdom</h3><p>Call it a CV. List A levels or equivalent with grades, summarise GCSEs on one line, and give your degree classification or predicted grade. <Link href="/tips/uk-cv-format/">UK CV format</Link></p></article>
      <article><h3>United States</h3><p>Call it a resume and keep it to one page. Include your GPA only if it is strong, and start with a short objective. <Link href="/tips/us-resume-format/">US resume format</Link></p></article>
      <article><h3>Canada</h3><p>One page, no photo or personal details. Co-op placements and volunteer work carry real weight. <Link href="/tips/canadian-resume-format/">Canadian resume format</Link></p></article>
      <article><h3>Australia</h3><p>Casual work in retail or hospitality is valuable evidence. Include your work rights and referees if you have them. <Link href="/tips/australian-resume-format/">Australian resume format</Link></p></article>
    </div></div></section>

    <section className="section student-example"><div className="container student-example-grid">
      <div><h2>Start from a student CV example.</h2><p>{example.intro}</p><UseExampleButton cv={exampleCV(example)} className="button dark">Edit the student example</UseExampleButton><p className="student-tools">Need a first line? Try the free <Link href="/resume-objective-generator/">resume objective generator</Link>, find <Link href="/resume-skills/">skills to put on your resume</Link>, or write a <Link href="/cover-letter-maker/">cover letter</Link> to go with it. Applying for something specific? Read how to write a CV for a <Link href="/tips/part-time-job-cv/">part-time job</Link> or an <Link href="/tips/internship-cv/">internship</Link>, and how to <Link href="/tips/projects-on-a-cv/">describe projects on a CV</Link>.</p></div>
      <Link href={`/cv-examples/${example.slug}/`} className="related-template"><span className="template-sheet"><img src={examplePreview("student")} alt="" width={953} height={1348} loading="lazy" /></span><span className="related-name">Student CV example <ArrowRight size={17} /></span><span className="template-note">Profiles, bullet points, and tips</span></Link>
    </div></section>

    <section className="section faq-section student-faq"><div className="container faq-grid"><div><h2>Student CV questions.</h2><p>Quick answers for your first applications.</p></div><FaqList faqs={faqs} /></div></section>
    <section className="closing-cta"><div className="container closing-inner"><div><h2>Your first CV<br /><span className="editorial-type">starts here.</span></h2><p>Education first. Free from start to finish.</p></div><div className="closing-actions"><NewCVButton template="student" sectionOrder={STUDENT_ORDER} className="button dark large">Start my student CV</NewCVButton><span>No sign-up. No payment. No watermark.</span></div></div></section>
  </main><Footer /></>;
}
