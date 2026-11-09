import type { Guide } from "./guide-types";

export const countryBlogGuides: Guide[] = [
  {
    slug: "uk-student-cv-checklist", title: "A UK student CV checklist for your first application", published: "2026-11-09",
    seoTitle: "UK Student CV Format: First-Application Checklist",
    description: "Prepare a UK student CV with accurate qualifications, placements, activities, and a clear profile. Includes a fictional education entry and free CV tools.",
    category: "Applying by country",
    intro: "A UK student CV should help an employer understand your education and the responsibilities you have taken on so far. You do not need to fill two pages simply because another applicant has more experience. Start with the opportunity, choose evidence that relates to it, and use a clear structure that makes the facts easy to find.",
    image: { kind: "template", id: "student", alt: "Student CV template with education placed prominently below a short introduction", caption: "Student template with fictional demonstration content." },
    tool: { href: "/cv-maker-for-students/", label: "Make your student CV", text: "Start with education first, then add relevant projects and activities in the free editor." },
    sections: [
      { id: "read-the-application", heading: "Check whether the employer wants a CV or a form", paragraphs: [
        "Read the vacancy's instructions before formatting anything. Some opportunities request a CV and letter; others use an application form with separate questions. Keep a factual working record of your education and activities so you can answer consistently in either format.",
        "Make a short list of the tasks in the role and identify one example for each requirement you can support. For a part-time shop job, visitor-facing volunteering may matter more than a long list of unrelated modules. For an internship, a relevant project may deserve the opening space.",
      ] },
      { id: "check-education", heading: "Make qualification status clear", paragraphs: [
        "The National Careers Service suggests placing education early when you have limited experience. Give the qualification, institution, and dates. Distinguish completed results from predicted grades or ongoing study so the reader can understand where you are now.",
        "Use a compact entry and select details that matter to the vacancy. If you mention a project, explain the work in its own entry or a short description. Avoid expecting a course title to demonstrate a practical skill without any example of how you used it.",
      ], example: "BSc Geography | Example University | 2024–2027, expected\n\nRelevant project: compared neighbourhood transport access using a public dataset and presented findings in a group report. Responsible for cleaning the survey spreadsheet and preparing two charts.", exampleLabel: "Fictional university education entry" },
      { id: "show-experience", heading: "Include placements, volunteering, and activities", paragraphs: [
        "You can include paid work, placements, volunteering, and projects when they provide relevant evidence. Give each a recognisable title, setting, and dates. Keep group outcomes separate from your individual contribution, and explain any internal club title an outside reader would not know.",
        "For a first application, an ordinary task can still show how you work. Preparing a weekly rota or helping someone find information is worth describing clearly. Use [action-led bullet points](/tips/resume-action-verbs-and-bullet-points/) to explain the activity rather than adding unsupported personality claims.",
      ] },
      { id: "contact-and-references", heading: "Check the information you share", paragraphs: [
        "Include working contact details and useful professional or project links. The National Careers Service advises leaving out age, date of birth, marital status, and nationality. Its guidance also says not to put someone else's contact details on the CV; arrange any requested references separately.",
        "Check your own links in a signed-out browser. A coursework document that asks the reader to request permission is not a useful public example. If a project contains private information, describe your contribution without exposing the original files.",
      ] },
      { id: "review-uk-student-cv", heading: "Check the PDF and keep an editable copy", paragraphs: [
        "Use a simple layout and enough readable text to explain your evidence. Do not shrink the font to keep a weak paragraph. Read the [UK CV format guide](/tips/uk-cv-format/) for broader conventions and the [first CV guide](/tips/your-first-cv/) for developing your content.",
        "Folio's [student CV maker](/cv-maker-for-students/) starts with an education-first order and downloads A4 PDFs without payment or signup. Save a browser or portable draft before closing the tab. Open the downloaded file, check every page, and follow the employer's requested file format.",
      ], bullets: ["Correct course status and dates.", "An accurate contribution behind each skill.", "Working contact details and accessible links.", "The required application documents and answers."] },
    ],
    faqs: [
      { question: "Should a UK student CV always be two pages?", answer: "Use the space your relevant evidence needs. A focused page can be enough for a first application; do not add filler or ignore an employer's length requirement." },
      { question: "Can I include an unfinished degree?", answer: "Yes. State the course and institution and make the expected completion date or current status clear." },
    ],
    sources: [{ title: "National Careers Service: How to write a CV", url: "https://nationalcareers.service.gov.uk/careers-advice/cv-sections" }],
    takeaway: "Show accurate education details and relevant responsibilities, protect private information, and check the exact document the employer will receive.",
  },
  {
    slug: "us-first-job-resume", title: "How to organise a US resume for your first job", published: "2026-11-09",
    seoTitle: "US First-Job Resume Format With No Experience",
    description: "Organise an entry-level US resume using education, projects, activities, and clear evidence. Includes a fictional example and an honest guide to PDF limits.",
    category: "Applying by country",
    intro: "For a first US job application, make the resume a clear introduction to the work you can do now. Education, projects, volunteer roles, and activities can provide useful evidence when paid experience is limited. Start with the employer's instructions, keep your contribution visible, and choose a format you can review and update for each application.",
    image: { kind: "template", id: "clarity", alt: "Clarity resume template with a plain single-column layout and standard headings", caption: "Clarity template, fictional example content; Folio CV output is A4." },
    tool: { href: "/cv-with-no-experience/", label: "Start a first-job resume", text: "Create a plain education-first CV and check whether its A4 PDF format fits the employer's request." },
    sections: [
      { id: "confirm-requirements", heading: "Check the requested format and application questions", paragraphs: [
        "Read the document instructions alongside the job description. A resume upload may sit beside questions about availability, qualifications, and work history. Answer each part rather than assuming the attachment replaces the form. Use consistent dates and descriptions across the application.",
        "The existing [US resume guide](/tips/us-resume-format/) covers broader local conventions. For your first draft, try a focused page with clear headings, then adjust to the employer's request and the amount of relevant evidence. A short page is not a reason to invent a job or an achievement.",
      ] },
      { id: "arrange-evidence", heading: "Put the strongest relevant evidence near the top", paragraphs: [
        "If education and a project best support the role, place them before unrelated activities. If a volunteer responsibility is the closest match, make it prominent and label it clearly. A short objective can name the role you want without claiming a career history you do not have.",
        "Give an activity a setting and dates, then explain what you did. CareerOneStop's work experience guidance encourages specific tasks, context, and outcomes, including relevant wording from the vacancy. Apply that idea to your own evidence without turning a school assignment into employment.",
      ], example: "School technology club | Website project | 2026\n\nBuilt two pages for a demonstration event website using HTML and CSS. Checked the layout on small screens and wrote setup notes for the next club member. This was an extracurricular practice project, not client work.", exampleLabel: "Fictional first-job project entry" },
      { id: "describe-level", heading: "Describe skills through the tasks you can perform", paragraphs: [
        "Name software and practical abilities where they matter to the role. Explain the level through an example: prepared a spreadsheet schedule is clearer than advanced office skills when you cannot support the latter. Mention training accurately, including whether it is completed or ongoing.",
        "Use the [first-job skills guide](/tips/skills-for-a-first-job-resume/) to find evidence from classes, clubs, and volunteering. Select the relevant points, not every possible item. Keep a genuine interest separate from a skill you have already practised.",
      ] },
      { id: "handle-file-format", heading: "Plan for the file format before downloading", paragraphs: [
        "Folio exports CVs as A4 PDF. It does not offer US Letter CV output or editable Word export. If the employer requires a particular size or DOCX, prepare the requested format instead of assuming a PDF satisfies it. A4 can be viewed on screen, but that does not override an explicit instruction.",
        "When PDF is accepted, open the downloaded file and check the text, links, and page breaks. The [PDF checking guide](/tips/cv-pdf-download-checklist/) walks through the process. A selectable-text file is useful, but it does not guarantee how an employer's particular system will handle the document.",
      ] },
      { id: "save-and-tailor", heading: "Save one clear version for each application", paragraphs: [
        "Keep the advert, the resume you sent, and your application answers together. Before the next application, update the emphasis using the new job's requirements. Change which examples are prominent rather than adding a string of keywords with no evidence.",
        "The [no-experience resume builder](/cv-with-no-experience/) provides a blank starting structure, and the [keyword checker](/resume-keyword-checker/) can help compare wording. Save an editable draft as well as the submitted PDF so a small correction later does not require rebuilding the whole document.",
      ] },
    ],
    faqs: [
      { question: "Can volunteering go on a first US resume?", answer: "Yes. Label the setting accurately and describe the responsibilities that relate to the job. Do not present unpaid activity as paid employment." },
      { question: "Does Folio download US Letter resumes?", answer: "No. CV downloads are A4 PDF. Check the employer's file and paper-size instructions before using that output." },
    ],
    sources: [{ title: "CareerOneStop Resume Guide: Work experience", url: "https://cloudfront.careeronestop.org/JobSearch/Resumes/ResumeGuide/work-experience.aspx" }],
    takeaway: "Use relevant education and activities as evidence, keep their context accurate, and follow the application's file-format requirements.",
  },
  {
    slug: "canadian-newcomer-resume", title: "A Canadian resume for newcomers: explain your overseas experience", published: "2026-11-09",
    seoTitle: "Canadian Resume for Newcomers: Overseas Experience Guide",
    description: "Make overseas experience clear in a Canadian resume with accurate job titles, employer context, qualifications, and skills. Includes fictional wording examples.",
    category: "Applying by country",
    intro: "A newcomer resume should make your experience understandable to someone who may not recognise your previous employers, course names, or job titles. You do not need to erase that background or invent Canadian work. Add enough context to show the work you did, connect it to the vacancy, and keep qualifications and responsibilities accurate.",
    image: { kind: "template", id: "professional", alt: "Professional resume template with a clear profile, work history, and education", caption: "Professional template with fictional demonstration content." },
    tool: { href: "/editor/", label: "Create your resume", text: "Write clear experience entries and preview an A4 PDF; check any employer-specific format request." },
    sections: [
      { id: "explain-the-employer", heading: "Give unfamiliar employers a short description", paragraphs: [
        "Keep the organisation's real name, then add a brief description if it helps the reader understand the setting. Regional distributor, university laboratory, and customer support centre each provide context without needing a long company history. Keep confidential commercial information out of the explanation.",
        "Use an accurate job title and explain the work in the description. If a literal title would be unfamiliar, add a plain-language clarification rather than replacing it with a more senior Canadian title. The aim is understanding, not upgrading the role.",
      ], example: "Operations Assistant | Example Distribution Ltd | 2022–2025\n\nRegional distributor serving independent retailers. Maintained order records, coordinated delivery updates with warehouse colleagues, and prepared a weekly spreadsheet of unresolved queries.", exampleLabel: "Fictional overseas experience entry" },
      { id: "connect-to-vacancy", heading: "Choose evidence that connects to the Canadian vacancy", paragraphs: [
        "Read the tasks and tools in the advert and identify where you have used comparable skills. Explain your contribution in ordinary language before checking keyword differences. Do not assume a recruiter will know an internal system name or regional business abbreviation.",
        "The [resume keyword checker](/resume-keyword-checker/) can show differences in wording, but it does not assess whether two roles or qualifications are equivalent. Keep the details truthful and describe the actual tasks. A relevant overseas example remains relevant without a Canadian employer name attached to it.",
      ] },
      { id: "qualifications-and-language", heading: "Describe qualifications and language skills carefully", paragraphs: [
        "List your qualification, institution, and dates using accurate names. If you have a formal assessment or professional registration, describe the status exactly as documented. Do not claim a local equivalence or permission to practise that you have not obtained. Consult the relevant organisation directly when a role has formal requirements.",
        "Describe language skills in terms you can support, such as the kinds of conversations or documents you can handle. Keep course attendance, test results, and workplace use distinct. Use the Languages section to make this information easy to find without repeating it throughout the CV.",
      ] },
      { id: "local-details", heading: "Use Canadian guidance without adding unnecessary personal details", paragraphs: [
        "Canada's Job Bank advises a concise, tailored resume and generally limits it to two pages. Its guidance also says photos and a Social Insurance Number do not belong on a resume, and that references should be provided separately when requested. Follow any specific application instructions alongside that general advice.",
        "Read the broader [Canadian resume format guide](/tips/canadian-resume-format/) for layout context. This article focuses on explaining experience, rather than immigration or licensing advice. Keep sensitive documents out of the resume and use the employer's appropriate process for any separately required information.",
      ] },
      { id: "use-the-builder", heading: "Build a readable document and check its limits", paragraphs: [
        "Choose a plain layout such as Professional or Clarity, put the most relevant evidence first, and keep dates consistent. Add local volunteering, courses, or projects if you have them and they help the application; do not invent activities to make the resume look local.",
        "Folio's free editor creates A4 PDF CVs. If an employer requests Letter size, Word, or a particular form, follow that requirement. Save an editable draft, check the downloaded file, and keep the version submitted with the vacancy so you can refer to it at interview.",
      ] },
    ],
    faqs: [
      { question: "Should I remove all overseas work from a Canadian resume?", answer: "No. Explain relevant experience with clear employer context, accurate titles, and specific contributions. Overseas work can still show the skills requested in the vacancy." },
      { question: "Can the keyword checker confirm a qualification's equivalence?", answer: "No. It compares text. Describe any qualification assessment or registration using the actual status provided by the relevant organisation." },
    ],
    sources: [{ title: "Government of Canada Job Bank: How to write a good resume", url: "https://www.jobbank.gc.ca/findajob/resources/write-good-resume" }],
    takeaway: "Keep overseas experience visible, add context for unfamiliar details, and describe qualifications and local status without assumptions.",
  },
  {
    slug: "australian-student-resume", title: "An Australian student resume for casual and first jobs", published: "2026-11-09",
    seoTitle: "Australian Student Resume: Casual and First-Job Guide",
    description: "Write an Australian student resume with clear availability, relevant study, activities, and service experience. Includes fictional examples and a free A4 CV tool.",
    category: "Applying by country",
    intro: "For a student seeking casual or first-job work in Australia, the resume should make your relevant responsibilities and availability easy to understand. Paid work, volunteering, practical coursework, and regular activities can all provide evidence. Choose the details that fit the vacancy and keep the document accurate enough that you can discuss every line with an employer.",
    image: { kind: "template", id: "regent", alt: "Regent resume template with a clear single-column layout and contact details", caption: "Regent template with fictional demonstration content." },
    tool: { href: "/cv-maker-for-students/", label: "Create a student resume", text: "Use an education-first layout and download an A4 PDF without signup or payment." },
    sections: [
      { id: "choose-relevant-work", heading: "Begin with the work the vacancy actually involves", paragraphs: [
        "Read the advert for duties, location, hours, required training, and application instructions. A casual hospitality role and an office internship ask for different evidence, even if both welcome students. Choose your examples for the work rather than using one unchanged resume for every vacancy.",
        "If you have only a small amount of experience, use a focused document with clear headings. The broader [Australian resume guide](/tips/australian-resume-format/) covers local conventions. Here, the aim is to make a first application understandable without padding it with unrelated subjects or interests.",
      ] },
      { id: "explain-availability", heading: "State genuine availability where it helps", paragraphs: [
        "For work built around shifts, a clear note about when you can work can be useful. Distinguish term-time availability from holiday availability if they differ. Keep the commitment realistic and update it when your timetable changes rather than promising every possible shift.",
        "If the employer separately asks about work eligibility, answer accurately through its application process. Do not copy another student's visa wording or rely on a generic blog for current conditions. Check the official information relevant to your own situation when that question arises.",
      ], example: "Available Tuesday and Thursday evenings and Saturdays during semester, with additional weekday availability during university breaks.\n\nUse only the days and hours that are accurate for your own timetable.", exampleLabel: "Fictional availability wording" },
      { id: "describe-evidence", heading: "Use activities to show reliability and practical skills", paragraphs: [
        "A student society role, community activity, or project can show organisation, communication, and follow-through. Explain what you did regularly, which information or tools you handled, and how you worked with other people. Keep each activity's setting clear.",
        "Study Australia's student resume guidance highlights a clear personal statement, relevant skills, concise writing, and proofreading. For your own draft, turn those ideas into specific entries rather than a list of adjectives. Read [skills for a first-job resume](/tips/skills-for-a-first-job-resume/) for a practical evidence-finding exercise.",
      ], example: "Volunteer event helper | Community sports day | 2026\n\nChecked participants against the event list, directed visitors to activities, and helped pack equipment at the end of the day. Referred timetable changes to the event coordinator.", exampleLabel: "Fictional student activity entry" },
      { id: "training-and-referees", heading: "Keep training and referee details accurate", paragraphs: [
        "If the advert asks for a particular certificate or training, list it only if you hold it and state its status accurately. A willingness to complete training is different from having already completed it. Do not borrow certificate wording from a template without checking your own record.",
        "If referees are requested, ask the people first and follow the application instructions for providing their details. A teacher, supervisor, or volunteer coordinator may be able to describe your work if they know it well. Keep their information out of widely shared copies unless it is needed and agreed.",
      ] },
      { id: "review-australian-resume", heading: "Check the layout and the application as a whole", paragraphs: [
        "Read your profile, activities, education, and skills together. Make sure the same facts appear in any form answers or cover letter. Check spelling, dates, links, and page breaks, and ask someone to read the document if you can.",
        "Folio's [student resume builder](/cv-maker-for-students/) downloads an A4 PDF and lets you hide unused sections. Save an editable draft before closing the tab. If the advert requires another format or additional answers, complete those steps too; a finished resume is only one part of the application.",
      ] },
    ],
    faqs: [
      { question: "Can I apply for casual work without a paid job history?", answer: "You can describe relevant study, projects, volunteering, and responsibilities honestly. The employer decides whether that evidence meets the vacancy's requirements." },
      { question: "Should I copy visa or certificate details from an example?", answer: "No. Use only your own accurate status and records, and check official or issuing-body information when needed." },
    ],
    sources: [{ title: "Study Australia: The international student's guide to writing a great resume", url: "https://www.studyaustralia.gov.au/en/tools-and-resources/tips-and-advice-for-students/the-international-student-s-guide-to-writing-a-great-resume--" }],
    takeaway: "Match the vacancy with real activities and skills, keep availability and training accurate, and review the complete application before sending.",
  },
];
