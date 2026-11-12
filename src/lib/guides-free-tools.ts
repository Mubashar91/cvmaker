import type { Guide } from "./guide-types";
import { BLOG_SOURCES_CHECKED, guideSources as sources } from "./guide-sources";

export const freeToolGuides: Guide[] = [
  {
    slug: "free-cv-maker-without-signup", title: "How to make a CV for free without signing up", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.storage, sources.ukCV],
    seoTitle: "Free CV Maker Without Signup: Create and Save Your CV",
    description: "Create a CV without registration, keep an editable copy, and download a free PDF. A practical walkthrough of templates, local drafts, and final checks.",
    category: "Free CV tools",
    intro: "You have finished typing your CV, closed the tab, and now need to change a date. Without an account, the question is where you saved the editable version. Here is a complete workflow for creating, keeping, and updating a CV without registering.",
    quickAnswer: "Use the editor without registration, add your own details, and download the PDF. Before closing the tab, save a browser draft or download a portable JSON draft. The PDF is ready to send; the JSON draft preserves the Folio data for later editing.",
    checklist: { heading: "Before you close the tab", items: ["Open the downloaded PDF and confirm it contains your latest changes.", "Save a browser draft or download a portable JSON draft for future edits.", "Keep your backup in a private folder you can find again.", "On a shared device, remove a browser draft after keeping your own copy."] },
    relatedSlugs: ["cv-pdf-download-checklist", "free-resume-builder-without-payment", "your-first-cv"],
    image: { kind: "template", id: "clarity", alt: "Clarity CV template with a single column and standard section headings", caption: "Clarity template with fictional demonstration content." },
    tool: { href: "/editor/", label: "Create a CV without signup", text: "Start a blank CV, edit your details, and download the PDF without an account." },
    sections: [
      { id: "worked-example", heading: "Worked example: move an editable CV to another device", paragraphs: [
        "Imagine Alex writes a first CV on a library computer and wants to finish it at home. Saving only the PDF keeps the finished document, but not the exact editable data. Saving only a browser draft leaves that draft on the library computer. The useful handoff is a portable draft plus a PDF to review.",
        "In the editor, choose Download draft and keep the JSON file in a private location you control. On the other device, use Restore draft and inspect the entries before making changes. This is a file transfer you choose; Folio does not synchronise the two devices. Keep the downloaded files separate from any browser copy you remove.",
      ], example: "Working copy: Alex-Morgan-draft.json\n\nApplication copy: Alex-Morgan-CV.pdf\n\nAfter changing a date at home: download a new PDF and replace the editable backup with the revised draft.", exampleLabel: "Illustrative backup workflow with fictional filenames" },
      { id: "prepare-your-details", heading: "Gather the details before choosing a design", paragraphs: [
        "Open a short note with your contact information, job and course dates, useful links, and a few examples of your work. Keep these facts separate from the polished wording. You can improve a sentence later; it is harder to remember a placement date halfway through an application.",
        "Choose a role or type of opportunity to aim at. A general CV can be a useful working document, but the version you send should make your relevant experience easy to find. Leave out information the employer does not need, such as private identification numbers.",
      ] },
      { id: "start-or-import", heading: "Start a blank CV or bring your own document", paragraphs: [
        "Use the [free CV maker](/) to create a blank document or import a text-based PDF or DOCX. Imports are a starting point for editing: compare names, dates, job titles, and section placement against the original. Complex columns and tables can require corrections.",
        "If you have no previous CV, use the [no-experience builder](/cv-with-no-experience/) to begin with education and projects near the top. Empty sections do not need filler. Add a relevant project or activity where it gives evidence of a skill you want to show.",
      ] },
      { id: "choose-a-layout", heading: "Choose a layout after the content starts to take shape", paragraphs: [
        "A plain design such as Clarity gives you an easy place to start. Write your profile, experience, and education before spending time adjusting colours. You can switch between the [free templates](/templates/) without retyping your details.",
        "Read the preview as a stranger would. Check whether the role, employer, and dates are easy to tell apart and whether a long paragraph should become two shorter points. Use the built-in review to find incomplete entries, then review the wording yourself.",
      ] },
      { id: "keep-editable-copy", heading: "Save an editable copy before closing the tab", sourceUrls: [sources.storage.url], paragraphs: [
        "Without an account, there is no online profile to sign back into. Folio keeps current edits in the tab until you choose to save a browser draft. That saved draft belongs to this browser on this device; another computer will not automatically have it.",
        "Browser storage has limits: MDN explains that private-browsing storage is cleared when the last private tab closes, and browser settings can prevent storage altogether. Download a portable JSON draft for a separate editable copy, especially on shared or temporary devices. Keep the file private and restore it when needed; the PDF is the version to send.",
      ], bullets: ["Save a browser draft deliberately.", "Download a portable draft for a separate backup.", "Keep a named PDF for each application."] },
      { id: "download-and-check", heading: "Download the actual PDF and open it", sourceUrls: [sources.ukCV.url], paragraphs: [
        "Review every preview page, then download and open the PDF. Check links, spelling, contact details, and the final lines on each page. Folio exports an A4 PDF without a watermark or payment step. Follow a different file-format requirement if the employer gives one.",
        "The National Careers Service recommends consistent presentation and another reader's spelling and grammar check. Use that review alongside the [CV checklist](/tips/before-you-send/). Registration-free editing does not remove the need to proofread or save a reusable source file.",
      ] },
    ],
    faqs: [
      { question: "Can I edit my CV later without an account?", answer: "Yes, if you save a browser draft or download a portable JSON draft. A PDF alone is not the editable Folio draft." },
      { question: "Does no signup mean my CV is automatically saved?", answer: "No. Saving is your choice. Save or download a draft before closing the tab if you want to keep editing later." },
      { question: "Which file should I send to an employer?", answer: "Send the requested application format, usually the finished PDF when PDF is accepted. The portable JSON draft is an editing backup, not the CV attachment for an employer." },
    ],
    takeaway: "Create without an account, review the imported or typed facts, and keep both an editable draft and the finished PDF.",
  },
  {
    slug: "free-resume-builder-without-payment", title: "What to check in a free resume builder before you start", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.trials, sources.storage],
    seoTitle: "Free Resume Builder Without Payment: A Practical Checklist",
    description: "Check PDF downloads, watermarks, template access, subscriptions, and editable backups before choosing a free resume builder. Includes Folio's actual limits.",
    category: "Free CV tools",
    intro: "Free to edit does not tell you whether the final download is included. Test the complete task before entering your career history: choose a layout, create a small draft, download it, and find out how to revise it later. Here is what to check at each step.",
    quickAnswer: "Check the finished download, watermark, required file type, and any trial terms before choosing a builder. Folio currently provides free A4 CV PDFs and portable editing drafts without signup or payment. It imports PDF and DOCX and exports PDF or editable Word CVs.",
    checklist: { heading: "Decide before entering your full CV", items: ["Download a small test CV in the required format.", "Inspect the file for watermarks and missing content.", "Confirm whether the layout and writing features you need are included.", "Check signup, renewal, and cancellation terms if a service offers a trial.", "Find a reliable way to keep and revise the editable source."] },
    relatedSlugs: ["free-cv-maker-without-signup", "ai-cv-maker-vs-template-builder", "cv-pdf-download-checklist"],
    image: { kind: "template", id: "professional", alt: "Professional CV layout with a traditional single-column structure", caption: "Professional template, fictional sample content." },
    tool: { href: "/templates/", label: "Browse free templates", text: "Every Folio template can be edited and downloaded as a PDF without payment." },
    sections: [
      { id: "worked-example", heading: "Worked example: test a builder with one entry", paragraphs: [
        "Create a fictional name, one education entry, and one short project. Select the actual layout you want and try the download. Open the resulting file rather than judging the preview alone. This small test reveals the practical limits before you spend time typing private information.",
        "A tool can be free and still unsuitable for a particular application. If a vacancy requires Word, a free PDF is the wrong output. If you need AI rewriting, fixed sentence patterns do not provide that feature. Make the decision around the requirement you actually have.",
      ], table: { caption: "Your requirement and the check that answers it", head: ["You need", "Check", "Decision"], rows: [["A free finished PDF", "Open a test download", "Inspect the actual file and any payment step"], ["An editable Word file", "Look for DOCX export", "PDF-only output does not meet this requirement"], ["A reusable CV", "Save and reopen an editable draft", "Confirm how you will revise it later"]] } },
      { id: "test-the-download", heading: "Check the finished download first", paragraphs: [
        "Start with a small test document rather than your complete CV. Add a name and one entry, view the preview, and find the download action. Confirm the offered file type and whether the finished file needs payment, registration, or a subscription. Judge the workflow you can actually complete.",
        "In Folio, editing and A4 PDF downloads are free. The downloaded CV has selectable text and no watermark. The editor imports PDF and DOCX files, and it exports an editable Word document as well as PDF. That distinction matters if a particular application asks for DOCX.",
      ] },
      { id: "read-the-access-details", heading: "Separate a free download from a free trial", sourceUrls: [sources.trials.url], paragraphs: [
        "The US Federal Trade Commission advises checking a trial's length, cancellation process, and terms before signing up. Apply that checklist when a resume service requests a card: identify whether you are buying one download, starting a trial, or accepting recurring access. This is a general checking method, not a claim about a particular competing builder.",
        "All Folio layouts and the existing browser tools are free. Its summary, objective, cover letter, and bullet helpers use predefined patterns or your own words. Optional AI helpers send selected text only when you request them. If you specifically need AI rewriting, read [AI CV makers versus template builders](/tips/ai-cv-maker-vs-template-builder/) before choosing a workflow.",
      ] },
      { id: "look-beyond-price", heading: "Check how your information is handled", paragraphs: [
        "A zero price does not explain where information goes or how long it remains available. Look for an explanation of imports, drafts, account storage, and third-party processing. Use a fictional test entry while exploring an unfamiliar tool, then decide whether its data handling fits your needs.",
        "Folio reads CV imports, edits content, and generates PDFs in your browser. A draft is saved only when you choose to save one. Read the [privacy page](/privacy/) for the full explanation, including website requests and other services on the page. Keep downloaded drafts private because they contain your information.",
      ] },
      { id: "check-editing-and-backups", heading: "Keep a route back to your editable work", sourceUrls: [sources.storage.url], paragraphs: [
        "Look for a way to change a date or tailor a bullet after the first download. A polished PDF is useful for sending, but an editable source saves you recreating the whole document. Find out whether a draft follows an account, a browser, or a downloaded file.",
        "With Folio, save in the current browser or download a portable JSON draft. MDN documents that local storage belongs to a website origin, and private-session storage is temporary. Do not assume that saving on one browser, device, or site address makes the draft available everywhere. Keep a portable draft and the PDF you actually submitted.",
      ] },
      { id: "make-a-decision", heading: "Use a short decision checklist", paragraphs: [
        "Choose the builder that supports your next real application. If the employer accepts PDF, check the downloaded PDF. If it requires Word or an application form, plan that step before writing everything in a tool that cannot provide the requested format.",
        "Once the practical checks pass, focus on the content. A clear example of your work contributes more than another hour comparing accent colours. Use [resume keyword matching](/resume-keyword-checker/) to review relevant wording, then read the finished document yourself.",
      ], bullets: ["Can I download the required format?", "Does the finished file have a watermark?", "Can I revise and back up my work?", "Are any limits or data-processing steps clearly explained?"] },
    ],
    faqs: [
      { question: "Does Folio require a credit card?", answer: "No. Its editor, templates, browser writing tools, and PDF downloads do not require payment or a subscription." },
      { question: "Does a free PDF download include Word export?", answer: "Folio offers both A4 PDF and editable Word CV downloads. Follow the employer's requested format." },
      { question: "Is this a comparison of current resume-builder prices?", answer: "No. It is a workflow checklist and an explanation of Folio's current features. It does not rank competing products or claim that their prices and limits have been checked." },
    ],
    takeaway: "Check the complete download and editing workflow before investing time, then choose a tool that fits the application's requirements.",
  },
  {
    slug: "cv-pdf-download-checklist", title: "How to download a CV as a PDF and check it properly", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.pdfAccessibility, sources.parsing],
    seoTitle: "Free CV PDF Download: Export and File-Checking Guide",
    description: "Download your CV as a free PDF, check text selection and page breaks, choose a clear filename, and keep the editable draft for your next application.",
    category: "Free CV tools",
    intro: "A PDF can look correct in the editor and still be the wrong attachment for an application. Check the exact file you download, its text, and its last page before uploading it. This guide separates the checks you can do yourself from claims a quick file check cannot establish.",
    quickAnswer: "Follow the employer's format request, download the CV, and open that exact file. Check contact details, page breaks, links, and copied text. Text selection is a basic check; it does not certify accessibility or guarantee parsing. Keep an editable draft separately.",
    checklist: { heading: "Check the file you will actually send", items: ["The employer accepts the file type and any required paper size.", "The PDF opens and contains the latest name, contact details, and dates.", "Every page ends sensibly and the last page contains useful content.", "Text can be selected and copied in a readable order.", "The attachment or upload preview shows the intended version."] },
    relatedSlugs: ["ats-friendly-cv", "free-cv-maker-without-signup", "before-you-send"],
    image: { kind: "template", id: "linear", alt: "Linear template showing clear section headings and left-aligned resume text", caption: "Linear template with fictional CV content." },
    tool: { href: "/editor/", label: "Preview and download your CV", text: "Folio shows the generated PDF in the editor and downloads it without a watermark." },
    sections: [
      { id: "worked-example", heading: "Worked example: diagnose a nearly empty second page", paragraphs: [
        "Suppose the last page contains only one repeated skills line and a references sentence. Read those lines before changing the design. If they add no useful evidence and are not requested, edit them out. If the page contains a relevant project, keep the content and review spacing instead. A second page is not automatically a mistake.",
        "Download again after editing and compare the new file. Changing a filename does not update the document inside it. When an application fills fields from an upload, review the fields as well as the attachment; they are two separate things to check.",
      ], example: "File check: the PDF says 2024–Present, but the application form has filled an end date of 2024.\n\nAction: confirm the correct dates in your CV and correct the form field before submitting. Do not assume the attached PDF silently repairs the form.", exampleLabel: "Fictional upload-check scenario" },
      { id: "check-format-request", heading: "Read the file instructions before exporting", paragraphs: [
        "Find the employer's file type, size limit, and naming instructions. If the application asks for DOCX or answers entered directly into a form, a PDF is not a substitute. Keep a note of the requirements beside the advert rather than relying on what you used for a previous application.",
        "Folio's CV download is an A4 PDF. An editable Word download is also available; it uses a clean single-column layout rather than reproducing every PDF design. If a specific paper size is required, check that requirement before submitting; the separate cover letter tool offers A4 and US Letter, but the CV editor uses A4.",
      ] },
      { id: "inspect-page-breaks", heading: "Review every page, including the last one", paragraphs: [
        "Scroll through the full preview at a readable size. Look for a short final page, an unusually dense paragraph, or a heading that seems separated from its explanation. Check that hidden sections really should be hidden and that imported entries have not been put in the wrong section.",
        "Shorten repeated wording before changing spacing. If you try another template, review its page count again because the same text can occupy different space. Read [how to keep a CV focused](/tips/keep-it-focused/) if a few leftover lines are creating an unnecessary extra page.",
      ] },
      { id: "open-the-file", heading: "Check text extraction and reading order separately", sourceUrls: [sources.pdfAccessibility.url, sources.parsing.url], paragraphs: [
        "Download the PDF and open it in a PDF viewer. Confirm that the name, email address, dates, and links are correct in that file. Select a paragraph and copy it into a plain text note to inspect the wording and reading order. This is a practical check, not proof of compatibility with every hiring system.",
        "Copying text is only a basic check. Adobe's accessibility guidance also covers document tags and logical reading order; text selection alone does not establish accessibility. Greenhouse separately documents parsing difficulties with complex layouts. Folio exports selectable text, but this guide does not certify its PDFs as accessible or guarantee parsing in an employer's system.",
      ] },
      { id: "name-and-store", heading: "Name the file so you can recognise the application", paragraphs: [
        "Use the filename the employer requests. Otherwise, a short name such as Alex-Morgan-CV.pdf is easy to recognise. For your own records, put each application in a separate folder with the advert, cover letter, and submission date. Avoid relying on a growing stack of files named final or latest.",
        "Open the attachment from the draft email or upload preview if the system allows it. That checks the selected file rather than the file you meant to select. Do not overwrite the only record of an application after sending it; keep that version for interview preparation.",
      ], example: "Application folder: Greenfield-support-assistant\n\nFiles: Alex-Morgan-CV.pdf, Alex-Morgan-Cover-Letter.pdf, and a saved copy of the advert.", exampleLabel: "Fictional file organisation example" },
      { id: "save-the-source", heading: "Keep your editable draft separately", paragraphs: [
        "A PDF is a finished output, not your full editing history. Save a browser draft or download Folio's portable JSON draft before closing the tab. You can restore that draft later, update the wording for another vacancy, and download a new PDF without starting over.",
        "For the final application review, use the [before-you-send checklist](/tips/before-you-send/). Export checks answer whether the file is complete and usable; your content review answers whether it is the right document for this role.",
      ] },
    ],
    faqs: [
      { question: "Does Folio add a watermark to the PDF?", answer: "No. The downloaded CV has no watermark, and downloading does not require an account or payment." },
      { question: "Does selecting PDF text prove ATS compatibility or accessibility?", answer: "No. It checks that text can be selected. Reading order, document structure, and the particular system still matter. Keep a portable JSON draft if you want the original editable Folio data." },
    ],
    takeaway: "Follow the requested format, inspect the actual downloaded PDF, and keep the editable draft as well as the version you send.",
  },
  {
    slug: "ai-cv-maker-vs-template-builder", title: "AI CV maker or template builder: which help do you need?", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED,
    seoTitle: "Free AI CV Maker vs Template Builder: What to Check",
    description: "Understand AI writing, fixed sentence patterns, and CV layout tools. Check factual accuracy, privacy, downloads, and employer instructions before choosing.",
    category: "Free CV tools",
    intro: "Do you need better wording, a clean layout, or a free downloadable file? Those are different problems, and an AI label does not tell you which one a product solves. Use the comparison below to choose a writing workflow and check the result against your own experience.",
    quickAnswer: "Use a layout builder to arrange the document, fixed prompts to structure your own facts, and AI feedback when you want help analysing wording. Verify every new claim and check the employer's rules. Folio provides layouts and fixed browser helpers; it also offers optional AI rewriting that you review before applying.",
    checklist: { heading: "Review any assisted wording", items: ["Every job title, date, qualification, and outcome matches your records.", "No tool has invented a metric or upgraded your responsibility.", "You can explain each sentence naturally in an interview.", "You checked the service's data controls before sharing information.", "The employer's rules permit the help you used."] },
    relatedSlugs: ["improve-cv-bullet-points-with-ai", "tailor-resume-to-job-description", "resume-action-verbs-and-bullet-points"],
    image: { kind: "template", id: "minimal", alt: "Minimal CV template with restrained typography and clearly labelled sections", caption: "Minimal template, fictional sample content." },
    tool: { href: "/tools/", label: "Explore Folio's browser tools", text: "Folio's classic tools use fixed templates and local text matching; AI features are optional and send only the text you choose." },
    sections: [
      { id: "worked-example", heading: "Worked example: request feedback without inventing an achievement", paragraphs: [
        "Begin with a factual note: you maintained a weekly rota, used a spreadsheet, and highlighted uncovered shifts. A useful request asks what is unclear and which details would help. An unsafe edit would add a time-saving figure that you never measured. The boundary is whether the revision preserves the original facts.",
        "Here is a prompt you can adapt after checking a service's data handling. Remove private names and confidential details first. If you want a fixed-pattern workflow instead, enter the same action and task in the [bullet point builder](/resume-bullet-point-generator/) and review the sentence yourself.",
      ], example: "Review this bullet for clarity: Maintained a weekly volunteer rota in Excel and flagged uncovered shifts.\n\nIdentify missing context by asking me questions. Do not invent numbers, outcomes, responsibilities, or tools. Keep the wording suitable for a first-job resume.", exampleLabel: "Example request for feedback; not a guarantee about an AI tool's output" },
      { id: "separate-the-jobs", heading: "Separate writing help from document layout", paragraphs: [
        "A layout tool places your information into a design and creates a file. A writing helper may combine your details with fixed sentence patterns. A generative AI tool can produce new wording from instructions and context. A product may offer one or more of these functions, so read its feature explanation.",
        "For example, if your sentences are already clear but the document is difficult to format, another rewrite may not solve the problem. If the page looks fine but every bullet says only what you were responsible for, work on specific contributions before changing the template.",
      ], table: { caption: "Three different kinds of CV help", head: ["Task", "Useful support", "What you still check"], rows: [["Arrange a document", "Templates and a live PDF preview", "Reading order and page breaks"], ["Start a short paragraph", "Fixed prompts or generated wording", "Facts, voice, and relevance"], ["Compare with an advert", "Keyword comparison", "Whether each term is supported"]] } },
      { id: "supply-the-facts", heading: "Write a fact sheet before asking for wording", paragraphs: [
        "List your real job titles, dates, tools, tasks, and outcomes. Separate measured results from rough impressions. If you do not know a figure, leave it out. This gives you a reference when a polished sentence sounds stronger than the experience you can explain.",
        "With any writing workflow, check each statement against that fact sheet. Do not accept a claim that you led a team when you contributed to one, or a percentage improvement with no source. A clear description of a small contribution is more useful than an impressive invention.",
      ] },
      { id: "review-ai-output", heading: "Use AI for feedback while checking every new claim", sourceUrls: [sources.aiRisk.url, sources.aiResume.url], paragraphs: [
        "NIST's generative AI risk profile identifies confidently incorrect output and data privacy as risks. For CV writing, the practical response is to verify every claim and consider what information a service receives before using it. A fluent paragraph is not evidence that its facts are correct.",
        "MIT's careers guidance suggests using AI to analyse weak bullets and wording gaps, while checking that edits preserve your experience and voice. Ask for feedback on an existing fact-based draft, then inspect each suggested change. Read the employer's assistance rules and the service's current data controls before sharing personal information; a feature name alone does not establish its retention policy.",
      ] },
      { id: "check-product-limits", heading: "Check downloads, data handling, and limits", paragraphs: [
        "Before entering a full CV, find the export format, free-use limits, signup requirements, and explanation of data handling. Do not assume all products using the same label follow the same practices. A small fictional test document lets you inspect the workflow before adding personal details.",
        "Folio offers optional AI summary and bullet improvement, an [AI CV job match](/ai-cv-job-match/), CV tailoring, and cover letter drafting; the [AI bullet point tutorial](/tips/improve-cv-bullet-points-with-ai/) shows how to review its suggestions. Its [summary builder](/resume-summary-builder/) and [cover letter maker](/cover-letter-maker/) combine supplied details with predefined patterns; its [keyword checker](/resume-keyword-checker/) compares text locally. These tools provide a starting structure, rather than an independent assessment of your experience.",
      ] },
      { id: "choose-next-step", heading: "Choose the smallest amount of help that solves the task", paragraphs: [
        "If you need one stronger line, try the [bullet point builder](/resume-bullet-point-generator/) and edit the result. If you need a document layout, choose a [CV template](/templates/). If you need a first-job structure, begin with the [no-experience CV page](/cv-with-no-experience/).",
        "Whichever route you use, finish with the same checks: accurate facts, relevant examples, your own voice, a readable file, and a saved editable copy. No writing method can promise an interview or remove the need to tailor an application.",
      ] },
    ],
    faqs: [
      { question: "Is Folio an AI resume builder?", answer: "Folio is a free browser CV editor with local tools and optional AI assistance. AI sends selected text only when you ask, and you review the result." },
      { question: "Can a generated summary be used without editing?", answer: "Review it first. Confirm the facts, remove generic or exaggerated wording, and follow the employer's instructions about assistance." },
    ],
    sources: [sources.aiRisk, sources.aiResume],
    takeaway: "Choose help for the task you have, keep a record of the facts, and review every sentence before it becomes part of your application.",
  },
  {
    slug: "tailor-resume-to-job-description", title: "How to match your resume to a job description honestly", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.parsing, sources.mitResume],
    seoTitle: "Resume Keyword Matching: Tailor Your CV to a Job Description",
    description: "Compare a resume with a job description, separate requirements from keywords, and edit your profile and bullets without copying or inventing experience.",
    category: "Free CV tools",
    intro: "A missing keyword may be a wording gap, an experience gap, or an irrelevant extraction. Work out which before changing your CV. This walkthrough turns a job advert into an evidence map so you can make useful edits without chasing a percentage.",
    quickAnswer: "Match each important requirement to a real example, then use a keyword checker to review wording. Add terms where they accurately describe your work. Folio's match percentage measures extracted terms found in the text; it is not an employer's ATS score, a qualification check, or a prediction of selection.",
    checklist: { heading: "Review each proposed keyword change", items: ["Find the term in the full advert and read its context.", "Identify a real task, project, course, or qualification that supports it.", "Use the term in a relevant description, not a disconnected keyword block.", "Keep missing requirements visible rather than claiming experience you lack.", "Read the revised document without looking at the match percentage."] },
    relatedSlugs: ["resume-action-verbs-and-bullet-points", "skills-for-a-first-job-resume", "ats-friendly-cv"],
    image: { kind: "example", id: "data-analyst", alt: "Fictional data analyst CV with SQL, reporting, and project evidence", caption: "Data analyst CV example with fictional employers and achievements." },
    tool: { href: "/resume-keyword-checker/", label: "Compare your CV with an advert", text: "See matching and missing terms, then decide which changes your experience supports." },
    sections: [
      { id: "worked-example", heading: "Worked example: classify three missing terms", paragraphs: [
        "Imagine an advert asks for SQL, Power BI, and stakeholder updates. Your CV describes SQL queries and weekly emails to a project lead, but you have never used Power BI. Those three terms need different decisions. The goal is a truthful explanation of your fit, not three automatic additions.",
        "After editing, check that the new wording still describes the task accurately. A course can support a learning claim, but it cannot be relabelled as professional tool use. An unmet requirement is something to assess when deciding whether to apply, not something a synonym can fix.",
      ], table: { caption: "Fictional requirement-to-edit decisions", head: ["Term", "Actual evidence", "Useful decision"], rows: [["SQL", "Queries written in a course project", "Name SQL and label the project as academic"], ["Power BI", "No use or training", "Leave it out; do not imply proficiency"], ["Stakeholder updates", "Weekly progress emails to a project lead", "Describe the audience and content of the updates"]] } },
      { id: "read-for-requirements", heading: "Read the advert before running a comparison", sourceUrls: [sources.mitResume.url], paragraphs: [
        "Separate the role's tasks, essential requirements, desirable experience, and application instructions. Repeated words can be informative, but a qualification mentioned once may still be essential. Keep the full advert nearby so you do not lose the surrounding meaning when reviewing a list of terms.",
        "MIT recommends using the position description to select relevant experience, including projects where appropriate. Our practical way to do that is a three-column note: requirement, your evidence, and its location in the CV. Leave an honest blank where evidence is missing; this worksheet is a writing aid, not a hiring-system score.",
      ] },
      { id: "build-evidence-map", heading: "Map requirements to real examples", paragraphs: [
        "For each requirement, choose a project, task, or responsibility that shows what you can do. Name the setting and your own contribution. If a role asks for customer communication, evidence could come from paid support work, volunteering, or a relevant placement; the source should remain clear.",
        "Do not relabel a short course as professional experience. You can still mention that course, describe the exercises you completed, and explain what you practised. The distinction helps a recruiter judge the level of experience without having to guess.",
      ], example: "Requirement: Excel reporting.\n\nEvidence: Maintained a weekly volunteer rota using Excel filters and formulas.\n\nCV wording: Maintained an Excel rota for a volunteer group, checking availability and flagging uncovered shifts.", exampleLabel: "Fictional requirement-to-evidence example" },
      { id: "use-matching-tool", heading: "Separate wording matches from file parsing", sourceUrls: [sources.parsing.url], paragraphs: [
        "Paste the advert and your CV into the [free resume keyword checker](/resume-keyword-checker/), or read a text-based PDF or DOCX on your device. Inspect the matched and missing terms, then return to the advert to understand the important ones in context.",
        "Folio uses plain text rules and a predefined skills library. It can miss synonyms and cannot judge the strength of an example. Its percentage is a share of extracted terms found in the CV, not an employer's ATS score or a prediction of selection.",
        "Greenhouse describes parsing as filling candidate fields from an uploaded resume. Its help page says a failed parse can leave the file attached while details need manual entry. That is a different issue from missing keywords and does not, by itself, establish rejection. Check any fields the application has filled from your file.",
      ] },
      { id: "edit-with-purpose", heading: "Change the parts that explain your fit", paragraphs: [
        "Start with the profile, your most relevant experience bullets, and the skills list. Use the employer's spelling of a tool or qualification when it accurately names the same thing. Explain an unfamiliar acronym once instead of scattering both versions throughout the page.",
        "An edit should add clarity or evidence. Replacing a vague line about reports with the actual software, audience, and purpose is useful. Adding an isolated list of terms that you cannot discuss is not. Use the [bullet point builder](/resume-bullet-point-generator/) if you need a structure for a specific example.",
      ] },
      { id: "check-final-version", heading: "Review the final version without the score", paragraphs: [
        "Read the CV from top to bottom as a document. Check that the profile agrees with the experience section, that no sentence promises skills you do not have, and that removing repetition has not removed important context. Follow the employer's requested file format.",
        "Save the tailored PDF with a copy of the advert so you can prepare for an interview using the same evidence. For layout issues rather than wording differences, read the [ATS-friendly CV guide](/tips/ats-friendly-cv/). A comparison tool should help your judgement, not replace it.",
      ] },
    ],
    faqs: [
      { question: "Should I aim for a perfect keyword match?", answer: "No. Prioritise relevant requirements and supported examples. A perfect percentage built from unsupported terms does not make a truthful or useful application." },
      { question: "What if I do not have an essential requirement?", answer: "Do not claim that you do. Read the advert carefully and decide whether your actual background fits; explain related experience accurately where relevant." },
    ],
    takeaway: "Match requirements to evidence first, use keyword comparison to check wording, and keep every change accurate enough to explain at interview.",
  },
  {
    slug: "improve-cv-bullet-points-with-ai", title: "How to improve CV bullet points with AI without inventing anything", published: "2026-11-12",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.aiResume, sources.aiRisk, sources.harvardTemplate],
    seoTitle: "How to Improve CV Bullet Points with AI: Before & After",
    description: "Improve CV and resume bullet points with AI while keeping every fact true. Three before-and-after examples, what gets sent, and how to spot invented claims.",
    category: "Free CV tools",
    intro: "An AI rewrite can make a vague bullet point clearer in seconds. It can also quietly turn “helped with” into “managed”, or add a result nobody measured. This tutorial walks through Folio's Improve bullet points with AI button using three fictional entries: a weekend retail job, a teaching placement, and a student placement project. For each one, you will see what to keep, what to fix, and what to delete before you apply the suggestion.",
    quickAnswer: "Write the real facts into the description first: what you did, for whom, how often, with which tools, and any result you can prove. Then ask for a rewrite, compare every suggested line with those facts, and delete anything the AI added or upgraded. In Folio, only that entry's job title and description are sent, and nothing in your CV changes until you choose Use these points.",
    checklist: { heading: "Before you choose Use these points", items: ["Every line matches a fact you supplied.", "No verb claims more responsibility than you had.", "No result appears that you did not measure or cannot explain.", "Work you shared with others still says so.", "The tense matches whether you still do the job.", "No pupil, customer, client, or colleague can be identified."] },
    relatedSlugs: ["resume-action-verbs-and-bullet-points", "ai-cv-maker-vs-template-builder", "tailor-resume-to-job-description"],
    tool: { href: "/editor/", label: "Open the CV editor", text: "Add a Work experience entry, write your facts in the description, and choose Improve bullet points with AI. Nothing changes until you apply the suggestion." },
    sections: [
      { id: "what-gets-sent", heading: "What the AI button sends, and what it is told to do", sourceUrls: [sources.aiRisk.url], paragraphs: [
        "In the Folio editor, every Work experience entry has an Improve bullet points with AI button under its description. It becomes available once the description has at least 30 characters. When you select it, the entry's job title and description go through Folio's server to OpenAI. Your name, contact details, photo, company name, dates, other entries, and uploaded files are not sent. Anything you typed inside the description is included, so take out details you would not want to share. Folio's server does not save or log the text; the [privacy page](/privacy/#ai) explains what OpenAI may retain.",
        "The model is instructed to keep every fact exactly as supplied, never to invent achievements, figures, responsibilities, tools, or skills, to return the same number of lines or fewer, and to start each line with an action word. Instructions reduce invented content, but they do not remove the need to check. NIST's generative AI risk profile lists confidently incorrect output as a known risk, which is why the suggestion arrives in an editable box rather than replacing your text.",
      ], figure: { src: "/guides/improve-cv-bullet-points-with-ai/entry.webp", alt: "A Work experience entry in the Folio editor with the job title Sales Assistant (weekend), three factual description lines, and the Improve bullet points with AI button below them", caption: "A Work experience entry in the Folio editor, filled in with this guide's fictional retail example.", width: 964, height: 1000 } },
      { id: "write-the-facts", heading: "Before you press the button, write the facts down", sourceUrls: [sources.aiResume.url, sources.harvardTemplate.url], paragraphs: [
        "The AI can only rearrange what you give it. A rough description that contains real details produces a better suggestion than a polished one that contains none. Replace a vague first draft with one line per task, using the checklist below. Keep it nearby: it is what you will check the suggestion against.",
        "MIT's careers guidance suggests using AI to analyse weak bullets and wording gaps, while checking that edits preserve your experience and voice. Harvard's bullet point template is a useful reminder of the parts a strong line combines: an action, the task, and the context or result.",
      ], bullets: [
        "What you did, with a verb you could defend at interview.",
        "Who it was for, or where it happened.",
        "How often or how many: shifts per week, pupils in a group, items per delivery.",
        "The tools, systems, or procedures you used.",
        "A result only if someone measured it, and only if it was yours.",
      ] },
      { id: "worked-example", heading: "Example 1: a weekend retail job", paragraphs: [
        "Sam, a fictional sixth-form student, works Saturdays at a garden centre. The first draft is three vague phrases. Sam rewrites it with the real details, then asks for a suggestion. The suggestions in these examples are illustrative, written for this guide to show the problems worth checking for; real suggestions vary, and Folio's instructions tell the model not to add facts, so you may see fewer problems. The check is the same either way.",
        "Two lines in the suggestion go beyond the facts. Helping to unload a delivery became managing it, and an increase in add-on sales appeared from nowhere. The suggestion also switched to the past tense, although Sam still works there.",
      ], table: { caption: "Retail example: from first draft to final bullet points", head: ["Stage", "Text"], rows: [
        ["First draft", "Worked on the tills. Helped with deliveries. Answered customer questions."],
        ["Facts supplied to the AI", "Work the tills on Saturday shifts, taking card and cash payments and processing refunds.\nHelp unload the Saturday morning delivery, usually around 30 trolleys of plants.\nAnswer customer questions about plant care and show them where products are."],
        ["AI suggestion", "Processed card and cash payments and refunds at the tills on Saturday shifts.\nManaged the Saturday morning delivery, unloading around 30 trolleys of plants.\nAdvised customers on plant care and guided them to products, increasing add-on sales."],
        ["Remove or fix", "“Managed” claims responsibility for the delivery; Sam helps with it.\n“Increasing add-on sales” is a result nobody measured.\nPast tense describes a job Sam has left; switch to the present tense."],
        ["Final bullet points", "Process card and cash payments and refunds at the tills on Saturday shifts.\nHelp unload the Saturday morning delivery of around 30 plant trolleys.\nAdvise customers on plant care and guide them to the products they need."],
      ] } },
      { id: "teaching-example", heading: "Example 2: a teaching placement", paragraphs: [
        "Priya, a fictional PGCE trainee, is writing up a second school placement for an early career teacher application. Placements belong in Work experience, so the AI button is available. The facts include the timetable share, because that tells a head teacher how much responsibility Priya actually took.",
        "The suggestion keeps most facts but adds an outcome, improved reading ages, that Priya never measured. It also turns supervising a trip into organising one. If a school has assessment data showing progress, you could describe it with permission and without identifying any pupil; without that evidence, describe the work itself.",
      ], table: { caption: "Teaching placement example: from first draft to final bullet points", head: ["Stage", "Text"], rows: [
        ["First draft", "Taught Year 4. Planned lessons with my mentor. Did a reading group. Went on the school trip."],
        ["Facts supplied to the AI", "Taught maths and English to a Year 4 class on my second PGCE placement (8 weeks), building up to 60% of the timetable.\nCo-planned lessons with my class mentor each week.\nRan a reading fluency group for five pupils three mornings a week.\nOne of four adults supervising a class trip to the city museum."],
        ["AI suggestion", "Taught maths and English to a Year 4 class over an eight-week PGCE placement, building up to 60% of the timetable.\nCo-planned weekly lessons with the class mentor.\nLed a reading fluency intervention for five pupils three mornings a week, improving their reading ages.\nHelped organise and supervise a class trip to the city museum."],
        ["Remove or fix", "“Improving their reading ages” is an outcome Priya did not measure.\n“Helped organise” adds planning work Priya did not do; the facts say supervised."],
        ["Final bullet points", "Taught maths and English to a Year 4 class over an eight-week PGCE placement, building up to 60% of the timetable.\nCo-planned weekly lessons with my class mentor.\nRan a reading fluency group for five pupils three mornings a week.\nSupervised pupils as one of four adults on a class trip to the city museum."],
      ] } },
      { id: "student-project-example", heading: "Example 3: a student placement project", paragraphs: [
        "Alex, a fictional computing student, built a small Python tool during a ten-week summer placement with another placement student. Shared work is where AI rewrites most often go wrong: a tidy sentence about a joint project can quietly credit one person with everything.",
        "The suggestion gives Alex the email summary that the other student built, drops the fact that the script was a joint project, and adds a time saving nobody recorded. The final version keeps Alex's own part clear and still says what changed for the team.",
        "The AI button appears on Work experience entries only. A placement belongs there. A class or personal project belongs under Projects, where you can build the same fact-based lines with the [bullet point builder](/resume-bullet-point-generator/) and check them the same way.",
      ], table: { caption: "Student placement example: from first draft to final bullet points", head: ["Stage", "Text"], rows: [
        ["First draft", "Did a summer placement in the operations team. Worked on a Python project. Learned a lot about data."],
        ["Facts supplied to the AI", "Wrote a Python script with one other placement student that checks the weekly stock spreadsheet for missing product codes.\nI wrote the validation checks and the setup guide; the other student built the email summary.\nThe team now runs the script every Monday instead of checking the spreadsheet by hand."],
        ["AI suggestion", "Developed a Python automation tool that validates the weekly stock spreadsheet for missing product codes, saving hours of manual work.\nWrote the validation logic and documentation, and built automated email summaries.\nReplaced manual weekly checks with an automated process adopted by the team."],
        ["Remove or fix", "“Saving hours of manual work”: nobody measured the time.\n“Built automated email summaries”: the other student built them.\n“Developed a … tool” on its own hides that it was a joint project."],
        ["Final bullet points", "Wrote the validation checks for a Python script, built with another placement student, that flags missing product codes in the weekly stock spreadsheet.\nWrote the setup guide for the operations team.\nThe team now runs the script every Monday in place of a manual spreadsheet check."],
      ] } },
      { id: "review-the-suggestion", heading: "Review the suggestion line by line", paragraphs: [
        "The suggestion appears below your description in an editable box. Your original text stays exactly as it was until you choose Use these points, and Discard removes the suggestion without changing anything. If you edit the description while a suggestion is open, Folio will not apply the old suggestion; ask again for one that matches your latest text.",
        "Read each suggested line against your facts and look for the same four problems the examples show. Fix them inside the box before applying, or discard the suggestion and edit by hand. For choosing accurate verbs and tenses without AI, see [resume action verbs and bullet points](/tips/resume-action-verbs-and-bullet-points/).",
      ], bullets: [
        "Upgraded responsibility: helped becomes managed, supported becomes led, supervised becomes organised.",
        "Unmeasured results: improved, increased, or saved, with no figure you could explain.",
        "Merged credit: work shared with a team or another student now reads as yours alone.",
        "Lost context: a number, frequency, or setting from your facts has disappeared.",
      ], figure: { src: "/guides/improve-cv-bullet-points-with-ai/review.webp", alt: "The Suggested bullet points box in the Folio editor, showing the retail example's suggestion, a note that only the description and job title were sent, and the buttons Use these points and Discard", caption: "The review step in the Folio editor. The suggestion shown is this guide's illustrative retail example, including the two claims that need fixing.", width: 896, height: 684 } },
      { id: "limits-and-privacy", heading: "Free limits, privacy, and when to skip AI", paragraphs: [
        "AI bullet improvement is free within a daily allowance: up to 20 requests per visitor per day, and no more than five a minute. A site-wide daily cap can pause AI help for everyone until the next day. Manual editing, downloads, and the rest of the editor keep working without AI.",
        "Leave out names of pupils, patients, customers, or clients, and anything your employer treats as confidential, before sending a description. Some application forms ask whether you used AI or require the content to be your own work; follow those instructions. If an entry is already clear and accurate, it does not need a rewrite.",
      ] },
    ],
    faqs: [
      { question: "Does the AI see my whole CV?", answer: "No. Improve bullet points with AI sends only the job title and description of the entry you choose. The [AI CV job match](/ai-cv-job-match/) tool sends more, and the [privacy page](/privacy/#ai) lists exactly what each AI feature sends." },
      { question: "What if the suggestion is worse than my original?", answer: "Choose Discard. Your original description stays exactly as it was, and you can keep editing it by hand or ask for another suggestion later." },
      { question: "Is it acceptable to use AI for CV bullet points?", answer: "Many employers accept help with wording, but some applications ask you to confirm the content is your own work or restrict AI use. Follow the employer's instructions, and only submit lines you can explain in an interview." },
    ],
    takeaway: "Give the AI facts, not hopes. Then read its suggestion line by line against those facts, and delete anything you could not explain in an interview.",
  },
];
