import type { Guide } from "./guide-types";
import { BLOG_SOURCES_CHECKED, guideSources as sources } from "./guide-sources";

export const writingExampleGuides: Guide[] = [
  {
    slug: "resume-summary-examples-for-students", title: "Resume summary examples for students without job experience", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.lseCV, sources.mitResume],
    seoTitle: "Student Resume Summary Examples With No Experience",
    description: "Write a student resume summary using your course, projects, activities, and target role. Includes three fictional examples and an editing checklist.",
    category: "Profiles & writing examples",
    intro: "If your student summary could sit on anyone else's resume, it needs a more specific example. Use your course, a project, or a responsibility to explain what you bring. The examples below show what to include, what to remove, and when to leave the summary out altogether.",
    quickAnswer: "A student summary is optional. If you use one, name your current situation, one relevant example, and the opportunity you want. Keep the facts specific enough to support in the rest of the CV. Avoid filling the opening with qualities such as motivated or hardworking without evidence.",
    checklist: { heading: "Check your student summary before sending", items: ["It identifies your actual course, stage, or current situation.", "Its main strength is supported by a project, activity, or work entry.", "It fits this opportunity rather than naming every possible career goal.", "It adds useful context instead of repeating the education heading."] },
    relatedSlugs: ["skills-for-a-first-job-resume", "fresh-graduate-cv-checklist", "high-school-student-resume"],
    image: { kind: "example", id: "student", alt: "Student CV with an introductory profile followed by education and projects", caption: "Student CV example using fictional details." },
    tool: { href: "/resume-summary-builder/", label: "Build your student summary", text: "Choose the early-career option and enter your own course, skills, and project details." },
    sections: [
      { id: "worked-example", heading: "Worked example: replace a generic opening", paragraphs: [
        "Start with the draft below and underline each claim that needs evidence. Excellent communicator and fast learner are difficult to assess alone. The revised version names a setting and a task, giving the reader something to follow up in the activities section. It does not need an invented job history.",
        "To adapt it, write three notes: your situation, one relevant responsibility, and the target role. Combine only the parts that help the application. If the result simply repeats the first education entry, remove the paragraph and let that entry lead the page.",
      ], example: "Before: Highly motivated student with excellent communication skills seeking a challenging opportunity.\n\nAfter: Sixth-form student applying for weekend retail work. Helps visitors at a weekly library activity and keeps the equipment list up to date, with practice answering questions and organising shared materials.", exampleLabel: "Fictional student summary: before and after" },
      { id: "choose-an-introduction", heading: "Decide whether an introduction adds useful information", sourceUrls: [sources.lseCV.url], paragraphs: [
        "A summary is optional. LSE Careers treats a profile as useful when it highlights specific, relevant evidence, and advises against generic self-descriptions. If the opening would only repeat your degree title or say that you are hardworking, you can omit it and start with your strongest section.",
        "If you have a clear target such as a summer internship, the [resume objective generator](/resume-objective-generator/) can help you name it directly. If you want to foreground relevant project work, begin with the summary. Keep the result short enough to leave space for the evidence below.",
      ] },
      { id: "use-your-course", heading: "Use your course as context, then add evidence", sourceUrls: [sources.mitResume.url], paragraphs: [
        "A course title explains what you are learning, but it does not tell the whole story. Choose one project, tool, or recurring responsibility that relates to the role. Replace broad claims such as excellent teamwork with a small example of collaborating on a piece of work.",
        "MIT's resume guidance includes class and personal projects among possible experience. Choose a project that supports the vacancy, then explain your own role. Keep module lists and dates in Education. If the degree is unfinished, say student rather than graduate, and do not describe a learning project as paid work.",
      ], example: "Second-year Computer Science student interested in a software development internship. Built a small booking application for a group project using JavaScript and SQL, and documented the setup so classmates could run it locally.", exampleLabel: "Fictional university student summary" },
      { id: "show-activities", heading: "Use activities when they provide the stronger example", paragraphs: [
        "For a first job in retail, hospitality, or administration, a school activity or regular volunteer role may connect more clearly than a long list of subjects. Explain what you did and how often. The reader should be able to imagine the responsibility, rather than infer it from a title.",
        "Keep the claim proportionate. Helping to run an event is worth describing, but it does not automatically make you an experienced operations manager. Use ordinary language that you would be comfortable repeating to someone who helped with the same activity.",
      ], example: "School leaver looking for a first customer service role. Helped welcome visitors and organise materials at weekly library activities, and kept a shared list of equipment needed for each session.", exampleLabel: "Fictional school leaver summary" },
      { id: "change-the-emphasis", heading: "Tailor the example rather than adding more adjectives", paragraphs: [
        "Read the advert and decide which evidence deserves the opening space. For an office internship, a society's budget spreadsheet may matter more than unrelated sporting achievements. For a visitor-facing role, welcoming people and answering questions may be the better introduction.",
        "You can adapt the focus without changing the facts. Keep a note of the original activity and select the relevant parts. The [student CV maker](/cv-maker-for-students/) lets you put education and projects near the top so the paragraph leads naturally into the rest of the document.",
      ], example: "Business student applying for an administration internship. Maintains a student society's attendance spreadsheet and prepares short meeting notes, with practical experience organising shared information for a committee.", exampleLabel: "Fictional internship summary" },
      { id: "edit-and-check", heading: "Check every line against the rest of your CV", paragraphs: [
        "Remove any phrase that could describe almost anyone. Check that each named skill appears in a project, activity, course, or job entry below. Read the paragraph aloud and shorten anything you would not normally say. A summary should help the reader understand the document, not introduce unexplained claims.",
        "Use the [summary builder](/resume-summary-builder/) for a first structure, then edit the output. It uses predefined patterns rather than AI and cannot decide which of your examples is strongest. For a complete first application, continue with [writing your first CV](/tips/your-first-cv/).",
      ] },
    ],
    faqs: [
      { question: "Can a student use a resume summary without paid work?", answer: "Yes. Introduce your course or current situation and support it with relevant projects, activities, volunteering, or responsibilities." },
      { question: "Should I include both a summary and an objective?", answer: "Usually one short introduction is enough. Choose the version that best explains your background and the role you want." },
      { question: "Is a summary required on a student resume?", answer: "No. Omit it if it only repeats the rest of the page. Include it when it adds a useful, specific introduction to your relevant evidence." },
    ],
    takeaway: "Introduce your current situation, name a relevant example, and keep the summary consistent with the evidence in the rest of your CV.",
  },
  {
    slug: "career-change-resume-summary", title: "How to write a resume summary for a career change", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.lseCV, sources.skills],
    seoTitle: "Career Change Resume Summary: Examples and Steps",
    description: "Connect your previous work to a new role with an honest career-change summary. Includes transferable-skill examples, training language, and editing steps.",
    category: "Profiles & writing examples",
    intro: "Your current job title may not explain why you fit a new field. A career-change summary can make the connection, but it should distinguish experience you already have from skills you are still building. Here is how to write that bridge without relabelling your past work.",
    quickAnswer: "Connect your previous role to one or two tasks in the new field, then name relevant preparation such as a course or project. Describe the direction as a change in progress. Keep past job titles accurate and put the evidence behind the summary in your work, training, or project entries.",
    checklist: { heading: "Test the connection you are making", items: ["The target role is clear.", "At least one relevant activity comes from work you actually performed.", "New training is labelled as training, with completion status clear.", "The summary does not rename previous jobs or imply years in the new field.", "A reader can find the supporting examples in the CV."] },
    relatedSlugs: ["tailor-resume-to-job-description", "resume-action-verbs-and-bullet-points", "cover-letter-with-no-experience"],
    image: { kind: "example", id: "administrator", alt: "Administrator CV example showing organised records, coordination, and office tools", caption: "Fictional administrator example illustrating transferable experience." },
    tool: { href: "/resume-summary-builder/", label: "Start a career-change summary", text: "Choose career change and enter your previous role, new direction, and relevant preparation." },
    sections: [
      { id: "worked-example", heading: "Worked example: connect administration to project coordination", paragraphs: [
        "Suppose an administrator maintains schedules, records action points, and follows up missing information. A project-coordination advert asks for progress tracking and clear updates. Those activities form a connection, but they do not establish that the applicant managed budgets or led whole projects. Keep that boundary in the opening.",
        "Choose an example for each part of the summary: a schedule you maintained, an update you prepared, and any recent learning. If you cannot identify evidence for a phrase such as end-to-end delivery, replace it with the narrower contribution you can explain.",
      ], example: "Before: Experienced project manager with a strong track record of delivery.\n\nAfter: Office administrator moving into project coordination. Maintains shared schedules, records meeting actions, and follows up outstanding information. Recently completed an introductory project-planning course and applied it to a volunteer event plan.", exampleLabel: "Fictional career-change revision; use only details that are true for you" },
      { id: "name-the-connection", heading: "Start with the connection between the roles", sourceUrls: [sources.skills.url], paragraphs: [
        "The National Careers Service recommends comparing job descriptions with skills from work, education, and daily life. Start there: identify a task in the new role, then record where you have practised it. Keep a genuine connection separate from a skill you are interested in but have not yet developed.",
        "Select one or two connections you can show in the CV. A short opening that identifies those links helps the reader understand why an application from another field is relevant. It does not need to retell your whole career or explain every reason you want to leave it.",
      ] },
      { id: "state-current-background", heading: "Keep your current background visible", paragraphs: [
        "Use an accurate description of the work you have done. If you are a teacher applying for a training coordinator role, you can discuss planning sessions and adapting explanations. You do not need to rename your teaching job to match the vacancy, which could make the history confusing.",
        "Describe the new direction as a direction: moving into, seeking, or preparing for. Avoid presenting a course certificate as years of practice. The reader can still value your preparation when its scale is clear.",
      ], example: "Primary teacher moving into learning and development coordination. Experienced in planning structured sessions, adapting materials for different learners, and tracking progress. Recently completed a short course in workplace training design.", exampleLabel: "Fictional teaching-to-training summary" },
      { id: "add-recent-preparation", heading: "Name practical preparation for the new field", paragraphs: [
        "A course is more useful when you describe what you practised with it. Mention a relevant exercise, portfolio piece, volunteer assignment, or tool you used. Keep larger explanations in Projects or Education so the summary remains an introduction.",
        "If preparation is still in progress, label it that way. Do not invent client work for a personal project. You can describe the question you explored, the work you completed, and what is available to review without turning a learning exercise into commercial experience.",
      ], example: "Retail supervisor preparing for an entry-level data analyst role. Uses Excel to track stock discrepancies and weekly staffing needs, and has completed a personal SQL reporting project using a public practice dataset.", exampleLabel: "Fictional retail-to-analysis summary" },
      { id: "match-the-language", heading: "Use the new field's language where it fits", paragraphs: [
        "Read several relevant adverts and identify the tasks you recognise from your own work. Replace an internal label with a clear explanation if an outside reader would not know it. Keep official job titles accurate, then use the descriptions to show the overlap.",
        "The [resume keyword checker](/resume-keyword-checker/) can identify wording differences, but it does not judge whether your experience is equivalent. Add a term only when your example supports it. Be particularly careful with qualifications, specialist responsibilities, and claims of independent practice.",
      ] },
      { id: "support-the-opening", heading: "Keep the work history clear while changing the emphasis", sourceUrls: [sources.lseCV.url], paragraphs: [
        "LSE describes skills-based structures as one possible approach to a career change, rather than a requirement. You can also retain a chronological history and put a relevant project or training section earlier. Whichever structure you choose, make employers, roles, dates, and the origin of each example easy to find.",
        "Use the [summary builder](/resume-summary-builder/) to assemble a first draft, then review it beside the [CV profile guide](/tips/write-a-clear-profile/). If you need more space to explain the motivation for the change, put that connection in a tailored [cover letter](/cover-letter-maker/) instead of stretching the profile.",
      ] },
    ],
    faqs: [
      { question: "Should I hide unrelated jobs when changing careers?", answer: "You can reduce less relevant detail while keeping an accurate history. Highlight useful responsibilities and use projects or training to show the new direction." },
      { question: "Can I call myself an expert after finishing a course?", answer: "Use language that reflects the work you have actually done. State the course and practical preparation instead of implying professional experience you do not have." },
    ],
    takeaway: "Explain the connection, show recent preparation, and let the evidence support the change without changing the facts of your previous work.",
  },
  {
    slug: "cover-letter-with-no-experience", title: "How to write a cover letter with no work experience", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.coverLetter, sources.supportingStatement],
    seoTitle: "Cover Letter With No Experience: First-Job Example",
    description: "Write a first-job cover letter using study, volunteering, and projects. Includes a fictional example, paragraph structure, and free editing and PDF tools.",
    category: "Profiles & writing examples",
    intro: "When you have no paid job history, a cover letter can explain why a school activity, project, or volunteer responsibility matters to the vacancy. Choose one useful example and make the connection explicit. The full sample and editing exercise below show how to do that without apologising for being new.",
    quickAnswer: "Name the job, explain a specific reason for applying, and connect one real example to a requirement. Use study, volunteering, or projects where relevant. Close with the requested next step or availability. If the employer requests a supporting statement instead, answer its criteria and length limit.",
    checklist: { heading: "Before you attach the first-job letter", items: ["The role title, employer name, and any reference number are correct.", "You explain a reason for this application, not just a general wish for work.", "One example shows what you personally did.", "The letter and CV describe the same activity consistently.", "Every placeholder is replaced and the requested documents are attached."] },
    relatedSlugs: ["high-school-student-resume", "resume-summary-examples-for-students", "how-to-write-a-cover-letter"],
    image: { kind: "letter", id: "classic", alt: "Classic cover letter layout with sender details, date, greeting, body, and sign-off", caption: "Classic cover letter layout with fictional demonstration text." },
    tool: { href: "/cover-letter-maker/", label: "Draft your first cover letter", text: "Build an editable letter from your own details, then copy or download it as a PDF." },
    sections: [
      { id: "worked-example", heading: "Worked example: connect a school responsibility to the advert", paragraphs: [
        "Imagine a receptionist advert mentions accurate records and greeting visitors. You kept a school club's attendance sheet and welcomed new members. Write that activity plainly, then explain its connection to the work. Do not claim experience with a booking system you have never used.",
        "The revised paragraph below belongs in the middle of the letter. Add a role-specific opening and a brief closing around it; the longer sample later in this guide shows the whole structure. When adapting the paragraph, keep the setting and your level of responsibility visible.",
      ], example: "Before: Although I have no experience, I am a fast learner and would be grateful for any opportunity.\n\nAfter: As a school club volunteer, I updated the attendance spreadsheet and welcomed new members at weekly sessions. That responsibility gave me practice keeping shared records accurate and explaining where visitors needed to go, both tasks mentioned in your receptionist advert.", exampleLabel: "Fictional cover letter evidence paragraph" },
      { id: "read-the-request", heading: "Work out what the application asks for", sourceUrls: [sources.coverLetter.url, sources.supportingStatement.url], paragraphs: [
        "The National Careers Service describes a cover letter as a short introduction, usually three to five paragraphs. Manchester's application guidance treats a supporting statement as a fuller response to the role's criteria. Check which task the advert asks for, including its length limit; a short letter does not replace required form answers.",
        "Make a note of two requirements you can support through study, activities, projects, or volunteering. If the role is customer-facing, choose evidence involving people. If it involves organised records, choose a task where you managed information carefully. You need a connection, not a complete employment history.",
      ] },
      { id: "open-directly", heading: "Name the role and give a researched reason for applying", sourceUrls: [sources.coverLetter.url], paragraphs: [
        "The National Careers Service recommends researching the employer and naming the vacancy, including its reference if supplied. Read the employer's own description of its work and choose a detail you can connect to your interest. State that connection in your own words instead of copying its mission statement.",
        "Mention your current situation if it gives useful context: a school leaver seeking weekend work, a student applying for an internship, or someone returning to work after training. Keep the opening focused so there is room for your example.",
      ] },
      { id: "show-one-example", heading: "Use one example to support a relevant strength", paragraphs: [
        "Describe the setting, what you did, and the useful outcome or responsibility. For a group project, distinguish your part from the group's overall result. For volunteering, state whether it was a one-off event or a regular commitment. These details make modest experience understandable.",
        "Choose facts you can discuss comfortably at interview. Do not add an impressive-looking percentage to make an ordinary task seem more valuable. If you lack a measured outcome, explain what the task required and how you completed it.",
      ], example: "Dear Hiring Manager,\n\nI am applying for the weekend library assistant role. As a school leaver who enjoys helping people find information, I am interested in the role's mix of visitor support and organised records.\n\nDuring a term-long school reading club, I prepared book lists, recorded loans in a spreadsheet, and helped younger pupils choose reading material. The activity gave me regular practice listening carefully and keeping shared information up to date.\n\nI would welcome the opportunity to bring that care to your team and learn your lending system. My CV is attached, and I am available to discuss the weekend hours described in the advert. Thank you for considering my application.\n\nKind regards,\nAlex Morgan", exampleLabel: "Fictional first-job cover letter; adapt every detail" },
      { id: "make-it-personal", heading: "Adapt the letter to the actual employer", paragraphs: [
        "Replace generic statements with a detail from the advert or the employer's own information that relates to your interest. Do not repeat the entire CV. Use the letter to explain why an example is relevant and what you want to contribute or learn.",
        "The [cover letter maker](/cover-letter-maker/) gives you an editable starting structure using predefined patterns. Read every line and remove anything that does not fit. Its output is a draft assembled from your details, not research into the employer or a guarantee of suitability.",
      ] },
      { id: "finish-the-application", heading: "Check the letter and CV together", paragraphs: [
        "Use consistent contact details, dates, and descriptions across both documents. Confirm the employer's name and the role title. Read the letter aloud, then open the downloaded file before attaching it. If the application uses a text box, check the pasted version for lost paragraph breaks.",
        "Build the accompanying [CV with no experience](/cv-with-no-experience/) around the same evidence. For a fuller explanation of letter layout and addressing, read [how to write a cover letter](/tips/how-to-write-a-cover-letter/). A clear, accurate pair of documents is the goal.",
      ] },
    ],
    faqs: [
      { question: "Should I say I have no experience in the opening?", answer: "You can state that you are applying for a first job, but use the space to explain your interest and relevant evidence rather than apologising." },
      { question: "Can I use a school activity as my example?", answer: "Yes. Explain your responsibility and contribution, keep the scale accurate, and connect it to a requirement in the advert." },
    ],
    takeaway: "Name the opportunity, connect one honest example to the work, and check the finished letter beside the CV it accompanies.",
  },
  {
    slug: "resume-action-verbs-and-bullet-points", title: "Resume action verbs: turn a task into a useful bullet point", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.harvardTemplate, sources.aiResume],
    seoTitle: "Resume Action Verbs and Bullet Point Examples",
    description: "Choose accurate action verbs, keep tense consistent, and add context to resume bullet points. Before-and-after examples without invented achievements.",
    category: "Profiles & writing examples",
    intro: "Changing helped to delivered does not improve a bullet if it changes the truth. Start by identifying your contribution, then choose a verb and the detail that explains it. These examples show how to make a line clearer without inflating its result.",
    quickAnswer: "Use an accurate action verb, name the task, and add a useful detail such as the tool, audience, frequency, or result. Use a measured outcome only when you can support it. A clear description of a contribution can stand without a percentage or an exaggerated leadership claim.",
    checklist: { heading: "Check each experience bullet", items: ["The opening verb matches your own contribution.", "The task is understandable without internal workplace shorthand.", "The detail adds context instead of another adjective.", "Any number has a source and belongs to the stated person or team.", "The tense matches ongoing or completed work."] },
    relatedSlugs: ["describe-your-experience", "tailor-resume-to-job-description", "software-engineer-resume-projects"],
    image: { kind: "example", id: "project-manager", alt: "Project manager CV with short action-led experience descriptions", caption: "Project manager example with fictional responsibilities and outcomes." },
    tool: { href: "/resume-bullet-point-generator/", label: "Build an action-led bullet", text: "Combine your action, task, and optional context or result, then edit and copy the line." },
    sections: [
      { id: "worked-example", heading: "Worked example: build a bullet from four factual notes", paragraphs: [
        "Write the notes before polishing the sentence: action, task, context, and outcome if known. For this fictional entry, the notes are checked, weekly stock records, in Excel, and flagged discrepancies to a supervisor. There is no recorded savings figure, so the final line should not invent one.",
        "The narrower line is more informative because it explains the work and where your responsibility ended. If a wider team later reduced errors, mention that only with the right context and evidence. Do not convert a contribution into sole ownership of a result.",
      ], example: "Notes: checked / weekly stock records / Excel / discrepancies sent to supervisor.\n\nBullet: Checked weekly stock records in Excel and flagged discrepancies to the supervisor for investigation.\n\nUnsupported addition to avoid: Reduced stock losses by 40% through a complete process redesign.", exampleLabel: "Fictional bullet construction with an unsupported claim identified" },
      { id: "choose-accurate-verbs", heading: "Choose the verb that describes your own part", sourceUrls: [sources.harvardTemplate.url], paragraphs: [
        "Harvard's bullet-point template starts each description with an action and adds details about the contribution, with numbers where possible. It also treats bullets as phrases, so you do not need to begin each with I. Choose an accurate verb: assisted is the right word if you supported the work rather than leading it.",
        "Write down the activity in ordinary language first. Then remove an opening such as responsible for or duties included if it delays the useful information. Keep the actual task visible instead of replacing it with a broad phrase such as drove excellence.",
      ], table: { caption: "Choose verbs by the work you performed", head: ["Kind of contribution", "Possible verbs", "Detail to add"], rows: [["Created something", "Built, drafted, designed", "What you produced and for whom"], ["Checked quality", "Tested, reviewed, verified", "What you checked and how"], ["Helped people", "Explained, assisted, resolved", "The situation and your response"], ["Organised work", "Scheduled, recorded, coordinated", "The frequency, scope, or users"]] } },
      { id: "keep-tense-consistent", heading: "Match the tense to when the work happened", paragraphs: [
        "Use present tense for an ongoing responsibility and past tense for a completed task. A current role can contain both, but the distinction should make sense: maintain a weekly report for recurring work, built a new report for something completed last month.",
        "Read all the bullets under one job together. Watch for accidental switches caused by copying lines from different drafts. The bullet point builder keeps the verb you enter; it does not infer the date of the work or automatically change your grammar.",
      ] },
      { id: "add-context", heading: "Add a detail that helps the reader understand the task", paragraphs: [
        "Useful context includes a tool, an audience, a frequency, a type of problem, or a real measure of scale. You do not need every detail in every bullet. Choose the one that explains why this task belongs in the application.",
        "If you lack a measured result, describe the purpose or completion of the work. A working form, an accurate rota, or a documented procedure can be worth mentioning without a fabricated efficiency percentage. Keep any number consistent with your records and your level of responsibility.",
      ], example: "Before: Responsible for reports.\n\nAfter: Prepared a weekly Excel stock report for the shop manager, highlighting discrepancies for follow-up.\n\nBefore: Helped with website.\n\nAfter: Tested the booking form on mobile and documented validation issues for the developer.", exampleLabel: "Fictional before-and-after bullet points" },
      { id: "remove-repeated-lines", heading: "Cut unhelpful repetition without deleting relevant evidence", sourceUrls: [sources.aiResume.url], paragraphs: [
        "MIT's guidance notes that repeated evidence can be appropriate for a core requirement. Do not delete every mention of teamwork or analysis merely because it appears twice. Remove lines that add no new context, and keep distinct examples when they show the depth or variety of a skill the vacancy needs.",
        "Read the [work experience guide](/tips/describe-your-experience/) for organising a whole role and browse [profession examples](/cv-examples/) for complete documents. Use the examples for structure, not as a source of achievements to copy into your own history.",
      ] },
      { id: "test-final-line", heading: "Check the finished line before using it", paragraphs: [
        "Ask whether someone unfamiliar with your workplace would understand the sentence. Explain internal project names or replace them with a description. Remove unnecessary introductions, unexplained abbreviations, and claims that belong to the wider team rather than to you.",
        "Use the [free bullet point builder](/resume-bullet-point-generator/) to assemble your own facts, then edit the punctuation and wording. Copy the result into the appropriate experience, project, education, or volunteering entry and check it in the final PDF layout.",
        "If you would rather have AI reword lines you have already written, follow the [tutorial on improving CV bullet points with AI](/tips/improve-cv-bullet-points-with-ai/). Its three examples show how to spot an upgraded verb or an invented result before you accept a suggestion.",
      ] },
    ],
    faqs: [
      { question: "Do strong verbs make a resume ATS-friendly?", answer: "They can make descriptions clearer, but a verb list does not guarantee compatibility with a hiring system. Keep standard headings and follow the requested file format too." },
      { question: "Should every bullet start with a different verb?", answer: "Avoid awkward repetition, but accuracy matters more than using a new synonym for every line. Choose the verb that fits the work." },
    ],
    takeaway: "Use an accurate verb, explain the contribution, and add useful context instead of trying to make every line sound bigger.",
  },
  {
    slug: "skills-for-a-first-job-resume", title: "Skills to put on a first-job resume, with evidence", published: "2026-11-09",
    sourcesChecked: BLOG_SOURCES_CHECKED, sources: [sources.skills, sources.firstJob],
    seoTitle: "Skills for a First-Job Resume With No Experience",
    description: "Choose first-job resume skills from real projects, activities, and responsibilities. Includes practical examples and ways to describe your level honestly.",
    category: "Profiles & writing examples",
    intro: "If you have never had a paid job, start with activities before trying to fill a skills list. A club rota, group assignment, or regular responsibility can show a useful ability. The exercise below helps you find that evidence and describe your level without copying a generic list.",
    quickAnswer: "Choose skills the vacancy needs and connect each to something you have done. Coursework, volunteering, activities, and everyday responsibilities can provide evidence. Name practical tasks you can perform and keep beginner learning separate from independent proficiency.",
    checklist: { heading: "Keep a skill only when you can explain it", items: ["You can name an activity where you used it.", "You can explain the action you performed, not just the group's result.", "The skill relates to a task in the vacancy.", "Its stated level matches what you could demonstrate today.", "You removed tools included only because they appeared in a suggestion list."] },
    relatedSlugs: ["high-school-student-resume", "resume-summary-examples-for-students", "customer-service-resume-skills"],
    image: { kind: "example", id: "retail-assistant", alt: "Retail assistant CV showing customer service and practical workplace skills", caption: "Retail assistant example using fictional details." },
    tool: { href: "/resume-skills/", label: "Explore skills by job", text: "Browse skill ideas for different roles and select only those you can support with an example." },
    sections: [
      { id: "worked-example", heading: "Worked example: build an evidence list from a club activity", paragraphs: [
        "Suppose you organised a weekly club rota, collected members' availability, and sent updates when a session changed. Start with those actions. They may support scheduling, spreadsheet records, and written updates, but they do not establish advanced Excel modelling or professional project management.",
        "Choose the skill that matters to the vacancy and include the activity as evidence elsewhere in the CV. If an interviewer asked you to demonstrate the tool, explain the features you used. A precise basic skill is a better claim than an advanced label with no supporting task.",
      ], table: { caption: "Fictional skill audit from one activity", head: ["What you did", "Supportable skill", "Claim to avoid"], rows: [["Collected availability in a sheet", "Spreadsheet records", "Advanced financial modelling"], ["Updated a weekly rota", "Scheduling", "Managed a department"], ["Emailed changed session times", "Clear written updates", "Led a communications strategy"]] } },
      { id: "start-with-activities", heading: "Find skills by listing things you have done", sourceUrls: [sources.skills.url, sources.firstJob.url], paragraphs: [
        "The National Careers Service suggests reflecting on education, work, and daily life to identify skills. Victoria's Youth Central also points first-time applicants towards community activity, volunteering, and school projects. Our exercise is to list activities first, then write the actions you performed before choosing a skill label.",
        "For example, recording equipment loans can involve accurate records; preparing slides for a group presentation can involve clear written communication. The useful evidence is the actual task. Keep its setting visible so the reader understands whether it was coursework, employment, or another activity.",
      ] },
      { id: "separate-skill-types", heading: "Distinguish practical tools from ways of working", sourceUrls: [sources.skills.url], paragraphs: [
        "The National Careers Service distinguishes specific or hard skills from transferable skills such as communication and problem solving. Both can matter. For your CV, describe a practical task you can carry out and connect a transferable skill to an example; a category label on its own says little about your level.",
        "Be specific about your level. Creating a table in Excel is different from building a complex forecasting model. If a skill is still developing, name what you can do rather than applying an expert label. Keep formal certificates accurate and do not imply you hold one because you have studied the topic informally.",
      ], table: { caption: "From an activity to a supportable skill", head: ["Activity", "Skill you might describe", "Evidence to include"], rows: [["Recorded club attendance", "Spreadsheet records", "The sheet you maintained and checks you made"], ["Helped visitors at an event", "Visitor communication", "Questions answered and directions provided"], ["Built a course website", "HTML and CSS", "The pages and features you completed"], ["Planned practice sessions", "Scheduling", "How you coordinated times and shared updates"]] } },
      { id: "choose-for-the-role", heading: "Select skills that help with the advertised work", paragraphs: [
        "Read the tasks and requirements in the advert. Pick the skills you have that connect directly, then put the supporting example in a project, activity, or experience entry. A focused list makes it easier to see why you are applying.",
        "Use the [skills finder](/resume-skills/) for ideas you may have overlooked. It is a predefined reference library, not an assessment of your ability. Selecting a suggestion does not make it true, so keep only the skills you can explain or demonstrate.",
      ] },
      { id: "write-your-evidence", heading: "Turn a personal quality into a concrete example", paragraphs: [
        "Replace a claim such as organised with a description of what you organised. Mention the shared information, deadline, or routine that made the task useful. You can still list the relevant skill, but the example gives it substance.",
        "Use the [bullet point builder](/resume-bullet-point-generator/) if you need help assembling the line. Enter your action and task, add context if useful, and leave the result blank if you cannot support one. The sentence should stay accurate even when someone asks you follow-up questions.",
      ], example: "Instead of: Excellent organisation and teamwork.\n\nTry: Coordinated a four-person coursework presentation, keeping a shared task list and combining the final slides before submission.", exampleLabel: "Fictional first-job evidence example" },
      { id: "place-skills-well", heading: "Place the skills where they support the document", paragraphs: [
        "Keep a compact skills list near your relevant education or projects. Avoid rating bars that suggest a precision you cannot explain. List languages with honest descriptions of proficiency, and keep a project link only if the employer can open it without requesting access.",
        "Start a [CV with no experience](/cv-with-no-experience/) to put education and projects before employment. Before sending, check that each skill has an example somewhere in the document and remove anything included only because it sounded impressive.",
      ] },
    ],
    faqs: [
      { question: "Can I include skills learned outside a paid job?", answer: "Yes. Keep the context clear and show what you did through education, projects, volunteering, or relevant responsibilities." },
      { question: "How many skills should I list?", answer: "Use a short, relevant selection that you can support. There is no useful target number if adding more means including weak or unrelated claims." },
    ],
    takeaway: "Begin with real activities, choose relevant skills, and put a clear example behind each claim.",
  },
];
