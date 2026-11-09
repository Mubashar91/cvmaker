import type { Guide } from "./guide-types";

export const applicationGuides: Guide[] = [
  {
    slug: "how-to-write-a-cover-letter", title: "How to write a cover letter for a job application", published: "2026-11-09",
    seoTitle: "How to Write a Cover Letter (With Format & Example)",
    description: "Learn how to write a cover letter for a job application: the professional format, what to say in each paragraph, how long it should be, and a full example.",
    category: "Cover letters",
    intro: "A cover letter is your chance to connect your experience to one specific job, in your own voice. The best ones are short, specific, and clearly written for the employer reading them. This guide walks through the format paragraph by paragraph, with an example you can adapt.",
    image: { kind: "letter", id: "classic", alt: "Classic cover letter layout with the sender’s details at the top, the date, a greeting, four short paragraphs, and a sign-off", caption: "A fictional cover letter in the Classic layout of Folio’s free cover letter maker." },
    tool: { href: "/cover-letter-maker/", label: "Open the cover letter maker", text: "Fill in a few details and get an editable first draft in a professional layout. Copy, print, or download it as a PDF." },
    sections: [
      { id: "when-to-write-one", heading: "When you need a cover letter", paragraphs: [
        "Send a cover letter whenever the advert asks for one, and consider one whenever the application allows it. It is especially useful when you are changing careers, applying for your first job, explaining a gap, or applying to a smaller organisation where a person reads every application.",
        "If an online form only has a “message to the employer” box, a shortened cover letter works there too. A few clear sentences about why you fit the role are better than leaving it blank.",
      ] },
      { id: "cover-letter-format", heading: "The professional cover letter format", paragraphs: [
        "A cover letter usually fits on one page and follows a familiar business-letter layout. Use the same name and contact details as your CV, so the two documents look like a set.",
        "Aim for roughly 250 to 400 words. That is enough to make your case without repeating your CV.",
      ], bullets: [
        "Your name and contact details at the top.",
        "The date, and the employer’s name and address if you know them.",
        "A greeting, addressed to a named person where possible.",
        "An opening paragraph: the role, and why you are a good fit.",
        "One or two middle paragraphs: evidence that you can do the job.",
        "A closing paragraph: your interest, your availability, and a thank you.",
        "A sign-off and your name.",
      ] },
      { id: "who-to-address", heading: "Who to address it to", paragraphs: [
        "Use the hiring manager’s name if the advert gives it, or if you can find it on the organisation’s website. “Dear Ms Patel” or “Dear Alex Morgan” is fine. If you cannot find a name, “Dear Hiring Manager” is widely accepted and better than a guess.",
        "In British English, a letter to a named person traditionally ends with “Yours sincerely”, and one that begins “Dear Sir or Madam” ends with “Yours faithfully”. In the US and Canada, “Sincerely” is standard. “Kind regards” is accepted almost everywhere, especially by email.",
      ] },
      { id: "opening-paragraph", heading: "Write an opening that gets to the point", paragraphs: [
        "Name the role and give one strong reason you are a good fit. Mention where you saw the advert if it is relevant, or the person who referred you. Skip general sentences about how excited you are, and show your interest through specifics instead.",
      ], example: "I am applying for the Customer Support Team Lead role at Brightwell Energy. For the past three years I have run the evening support shift at Northgate Telecom, and I would like to bring that experience of coaching a team and resolving complex complaints to your customers.", exampleLabel: "Illustrative opening paragraph" },
      { id: "middle-paragraphs", heading: "Use the middle paragraphs for evidence", paragraphs: [
        "Pick two or three requirements from the job description and give an example for each: what you did, how you did it, and what changed. This is where you go beyond your CV, explaining the context behind a result or why a project matters for this job.",
        "Use the employer’s terminology for skills you genuinely have. The [resume keyword checker](/resume-keyword-checker/) shows which terms from the advert your application already covers.",
      ] },
      { id: "closing-paragraph", heading: "Close with confidence", paragraphs: [
        "Summarise why you are interested in the role, mention your availability if it matters, and thank the reader. A sentence such as “I would welcome the chance to discuss how I could help your team” is enough. You do not need to demand an interview or repeat your contact details in the paragraph.",
      ] },
      { id: "cover-letter-example", heading: "A complete cover letter example", paragraphs: [
        "This fictional example shows how the paragraphs fit together. Keep the structure, and replace every detail with your own.",
      ], example: "Dear Ms Okoro,\n\nI am applying for the Junior Data Analyst position at Harbour Insights, advertised on your careers page. I recently completed a BSc in Economics at Northbridge University, where my final-year project analysed five years of local transport data in Python and Power BI, and I would like to bring those skills to your client reporting team.\n\nDuring a summer internship at Lakeside Retail Group, I cleaned and combined weekly sales data from twelve stores and built a dashboard that the regional manager now uses in her Monday meetings. The first version had too many charts, so I interviewed three store managers and cut it down to the four figures they actually used.\n\nYour advert mentions SQL, stakeholder reporting, and attention to detail. I use SQL every week for coursework and projects, I have presented findings to non-technical audiences at the university’s data society, and I check every figure before it leaves my hands.\n\nThank you for considering my application. I would welcome the chance to discuss how I could support your team, and I am available to start in July.\n\nKind regards,\nAmara Lewis", exampleLabel: "Illustrative cover letter (fictional)" },
      { id: "cover-letter-mistakes", heading: "Common cover letter mistakes", paragraphs: ["Most weak cover letters share the same few problems, and each one is easy to fix."], bullets: [
        "Sending the same letter to every employer, or leaving another company’s name in it.",
        "Repeating your CV line by line instead of adding context.",
        "Writing more than one page.",
        "Opening with “To whom it may concern” when a name is easy to find.",
        "Focusing on what you want from the job rather than what you offer.",
        "Forgetting to proofread names, dates, and the job title.",
      ] },
    ],
    faqs: [
      { question: "How long should a cover letter be?", answer: "One page at most: usually three to five short paragraphs, or about 250 to 400 words." },
      { question: "Do I need a cover letter if it is optional?", answer: "Not always, but a short, tailored letter can help, especially if you are changing careers, applying for your first job, or explaining a gap." },
      { question: "Should my cover letter match my CV?", answer: "Yes. Use the same name, contact details, and a similar typeface, so the documents look like a set. The [free cover letter maker](/cover-letter-maker/) can reuse the details from the CV open in your editor." },
      { question: "Can I put my cover letter in the body of an email?", answer: "Yes, if the employer asks you to apply by email. Write a shorter version in the message and attach your CV, or attach both as PDFs if the advert asks for a separate letter." },
    ],
    takeaway: "Write a short letter for one job: name the role, give two or three pieces of evidence, and close politely. Specific beats enthusiastic.",
  },
  {
    slug: "ats-friendly-cv", title: "How to make your CV ATS-friendly", published: "2026-11-09",
    seoTitle: "How to Make Your CV or Resume ATS-Friendly",
    description: "What an applicant tracking system does with your CV, and how to make your resume ATS-friendly: format, headings, file type, and keywords without stuffing.",
    category: "Applications & ATS",
    intro: "Many employers use an applicant tracking system (ATS) to collect and organise applications. You do not need tricks to get through one. A clearly structured CV, standard headings, real text, and honest use of the job’s language do most of the work, and they help the human reader too.",
    image: { kind: "template", id: "clarity", alt: "Clarity CV template: a plain single-column layout with standard headings and no graphics", caption: "Clarity template, fictional sample content. One reading order, standard headings, no graphics." },
    tool: { href: "/resume-keyword-checker/", label: "Check your keywords", text: "Paste the job description and your CV to see which terms you already cover. Nothing is uploaded." },
    sections: [
      { id: "what-an-ats-does", heading: "What an applicant tracking system actually does", paragraphs: [
        "An ATS is software that stores applications, moves candidates through hiring stages, and lets recruiters search and filter them. Many systems also parse your CV, copying details such as your name, job titles, and dates into fields, and some let recruiters search applications for skills or compare them with the job’s requirements.",
        "Each employer configures its system differently, and in most cases people still make the decisions. The aim is not to “beat” software, but to make sure nothing gets lost when your CV is read by it, and that a recruiter searching for the right skills can find you.",
      ] },
      { id: "keep-the-format-simple", heading: "Keep the format simple and readable", paragraphs: [
        "Parsers read text in order. A single-column layout with standard headings is the safest choice when you know an ATS is involved. Two-column designs often parse correctly, but text in separate boxes or side panels is more likely to be read out of order.",
        "Folio’s [ATS-friendly templates](/templates/category/ats-friendly/), including Clarity and Linear, follow these rules by design.",
      ], bullets: [
        "Use standard section headings: Profile, Work experience, Education, Skills.",
        "Keep your name and contact details in the body of the page, not only in a header or footer.",
        "Avoid putting important text in images, charts, or icons.",
        "Write dates in a consistent format next to each role.",
        "Choose a common, readable typeface and avoid laying out text in tables.",
      ] },
      { id: "file-type", heading: "Send the file type the employer asks for", paragraphs: [
        "Follow the application instructions first. If an employer asks for a Word document, send one. Otherwise, a PDF with selectable text is widely accepted and keeps your layout intact. Every Folio PDF contains real text, not a picture of text.",
        "Test your file: open the PDF, select all the text, and paste it into a plain text editor. If the words appear in a sensible order, a parser can read them too. Folio’s Review CV tab also shows your CV as plain text.",
      ] },
      { id: "use-keywords-honestly", heading: "Use the job’s keywords honestly", paragraphs: [
        "Recruiters often search for specific skills, tools, and qualifications. Read the job description, note the terms that describe what you can genuinely do, and use the same wording in your CV, ideally with evidence beside it. If the advert says “stakeholder management”, a line about how you managed stakeholders is stronger than a list of synonyms.",
        "Spell out acronyms once, for example “Search engine optimisation (SEO)”, so both versions appear. Write the names of tools exactly: JavaScript, not Javascript.",
        "The free [resume keyword checker](/resume-keyword-checker/) compares your CV with a job description and lists matching and missing terms, entirely in your browser.",
      ] },
      { id: "what-to-avoid", heading: "What to avoid", paragraphs: [
        "Some advice online promises an “ATS score” or claims that most CVs are rejected by software. Treat such claims with caution: systems and employer settings differ, and no outside tool can see exactly how an employer’s system will treat your application.",
      ], bullets: [
        "Hidden or white text packed with keywords. Recruiters can see the parsed text, and it looks dishonest.",
        "Listing skills you could not discuss in an interview.",
        "Unusual section names, such as “My journey” instead of Work experience.",
        "Text inside images, including a logo-style name.",
        "Abbreviations without an explanation.",
      ] },
      { id: "ats-checklist", heading: "A quick ATS-friendly checklist", paragraphs: [
        "Then read it as a person would. A CV that software can parse easily should also be easy for a recruiter to scan quickly.",
      ], bullets: ["A single column with standard headings.", "Contact details in the body of the document.", "Dates and job titles as plain text.", "Real, selectable text in the PDF.", "Key terms from the advert, used where you can back them up.", "The file type the employer requested."] },
    ],
    faqs: [
      { question: "What is an ATS-friendly CV?", answer: "A CV that applicant tracking systems can read accurately: real text, a clear reading order, standard headings, and consistent dates. The same qualities make it easier for people to read." },
      { question: "Are PDFs ATS-friendly?", answer: "A PDF with selectable text is accepted by most systems. If the employer asks for a Word document, send one. Avoid scanned PDFs, which contain a picture of the page rather than text." },
      { question: "Can a free tool tell me my ATS score?", answer: "Not reliably. Each employer’s system and settings are different, and outside tools cannot see them. A keyword comparison shows how closely your wording matches the advert, which is useful, but it is not a prediction." },
      { question: "Do two-column templates work with an ATS?", answer: "Often they do, but a single-column layout is the safest choice when you know your CV will be parsed. If you prefer two columns, copy the text from your PDF to check that it reads in order." },
    ],
    takeaway: "Make your CV easy to read in order: one column, standard headings, real text, and the job’s own language wherever it is true for you.",
  },
  {
    slug: "common-cv-mistakes", title: "Common CV mistakes that can affect your job application", published: "2026-11-09",
    seoTitle: "15 Common CV Mistakes to Avoid (and How to Fix Them)",
    description: "Avoid the most common CV mistakes, from typos and vague profiles to missing results and unnecessary personal details, with a simple fix for each one.",
    category: "Final checks & applications",
    intro: "Most CV mistakes are small and easy to fix, but together they can make a strong candidate look careless or generic. Here are fifteen that come up often, grouped by where they appear, with a practical fix for each.",
    image: { kind: "template", id: "classic", alt: "Classic CV template: a centred serif name, fine rules under section headings, and consistently aligned dates", caption: "Classic template, fictional sample content. Consistent dates and headings avoid several common mistakes." },
    tool: { href: "/editor/", label: "Review your CV for free", text: "The Review CV tab in the editor checks for missing contact details, incomplete entries, undated roles, long profiles, and placeholder text." },
    sections: [
      { id: "presentation-mistakes", heading: "Presentation mistakes", paragraphs: ["These are the first things a reader notices, before they read a single achievement."], subsections: [
        { heading: "1. Typos and inconsistent formatting", paragraphs: ["Spelling mistakes, mixed date formats, and inconsistent capitalisation suggest a lack of care, especially for roles that ask for attention to detail. Fix: read the CV aloud, check every date against one format, and ask someone else to proofread it."] },
        { heading: "2. A design that is hard to read", paragraphs: ["Tiny fonts, low-contrast colours, and crowded pages make a reader work harder. Fix: use body text of a comfortable size, one accent colour, and enough space between sections. If the content does not fit, edit the content rather than shrinking the type."] },
        { heading: "3. Too long, or too short", paragraphs: ["A four-page CV for a junior role buries the best evidence; one that leaves out relevant experience undersells you. Fix: follow the usual length for the country and role, and cut anything that does not support this application. See [how long a CV should be](/tips/keep-it-focused/)."] },
      ] },
      { id: "content-mistakes", heading: "Content mistakes", paragraphs: ["These decide whether a reader understands what you can do."], subsections: [
        { heading: "4. A generic profile", paragraphs: ["“Hardworking team player seeking new challenges” could describe anyone. Fix: say what you do, what you are good at, and what you want next, with one specific detail. The [resume summary builder](/resume-summary-builder/) gives you an editable starting point."] },
        { heading: "5. Duties instead of achievements", paragraphs: ["Listing responsibilities tells a reader what the job was, not how well you did it. Fix: start each bullet with an action and finish with a result, scale, or outcome. Our guide to [describing work experience](/tips/describe-your-experience/) shows how."] },
        { heading: "6. Not tailoring the CV to the job", paragraphs: ["Sending the same CV to every role means your most relevant evidence is not always near the top. Fix: reorder bullets, adjust the profile, and use the employer’s language for skills you genuinely have. The [resume keyword checker](/resume-keyword-checker/) helps you compare."] },
        { heading: "7. Unexplained acronyms and jargon", paragraphs: ["Internal team names and abbreviations mean little outside your organisation. Fix: spell out acronyms once, and describe tools and processes in terms an outside reader recognises."] },
        { heading: "8. Claims you cannot back up", paragraphs: ["Overstated titles, inflated figures, and skills you have barely used are easy to expose in an interview or a reference check. Fix: keep every claim accurate, and be ready to give an example for each skill you list."] },
      ] },
      { id: "personal-detail-mistakes", heading: "Mistakes in personal details", paragraphs: ["Small details at the top of the page can cost you an interview."], subsections: [
        { heading: "9. Missing or outdated contact details", paragraphs: ["An old phone number or a typo in an email address means an employer cannot reach you. Fix: test your email address and phone number before you send, and keep any links current."] },
        { heading: "10. An unprofessional email address", paragraphs: ["Fix: use a simple address based on your name, created just for applications if necessary."] },
        { heading: "11. Personal details the employer does not need", paragraphs: ["In the UK, US, Canada, and Australia, a photo, date of birth, marital status, or ID number is not expected on a CV. Fix: leave them out unless the advert asks for them. Our guides to the [UK](/tips/uk-cv-format/), [US](/tips/us-resume-format/), [Canadian](/tips/canadian-resume-format/), and [Australian](/tips/australian-resume-format/) formats explain the local conventions."] },
      ] },
      { id: "sending-mistakes", heading: "Mistakes when you send it", paragraphs: ["The last step is where good CVs most often trip up."], subsections: [
        { heading: "12. Ignoring the application instructions", paragraphs: ["If the employer asks for a Word file, a cover letter, or answers to specific questions, missing them can remove you from consideration. Fix: read the advert twice and make a short checklist before you apply."] },
        { heading: "13. A confusing file name", paragraphs: ["“CV_final_v3_NEW.pdf” looks unfinished. Fix: name the file with your name and the document type, such as “Jordan Taylor CV.pdf”."] },
        { heading: "14. Gaps with no context", paragraphs: ["A gap is not a problem in itself, but a reader may wonder about it. Fix: if it helps, add a short, honest line such as “Career break: caring responsibilities”, plus anything relevant you did during that time."] },
        { heading: "15. Not checking the final PDF", paragraphs: ["Page breaks, missing sections, and broken links only show up in the finished file. Fix: open the PDF you are about to send, check every page, and use the [final CV checklist](/tips/before-you-send/)."] },
      ] },
    ],
    faqs: [
      { question: "What is the most common CV mistake?", answer: "Spelling and grammar mistakes are among the most common, and the easiest to fix. Read your CV aloud, and ask someone else to check it." },
      { question: "Is a two-page CV a mistake?", answer: "No. Two pages is normal in the UK and for experienced candidates in many countries. The mistake is filling space with information that does not help the application." },
      { question: "Should I explain gaps in my CV?", answer: "You do not have to, but a short, honest line can answer a reader’s question before it comes up." },
    ],
    takeaway: "Proofread, tailor, and check the final PDF. Most CV mistakes disappear with one careful read and a clear sense of what this employer needs.",
  },
];
