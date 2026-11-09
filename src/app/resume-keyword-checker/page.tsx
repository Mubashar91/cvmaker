import { ToolPage } from "@/components/tool-page";
import { KeywordChecker } from "@/components/keyword-checker";
import { pageMetadata } from "@/lib/seo";
import { tool } from "@/lib/tools";

const page = tool("/resume-keyword-checker/");
export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path, image: "/social/tools/resume-keyword-checker.png" });

export default function KeywordCheckerPage() {
  return <ToolPage path={page.path} heading="Free resume keyword checker."
    intro="This free resume keyword matching tool compares your resume or CV with a job description and shows which keywords you already cover and which are missing. It runs entirely in your browser, so your CV and the advert are never uploaded."
    points={["Results as you type", "Reads PDF and DOCX files", "No sign-up", "Nothing uploaded"]}
    featureList={["Keyword and phrase extraction from job descriptions", "Matching and missing keywords with counts", "Share of key terms found", "Reads text from PDF and DOCX files on your device", "Uses the CV open in Folio’s editor"]}
    guide={[
      { id: "how-it-works", heading: "How the keyword checker works", paragraphs: [
        "The checker reads the job description and picks out its most distinctive terms: skills and tools it recognises from a predefined library covering 22 jobs, phrases the advert repeats, and words that appear several times or look technical, such as SQL, C#, or Node.js. Common words such as “team”, “role”, and “experience” are ignored.",
        "It then looks for each term in your CV, allowing for simple word endings, so “managing” matches “managed”. The percentage is the share of those key terms that appear somewhere in your CV.",
        "It is a transparent word comparison. It does not understand synonyms, so “customer care” will not match “customer service”, and it cannot tell whether your CV backs a term up with evidence. Use it as a prompt for a careful read, not as a verdict.",
      ] },
      { id: "keywords-and-ats", heading: "Keywords and applicant tracking systems", paragraphs: [
        "Many employers use an applicant tracking system (ATS) to manage applications, and recruiters often search it for specific skills, tools, or qualifications. Using the advert’s own wording for things you can genuinely do makes your CV easier to find and easier to read.",
        "No outside tool can see how a particular employer’s system is set up, so this checker does not give an “ATS score”. For format advice that applies to most systems, read [how to make your CV ATS-friendly](/tips/ats-friendly-cv/), and compare the [ATS-friendly templates](/templates/category/ats-friendly/).",
      ] },
      { id: "check-ats-compatibility", heading: "How to check your resume’s ATS compatibility", paragraphs: [
        "No free tool can run your resume through a particular employer’s applicant tracking system. You can still check the things that most often cause problems, in a few minutes, and keywords are only one of them.",
        "Folio’s [ATS-friendly templates](/templates/category/ats-friendly/) cover the layout side, and the [ATS-friendly CV guide](/tips/ats-friendly-cv/) explains each point in more detail.",
      ], bullets: [
        "Copy and paste test: select all the text in your PDF and paste it into a plain text editor. If it reads in a sensible order, it can be parsed.",
        "Use standard section headings such as Work experience, Education, and Skills.",
        "Keep your name and contact details in the body of the page, not only in a header.",
        "Send the file type the employer asks for, such as Word instead of PDF.",
        "Compare keywords with this checker, and add missing terms only where they are true for you.",
      ] },
      { id: "use-your-results", heading: "How to use your results", paragraphs: ["Work through the missing terms from the top: the list is ordered by how prominent each term is in the advert."], bullets: [
        "Add a missing term only if it is true for you, ideally inside an experience bullet that shows how you used it.",
        "Use the advert’s spelling of tools and qualifications, and spell out acronyms once: “Search engine optimisation (SEO)”.",
        "Check the matched terms too: each should be supported by an example, not only listed in your skills.",
        "Do not paste lists of keywords or hide text in white. Recruiters read the parsed text, and it undermines trust.",
        "Mirror the same terms in your [cover letter](/cover-letter-maker/) where they fit naturally.",
      ], example: { label: "Illustrative before and after", text: "Before: Helped customers with their accounts.\n\nAfter: Resolved account and billing queries for about 60 customers a day in Zendesk, meeting the team’s customer service response targets." } },
    ]}
    faqs={[
      { question: "Is this an ATS resume checker?", answer: "It is a keyword checker. It shows how closely your CV’s wording matches a job description, which is one thing recruiters search for in an applicant tracking system. It does not imitate any particular ATS or predict a ranking." },
      { question: "What match rate should I aim for?", answer: "There is no magic number. Focus on the terms the advert repeats and the requirements it lists first. A high percentage built on terms you cannot back up will not help at interview." },
      { question: "Is my CV uploaded anywhere?", answer: "No. The comparison, and any PDF or DOCX reading, happens in your browser. Nothing is sent to a server or stored after you leave the page." },
      { question: "Can I check a PDF resume?", answer: "Yes. Choose “Read a PDF or DOCX” to extract the text of a text-based file on your device. Scanned or image-only PDFs contain no text to read; paste the text instead." },
      { question: "Why is a keyword I have marked as missing?", answer: "The checker matches exact words and simple endings. If your CV uses a different term, such as a synonym or another spelling, it will not match. Consider using the advert’s wording where it is accurate." },
    ]}>
    <KeywordChecker />
  </ToolPage>;
}
