import type { Guide } from "./guide-types";
import { BLOG_SOURCES_CHECKED, guideSources as sources } from "./guide-sources";

export const countryBlogGuides: Guide[] = [
  {
    slug: "uk-student-cv-checklist", title: "A UK student CV checklist for your first application", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED,
    seoTitle: "UK Student CV Format: First-Application Checklist",
    description: "Prepare a UK student CV with accurate qualifications, placements, activities, and a clear profile. Includes a fictional education entry and free CV tools.",
    category: "Applying by country",
    intro: "For a first UK application, the useful question is which evidence belongs near the top. A placement, degree project, or regular activity may explain more than an employment section with nothing in it. Use this checklist to organise those details and handle predicted results and references clearly.",
    quickAnswer: "Use clear contact details, an optional specific profile, accurate education, and relevant projects or activities. Put the strongest evidence first and label predicted results. Follow the vacancy's length and document instructions; a fixed two-page rule does not suit every student application.",
    checklist: { heading: "Check your UK student application", items: ["Completed and predicted results are clearly distinguished.", "Your strongest relevant activity appears early enough to find.", "An unpaid activity is labelled accurately.", "You have permission and a separate process for any requested references.", "The CV, form answers, and cover letter agree on dates and responsibilities."] },
    relatedSlugs: ["uk-cv-format", "resume-summary-examples-for-students", "cover-letter-with-no-experience"],
    image: { kind: "template", id: "student", alt: "Student CV template with education placed prominently below a short introduction", caption: "Student template with fictional demonstration content." },
    tool: { href: "/cv-maker-for-students/", label: "Make your student CV", text: "Start with education first, then add relevant projects and activities in the free editor." },
    sections: [
      { id: "worked-example", heading: "Worked example: put education and activities in a useful order", paragraphs: [
        "Imagine a university student applying for a part-time administration role. They maintain a society attendance sheet and have an unfinished degree. Their clearest evidence is the record-keeping task, supported by a simple education entry with an expected completion date. They do not need a paragraph listing every module.",
        "In Folio, place Education and the relevant activity near the top, then remove empty entries. If your strongest evidence is a placement instead, move that section earlier. Keep the qualification status visible whichever order you choose; a future completion date should not look like an award already received.",
      ], example: "Education: BSc Geography, Example University, 2024–2027, expected.\n\nRelevant activity: Society committee volunteer, 2025–Present. Maintains an attendance spreadsheet and prepares meeting notes for the committee.\n\nAdditional project: Survey assignment; cleaned response data and prepared charts for the group presentation.", exampleLabel: "Fictional UK student evidence outline" },
      { id: "read-the-application", heading: "Check whether the employer wants a CV or a form", paragraphs: [
        "Read the vacancy's instructions before formatting anything. Some opportunities request a CV and letter; others use an application form with separate questions. Keep a factual working record of your education and activities so you can answer consistently in either format.",
        "Make a short list of the tasks in the role and identify one example for each requirement you can support. For a part-time shop job, visitor-facing volunteering may matter more than a long list of unrelated modules. For an internship, a relevant project may deserve the opening space.",
      ] },
      { id: "check-education", heading: "Make qualification status clear", sourceUrls: [sources.ukCV.url], paragraphs: [
        "The National Careers Service suggests placing education early when you have limited experience. Give the qualification, institution, and dates. Distinguish completed results from predicted grades or ongoing study so the reader can understand where you are now.",
        "Use a compact entry and select details that matter to the vacancy. If you mention a project, explain the work in its own entry or a short description. Avoid expecting a course title to demonstrate a practical skill without any example of how you used it.",
      ], example: "BSc Geography | Example University | 2024–2027, expected\n\nRelevant project: compared neighbourhood transport access using a public dataset and presented findings in a group report. Responsible for cleaning the survey spreadsheet and preparing two charts.", exampleLabel: "Fictional university education entry" },
      { id: "show-experience", heading: "Include placements, volunteering, and activities", paragraphs: [
        "You can include paid work, placements, volunteering, and projects when they provide relevant evidence. Give each a recognisable title, setting, and dates. Keep group outcomes separate from your individual contribution, and explain any internal club title an outside reader would not know.",
        "For a first application, an ordinary task can still show how you work. Preparing a weekly rota or helping someone find information is worth describing clearly. Use [action-led bullet points](/tips/resume-action-verbs-and-bullet-points/) to explain the activity rather than adding unsupported personality claims.",
      ] },
      { id: "contact-and-references", heading: "Check the information you share", sourceUrls: [sources.ukCV.url], paragraphs: [
        "Include working contact details and useful professional or project links. The National Careers Service advises leaving out age, date of birth, marital status, and nationality. Its guidance also says not to put someone else's contact details on the CV; arrange any requested references separately.",
        "Check your own links in a signed-out browser. A coursework document that asks the reader to request permission is not a useful public example. If a project contains private information, describe your contribution without exposing the original files.",
      ] },
      { id: "review-uk-student-cv", heading: "Check the PDF and keep an editable copy", sourceUrls: [sources.lseCV.url], paragraphs: [
        "LSE notes that CV length varies by sector and employer. Avoid a fixed two-page rule for every student application: use the relevant evidence and follow the vacancy's limit. Read the [UK CV format guide](/tips/uk-cv-format/) for broader conventions and the [first CV guide](/tips/your-first-cv/) for developing your content.",
        "Folio's [student CV maker](/cv-maker-for-students/) starts with an education-first order and downloads A4 PDFs without payment or signup. Save a browser or portable draft before closing the tab. Open the downloaded file, check every page, and follow the employer's requested file format.",
      ], bullets: ["Correct course status and dates.", "An accurate contribution behind each skill.", "Working contact details and accessible links.", "The required application documents and answers."] },
    ],
    faqs: [
      { question: "Must I publish my referees' phone numbers on a UK student CV?", answer: "The National Careers Service advises against putting another person's contact details on the CV. Ask permission and provide references separately through the employer's requested process." },
      { question: "Can I include an unfinished degree?", answer: "Yes. State the course and institution and make the expected completion date or current status clear." },
      { question: "Where should I put a society or volunteer role?", answer: "Use Activities, Volunteering, or a clearly labelled experience entry. Choose a heading that makes the context understandable and describe your own responsibility." },
    ],
    sources: [sources.ukCV, sources.lseCV],
    takeaway: "Show accurate education details and relevant responsibilities, protect private information, and check the exact document the employer will receive.",
  },
  {
    slug: "us-first-job-resume", title: "How to organise a US resume for your first job", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED,
    seoTitle: "US First-Job Resume Format With No Experience",
    description: "Organise an entry-level US resume using education, projects, activities, and clear evidence. Includes a fictional example and an honest guide to PDF limits.",
    category: "Applying by country",
    intro: "A first US resume can be useful without a paid job history. The key is making education, activities, and project work understandable in their actual settings. Start with a concise outline, then check the vacancy's file requirements before investing time in the final layout.",
    quickAnswer: "Use standard headings and relevant education, projects, volunteering, or activities. Describe your own tasks and dates clearly. Check the employer's requested file type and size: Folio exports A4 PDF CVs, alongside editable Word files; US Letter CV output is not offered. Use another output workflow when the request requires it.",
    checklist: { heading: "Check the first-job resume and upload", items: ["Activities are distinguished from paid employment.", "Education status and expected completion dates are accurate.", "Each skill connects to an entry or demonstrable task.", "The employer accepts the file type and paper size you will submit.", "Any fields filled from the upload have been reviewed and corrected."] },
    relatedSlugs: ["us-resume-format", "high-school-student-resume", "cv-pdf-download-checklist"],
    image: { kind: "template", id: "clarity", alt: "Clarity resume template with a plain single-column layout and standard headings", caption: "Clarity template, fictional example content; Folio CV output is A4." },
    tool: { href: "/cv-with-no-experience/", label: "Start a first-job resume", text: "Create a plain education-first CV and check whether its A4 PDF format fits the employer's request." },
    sections: [
      { id: "worked-example", heading: "Worked example: build a first-job resume around two activities", paragraphs: [
        "Suppose an applicant has a school technology project and regular volunteer work at a community event. The vacancy involves answering questions and keeping simple records. The volunteer activity may deserve more space than the technical project, even though the project took longer. Relevance determines the emphasis.",
        "Use the outline below as a selection guide, not a promise that every employer wants the same sections. Add genuine paid work if you have it. If an application form asks separately about employment, answer that question accurately rather than treating every resume activity as a job.",
      ], example: "Education: school or college, qualification, current or expected completion.\n\nVolunteer experience: welcomed event visitors and updated a registration list.\n\nProject: built two pages for a demonstration website and documented the setup.\n\nSkills: record keeping, visitor communication, and the specific website tools used.", exampleLabel: "Fictional US first-job resume outline" },
      { id: "confirm-requirements", heading: "Check the requested format and application questions", paragraphs: [
        "Read the document instructions alongside the job description. A resume upload may sit beside questions about availability, qualifications, and work history. Answer each part rather than assuming the attachment replaces the form. Use consistent dates and descriptions across the application.",
        "The existing [US resume guide](/tips/us-resume-format/) covers broader local conventions. For your first draft, try a focused page with clear headings, then adjust to the employer's request and the amount of relevant evidence. A short page is not a reason to invent a job or an achievement.",
      ] },
      { id: "arrange-evidence", heading: "Keep evidence prominent and work history visible", sourceUrls: [sources.resumeFormat.url], paragraphs: [
        "If education and a project best support the role, place them before unrelated activities. If a volunteer responsibility is the closest match, make it prominent and label it clearly. A short objective can name the role you want without claiming a career history you do not have.",
        "CareerOneStop distinguishes a skills-only format from a combination format that keeps work history visible. For a first job, adapt that principle by labelling education, projects, and activities clearly and including dates where relevant. Our suggested structure keeps the context visible rather than presenting every activity as employment.",
      ], example: "School technology club | Website project | 2026\n\nBuilt two pages for a demonstration event website using HTML and CSS. Checked the layout on small screens and wrote setup notes for the next club member. This was an extracurricular practice project, not client work.", exampleLabel: "Fictional first-job project entry" },
      { id: "describe-level", heading: "Describe skills through the tasks you can perform", paragraphs: [
        "Name software and practical abilities where they matter to the role. Explain the level through an example: prepared a spreadsheet schedule is clearer than advanced office skills when you cannot support the latter. Mention training accurately, including whether it is completed or ongoing.",
        "Use the [first-job skills guide](/tips/skills-for-a-first-job-resume/) to find evidence from classes, clubs, and volunteering. Select the relevant points, not every possible item. Keep a genuine interest separate from a skill you have already practised.",
      ] },
      { id: "handle-file-format", heading: "Plan for the file format before downloading", sourceUrls: [sources.resumeFormat.url], paragraphs: [
        "Folio exports CVs as A4 PDF. Editable Word export is available in a clean single-column layout; US Letter CV output is not offered. If the employer requires a particular size or DOCX, prepare the requested format instead of assuming a PDF satisfies it. A4 can be viewed on screen, but that does not override an explicit instruction.",
        "CareerOneStop suggests PDF when no other format is specified and a filename that identifies you. That is a default, not permission to ignore a DOCX request. When PDF is accepted, open the downloaded file, check links and page breaks, and use the [PDF checking guide](/tips/cv-pdf-download-checklist/) to inspect it before submitting.",
      ] },
      { id: "save-and-tailor", heading: "Save one clear version for each application", paragraphs: [
        "Keep the advert, the resume you sent, and your application answers together. Before the next application, update the emphasis using the new job's requirements. Change which examples are prominent rather than adding a string of keywords with no evidence.",
        "The [no-experience resume builder](/cv-with-no-experience/) provides a blank starting structure, and the [keyword checker](/resume-keyword-checker/) can help compare wording. Save an editable draft as well as the submitted PDF so a small correction later does not require rebuilding the whole document.",
      ] },
    ],
    faqs: [
      { question: "Can volunteering go on a first US resume?", answer: "Yes. Label the setting accurately and describe the responsibilities that relate to the job. Do not present unpaid activity as paid employment." },
      { question: "Does Folio download US Letter resumes?", answer: "No. CV downloads are A4 PDF. Check the employer's file and paper-size instructions before using that output." },
      { question: "Should volunteer activity be entered as paid employment in a form?", answer: "No. Follow the form's wording and label the activity accurately. The resume can still include relevant volunteering under an appropriate heading." },
    ],
    sources: [sources.resumeFormat],
    takeaway: "Use relevant education and activities as evidence, keep their context accurate, and follow the application's file-format requirements.",
  },
  {
    slug: "canadian-newcomer-resume", title: "A Canadian resume for newcomers: explain your overseas experience", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED,
    seoTitle: "Canadian Resume for Newcomers: Overseas Experience Guide",
    description: "Make overseas experience clear in a Canadian resume with accurate job titles, employer context, qualifications, and skills. Includes fictional wording examples.",
    category: "Applying by country",
    intro: "An overseas employer or internal job title may be unfamiliar to a Canadian reader. Add enough context to explain your work while preserving the original facts. The examples below show how to clarify a title, describe an employer, and separate experience from credential recognition.",
    quickAnswer: "Keep relevant overseas experience and explain unfamiliar employers, titles, and terminology. Describe your own contribution using the vacancy's language where it accurately fits. State credential assessments or professional registration only as documented, and follow the particular employer's format instructions.",
    checklist: { heading: "Check the context around overseas experience", items: ["Employer names and official job titles remain accurate.", "An unfamiliar organisation has a short, useful description.", "Acronyms and internal system names are explained where needed.", "Credential assessment or registration status matches your documents.", "Your format follows this employer's instructions, not a universal length rule."] },
    relatedSlugs: ["canadian-resume-format", "tailor-resume-to-job-description", "career-change-resume-summary"],
    image: { kind: "template", id: "professional", alt: "Professional resume template with a clear profile, work history, and education", caption: "Professional template with fictional demonstration content." },
    tool: { href: "/editor/", label: "Create your resume", text: "Write clear experience entries and preview an A4 PDF; check any employer-specific format request." },
    sections: [
      { id: "worked-example", heading: "Worked example: explain a title without upgrading it", paragraphs: [
        "Imagine a candidate whose official title was Operations Executive at a regional distributor. The word executive may mean different things to different readers. Keep the title and explain the actual duties rather than replacing it with Operations Director. The description should establish the level of responsibility.",
        "Use a short employer description when the organisation is unlikely to be known. Explain what an internal report contained instead of assuming its acronym is meaningful elsewhere. This makes the experience easier to assess while preserving facts that can be checked in an interview or reference.",
      ], example: "Before: Operations Executive — managed all operations and MIS.\n\nAfter: Operations Executive, Example Distribution Ltd, 2022–2025. Regional distributor serving independent retailers. Maintained delivery records, coordinated order updates with warehouse colleagues, and prepared a weekly spreadsheet of unresolved queries for the operations manager.", exampleLabel: "Fictional overseas role clarified for an unfamiliar reader" },
      { id: "explain-the-employer", heading: "Give unfamiliar employers a short description", paragraphs: [
        "Keep the organisation's real name, then add a brief description if it helps the reader understand the setting. Regional distributor, university laboratory, and customer support centre each provide context without needing a long company history. Keep confidential commercial information out of the explanation.",
        "Use an accurate job title and explain the work in the description. If a literal title would be unfamiliar, add a plain-language clarification rather than replacing it with a more senior Canadian title. The aim is understanding, not upgrading the role.",
      ], example: "Operations Assistant | Example Distribution Ltd | 2022–2025\n\nRegional distributor serving independent retailers. Maintained order records, coordinated delivery updates with warehouse colleagues, and prepared a weekly spreadsheet of unresolved queries.", exampleLabel: "Fictional overseas experience entry" },
      { id: "connect-to-vacancy", heading: "Choose evidence that connects to the Canadian vacancy", sourceUrls: [sources.canadaEmployers.url], paragraphs: [
        "Job Bank's guidance for employers encourages recognising international experience and asking for concrete examples of relevant skills. For your resume, our practical application is to make that evidence easy to interpret: explain the setting, your contribution, and any unfamiliar terminology without changing the facts or implying that overseas work is less valuable.",
        "The [resume keyword checker](/resume-keyword-checker/) can show differences in wording, but it does not assess whether two roles or qualifications are equivalent. Keep the details truthful and describe the actual tasks. A relevant overseas example remains relevant without a Canadian employer name attached to it.",
      ] },
      { id: "qualifications-and-language", heading: "Check recognition before describing local equivalence", sourceUrls: [sources.canadaNewcomers.url], paragraphs: [
        "Job Bank's newcomer guidance recommends checking whether the occupation is regulated and whether credentials are recognised. Its recognition tool points to the relevant authority. Use the actual outcome of any assessment or registration in your resume; a translation of a qualification name does not establish a Canadian equivalence or permission to practise.",
        "Describe language skills in terms you can support, such as the kinds of conversations or documents you can handle. Keep course attendance, test results, and workplace use distinct. Use the Languages section to make this information easy to find without repeating it throughout the CV.",
      ] },
      { id: "local-details", heading: "Treat general format advice and employer instructions separately", sourceUrls: [sources.canadaResume.url, sources.toronto.url], paragraphs: [
        "Canada's Job Bank advises a concise, tailored resume and generally limits it to two pages. Its guidance also says photos and a Social Insurance Number do not belong on a resume, and that references should be provided separately when requested. Follow any specific application instructions alongside that general advice.",
        "Length advice can differ: the City of Toronto's own hiring guidance asks for two to three pages, while Job Bank's general guide says two. Follow the particular employer's instructions. Read the [Canadian format guide](/tips/canadian-resume-format/) for context, and keep sensitive identity or qualification documents out of a widely shared resume.",
      ] },
      { id: "use-the-builder", heading: "Build a readable document and check its limits", paragraphs: [
        "Choose a plain layout such as Professional or Clarity, put the most relevant evidence first, and keep dates consistent. Add local volunteering, courses, or projects if you have them and they help the application; do not invent activities to make the resume look local.",
        "Folio's free editor creates A4 PDF CVs. If an employer requests Letter size, Word, or a particular form, follow that requirement. Save an editable draft, check the downloaded file, and keep the version submitted with the vacancy so you can refer to it at interview.",
      ] },
    ],
    faqs: [
      { question: "Should I remove all overseas work from a Canadian resume?", answer: "No. Explain relevant experience with clear employer context, accurate titles, and specific contributions. Overseas work can still show the skills requested in the vacancy." },
      { question: "Can the keyword checker confirm a qualification's equivalence?", answer: "No. It compares text. Describe any qualification assessment or registration using the actual status provided by the relevant organisation." },
      { question: "Should I replace an unfamiliar job title with a Canadian one?", answer: "Keep the accurate title and add a plain-language clarification if needed. Do not choose a more senior title or imply a different level of responsibility." },
    ],
    sources: [sources.canadaResume, sources.canadaNewcomers, sources.canadaEmployers, sources.toronto],
    takeaway: "Keep overseas experience visible, add context for unfamiliar details, and describe qualifications and local status without assumptions.",
  },
  {
    slug: "australian-student-resume", title: "An Australian student resume for casual and first jobs", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED,
    seoTitle: "Australian Student Resume: Casual and First-Job Guide",
    description: "Write an Australian student resume with clear availability, relevant study, activities, and service experience. Includes fictional examples and a free A4 CV tool.",
    category: "Applying by country",
    intro: "For casual and first-job applications, a clear statement of what you can do and when you can work is more useful than a crowded page of generic strengths. Build the resume around your actual activities, study commitments, and the advertised duties. The example below shows how to make that information specific.",
    quickAnswer: "Include relevant education, paid or unpaid experience, practical skills, and genuine availability where it helps with the advertised shifts. Distinguish study periods from breaks when necessary. Keep training and eligibility information accurate and check any current requirements through the appropriate official source.",
    checklist: { heading: "Check your student or casual-job application", items: ["Available days and hours fit your actual timetable.", "Activities explain your responsibility and level of involvement.", "Required training is listed only with accurate completion status.", "Any eligibility question is answered using your own current information.", "Referees have agreed before their details are provided through the requested process."] },
    relatedSlugs: ["australian-resume-format", "part-time-job-cv", "cover-letter-with-no-experience"],
    image: { kind: "template", id: "regent", alt: "Regent resume template with a clear single-column layout and contact details", caption: "Regent template with fictional demonstration content." },
    tool: { href: "/cv-maker-for-students/", label: "Create a student resume", text: "Use an education-first layout and download an A4 PDF without signup or payment." },
    sections: [
      { id: "worked-example", heading: "Worked example: make availability and service evidence specific", paragraphs: [
        "Suppose a student wants a casual role with evening and weekend shifts. Their draft says fully flexible, but classes prevent them working two evenings. Replace that claim with the availability they can maintain. Then choose a real activity that shows relevant communication or practical work.",
        "The example separates the timetable from the evidence so an employer can understand both. Update the availability when the semester changes. If the advert requires training you have not completed, do not copy a certificate from a sample resume; explain your actual preparation in the requested application channel.",
      ], example: "Before: Fully flexible student with excellent customer service skills.\n\nAfter: Available Tuesday and Thursday evenings and Saturdays during semester, with additional weekday availability during university breaks. As a community event volunteer, checked participant names against the list and directed visitors to activities.", exampleLabel: "Fictional student application details; replace with your own timetable and experience" },
      { id: "choose-relevant-work", heading: "Begin with the work the vacancy actually involves", paragraphs: [
        "Read the advert for duties, location, hours, required training, and application instructions. A casual hospitality role and an office internship ask for different evidence, even if both welcome students. Choose your examples for the work rather than using one unchanged resume for every vacancy.",
        "If you have only a small amount of experience, use a focused document with clear headings. The broader [Australian resume guide](/tips/australian-resume-format/) covers local conventions. Here, the aim is to make a first application understandable without padding it with unrelated subjects or interests.",
      ] },
      { id: "explain-availability", heading: "State genuine availability where it helps", sourceUrls: [sources.australia.url], paragraphs: [
        "Study Australia suggests including available days and hours for part-time applications. Make the note specific to your timetable and distinguish study periods from breaks if they differ. This is a practical detail for planning shifts, not a reason to promise hours you cannot work.",
        "If the employer separately asks about work eligibility, answer accurately through its application process. Do not copy another student's visa wording or rely on a generic blog for current conditions. Check the official information relevant to your own situation when that question arises.",
      ], example: "Available Tuesday and Thursday evenings and Saturdays during semester, with additional weekday availability during university breaks.\n\nUse only the days and hours that are accurate for your own timetable.", exampleLabel: "Fictional availability wording" },
      { id: "describe-evidence", heading: "Use activities to show reliability and practical skills", sourceUrls: [sources.australia.url, sources.firstJob.url], paragraphs: [
        "A student society role, community activity, or project can show organisation, communication, and follow-through. Explain what you did regularly, which information or tools you handled, and how you worked with other people. Keep each activity's setting clear.",
        "Study Australia includes academic projects, internships, and student clubs as options when paid work is limited. Youth Central also suggests using community activities and school projects. Select your own contribution from those settings, then use [skills for a first-job resume](/tips/skills-for-a-first-job-resume/) to connect it to the advertised work.",
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
      { question: "What if my availability changes during exams?", answer: "Keep the information current and state any known change through the employer's requested process. Do not leave an unrestricted availability claim in a document that no longer reflects your timetable." },
    ],
    sources: [sources.australia, sources.firstJob],
    takeaway: "Match the vacancy with real activities and skills, keep availability and training accurate, and review the complete application before sending.",
  },
];
