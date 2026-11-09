import { BulletPointBuilder } from "@/components/bullet-point-builder";
import { ToolPage } from "@/components/tool-page";
import { pageMetadata } from "@/lib/seo";
import { tool } from "@/lib/tools";

const page = tool("/resume-bullet-point-generator/");
export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path, image: "/social/tools/resume-bullet-point-generator.png" });

export default function BulletPointGeneratorPage() {
  return <ToolPage path={page.path} heading="Free resume bullet point generator."
    intro="Build a clear CV bullet point from an action, a task, and an optional result. This free builder uses only the facts you enter, with a fixed sentence pattern you can edit before copying. It runs in your browser without AI or sign-up."
    points={["Your facts, your words", "Editable result", "No sign-up or payment", "Nothing uploaded"]}
    featureList={["Action-led bullet point from your own details", "Optional context and results", "Editable output", "Copy to clipboard", "Works for jobs, projects, and volunteering"]}
    guide={[
      { id: "how-to-write", heading: "How to write a resume bullet point", paragraphs: ["Start with a direct action verb, explain the task, then add context or a result when you have one. A specific description helps a reader understand your contribution. You do not need a numerical achievement for every line.", "The builder combines those parts in a fixed order. It does not rewrite your language or verify claims. Read the sentence aloud, remove repetition, and adjust the punctuation before using it."], example: { label: "Fictional project example", text: "Built a course booking page in React for a university group project; added keyboard navigation and tested the form on mobile." } },
      { id: "action-verbs", heading: "Choose an action verb that fits the work", paragraphs: ["Use a verb that describes what you actually did. Choose present tense for an ongoing responsibility and past tense for a completed task. The builder keeps the tense you enter."], bullets: ["Built, tested, fixed, or documented for technical work.", "Assisted, resolved, explained, or scheduled for service work.", "Organised, coordinated, recorded, or prepared for administration and activities.", "Researched, compared, presented, or analysed for coursework and projects."] },
      { id: "no-experience", heading: "Bullet points when you have no work experience", paragraphs: ["Use coursework, a personal project, volunteering, caring responsibilities, or a club activity if it shows a skill relevant to the role. Describe your own part of a group effort, the tools you used, or how regularly you contributed.", "Start your [CV with no experience](/cv-with-no-experience/) with the strongest evidence you have. The [first CV guide](/tips/your-first-cv/) and [student CV example](/cv-examples/student/) show how to put these experiences into a complete application."] },
      { id: "tailor-your-bullets", heading: "Tailor the line to the job", paragraphs: ["Choose examples that show the skills requested in the advert. Use the [resume keyword checker](/resume-keyword-checker/) to compare wording, then include relevant terms only where your experience supports them.", "For more examples, read [how to describe work experience](/tips/describe-your-experience/) or browse the [CV examples by job](/cv-examples/). Each bullet should add a useful detail instead of repeating your profile or skills list."] },
    ]}
    faqs={[
      { question: "Is this resume bullet point generator free?", answer: "Yes. Build, edit, and copy bullet points without an account, payment, or subscription." },
      { question: "Does this tool use AI?", answer: "No. It joins your action, task, context, and result using a fixed sentence pattern in your browser. It does not infer achievements, change tense, or send your details to an AI service." },
      { question: "Do I need numbers in every bullet?", answer: "No. Use real numbers when they help explain scale or results. A clear description of your contribution is useful on its own; never invent a percentage or outcome." },
      { question: "Can I use it for projects or volunteering?", answer: "Yes. Enter your own contribution and any relevant tools, frequency, or outcome. Copy the result into the project, education, volunteering, or experience section that fits." },
    ]}>
    <BulletPointBuilder />
  </ToolPage>;
}
