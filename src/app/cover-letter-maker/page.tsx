import { ToolPage } from "@/components/tool-page";
import { CoverLetterMaker } from "@/components/cover-letter-maker";
import { pageMetadata } from "@/lib/seo";
import { tool } from "@/lib/tools";

const page = tool("/cover-letter-maker/");
export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path, image: "/social/tools/cover-letter-maker.png" });

export default function CoverLetterMakerPage() {
  return <ToolPage path={page.path} heading="Free cover letter maker with professional templates."
    intro="Create a cover letter online for free. Add your details and the job, choose a professional layout, and get an editable letter written from predefined templates. Copy it, print it, or download it as a PDF. No sign-up."
    points={["No sign-up or watermark", "PDF, print, or copy", "A4 or US Letter", "Runs on your device"]}
    featureList={["Letter templates for experienced candidates, graduates, and career changers", "Classic, Modern, and Minimal layouts", "Live preview", "Edit every line", "Copy to clipboard", "Print", "PDF download in A4 or US Letter", "Optional save in this browser", "Reuse contact details from your CV"]}
    guide={[
      { id: "how-it-works", heading: "How the cover letter maker works", paragraphs: [
        "Fill in your details, the job, and a sentence or two about your experience. The maker places them into a predefined letter template for your situation: an experienced professional, a student or graduate, or someone changing careers. If you paste the job description, it names the skills from your list that the advert also mentions.",
        "Anything still missing is marked in [square brackets], so you can see exactly what to finish. Nothing is written by AI: every sentence comes from a fixed template or from your own words, and it all happens in your browser.",
        "Once you edit the letter text, your edits stay as you wrote them. Choose “Rewrite from my details” at any point to start again from the template.",
      ] },
      { id: "cover-letter-format", heading: "A professional cover letter format", paragraphs: [
        "Every layout follows the same business-letter structure that employers in the UK, US, Canada, and Australia expect. Keep it to one page, usually about 250 to 400 words. Our guide on [how to write a cover letter](/tips/how-to-write-a-cover-letter/) explains each part in more detail.",
      ], bullets: [
        "Your name and contact details, matching your CV.",
        "The date, then the hiring manager’s name and the company.",
        "A greeting: “Dear Ms Patel,” or “Dear Hiring Manager,”.",
        "An opening paragraph that names the role and why you fit it.",
        "One or two paragraphs of evidence from your experience.",
        "A short closing paragraph and a sign-off such as “Kind regards”.",
      ] },
      { id: "choose-a-template", heading: "Which letter template to choose", paragraphs: [
        "The template changes the opening, the framing of your experience, and the closing paragraph. Your own details stay the same, so you can switch and compare.",
      ], bullets: [
        "Experienced professional: leads with the experience and skills you already use in this kind of role.",
        "Student or graduate: frames your studies, projects, and part-time work as the start of your career. Suits internships, graduate schemes, and [first jobs](/cv-maker-for-students/).",
        "Career change: introduces your move into a new field and points to transferable skills.",
      ] },
      { id: "tips", heading: "Tips for a letter that gets read", paragraphs: ["A template gives you structure. These habits make the letter yours."], bullets: [
        "Write one letter for one job. Mention the company and the role by name.",
        "Use the advert’s wording for skills you genuinely have. The [resume keyword checker](/resume-keyword-checker/) shows which terms you already cover.",
        "Give one specific example with a result, rather than a list of adjectives.",
        "Address a named person when the advert or company website gives one.",
        "Use the same name and contact details as your CV, and save the PDF with your name in the file name.",
        "Read it aloud before you send it, and check the company name twice.",
      ] },
      { id: "example", heading: "Cover letter example", paragraphs: ["A short, fictional letter written with the graduate template and then edited by hand."], example: { label: "Illustrative cover letter (fictional)", text: "Dear Ms Okoro,\n\nI am writing to apply for the Junior Data Analyst position at Harbour Insights. I am at the start of my career and keen to build on what I have learned through my studies, projects, and experience so far.\n\nDuring a summer internship at Lakeside Retail Group, I cleaned and combined weekly sales data from twelve stores and built a dashboard that the regional manager now uses every week.\n\nYour advert mentions SQL, Power BI, and stakeholder reporting, which I have developed through my studies and practical work.\n\nThank you for considering my application. I would welcome the opportunity to learn from your team and contribute to Harbour Insights, and I look forward to hearing from you.\n\nKind regards,\nAmara Lewis" } },
    ]}
    faqs={[
      { question: "Is the cover letter maker really free?", answer: "Yes. Writing, editing, copying, printing, and downloading your letter as a PDF are all free, with no account, trial, or watermark." },
      { question: "Does the cover letter maker use AI?", answer: "No. It combines your details with predefined paragraph templates using simple text formatting in your browser. Nothing is sent to an AI service, and you can edit every line." },
      { question: "Can I download my cover letter as a PDF or Word file?", answer: "You can download a PDF with selectable text in A4 or US Letter size, print it, or copy the text into Word, an email, or an online application form." },
      { question: "Is my cover letter saved or uploaded?", answer: "Nothing is uploaded. The letter stays in this tab unless you choose “Save in this browser”, which keeps a copy on this device only. You can delete it at any time." },
      { question: "Can I write a cover letter for my first job?", answer: "Yes. Choose the “Student or graduate” template: it frames your studies, projects, and part-time work as the start of your career. Our guide explains [how to write a cover letter with no experience](/tips/how-to-write-a-cover-letter/#no-experience)." },
      { question: "Which sign-off should I use?", answer: "“Kind regards” is accepted almost everywhere. In British English, “Yours sincerely” follows a named greeting and “Yours faithfully” follows “Dear Sir or Madam”. In the US and Canada, “Sincerely” is standard." },
      { question: "Can I use the same details as my CV?", answer: "Yes. If you have a CV open in [Folio’s editor](/editor/) in this tab, choose “Use details from my CV” to copy your name, contact details, and skills into the letter." },
    ]}>
    <CoverLetterMaker />
  </ToolPage>;
}
