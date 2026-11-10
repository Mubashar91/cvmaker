import { ToolPage } from "@/components/tool-page";
import { ObjectiveGenerator } from "@/components/statement-builder";
import { pageMetadata } from "@/lib/seo";
import { tool } from "@/lib/tools";

const page = tool("/resume-objective-generator/");
export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path, image: "/social/tools/resume-objective-generator.png" });

export default function ObjectiveGeneratorPage() {
  return <ToolPage path={page.path} heading="Resume objective generator for students and first jobs"
    intro="Write a short, specific career objective for an internship, your first job, a career change, or a return to work. Combine your details with clear sentence patterns, then edit the result and add it to your CV."
    points={["Four career situations", "Three editable drafts", "No AI or sign-up", "Adds to your CV in one click"]}
    featureList={["Objective drafts for internships, first jobs, career changes, and returning to work", "Three sentence structures", "Editable drafts with word counts", "Copy to clipboard", "Add to the CV in Folio’s editor"]}
    guide={[
      { id: "objective-or-summary", heading: "Resume objective or summary?", paragraphs: [
        "A resume objective is a short statement at the top of your CV about the role you want and what you bring to it. A summary does a similar job but leads with experience you already have.",
        "Objectives have fallen out of fashion for experienced candidates, whose summary can point to a track record. They remain useful when your direction needs explaining: a first job, an internship, a new field, or a return after a break. If you have relevant experience, the [resume summary builder](/resume-summary-builder/) is usually the better choice.",
      ] },
      { id: "when-to-use", heading: "When an objective helps", paragraphs: ["Use an objective when the reader would otherwise have to guess why you are applying."], bullets: [
        "Students applying for internships, placements, or part-time roles.",
        "Graduates and school leavers looking for a first full-time job.",
        "Career changers whose recent job title belongs to another field.",
        "People returning to work after a career break.",
      ] },
      { id: "objective-examples", heading: "Resume objective examples", paragraphs: ["Fictional examples for each situation. Name a real role and company when you write yours."], example: { label: "Illustrative examples", text: "Internship: Second-year Economics student seeking a summer internship in finance at Northbridge Bank. Offers Excel, financial modelling, and teamwork, developed through coursework and projects. Available from June 2027.\n\nFirst job: Recent Biology graduate seeking a laboratory technician role. Brings lab safety training, sample preparation, and careful record keeping from a final-year research project.\n\nCareer change: Retail manager with eight years of team leadership seeking an HR assistant role. Particularly interested in the chance to support recruitment and onboarding.\n\nReturning to work: Registered nurse returning after a three-year career break, seeking a staff nurse role on a medical ward. Recently completed a return to practice programme." } },
      { id: "write-a-good-objective", heading: "How to write a good objective", paragraphs: ["Keep it to two or three sentences, and make every one specific."], bullets: [
        "Name the role, and the company or industry if you can.",
        "Say what you offer before what you want to gain.",
        "Avoid phrases such as “seeking a challenging position in a dynamic company”.",
        "Mention availability only when it matters, for example for internships.",
        "Pair it with an education-first layout if you are a student. See the [CV maker for students](/cv-maker-for-students/).",
      ] },
    ]}
    faqs={[
      { question: "Are resume objectives outdated?", answer: "For experienced candidates, a summary usually works better. For students, graduates, career changers, and people returning to work, a short and specific objective is still useful." },
      { question: "How long should a resume objective be?", answer: "Two or three sentences, around 30 to 60 words." },
      { question: "Where does the objective go on a resume?", answer: "At the top, directly under your name and contact details, in place of a summary." },
      { question: "Does the objective generator use AI?", answer: "No. It fits your details into predefined sentence patterns in your browser. Nothing is sent anywhere, and you can edit every draft." },
    ]}>
    <ObjectiveGenerator />
  </ToolPage>;
}
