import type { Guide } from "./guide-types";

// Guides for first jobs, internships, part-time work, and turning projects into evidence.
export const earlyCareerGuides: Guide[] = [
  {
    slug: "part-time-job-cv", title: "How to write a CV for a part-time job", published: "2026-11-09",
    seoTitle: "How to Write a Part-Time Job CV (With Examples)",
    description: "Write a CV for a part-time job in retail, hospitality, care, or tutoring: what to include, how to show your availability, and profile examples.",
    category: "Students & first applications",
    intro: "A part-time CV does the same job as any other CV, but the reader is often a busy shop, café, or care manager trying to fill shifts. They want to know three things quickly: can you do the work, can they rely on you, and when are you available. A clear one-page CV that answers those questions will stand out.",
    image: { kind: "example", id: "retail-assistant", alt: "Retail assistant CV example with a short profile that mentions flexible shift availability, followed by shop-floor experience and skills", caption: "A fictional retail assistant CV from our CV examples, in the Minimal template." },
    tool: { href: "/resume-skills/", label: "Find skills for the role", text: "Browse common skills for retail, hospitality, customer service, and care jobs, and add the ones you can back up to your CV." },
    sections: [
      { id: "what-employers-look-for", heading: "What part-time employers look for", paragraphs: [
        "Most part-time roles are about people and reliability. A manager reading your CV is picturing you on a busy Saturday or a short-staffed evening shift. Evidence that you turn up, stay calm, and treat customers well matters more than a long list of qualifications.",
        "Practical skills help too. Handling cash, using a till or booking system, following food hygiene rules, or caring for children or older people are all worth naming when you have done them.",
      ], bullets: [
        "Reliability: punctual, consistent, and willing to cover shifts.",
        "A friendly, professional manner with customers or clients.",
        "Clear availability that fits the rota.",
        "Practical skills for the role, such as cash handling or food safety.",
        "Teamwork, and the ability to take instructions and learn quickly.",
      ] },
      { id: "part-time-cv-structure", heading: "A simple structure for a part-time CV", paragraphs: [
        "Keep it to one page. Use clear headings so a manager can find what they need in seconds, and put your strongest evidence near the top.",
      ], bullets: [
        "Name and contact details: phone, email, and your town or city.",
        "A short profile that says what role you want and when you are available.",
        "Work experience, including volunteering and informal work such as babysitting.",
        "Education: your school, college, or course, with relevant grades if you are a student.",
        "Skills, and any certificates such as first aid or food hygiene.",
      ] },
      { id: "show-your-availability", heading: "Make your availability clear", paragraphs: [
        "Part-time hiring often comes down to who can work the shifts that need covering. Say plainly when you can work, either in your profile or as a short line under your contact details. Mention any difference between term time and holidays.",
        "Be honest. Offering hours you cannot keep causes problems for you and the team later. If you need a few weeks’ notice before you start, say so at interview rather than on the CV.",
      ], example: "Available weekday evenings after 4 pm and all day Saturday during term time, with full-time availability during the summer holidays.", exampleLabel: "Illustrative availability line" },
      { id: "no-experience", heading: "If you have never had a job", paragraphs: [
        "You can still show the qualities a part-time employer wants. Think about responsibilities you have taken on at school, college, home, or in your community: helping at events, volunteering, sports teams, babysitting, or helping in a family business. Describe each one with what you did and what came of it.",
        "Our guide to [writing your first CV with no experience](/tips/your-first-cv/) walks through this step by step, and the [CV maker for students](/cv-maker-for-students/) starts you with a layout that puts education first.",
      ] },
      { id: "alongside-other-commitments", heading: "Applying alongside study, another job, or caring", paragraphs: [
        "Many people look for part-time work while studying, raising children, caring for a relative, or holding another job. You do not need to explain why you want part-time hours. Focus on the experience and skills you bring, and on the hours you can offer.",
        "If you are returning after a break, the skills from your earlier jobs still count. A short, honest line such as “Career break for family responsibilities, 2021–2024” is enough if you want to explain a gap.",
      ] },
      { id: "profile-examples", heading: "Part-time CV profile examples", paragraphs: ["Fictional examples for three common situations. Adapt the details so every line is true for you."], example: "Sixth-form student: Reliable sixth-form student looking for weekend work in a café or shop. Volunteers at a charity shop every Saturday, serving customers and pricing donations. Available Saturdays and Sundays, and full time in the school holidays.\n\nUniversity student: Second-year Geography student with a year of experience on the tills at a busy supermarket. Comfortable with cash handling, stock rotation, and helping customers find what they need. Available for evening and weekend shifts during term time.\n\nParent returning to work: Former office administrator returning to work after three years of caring for young children. Organised, calm on the phone, and confident with booking systems and spreadsheets. Looking for a part-time receptionist role during school hours.", exampleLabel: "Illustrative profiles (fictional)" },
      { id: "tailor-to-the-role", heading: "Tailor it to the kind of job", paragraphs: ["Each type of part-time work values slightly different evidence."], subsections: [
        { heading: "Retail", paragraphs: ["Mention till and cash handling, helping customers, stock replenishment, and working on busy days. Our [retail assistant CV example](/cv-examples/retail-assistant/) shows how to describe shop-floor work."] },
        { heading: "Hospitality", paragraphs: ["Name food hygiene or allergen training, table service, coffee or bar experience, and any certificate your country requires, such as a food handler card in some US states or a Responsible Service of Alcohol (RSA) certificate in Australia."] },
        { heading: "Care and support work", paragraphs: ["Show patience, respect, and reliability, and list any care training. Many care roles need a background check, such as a DBS check in the UK or a police check in Australia; mention it if you already hold one. See the [care assistant CV example](/cv-examples/care-assistant/)."] },
        { heading: "Tutoring and childcare", paragraphs: ["List the subjects or age groups you can work with, your own relevant grades, and any first aid or safeguarding training."] },
      ] },
    ],
    faqs: [
      { question: "Should a part-time CV be one page?", answer: "Yes, in most cases. Managers hiring for part-time roles read quickly, and one clear page is enough to show your experience, skills, and availability." },
      { question: "Should I put my availability on my CV?", answer: "Yes. A short, honest line about the days and hours you can work helps a manager see straight away whether you fit the rota." },
      { question: "Do I need a cover letter for a part-time job?", answer: "Not always. If you apply online or by email, a few sentences about the role and your availability are usually enough. The [cover letter maker](/cover-letter-maker/) can help when a full letter is requested." },
      { question: "Can I use the same CV for several shops or cafés?", answer: "You can use the same base CV, but adjust the profile and the order of your experience for each type of role, for example putting customer service first for retail and food safety first for a café." },
    ],
    takeaway: "Keep a part-time CV to one page, make your availability clear, and show reliability and people skills through specific examples.",
  },
  {
    slug: "internship-cv", title: "How to write a CV for an internship", published: "2026-11-09",
    seoTitle: "How to Write an Internship CV (With Examples)",
    description: "Write an internship CV or resume that works with little experience: the best structure, a short objective, coursework and projects, and tips by field.",
    category: "Students & first applications",
    intro: "An internship CV is read differently from a CV for an experienced role. Recruiters know you are early in your career, so they look for potential: a genuine interest in the field, evidence that you can learn quickly, and the basic skills to contribute from the first week. Your education, projects, and activities are where that evidence lives.",
    image: { kind: "template", id: "student", alt: "Student CV template with clear section bands and a centred serif name, a single-column layout suited to internship applications", caption: "Student template, fictional sample content." },
    tool: { href: "/resume-objective-generator/", label: "Write your internship objective", text: "Combine your course, skills, and the internship you want into three short, editable objective drafts." },
    sections: [
      { id: "what-recruiters-look-for", heading: "What internship recruiters look for", paragraphs: [
        "Most internship applicants have similar education, so the details make the difference. Recruiters look for relevant modules or projects, signs of initiative such as a society role or a side project, and the everyday professional skills that make an intern easy to work with: communication, organisation, and reliability.",
        "They also need practical details: when you graduate, when you are available, and, for some roles, whether you are eligible to work in that country.",
      ] },
      { id: "internship-cv-structure", heading: "The best structure for an internship CV", paragraphs: [
        "Put your strongest evidence first. For most students, that means education and projects before work experience. Keep it to one page.",
      ], bullets: [
        "Contact details, plus a LinkedIn profile, portfolio, or GitHub link if it is relevant and up to date.",
        "A short objective or profile naming the internship you want.",
        "Education: degree, institution, expected graduation date, relevant modules, and grade if it helps.",
        "Projects: coursework, competitions, and personal projects related to the field.",
        "Experience: part-time jobs, volunteering, and society roles.",
        "Skills: software, technical skills, and languages.",
      ] },
      { id: "internship-objective", heading: "Open with a focused objective", paragraphs: [
        "A two-sentence objective tells the recruiter exactly what you are applying for and why you are a credible candidate. Name the field or the company, mention one or two relevant skills, and include your availability if the internship runs at a fixed time.",
        "The free [resume objective generator](/resume-objective-generator/) builds three drafts from your details that you can edit.",
      ], example: "Second-year Economics student seeking a summer internship in financial analysis at Northbridge Bank. Offers Excel, financial modelling, and teamwork developed through coursework and a student investment society. Available from June 2027.", exampleLabel: "Illustrative internship objective (fictional)" },
      { id: "education-first", heading: "Make your education do more work", paragraphs: [
        "List your degree with its expected graduation date, then add the details that relate to the internship: two or three relevant modules, a dissertation or major project, scholarships, and awards. Include your grade if it is strong, for example a predicted 2:1 in the UK or a GPA in the US.",
        "If you are still at school or college, list your current qualifications with predicted grades and any relevant subjects.",
      ] },
      { id: "projects-as-evidence", heading: "Turn coursework and projects into evidence", paragraphs: [
        "Projects show what you can actually do. Describe each one with what you made, the tools or methods you used, and what came of it, and say what your part was in group work. Our guide to [describing projects on a CV](/tips/projects-on-a-cv/) has examples and a simple formula.",
      ] },
      { id: "tailor-by-field", heading: "Tailoring for different fields", paragraphs: ["Recruiters in each field look for slightly different signals."], subsections: [
        { heading: "Technology", paragraphs: ["Group your technical skills by area, link to a tidy GitHub profile or portfolio, and describe one or two projects in detail. The [frontend developer](/cv-examples/frontend-developer/) and [software developer](/cv-examples/software-developer/) CV examples show how."] },
        { heading: "Business, finance, and consulting", paragraphs: ["Highlight Excel and analysis skills, case competitions, and any society role where you managed money, events, or a team."] },
        { heading: "Marketing, media, and design", paragraphs: ["Link to a portfolio, and name accounts, campaigns, or publications you have worked on, with honest results such as audience growth."] },
        { heading: "Science and engineering", paragraphs: ["List laboratory techniques, software, and safety training, and describe practical projects with the methods you used."] },
      ] },
      { id: "dates-and-eligibility", heading: "Dates, availability, and eligibility", paragraphs: [
        "Make it easy to see when you can start and finish. Include your expected graduation date, and the period you are available if the internship has fixed dates.",
        "If you are an international student, check whether the internship needs work authorisation or a visa, and answer the employer’s questions accurately. Our [UK](/tips/uk-cv-format/), [US](/tips/us-resume-format/), [Canadian](/tips/canadian-resume-format/), and [Australian](/tips/australian-resume-format/) guides explain local conventions.",
      ] },
    ],
    faqs: [
      { question: "How long should an internship CV be?", answer: "One page. Recruiters read many applications, and a focused page with your most relevant evidence is easier to assess." },
      { question: "Should I include my grades on an internship CV?", answer: "Include them if they are strong or the employer asks for them, for example a predicted degree classification in the UK or a GPA in the US." },
      { question: "What if I have no work experience at all?", answer: "That is common for internship applicants. Lead with education and projects, then add volunteering, society roles, and part-time work. See [how to write a CV with no experience](/tips/your-first-cv/)." },
      { question: "Do I need a cover letter for an internship?", answer: "Often, yes. A short letter explaining why you want this internship and what you would bring helps you stand out. The [cover letter maker](/cover-letter-maker/) has a student and graduate template." },
    ],
    takeaway: "An internship CV sells your potential: lead with education and projects, open with a focused objective, and make your dates clear.",
  },
  {
    slug: "projects-on-a-cv", title: "How to describe projects on a CV", published: "2026-11-09",
    seoTitle: "How to Describe Projects on a CV (With Examples)",
    description: "List personal, academic, and work projects on your CV so they count as evidence: where to put them, what to include, and example bullet points.",
    category: "Experience & achievements",
    intro: "Projects are some of the most convincing evidence on a CV, because they show what you can do rather than what a job title says. They matter most when you are a student, changing careers, or working in a field such as technology or design, but a well-described project helps almost any application.",
    image: { kind: "example", id: "software-developer", alt: "Software developer CV example with a Projects section at the end listing a personal budget planner app, its year, and a one-line description", caption: "A fictional software developer CV from our CV examples, in the Tech template." },
    tool: { href: "/editor/", label: "Add a project to your CV", text: "The editor has a Projects section with fields for the name, organisation or link, dates, and description. Move it up the page when it is your strongest evidence." },
    sections: [
      { id: "when-projects-help", heading: "When a projects section helps", paragraphs: ["Add projects when they show skills the job needs and your work history does not show them well on its own."], bullets: [
        "You are a student or graduate with little work experience.",
        "You are changing careers and have built something in the new field.",
        "You work in technology, design, research, or marketing, where portfolios are common.",
        "A volunteer or community project shows leadership or organisation.",
        "A project at work was large enough to deserve its own entry.",
      ] },
      { id: "where-projects-go", heading: "Where projects go on your CV", paragraphs: [
        "Most CVs list projects in their own section after work experience. If projects are your strongest evidence, move the section higher, directly after education for students or after your profile for career changers. In Folio you can reorder sections in the Templates & layout tab.",
        "Projects you completed as part of a job can stay inside that role’s bullet points. Give one its own entry only when it is substantial and directly relevant to the application.",
      ] },
      { id: "what-to-include", heading: "What to include for each project", paragraphs: ["Keep each project short and specific. One to three bullet points is usually enough."], bullets: [
        "Project name: a clear, descriptive title rather than an internal code name.",
        "Context: the course, organisation, or “Personal project”, or a link to the work.",
        "Dates: the year, or the months it ran.",
        "What you did: your goal, your role, and the tools or methods you used.",
        "The result: what you delivered, who used it, or what changed.",
      ] },
      { id: "write-project-bullets", heading: "Write project bullets that show results", paragraphs: [
        "Use the same formula as for work experience: start with an action, say what you made or did, mention how, and finish with a result. Our guide to [describing work experience](/tips/describe-your-experience/) covers the same approach for jobs.",
        "If the project is small, scale is still worth stating: how many users, pages, participants, or data points. Use figures you can explain in an interview.",
      ], example: "Before: Made a website for a charity.\n\nAfter: Built a five-page website for a local food bank in WordPress, adding an online volunteer sign-up form that replaced paper forms at the front desk.", exampleLabel: "Illustrative before and after" },
      { id: "project-examples", heading: "Project examples by type", paragraphs: ["Fictional examples written in the format above. Replace every detail with your own."], example: "Academic: Final-year dissertation on how independent shops use social media. Interviewed six shop owners and analysed 400 posts, presenting recommendations to a local business network.\n\nPersonal (technology): Budget planner app, 2024. Built an offline-first web app in React and IndexedDB to track spending; used weekly by a small group of friends and family.\n\nVolunteer: Community garden relaunch. Led a team of eight volunteers to clear and replant a disused plot, raising £1,200 in local donations for tools and seeds.\n\nWork: Stock-count process. Designed a new weekly stock-count sheet with the store manager, reducing count discrepancies over three months.", exampleLabel: "Illustrative project entries (fictional)" },
      { id: "group-projects", heading: "Group projects: describe your part", paragraphs: [
        "Most projects are team efforts, and that is fine. Say how big the team was and what you personally did: “With a team of four, designed the survey and analysed the results.” Readers trust a clear, modest description more than a vague claim to have led everything.",
      ] },
      { id: "links-and-portfolios", heading: "Links, portfolios, and GitHub", paragraphs: [
        "A link lets a reader see the work for themselves, but only if it works and the work is presentable. Check every link before you send your CV, give code repositories a short README, and remove unfinished or abandoned work from the places you link to.",
        "Only share work you have permission to show. For client or employer projects, describe the work without confidential details, or ask before including screenshots or links.",
      ] },
    ],
    faqs: [
      { question: "How many projects should I put on my CV?", answer: "Two or three relevant projects is usually enough. Choose the ones closest to the job, and describe them properly rather than listing many briefly." },
      { question: "Do personal projects count on a CV?", answer: "Yes. A personal project shows initiative and real skills, especially for students and career changers. Describe it as seriously as a work project, with what you made and what came of it." },
      { question: "Can I include an unfinished project?", answer: "Yes, if it already shows useful skills. Say what you have built so far, describe it as in progress, and do not overstate what it does." },
      { question: "Should projects go in experience or in their own section?", answer: "Use a separate Projects section for academic, personal, and volunteer projects. Keep projects you did as part of a job in that job’s bullet points." },
    ],
    takeaway: "Treat projects as evidence: name them clearly, say what your part was, and finish each bullet with a result.",
  },
];
