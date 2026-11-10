import type { Guide } from "./guide-types";
import { BLOG_SOURCES_CHECKED, guideSources as sources } from "./guide-sources";

export const careerBlogGuides: Guide[] = [
  {
    slug: "high-school-student-resume", title: "A first resume for high school students: what to include", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.schoolResume, sources.skills],
    seoTitle: "High School Student Resume With No Experience: Free Guide",
    description: "Build a high school student resume using education, activities, volunteering, and practical skills. Includes a fictional entry and free template guidance.",
    category: "Students & first applications",
    intro: "An empty work-history section is a layout problem, not proof that you have nothing to write. Build your first school resume around education and a few responsibilities you can explain. This guide shows a realistic section order and how to turn one activity into an entry.",
    quickAnswer: "Start with contact details, current education, relevant activities or projects, and practical skills. Include paid work only if you have it; clearly label volunteering and school responsibilities. Aim for a focused document and follow the employer's requested format. You do not need to invent a job to complete a template.",
    checklist: { heading: "Review your first school resume", items: ["Your school and expected completion date are accurate.", "Activities have understandable names, dates, and your own contribution.", "Each selected skill has an example behind it.", "A trusted reader has checked the wording and contact details.", "Unused sections and fictional sample details are removed."] },
    relatedSlugs: ["skills-for-a-first-job-resume", "cover-letter-with-no-experience", "us-first-job-resume"],
    image: { kind: "template", id: "student", alt: "Student CV template with distinct education and activity sections", caption: "Student template with fictional demonstration details." },
    tool: { href: "/cv-maker-for-students/", label: "Start a student resume", text: "Begin with education first, add your activities, and preview a free A4 PDF." },
    sections: [
      { id: "worked-example", heading: "Worked example: organise a resume without a paid job", paragraphs: [
        "Imagine a school leaver applying for weekend shop work. Their evidence is a library activity, a group presentation, and basic spreadsheet use. The section order below keeps that evidence visible instead of leading with an empty Employment heading. Adapt qualification terminology to your own country and school.",
        "Choose one or two activities you can describe clearly. A useful entry names the setting, dates, and responsibility. Do not add every hobby to fill space. If a genuine activity provides no connection to this vacancy, keep it in your working notes for a different application.",
      ], example: "Contact: name, email, phone, town or city.\n\nEducation: current school, qualification, expected completion.\n\nActivities: library volunteer, weekly sessions; prepared displays and recorded returned books.\n\nProject: group presentation; prepared two slides and checked references.\n\nSkills: spreadsheet records, clear visitor directions, and any relevant languages.", exampleLabel: "Fictional first-resume outline, not a finished document to copy" },
      { id: "choose-your-evidence", heading: "Use evidence from school, placements, and activities", sourceUrls: [sources.schoolResume.url], paragraphs: [
        "Victoria's Youth Central publishes a school-leaver resume specifically for applicants without paid work. It includes volunteer activity and placements, illustrating that no paid experience does not mean no experience. Use that principle while adapting qualification names and conventions to your own country; the example is not a universal school-resume format.",
        "If you have no paid employment, do not fill the space with a sentence saying so. Use headings such as Projects, Activities, or Volunteering to describe what you do have. Keep the setting clear so a school assignment is not mistaken for paid work.",
      ] },
      { id: "write-an-introduction", heading: "Write a short introduction for the particular job", paragraphs: [
        "Name your current situation and the type of opportunity you want. Add one useful piece of evidence, such as helping visitors at a school event or maintaining a club's shared records. Avoid a long explanation of your future ambitions if it does not connect to the vacancy.",
        "The [student summary examples](/tips/resume-summary-examples-for-students/) show several ways to begin. If a specific schedule matters, state your genuine availability in the application or a short relevant line. Do not promise hours that conflict with commitments you already know about.",
      ] },
      { id: "describe-an-activity", heading: "Give each activity a clear role and description", paragraphs: [
        "Use an understandable title, the group or setting, and dates. Add one or two lines about your contribution. Describe the task you completed rather than simply naming a quality such as leadership. A reader should understand what the activity involved without knowing your school.",
        "Keep numbers and outcomes modest and accurate. If you helped with an event, explain your part rather than taking credit for the whole event's success. Use a [resume bullet point structure](/tips/resume-action-verbs-and-bullet-points/) to make the description direct.",
      ], example: "Library club volunteer | School library | September–November 2026\n\nPrepared book displays for weekly reading sessions and recorded returned books in the club spreadsheet. Helped younger students find the reading list for each session.", exampleLabel: "Fictional school activity entry" },
      { id: "choose-skills", heading: "Include practical skills you can demonstrate", sourceUrls: [sources.skills.url], paragraphs: [
        "The National Careers Service recommends reflecting on skills from education and daily life, then checking what a job needs. Ask a teacher or someone who knows your activities to help identify an example you overlooked. Describe what you can do with a tool or language, keeping ongoing learning separate from confident independent use.",
        "Read [skills for a first-job resume](/tips/skills-for-a-first-job-resume/) for a method of turning activities into evidence. Keep private identity details and other people's contact information out of a general resume; provide information through the employer's requested process when appropriate.",
      ] },
      { id: "review-first-resume", heading: "Check the finished document with someone you trust", paragraphs: [
        "Aim for a focused page when your content is short, with readable text and clear headings. Ask a teacher, careers adviser, or trusted adult to check the wording and whether the contact details work. Follow the employer's instructions about documents and the application process.",
        "The [student CV maker](/cv-maker-for-students/) starts with education and lets you hide unused sections. Its CV download is A4 PDF, so check any specific paper-size or file-format request. Save an editable draft before closing the tab and keep the submitted PDF for your records.",
      ] },
    ],
    faqs: [
      { question: "Do I need a job to create my first resume?", answer: "No. Relevant schoolwork, projects, volunteering, activities, and responsibilities can provide evidence of how you work." },
      { question: "Should I list every subject and hobby?", answer: "Choose details that explain your background or relate to the opportunity. A short, useful selection is easier to read than an unfiltered list." },
    ],
    takeaway: "Use school and activities as evidence, keep your contribution clear, and review a saved copy before submitting the application.",
  },
  {
    slug: "fresh-graduate-cv-checklist", title: "A fresh graduate CV checklist: turn your degree into evidence", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.harvardTemplate, sources.lseCV],
    seoTitle: "Fresh Graduate CV Format and Application Checklist",
    description: "Organise a fresh graduate CV around your degree, dissertation, placements, projects, and practical skills. Includes a fictional project entry and review checklist.",
    category: "Students & first applications",
    intro: "Two graduates with the same degree can bring very different experience. Use your CV to show the project, placement, or responsibility that makes you relevant to this vacancy. The selection exercise below helps you choose what deserves space and what can stay in your working notes.",
    quickAnswer: "Put the strongest relevant evidence first: usually education and projects for a new graduate, or a directly relevant placement when you have one. Select modules, explain your own project contribution, and keep completion status accurate. Use part-time work where it adds evidence rather than treating a different job title as irrelevant.",
    checklist: { heading: "Check your graduate evidence", items: ["The final or predicted qualification result is clearly labelled.", "Selected coursework relates to the advertised work.", "A group project distinguishes your contribution from the team's outcome.", "A placement is described with accurate dates and responsibility.", "Every portfolio link opens without an access request."] },
    relatedSlugs: ["resume-summary-examples-for-students", "data-analyst-resume-projects", "tailor-resume-to-job-description"],
    image: { kind: "example", id: "student", alt: "Graduate-style CV example with education, a university project, and part-time work", caption: "Fictional student example that can be adapted for a graduate application." },
    tool: { href: "/cv-maker-for-students/", label: "Create a graduate CV", text: "Use an education-first structure and arrange projects, placements, and skills around your target role." },
    sections: [
      { id: "worked-example", heading: "Worked example: choose evidence for a reporting vacancy", paragraphs: [
        "Imagine a graduate has a dissertation involving survey data, a shop job, and a society role. The vacancy asks for accurate reporting and clear written explanations. The dissertation and the shop's record checks may be more useful than a full module list. Give them space in their actual settings.",
        "This is a selection exercise, not permission to rewrite unrelated work as an analyst job. Keep the official job title, explain the relevant task, and use Education or Projects for academic analysis. The result should show the connection without blurring the origin of the experience.",
      ], table: { caption: "Fictional graduate evidence selection", head: ["Evidence available", "Useful detail to include", "Detail to shorten"], rows: [["Survey dissertation", "Cleaning responses and explaining sampling limits", "A long list of every report chapter"], ["Part-time shop work", "Checking weekly stock records", "Routine duties unrelated to the vacancy"], ["Student society role", "Preparing a short attendance report", "The society's full history"]] } },
      { id: "identify-the-role", heading: "Choose the role before listing your modules", paragraphs: [
        "Read the vacancy and identify the work the graduate will be expected to do. Build your first draft around a small set of relevant requirements, not everything you studied. Keep a fuller record separately so tailoring one application does not mean losing useful details for another.",
        "Write a short profile that names your field and a relevant example. Avoid broad promises about being a future leader when a concrete project would be clearer. The [student summary guide](/tips/resume-summary-examples-for-students/) offers structures you can adapt with graduate-level evidence.",
      ] },
      { id: "education-detail", heading: "Select academic details instead of reproducing a transcript", sourceUrls: [sources.harvardTemplate.url], paragraphs: [
        "Include the qualification, institution, and completion date. State a final grade or classification only when it is confirmed and useful; clearly label a predicted result or unfinished course. Select relevant modules rather than turning the section into a transcript.",
        "Harvard's resume template marks GPA, thesis, and relevant coursework as optional. Use that as a selection prompt: include an item when it helps explain your fit or the employer asks for it. A relevant dissertation can have its own Projects entry; there is no universal requirement to list every mark or module.",
      ] },
      { id: "show-project-work", heading: "Explain what you did in a project", paragraphs: [
        "Describe the project setting, your contribution, the method or tools, and what you produced. Distinguish an individual dissertation from a group assignment. A completed report or tested prototype can be a clear result even when there was no commercial customer or financial outcome.",
        "Use only figures you can support. Do not turn a classroom exercise into client work or imply that a university grade proves workplace performance. Read [how to describe projects](/tips/projects-on-a-cv/) for a fuller method of choosing the details.",
      ], example: "Final-year project: Campus transport survey\n\nDesigned a student travel questionnaire, cleaned the anonymous responses in Excel, and compared travel times by transport type. Presented the findings in a written report with charts and a discussion of sampling limits.", exampleLabel: "Fictional graduate project entry" },
      { id: "use-other-work", heading: "Keep useful evidence from part-time and volunteer roles", sourceUrls: [sources.lseCV.url], paragraphs: [
        "LSE highlights part-time work and extracurricular responsibilities as potentially useful graduate evidence. Select examples that explain your own contribution and how a skill transfers to the vacancy. Do not remove a role solely because its title differs from the graduate job, or give every past role the same amount of space.",
        "Balance the space according to relevance. A directly related placement may deserve more detail than an older casual role, while an unrelated role can stay as a short entry. Keep dates consistent and state whether a placement was a short assignment rather than implying a longer period.",
      ] },
      { id: "final-graduate-review", heading: "Review the whole application as a set", paragraphs: [
        "Check that skills named in the profile have evidence below, project links open, and qualification dates match the application form. Read the job's requested format and any supporting questions. A tailored CV does not replace required answers or a requested cover letter.",
        "Use the [student and graduate CV maker](/cv-maker-for-students/) for the document and the [cover letter maker](/cover-letter-maker/) if a letter is required. Save both the editable draft and the exact PDF you submit so interview preparation is based on the version the employer saw.",
      ], bullets: ["Current contact details and working links.", "Accurate completion status and dates.", "Clear individual contribution to group work.", "Relevant skills supported by specific examples."] },
    ],
    faqs: [
      { question: "Should education come before work on a graduate CV?", answer: "It often helps when your degree and projects are the strongest evidence. Put a directly relevant placement or substantial work first if that makes the fit clearer." },
      { question: "Do I need to list every university module?", answer: "No. Select relevant modules and give useful projects enough explanation. Keep the full academic record for applications that request it." },
    ],
    takeaway: "Make the degree specific, show what you produced, and connect projects and other responsibilities to the work in the vacancy.",
  },
  {
    slug: "software-engineer-resume-projects", title: "How to describe projects on a software engineer resume", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.softwareRole, sources.mitResume],
    seoTitle: "Software Engineer Resume Projects: Examples and Free Template",
    description: "Write software project entries that explain your contribution, technical choices, testing, and limits. Includes fictional examples and a free editable CV.",
    category: "CVs by profession",
    intro: "React, Node.js, and PostgreSQL tell a reader which tools you named, not what you built. A useful software project entry explains the problem, your implementation, and a check or trade-off you can discuss. Use the worked revision below to move beyond a stack list.",
    quickAnswer: "Describe a project's purpose, your own contribution, the relevant tools, and a testing or design decision. Label it as personal, academic, volunteer, or professional work. Link to inspectable material when appropriate, and distinguish a demonstration app from a production service or commercial result.",
    checklist: { heading: "Review a software project before listing it", items: ["The problem and intended user are understandable.", "Your contribution is distinct from teammates' or tutorial code.", "At least one technical choice or check is explained.", "Repository and demo links work without private access.", "No private code, credentials, or user records are exposed."] },
    relatedSlugs: ["resume-action-verbs-and-bullet-points", "projects-on-a-cv", "tailor-resume-to-job-description"],
    image: { kind: "example", id: "software-developer", alt: "Software developer CV example with technical skills and development experience", caption: "Software developer CV example with fictional people and projects." },
    tool: { href: "/cv-examples/software-developer/", label: "Edit a software developer CV", text: "Use a complete fictional example for structure, then replace its content with your own experience." },
    sections: [
      { id: "worked-example", heading: "Worked example: turn a stack list into a project entry", paragraphs: [
        "Suppose your notes say only React, Node.js, PostgreSQL. Ask what the app did, which part you owned, and what you checked. In this fictional project, the applicant built a booking interface, wrote date-validation tests, and documented setup. Those details create a technical conversation without needing a made-up user count.",
        "Choose one detail that matters to the role. For a frontend vacancy, explain the interaction or accessibility work you performed. For a backend vacancy, a data model or API-validation decision may be more relevant. Keep the fuller explanation in the repository so the CV remains readable.",
      ], example: "Before: Full-stack booking application. React, Node.js, PostgreSQL.\n\nAfter: Built a personal appointment-booking demo with a React form and Node.js API. Added checks for invalid date ranges and tests for overlapping bookings, then documented how to run the app locally. Uses fictional data and has not been deployed for real customers.", exampleLabel: "Fictional software project: before and after" },
      { id: "select-projects", heading: "Choose evidence for the development work in the vacancy", sourceUrls: [sources.softwareRole.url], paragraphs: [
        "The National Careers Service describes development work as more than coding: it includes discussing requirements, testing, recording changes, and maintaining systems. Compare those activities with the particular vacancy. Our suggestion is to choose projects that show relevant parts of that work, rather than treating a long technology list as the whole application.",
        "Avoid including several projects that demonstrate exactly the same thing unless their differences matter. One well-explained form, a tested API, and a deployment exercise can show different kinds of work. Use the project selection to complement, rather than repeat, your employment history.",
      ] },
      { id: "describe-purpose-and-role", heading: "Explain the purpose and your own contribution", sourceUrls: [sources.mitResume.url], paragraphs: [
        "Give the project a short descriptive name and identify it as personal, academic, volunteer, or professional work. Explain who it was for and what you implemented. If a team built it, distinguish your contribution from the overall application.",
        "MIT recommends explaining how work was performed, including a programming language where relevant, and supports including class or personal projects. Put the technology in the task: built a booking form in React and validated submitted dates. Keep the project setting and official job titles accurate; the examples here are Folio's fictional illustrations.",
      ], example: "Personal project: Appointment booking demo\n\nBuilt a React interface with date validation and an Express API backed by PostgreSQL. Wrote tests for overlapping appointments and documented the local setup. The project uses fictional bookings and has not been used in production.", exampleLabel: "Fictional junior developer project" },
      { id: "show-engineering-decisions", heading: "Include a decision, check, or constraint", paragraphs: [
        "Choose a detail that shows how you approached the work: handling invalid input, testing an edge case, documenting an API, reviewing accessibility, or adapting a layout to small screens. Do not imply that one check proves the entire application is secure, accessible, or production-ready.",
        "State measured results only when you know how they were measured. If performance improved in a local test, explain the conditions rather than presenting the figure as a real-user outcome. An honest limit can make a project easier to discuss, because it shows you understand what it does and does not demonstrate.",
      ] },
      { id: "use-links-carefully", heading: "Link to work a reviewer can actually inspect", paragraphs: [
        "Open the repository and demo links in a signed-out browser. Check the README, setup instructions, and whether screenshots or a short description would help. Use a stable link to the work you discuss, not a page that requires the reviewer to request access.",
        "Respect confidentiality and ownership. Do not publish private code, employer information, credentials, or user records to provide evidence. You can describe a contribution without linking to proprietary work. For tutorial-based projects, explain what you implemented or extended rather than claiming the entire design as original.",
      ] },
      { id: "arrange-the-cv", heading: "Fit the projects into a readable CV", paragraphs: [
        "For an early-career application, place strong projects near education or before unrelated jobs. For an experienced engineer, relevant employment may carry more weight. Keep a concise skills section, then use project and work entries to show those skills in use.",
        "Start from the [software developer CV example](/cv-examples/software-developer/) or [frontend developer example](/cv-examples/frontend-developer/). Use the [bullet builder](/resume-bullet-point-generator/) to structure a contribution, then check the layout in a plain [ATS-friendly template](/templates/category/ats-friendly/).",
      ] },
    ],
    faqs: [
      { question: "Can I include personal projects without professional experience?", answer: "Yes. Label them clearly, explain what you built, and state any important limits. Do not present a demonstration project as paid client work." },
      { question: "Should every project include a performance number?", answer: "No. Use a number only when you can explain its measurement. A specific implementation or testing contribution can be useful on its own." },
    ],
    takeaway: "Explain the purpose, your own implementation, and one useful technical decision; keep the project's setting and limits clear.",
  },
  {
    slug: "teacher-cv-personal-statement", title: "How to write a teacher CV personal statement", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.teacherRole, sources.supportingStatement],
    seoTitle: "Teacher CV Personal Statement: Examples and Free Template",
    description: "Write a focused teacher CV profile using your subject, teaching context, and classroom evidence. Includes fictional early-career and experienced examples.",
    category: "CVs by profession",
    intro: "Passionate about teaching gives a school little evidence of your classroom work. A short teacher CV profile can do more by naming your teaching context and one specific practice. Use it to introduce the application, then answer any requested supporting statement separately.",
    quickAnswer: "Name your actual subject or age range, your accurate experience or training status, and one classroom practice relevant to the vacancy. Keep the profile short and evidence-based. A CV profile does not replace a school's criteria-based supporting statement or a teacher-training admissions statement.",
    checklist: { heading: "Review your teaching introduction", items: ["Subject, age range, and qualification status are accurate.", "The named practice appears in an experience or placement entry.", "Supervised placement work is labelled clearly.", "No pupil can be identified from the example.", "Any requested supporting statement addresses the school's actual criteria."] },
    relatedSlugs: ["career-change-resume-summary", "resume-action-verbs-and-bullet-points", "how-to-write-a-cover-letter"],
    image: { kind: "example", id: "teacher", alt: "Teacher CV example with a short profile, teaching history, and qualifications", caption: "Fictional teacher CV in the Classic template." },
    tool: { href: "/cv-examples/teacher/", label: "Edit the teacher CV example", text: "Use the example's structure and replace all teaching details, qualifications, and achievements with your own." },
    sections: [
      { id: "worked-example", heading: "Worked example: replace enthusiasm with classroom evidence", paragraphs: [
        "Suppose a trainee wants to highlight adapting explanations. A useful profile can mention supervised lessons, the checks used to spot a misunderstanding, and how the next task changed. It should not imply independent responsibility for a whole year group's progress.",
        "Choose a practice you can explain in more detail if asked. Keep the pupil group broad and avoid identifying an individual learner. If the vacancy is for a different phase or subject, change the focus using your actual experience rather than borrowing terminology from the sample.",
      ], example: "Before: Passionate and inspirational teacher dedicated to helping every child achieve outstanding results.\n\nAfter: Teacher-training student preparing for a first secondary science role. During supervised placement lessons, used short response questions to identify misunderstood topics and revised the next lesson's examples with a mentor.", exampleLabel: "Fictional trainee CV profile: before and after" },
      { id: "identify-your-context", heading: "Name your teaching context accurately", paragraphs: [
        "Identify the age range, subject, or setting you have actually taught. State a qualification or professional status only if you hold it, and use the terminology appropriate to the vacancy. Requirements vary by employer and location, so check the school's instructions rather than relying on a general CV example.",
        "If you are still training, say so. A completed placement can provide valuable evidence without being described as several years of independent teaching. Keep full qualification names and dates in Education or Certifications rather than crowding the opening paragraph.",
      ] },
      { id: "choose-classroom-evidence", heading: "Choose a classroom contribution that matters to the role", sourceUrls: [sources.teacherRole.url], paragraphs: [
        "The National Careers Service's primary teaching profile includes lesson planning, preparing materials, marking work, and discussing progress. Use the vacancy's actual age range and subject to choose your evidence; a primary role profile does not define every teaching job. Describe a practice you carried out and the responsibility you personally held.",
        "Avoid unsupported claims about pupil results. If you mention an outcome, be clear about the group, period, and your contribution. Do not include identifiable pupil information or confidential classroom records to make an example more persuasive.",
      ], example: "Primary teacher with experience planning literacy lessons across a mixed-attainment class. Uses short checks for understanding to adjust follow-up tasks and works with support colleagues to prepare accessible reading materials.", exampleLabel: "Fictional experienced teacher profile" },
      { id: "early-career-profile", heading: "Use placement evidence for an early-career profile", paragraphs: [
        "An early-career profile can connect your subject knowledge to a specific placement responsibility. Mention the work you planned or supported and the part you completed under supervision. There is no need to imitate a senior teacher's leadership profile.",
        "Keep descriptions consistent with your experience entries. If you supported a lesson rather than delivering the whole sequence independently, use that wording. Evidence of reflection, preparation, and collaboration can be useful without exaggerating the scale of responsibility.",
      ], example: "Teacher-training student preparing for a first secondary science role. Planned and delivered supervised lessons during placement, prepared practical instructions, and reviewed pupils' responses with a mentor to identify topics needing another explanation.", exampleLabel: "Fictional trainee profile; use only if it reflects your status" },
      { id: "tailor-without-copying", heading: "Connect to the school without copying its wording", paragraphs: [
        "Select one relevant priority from the advert and explain how your practice connects to it. Avoid reproducing the school's values as a string of adjectives. A particular example of adapting a task or contributing to a department is easier to understand.",
        "The [summary builder](/resume-summary-builder/) can give you a first structure, but it uses predefined patterns and cannot evaluate classroom practice. Read its output carefully and remove any sentence that overstates your role, qualifications, or impact.",
      ] },
      { id: "support-the-profile", heading: "Answer a supporting statement separately when requested", sourceUrls: [sources.supportingStatement.url], paragraphs: [
        "Manchester's job-application guidance says to address a person specification and provide examples in a requested supporting statement; an uploaded CV is not a replacement. Use the short CV profile to orient the reader, then answer the school's criteria in the required form and length. Teacher-training admissions statements are another distinct application task.",
        "Start from the [teacher CV example](/cv-examples/teacher/) and review the employer's format instructions before exporting. If a separate letter is needed, use the [cover letter guide](/tips/how-to-write-a-cover-letter/) to connect your evidence to the post without repeating every CV entry.",
      ] },
    ],
    faqs: [
      { question: "Is a CV personal statement the same as a school supporting statement?", answer: "No. The CV profile is a short introduction. A requested supporting statement may need a detailed response to the employer's criteria and word limit." },
      { question: "Can I include pupil progress figures?", answer: "Only use accurate, supportable figures that can be shared appropriately. Explain the context and your contribution without identifying pupils." },
    ],
    takeaway: "Name the teaching context, show a specific practice, and keep professional status and classroom impact accurate.",
  },
  {
    slug: "customer-service-resume-skills", title: "Customer service resume skills: show what happened", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.serviceRole, sources.harvardTemplate],
    seoTitle: "Customer Service Resume Skills and Bullet Point Examples",
    description: "Show customer service skills through real query handling, records, tools, and escalation examples. Includes fictional bullets and a free editable resume.",
    category: "CVs by profession",
    intro: "A customer service CV should show how you handled a query, recorded the next step, or passed a problem to the right person. A list of patience and communication cannot show that on its own. Use the examples below to describe your service work without disclosing customer details.",
    quickAnswer: "Show the channel, the type of customer request, the action you took, and any relevant tool or handover. Name only tools you used and authority you held. Use documented service measures where available; clear query-handling evidence is still useful without a personal satisfaction score.",
    checklist: { heading: "Check your customer service examples", items: ["The service channel and kind of query are clear.", "Your action and any escalation boundary are accurate.", "A named system is one you used hands-on.", "A measure is attributed to the right person or team and period.", "Customer identities and account information are excluded."] },
    relatedSlugs: ["skills-for-a-first-job-resume", "resume-action-verbs-and-bullet-points", "tailor-resume-to-job-description"],
    image: { kind: "example", id: "customer-service", alt: "Customer service CV example with support experience and relevant tools", caption: "Fictional customer service CV in the Modern template." },
    tool: { href: "/cv-examples/customer-service/", label: "Edit a customer service resume", text: "Use a complete example for layout and wording ideas, then replace every detail with your own." },
    sections: [
      { id: "worked-example", heading: "Worked example: describe an unresolved delivery query", paragraphs: [
        "You do not need to claim that you personally resolved every issue. Suppose you checked an order, explained the available update, and created a handover for the warehouse team. That can show accurate records and communication while keeping the limit of your responsibility clear.",
        "The line below adds channel, task, system use, and next step. Adapt only details you actually performed. If you handled the work in a volunteer setting or a shop rather than a contact centre, name that context in the entry instead of making it sound like a different job.",
      ], example: "Before: Delivered excellent customer service and solved all customer problems.\n\nAfter: Responded to delivery queries by email, checked order status in the store system, and recorded cases needing warehouse follow-up so the next shift could continue the update.", exampleLabel: "Fictional customer service contribution with a clear handover" },
      { id: "identify-service-setting", heading: "Describe the channel and the customer task", sourceUrls: [sources.serviceRole.url], paragraphs: [
        "The National Careers Service lists service tasks across phone, email, chat, and in-person channels, including explaining policies, handling feedback, and updating customer information. Select the channel and tasks you actually handled. This makes your evidence more precise than a general customer service label and helps show whether it fits the advertised role.",
        "If your experience came from volunteering or an activity rather than a paid job, keep that context visible. Welcoming visitors at a regular community event can show useful communication skills without being presented as call-centre employment.",
      ] },
      { id: "turn-skills-into-examples", heading: "Explain communication through a specific task", paragraphs: [
        "Instead of calling yourself an excellent communicator, describe what you explained and to whom. Perhaps you clarified a booking policy, answered product questions, or wrote a clear handover note. Choose an example relevant to the advertised role's channel and customer needs.",
        "Keep the description free of customer names, account information, and confidential complaint details. You can explain the type of issue and your response without disclosing the original record. Use a fictionalised practice example only as a writing exercise, not as a claim about your own history.",
      ], example: "Before: Great communication skills.\n\nAfter: Explained return options to customers at the service desk and recorded the agreed next step in the store system.\n\nBefore: Good at teamwork.\n\nAfter: Wrote handover notes for unresolved delivery queries so the next shift could continue the follow-up.", exampleLabel: "Fictional customer service bullet examples" },
      { id: "show-tools-and-boundaries", heading: "Name tools and escalation accurately", paragraphs: [
        "List ticketing, order, booking, payment, or CRM tools you have used, with a task that shows your level. Recording notes and updating a ticket are different from administering the entire system. Name the product only if you actually worked with it.",
        "Explain when you escalated an issue rather than suggesting you had authority you did not hold. A useful example can show that you gathered information, followed a procedure, and passed the issue to the right colleague. That is still a contribution to a clear customer experience.",
      ] },
      { id: "use-metrics-carefully", heading: "Use service measures only when you understand them", sourceUrls: [sources.harvardTemplate.url], paragraphs: [
        "If you know your approximate daily query volume or a documented service measure, it can help explain scale. Check the period and whether the figure belongs to you or the team. Do not borrow a team satisfaction result and present it as your individual rating.",
        "Harvard's template recommends quantifying where possible; it does not require a percentage in every bullet. If you lack a supportable measure, explain the type of query, record, or follow-up you handled. The [bullet point builder](/resume-bullet-point-generator/) lets you leave the result blank. Do not estimate a service rating just to complete a sentence pattern.",
      ] },
      { id: "tailor-and-review", heading: "Choose the skills that match this vacancy", paragraphs: [
        "Compare the advert with your evidence. A retail service role may emphasise face-to-face explanations and returns, while an email role may require written updates and ticket records. Use the [skills finder](/resume-skills/) for ideas, then keep only the items your experience supports.",
        "The [customer service CV example](/cv-examples/customer-service/) shows a complete document. Tailor its structure with your own facts and use the [keyword checker](/resume-keyword-checker/) to review wording. Finish by reading the whole CV for consistency and checking the downloaded file.",
      ] },
    ],
    faqs: [
      { question: "Can retail work support a customer service application?", answer: "Yes. Explain the service tasks you actually handled, such as product questions, returns, payments, or follow-up, and connect them to the vacancy." },
      { question: "Should I list a CRM I have only watched someone use?", answer: "Describe your exposure accurately. Do not present observation as hands-on use or system administration." },
    ],
    takeaway: "Show the service setting, your response, and your responsibility; use tool names and metrics only when they accurately reflect your work.",
  },
  {
    slug: "data-analyst-resume-projects", title: "Data analyst resume projects: explain the question and the result", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.dataRole, sources.mitResume],
    seoTitle: "Data Analyst Resume Projects: Examples and Free Template",
    description: "Describe data analyst projects with the question, dataset, cleaning, analysis, validation, and limits. Includes a fictional entry and free resume example.",
    category: "CVs by profession",
    intro: "A dashboard screenshot cannot explain whether an analysis is trustworthy. A useful project entry names the question, the data preparation, and a check on the result. The worked example below shows how to describe an analytical contribution without inventing business impact.",
    quickAnswer: "Describe the question, dataset context, preparation, analysis, and result you produced. Include a check or limitation you can explain. A report or dashboard is an output; a claim that it increased sales or reduced costs needs separate evidence. Label practice and academic datasets clearly.",
    checklist: { heading: "Check your analysis project entry", items: ["The question and dataset context are stated.", "You describe a preparation or validation step you performed.", "A chart or report has a clear intended audience or purpose.", "Limitations and demonstration data are identified where relevant.", "Business-impact figures are supported rather than inferred from a dashboard."] },
    relatedSlugs: ["fresh-graduate-cv-checklist", "projects-on-a-cv", "tailor-resume-to-job-description"],
    image: { kind: "example", id: "data-analyst", alt: "Data analyst CV example with analysis projects, reporting tools, and relevant experience", caption: "Fictional data analyst example in the Horizon template." },
    tool: { href: "/cv-examples/data-analyst/", label: "Edit a data analyst CV", text: "Use the full example for structure and replace its fictional analysis work with your own evidence." },
    sections: [
      { id: "worked-example", heading: "Worked example: separate analysis output from commercial impact", paragraphs: [
        "Suppose you built a sales dashboard from a practice dataset. You cleaned dates, joined tables, and compared the totals with the source before presenting monthly trends. That demonstrates work you can explain. It does not establish that a real business changed a decision or increased revenue because of your dashboard.",
        "Keep the entry centred on the question and the work. If a join changed totals unexpectedly, explain the check and correction in your project notes. For a CV, choose a concise validation detail and leave the full method in an accessible report or repository.",
      ], example: "Before: Used Power BI to increase sales by 25%.\n\nAfter: Built a Power BI report from a public practice dataset to compare monthly sales by category. Standardised date fields, checked joined totals against the source, and documented incomplete records that limited the comparison. The report was a personal learning project.", exampleLabel: "Fictional analyst project: replace unsupported impact with verifiable work" },
      { id: "start-with-question", heading: "Start with the question rather than the dashboard", paragraphs: [
        "Name the problem the project addressed. Comparing demand by day, investigating incomplete records, and summarising survey responses are different tasks even if they use the same software. Explain who the output was intended for, including when it was only a learning exercise.",
        "Choose projects that relate to the vacancy. If the role involves regular reporting, a project with clear definitions and repeatable checks may be more relevant than a visually impressive chart with little explanation. Do not add a project simply to include another tool name.",
      ] },
      { id: "describe-data-work", heading: "Show preparation, checking, and communication", sourceUrls: [sources.dataRole.url], paragraphs: [
        "The National Careers Service's analyst-statistician profile covers organising data, checking quality, analysing patterns, and presenting findings. That suggests a useful way to review a project entry: can the reader see those stages where you performed them? The profile covers varied roles, so it is context for choosing evidence, not a checklist of mandatory tools.",
        "Keep confidential data out of public portfolios and CV attachments. Use an approved public dataset, synthetic demonstration data, or an appropriate description of private work. Do not publish real employer records simply because a project needs a link.",
      ], example: "Personal project: Library lending analysis\n\nUsed a public practice dataset to compare monthly loans by category. Cleaned date fields, checked duplicate records in SQL, and built a Power BI report with documented filters. Recorded missing-data limits in the README; no operational decisions were made from the demo.", exampleLabel: "Fictional entry-level analyst project" },
      { id: "show-validation", heading: "Include a check on the result", paragraphs: [
        "Describe a verification step you can explain: comparing totals before and after a join, checking a sample of records, reconciling categories, or reviewing how filters change a chart. This tells the reader something about your approach to reliable work.",
        "Avoid saying that analysis proved a cause when it only showed an association or a pattern in a limited dataset. If a project used a small sample, incomplete records, or artificial data, keep the limitation visible. An honest interpretation gives a stronger basis for a technical interview.",
      ] },
      { id: "separate-output-impact", heading: "Separate what you produced from business impact", paragraphs: [
        "A dashboard, report, query, or documented analysis is an output. A change in sales, time, or cost is an impact that needs evidence and context. If nobody used the learning project to make a business decision, do not assign it a commercial outcome.",
        "For real workplace projects, distinguish your part from the wider team's result. Use a measured figure only when you know its source and can share it. Otherwise, explain the report's audience and purpose, which can still make the work understandable.",
      ] },
      { id: "fit-the-resume", heading: "Connect projects to skills and work history", sourceUrls: [sources.mitResume.url], paragraphs: [
        "MIT recommends reinforcing named skills by showing them in experience descriptions. For an analyst application, our practical adaptation is to connect a tool to the preparation, analysis, or reporting step you performed. If you add a portfolio link, provide a readable explanation so the reviewer can understand the project without running its code.",
        "Start with the [data analyst CV example](/cv-examples/data-analyst/) and use the [bullet builder](/resume-bullet-point-generator/) to make a line direct. For a graduate application, the [graduate CV checklist](/tips/fresh-graduate-cv-checklist/) helps arrange education and projects around the role.",
      ] },
    ],
    faqs: [
      { question: "Can a practice dataset project go on a data analyst resume?", answer: "Yes. Label it as a personal or academic project, explain the work, and avoid implying that it had a real commercial client or outcome." },
      { question: "Do I need to use every tool from the job advert?", answer: "No. Show relevant tools you actually know, explain your level through examples, and do not claim experience with software you have not used." },
    ],
    takeaway: "Explain the question, the preparation, and the checks; keep the output and any claimed impact distinct and supportable.",
  },
];
