import type { LandingPage } from "../landing-types";
import { entry } from "../sample-cv";

// Every statement and the worked example are fictional. Sophie, Heathfield Community Pharmacy,
// Morgan's Health Store, and Rhydwen High School are invented.
const statement = (heading: string, text: string) => ({ heading, paragraphs: [text] });

export const personalStatementExamples: LandingPage = {
  slug: "personal-statement-examples",
  kicker: "CV writing · Examples",
  h1: "Personal statement examples for your CV",
  intro: "Eighteen CV personal statement examples, sorted by career stage and by job, plus a fill-in template and a full CV that shows a statement doing its job. These are for the short paragraph at the top of a CV, not a UCAS statement for a university application.",
  points: ["18 examples for UK jobs", "Fill-in template", "Full worked example CV", "Free builder for your own"],
  sections: [
    {
      id: "what-it-is", heading: "What a CV personal statement is (and isn't)",
      paragraphs: [
        "A CV personal statement, also called a personal profile, is three to five sentences at the top of your CV. It tells an employer who you are professionally, the strongest evidence you bring, and the kind of job you want next. Recruiters often read it first and use it to decide whether the rest of the CV deserves a careful look.",
        "It isn't a UCAS personal statement, the 4,000-character piece of writing about why you want to study a subject at university, which has its own format and rules. If you searched for personal statement examples for a degree application, these won't help; your school or college careers adviser and the universities themselves publish guidance for that.",
      ],
    },
    {
      id: "template", heading: "A personal statement template you can fill in",
      paragraphs: [
        "Most strong statements follow the same four moves in roughly this order. Use the template as scaffolding, then rewrite it until it sounds like you; a recruiter can spot a statement that was only filled in.",
        "Keep it between 50 and 150 words. Write in the first person without the word \"I\" at the start of each sentence, and never in the third person: \"Experienced chef\" reads naturally, \"Sam is an experienced chef\" doesn't.",
      ],
      example: { label: "Template", text: "[Job title or situation] with [length of experience] in [setting or sector]. [One or two strengths], shown by [a specific result or responsibility]. [Qualification or training, if it matters for the role]. Looking for [the job you want] where I can [what you'll contribute]." },
    },
    {
      id: "early-career", heading: "Personal statement examples for school leavers, students, and graduates",
      paragraphs: ["Without much work history, the evidence comes from school, university, volunteering, and part-time jobs. Be specific about what you did and when you're available."],
      subsections: [
        statement("School leaver", "Motivated school leaver with nine GCSEs, including English and Maths at grade 6, looking for a first job in retail. As form representative for two years I passed classmates' concerns on to staff, and I helped run the school Christmas fair stall, handling cash and keeping the stock tidy. Available at weekends and full time from July."),
        statement("University student", "Second-year Accounting and Finance student looking for a summer internship in audit. I manage a £4,000 budget as treasurer of the university hiking society and have passed the first two modules of the ICAEW Certificate in Finance, Accounting and Business. Comfortable with Excel and used to meeting coursework deadlines alongside a part-time job."),
        statement("Civil engineering graduate", "Civil engineering graduate (MEng, 2:1) with a 12-week site placement on a highways resurfacing scheme, where I helped prepare temporary traffic management plans and recorded daily progress for the site agent. Confident with AutoCAD and Civil 3D, and keen to start my path to chartership with the Institution of Civil Engineers on a graduate scheme."),
      ],
    },
    {
      id: "career-change", heading: "Personal statement examples for career changers and returners",
      paragraphs: ["When the job title on your CV doesn't match the one you want, the statement has to make the connection. Name the move, then point to the evidence that it makes sense."],
      subsections: [
        statement("Hospitality to IT support", "Restaurant supervisor moving into IT support after five years of fixing problems under pressure, from till systems to rota software. Recently earned the CompTIA A+ certification and built a home lab to practise Windows and network troubleshooting. Patient with non-technical people and used to explaining a fix in plain words while a queue forms."),
        statement("Leaving the armed forces", "Royal Logistic Corps corporal leaving the Army after nine years, with experience managing stores worth over £2m, planning vehicle movements, and leading teams of up to 12. Holds a Level 3 Diploma in Warehousing and Storage and a full category C licence. Looking for a transport or warehouse supervisor role in the North East."),
        statement("Returning after a career break", "Office administrator returning to work after five years at home with my children, with seven years' earlier experience running diaries, minutes, and supplier invoices for a busy estate agency. Recently refreshed my skills with a Microsoft 365 course and volunteer as secretary of my children's school PTA. Looking for a part-time administration role of about 25 hours a week."),
      ],
    },
    {
      id: "by-job", heading: "Personal statement examples by job",
      paragraphs: ["Twelve statements for common UK roles. Each names the qualification or licence that the job usually asks for, because recruiters often scan for it before anything else."],
      subsections: [
        statement("Retail store manager", "Store manager with eight years in fashion retail, currently running a £3.5m store with a team of 28. Lifted conversion by four percentage points in a year by redesigning fitting-room service, and promoted three team members to supervisor. Looking to take on a larger flagship store or an area role."),
        statement("Software tester", "Software tester with four years on web and mobile banking apps, writing test plans and automated checks in Cypress and Playwright. Caught a payment-rounding defect before release that would have affected 40,000 customers. ISTQB Foundation certified and looking for a senior QA role in an agile team."),
        statement("Bookkeeper", "AAT-qualified bookkeeper with six years keeping the books for 15 small businesses at a time, from bank reconciliations to VAT returns under Making Tax Digital. Fluent in Xero, QuickBooks, and Dext, and known for month-end packs that clients actually read. Looking for an in-house role with a growing business."),
        statement("Hairdresser", "Qualified hairdresser (NVQ Level 3) with five years in a busy town-centre salon and around 150 regular clients. Specialise in colour correction and balayage, and train two apprentices through their Level 2. Looking for a senior stylist position in a salon that invests in education."),
        statement("Security officer", "SIA-licensed security officer, holding door supervisor and CCTV licences, with six years in retail and event security. Calm and firm in conflict, with a record of resolving incidents without escalation, and trained in first aid at work. Looking for a site supervisor role with responsibility for rotas and incident reports."),
        statement("Event coordinator", "Event coordinator with four years organising conferences and award dinners for 50 to 600 guests at a business events agency. Manage venues, suppliers, and budgets of up to £150,000, and run on-the-day logistics from a single checklist. Looking to step up to event manager in the corporate or charity sector."),
        statement("Vehicle technician", "Level 3 light vehicle technician with seven years at a franchised dealership, carrying out diagnostics, servicing, and repairs on petrol, diesel, and hybrid cars. Holds an IMI Level 2 award in hybrid and electric vehicle maintenance and a strong first-time-fix record. Looking for a master technician role."),
        statement("Mental health support worker", "Mental health support worker with three years in supported housing, helping adults with complex needs manage tenancies, medication, and appointments. Trained in de-escalation and adult safeguarding, and skilled at writing clear, person-centred support plans. Looking for a senior support worker role leading a small team."),
        statement("Property negotiator", "Property negotiator with three years in a high-volume sales and lettings branch, conducting up to 25 viewings a week and agreeing 60 sales last year. Confident on the phone, organised with a busy diary, and qualified with Propertymark at Level 3 in residential lettings. Looking for a senior negotiator or valuer role."),
        statement("Bartender", "Bartender with four years in cocktail bars and a busy city-centre pub, serving up to 400 covers on a Saturday. Personal licence holder, trained in cellar management, and responsible for a seasonal cocktail menu that raised drinks spend per head. Looking for a bar supervisor role."),
        statement("Procurement assistant", "Procurement assistant with two years supporting the buying team at a regional housing association, raising purchase orders, chasing quotes, and keeping the contracts register current. Studying for CIPS Level 4 and confident with Excel and e-procurement systems. Looking for a buyer role with my own categories to manage."),
        statement("Library assistant", "Library assistant with three years in a busy public library, running weekly rhyme-time sessions and helping residents with computers, printing, and online forms. Comfortable with library management systems and patient with first-time internet users. Looking for a senior library assistant role with more responsibility for events."),
      ],
    },
  ],
  example: {
    heading: "Worked example: a personal statement at the top of a full CV",
    paragraphs: ["A statement only works if the rest of the CV backs it up. Here is a complete CV for a pharmacy assistant; the profile at the top is her personal statement, and every claim in it is supported further down."],
    cv: {
      id: "personal-statement", template: "elegant",
      person: { name: "Sophie Turner", headline: "Pharmacy Assistant", location: "Cardiff", phone: "07700 900563", email: "sophie.turner@example.com" },
      summary: "Pharmacy assistant with three years in a busy community pharmacy, dispensing up to 350 items a day under pharmacist supervision and running the repeat prescription service for two care homes. Completed a Level 2 pharmacy services qualification and trusted to train new counter staff on medicines sales. Looking for a pharmacy technician apprenticeship as the next step towards registration.",
      experience: [
        entry("Pharmacy Assistant", "Heathfield Community Pharmacy, Cardiff", "Sep 2023 – Present", [
          "Dispense up to 350 items a day under pharmacist supervision, with accuracy checks recorded daily",
          "Run repeat prescriptions for two local care homes, around 180 residents, including monitored dosage systems",
          "Advise customers at the counter and refer to the pharmacist using the WWHAM questions",
          "Reorganised dispensary stock, halving the number of items out of stock at the weekly order",
        ]),
        entry("Retail Assistant", "Morgan's Health Store, Cardiff", "Jun 2021 – Aug 2023", ["Advised customers on vitamins and supplements and managed the weekly stock delivery"]),
      ],
      education: [
        entry("Level 2 Certificate in Pharmacy Service Skills", "GPhC-accredited distance course", "2023 – 2024"),
        entry("A levels: Biology (B), Chemistry (C)", "Rhydwen High School, Cardiff", "2019 – 2021"),
      ],
      skills: "Pharmacy: supervised dispensing, repeat prescriptions, monitored dosage systems, stock control\nPeople: counter service, confidential conversations, training new staff\nSystems: pharmacy PMR software, NHS electronic prescriptions",
      languages: "Welsh: conversational",
    },
    notes: [
      { heading: "Three sentences, three jobs", text: "The first sentence says who she is and where, the second gives evidence with numbers, and the third names the job she wants. Nothing is wasted on adjectives." },
      { heading: "Every claim is backed up below", text: "350 items, two care homes, and the training role all reappear in her work history with detail, so the statement reads as a summary rather than a boast." },
      { heading: "A next step an employer can picture", text: "\"Pharmacy technician apprenticeship\" is a real, specific route. A vague goal such as \"a challenging role\" tells an employer nothing about fit." },
    ],
  },
  after: [
    {
      id: "leave-out", heading: "What to leave out of a personal statement",
      paragraphs: ["Recruiters read hundreds of statements, and the same weak phrases appear in most of them. Cut these and your statement is already better than average."],
      bullets: [
        "Unproven adjectives such as hard-working, passionate, motivated, or team player, unless the next words prove them.",
        "Personal details: age, marital status, health, or family circumstances, beyond a plain mention of a career break.",
        "Salary expectations and reasons for leaving your current job; save both for the interview.",
        "Generic goals like \"a challenging role in a dynamic company\"; name the actual role instead.",
        "Anything you couldn't explain if an interviewer asked \"tell me more about that\".",
      ],
    },
    {
      id: "tailor", heading: "Tailor the statement for each application",
      paragraphs: [
        "Keep a master version, then adjust two things for every job: the role you're aiming for, and which piece of evidence comes first. If the advert stresses training others, lead with your mentoring; if it stresses accuracy, lead with your error rate. That takes five minutes and shows the employer you read their advert.",
        "Stuck on the first draft? The free [resume summary builder](/resume-summary-builder/) turns your job title, skills, and one achievement into three editable drafts you can refine into your own statement. For more on structure, read the guide to [writing a clear CV profile](/tips/write-a-clear-profile/).",
      ],
    },
  ],
  faqs: [
    { question: "How long should a CV personal statement be?", answer: "Between 50 and 150 words, which is usually three to five sentences. Anything longer pushes your work experience down the first page, where a recruiter may not reach it." },
    { question: "Should a personal statement be in the first or third person?", answer: "First person, but without starting every sentence with \"I\". Drop the pronoun, as in \"Experienced bookkeeper with...\". The third person (\"Sophie is...\") sounds odd when you've written it yourself." },
    { question: "Is a personal statement the same as a CV profile or summary?", answer: "Yes. In the UK it's called a personal statement or personal profile; in the US it's a resume summary. The purpose and the length are the same." },
    { question: "Do I need a different personal statement for each job?", answer: "You need a slightly different one. Keep the core, then change the target role and the order of your evidence to match each advert." },
    { question: "Can I use these examples as they are?", answer: "Use them as models, not as finished text. The people and figures are fictional, and a statement only works when every claim in it is true for you." },
  ],
  related: [
    { href: "/resume-summary-builder/", label: "Free resume summary builder" },
    { href: "/tips/write-a-clear-profile/", label: "How to write a CV profile" },
    { href: "/tips/teacher-cv-personal-statement/", label: "Teacher CV personal statement guide" },
    { href: "/cv-examples/", label: "CV examples for UK jobs" },
  ],
};
