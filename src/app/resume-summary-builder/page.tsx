import { ToolPage } from "@/components/tool-page";
import { SummaryBuilder } from "@/components/statement-builder";
import { pageMetadata } from "@/lib/seo";
import { tool } from "@/lib/tools";
import { CopyButton } from "@/components/tool-fields";
import { profileByJob, summaryByStage, type SummaryTemplate } from "@/lib/summary-templates";

function TemplateCards({ items }: { items: SummaryTemplate[] }) {
  return <ul className="summary-template-grid">{items.map(item => <li key={item.label}><h3>{item.label}</h3><p>{item.text}</p><CopyButton text={item.text} label={`Copy the ${item.label.toLowerCase()} example`} className="button outline small" /></li>)}</ul>;
}

const page = tool("/resume-summary-builder/");
export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path, image: "/social/tools/resume-summary-builder.png" });

export default function SummaryBuilderPage() {
  return <ToolPage path={page.path} heading="Resume summary templates and a free builder"
    intro="Enter a few details about your experience and get three professional summary drafts built from your own words. Edit the one you like, copy it, or add it straight to your CV."
    points={["Three editable drafts", "No AI or sign-up", "Adds to your CV in one click", "Works for any job"]}
    featureList={["Summary drafts for experienced candidates, graduates, and career changers", "Three sentence structures", "Editable drafts with word counts", "Copy to clipboard", "Add to the CV in Folio’s editor"]}
    guide={[
      { id: "what-is-a-summary", heading: "What a resume summary is", paragraphs: [
        "A resume summary is the two to four sentences at the top of your CV that tell a reader who you are, what you do well, and what you are looking for. In the UK it is usually called a profile or personal statement; in the US and Canada, a professional summary.",
        "A good summary sets up the evidence in the rest of your CV. It should make the reader want to keep going, not repeat every role. Our guide to [writing a CV profile](/tips/write-a-clear-profile/) goes deeper.",
      ] },
      { id: "summary-formula", heading: "A simple formula", paragraphs: ["Each draft from the builder uses these four parts in a different order. You can use the same formula by hand."], bullets: [
        "Who you are: your job title or situation, and your experience.",
        "What you do best: two or three skills that matter for the role.",
        "Evidence: one result you can explain in an interview.",
        "What you want next: the kind of role you are applying for.",
      ] },
      { id: "summary-examples", heading: "Resume summary examples", paragraphs: ["Fictional examples for three career stages. Replace every detail with your own."], example: { label: "Illustrative examples", text: "Experienced: Customer service advisor with 5 years of experience in retail banking. Skilled in complaint handling and coaching new starters, and known for being calm under pressure. Reduced repeat complaints by 20% in a year. Now looking for a team leader role.\n\nGraduate: Business Management graduate with practical experience from a summer internship and part-time retail work. Developing strengths in social media and market research. Looking for a graduate marketing role to build on these skills.\n\nCareer change: Primary school teacher moving into learning design, bringing 8 years of experience. Transferable strengths include planning lessons, explaining complex ideas, and giving feedback. Recent preparation includes an instructional design course." } },
      { id: "summary-tips", heading: "Tips for a stronger summary", paragraphs: ["Use the drafts as a starting point, then make them sound like you."], bullets: [
        "Cut words such as “hardworking” and “passionate” unless an example backs them up.",
        "Leave out “I” and “my” at the start of sentences, and avoid writing about yourself in the third person.",
        "Keep it to about 40 to 90 words. The builder shows a word count for each draft.",
        "Change the skills and the target role for each application.",
        "Use figures only when you know they are accurate.",
      ] },
    ]}
    faqs={[
      { question: "What is the difference between a resume summary and an objective?", answer: "A summary describes the experience you already have. An objective focuses on the role you want and suits students, graduates, and career changers. Try the [resume objective generator](/resume-objective-generator/) if that fits you better." },
      { question: "How long should a resume summary be?", answer: "Two to four sentences, or roughly 40 to 90 words. If it runs longer, move the detail into your experience section." },
      { question: "Does the summary builder use AI?", answer: "No. It fits your own details into predefined sentence patterns in your browser. Sentences are left out when you have not given the details they need, so nothing is invented." },
      { question: "How do I add the summary to my CV?", answer: "Choose “Use as my CV profile”. The draft is added to the Profile section of the CV open in this tab, and the [CV editor](/editor/) opens on that section." },
    ]}
    extra={<section className="section summary-templates"><div className="container">
      <div className="section-head"><div><h2 id="summary-templates">Resume summary templates by career stage.</h2><p>Six complete summaries to copy into your CV and then rewrite. Keep the structure, replace every detail with your own, and delete any claim you can't back up in an interview.</p></div></div>
      <TemplateCards items={summaryByStage} />
      <div className="section-head summary-templates-second"><div><h2 id="profile-examples">CV personal profile examples by job.</h2><p>In the UK the same paragraph is called a personal profile or personal statement. These six use British job titles, qualifications, and spelling, and each one names a role the writer wants next.</p></div></div>
      <TemplateCards items={profileByJob} />
    </div></section>}>
    <SummaryBuilder />
  </ToolPage>;
}
