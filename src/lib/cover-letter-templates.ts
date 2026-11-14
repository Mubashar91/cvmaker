// Content for /cover-letter-maker/ only: when to use each layout, and two full example letters.
// The people, employers, and figures in the letters are fictional.

export const layoutAdvice: Record<"classic" | "modern" | "minimal", string> = {
  classic: "Serif type in a traditional business-letter block. Suits law, finance, the civil service, and any employer whose own website feels formal, and it prints cleanly in black and white.",
  modern: "A colour header band carries your name and contact details, with clean sans-serif text below. A good match for marketing, technology, and customer-facing roles, especially next to a CV with a coloured header.",
  minimal: "A fine accent rule and generous margins, with nothing else competing for attention. Choose it when you want the words to do all the work, or when the letter will mostly be read on screen in an applicant portal.",
};

export const exampleLetters = [
  {
    id: "experienced-letter", heading: "Experienced: senior care assistant to care coordinator", layout: "Classic layout",
    note: "Opens with the overlap between the current job and the new one, then gives two results with numbers and answers one point from the advert directly.",
    text: "Dear Mr Adeyemi,\n\nI am applying for the Care Coordinator role at Willowbank Home Care, advertised on your website. For the past five years I have worked as a senior care assistant with Meadowview Care, where I plan visit rotas for 22 carers and act as the first point of contact for families, so the mix of scheduling and people work in this role is the part of care I already do most days.\n\nIn my current role I rebuilt our weekly rota around clients' preferred visit times, which cut missed or late visits from around eight a month to two. I also guide new carers through their first fortnight of shadowing, and four of the six people I have mentored since 2024 have stayed with us for more than a year. I hold a Level 3 Diploma in Adult Care and am working towards Level 5 in Leadership and Management.\n\nYour advert mentions moving the team onto a digital care-planning system. I helped Meadowview make the same change in 2025, training colleagues on the app and checking records daily until the paper files could be retired, and I would be glad to bring that experience to Willowbank.\n\nThank you for considering my application. I would welcome the chance to discuss how I could support your team, and I am available for interview at short notice.\n\nYours sincerely,\n\nGrace Mensah",
  },
  {
    id: "career-change-letter", heading: "Career change: hospitality manager to trainee recruiter", layout: "Modern layout",
    note: "Explains the move in one sentence, then shows the recruitment work already done inside a hospitality job, and admits the sales side of the new role head-on.",
    text: "Dear Hiring Manager,\n\nI would like to apply for the Trainee Recruitment Consultant position at Northgate Talent, listed on your careers page. After seven years in hospitality, most recently as assistant manager of a 90-cover restaurant in Leeds, I am moving into recruitment because the part of my job I enjoy most is finding the right people and helping them succeed.\n\nAt Larder & Co I have handled front-of-house hiring from start to finish: writing adverts, screening applications, interviewing, and running trial shifts. Over the last two years I filled 31 vacancies, and six-month retention for new starters rose from roughly half to three in four after I introduced a structured first-week plan. I am used to working to targets, speaking to dozens of people a day, and staying calm when a busy Saturday doesn't go to plan.\n\nI know recruitment is a sales role as much as a people role, and I am ready for that. I met our upselling targets for wine and private dining in eight of the last ten quarters, and I have completed an introductory course in recruitment practice to understand the legal side, from right-to-work checks to fair interviewing.\n\nThank you for your time. I would be glad to talk about how my experience could transfer to your team.\n\nKind regards,\n\nTom Ridley",
  },
];
