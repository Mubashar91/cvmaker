import type { Guide } from "./guide-types";

export const freeToolGuides: Guide[] = [
  {
    slug: "free-cv-maker-without-signup", title: "How to make a CV for free without signing up", published: "2026-11-09",
    seoTitle: "Free CV Maker Without Signup: Create and Save Your CV",
    description: "Create a CV without registration, keep an editable copy, and download a free PDF. A practical walkthrough of templates, local drafts, and final checks.",
    category: "Free CV tools",
    intro: "You can create a complete CV without opening an account. The important part is understanding where your work lives and saving something you can edit later. This walkthrough takes you from a blank page to a downloaded PDF in Folio, including the small checks that prevent a lost draft or an unfinished application.",
    image: { kind: "template", id: "clarity", alt: "Clarity CV template with a single column and standard section headings", caption: "Clarity template with fictional demonstration content." },
    tool: { href: "/editor/", label: "Create a CV without signup", text: "Start a blank CV, edit your details, and download the PDF without an account." },
    sections: [
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
      { id: "keep-editable-copy", heading: "Save an editable copy before closing the tab", paragraphs: [
        "Without an account, there is no online profile to sign back into. Folio keeps current edits in the tab until you choose to save a browser draft. That saved draft belongs to this browser on this device; another computer will not automatically have it.",
        "Download a portable JSON draft if you want a separate editable backup. Keep it somewhere private and restore it in the editor when needed. The PDF is the version to send, while the draft is the version to keep for future changes. Clearing browser storage can remove a browser draft.",
      ], bullets: ["Save a browser draft deliberately.", "Download a portable draft for a separate backup.", "Keep a named PDF for each application."] },
      { id: "download-and-check", heading: "Download the actual PDF and open it", paragraphs: [
        "Review every preview page, then download and open the PDF. Check links, spelling, contact details, and the final lines on each page. Folio exports an A4 PDF without a watermark or payment step. Follow a different file-format requirement if the employer gives one.",
        "For a fuller final review, use the [CV checklist](/tips/before-you-send/). Making the document without signup is convenient, but a careful saved copy is what makes the work reusable for your next application.",
      ] },
    ],
    faqs: [
      { question: "Can I edit my CV later without an account?", answer: "Yes, if you save a browser draft or download a portable JSON draft. A PDF alone is not the editable Folio draft." },
      { question: "Does no signup mean my CV is automatically saved?", answer: "No. Saving is your choice. Save or download a draft before closing the tab if you want to keep editing later." },
    ],
    takeaway: "Create without an account, review the imported or typed facts, and keep both an editable draft and the finished PDF.",
  },
  {
    slug: "free-resume-builder-without-payment", title: "What to check in a free resume builder before you start", published: "2026-11-09",
    seoTitle: "Free Resume Builder Without Payment: A Practical Checklist",
    description: "Check PDF downloads, watermarks, template access, subscriptions, and editable backups before choosing a free resume builder. Includes Folio's actual limits.",
    category: "Free CV tools",
    intro: "A resume builder is useful only if it lets you finish the task you came for. Before entering your whole career history, check what you can download, what you can edit, and how you can keep a copy. This checklist helps you assess the complete workflow without relying on the word free in a headline.",
    image: { kind: "template", id: "professional", alt: "Professional CV layout with a traditional single-column structure", caption: "Professional template, fictional sample content." },
    tool: { href: "/templates/", label: "Browse free templates", text: "Every Folio template can be edited and downloaded as a PDF without payment." },
    sections: [
      { id: "test-the-download", heading: "Check the finished download first", paragraphs: [
        "Start with a small test document rather than your complete CV. Add a name and one entry, view the preview, and find the download action. Confirm the offered file type and whether the finished file needs payment, registration, or a subscription. Judge the workflow you can actually complete.",
        "In Folio, editing and A4 PDF downloads are free. The downloaded CV has selectable text and no watermark. The editor imports PDF and DOCX files, but it does not export an editable Word document. That distinction matters if a particular application asks for DOCX.",
      ] },
      { id: "read-the-access-details", heading: "Separate template access from extra services", paragraphs: [
        "Check whether the design you selected is included, whether changing the layout keeps your content, and whether any advertised writing assistance has a separate limit. These are questions to ask of a service, rather than assumptions about any named competitor.",
        "All Folio layouts and the existing browser tools are free. Its summary, objective, cover letter, and bullet helpers use predefined patterns or your own words. They do not call an AI service. If you specifically need AI rewriting, read [AI CV makers versus template builders](/tips/ai-cv-maker-vs-template-builder/) before choosing a workflow.",
      ] },
      { id: "look-beyond-price", heading: "Check how your information is handled", paragraphs: [
        "A zero price does not explain where information goes or how long it remains available. Look for an explanation of imports, drafts, account storage, and third-party processing. Use a fictional test entry while exploring an unfamiliar tool, then decide whether its data handling fits your needs.",
        "Folio reads CV imports, edits content, and generates PDFs in your browser. A draft is saved only when you choose to save one. Read the [privacy page](/privacy/) for the full explanation, including website requests and other services on the page. Keep downloaded drafts private because they contain your information.",
      ] },
      { id: "check-editing-and-backups", heading: "Keep a route back to your editable work", paragraphs: [
        "Look for a way to change a date or tailor a bullet after the first download. A polished PDF is useful for sending, but an editable source saves you recreating the whole document. Find out whether a draft follows an account, a browser, or a downloaded file.",
        "With Folio, save in the current browser or download a portable JSON draft. A browser draft does not sync between devices. Download the draft before changing computers or clearing storage, and keep the PDF you actually submitted beside your application notes.",
      ] },
      { id: "make-a-decision", heading: "Use a short decision checklist", paragraphs: [
        "Choose the builder that supports your next real application. If the employer accepts PDF, check the downloaded PDF. If it requires Word or an application form, plan that step before writing everything in a tool that cannot provide the requested format.",
        "Once the practical checks pass, focus on the content. A clear example of your work contributes more than another hour comparing accent colours. Use [resume keyword matching](/resume-keyword-checker/) to review relevant wording, then read the finished document yourself.",
      ], bullets: ["Can I download the required format?", "Does the finished file have a watermark?", "Can I revise and back up my work?", "Are any limits or data-processing steps clearly explained?"] },
    ],
    faqs: [
      { question: "Does Folio require a credit card?", answer: "No. Its editor, templates, browser writing tools, and PDF downloads do not require payment or a subscription." },
      { question: "Does a free PDF download include Word export?", answer: "No. Folio imports DOCX but exports CVs as A4 PDF. Follow the employer's requested format." },
    ],
    takeaway: "Check the complete download and editing workflow before investing time, then choose a tool that fits the application's requirements.",
  },
  {
    slug: "cv-pdf-download-checklist", title: "How to download a CV as a PDF and check it properly", published: "2026-11-09",
    seoTitle: "Free CV PDF Download: Export and File-Checking Guide",
    description: "Download your CV as a free PDF, check text selection and page breaks, choose a clear filename, and keep the editable draft for your next application.",
    category: "Free CV tools",
    intro: "The preview is where you edit; the downloaded file is what the employer receives. Treat the download as a small quality check of its own. A few minutes spent opening the actual PDF can catch an old phone number, a broken link, an awkward final page, or the wrong version before it becomes part of your application.",
    image: { kind: "template", id: "linear", alt: "Linear template showing clear section headings and left-aligned resume text", caption: "Linear template with fictional CV content." },
    tool: { href: "/editor/", label: "Preview and download your CV", text: "Folio shows the generated PDF in the editor and downloads it without a watermark." },
    sections: [
      { id: "check-format-request", heading: "Read the file instructions before exporting", paragraphs: [
        "Find the employer's file type, size limit, and naming instructions. If the application asks for DOCX or answers entered directly into a form, a PDF is not a substitute. Keep a note of the requirements beside the advert rather than relying on what you used for a previous application.",
        "Folio's CV download is an A4 PDF. Importing a Word document does not create a Word-export option. If a specific paper size is required, check that requirement before submitting; the separate cover letter tool offers A4 and US Letter, but the CV editor uses A4.",
      ] },
      { id: "inspect-page-breaks", heading: "Review every page, including the last one", paragraphs: [
        "Scroll through the full preview at a readable size. Look for a short final page, an unusually dense paragraph, or a heading that seems separated from its explanation. Check that hidden sections really should be hidden and that imported entries have not been put in the wrong section.",
        "Shorten repeated wording before changing spacing. If you try another template, review its page count again because the same text can occupy different space. Read [how to keep a CV focused](/tips/keep-it-focused/) if a few leftover lines are creating an unnecessary extra page.",
      ] },
      { id: "open-the-file", heading: "Open the downloaded file outside the editor", paragraphs: [
        "Download the PDF and open it in a PDF viewer. Confirm that the name, email address, dates, and links are correct in that file. Select a paragraph and copy it into a plain text note to inspect the wording and reading order. This is a practical check, not proof of compatibility with every hiring system.",
        "The downloaded Folio PDF contains text rather than a screenshot of the page. If an imported source was a scan, you still need to enter its content manually; saving an image as PDF does not create an editable CV. Use the [ATS formatting guide](/tips/ats-friendly-cv/) for a broader layout review.",
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
      { question: "Can I turn the finished PDF back into a draft?", answer: "You can import a text-based PDF and review the extracted fields, but keeping a portable JSON draft preserves the editable Folio data more directly." },
    ],
    takeaway: "Follow the requested format, inspect the actual downloaded PDF, and keep the editable draft as well as the version you send.",
  },
  {
    slug: "ai-cv-maker-vs-template-builder", title: "AI CV maker or template builder: which help do you need?", published: "2026-11-09",
    seoTitle: "Free AI CV Maker vs Template Builder: What to Check",
    description: "Understand AI writing, fixed sentence patterns, and CV layout tools. Check factual accuracy, privacy, downloads, and employer instructions before choosing.",
    category: "Free CV tools",
    intro: "Searching for a free AI CV maker can mean several different things: help finding words, help arranging a document, or simply a finished PDF without payment. Those are separate tasks. Identify the task you need help with first, then check what the tool actually does instead of assuming an AI label describes the whole experience.",
    image: { kind: "template", id: "minimal", alt: "Minimal CV template with restrained typography and clearly labelled sections", caption: "Minimal template, fictional sample content." },
    tool: { href: "/tools/", label: "Explore Folio's browser tools", text: "Folio uses fixed templates and local text matching, with no AI service processing your CV." },
    sections: [
      { id: "separate-the-jobs", heading: "Separate writing help from document layout", paragraphs: [
        "A layout tool places your information into a design and creates a file. A writing helper may combine your details with fixed sentence patterns. A generative AI tool can produce new wording from instructions and context. A product may offer one or more of these functions, so read its feature explanation.",
        "For example, if your sentences are already clear but the document is difficult to format, another rewrite may not solve the problem. If the page looks fine but every bullet says only what you were responsible for, work on specific contributions before changing the template.",
      ], table: { caption: "Three different kinds of CV help", head: ["Task", "Useful support", "What you still check"], rows: [["Arrange a document", "Templates and a live PDF preview", "Reading order and page breaks"], ["Start a short paragraph", "Fixed prompts or generated wording", "Facts, voice, and relevance"], ["Compare with an advert", "Keyword comparison", "Whether each term is supported"]] } },
      { id: "supply-the-facts", heading: "Write a fact sheet before asking for wording", paragraphs: [
        "List your real job titles, dates, tools, tasks, and outcomes. Separate measured results from rough impressions. If you do not know a figure, leave it out. This gives you a reference when a polished sentence sounds stronger than the experience you can explain.",
        "With any writing workflow, check each statement against that fact sheet. Do not accept a claim that you led a team when you contributed to one, or a percentage improvement with no source. A clear description of a small contribution is more useful than an impressive invention.",
      ] },
      { id: "review-ai-output", heading: "Review generated wording as a draft", paragraphs: [
        "NIST's generative AI risk profile identifies confidently incorrect output and data privacy as risks. For CV writing, the practical response is to verify every claim and consider what information a service receives before using it. A fluent paragraph is not evidence that its facts are correct.",
        "Read the employer's instructions about assistance and authorship. Keep the application in language you can explain at interview. If wording changes your meaning or introduces experience you did not provide, remove it. You remain responsible for what you submit, regardless of which tool helped prepare it.",
      ] },
      { id: "check-product-limits", heading: "Check downloads, data handling, and limits", paragraphs: [
        "Before entering a full CV, find the export format, free-use limits, signup requirements, and explanation of data handling. Do not assume all products using the same label follow the same practices. A small fictional test document lets you inspect the workflow before adding personal details.",
        "Folio does not use AI. Its [summary builder](/resume-summary-builder/) and [cover letter maker](/cover-letter-maker/) combine supplied details with predefined patterns; its [keyword checker](/resume-keyword-checker/) compares text locally. These tools provide a starting structure, rather than an independent assessment of your experience.",
      ] },
      { id: "choose-next-step", heading: "Choose the smallest amount of help that solves the task", paragraphs: [
        "If you need one stronger line, try the [bullet point builder](/resume-bullet-point-generator/) and edit the result. If you need a document layout, choose a [CV template](/templates/). If you need a first-job structure, begin with the [no-experience CV page](/cv-with-no-experience/).",
        "Whichever route you use, finish with the same checks: accurate facts, relevant examples, your own voice, a readable file, and a saved editable copy. No writing method can promise an interview or remove the need to tailor an application.",
      ] },
    ],
    faqs: [
      { question: "Is Folio an AI resume builder?", answer: "No. It is a free browser CV editor with predefined writing patterns and local text tools. It does not call an AI service." },
      { question: "Can a generated summary be used without editing?", answer: "Review it first. Confirm the facts, remove generic or exaggerated wording, and follow the employer's instructions about assistance." },
    ],
    sources: [{ title: "NIST: Generative Artificial Intelligence Profile, AI 600-1", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" }],
    takeaway: "Choose help for the task you have, keep a record of the facts, and review every sentence before it becomes part of your application.",
  },
  {
    slug: "tailor-resume-to-job-description", title: "How to match your resume to a job description honestly", published: "2026-11-09",
    seoTitle: "Resume Keyword Matching: Tailor Your CV to a Job Description",
    description: "Compare a resume with a job description, separate requirements from keywords, and edit your profile and bullets without copying or inventing experience.",
    category: "Free CV tools",
    intro: "Matching a resume to a job description starts with deciding which requirements you can support. A keyword list can reveal a difference in wording, but it cannot decide whether you have the experience. Use this workflow to turn the advert into a short evidence checklist, then make changes that help a reader understand the fit.",
    image: { kind: "example", id: "data-analyst", alt: "Fictional data analyst CV with SQL, reporting, and project evidence", caption: "Data analyst CV example with fictional employers and achievements." },
    tool: { href: "/resume-keyword-checker/", label: "Compare your CV with an advert", text: "See matching and missing terms, then decide which changes your experience supports." },
    sections: [
      { id: "read-for-requirements", heading: "Read the advert before running a comparison", paragraphs: [
        "Separate the role's tasks, essential requirements, desirable experience, and application instructions. Repeated words can be informative, but a qualification mentioned once may still be essential. Keep the full advert nearby so you do not lose the surrounding meaning when reviewing a list of terms.",
        "Create a note with three columns: what the employer asks for, your evidence, and where that evidence appears. Leave an honest blank where you do not have it. That is a clearer starting point than adding every repeated word to the skills section.",
      ] },
      { id: "build-evidence-map", heading: "Map requirements to real examples", paragraphs: [
        "For each requirement, choose a project, task, or responsibility that shows what you can do. Name the setting and your own contribution. If a role asks for customer communication, evidence could come from paid support work, volunteering, or a relevant placement; the source should remain clear.",
        "Do not relabel a short course as professional experience. You can still mention that course, describe the exercises you completed, and explain what you practised. The distinction helps a recruiter judge the level of experience without having to guess.",
      ], example: "Requirement: Excel reporting.\n\nEvidence: Maintained a weekly volunteer rota using Excel filters and formulas.\n\nCV wording: Maintained an Excel rota for a volunteer group, checking availability and flagging uncovered shifts.", exampleLabel: "Fictional requirement-to-evidence example" },
      { id: "use-matching-tool", heading: "Use keyword matching as a wording check", paragraphs: [
        "Paste the advert and your CV into the [free resume keyword checker](/resume-keyword-checker/), or read a text-based PDF or DOCX on your device. Inspect the matched and missing terms, then return to the advert to understand the important ones in context.",
        "Folio uses plain text rules and a predefined skills library. It can miss synonyms and cannot judge the strength of an example. Its percentage is a share of extracted terms found in the CV, not an employer's ATS score or a prediction of selection.",
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
];
