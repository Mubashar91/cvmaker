import type { Guide } from "./guide-types";

// Country conventions are general guidance. Employers' own instructions always come first.
export const countryGuides: Guide[] = [
  {
    slug: "resume-vs-cv", title: "Resume vs CV: what is the difference?", published: "2026-11-09",
    seoTitle: "Resume vs CV: What Is the Difference?",
    description: "Resume or CV? Learn what each word means in the US, UK, Canada, and Australia, how long each should be, and which document an employer expects.",
    category: "Applying by country",
    intro: "Resume and CV can mean the same document or two very different ones, depending on where you apply. The difference matters less than you might fear: once you know which document an employer expects, the rules for writing a good one are much the same.",
    image: { kind: "template", id: "linear", alt: "Linear CV template: a plain one-column layout with standard headings that works as a resume or a CV", caption: "Linear template, fictional sample content. The same layout works whether the employer calls it a CV or a resume." },
    tool: { href: "/editor/", label: "Open the free CV maker", text: "One document, whichever name the employer uses. Build your CV or resume in the free editor and download a PDF." },
    sections: [
      { id: "short-answer", heading: "The short answer", paragraphs: [
        "In the United States and Canada, a resume is the short document most people send with a job application, usually one or two pages. A CV (curriculum vitae) is a longer, complete record of an academic or research career, used for roles in universities, research, and medicine.",
        "In the UK, Ireland, New Zealand, and much of Europe, CV is simply the everyday word for the document you send with a job application. It is close to what Americans call a resume. In Australia, resume and CV are both common and usually mean the same thing.",
        "So when a UK employer asks for a CV and a US employer asks for a resume, they are usually asking for the same kind of document: a focused summary of your experience, written for the job.",
      ], table: { caption: "What each word usually means", head: ["Where you apply", "Usual word", "What it means", "Typical length"], rows: [
        ["United States", "Resume", "A focused summary written for one job", "1–2 pages"],
        ["Canada", "Resume", "A focused summary written for one job", "1–2 pages"],
        ["UK and Ireland", "CV", "The same kind of document as a resume", "Usually 2 pages"],
        ["Australia", "Resume or CV", "Usually used interchangeably", "Often 2–3 pages"],
        ["Academic and research roles", "CV", "A complete record of research, teaching, and publications", "As long as it needs to be"],
      ] } },
      { id: "what-a-resume-is", heading: "What goes into a resume", paragraphs: [
        "A resume is selective. It brings forward the experience, skills, and results most relevant to the role, and leaves the rest out. Most resumes include contact details, a short professional summary, work experience in reverse chronological order, education, and skills. Projects, certifications, volunteering, and languages are added when they support the application.",
        "Because a resume is tailored, two applications can use two versions of it. Changing the order of your points, the skills you list, or the wording of your summary for each job is normal, as long as everything stays accurate.",
      ] },
      { id: "academic-cv", heading: "What makes an academic CV different", paragraphs: [
        "An academic or research CV aims to be complete rather than selective. Alongside education and employment, it typically lists publications, conference presentations, research grants, teaching, supervision, awards, and professional service. Its length grows with your career, and several pages are normal for experienced researchers.",
        "If a university, research institute, or medical training programme asks for a CV, check whether they mean this longer format. Their guidance or the job advert usually lists the sections they expect. For most other jobs, even at organisations connected with research, a resume-length document is what readers want.",
      ] },
      { id: "other-names", heading: "Other names you might see", paragraphs: ["A few related terms come up in job adverts and application guidance."], subsections: [
        { heading: "Personal statement, profile, or summary", paragraphs: ["In the UK, the short introduction at the top of a CV is often called a personal statement or profile. In the US and Canada, the same paragraph is usually called a professional summary, or a resume objective for early-career applicants. Folio calls it a Profile; the heading on your document can be whichever the employer expects."] },
        { heading: "Europass CV", paragraphs: ["Europass is a standard CV format provided by the European Union. Some employers and education providers in Europe ask for it specifically. If an advert does not mention Europass, a well-structured CV in your own layout is usually fine."] },
        { heading: "Biodata", paragraphs: ["In some countries in South Asia, a biodata is a document that includes personal details such as date of birth and family information. For jobs in the US, UK, Canada, or Australia, leave those details out and use a resume or CV format instead."] },
      ] },
      { id: "which-to-send", heading: "Which one should you send?", paragraphs: [
        "Use the word in the job advert. If it asks for a resume, send a resume; if it asks for a CV, check whether the role is academic. For a non-academic job, a focused document of one to two pages works in nearly every case, whatever it is called.",
        "You do not need a different design for each word. A clean layout with standard headings works as either. In Folio you can [start a CV in the free editor](/editor/), download a portable draft, and keep a separate version for each application.",
      ], bullets: [
        "US or Canadian job: a resume, usually one page early in your career and up to two pages with more experience.",
        "UK or Irish job: a CV, usually up to two pages.",
        "Australian job: a resume or CV, commonly two to three pages.",
        "Academic, research, or medical role: ask whether a full academic CV is expected.",
      ] },
      { id: "naming-your-file", heading: "Name the file the way the employer does", paragraphs: [
        "Name the PDF with your name and the word the employer used, such as “Priya Shah CV.pdf” or “Jordan Lee Resume.pdf”. It is a small detail, but it makes your file easy to find and shows that you read the advert carefully.",
      ] },
    ],
    faqs: [
      { question: "Is a CV longer than a resume?", answer: "In the US and Canada, yes: a CV means a full academic record and can run to many pages, while a resume is one or two pages. In the UK and Australia, CV usually means the same document as a resume, so the length is similar." },
      { question: "Can I use the same document for UK and US applications?", answer: "Mostly, yes. Change the spelling to match the country, adjust the length if needed, and check personal details: neither country expects a photo, date of birth, or marital status. Our guides to the [UK CV format](/tips/uk-cv-format/) and the [US resume format](/tips/us-resume-format/) cover the differences." },
      { question: "Should I call my document a CV or a resume?", answer: "Use the word the employer uses. If the advert does not say, use the word that is normal in that country: CV in the UK and Ireland, resume in the US and Canada, and either in Australia." },
    ],
    takeaway: "Follow the word the employer uses, and keep the document focused on the job. Only academic and research roles usually need a longer, complete CV.",
  },
  {
    slug: "uk-cv-format", title: "How to write a CV for jobs in the UK", published: "2026-11-09",
    seoTitle: "UK CV Format: How to Write a CV for Jobs in the UK",
    description: "Write a CV for UK jobs: the standard British CV format and a free template, what to leave out, length, right to work, and student CVs with GCSEs and A levels.",
    category: "Applying by country",
    intro: "A UK CV is a short, factual document, usually two A4 pages, that introduces your experience and makes it easy for an employer to shortlist you. British conventions are simple once you know them: no photo, no personal details beyond how to contact you, and a clear focus on evidence.",
    image: { kind: "example", id: "teacher", alt: "UK teacher CV example with QTS in the professional title, a short personal statement, and teaching roles listed most recent first", caption: "A fictional UK teacher CV from our CV examples, in the Classic template." },
    tool: { href: "/editor/", label: "Use the free UK CV maker", text: "Two A4 pages, British spelling, and no photo needed. Build your UK CV for free, with no sign-up or watermark." },
    sections: [
      { id: "uk-cv-structure", heading: "The standard UK CV structure", paragraphs: [
        "Most UK CVs follow the same order. Start with your name and contact details, followed by a personal statement, also called a profile. Then list your work experience, most recent first, followed by education, skills, and any other relevant sections such as certifications, volunteering, or languages.",
        "If you are a student or recent graduate, put education before experience, because it is your strongest evidence. If you have years of relevant experience, keep education short and place it after your roles.",
      ], bullets: [
        "Name and contact details: phone, email, town or city, and a LinkedIn or portfolio link if relevant.",
        "Personal statement: three to five lines about who you are and what you offer.",
        "Work experience: job title, employer, dates, and achievements for each role.",
        "Education: qualifications, institutions, and dates.",
        "Skills, plus optional sections such as certifications, languages, or volunteering.",
      ] },
      { id: "length-and-layout", heading: "Length, layout, and spelling", paragraphs: [
        "Two A4 pages is the usual length for a UK CV. One page can be enough for school leavers and some graduates; more than two is normally reserved for academic, medical, or very senior roles. A4 is the standard paper size in the UK, and it is the size Folio downloads.",
        "Use British spelling throughout: organised, programme, licence (as a noun), and colour. Write dates consistently, for example “Sept 2022 – Present”, and use the same style for every entry.",
      ] },
      { id: "what-to-leave-out", heading: "What to leave out of a UK CV", paragraphs: [
        "UK employers do not expect a photo, date of birth, age, marital status, nationality, or religion on a CV. Leaving them out keeps the focus on your experience and is consistent with UK equality law, which protects candidates from discrimination on characteristics such as age, race, religion or belief, and marriage and civil partnership.",
        "You also do not need your full home address; a town or city is enough. The line “References available on request” is no longer necessary, because employers ask for referees when they need them. Use the space for something useful instead.",
      ], bullets: ["A photo, unless the role is in acting, modelling, or presenting.", "Date of birth, age, or marital status.", "Your National Insurance number.", "Salary history, unless the advert asks for it.", "A full postal address."] },
      { id: "right-to-work", heading: "Mention your right to work when it helps", paragraphs: [
        "If your education or recent experience abroad might lead an employer to wonder whether you need a visa, a short line can answer the question early, for example “Full right to work in the UK” in your contact details or personal statement.",
        "If you need sponsorship, check whether the employer is a licensed sponsor before applying, and answer the application form’s questions accurately.",
      ] },
      { id: "school-leavers-and-students", heading: "UK CV format for students and school leavers", paragraphs: [
        "School leavers can list GCSEs and A levels, or Scottish Highers, BTECs, or T Levels, with grades, most recent first. If you have many GCSEs, summarise them on one line, for example “9 GCSEs at grades 9–5, including English and Maths”. University students and graduates can give their degree title, institution, dates, and expected or achieved classification, such as a 2:1.",
        "Part-time jobs, volunteering, the Duke of Edinburgh’s Award, sports clubs, and society roles all count as evidence. Our guide to [writing your first CV with no experience](/tips/your-first-cv/) shows how to describe them, and the [CV maker for students](/cv-maker-for-students/) starts you with an education-first layout.",
      ] },
      { id: "uk-cv-template", heading: "A free UK CV template to start from", paragraphs: [
        "Any clear layout without a photo suits UK applications. In Folio’s free CV maker, the [Classic](/templates/classic/) and [Professional](/templates/professional/) templates give a traditional British look, and [Clarity](/templates/clarity/) keeps everything in one plain column for online application systems. All of them download as A4 PDFs, the standard size for UK jobs.",
        "Start in the [free CV maker](/editor/), leave the photo out, and use British spelling. You can switch templates at any time without retyping, so it is easy to compare a traditional British CV template with a more modern one.",
      ] },
      { id: "application-forms", heading: "Application forms and supporting statements", paragraphs: [
        "Many UK public sector employers, including the NHS, local councils, and the civil service, use online application forms instead of, or as well as, a CV. These often include a supporting statement where you explain how you meet each point of the person specification. The civil service may also ask for examples against the behaviours in its Success Profiles framework.",
        "Use your CV as the source for your examples, but answer the questions the form asks, in the order it asks them. Copying your CV into a supporting statement rarely addresses the criteria directly.",
      ] },
      { id: "uk-cv-checklist", heading: "Before you send a UK CV", paragraphs: [
        "Run through the final points below, then use our [CV checklist](/tips/before-you-send/) and compare your CV with the advert in the [resume keyword checker](/resume-keyword-checker/).",
      ], bullets: ["Two A4 pages or fewer, unless the role calls for more.", "British spelling and consistent dates.", "No photo, date of birth, or marital status.", "A personal statement written for this job.", "Saved as a PDF, unless the employer asks for Word."] },
    ],
    faqs: [
      { question: "How long should a CV be in the UK?", answer: "Usually two A4 pages. School leavers and some graduates can fit everything on one page, and academic or medical CVs can be longer." },
      { question: "Do UK employers want a photo on a CV?", answer: "No. Leave it out unless you are applying for acting, modelling, or presenting work where your appearance is part of the job, or the employer asks for one." },
      { question: "Should I put references on my UK CV?", answer: "No. You do not need referees’ names or the line “References available on request”. Have two referees ready, and give their details when the employer asks." },
      { question: "Is a personal statement the same as a CV profile?", answer: "Yes. The short introduction at the top of a UK CV can be called a personal statement, personal profile, or profile. Our guide to [writing a CV profile](/tips/write-a-clear-profile/) has examples." },
    ],
    takeaway: "Keep a UK CV to two A4 pages, lead with a personal statement written for the job, and leave out personal details the employer does not need.",
  },
  {
    slug: "us-resume-format", title: "How to write an American resume", published: "2026-11-09",
    seoTitle: "US Resume Format: How to Write an American Resume",
    description: "How to write a resume for US jobs: the American resume format and a free template, length, what to leave out, and tips for students and international applicants.",
    category: "Applying by country",
    intro: "An American resume is a concise, achievement-focused summary of your experience, usually one page early in your career and up to two pages for most experienced candidates. US recruiters expect quick evidence of results, a clean reverse-chronological layout, and no personal details beyond how to reach you.",
    image: { kind: "template", id: "clarity", alt: "Clarity CV template: a plain single-column layout with standard headings and no graphics, suited to US resume conventions", caption: "Clarity template, fictional sample content. Plain structure, no graphics, standard headings." },
    tool: { href: "/editor/", label: "Build your US resume free", text: "A free resume builder for US jobs: one clear page, no photo, no sign-up, and no watermark. Then compare it with the job in the [resume keyword checker](/resume-keyword-checker/)." },
    sections: [
      { id: "us-resume-structure", heading: "The standard US resume format", paragraphs: [
        "The reverse-chronological resume is the most common format in the United States. It starts with your contact details and a short professional summary, then lists work experience from most recent to oldest, followed by education and skills.",
        "Contact details usually include your name, phone number, a professional email address, your city and state, and a LinkedIn profile or portfolio. A full street address is optional and often left out.",
      ], bullets: [
        "Header: name, phone, email, city and state, and LinkedIn or portfolio.",
        "Professional summary: two to four lines, or a short objective if you are early in your career.",
        "Work experience: job title, employer, location, month and year, and achievement bullets.",
        "Education: degree, school, and graduation year.",
        "Skills: technical skills, tools, certifications, and languages.",
      ] },
      { id: "length", heading: "How long should a US resume be?", paragraphs: [
        "One page is the usual expectation for students, recent graduates, and people with a few years of experience. Two pages are common for experienced professionals. Federal government jobs advertised on USAJOBS have their own resume requirements, including what each role must show, so follow the job announcement exactly.",
        "The standard paper size in the US is Letter (8.5 × 11 inches) rather than A4. Folio currently downloads CVs as A4 PDFs. Most resumes are read on screen, where the difference is rarely noticeable, but if an employer asks for Letter size or you plan to print, check the layout first.",
      ] },
      { id: "us-resume-for-students", heading: "US resume format for students", paragraphs: [
        "Students and recent graduates in the US usually use a one-page resume with education near the top. List your school, your degree or expected degree, and your graduation month and year. Add your GPA if it is strong, followed by relevant coursework, honors, or a capstone project.",
        "Campus jobs, internships, research assistant roles, volunteering, and leadership in student organizations all count as experience. Describe them with the same action-and-result bullets as any job. Our guides to [writing an internship CV](/tips/internship-cv/) and [describing projects](/tips/projects-on-a-cv/) show how.",
      ], bullets: ["One page, with education first.", "Expected graduation month and year.", "GPA only when it strengthens the application.", "Relevant coursework, projects, or a capstone.", "Campus jobs, internships, and student organizations."] },
      { id: "achievements", heading: "Lead with achievements and numbers", paragraphs: [
        "US resumes tend to be direct about results. Start each bullet with a strong verb, say what you did, and add the outcome: how much, how many, how fast, or what changed. Use figures you can explain in an interview, and describe your share of team results honestly.",
        "If you cannot measure a result, describe its scope instead: the size of the team, the number of customers, the budget you managed, or the systems you worked with. Our guide to [describing work experience](/tips/describe-your-experience/) has more examples.",
      ], example: "Reduced average ticket resolution time from 26 to 18 hours by rewriting the triage guide and training five new support agents.", exampleLabel: "Illustrative achievement bullet" },
      { id: "leave-out", heading: "What to leave off an American resume", paragraphs: [
        "Do not include a photo, date of birth, age, marital status, religion, or Social Security number. US employers are careful to avoid information connected with characteristics protected by federal equal employment opportunity laws, and these details add nothing to your application.",
        "References are not listed on the resume. Prepare a separate list of two or three references and share it when an employer asks. The line “References available upon request” is unnecessary.",
      ], bullets: ["A photo, date of birth, or age.", "Marital status, children, or religion.", "Your Social Security number or passport details.", "Salary history.", "A list of references."] },
      { id: "international-applicants", heading: "Applying from outside the US", paragraphs: [
        "If you are applying from another country, convert your document to US conventions: American spelling, one or two pages, and job titles a US reader will recognise, while staying accurate to the role you held. Give context for employers that a US reader may not know, for example “Northbridge Bank, a national retail bank with 3,000 staff”, and describe qualifications in terms of their closest US equivalent.",
        "Be clear about work authorization. If you are a US citizen or permanent resident, or already hold a visa that allows you to work, you can say so briefly. If you will need sponsorship, answer the employer’s questions accurately in the application form.",
      ] },
      { id: "us-resume-template", heading: "A free American resume template", paragraphs: [
        "For US jobs, choose a simple layout that fits on one page. [Clarity](/templates/clarity/) and [Linear](/templates/linear/) use plain, single-column structures that read well on screen and in applicant tracking systems, and [Compact](/templates/compact/) fits more onto one page. Leave the photo out.",
        "Build your resume in the [free CV maker](/editor/), which works as a free resume builder for US jobs with no sign-up or watermark. It downloads A4 PDFs; most US applications are read on screen, but check the layout if an employer asks for Letter size.",
      ] },
      { id: "summary-or-objective", heading: "Professional summary or resume objective?", paragraphs: [
        "A professional summary works best when you have relevant experience to sum up. A resume objective, which states the role you want and what you bring to it, is more useful for students, recent graduates, and career changers. Either way, keep it short and specific to the job.",
        "For a first draft you can edit, try the free [resume summary builder](/resume-summary-builder/) or the [resume objective generator](/resume-objective-generator/).",
      ] },
    ],
    faqs: [
      { question: "Should a US resume be one page?", answer: "One page is the usual expectation if you are a student, a recent graduate, or early in your career. Experienced candidates commonly use two pages. Federal applications on USAJOBS have their own rules." },
      { question: "Do I put my address on a US resume?", answer: "City and state are enough for most applications. Add a full address only if the employer asks for it." },
      { question: "Is a CV the same as a resume in the US?", answer: "No. In the US, a CV usually means a longer academic or research record. For most jobs, send a resume. See [resume vs CV](/tips/resume-vs-cv/) for the difference." },
      { question: "Should I include a photo on a resume for US jobs?", answer: "No. Photos are not expected on American resumes. For acting and modelling work, a headshot is usually requested separately." },
    ],
    takeaway: "Keep an American resume to one or two pages, lead each bullet with an action and a result, and leave out personal details such as a photo or date of birth.",
  },
  {
    slug: "canadian-resume-format", title: "How to write a Canadian resume", published: "2026-11-09",
    seoTitle: "Canadian Resume Format: How to Write a Resume for Canada",
    description: "Write a resume for jobs in Canada: the Canadian resume format, length, and a free template, what to leave out, bilingual skills, and advice for newcomers.",
    category: "Applying by country",
    intro: "A Canadian resume is a focused, one- or two-page document that shows your experience and results in reverse chronological order. Its conventions are close to the American resume, with a few Canadian details: no personal information such as age or a photo, consistent Canadian spelling, and room for language skills and volunteer work.",
    image: { kind: "template", id: "professional", alt: "Professional CV template: a formal single-column layout with serif headings and fine rules, suited to a Canadian resume", caption: "Professional template, fictional sample content." },
    tool: { href: "/resume-skills/", label: "Find skills for your resume", text: "Canadian employers look for clear, relevant skills. Browse common skills for your job and add the ones you can back up." },
    sections: [
      { id: "canadian-structure", heading: "The standard Canadian resume format", paragraphs: [
        "Most Canadian resumes open with contact details and a short professional summary, followed by work experience, education, and skills. Add certifications, volunteer experience, and languages when they support the application.",
      ], bullets: [
        "Contact details: name, phone, email, city and province, and a LinkedIn profile.",
        "Professional summary: three or four lines tailored to the role.",
        "Work experience: title, employer, city, dates, and achievement-focused bullets.",
        "Education, including the Canadian equivalent of international qualifications where you know it.",
        "Skills, languages, certifications, and volunteer experience.",
      ] },
      { id: "length-and-spelling", heading: "Length, paper size, and spelling", paragraphs: [
        "Aim for one to two pages. Recent graduates can usually fit everything on one page, and experienced candidates often use two. Canada uses Letter-size paper, like the US. Folio downloads A4 PDFs, which display normally on screen, so check the layout if an employer asks for Letter size or you plan to print.",
        "Canadian spelling mixes British and American conventions: centre, colour, and licence, but often organize and analyze. Choose one style and use it consistently. When applying to a particular organisation, it is sensible to follow the spelling in its job advert.",
      ] },
      { id: "what-to-leave-out", heading: "What to leave out", paragraphs: [
        "Canadian human rights laws protect applicants from discrimination on grounds such as age, sex, religion, marital or family status, and national or ethnic origin. Employers therefore do not expect these details on a resume. Leave out your photo, date of birth, marital status, and Social Insurance Number (SIN).",
      ], bullets: ["A photo.", "Date of birth or age.", "Marital status or the number of children you have.", "Your Social Insurance Number (SIN).", "References: provide them separately when asked."] },
      { id: "languages", heading: "Show your language skills", paragraphs: [
        "English and French are both official languages, and some roles, including many in the federal public service and in Quebec, require bilingual skills. List each language with an honest level, for example “French: professional working proficiency”. If you have taken a recognised language test, or hold a public service language rating, include the result.",
        "Folio has a dedicated Languages section. Add each language with its level, and two-column templates place it beside your skills.",
      ] },
      { id: "newcomers", heading: "Tips for newcomers to Canada", paragraphs: ["Moving your career to Canada usually means translating your experience for a new reader."], subsections: [
        { heading: "Explain your international experience", paragraphs: ["Employers may not recognise overseas companies or job titles. Add a short description of the organisation, such as its industry or size, and use a title a Canadian reader will understand while staying accurate to the role you held."] },
        { heading: "Translate your qualifications", paragraphs: ["If you have had your education assessed, for example through an educational credential assessment, give the Canadian equivalent next to your qualification. For regulated professions such as nursing, engineering, or teaching, state where you are in the provincial licensing process."] },
        { heading: "Show local connections where you have them", paragraphs: ["Canadian volunteering, courses, and bridging programs all help an employer picture you in the role. If you have an open work permit or permanent residence, you can mention it briefly in your summary or contact details."] },
      ] },
      { id: "canadian-resume-template", heading: "A free Canadian resume template", paragraphs: [
        "A clean, single-column layout suits Canadian applications, including for newcomers adapting an international CV. [Linear](/templates/linear/), [Clarity](/templates/clarity/), and [Professional](/templates/professional/) keep the structure plain and leave out the photo.",
        "Use the [free CV maker](/editor/) as a Canadian resume builder: add your English and French levels in the Languages section, and rename the extra section to Volunteering for Canadian volunteer work. It downloads A4 PDFs, which display normally on screen; check the layout if an employer asks for Letter size.",
      ] },
      { id: "no-experience", heading: "A resume for jobs in Canada with no experience", paragraphs: [
        "If you are a student or new to the Canadian job market, lead with education, projects, volunteer work, and transferable skills. Part-time jobs, co-op placements, and community involvement all count.",
        "Our guide to [writing your first CV](/tips/your-first-cv/) explains how to describe them, and the [CV maker for students](/cv-maker-for-students/) starts you with an education-first layout.",
      ] },
    ],
    faqs: [
      { question: "How long should a Canadian resume be?", answer: "One to two pages. Students and recent graduates usually need one page; experienced candidates often use two." },
      { question: "Should I include a photo on a Canadian resume?", answer: "No. Photos are not expected and can raise concerns about bias. Leave one out unless the role specifically asks for it." },
      { question: "Do I need to mention my work permit status?", answer: "It is optional, but a short note such as “Permanent resident” or “Open work permit” can answer an employer’s question early. Be accurate, and answer any application form questions honestly." },
      { question: "Should newcomers use a Canadian resume format?", answer: "Yes. Use the Canadian conventions: reverse chronological order, one to two pages, no personal details, and context for international employers and qualifications." },
    ],
    takeaway: "Keep a Canadian resume to one or two pages, leave out personal details, and give international experience the context a Canadian reader needs.",
  },
  {
    slug: "australian-resume-format", title: "How to create an Australian resume", published: "2026-11-09",
    seoTitle: "Australian Resume Format & Writing Guide",
    description: "Write a resume for Australian jobs: the standard format and a free template, length, referees, work rights, selection criteria, licences, and tips for students.",
    category: "Applying by country",
    intro: "Australian resumes tend to be a little longer and more detailed than American ones. Two to three pages is common, referees often appear at the end, and employers appreciate a clear statement of your work rights. The essentials are the same everywhere: relevant experience, clear results, and a layout that is easy to scan.",
    image: { kind: "template", id: "regent", alt: "Regent CV template: a single-column layout with a serif nameplate and a framed contact line", caption: "Regent template, fictional sample content." },
    tool: { href: "/editor/", label: "Build your Australian resume", text: "Two to three A4 pages, referees, and licences all have a place in the free editor." },
    sections: [
      { id: "australian-structure", heading: "The standard Australian resume format", paragraphs: [
        "Start with your name, phone, email, suburb and state, and a LinkedIn profile if you have one. Add a career summary, then key skills, employment history in reverse chronological order, education and training, and referees.",
      ], bullets: [
        "Contact details, including your suburb and state.",
        "Career summary: a short paragraph tailored to the role.",
        "Key skills, often as a short list near the top.",
        "Employment history, with achievements for each role.",
        "Education, training, licences, and certifications.",
        "Referees, or a note that they are available on request.",
      ] },
      { id: "length", heading: "How long should an Australian resume be?", paragraphs: [
        "Two to three A4 pages is common for experienced applicants, and one to two pages is usually enough for students and recent graduates. Longer is not better: every line should still be relevant to the job. Australia uses A4 paper, the size Folio downloads.",
        "Use Australian spelling, which mostly follows British conventions, such as organisation, colour, and centre.",
      ] },
      { id: "referees", heading: "Referees on an Australian resume", paragraphs: [
        "Australian resumes often end with two referees, usually recent managers or supervisors, with each person’s name, job title, organisation, and contact details. Ask permission before listing anyone, and let them know which roles you are applying for.",
        "If you would rather not share referees’ details with every application, write “Referees available on request” instead. In Folio, rename the Additional information section to Referees and put each referee on a separate line.",
      ], example: "Maria Lopez, Operations Manager, Harbourside Logistics: contact details available on request", exampleLabel: "Illustrative referee line (fictional)" },
      { id: "work-rights", heading: "State your work rights", paragraphs: [
        "Employers need to know that you can legally work in Australia. A short line near your contact details, such as “Australian citizen”, “Permanent resident”, or a description of your visa and its work conditions, saves them having to ask. Make sure it is accurate and up to date.",
      ] },
      { id: "selection-criteria", heading: "Key selection criteria for government jobs", paragraphs: [
        "Australian Public Service and state government roles often ask you to respond to key selection criteria, or to write a short pitch explaining your suitability. Address each criterion with a specific example, commonly using the STAR structure: the situation, the task, the action you took, and the result.",
        "Keep your resume consistent with the examples you use, so the reader can see where each one happened.",
      ] },
      { id: "licences-and-checks", heading: "Include licences and checks relevant to the role", paragraphs: [
        "Many Australian jobs require specific licences or checks. List the ones you hold and any expiry dates, for example a driver licence, a forklift licence, a Working with Children Check, a National Police Check, a construction White Card, or a Responsible Service of Alcohol (RSA) certificate for hospitality work. Folio’s Certifications section is the right place for them.",
      ] },
      { id: "australian-resume-template", heading: "A free Australian resume template", paragraphs: [
        "Australian resumes have room for more detail, so a layout with clear section headings helps a reader find your key skills and referees quickly. [Professional](/templates/professional/), [Regent](/templates/regent/), and [Clarity](/templates/clarity/) work well, and all download as A4 PDFs, the standard size in Australia.",
        "In the [free CV maker](/editor/), use the Certifications section for licences and checks, and rename the Additional information section to Referees. It works as a free Australian resume builder, with no sign-up or watermark.",
      ] },
      { id: "no-experience", heading: "A resume for Australian jobs with no experience", paragraphs: [
        "The Australian CV format for students follows the same structure with education first, then part-time and casual work, volunteering, and school or university activities. Casual roles in retail and hospitality are valuable evidence of reliability and customer service.",
        "See [how to write your first CV](/tips/your-first-cv/), and start with an education-first layout in the [CV maker for students](/cv-maker-for-students/).",
      ] },
    ],
    faqs: [
      { question: "How many pages should an Australian resume be?", answer: "Two to three pages is common for experienced applicants. Students and recent graduates can usually keep to one or two." },
      { question: "Do I need referees on my resume in Australia?", answer: "Including two referees at the end is common, but “Referees available on request” is also acceptable. Always ask your referees first." },
      { question: "Is it a resume or a CV in Australia?", answer: "Both words are used and usually mean the same document. Use the word in the job advert." },
      { question: "Should I include a photo on an Australian resume?", answer: "No. Photos are not expected for most jobs, and leaving one out keeps the focus on your experience." },
    ],
    takeaway: "An Australian resume can run to two or three pages, often ends with referees, and should state your work rights and any licences the role requires.",
  },
];
