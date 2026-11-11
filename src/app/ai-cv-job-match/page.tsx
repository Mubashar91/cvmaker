import { ToolPage } from "@/components/tool-page";
import { JobMatch } from "@/components/job-match";
import { pageMetadata } from "@/lib/seo";
import { tool } from "@/lib/tools";

const page = tool("/ai-cv-job-match/");
export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path, image: "/social/tools/ai-cv-job-match.png" });

export default function JobMatchPage() {
  return <ToolPage path={page.path} heading="AI CV job match: check your CV against a job"
    intro="Paste a job description, add your CV, and get a free AI report: the requirements you already demonstrate with evidence from your own CV, the ones that are missing or unclear, and honest suggestions for improving your summary, skills, and experience. Nothing is sent until you choose to check."
    points={["Evidence from your own CV", "Review every suggestion", "Nothing sent until you choose", "Free, no sign-up"]}
    featureList={["Requirement-by-requirement match with evidence quoted from the CV", "Missing and unclear requirements with honest advice", "Suggested improvements for the summary, skills, and experience sections", "Optional wording changes to review and copy", "Uses the CV open in Folio’s editor or text read from a PDF or DOCX on your device"]}
    guide={[
      { id: "how-it-works", heading: "How the AI job match works", paragraphs: [
        "Paste the full job advert, then add your CV: use the CV open in [Folio’s editor](/editor/), read a PDF or DOCX on your device, or paste the text. When you choose Check my match, both texts are sent through our server to OpenAI, which reads the advert’s requirements and looks for evidence of each one in your CV.",
        "The report has four parts: requirements you demonstrate, each with the evidence found in your CV; requirements that are missing or unclear; suggested improvements to your summary, skills, and experience sections; and optional wording changes you can review and copy. The AI is instructed to use only what your CV says and never to invent experience, employers, dates, or qualifications.",
        "Unlike the [keyword checker](/resume-keyword-checker/), which compares exact words on your device, the AI reads meaning: it can connect “led a team of five” with a leadership requirement even when the words differ. Use the keyword checker for a quick, fully private pass, and this tool when you want a deeper read.",
      ], example: { label: "What a match looks like", text: "Requirement: Experience supporting customers by email and phone.\nEvidence: “Handled 40–60 customer emails and calls a day, resolving billing and delivery questions at a first contact rate of 85%.”\n\nMissing or unclear: The advert asks for CRM experience. The CV mentions “logging tickets” but names no system. If you used one, name it in the role where you used it; if not, be ready to address it in your cover letter." } },
      { id: "honest-suggestions", heading: "Suggestions use your real experience", paragraphs: [
        "A CV only works if you can stand behind every line in an interview. The report is built to respect that: evidence quotes your own text, improvement suggestions reorganise or sharpen what is already there, and advice about gaps never tells you to claim something untrue. Where a gap is real, the advice is to add detail only if it is true for you, or to plan how you would address it honestly.",
        "AI can still make mistakes: it can misread a sentence, overstate a match, or suggest wording that doesn’t sound like you. Treat the report as a careful second reader, not a verdict. Check every point against what you actually did before changing your CV.",
      ] },
      { id: "use-the-report", heading: "Turning the report into a better CV", paragraphs: [
        "Start with the gaps: for each one that is true for you, find the role or project where the evidence belongs and add a specific line there, with the advert’s own terms where they are accurate. Our guide to [tailoring your CV to a job description](/tips/tailor-resume-to-job-description/) walks through this in detail.",
        "Then work through the improvements. Most are small: moving your strongest evidence higher, naming a tool the advert asks for that you buried in a project description, or making a vague claim specific. The optional wording changes can be copied and pasted into the [editor](/editor/), where the live preview shows the result immediately.",
        "Run the check again after editing if you like — but two or three focused passes beat polishing forever. When the match reads well, give the final version one careful human read with our [pre-send checklist](/tips/before-you-send/).",
      ] },
      { id: "privacy-and-limits", heading: "Privacy, limits, and what this is not", paragraphs: [
        "Checking a match sends the CV text you provided and the job advert through our server to OpenAI, and nothing else: no files, no photo, and nothing from your browser you didn’t paste or load into the form. Our server does not store or log either text, and we request that OpenAI does not store the response. Remove anything you’d rather not send — the check works fine without your name and contact details. The [privacy page](/privacy/#ai) has the full description.",
        "To keep the tool free, checks are rate-limited to a few per minute. Each report costs us a real API request, so if you hit the limit, the keyword checker is instant and unlimited while you wait.",
        "This is not an ATS score. No tool can predict how a particular employer’s system or recruiter will rank your application, and any site that promises a pass/fail score is guessing. What this report can do is show you, concretely, where your evidence is strong and where it is thin.",
      ] },
    ]}
    faqs={[
      { question: "Is the AI CV job match really free?", answer: "Yes. There is no account, payment, or trial. Because every check makes a real AI request that we pay for, checks are rate-limited to a few per minute — the [keyword checker](/resume-keyword-checker/) is instant and unlimited if you hit the limit." },
      { question: "What exactly is sent to the AI service?", answer: "Only the CV text in the form and the job advert you pasted, sent through our server to OpenAI when you choose Check my match. Our server does not store or log either text. Nothing is sent while you type, and you can remove your name and contact details first — the report doesn’t need them." },
      { question: "Will it invent experience I don’t have?", answer: "It is instructed not to: matches must quote evidence from your CV, improvements can only use what your CV already says, and advice about gaps tells you to add a detail only if it is true for you. AI can still make mistakes, so review every suggestion against your real experience before using it." },
      { question: "How is this different from the keyword checker?", answer: "The [keyword checker](/resume-keyword-checker/) compares exact words in your browser — instant, unlimited, and fully private. The AI job match reads meaning: it can match “led a team of five” to a leadership requirement, explain gaps, and suggest improvements. Many people use the keyword checker while drafting and one AI check before sending." },
      { question: "Is this an ATS compatibility score?", answer: "No, and treat any tool that promises one with caution. Employers use different systems configured in different ways, so no external tool can predict a specific outcome. For formatting, see [how to make your CV ATS-friendly](/tips/ats-friendly-cv/); this report focuses on whether your evidence answers the advert." },
    ]}>
    <JobMatch />
  </ToolPage>;
}
