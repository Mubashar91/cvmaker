import type { Guide } from "./guide-types";

export const careerBlogGuides: Guide[] = [
  {
    slug: "high-school-student-resume", title: "A first resume for high school students: what to include", published: "2026-11-09",
    seoTitle: "High School Student Resume With No Experience: Free Guide",
    description: "Build a high school student resume using education, activities, volunteering, and practical skills. Includes a fictional entry and free template guidance.",
    category: "Students & first applications",
    intro: "Your first high school resume can be a short record of what you have learned and taken responsibility for. It does not need an empty employment section or a list of qualities you cannot explain. Use a simple layout, describe a few relevant activities clearly, and help the employer understand how you could contribute to the job.",
    image: { kind: "template", id: "student", alt: "Student CV template with distinct education and activity sections", caption: "Student template with fictional demonstration details." },
    tool: { href: "/cv-maker-for-students/", label: "Start a student resume", text: "Begin with education first, add your activities, and preview a free A4 PDF." },
    sections: [
      { id: "choose-your-evidence", heading: "Start with school and activities, not an empty job history", paragraphs: [
        "List your current school, expected completion date, and relevant subjects or training. Then note activities that involved a real responsibility: a club role, tutoring, a community event, a creative project, or helping with practical tasks. Choose items that connect to the work you want.",
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
      { id: "choose-skills", heading: "Include practical skills you can demonstrate", paragraphs: [
        "Mention relevant tools, languages, or practical abilities with an honest description of what you can do. A short list supported by activities is more useful than a long list copied from an advert. If you are learning something, describe the tasks you have practised rather than calling yourself advanced.",
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
    seoTitle: "Fresh Graduate CV Format and Application Checklist",
    description: "Organise a fresh graduate CV around your degree, dissertation, placements, projects, and practical skills. Includes a fictional project entry and review checklist.",
    category: "Students & first applications",
    intro: "A graduate CV needs to do more than announce that you finished a degree. Show which parts of your education and experience prepare you for the role. A dissertation, placement, society responsibility, or part-time job can each contribute useful evidence when you explain your own work clearly. Use this checklist to choose and arrange that evidence before applying.",
    image: { kind: "example", id: "student", alt: "Graduate-style CV example with education, a university project, and part-time work", caption: "Fictional student example that can be adapted for a graduate application." },
    tool: { href: "/cv-maker-for-students/", label: "Create a graduate CV", text: "Use an education-first structure and arrange projects, placements, and skills around your target role." },
    sections: [
      { id: "identify-the-role", heading: "Choose the role before listing your modules", paragraphs: [
        "Read the vacancy and identify the work the graduate will be expected to do. Build your first draft around a small set of relevant requirements, not everything you studied. Keep a fuller record separately so tailoring one application does not mean losing useful details for another.",
        "Write a short profile that names your field and a relevant example. Avoid broad promises about being a future leader when a concrete project would be clearer. The [student summary guide](/tips/resume-summary-examples-for-students/) offers structures you can adapt with graduate-level evidence.",
      ] },
      { id: "education-detail", heading: "Make the education section specific and accurate", paragraphs: [
        "Include the qualification, institution, and completion date. State a final grade or classification only when it is confirmed and useful; clearly label a predicted result or unfinished course. Select relevant modules rather than turning the section into a transcript.",
        "Choose a dissertation or major assignment if it demonstrates a method, tool, or subject that matters to the vacancy. Explain the question you explored and the work you performed. If the project deserves several lines, give it a separate Projects entry rather than crowding the qualification heading.",
      ] },
      { id: "show-project-work", heading: "Explain what you did in a project", paragraphs: [
        "Describe the project setting, your contribution, the method or tools, and what you produced. Distinguish an individual dissertation from a group assignment. A completed report or tested prototype can be a clear result even when there was no commercial customer or financial outcome.",
        "Use only figures you can support. Do not turn a classroom exercise into client work or imply that a university grade proves workplace performance. Read [how to describe projects](/tips/projects-on-a-cv/) for a fuller method of choosing the details.",
      ], example: "Final-year project: Campus transport survey\n\nDesigned a student travel questionnaire, cleaned the anonymous responses in Excel, and compared travel times by transport type. Presented the findings in a written report with charts and a discussion of sampling limits.", exampleLabel: "Fictional graduate project entry" },
      { id: "use-other-work", heading: "Keep relevant evidence from part-time and volunteer roles", paragraphs: [
        "A part-time job can show communication, reliability, accurate records, or handling competing tasks. Explain those contributions in their real setting. Do not remove all paid work just because its job title differs from your target graduate role.",
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
    seoTitle: "Software Engineer Resume Projects: Examples and Free Template",
    description: "Write software project entries that explain your contribution, technical choices, testing, and limits. Includes fictional examples and a free editable CV.",
    category: "CVs by profession",
    intro: "A software project entry should help a reader understand what you built and what part was yours. A stack of technology names does not explain the problem, the implementation, or the result. Choose a few projects that relate to the role and describe them in a way that invites a useful technical conversation.",
    image: { kind: "example", id: "software-developer", alt: "Software developer CV example with technical skills and development experience", caption: "Software developer CV example with fictional people and projects." },
    tool: { href: "/cv-examples/software-developer/", label: "Edit a software developer CV", text: "Use a complete fictional example for structure, then replace its content with your own experience." },
    sections: [
      { id: "select-projects", heading: "Select projects for the target role", paragraphs: [
        "Read the vacancy for the type of work involved: user interfaces, APIs, data processing, testing, or another area. Choose projects where you can explain a relevant contribution. A small finished application with a clear purpose can provide a better discussion than a large unfinished repository.",
        "Avoid including several projects that demonstrate exactly the same thing unless their differences matter. One well-explained form, a tested API, and a deployment exercise can show different kinds of work. Use the project selection to complement, rather than repeat, your employment history.",
      ] },
      { id: "describe-purpose-and-role", heading: "Explain the purpose and your own contribution", paragraphs: [
        "Give the project a short descriptive name and identify it as personal, academic, volunteer, or professional work. Explain who it was for and what you implemented. If a team built it, distinguish your contribution from the overall application.",
        "Name the technologies in the context of the task. Built a booking form in React and validated submitted dates explains more than React, JavaScript, HTML, CSS alone. Keep your official job titles and the status of unpaid work accurate.",
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
    seoTitle: "Teacher CV Personal Statement: Examples and Free Template",
    description: "Write a focused teacher CV profile using your subject, teaching context, and classroom evidence. Includes fictional early-career and experienced examples.",
    category: "CVs by profession",
    intro: "A teacher's personal statement at the top of a CV should orient the reader quickly: your teaching context, your relevant experience, and one clear strength supported by classroom work. It is different from a longer supporting statement that answers a school's selection criteria. Keep the short profile focused and use the rest of the application for detailed evidence.",
    image: { kind: "example", id: "teacher", alt: "Teacher CV example with a short profile, teaching history, and qualifications", caption: "Fictional teacher CV in the Classic template." },
    tool: { href: "/cv-examples/teacher/", label: "Edit the teacher CV example", text: "Use the example's structure and replace all teaching details, qualifications, and achievements with your own." },
    sections: [
      { id: "identify-your-context", heading: "Name your teaching context accurately", paragraphs: [
        "Identify the age range, subject, or setting you have actually taught. State a qualification or professional status only if you hold it, and use the terminology appropriate to the vacancy. Requirements vary by employer and location, so check the school's instructions rather than relying on a general CV example.",
        "If you are still training, say so. A completed placement can provide valuable evidence without being described as several years of independent teaching. Keep full qualification names and dates in Education or Certifications rather than crowding the opening paragraph.",
      ] },
      { id: "choose-classroom-evidence", heading: "Choose a classroom contribution that matters to the role", paragraphs: [
        "Look at the vacancy and choose a relevant practice you can explain: planning a sequence of lessons, adapting materials, using checks for understanding, or coordinating with colleagues. Describe what you did, not just your belief that education is important.",
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
      { id: "support-the-profile", heading: "Let the rest of the application carry the detail", paragraphs: [
        "Use the teaching experience section for duties and evidence, Education for qualifications, and a requested supporting statement for a fuller response to selection criteria. Do not paste a long statement into a short profile and leave the rest of the CV thin.",
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
    seoTitle: "Customer Service Resume Skills and Bullet Point Examples",
    description: "Show customer service skills through real query handling, records, tools, and escalation examples. Includes fictional bullets and a free editable resume.",
    category: "CVs by profession",
    intro: "Customer service skills become clearer when you describe the situation you handled. A list containing communication, patience, and problem solving gives little context on its own. Explain the questions customers brought, the tools you used, and what you did within your responsibility. That evidence helps a reader picture the kind of service work you can perform.",
    image: { kind: "example", id: "customer-service", alt: "Customer service CV example with support experience and relevant tools", caption: "Fictional customer service CV in the Modern template." },
    tool: { href: "/cv-examples/customer-service/", label: "Edit a customer service resume", text: "Use a complete example for layout and wording ideas, then replace every detail with your own." },
    sections: [
      { id: "identify-service-setting", heading: "Describe the service setting", paragraphs: [
        "Identify whether your work involved a shop, phone support, email, live chat, reception, or another setting. Mention the types of questions or requests you handled. A customer service title can cover very different work, so the setting helps a recruiter interpret the rest of the entry.",
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
      { id: "use-metrics-carefully", heading: "Use service measures only when you understand them", paragraphs: [
        "If you know your approximate daily query volume or a documented service measure, it can help explain scale. Check the period and whether the figure belongs to you or the team. Do not borrow a team satisfaction result and present it as your individual rating.",
        "Numbers are optional. A clear description of handling a particular type of issue, keeping accurate notes, or coordinating a follow-up can be useful without a percentage. The [bullet point builder](/resume-bullet-point-generator/) lets you leave the result blank rather than inventing one.",
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
    seoTitle: "Data Analyst Resume Projects: Examples and Free Template",
    description: "Describe data analyst projects with the question, dataset, cleaning, analysis, validation, and limits. Includes a fictional entry and free resume example.",
    category: "CVs by profession",
    intro: "A data analyst project should explain more than the names SQL, Python, and Power BI. Show the question you explored, the data you worked with, and how you checked the answer. A reader should understand what you produced and which conclusions the data could support. This is especially useful when projects provide your main evidence for a first analyst role.",
    image: { kind: "example", id: "data-analyst", alt: "Data analyst CV example with analysis projects, reporting tools, and relevant experience", caption: "Fictional data analyst example in the Horizon template." },
    tool: { href: "/cv-examples/data-analyst/", label: "Edit a data analyst CV", text: "Use the full example for structure and replace its fictional analysis work with your own evidence." },
    sections: [
      { id: "start-with-question", heading: "Start with the question rather than the dashboard", paragraphs: [
        "Name the problem the project addressed. Comparing demand by day, investigating incomplete records, and summarising survey responses are different tasks even if they use the same software. Explain who the output was intended for, including when it was only a learning exercise.",
        "Choose projects that relate to the vacancy. If the role involves regular reporting, a project with clear definitions and repeatable checks may be more relevant than a visually impressive chart with little explanation. Do not add a project simply to include another tool name.",
      ] },
      { id: "describe-data-work", heading: "Explain the data preparation you actually performed", paragraphs: [
        "Mention the data source at an appropriate level and identify your cleaning or transformation work. Did you standardise dates, handle missing values, join tables, or check duplicates? Choose the steps that matter to the reliability of the output rather than listing every command you ran.",
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
      { id: "fit-the-resume", heading: "Connect projects to skills and work history", paragraphs: [
        "List a compact set of tools you can use, then show them in project or employment entries. If a portfolio link is included, check it without signing in and ensure the explanation is consistent with the CV. A reviewer should not have to run unfamiliar code to learn what the project was about.",
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
