import { emptyCV, type CV, type Entry, type Section, type Template } from "./model";
import { isVisible, scheduled } from "./scheduled-pages";
import type { SampleCVData } from "./sample-cv";

// Job-specific CV examples. Every person, employer, school, and figure in these CVs is fictional
// and exists only to show how a strong CV for the role can read. Phone numbers use Ofcom's
// reserved drama range, and email addresses and websites use reserved example domains,
// so nothing reaches a real person.
type EntryData = Omit<Entry, "id">;
const entry = (title: string, organization: string, dates: string, lines: string[] = []): EntryData => ({ title, organization, dates, description: lines.join("\n") });

export interface CVExample {
  slug: string; job: string; category: string; template: Template;
  seoTitle: string; description: string; intro: string;
  person: { name: string; headline: string; location: string; phone: string; website?: string };
  summary: string; skills: string; languages?: string; additional?: { title: string; text: string };
  /** Section order when it differs from the default, e.g. education first for students. */
  sectionOrder?: Section[];
  experience: EntryData[]; education: EntryData[]; projects?: EntryData[]; certifications?: EntryData[];
  profiles: { label: string; text: string }[];
  bullets: string[];
  skillGroups: { label: string; items: string[] }[];
  tips: { heading: string; text: string }[];
  guides: string[];
  /** Job-specific questions, shown as a FAQ section with FAQPage markup. Written fresh for each job. */
  faqs?: { question: string; answer: string }[];
  /** An optional second full example on the page, for a closely related search (written for this page only). */
  extraExample?: { id: string; heading: string; intro: string; cv: SampleCVData; notes: string[] };
  /** Optional heading and opening paragraph for the template section, written for this job. */
  templateSection?: { heading: string; text: string };
}

/** Every example, including scheduled ones (for preview images and social cards). */
export const allCVExamples: CVExample[] = [
  {
    slug: "nurse", job: "Nurse", category: "Healthcare", template: "professional",
    seoTitle: "Nurse CV Example — Free Template & Writing Tips",
    templateSection: { heading: "Use this nurse CV as a resume template", text: "Applying to a US hospital or an international agency? The same content works as a nurse resume template: rename the profile to Summary, put your registration in the headline (an NMC PIN in the UK, a state licence in the US), and keep the clinical experience exactly as it is. The Word download changes to US Letter in two clicks." },
    description: "See a complete nurse CV example with a profile, clinical experience, and skills. Adapt the bullet points, edit it free, and download your PDF.",
    intro: "Nursing CVs are read by people who need to see quickly that you are registered, safe, and suited to the ward or setting. This example puts registration, clinical experience, and patient-focused results where a nurse manager will look first.",
    person: { name: "Priya Shah", headline: "Registered Nurse (Adult)", location: "Leeds, United Kingdom", phone: "+44 7700 900101" },
    summary: "NMC-registered adult nurse with four years of experience on busy acute medical wards. Confident with patient assessment, medication rounds, and coordinating care with doctors, therapists, and families. Known for calm communication and for supporting newly qualified colleagues.",
    experience: [
      entry("Staff Nurse, Acute Medical Unit", "Riverside General Hospital", "2022 – Present", ["Assess, plan, and deliver care for up to eight patients per shift on a 28-bed acute unit.", "Administer medication and IV therapy in line with hospital policy and NMC standards.", "Lead handovers and escalate deteriorating patients using NEWS2 observations.", "Support student nurses as a practice supervisor and help newly qualified nurses through preceptorship."]),
      entry("Staff Nurse, Care of Older People", "Northgate Community Hospital", "2020 – 2022", ["Delivered person-centred care for older adults, including patients living with dementia.", "Worked with physiotherapists and social workers to plan safe discharges.", "Updated care plans and risk assessments for falls, pressure areas, and nutrition."]),
    ],
    education: [entry("BSc (Hons) Adult Nursing", "Northbridge University", "2017 – 2020")],
    certifications: [entry("NMC registration, Adult Nursing", "Nursing and Midwifery Council", "2020"), entry("Immediate Life Support (ILS)", "Resuscitation Council UK", "2024")],
    skills: "Clinical: Patient assessment, medication and IV administration, wound care, catheterisation\nSystems: Electronic patient records, e-rostering\nCommunication: Handovers, family updates, safeguarding referrals",
    profiles: [
      { label: "Experienced nurse moving to a senior role", text: "Adult nurse with six years in emergency and acute care, including two years as shift coordinator. Experienced in managing bed flow, supervising nurses and healthcare assistants, and leading audit actions on falls prevention." },
      { label: "Newly qualified nurse", text: "Newly qualified adult nurse with placements in acute surgery, community nursing, and general practice. Managed a small group of patients under supervision during a 12-week final placement on a surgical ward. Available to start once NMC registration is confirmed." },
      { label: "Returning to practice", text: "Registered nurse returning after a career break, having completed a Return to Practice programme with supervised hours on a medical ward. Previous district nursing experience, with particular strengths in wound care, long-term conditions, and patient education." },
    ],
    bullets: [
      "Assessed and cared for up to eight acutely unwell patients per shift, prioritising care by clinical need.",
      "Recognised early signs of sepsis using NEWS2 and escalated promptly to the medical team.",
      "Administered oral, IV, and subcutaneous medication safely, with accurate records on every round.",
      "Led safety briefings and handovers for a team of six nurses and healthcare assistants.",
      "Supported ten student nurses on placement as a practice supervisor.",
      "Reduced missed observations on the unit by introducing an hourly prompt sheet with the ward manager.",
      "Planned complex discharges with social workers, therapists, and families to avoid delays.",
      "Adapted communication for patients with dementia and hearing loss after completing dementia-friendly care training.",
    ],
    skillGroups: [
      { label: "Clinical skills", items: ["Patient assessment and NEWS2", "Medication and IV administration", "Wound care and tissue viability", "Infection prevention and control", "Care planning and documentation", "Safeguarding adults"] },
      { label: "Personal strengths", items: ["Calm under pressure", "Clear communication with patients and families", "Teamwork across professions", "Attention to detail", "Supervising and teaching students"] },
    ],
    tips: [
      { heading: "Make your registration easy to find", text: "Mention your NMC registration, or the regulator in your country, in the profile and list it under certifications. Many nurses include their PIN; if you prefer not to, note that it is available on request. Employers will check it during recruitment either way." },
      { heading: "Name the settings and specialities", text: "Ward type, patient group, and bed numbers help a reader understand the pace and complexity of your work. \"Acute medical unit, 28 beds\" says far more than \"hospital ward\"." },
      { heading: "Show safety and teamwork through examples", text: "Nursing is team-based, so describe your own part: escalating a deteriorating patient, leading a handover, or supervising students. Keep every example anonymous and never include details that could identify a patient." },
      { heading: "Keep mandatory training brief", text: "List current life support and the training most relevant to the role. You do not need every e-learning module on the CV; the employer will ask for full records later." },
    ],
    guides: ["describe-your-experience", "before-you-send"],
  },
  {
    slug: "teacher", job: "Teacher", category: "Education", template: "classic",
    seoTitle: "Teacher CV Example — Free Template & Writing Tips",
    description: "A complete teacher CV example with a profile, classroom experience, and skills. Adapt the bullet points, edit it free online, and download your PDF.",
    intro: "Headteachers and hiring panels want to see your qualifications, the age range and subjects you teach, and evidence of pupil progress. This example keeps those details clear and supports each claim with a classroom example.",
    person: { name: "Daniel Hughes", headline: "Primary School Teacher (QTS)", location: "Cardiff, United Kingdom", phone: "+44 7700 900102" },
    summary: "Primary teacher with Qualified Teacher Status and five years of experience across Key Stage 1 and 2. Plans engaging, well-sequenced lessons, uses assessment to adapt teaching, and works closely with parents and support staff. Currently a Year 4 class teacher and the school's maths lead.",
    experience: [
      entry("Class Teacher (Year 4) and Maths Lead", "Northfield Primary School", "2021 – Present", ["Plan and teach a class of 30 pupils across the full primary curriculum.", "Lead maths across the school, including staff training and resource planning.", "Use formative assessment to identify gaps and run targeted small-group sessions.", "Work with the SENCo and teaching assistants to support pupils with additional needs."]),
      entry("Class Teacher (Year 2)", "Hillside Primary School", "2019 – 2021", ["Taught phonics and early reading through a systematic synthetic phonics programme.", "Prepared pupils for end of Key Stage 1 assessments.", "Ran a weekly after-school gardening club."]),
    ],
    education: [entry("PGCE Primary with QTS", "Northbridge University", "2018 – 2019"), entry("BA (Hons) English Literature", "University of Kingsford", "2015 – 2018")],
    certifications: [entry("Safeguarding and Child Protection", "Local authority training", "2024"), entry("Paediatric First Aid", "Example Training", "2023")],
    skills: "Teaching: Lesson planning, adaptive teaching, formative assessment, behaviour management\nCurriculum: Maths mastery, phonics, early reading\nTools: Google Classroom, interactive whiteboards, assessment trackers",
    profiles: [
      { label: "Secondary teacher", text: "Secondary science teacher with QTS and seven years of experience teaching biology to GCSE and A level. Head of Year 9, responsible for pastoral care, attendance, and parent communication for 180 pupils. Plans practical work that builds exam skills." },
      { label: "Early career teacher", text: "Early career teacher completing the first year of induction with a Year 3 class. Trained through a school-based route with placements in two contrasting primary schools. Particularly interested in reading for pleasure, with a new class library project run with parent volunteers." },
      { label: "Changing career into teaching", text: "Former laboratory technician moving into teaching after completing a PGCE in secondary chemistry. Brings eight years of practical science experience, strong health and safety knowledge, and a track record of training new staff." },
    ],
    bullets: [
      "Raised the proportion of pupils meeting the expected standard in maths from 68% to 81% over two years through weekly targeted support.",
      "Planned and taught sequenced lessons across the full Year 4 curriculum, adapting tasks for a wide range of needs.",
      "Led whole-school maths training for 14 teachers and teaching assistants.",
      "Introduced a reading-for-pleasure scheme that doubled class library borrowing in one year.",
      "Worked with the SENCo to write and review support plans for six pupils with additional needs.",
      "Built positive relationships with parents through termly meetings and a weekly class newsletter.",
      "Applied the school's behaviour policy consistently, creating a calm and focused classroom.",
      "Organised a residential trip for 60 pupils, including risk assessments and parent communication.",
    ],
    skillGroups: [
      { label: "Teaching skills", items: ["Lesson planning and sequencing", "Adaptive teaching for different needs", "Assessment and feedback", "Behaviour management", "Phonics and early reading", "Safeguarding"] },
      { label: "Personal strengths", items: ["Clear communication with parents", "Organisation", "Patience and resilience", "Teamwork with support staff", "Creativity in lesson design"] },
    ],
    tips: [
      { heading: "Lead with QTS and your phase", text: "State your teaching qualification, Qualified Teacher Status or your country's equivalent, and the age range you teach in the headline or profile. A panel can then match you to the vacancy straight away." },
      { heading: "Give evidence of impact", text: "Pupil progress, results, and successful initiatives show what changed because of your teaching. Use figures only when you know they are accurate, and describe school-wide results honestly as shared work." },
      { heading: "Include responsibilities beyond the classroom", text: "Subject leadership, clubs, trips, mentoring trainees, and pastoral roles show what you add to a school community. One clear line for each is enough." },
      { heading: "Check how the school wants you to apply", text: "Many schools in England ask for their own application form and a supporting statement rather than a CV, partly for safeguarding reasons. Use your CV to prepare the details, then follow the school's process." },
    ],
    guides: ["write-a-clear-profile", "describe-your-experience", "uk-cv-format", "improve-cv-bullet-points-with-ai"],
    extraExample: {
      id: "ect-example", heading: "Early career teacher CV example with two placements",
      intro: "Applying for your first post after a PGCE? Your placements are your teaching experience, so give them proper entries. Amira's CV, for a primary ECT post in England, shows how. The [UK CV format guide](/tips/uk-cv-format/) covers the wider conventions, and the guide to [improving CV bullet points with AI](/tips/improve-cv-bullet-points-with-ai/) shows how to sharpen placement bullets without inventing results.",
      cv: {
        id: "ect", template: "classic",
        person: { name: "Amira Hassan", headline: "Early Career Teacher, Primary (QTS)", location: "Leeds, United Kingdom", phone: "+44 7700 900186", email: "amira.hassan@example.com" },
        summary: "Early career teacher with Qualified Teacher Status, starting the two-year ECT induction after a primary PGCE with placements in Year 1 and Year 5. Plans phonics-led lessons, uses assessment for learning to adapt teaching, and builds calm, routine-based classrooms. Particularly interested in early reading and in supporting pupils who speak English as an additional language.",
        experience: [
          entry("Class Teacher (Year 3), Early Career Teacher", "Oakwood Primary School, Leeds", "Sep 2026 – Present", ["Teach a class of 28 pupils across the primary curriculum, supported by an ECT mentor", "Run daily phonics catch-up groups for six pupils who did not meet the expected standard in the Year 1 phonics check"]),
          entry("PGCE Placement 2: Year 5", "Brookfield Primary School, Bradford", "Feb – May 2026", ["Taught up to 80% of the timetable, planning six-week maths and English units", "Introduced daily vocabulary routines in a class where half the pupils speak English as an additional language", "Marked and moderated writing assessments alongside the class teacher"]),
          entry("PGCE Placement 1: Year 1", "Meadowbank Infant School, Leeds", "Oct – Dec 2025", ["Taught phonics and early reading using the school's systematic synthetic phonics programme", "Planned practical maths sessions and tracked number progress with the class's assessment grids"]),
        ],
        education: [entry("PGCE Primary (5–11) with QTS", "University of Kirkstall", "2025 – 2026"), entry("BA (Hons) Childhood Studies, 2:1", "University of Kirkstall", "2022 – 2025")],
        certifications: [entry("Safeguarding and Child Protection, Level 2", "Local authority training", "2026")],
        skills: "Teaching: systematic synthetic phonics, adaptive teaching, assessment for learning, behaviour routines\nCurriculum: early reading, EAL support, primary maths\nTools: Google Classroom, interactive whiteboards, pupil tracking software",
      },
      notes: [
        "Each placement is written like a job: the year group, how much of the timetable was taught, and what changed for pupils.",
        "QTS and the ECT induction appear in the headline and profile, the two things a head teacher checks first.",
        "Safeguarding training has its own line, because schools check it as part of safer recruitment.",
      ],
    },
  },
  {
    slug: "software-developer", job: "Software developer", category: "Technology", template: "tech",
    seoTitle: "Software Developer & Software Engineer CV Example",
    description: "A software developer and software engineer CV example with a grouped tech stack and results-led bullet points. Edit it in the free resume builder.",
    intro: "Whether the role is called software developer or software engineer, engineering managers scan the CV for three things: the technologies you use, what you built with them, and how your work helped the team or product. This example groups skills by area and describes each role through shipped work.",
    person: { name: "Sam Okafor", headline: "Software Developer", location: "Manchester, United Kingdom", phone: "+44 7700 900103" },
    summary: "Software developer with five years of experience building web applications in TypeScript, React, and Node.js. Turns unclear requirements into reliable features, writes tests that catch real problems, and enjoys improving performance. Currently building a platform used by thousands of small businesses.",
    experience: [
      entry("Software Developer", "Brightline Software", "2022 – Present", ["Build and maintain features in a React and Node.js invoicing platform for small businesses.", "Reduced average page load time by 40% by splitting bundles and caching API responses.", "Introduced end-to-end tests for the payment flow, cutting release-day bugs.", "Review pull requests and pair with junior developers."]),
      entry("Junior Developer", "Copperleaf Digital", "2020 – 2022", ["Developed websites and internal tools for agency clients using JavaScript and PHP.", "Built a reusable component library that shortened new project setup.", "Worked with designers to deliver accessible, responsive interfaces."]),
    ],
    education: [entry("BSc (Hons) Computer Science", "Northbridge University", "2016 – 2020")],
    projects: [entry("Budget planner app", "Personal project", "2024", ["Built an offline-first progressive web app with React and IndexedDB."])],
    skills: "Languages: TypeScript, JavaScript, Python, SQL\nFrontend: React, Next.js, HTML, CSS, accessibility\nBackend: Node.js, Express, PostgreSQL, REST APIs\nTools: Git, Docker, GitHub Actions, AWS",
    profiles: [
      { label: "Senior developer", text: "Senior backend engineer with nine years of experience designing APIs and data pipelines in Python and Go. Led the move from a monolith to services handling millions of requests a day, and mentors a team of four. Comfortable owning systems from design through to on-call." },
      { label: "Graduate developer", text: "Computer science graduate who spent a placement year at a fintech company building internal dashboards in React. Final-year project: a route-planning app using graph algorithms and a PostgreSQL back end. Looking for a junior role with a strong code review culture." },
      { label: "Changing career through a bootcamp", text: "Former logistics coordinator who completed a 16-week full-stack bootcamp and has since deployed three projects built with React and Node.js. Brings experience of improving processes, meeting deadlines, and explaining technical problems to non-technical colleagues." },
    ],
    bullets: [
      "Shipped a self-service billing page in React and TypeScript, reducing invoice-related support tickets by a third.",
      "Cut API response times from 900 ms to 250 ms by adding database indexes and caching frequent queries.",
      "Wrote end-to-end tests for the checkout flow with Playwright, preventing regressions in the most critical journey.",
      "Automated deployments with GitHub Actions, reducing release time from an afternoon to under 20 minutes.",
      "Migrated a legacy jQuery front end to React one component at a time, without downtime.",
      "Brought key pages up to WCAG 2.2 AA, testing changes with a screen reader user.",
      "Mentored two junior developers through code reviews and weekly pairing sessions.",
      "Investigated and resolved production incidents as part of a weekly on-call rotation.",
    ],
    skillGroups: [
      { label: "Technical skills", items: ["TypeScript and JavaScript", "React and Next.js", "Node.js and REST APIs", "SQL and PostgreSQL", "Automated testing", "Git and CI/CD", "Cloud services such as AWS, Azure, or GCP"] },
      { label: "Working skills", items: ["Problem solving", "Code review", "Clear technical writing", "Working with product and design", "Estimating and planning work"] },
    ],
    tips: [
      { heading: "Group your tech stack", text: "A long list of every tool you have touched hides your real strengths. Group skills by area and keep the ones you could discuss confidently in a technical interview." },
      { heading: "Describe what you shipped and why it mattered", text: "Each bullet should name what you built or changed and the result: faster pages, fewer errors, happier users, or time saved. Mention the technology when it adds useful context." },
      { heading: "Link to work people can see", text: "A GitHub profile, portfolio, or live project helps, but only if it is tidy and the links work. Pin your best repositories and give each a short README." },
      { heading: "Keep the layout easy to parse", text: "Many tech companies use applicant tracking systems. A single-column template with standard headings, like this one, keeps your skills readable for both software and people." },
    ],
    guides: ["describe-your-experience", "choose-your-template"],
  },
  {
    slug: "customer-service", job: "Customer service", category: "Customer service", template: "modern",
    seoTitle: "Customer Service CV Example & Resume Template",
    faqs: [
      { question: "What skills should a customer service CV highlight?", answer: "Problem-solving, calm communication, and accuracy with systems, each backed by a result such as satisfaction scores, first-contact resolution, or fewer complaints. Name the CRM or ticketing tools you use." },
      { question: "How do I describe call centre targets on a CV?", answer: "Give the measure and your result against it, for example 60 calls a day with an 88% satisfaction score. Recruiters understand contact-centre metrics, so plain numbers work better than adjectives." },
      { question: "Does retail or hospitality experience count for customer service jobs?", answer: "Yes. Serving customers, handling complaints, and working at speed are the same core skills. Describe them by the customer outcome rather than the shop-floor task." },
    ],
    description: "A customer service CV example with achievement-led bullets and key skills. Edit it in the free resume builder for call centre, retail, or support roles.",
    intro: "Customer service managers look for evidence that you stay patient, solve problems, and meet service targets. This example uses specific measures, such as satisfaction scores and resolution rates, to turn everyday tasks into achievements.",
    person: { name: "Chloe Bennett", headline: "Customer Service Advisor", location: "Glasgow, United Kingdom", phone: "+44 7700 900104" },
    summary: "Customer service advisor with four years of experience in contact centre and live chat support. Resolves billing and account queries on first contact, stays calm with frustrated customers, and consistently meets quality and response targets. Looking to move into a team leader role.",
    experience: [
      entry("Customer Service Advisor", "Northern Energy Supply", "2022 – Present", ["Handle around 60 calls, emails, and live chats a day about billing, meter readings, and payments.", "Maintain a customer satisfaction score above 92% across the last 12 months.", "Resolve complaints and escalate complex cases with clear notes for specialist teams.", "Coach new starters during their first two weeks on the phones."]),
      entry("Sales Assistant", "Harbour Street Books", "2020 – 2022", ["Served customers, processed payments, and handled returns.", "Answered phone and email orders and tracked special orders for regular customers."]),
    ],
    education: [entry("HNC Business", "Northbridge College", "2018 – 2020")],
    skills: "Service: Complaint handling, de-escalation, first-contact resolution\nSystems: Salesforce, Zendesk, Microsoft 365\nOther: Live chat, data protection, accurate case notes",
    profiles: [
      { label: "First customer service job", text: "Friendly and reliable school leaver with weekend experience in a busy café, used to serving customers quickly and handling payments accurately. Looking for a first customer service role where good communication and a positive attitude make a difference." },
      { label: "Ready for team leader", text: "Customer service advisor with six years in a regulated contact centre, including two years supporting a team of 12 on the floor. Experienced in quality monitoring, call coaching, and handling escalated complaints." },
      { label: "Online and live chat support", text: "Online support specialist with three years resolving customer queries by email and live chat for a subscription software company. Writes clear help articles, manages up to four chats at once, and keeps response times well within service levels." },
    ],
    bullets: [
      "Resolved 85% of customer queries on first contact, above the team target of 78%.",
      "Maintained a customer satisfaction score of 92% or higher for 12 consecutive months.",
      "Handled escalated complaints calmly, finding solutions that satisfied customers and followed company policy.",
      "Rewrote five standard email replies, cutting repeat contacts about billing questions.",
      "Trained eight new advisors on systems, call structure, and data protection.",
      "Spotted a recurring billing error and reported it to the product team, preventing further complaints.",
      "Managed up to four live chats at once while keeping the average first response under one minute.",
      "Recorded clear case notes so colleagues could pick up any query without repeating questions.",
    ],
    skillGroups: [
      { label: "Practical skills", items: ["Complaint handling and de-escalation", "CRM systems such as Salesforce or Zendesk", "Phone, email, and live chat support", "Accurate note-taking", "Data protection awareness", "Recommending products where appropriate"] },
      { label: "Personal strengths", items: ["Patience and empathy", "Clear, friendly communication", "Problem solving", "Working to targets", "Reliability on shift patterns"] },
    ],
    tips: [
      { heading: "Turn targets into achievements", text: "Contact centres measure almost everything. If you know your satisfaction score, first-contact resolution, or quality marks, use them. Numbers show consistency far better than \"excellent customer service skills\"." },
      { heading: "Show how you handle difficult moments", text: "Include one example of calming an upset customer or fixing a recurring problem. Interviewers often ask about this, so your CV can set up the story." },
      { heading: "Name the channels and systems", text: "Phone, email, live chat, and social media support each need slightly different skills. Mention the channels you have worked on and any CRM or ticketing tools you have used." },
    ],
    guides: ["describe-your-experience", "keep-it-focused"],
  },
  {
    slug: "retail-assistant", job: "Retail assistant", category: "Retail & hospitality", template: "minimal",
    seoTitle: "Retail Assistant CV Example — Free Template",
    description: "A retail assistant CV example with a short profile, shop-floor experience, and skills. Suits first jobs and part-time roles. Edit free and download a PDF.",
    intro: "Store managers hiring for retail roles want reliable people who are good with customers, handle money accurately, and work well in a team. This example shows those qualities through specific shop-floor tasks and stays short enough for a quick read.",
    person: { name: "Jordan Price", headline: "Retail Assistant", location: "Bristol, United Kingdom", phone: "+44 7700 900105" },
    summary: "Retail assistant with two years of experience in a busy high street fashion store. Comfortable on the till, helping customers find the right size or style, and keeping the shop floor tidy and well stocked. Available for flexible shifts, including weekends and evenings.",
    experience: [
      entry("Sales Assistant", "Threadline Clothing", "2023 – Present", ["Serve up to 150 customers a shift on busy Saturdays, at the till and on the shop floor.", "Process payments, refunds, and exchanges accurately, with balanced tills at close.", "Replenish stock and set up new displays following visual merchandising guides.", "Helped the store achieve full marks for customer service in two mystery shopper visits."]),
      entry("Christmas Stock Assistant", "Parkway Home Store", "2022", ["Unloaded deliveries and moved stock to the shop floor before opening.", "Kept the stockroom organised so colleagues could find items quickly."]),
    ],
    education: [entry("A levels: Business, English, Art", "Northbridge Sixth Form College", "2020 – 2022")],
    skills: "Retail: Till and card payments, cash handling, stock replenishment, visual merchandising\nCustomer: Product advice, returns and exchanges\nOther: Stock counts, opening and closing procedures",
    profiles: [
      { label: "First job", text: "Hard-working sixth form student looking for a first part-time retail job. Volunteers at a charity shop on Saturdays, pricing donations and helping on the till, and has served customers at school events." },
      { label: "Experienced retail assistant", text: "Retail assistant with five years in electronics retail, known for clear product advice and strong sales of accessories and cover plans. Trusted with opening and closing the store, cashing up, and training new seasonal staff." },
      { label: "Moving to supervisor", text: "Experienced sales assistant ready for a supervisor role after a year of covering shift leadership. Organises breaks and tasks for a team of six, handles customer complaints, and helps the manager with rotas and stock counts." },
    ],
    bullets: [
      "Served up to 150 customers per shift during peak trading while keeping queues moving.",
      "Balanced the till accurately at every close for 18 months.",
      "Built seasonal window and in-store displays that followed head-office guidelines.",
      "Helped customers find sizes and alternatives, increasing add-on sales of accessories.",
      "Handled returns and exchanges politely, following store policy and consumer rights rules.",
      "Completed weekly stock counts and flagged low stock to the manager.",
      "Trained four seasonal staff on the till, fitting room procedures, and store layout.",
      "Covered extra shifts at short notice during busy periods and staff holidays.",
    ],
    skillGroups: [
      { label: "Practical skills", items: ["Till and cash handling", "Stock replenishment and counts", "Visual merchandising", "Product knowledge", "Returns and exchanges", "Opening and closing procedures"] },
      { label: "Personal strengths", items: ["Friendly and approachable", "Reliable and punctual", "Works well in a team", "Organised when busy", "Flexible with shifts"] },
    ],
    tips: [
      { heading: "Keep it to one page", text: "Retail managers often read many CVs for one vacancy. One clear page with your availability, recent experience, and key skills is usually enough." },
      { heading: "Say when you can work", text: "Flexibility matters in retail. A short line about your availability, such as weekends, evenings, or school holidays, makes your CV more useful to a busy manager." },
      { heading: "Use school and volunteering experience", text: "If this is your first job, include volunteering, school events, or helping in a family business. Serving customers and handling money count wherever you learned them." },
    ],
    guides: ["your-first-cv", "keep-it-focused", "australian-student-resume"],
    extraExample: {
      id: "year-12-example", heading: "Year 12 retail resume example (Australia)",
      intro: "Australian employers hiring casual staff want to know when you can work. Chloe's resume is written the Australian way: availability in the first lines, school responsibilities and volunteering as experience, and referees at the end. The [Australian resume format guide](/tips/australian-resume-format/) explains the conventions, and the [student CV templates](/templates/category/student/) suit a first resume like this.",
      cv: {
        id: "year-12", template: "student",
        person: { name: "Chloe Nguyen", headline: "Year 12 student seeking casual retail work", location: "Parramatta NSW", phone: "0491 570 156", email: "chloe.nguyen@example.com" },
        summary: "Year 12 student looking for casual retail work on weekends and during school holidays. Organised and friendly: I have volunteered at a community op shop every second Saturday for a year and am a peer support leader for Year 7 students. Available Saturdays and Sundays, plus full days in the school holidays.",
        sectionOrder: ["summary", "education", "experience", "skills", "additional", "projects", "languages", "certifications"],
        education: [entry("Higher School Certificate (HSC), expected 2027", "Westmead Hills High School, Parramatta NSW", "2022 – 2027", ["Subjects: English Advanced, Mathematics Standard, Business Studies, Legal Studies, Visual Arts"])],
        experience: [
          entry("Volunteer Shop Assistant", "Parramatta Community Op Shop", "Feb 2026 – Present", ["Sort, price, and display donated clothing every second Saturday", "Serve customers at the register, handling cash and EFTPOS payments"]),
          entry("Peer Support Leader", "Westmead Hills High School", "2026", ["Mentor a group of eight Year 7 students through their first term of high school"]),
        ],
        skills: "Customer service: friendly with customers, cash and EFTPOS, keeping displays tidy\nPractical: sorting and pricing stock, following store procedures\nLanguages: English, Vietnamese (conversational)",
        additional: { title: "Referees", text: "Joanne Ellis, Op Shop Coordinator, 0491 570 157\nDavid Tran, Year 7 Coordinator, Westmead Hills High School, 0491 570 158" },
      },
      notes: [
        "Availability is in the profile, because casual rosters are built around it.",
        "Australian terms throughout: Year 12, HSC, op shop, EFTPOS, and referees with phone numbers.",
        "A school responsibility counts as experience; peer support shows maturity and reliability.",
      ],
    },
  },
  {
    slug: "care-assistant", job: "Care assistant", category: "Healthcare", template: "linear",
    seoTitle: "Care Assistant CV Example — Free Template & Tips",
    description: "A care assistant CV example with a caring profile, residential and home care experience, and key skills. Adapt it, edit free, and download your PDF.",
    intro: "Care providers look for kindness, reliability, and an understanding of safe, dignified care. This example shows personal care experience, the training employers ask for, and the qualities that matter most to residents and families.",
    person: { name: "Grace Mensah", headline: "Senior Care Assistant", location: "Birmingham, United Kingdom", phone: "+44 7700 900106" },
    summary: "Compassionate care assistant with three years of experience in residential and home care for older adults, including people living with dementia. Supports personal care, mobility, and medication with dignity and patience, and keeps accurate care records. Holds the Care Certificate and a current enhanced DBS check.",
    experience: [
      entry("Senior Care Assistant", "Maple House Care Home", "2023 – Present", ["Provide personal care, mobility support, and companionship for up to ten residents per shift.", "Administer medication as a trained senior, recording each dose on the electronic system.", "Update care plans and handover notes, and report changes in health to the nurse in charge.", "Support new care assistants through shadow shifts and induction."]),
      entry("Home Care Worker", "CareWell Home Support", "2021 – 2023", ["Visited clients at home to help with washing, dressing, meals, and medication prompts.", "Built trusting relationships with clients and kept families informed.", "Managed a daily schedule of visits across the local area."]),
    ],
    education: [entry("Level 3 Diploma in Adult Care", "Northbridge College", "2023 – 2024")],
    certifications: [entry("Care Certificate", "Completed during induction", "2021"), entry("Moving and Handling", "Example Training", "2024"), entry("Dementia Awareness", "Example Training", "2023")],
    skills: "Care: Personal care, mobility and hoist use, medication administration, end-of-life support\nRecords: Electronic care planning, handover notes, incident reporting\nOther: Dementia care, safeguarding, infection control",
    profiles: [
      { label: "No paid care experience", text: "Caring and dependable person looking for a first role in adult social care. Has supported an elderly grandparent at home for two years, helping with meals, appointments, and medication reminders. Ready to complete the Care Certificate and work flexible shifts, including weekends." },
      { label: "Home care worker", text: "Home care worker with four years of experience helping older adults and people with physical disabilities live independently. Trusted to work alone, manage a busy schedule of visits, and notice early changes in a client's health or wellbeing." },
      { label: "Moving to senior carer", text: "Care assistant with five years in nursing homes, now ready for a senior carer role. Medication-trained, experienced in leading shifts when the senior is absent, and confident updating care plans with residents and families." },
    ],
    bullets: [
      "Supported up to ten residents per shift with personal care, eating, and mobility, always protecting dignity and choice.",
      "Administered medication safely as a trained senior and recorded every dose accurately.",
      "Used hoists and slide sheets safely, following each resident's moving and handling plan.",
      "Noticed early signs of infection in a resident and reported them, leading to prompt treatment.",
      "Planned meaningful activities, including music and reminiscence sessions, with the activities coordinator.",
      "Kept clear, factual daily notes and handovers so colleagues understood each resident's needs.",
      "Supported residents and families with compassion during end-of-life care.",
      "Mentored five new care assistants through shadow shifts and the Care Certificate.",
    ],
    skillGroups: [
      { label: "Care skills", items: ["Personal care and continence support", "Moving and handling", "Medication administration or prompting", "Dementia care", "Safeguarding adults", "Infection prevention and control"] },
      { label: "Personal strengths", items: ["Compassion and patience", "Respect for dignity and choice", "Reliability", "Observant and quick to report concerns", "Calm in difficult situations"] },
    ],
    tips: [
      { heading: "Lead with your values", text: "Care employers often recruit for values first. Show kindness, respect, and reliability through a real example in your profile rather than a list of adjectives." },
      { heading: "List your training and checks", text: "Mention the Care Certificate, any adult care qualifications, moving and handling, medication training, and your DBS check if you have one. These details often decide who is invited to interview." },
      { heading: "Include unpaid caring experience", text: "Looking after a relative or volunteering in your community is relevant experience. Describe what you did and what you learned, and keep personal details private." },
    ],
    guides: ["your-first-cv", "write-a-clear-profile"],
  },
  {
    slug: "administrator", job: "Administrator", category: "Office & admin", template: "ledger",
    seoTitle: "Administrative Assistant & Administrator CV Example",
    faqs: [
      { question: "What should an administrator put on a CV?", answer: "The systems you use and the size of your workload: the software you rely on daily, how many people you support, and volumes such as invoices or bookings each month. Add one or two improvements you made, such as a new tracker or filing system." },
      { question: "Is a Level 3 Business Administration qualification worth listing?", answer: "Yes. It shows formal training in office processes, and some adverts ask for Level 2 or 3. List it under education with the college and the year you completed it." },
      { question: "How do I show Excel skills on an admin CV?", answer: "Say what you can do rather than writing \"Microsoft Office\": pivot tables, lookups, conditional formatting, or building trackers. Then prove it with a bullet, such as the renewals tracker you set up." },
    ],
    description: "An administrative assistant and administrator CV example with an organised profile, office experience, and in-demand skills. Edit it free as a template.",
    intro: "Administrators keep an organisation running, so hiring managers look for organisation, accuracy, and confidence with systems. This example shows the range of tasks you handle and how you made processes faster or more reliable.",
    person: { name: "Hannah Kowalski", headline: "Office Administrator", location: "Nottingham, United Kingdom", phone: "+44 7700 900107" },
    summary: "Office administrator with five years of experience supporting busy teams in property and legal services. Manages diaries, invoices, and records accurately, keeps office systems running smoothly, and finds simple ways to save colleagues time. Advanced Microsoft 365 user.",
    experience: [
      entry("Office Administrator", "Greenacre Property Management", "2021 – Present", ["Manage diaries, meetings, and travel for three directors.", "Process around 200 supplier invoices a month and reconcile them with the finance team.", "Maintain tenant records and contracts in the property management system.", "Created a shared-mailbox system that cut response times to tenant emails."]),
      entry("Administrative Assistant", "Fairbank Solicitors", "2019 – 2021", ["Typed and formatted letters and documents, and managed case files.", "Answered calls, greeted clients, and booked appointments.", "Ordered office supplies and kept a tidy, compliant filing system."]),
    ],
    education: [entry("Level 3 Diploma in Business Administration", "Northbridge College", "2018 – 2019")],
    certifications: [entry("Microsoft Office Specialist: Excel Associate", "Microsoft", "2022")],
    skills: "Office: Diary management, minute-taking, invoice processing, document formatting\nSoftware: Microsoft 365, Excel (pivot tables, lookups), SharePoint, Xero\nOther: Data protection, records management, supplier liaison",
    profiles: [
      { label: "First admin role", text: "Organised and accurate admin assistant looking for a first office role after completing a Level 2 Business Administration course. Experienced in data entry, answering phones, and keeping records from a part-time job at a local dental practice." },
      { label: "Office manager", text: "Office manager with ten years of experience running a 60-person office, including facilities, suppliers, health and safety, and onboarding new starters. Introduced a digital filing system that removed most paper records and reduced storage costs." },
      { label: "Virtual assistant", text: "Virtual assistant supporting four small-business owners with email management, scheduling, invoicing, and social media posts. Works independently across time zones using Google Workspace, Xero, and Trello." },
    ],
    bullets: [
      "Managed complex diaries for three directors, coordinating meetings across time zones.",
      "Processed around 200 invoices a month with no payment errors raised at audit.",
      "Introduced a shared-mailbox and tagging system that cut average reply time from two days to the same day.",
      "Built Excel trackers for contract renewals so no deadline was missed.",
      "Took minutes at monthly board meetings and circulated actions within 24 hours.",
      "Organised an office move for 25 staff, coordinating IT, furniture, and removals.",
      "Kept personal data secure and handled client records in line with UK GDPR.",
      "Trained new starters on office systems and wrote a simple procedures guide.",
    ],
    skillGroups: [
      { label: "Practical skills", items: ["Diary and inbox management", "Minute-taking", "Invoice processing and reconciliation", "Microsoft Excel and Word", "Records and data management", "Event and travel booking"] },
      { label: "Personal strengths", items: ["Organisation and prioritisation", "Accuracy and attention to detail", "Discretion with confidential information", "Clear written communication", "Calm under deadlines"] },
    ],
    tips: [
      { heading: "Be specific about software", text: "Admin roles depend on software. Name the tools you use and how well, for example \"Excel: pivot tables, lookups, and charts\" rather than just \"Microsoft Office\"." },
      { heading: "Show the size of your workload", text: "Volumes such as invoices per month, people supported, or events organised help a reader picture the scale of your work." },
      { heading: "Highlight the improvements you made", text: "Many administrators improve processes without being asked. A new tracker, template, or filing system is an achievement worth its own bullet point." },
    ],
    guides: ["describe-your-experience", "keep-it-focused"],
  },
  {
    slug: "accountant", job: "Accountant", category: "Finance", template: "regent",
    seoTitle: "Accountant CV Example — Free Template & Tips",
    faqs: [
      { question: "Should I list ACCA or ACA exams I have not finished?", answer: "Yes. Write the qualification and your progress, for example \"ACCA: 9 of 13 exams passed, completing 2027\". Employers often support part-qualified accountants and want to know where you are." },
      { question: "What software should an accountant put on a CV?", answer: "The ledgers and tools you actually use, such as Sage, Xero, SAP, or Oracle, plus Excel functions like pivot tables and XLOOKUP. Specific names help recruiters and applicant tracking systems alike." },
      { question: "How do I show results on an accountant CV?", answer: "Quantify what changed: a faster month-end close, fewer reconciliation errors, savings found, or audit points cleared. Even routine process work has outcomes you can measure." },
    ],
    description: "An accountant CV example with a professional profile, finance experience, and technical skills. Show qualifications and results, then download a PDF.",
    intro: "Finance managers want to see your qualification status, the size and type of organisations you have worked for, and your technical depth. This example puts qualifications first and describes month-end, reporting, and improvement work in measurable terms.",
    person: { name: "Imran Qureshi", headline: "Chartered Management Accountant", location: "London, United Kingdom", phone: "+44 7700 900108" },
    summary: "CIMA-qualified management accountant with six years of experience in retail and manufacturing. Leads month-end close, budgeting, and variance analysis, and turns financial data into clear insight for operational managers. Experienced with Sage, Power BI, and advanced Excel.",
    experience: [
      entry("Management Accountant", "Hartwell Foods Ltd", "2021 – Present", ["Lead the month-end close for a £40m manufacturing business, delivering accounts within five working days.", "Prepare monthly management packs and variance analysis for the board.", "Built a Power BI dashboard that gives site managers weekly visibility of costs.", "Own the annual budget and quarterly reforecasts with department heads."]),
      entry("Assistant Accountant", "Ridgeway Retail Group", "2018 – 2021", ["Prepared journals, accruals, prepayments, and balance sheet reconciliations.", "Supported the external audit by preparing schedules and answering queries.", "Prepared VAT returns and supported payroll reconciliations."]),
    ],
    education: [entry("BSc (Hons) Accounting and Finance", "Northbridge University", "2015 – 2018")],
    certifications: [entry("ACMA, CGMA", "Chartered Institute of Management Accountants", "2021")],
    skills: "Technical: Month-end close, management accounts, budgeting and forecasting, variance analysis, VAT\nSystems: Sage 200, Xero, SAP, Power BI, advanced Excel\nOther: Audit preparation, process improvement, stakeholder reporting",
    profiles: [
      { label: "Part-qualified accountant", text: "Part-qualified ACCA student with three years in practice, preparing year-end accounts and tax returns for small businesses and sole traders. Has passed nine of the thirteen exams and is now studying the Strategic Professional papers." },
      { label: "Graduate or trainee", text: "Accounting and finance graduate with summer internship experience in an audit team. Comfortable with Excel, double-entry bookkeeping, and reconciliations, and looking for a training contract leading to ACA or ACCA qualification." },
      { label: "Financial controller", text: "ACA-qualified financial controller with twelve years of experience, including five leading a team of six in a multi-site hospitality group. Delivered a new finance system on time, shortened the month-end close from ten days to four, and manages relationships with auditors and banks." },
    ],
    bullets: [
      "Reduced the month-end close from eight to five working days by automating reconciliations.",
      "Prepared monthly management accounts and board packs for a £40m business.",
      "Identified £250k of annual savings through supplier cost analysis with the procurement team.",
      "Led the annual budget process with ten department heads and prepared quarterly reforecasts.",
      "Built a Power BI dashboard that gave site managers weekly visibility of costs.",
      "Completed balance sheet reconciliations with no material adjustments raised at audit.",
      "Prepared and submitted quarterly VAT returns under Making Tax Digital.",
      "Trained two assistant accountants in journals, reconciliations, and Excel modelling.",
    ],
    skillGroups: [
      { label: "Technical skills", items: ["Management and financial reporting", "Budgeting and forecasting", "Variance analysis", "Reconciliations and journals", "VAT and compliance", "Advanced Excel and Power BI"] },
      { label: "Professional strengths", items: ["Commercial awareness", "Explaining numbers to non-finance colleagues", "Accuracy under deadlines", "Process improvement", "Integrity and discretion"] },
    ],
    tips: [
      { heading: "Make your qualification status unmistakable", text: "State whether you are qualified, part-qualified, or studying, and with which body, such as ACCA, CIMA, or ICAEW. If you are part-qualified, say how many exams you have passed." },
      { heading: "Give context about the business", text: "Turnover, number of entities, sector, and team size help a reader understand how complex your role was. A short line of context for each job is enough." },
      { heading: "Show improvement, not just routine", text: "Every accountant does month-end. Stand out by describing what you improved: a faster close, clearer reports, cost savings, or a smoother audit." },
    ],
    guides: ["describe-your-experience", "write-a-clear-profile"],
  },
  {
    slug: "project-manager", job: "Project manager", category: "Business & management", template: "edge",
    seoTitle: "Project Manager CV Example — Free Template",
    faqs: [
      { question: "Should I include budgets on a project manager CV?", answer: "Yes, when you can. Budget, team size, and timescale help a reader understand the scale of what you managed. Use rounded figures or ranges if the exact numbers are confidential." },
      { question: "Do I need PRINCE2 or PMP for a project manager CV?", answer: "Many UK adverts ask for PRINCE2 Foundation or Practitioner, and PMP is common with international employers. If you hold either, put it near the top; if not, show the same discipline through how you ran your projects." },
      { question: "How do I show agile experience on my CV?", answer: "Name the framework and your part in it, such as running sprint planning or acting as Scrum Master, and give a delivery result. A recognised agile certificate supports the claim." },
    ],
    description: "A project manager CV example with delivery results, methods, and certifications. See how to describe budgets, teams, and outcomes, then edit it for free.",
    intro: "Hiring managers want to know what you delivered, how big it was, and how you kept people and risks under control. This example describes each project by scope, budget, and outcome, and lists methods and certifications without filling the page with jargon.",
    person: { name: "Rachel Lee", headline: "Project Manager", location: "Edinburgh, United Kingdom", phone: "+44 7700 900109" },
    summary: "Project manager with seven years of experience delivering digital and operational change in financial services. Leads cross-functional teams of up to 15 people, manages budgets up to £2m, and keeps stakeholders aligned from business case to handover. PRINCE2 Practitioner and Certified ScrumMaster.",
    experience: [
      entry("Project Manager", "Lothian Mutual", "2021 – Present", ["Deliver digital projects for customer services, including an online claims journey launched on time and within a £1.8m budget.", "Run planning, risk management, and status reporting for a team of 15 across IT, operations, and suppliers.", "Introduced fortnightly delivery reviews that improved forecast accuracy.", "Manage senior stakeholders through monthly steering committees."]),
      entry("Project Coordinator", "Clearwater Insurance", "2018 – 2021", ["Maintained project plans, RAID logs, and budgets for a portfolio of six projects.", "Organised workshops and documented requirements with business teams.", "Coordinated user acceptance testing for a new CRM system."]),
    ],
    education: [entry("BA (Hons) Business Management", "Northbridge University", "2014 – 2018")],
    certifications: [entry("PRINCE2 Practitioner", "PeopleCert", "2022"), entry("Certified ScrumMaster", "Scrum Alliance", "2022")],
    skills: "Delivery: Planning, risk and issue management, budgeting, change control\nMethods: PRINCE2, Agile and Scrum, Kanban\nTools: Jira, Microsoft Project, Smartsheet, Power BI",
    profiles: [
      { label: "Project coordinator moving up", text: "Project coordinator with two years supporting IT and office relocation projects. Maintains plans, RAID logs, and meeting actions, and keeps suppliers and stakeholders updated. Working towards PRINCE2 Foundation and ready for a first project manager role." },
      { label: "Senior project or programme manager", text: "Senior project manager with twelve years of experience leading infrastructure and IT programmes in the public sector. Has delivered programmes worth up to £15m, managed teams of project managers, and reported to executive boards." },
      { label: "Changing career into project management", text: "Operations team leader moving into project management after leading three improvement projects that reduced order errors and handling time. Holds PRINCE2 Foundation and brings strong planning, stakeholder, and people skills." },
    ],
    bullets: [
      "Delivered a £1.8m online claims project on time and on budget, cutting average claim time from ten days to four.",
      "Led a cross-functional team of 15 across IT, operations, legal, and two suppliers.",
      "Introduced a risk review process that halved late-stage issues across the portfolio.",
      "Managed scope changes through clear change control, keeping senior stakeholders informed.",
      "Ran Agile ceremonies for two development teams and improved sprint predictability.",
      "Negotiated supplier milestones and payment terms, saving £120k on a software contract.",
      "Produced weekly status reports and monthly steering committee packs.",
      "Coached three project coordinators, two of whom moved into project manager roles.",
    ],
    skillGroups: [
      { label: "Project skills", items: ["Planning and scheduling", "Risk, issue, and dependency management", "Budget control", "Stakeholder management", "Agile and waterfall delivery", "Supplier management"] },
      { label: "Leadership strengths", items: ["Clear communication at every level", "Decision making under pressure", "Negotiation", "Motivating cross-functional teams", "Structured problem solving"] },
    ],
    tips: [
      { heading: "Describe projects by scope and result", text: "For each major project, give the budget or size, the team, and the outcome. \"Delivered a £1.8m claims project on time\" tells a reader far more than \"responsible for project delivery\"." },
      { heading: "Balance methods with outcomes", text: "Certifications and methods such as PRINCE2 or Scrum help, but employers hire for delivery. Mention the methods once and spend most of the space on results." },
      { heading: "Show how you handle people", text: "Stakeholders, suppliers, and teams are often the hardest part of a project. A bullet about resolving a conflict or getting a difficult decision made can set you apart." },
    ],
    guides: ["describe-your-experience", "write-a-clear-profile"],
  },
  {
    slug: "marketing-executive", job: "Marketing executive", category: "Marketing & creative", template: "creative",
    seoTitle: "Marketing CV Example — Free Template & Tips",
    description: "A marketing executive CV example with campaign results, digital skills, and a confident profile. Adapt the bullet points and download your free PDF.",
    intro: "Marketing managers expect a CV that markets you well: clear, persuasive, and backed by results. This example focuses on campaigns, channels, and measurable outcomes, with skills split into channels and tools.",
    person: { name: "Ella Thompson", headline: "Marketing Executive", location: "Brighton, United Kingdom", phone: "+44 7700 900110" },
    summary: "Marketing executive with four years of experience running multichannel campaigns for consumer brands. Plans and delivers email, social, and paid campaigns, writes clear copy, and uses data to improve results week by week. Recently grew a brand's email audience to 40,000 subscribers.",
    experience: [
      entry("Marketing Executive", "Saltwater Outdoor Co.", "2022 – Present", ["Plan and run email, social, and paid campaigns for an outdoor clothing brand.", "Grew the email list from 12,000 to 40,000 subscribers with new sign-up journeys.", "Manage a monthly paid social budget and report on cost per acquisition.", "Write product copy, newsletters, and landing pages with the design team."]),
      entry("Marketing Assistant", "Bloom & Field Agency", "2020 – 2022", ["Scheduled social media content and reported monthly results to clients.", "Supported event and product launch campaigns.", "Researched competitors and audience trends for new pitches."]),
    ],
    education: [entry("BA (Hons) Marketing", "Northbridge University", "2017 – 2020")],
    certifications: [entry("Google Analytics Certification", "Google Skillshop", "2024")],
    skills: "Channels: Email, paid social, organic social, SEO, content marketing\nTools: Google Analytics 4, Meta Ads Manager, Klaviyo, Canva, WordPress\nOther: Copywriting, A/B testing, campaign reporting",
    profiles: [
      { label: "Marketing graduate", text: "Marketing graduate who spent a placement year at a B2B software company writing blog content, managing LinkedIn posts, and building email newsletters. Comfortable with Google Analytics and keen to grow in a digital marketing team." },
      { label: "Digital and SEO specialist", text: "Digital marketing specialist with five years of experience in SEO and content for e-commerce brands. Increased organic traffic by 150% for a homeware retailer through technical fixes and a content plan built around real search demand." },
      { label: "Marketing manager", text: "Marketing manager with nine years of experience leading brand and acquisition campaigns, managing budgets up to £500k and a team of four. Combines creative direction with clear measurement and a focus on revenue." },
    ],
    bullets: [
      "Grew the email list from 12,000 to 40,000 subscribers in 18 months through new sign-up forms and welcome journeys.",
      "Lifted email revenue by 35% by segmenting customers and testing subject lines.",
      "Reduced paid social cost per acquisition by 22% through creative testing and better audience targeting.",
      "Wrote and launched 12 landing pages with designers and developers.",
      "Planned a product launch across email, social, and PR that sold out the first run in two weeks.",
      "Built a monthly reporting dashboard in Google Analytics 4 and Looker Studio.",
      "Managed partnerships with 15 creators, from briefing to contracts and reporting.",
      "Improved organic search visibility by rewriting product pages around the terms customers actually search for.",
    ],
    skillGroups: [
      { label: "Marketing skills", items: ["Campaign planning and delivery", "Email marketing and automation", "Paid social advertising", "SEO and content marketing", "Copywriting", "Analytics and reporting"] },
      { label: "Tools", items: ["Google Analytics 4", "Meta Ads Manager", "Klaviyo or Mailchimp", "Canva or Adobe Express", "WordPress or Shopify", "Looker Studio"] },
    ],
    tips: [
      { heading: "Lead with results", text: "Marketing is measured, so your CV should be too. Growth in subscribers, sales, engagement, or efficiency shows what your campaigns achieved." },
      { heading: "Separate channels from tools", text: "Group what you do, such as email, paid social, and SEO, separately from the software you use. It makes your skills easy to match against a job advert." },
      { heading: "Let the design support the content", text: "A touch of personality suits marketing roles, but the CV still needs to be easy to scan. Keep the layout tidy and make sure your results stand out." },
      { heading: "Link to your work", text: "A portfolio, blog, or campaign examples help, especially for content and creative roles. Check every link before you apply." },
    ],
    guides: ["describe-your-experience", "choose-your-template"],
  },
  {
    slug: "warehouse-operative", job: "Warehouse operative", category: "Logistics & trades", template: "clarity",
    seoTitle: "Warehouse Operative CV Example — Free Template",
    description: "A warehouse operative CV example with picking and packing experience, forklift licences, and safety skills. Edit it free and download your PDF.",
    intro: "Warehouse managers want to know you are safe, accurate, and able to keep up with targets. This example puts licences and safety training up front and uses pick rates and accuracy to show performance.",
    person: { name: "Liam Walsh", headline: "Warehouse Operative", location: "Northampton, United Kingdom", phone: "+44 7700 900111" },
    summary: "Reliable warehouse operative with four years of experience in busy distribution centres. Consistently meets pick-rate targets with high accuracy, holds counterbalance and reach truck licences, and follows health and safety procedures closely. Happy to work rotating shifts, nights, and overtime.",
    experience: [
      entry("Warehouse Operative", "Midshire Distribution Centre", "2022 – Present", ["Pick, pack, and dispatch online orders using handheld scanners.", "Average 110% of pick-rate target with 99.8% accuracy.", "Load and unload vehicles with counterbalance and reach trucks.", "Carry out stock checks and report damaged or missing items."]),
      entry("Picker Packer (agency)", "QuickShip Fulfilment", "2020 – 2022", ["Picked and packed orders during peak seasons for a large online retailer.", "Offered a permanent contract after three months because of reliability and accuracy."]),
    ],
    education: [entry("GCSEs including Maths and English", "Northbridge Academy", "2015 – 2020")],
    certifications: [entry("Counterbalance forklift licence", "RTITB-accredited training", "2021"), entry("Reach truck licence", "RTITB-accredited training", "2022"), entry("Manual Handling", "Example Training", "2023")],
    skills: "Warehouse: Picking and packing, goods in, dispatch, stock rotation, inventory counts\nEquipment: Counterbalance and reach trucks, pallet trucks, RF scanners\nSafety: Manual handling, PPE, safe loading, hazard reporting",
    profiles: [
      { label: "First warehouse job", text: "Fit and reliable school leaver looking for a first warehouse job. Used to physical work from helping in a family landscaping business, comfortable with early starts, and keen to train for a forklift licence." },
      { label: "Warehouse team leader", text: "Warehouse team leader with seven years in e-commerce fulfilment, managing shifts of up to 20 operatives. Improved night-shift pick accuracy through better slotting and short daily briefings, with a strong health and safety record." },
      { label: "Forklift driver", text: "Licensed forklift driver with counterbalance, reach, and very narrow aisle (VNA) experience in a chilled distribution centre. Safe, efficient, and used to loading trailers against tight dispatch times." },
    ],
    bullets: [
      "Consistently achieved 110% of pick-rate target with 99.8% order accuracy.",
      "Loaded and unloaded up to 12 trailers a shift safely using counterbalance and reach trucks.",
      "Completed weekly cycle counts and resolved stock discrepancies with the inventory team.",
      "Followed manual handling and PPE procedures with no safety incidents in four years.",
      "Trained six new starters on scanners, picking routes, and safety rules.",
      "Suggested a new bay layout for fast-moving items that shortened picking routes.",
      "Covered extra shifts and overtime during peak season to meet customer demand.",
      "Reported damaged stock and hazards promptly so problems were fixed quickly.",
    ],
    skillGroups: [
      { label: "Practical skills", items: ["Picking, packing, and dispatch", "Goods in and stock rotation", "RF scanners and warehouse systems", "Forklift and pallet truck operation", "Inventory counts", "Manual handling"] },
      { label: "Personal strengths", items: ["Reliability and good timekeeping", "Accuracy under pressure", "Physical stamina", "Teamwork", "Safety awareness"] },
    ],
    tips: [
      { heading: "Put licences near the top", text: "Forklift licences and equipment training can decide whether you are shortlisted. List each type, such as counterbalance or reach truck, with the year in your certifications section and mention them in your profile." },
      { heading: "Use numbers from your performance", text: "Pick rates, accuracy, and safety records are measured in most warehouses. Including them shows you can meet targets from your first week." },
      { heading: "Mention your shift flexibility", text: "Warehouses often run nights, weekends, and peak-season overtime. One line about the shifts you can work makes your CV more useful to the person planning rotas." },
    ],
    guides: ["your-first-cv", "keep-it-focused"],
  },
  {
    slug: "receptionist", job: "Receptionist", category: "Office & admin", template: "outline",
    seoTitle: "Receptionist CV Example — Free Template & Tips",
    faqs: [
      { question: "What should a receptionist CV include?", answer: "The setting you work in, the volume you handle in calls, visitors, or bookings, the systems you use, and how you keep a front desk organised. Mention confidentiality if you deal with patient, client, or legal information." },
      { question: "How do I make a receptionist CV stand out?", answer: "Show a moment where you improved the visitor experience or saved colleagues time, such as a new sign-in process or fewer missed appointments. That turns a routine role into evidence." },
      { question: "Is a receptionist CV different for a GP surgery or dental practice?", answer: "It needs more about appointment systems, patient confidentiality, and calm handling of worried callers. Name the patient record software you have used, because practices often train new staff on the same system." },
    ],
    description: "A receptionist CV example with a warm profile, front-desk experience, and organisational skills. Adapt it for office, salon, hotel, or medical reception.",
    intro: "A receptionist is often the first person visitors meet, so employers look for a professional manner, good organisation, and confidence with phones and booking systems. This example shows those skills through busy, real-world front-desk tasks.",
    person: { name: "Aisha Rahman", headline: "Receptionist", location: "Leicester, United Kingdom", phone: "+44 7700 900112" },
    summary: "Friendly and organised receptionist with three years of experience at busy front desks in healthcare and hospitality. Greets visitors professionally, manages calls and appointments across several systems, and keeps reception running smoothly at peak times.",
    experience: [
      entry("Receptionist", "Riverside Dental Practice", "2022 – Present", ["Welcome patients, manage check-ins, and keep the waiting area calm and tidy.", "Book, move, and confirm around 80 appointments a day using practice software.", "Take payments and explain treatment costs clearly.", "Reduced missed appointments by introducing text and phone reminders."]),
      entry("Front Desk Assistant", "The Marlowe Hotel", "2021 – 2022", ["Checked guests in and out and handled reservations by phone and email.", "Answered questions about local transport and attractions.", "Resolved guest complaints politely and passed issues to the duty manager."]),
    ],
    education: [entry("BTEC Level 3 in Travel and Tourism", "Northbridge College", "2019 – 2021")],
    skills: "Front desk: Visitor management, switchboard, appointment booking, payments\nSystems: Dental practice software, hotel booking systems, Microsoft 365\nOther: Data protection, complaint handling, multi-line phones",
    profiles: [
      { label: "First reception job", text: "Well-presented and friendly college leaver looking for a first receptionist role. Has customer-facing experience from a part-time cinema job, serving customers, answering questions, and handling payments accurately." },
      { label: "Medical receptionist", text: "Medical receptionist with four years in a busy GP surgery, handling appointments, prescription requests, and patient queries with care and discretion. Confident supporting patients who are anxious or unwell." },
      { label: "Corporate receptionist", text: "Corporate receptionist and office coordinator with five years at a professional services firm. Manages visitor security, meeting rooms, and couriers, and supports the office manager with events and supplies." },
    ],
    bullets: [
      "Greeted up to 100 visitors a day, creating a welcoming and professional first impression.",
      "Managed a multi-line switchboard, directing calls quickly and taking accurate messages.",
      "Booked and confirmed around 80 appointments a day across three clinicians' diaries.",
      "Reduced missed appointments by 30% by introducing reminder calls and texts.",
      "Took payments and balanced the till at the end of each day.",
      "Handled patient and guest information confidentially, in line with data protection rules.",
      "Resolved complaints calmly at the desk and escalated complex issues to managers.",
      "Kept the reception area tidy, stocked, and compliant with health and safety checks.",
    ],
    skillGroups: [
      { label: "Practical skills", items: ["Welcoming visitors and guests", "Switchboard and call handling", "Diary and appointment management", "Payments and cash handling", "Booking and practice systems", "Data protection"] },
      { label: "Personal strengths", items: ["Warm, professional manner", "Multitasking at busy times", "Organisation", "Discretion", "Clear communication"] },
    ],
    tips: [
      { heading: "Show that you can multitask", text: "Reception work means juggling calls, visitors, and bookings at once. Numbers such as calls per day or appointments managed show the pace you are used to." },
      { heading: "Match the setting", text: "Medical, hotel, salon, and corporate reception each use different systems and vocabulary. Tailor your profile and skills to the setting in the advert." },
      { heading: "Keep the presentation polished", text: "Employers often judge a receptionist's attention to detail from the CV itself. Check spelling, dates, and formatting carefully before you send it." },
    ],
    guides: ["before-you-send", "write-a-clear-profile"],
  },
  {
    slug: "student", job: "Student", category: "Students & graduates", template: "student",
    seoTitle: "Student & Graduate CV Example (No Experience Needed)",
    description: "A student and graduate CV example for school leavers, students, and fresh graduates with little work experience. See profiles, bullet points, and skills.",
    intro: "A student CV has to work with what you have: education, part-time work, projects, and activities. This example leads with a degree, then uses a part-time job, a society role, and a university project as real evidence of reliability, organisation, and teamwork.",
    person: { name: "Ellie Harper", headline: "Business Management Student", location: "Sheffield, United Kingdom", phone: "+44 7700 900113" },
    sectionOrder: ["summary", "education", "experience", "projects", "skills", "languages", "certifications", "additional"],
    summary: "Final-year Business Management student with experience from a retail job, a society committee role, and a charity consultancy project. Organised, reliable, and comfortable with customers. Looking for a graduate role in operations or marketing from July 2027.",
    education: [
      entry("BA (Hons) Business Management", "Northbridge University", "2024 – 2027 (expected)", ["On track for a 2:1. Modules include marketing analytics, operations management, and business finance."]),
      entry("A levels: Economics (A), Business (A), English Literature (B)", "Riverside Sixth Form College", "2022 – 2024"),
    ],
    experience: [
      entry("Sales Assistant (part-time)", "Fernway Home Store", "2023 – Present", ["Serve up to 80 customers on a Saturday shift, handling payments, returns, and click-and-collect orders.", "Trusted to open the store and cash up at the end of the day.", "Trained three new part-time colleagues on the till and stock procedures."]),
      entry("Treasurer (volunteer)", "University Hiking Society", "2025 – 2026", ["Managed a £6,000 annual budget and booked transport for 12 trips."]),
    ],
    projects: [entry("Consultancy project: volunteer recruitment", "Sheffield Food Network (university module)", "2026", ["With a team of four, surveyed 45 volunteers and recommended changes to the sign-up process; the trustees adopted two."])],
    skills: "Skills: Customer service, budgeting, research, presentations\nTools: Excel, PowerPoint, Canva, Google Analytics",
    languages: "English: Native\nSpanish: Conversational (B1)",
    profiles: [
      { label: "First-year student looking for part-time work", text: "First-year Sports Science student looking for weekend and holiday work. Experienced in customer service from two summers at a family-run café, where I took orders, handled payments, and kept the counter running at busy times. Reliable, punctual, and happy to learn." },
      { label: "Graduate applying for a graduate scheme", text: "Recent History graduate (2:1) with strong research and writing skills, developed through a dissertation based on archive work. Led a 20-member debating society and organised its first inter-university competition. Applying for graduate schemes in public policy and communications." },
      { label: "School leaver with no work experience", text: "School leaver with A levels in Maths, Chemistry, and Biology, looking for an apprenticeship in laboratory science. Completed a week of work experience at a hospital pathology lab and volunteer at a local youth club. Careful, organised, and keen to learn on the job." },
    ],
    bullets: [
      "Served up to 80 customers on busy Saturday shifts, keeping queues moving at the tills.",
      "Trained three new part-time colleagues on till procedures and stock replenishment.",
      "Managed a £6,000 society budget and kept spending within plan for the full year.",
      "Surveyed 45 charity volunteers and presented recommendations that the trustees adopted.",
      "Organised 12 society trips, booking transport and coordinating up to 40 attendees.",
      "Researched and wrote a 10,000-word dissertation using interviews with six shop owners.",
      "Built a sales tracker in Excel for a group project, used to compare five pricing scenarios.",
      "Volunteered weekly at a food bank, sorting donations and helping visitors.",
    ],
    skillGroups: [
      { label: "Transferable skills", items: ["Customer service", "Teamwork from group projects", "Budgeting and handling money", "Research and report writing", "Presentations", "Time management alongside study"] },
      { label: "Practical skills", items: ["Microsoft Excel and PowerPoint", "Google Workspace", "Canva", "Social media for a club or society", "A second language"] },
    ],
    tips: [
      { heading: "Lead with your education", text: "When your degree, A levels, or course is your strongest evidence, put it first. Add a grade or predicted grade if it helps, and two or three relevant modules or a dissertation topic." },
      { heading: "Count every kind of experience", text: "Part-time jobs, volunteering, society roles, sports, and group projects all show employers how you work. Describe them with the same care as a full-time job: what you did and what changed." },
      { heading: "Use small numbers honestly", text: "“Served up to 80 customers on a shift” or “managed a £6,000 budget” gives a reader scale. Use figures you can explain, even if they seem modest." },
      { heading: "Keep it to one page", text: "A student CV rarely needs more than one page. Cut anything that does not support the application, and save longer detail for a cover letter or interview." },
    ],
    guides: ["your-first-cv", "write-a-clear-profile"],
  },
  {
    slug: "data-analyst", job: "Data analyst", category: "Technology", template: "horizon",
    seoTitle: "Data Analyst CV Example & Resume Template — Free",
    description: "A data analyst CV example with SQL, Power BI, and Python skills, results-led bullet points, and three profile examples. Edit it free and download a PDF.",
    intro: "Hiring managers for data roles want to see the tools you use and, above all, what your analysis changed. This example names the technical stack clearly, then describes each role through the decisions and time savings the work made possible.",
    person: { name: "Nadia Hassan", headline: "Data Analyst", location: "Cambridge, United Kingdom", phone: "+44 7700 900114" },
    summary: "Data analyst with four years of experience turning sales and customer data into reports that teams use to make decisions. Strong in SQL, Power BI, and Python, with a habit of checking data quality before anyone sees a number. Enjoys explaining findings to non-technical colleagues.",
    experience: [
      entry("Data Analyst", "Fenbridge Retail Group", "2023 – Present", ["Build and maintain Power BI dashboards for sales, stock, and customer teams across 40 stores.", "Write SQL queries against a cloud data warehouse to answer weekly questions from managers.", "Automated a monthly stock report in Python, saving the finance team two days each month.", "Analysed a loyalty scheme trial and recommended changes adopted in the national roll-out."]),
      entry("Junior Data Analyst", "Clearwater Insurance", "2021 – 2023", ["Cleaned and reconciled claims data from three legacy systems for monthly reporting.", "Built Excel models to track contact-centre performance against service targets.", "Documented data definitions so that teams reported the same figures."]),
    ],
    education: [entry("BSc (Hons) Mathematics", "Northbridge University", "2017 – 2021")],
    certifications: [entry("Microsoft Certified: Power BI Data Analyst Associate", "Microsoft", "2023")],
    skills: "Analysis: SQL, Python (pandas), Excel, A/B testing, statistics\nVisualisation: Power BI, Tableau, dashboard design\nData: Data cleaning, data modelling, BigQuery, dbt",
    profiles: [
      { label: "Senior data analyst", text: "Senior data analyst with eight years in e-commerce, leading a team of three. Owns the company’s core performance metrics and the dashboards the leadership team reviews each week. Experienced in experiment design and in turning analysis into product decisions." },
      { label: "Graduate data analyst", text: "Statistics graduate with a placement year in a bank’s reporting team, where I automated a weekly report in Python. Final-year project: predicting bike-share demand from weather data. Comfortable with SQL, Excel, and Power BI, and keen to learn from an experienced analytics team." },
      { label: "Moving into data from finance", text: "Management accountant moving into data analysis after five years of budgeting and variance reporting. Recently completed a SQL and Python course and rebuilt my team’s monthly reporting in Power BI. Brings a strong eye for reconciling figures and explaining them to managers." },
    ],
    bullets: [
      "Built a Power BI sales dashboard used weekly by 40 store managers, replacing six separate spreadsheets.",
      "Automated a monthly stock report in Python, saving the finance team two days of manual work each month.",
      "Wrote SQL queries to analyse a loyalty scheme trial, leading to changes adopted in the national roll-out.",
      "Designed and analysed A/B tests on email campaigns, reporting results with clear confidence ranges.",
      "Reconciled claims data from three legacy systems, fixing errors that had inflated monthly totals.",
      "Created shared data definitions so finance and operations reported the same figures.",
      "Presented quarterly findings to directors in plain language, with one recommendation per slide.",
      "Trained eight colleagues to use self-service dashboards instead of requesting ad hoc reports.",
    ],
    skillGroups: [
      { label: "Technical skills", items: ["SQL", "Python (pandas)", "Power BI or Tableau", "Advanced Excel", "Data cleaning and modelling", "A/B testing and statistics", "Cloud data warehouses such as BigQuery"] },
      { label: "Working skills", items: ["Explaining data to non-technical audiences", "Attention to detail", "Prioritising stakeholder requests", "Curiosity", "Documentation"] },
    ],
    tips: [
      { heading: "Lead with the decision, not the dashboard", text: "A dashboard is only interesting because of what people did with it. Say who used your analysis and what changed: time saved, a decision made, or an error found." },
      { heading: "Name your tools precisely", text: "Recruiters often search for specific tools such as SQL, Power BI, Tableau, or Python. List the ones you use confidently, and mention the libraries or platforms where they matter." },
      { heading: "Show that you care about data quality", text: "Cleaning, reconciling, and documenting data is a large part of the job. One bullet about catching errors or defining metrics shows you can be trusted with the numbers." },
      { heading: "Link to a portfolio if you have one", text: "A short write-up of one analysis, with the question, the method, and the result, can say more than a list of skills. Keep company data confidential." },
    ],
    guides: ["describe-your-experience", "ats-friendly-cv"],
  },
  {
    slug: "graphic-designer", job: "Graphic designer", category: "Marketing & creative", template: "atelier",
    seoTitle: "Graphic Designer CV Example — Free Resume Template",
    description: "A graphic designer CV example with brand, packaging, and campaign work, a portfolio link, and design software skills. Edit it free and download a PDF.",
    intro: "A designer’s CV is read alongside a portfolio, so its job is to give context: the kinds of clients, the scope of each project, and how you work with others. This example keeps the layout distinctive but readable, and lets the portfolio carry the visuals.",
    person: { name: "Sofia Marques", headline: "Graphic Designer", location: "Liverpool, United Kingdom", phone: "+44 7700 900115", website: "sofiamarques.example" },
    summary: "Graphic designer with six years of experience creating brand identities, packaging, and campaign artwork for consumer brands. Confident from first sketch to print-ready files, and comfortable presenting ideas to clients. Portfolio includes work for food, retail, and charity clients.",
    experience: [
      entry("Graphic Designer", "Northlight Studio", "2022 – Present", ["Lead design on brand identity projects for small and mid-sized consumer brands, from concept to guidelines.", "Designed packaging for a range of 12 snack products, managing print proofs with the manufacturer.", "Create social and display artwork for campaigns, adapting layouts to more than 20 formats.", "Present concepts to clients and turn feedback into clear revisions."]),
      entry("Junior Designer", "Pressmark Print & Design", "2019 – 2022", ["Prepared print-ready files for brochures, signage, and exhibition stands.", "Produced menus, posters, and leaflets for local hospitality clients.", "Checked colour proofs and fixed prepress issues before files went to print."]),
    ],
    education: [entry("BA (Hons) Graphic Design", "Northbridge School of Art", "2016 – 2019")],
    projects: [entry("Rebrand for a community theatre", "Volunteer project", "2024", ["Designed a new logo, poster system, and website graphics for a volunteer-run theatre."])],
    skills: "Design: Brand identity, typography, layout, packaging, illustration\nSoftware: Adobe Illustrator, Photoshop, InDesign, Figma, After Effects\nProduction: Print production, prepress, digital formats",
    profiles: [
      { label: "Senior or lead designer", text: "Senior designer with ten years in agency and in-house teams, leading brand work for national retail and hospitality clients. Manages a team of three designers, sets creative direction, and presents to client leadership. Known for clear briefs and well-organised design systems." },
      { label: "Graduate designer", text: "Graphic design graduate with a portfolio of identity, editorial, and packaging projects, including a live brief for a local brewery. Confident in Illustrator, InDesign, and Figma, and keen to join a studio where I can learn print production from experienced designers." },
      { label: "Freelance designer moving in-house", text: "Freelance designer with five years of experience working directly with small businesses on logos, websites, and marketing materials. Used to managing my own projects and deadlines, and now looking to bring that independence to an in-house brand team." },
    ],
    bullets: [
      "Led a brand identity for a regional bakery chain, from workshops to a 40-page brand guideline.",
      "Designed packaging for 12 snack products, approving print proofs with the manufacturer on time for launch.",
      "Adapted a campaign’s key artwork to more than 20 social, display, and print formats.",
      "Presented three concepts per project to clients and turned feedback into focused revisions.",
      "Built a shared Figma library of templates that cut the time to produce social posts.",
      "Prepared print-ready files for exhibition stands, checking bleeds, colour profiles, and fonts.",
      "Worked with copywriters and marketers to plan layouts that put the main message first.",
      "Mentored a placement student through their first client project.",
    ],
    skillGroups: [
      { label: "Design skills", items: ["Brand identity", "Typography and layout", "Packaging design", "Illustration", "Print production and prepress", "Digital and social formats"] },
      { label: "Working skills", items: ["Presenting concepts", "Taking and applying feedback", "Understanding a brief", "Managing deadlines", "Collaboration with copy and marketing"] },
    ],
    tips: [
      { heading: "Put your portfolio link at the top", text: "Most design employers will look at your portfolio before reading the CV in detail. Add the link to your contact details, check it works, and lead with work relevant to the role." },
      { heading: "Describe scope and outcome", text: "For each project, say what you designed, for whom, and what happened next: a launch, a campaign, or a measurable result if you have one. It gives your portfolio pieces context." },
      { heading: "Let the CV show taste without hiding information", text: "A considered layout helps, but recruiters and application systems still need to read it. Keep headings clear and text selectable; save the experimental work for your portfolio." },
      { heading: "Tailor for studio or in-house roles", text: "Studios look for range and client handling. In-house teams look for brand consistency and working with marketing. Adjust your profile and bullets for each." },
    ],
    guides: ["choose-your-template", "describe-your-experience"],
  },
  {
    slug: "frontend-developer", job: "Frontend developer", category: "Technology", template: "monogram",
    seoTitle: "Frontend & Web Developer CV Example — Free Template",
    description: "A frontend and web developer CV example with React, TypeScript, accessibility, and performance results, plus three profile examples. Edit it free.",
    intro: "A frontend or web developer CV should show the stack you build with and the quality of what you ship: accessible, fast, well-tested interfaces. This example pairs a grouped skills section with bullets that name concrete improvements in performance and accessibility.",
    person: { name: "Arjun Mehta", headline: "Frontend Developer", location: "Reading, United Kingdom", phone: "+44 7700 900116", website: "arjunmehta.example" },
    summary: "Frontend developer with four years of experience building accessible, responsive interfaces in React and TypeScript. Works closely with designers to turn Figma files into reusable components, and cares about performance and keyboard accessibility. Currently maintaining the design system for a SaaS product.",
    experience: [
      entry("Frontend Developer", "Lumen Analytics", "2023 – Present", ["Maintain a React and TypeScript design system used by three product teams.", "Improved Largest Contentful Paint on the main dashboard from 4.1 s to 1.9 s by splitting code and optimising images.", "Fixed keyboard and screen reader issues across key journeys to meet WCAG 2.2 AA.", "Write component tests with Vitest and end-to-end tests with Playwright."]),
      entry("Junior Web Developer", "Brightside Digital", "2021 – 2023", ["Built responsive marketing sites and landing pages for agency clients.", "Converted Figma designs into semantic HTML, CSS, and JavaScript.", "Integrated headless CMS content and REST APIs into Next.js sites."]),
    ],
    education: [entry("BSc (Hons) Computer Science", "Northbridge University", "2018 – 2021")],
    projects: [entry("Colour contrast helper", "Open-source project", "2025", ["Built a small web app that suggests accessible colour pairs for text and backgrounds."])],
    skills: "Frontend: React, TypeScript, JavaScript, Next.js, HTML, CSS, Tailwind CSS\nQuality: Accessibility (WCAG), Vitest, Playwright, web performance\nTools: Git, Figma, Storybook, GitHub Actions",
    profiles: [
      { label: "Senior frontend developer", text: "Senior frontend engineer with eight years of experience leading the web platform for a fintech product. Set up the team’s design system, testing strategy, and performance budgets, and mentors four developers. Comfortable owning architecture decisions with product and design." },
      { label: "Junior frontend developer", text: "Junior frontend developer with a year of agency experience building responsive sites in React and Next.js. Strong HTML and CSS foundations, with a growing interest in accessibility testing. Looking for a team with thorough code reviews and a design system to learn from." },
      { label: "Designer moving into frontend", text: "UI designer moving into frontend development after five years in product design. Builds my own prototypes in React and TypeScript and recently shipped a component library for a side project. Brings a strong eye for detail and fluent collaboration with designers." },
    ],
    bullets: [
      "Cut Largest Contentful Paint on the main dashboard from 4.1 s to 1.9 s through code splitting and image optimisation.",
      "Maintained a React design system of 60 components used by three product teams.",
      "Brought sign-up and checkout journeys up to WCAG 2.2 AA, testing with keyboard and screen reader.",
      "Added Playwright end-to-end tests for critical journeys, catching regressions before release.",
      "Converted Figma designs into reusable, documented components in Storybook.",
      "Migrated a legacy CSS codebase to Tailwind CSS page by page, without visual regressions.",
      "Integrated a headless CMS so marketers could publish landing pages without developer help.",
      "Reviewed pull requests and paired with junior developers on accessibility fixes.",
    ],
    skillGroups: [
      { label: "Technical skills", items: ["React and Next.js", "TypeScript and JavaScript", "Semantic HTML and modern CSS", "Web accessibility (WCAG)", "Web performance", "Testing with Vitest, Jest, or Playwright", "Design systems and Storybook"] },
      { label: "Working skills", items: ["Collaboration with designers", "Code review", "Explaining technical trade-offs", "Attention to detail", "User empathy"] },
    ],
    tips: [
      { heading: "Show quality, not just features", text: "Frontend roles reward care: accessible, fast, well-tested interfaces. Bullets about performance metrics, accessibility fixes, and test coverage set you apart from a list of frameworks." },
      { heading: "Use real numbers for performance", text: "Metrics such as Largest Contentful Paint or bundle size are easy to measure and easy to understand. Give before-and-after figures you can explain." },
      { heading: "Link to live work and code", text: "A portfolio, a GitHub profile, or a deployed project helps reviewers see your work. Make sure the links work and the best projects are easy to find." },
      { heading: "Mirror the stack in the advert", text: "If the job lists React, TypeScript, and Next.js, use those exact names where they are true for you. The resume keyword checker can show any gaps." },
    ],
    guides: ["describe-your-experience", "ats-friendly-cv"],
  },
  {
    slug: "teaching-assistant", job: "Teaching assistant", category: "Education", template: "swiss",
    seoTitle: scheduled("/cv-examples/teaching-assistant/").title,
    description: scheduled("/cv-examples/teaching-assistant/").description,
    intro: "Schools hiring teaching assistants want to know how you support learning, how you keep children safe, and whether you can follow a teacher's plan while adapting it for each child. This example puts SEND experience, safeguarding training, and the progress pupils made where a head teacher or SENCo will look first.",
    person: { name: "Megan Price", headline: "Teaching Assistant (SEND)", location: "Bristol, United Kingdom", phone: "+44 7700 900141" },
    summary: "Teaching assistant with four years in a two-form-entry primary school, supporting Key Stage 2 pupils with special educational needs, including autism and dyslexia. Runs daily phonics and reading interventions in small groups, adapts resources to each child's EHCP targets, and keeps clear notes for the class teacher and SENCo. Holds a Level 3 Certificate for Teaching Assistants and current safeguarding training.",
    experience: [
      entry("Teaching Assistant (SEND)", "Hollybrook Primary School, Bristol", "2022 – Present", ["Support a Year 5 class of 30, working one to one with two pupils who have education, health and care plans.", "Deliver daily phonics and reading interventions to groups of four to six pupils.", "Adapt worksheets and visual timetables so pupils with autism can follow lessons independently.", "Record progress against EHCP targets and contribute to termly reviews with parents and the SENCo."]),
      entry("Midday Supervisor", "Hollybrook Primary School, Bristol", "2021 – 2022", ["Supervised lunch and play for Key Stage 1, encouraging cooperative games and settling disagreements calmly."]),
    ],
    education: [entry("Level 3 Certificate for Teaching Assistants", "Avonside Community College", "2021 – 2022"), entry("GCSEs including English Language (6) and Maths (5)", "Harbourside Academy, Bristol", "2014 – 2019")],
    certifications: [entry("Safeguarding and Child Protection, Level 2", "Local authority training", "2025"), entry("Paediatric First Aid", "Approved training provider", "2024")],
    skills: "Learning support: Phonics and reading interventions, SEND support, Small-group teaching, Behaviour support\nPractical: Visual timetables, Adapted resources, Progress notes, Makaton (basic)\nSafeguarding: Level 2 safeguarding, Paediatric first aid",
    profiles: [
      { label: "First teaching assistant role", text: "Caring and patient candidate looking for a first teaching assistant role after volunteering two mornings a week in a Year 1 classroom. Experienced in listening to readers, preparing resources, and supporting children at play. Studying for a Level 2 Certificate in Supporting Teaching and Learning." },
      { label: "Higher level teaching assistant", text: "HLTA-status teaching assistant with eight years in primary schools, covering planned lessons for whole classes and leading the school's reading intervention programme. Trains new support staff and works closely with the SENCo on provision maps." },
      { label: "Secondary school", text: "Teaching assistant in an 11 to 16 academy, supporting maths and science lessons for Key Stage 3 and 4 students with additional needs. Experienced as a reader and scribe for exam access arrangements, and at keeping students on task in practical lessons." },
    ],
    bullets: [
      "Raised the reading age of six Year 4 pupils by an average of 14 months over two terms through daily guided reading.",
      "Helped a pupil with autism move from part-time to full-time attendance by introducing a visual timetable and a calm space.",
      "Delivered phonics sessions to small groups and tracked progress on the school's assessment sheets.",
      "Adapted maths resources with concrete objects so pupils working below year-group expectations could join whole-class lessons.",
      "Acted as a reader and scribe for Key Stage 2 SATs access arrangements.",
      "Ran a lunchtime social skills club for eight pupils, building turn-taking and conversation.",
      "Wrote clear daily notes in home-school diaries for pupils with communication needs.",
      "Followed safeguarding procedures and reported every concern to the designated safeguarding lead the same day.",
    ],
    skillGroups: [
      { label: "Practical skills", items: ["Phonics and reading interventions", "Supporting pupils with SEND", "Adapting resources", "Behaviour support strategies", "Recording progress against targets", "Exam access arrangements"] },
      { label: "Personal strengths", items: ["Patience and calm", "Clear communication with children and parents", "Working closely with teachers", "Reliability", "Discretion with sensitive information"] },
    ],
    tips: [
      { heading: "Name the needs you have supported", text: "SEND covers a wide range. Saying you have supported pupils with autism, dyslexia, or speech and language needs tells a SENCo far more than \"experience with SEND\"." },
      { heading: "Put safeguarding where it's seen", text: "Schools must recruit safely, so list your safeguarding training and the year in its own section, and say whether you hold an enhanced DBS check or are willing to get one." },
      { heading: "Show progress, not just support", text: "A bullet about reading ages, attendance, or confidence shows the difference you made. Use the measures your school already tracks." },
    ],
    guides: ["teacher-cv-personal-statement", "write-a-clear-profile"],
    faqs: [
      { question: "Do I need a qualification to be a teaching assistant?", answer: "Not always. Many schools take on teaching assistants without one, especially with volunteering or childcare experience, but a Level 2 or 3 teaching assistant certificate strengthens an application and is often listed as desirable." },
      { question: "Should a teaching assistant CV mention the DBS check?", answer: "Yes. Say whether you hold a current enhanced DBS certificate or are on the Update Service. Schools run their own checks, but it shows you understand safer recruitment." },
      { question: "How long should a teaching assistant CV be?", answer: "Two pages at most, and one page is fine for a first role. Many schools also use an application form, so keep the CV consistent with what you write there." },
    ],
  },
  {
    slug: "chef", job: "Chef", category: "Retail & hospitality", template: "summit",
    seoTitle: scheduled("/cv-examples/chef/").title,
    description: scheduled("/cv-examples/chef/").description,
    intro: "Head chefs and restaurant owners reading a chef CV want to know what kind of kitchen you've worked in, how many covers you can handle, and whether you keep food safe and costs under control. This example answers all of that in the first half of the page.",
    person: { name: "Daniel Okoye", headline: "Sous Chef", location: "Manchester, United Kingdom", phone: "+44 7700 900152" },
    summary: "Sous chef with seven years in busy brasseries and hotel kitchens, currently running the pass for up to 220 covers on a Saturday. Develops seasonal specials with the head chef, manages a brigade of six, and keeps food gross profit at 70% through careful ordering and portion control. Holds Level 3 Food Safety in Catering, and the kitchen scored a 5 hygiene rating at its last two inspections.",
    experience: [
      entry("Sous Chef", "The Linden Brasserie, Manchester", "2022 – Present", ["Run the pass for up to 220 covers on Saturdays and lead the kitchen on the head chef's days off.", "Manage a brigade of six, including two apprentices, and write the weekly rota.", "Develop four seasonal specials a month and cost every dish before it reaches the menu.", "Keep food gross profit at 70% by tightening ordering and introducing portion guides."]),
      entry("Chef de Partie", "Grand Mercer Hotel, Leeds", "2019 – 2022", ["Ran the sauce and grill sections for the hotel restaurant and banquets of up to 300 guests.", "Trained commis chefs in knife skills, allergen procedures, and section prep."]),
      entry("Commis Chef", "Bramble & Rye, Leeds", "2017 – 2019", ["Prepared vegetables, sauces, and desserts and kept the larder section clean and organised."]),
    ],
    education: [entry("Level 3 Diploma in Professional Cookery", "Aire Valley College", "2015 – 2017")],
    certifications: [entry("Level 3 Award in Food Safety in Catering", "Accredited training provider", "2024"), entry("Allergen awareness training", "Food Standards Agency online course", "2025")],
    skills: "Kitchen: Running the pass, Menu development, Dish costing, Ordering and stock control\nFood safety: HACCP, Allergen management, Temperature logs, Hygiene inspections\nLeadership: Rotas, Training apprentices, Brigade management",
    profiles: [
      { label: "Commis chef", text: "Commis chef with a Level 2 Diploma in Professional Cookery and a year in a busy pub kitchen, preparing starters and desserts for up to 150 covers. Quick, tidy, and keen to learn every section under an experienced head chef." },
      { label: "Head chef", text: "Head chef with 12 years in independent restaurants, responsible for menus, a team of 10, and a £400,000 annual food budget. Built a seasonal, locally sourced menu that won a regional food award while keeping gross profit above 72%." },
      { label: "Moving into contract catering", text: "Chef de partie moving from restaurants into contract catering, with large-batch cooking experience from banqueting and a strong record on allergens and food safety. Looking for regular daytime hours in a school or workplace kitchen." },
    ],
    bullets: [
      "Ran the pass for 220 covers on a Saturday with average ticket times under 15 minutes.",
      "Cut food waste by around a fifth by introducing daily prep sheets based on bookings.",
      "Costed every new dish and kept food gross profit at 70% across two menu changes.",
      "Created a vegan tasting menu that became a regular Friday feature.",
      "Led the kitchen through two environmental health inspections, both rated 5.",
      "Trained two apprentices who went on to pass their Level 2 cookery qualification.",
      "Set up allergen matrices for every menu and briefed front of house before each service.",
      "Switched to a new produce supplier, saving about £300 a month without lowering quality.",
    ],
    skillGroups: [
      { label: "Kitchen skills", items: ["Running the pass", "Sauce and grill sections", "Menu planning and costing", "Butchery and fish preparation", "Pastry basics", "Large-batch and banqueting cooking"] },
      { label: "Food safety and management", items: ["HACCP and temperature control", "Allergen management", "Ordering and stock rotation", "Rota planning", "Training junior chefs"] },
    ],
    tips: [
      { heading: "Describe the kitchen as well as the role", text: "A sous chef in a 40-cover bistro and one in a 300-cover hotel do very different jobs. Give covers, cuisine, and style so the reader can picture where you've worked." },
      { heading: "Show you understand the money", text: "Gross profit, waste, and supplier costs matter to every owner. One bullet on costing or waste shows you think beyond the plate." },
      { heading: "Make food safety visible", text: "List your food hygiene level and allergen training, and mention inspection results you contributed to. Head chefs often check these first." },
    ],
    guides: ["describe-your-experience", "resume-action-verbs-and-bullet-points"],
    faqs: [
      { question: "What should a chef put on a CV?", answer: "The kitchens you've worked in and their size, your section or level, food safety and allergen training, and results such as gross profit, waste reduction, or inspection ratings. A line on your cuisine strengths helps a head chef see the fit." },
      { question: "Should a chef CV include photos of dishes?", answer: "Not on the CV itself. Add a link to an online portfolio in your contact line if it shows your own professional work, and bring photos to a trial shift." },
      { question: "Do I need a food hygiene certificate to apply for chef jobs?", answer: "Most kitchens expect at least Level 2 Food Safety and Hygiene for Catering, and senior chefs often hold Level 3. Put the level and year in a certifications section." },
    ],
  },
  {
    slug: "electrician", job: "Electrician", category: "Logistics & trades", template: "tide",
    seoTitle: scheduled("/cv-examples/electrician/").title,
    description: scheduled("/cv-examples/electrician/").description,
    intro: "Electrical contractors and facilities managers read a CV for proof that you're qualified, safe, and productive on site. This example puts NVQ Level 3, the 18th Edition, the AM2, and the ECS card in plain view, then backs them up with the jobs and systems you've worked on.",
    person: { name: "Liam Hughes", headline: "Approved Electrician (ECS Gold Card)", location: "Sheffield, United Kingdom", phone: "+44 7700 900163" },
    summary: "Qualified electrician with eight years in domestic and commercial installation, six of them since completing NVQ Level 3 and the AM2. Installs, tests, and certifies circuits to BS 7671, from full house rewires to distribution boards in offices and shops. Holds an ECS Gold Card, the 18th Edition, and 2391 Inspection and Testing, and runs small jobs from survey to sign-off.",
    experience: [
      entry("Approved Electrician", "Brightline Electrical Contractors, Sheffield", "2021 – Present", ["Lead installations on commercial fit-outs of up to 1,500 square metres, working with a mate and an apprentice.", "Test, inspect, and certify new installations, issuing Electrical Installation Certificates.", "Carry out around 15 EICRs a month on rented homes and small businesses.", "Install EV chargers and consumer unit upgrades to current regulations."]),
      entry("Electrician", "Ridgeway Domestic Electrical, Rotherham", "2018 – 2021", ["Completed full and partial rewires, kitchen and bathroom circuits, and fault finding for domestic customers."]),
      entry("Apprentice Electrician", "Ridgeway Domestic Electrical, Rotherham", "2014 – 2018", ["Completed a four-year apprenticeship while working on new-build housing sites."]),
    ],
    education: [entry("NVQ Level 3 Diploma in Installing Electrotechnical Systems and Equipment", "Completed through apprenticeship", "2018"), entry("AM2 assessment", "National Electrotechnical Training", "2018")],
    certifications: [entry("18th Edition Wiring Regulations (BS 7671)", "City & Guilds 2382", "2023"), entry("Inspection and Testing (2391-52)", "City & Guilds", "2022"), entry("ECS Gold Card, Approved Electrician", "JIB", "Valid to 2027")],
    skills: "Installation: Domestic and commercial wiring, Consumer units and distribution boards, Containment and trunking, EV charger installation\nTesting: Initial verification, Periodic inspection (EICR), Fault finding, Certification software\nSafety: Safe isolation, Risk assessments and method statements, Working at height",
    profiles: [
      { label: "Electrical apprentice", text: "Second-year electrical apprentice working towards NVQ Level 3, with experience on new-build housing sites first-fixing cables and fitting accessories under supervision. Reliable, safety-conscious, and keen to complete the AM2 and qualify." },
      { label: "Maintenance electrician", text: "Maintenance electrician with ten years in food manufacturing, keeping production lines running through planned maintenance and fast fault finding on three-phase motors, PLC-controlled equipment, and lighting. Holds the 18th Edition and an ECS card." },
      { label: "Self-employed, moving in-house", text: "Self-employed domestic electrician for six years, registered with a competent person scheme and handling everything from quotes to certification. Looking for an employed role with a contractor that offers commercial work and larger projects." },
    ],
    bullets: [
      "Led the electrical installation for a 1,500 square metre office fit-out, finishing a week ahead of programme.",
      "Carried out around 15 EICRs a month, reporting C1 and C2 defects clearly for landlords.",
      "Installed and commissioned more than 60 home EV chargers to the current IET Code of Practice.",
      "Traced an intermittent fault in a shop's lighting circuit that two previous contractors had missed.",
      "Mentored two apprentices through their NVQ portfolios and site assessments.",
      "Completed every job with full certification and no workmanship call-backs in the last year.",
      "Wrote risk assessments and method statements for work on occupied commercial sites.",
      "Kept van stock and test equipment calibration records up to date for company audits.",
    ],
    skillGroups: [
      { label: "Technical skills", items: ["Domestic and commercial installation", "Consumer unit and board changes", "Testing and certification", "Fault finding", "EV charger installation", "Containment and cable management"] },
      { label: "Site and safety", items: ["Safe isolation procedures", "Writing RAMS", "Working at height", "Reading drawings and specifications", "Mentoring apprentices"] },
    ],
    tips: [
      { heading: "Put your cards and tickets near the top", text: "Contractors filter on qualifications first. List NVQ Level 3, the AM2, the 18th Edition, 2391, and your ECS card with dates, so nobody has to search for them." },
      { heading: "Say what kind of work you do", text: "Domestic, commercial, industrial, and maintenance roles need different experience. Name the sites and systems you know, such as three-phase supplies, fire alarms, or EV chargers." },
      { heading: "Show you finish jobs properly", text: "Certification, tidy work, and no call-backs matter to every employer. A bullet about quality sets you apart from candidates who only list tasks." },
    ],
    guides: ["describe-your-experience", "keep-it-focused"],
    faqs: [
      { question: "What qualifications should an electrician list on a CV?", answer: "Your NVQ Level 3 or equivalent, the AM2, the current 18th Edition certificate, any inspection and testing qualification such as 2391, and your ECS card with its expiry date." },
      { question: "Should I include my driving licence on an electrician CV?", answer: "Yes. Most electrical jobs involve driving between sites, so a full UK licence is often essential. Mention it in your skills or a short additional information line." },
      { question: "How do I write an electrician CV as an apprentice?", answer: "Lead with your apprenticeship, the college and qualification you're working towards, and the sites you've worked on. List the tasks you're trusted with, such as first fix or testing under supervision." },
    ],
  },
  {
    slug: "apprentice", job: "Apprentice", category: "Students & graduates", template: "compact",
    seoTitle: scheduled("/cv-examples/apprentice/").title,
    description: scheduled("/cv-examples/apprentice/").description,
    intro: "Employers reading an apprentice CV know you're at the start of your career. They're looking for signs that you're reliable, practical, and genuinely interested in the work. This example shows how a school leaver fills a page with GCSEs, a work experience placement, a project, and a weekend job.",
    person: { name: "Kian Patel", headline: "School leaver seeking an engineering apprenticeship", location: "Coventry, United Kingdom", phone: "+44 7700 900174" },
    summary: "Motivated school leaver with nine GCSEs, including Maths (7), Engineering (6), and Physics (6), looking for a Level 3 engineering apprenticeship. Spent a week's work experience at a precision engineering firm checking machined parts, and built a working remote-controlled buggy for GCSE Engineering. Reliable, careful with detail, and keen to learn on the job.",
    sectionOrder: ["summary", "education", "experience", "projects", "skills", "additional", "languages", "certifications"],
    experience: [
      entry("Stock Assistant (part-time)", "Bridgeway DIY, Coventry", "Sep 2026 – Present", ["Unload deliveries and restock the tools and fixings aisles on weekend shifts.", "Help customers find the right fixings and explain how products work."]),
      entry("Work Experience Placement", "Midlands Precision Components, Coventry", "Jul 2025 (one week)", ["Measured and checked machined parts with callipers and micrometers under supervision.", "Shadowed CNC machinists to learn how drawings, tolerances, and quality checks fit together.", "Completed the site health and safety induction, including PPE and machine guarding."]),
    ],
    education: [entry("GCSEs: Maths 7, Engineering 6, Physics 6, Chemistry 6, English Language 5, and four more at grades 4 to 6", "Whitley Park Academy, Coventry", "2021 – 2026")],
    projects: [entry("Remote-controlled buggy, GCSE Engineering project", "Whitley Park Academy", "2025 – 2026", ["Designed the chassis in CAD, cut and assembled the parts, and wired the motor controller.", "Tested and adjusted the steering until the buggy finished the course without stalling."])],
    skills: "Practical: Hand tools, Measuring with callipers and micrometers, Basic CAD (Fusion 360), Soldering\nWorkplace: Following safety procedures, Teamwork, Timekeeping\nDigital: Microsoft Word and Excel, Google Workspace",
    additional: { title: "Achievements", text: "F1 in Schools team member; our car reached the regional final in 2025" },
    profiles: [
      { label: "Construction apprenticeship", text: "Hard-working school leaver with GCSEs in Maths and English at grade 5, looking for a carpentry apprenticeship. Built a garden shed with a relative over the summer and completed a construction taster course at college, so I know what site work involves and enjoy it." },
      { label: "Business administration apprenticeship", text: "Organised school leaver with eight GCSEs, including English 6 and Maths 6, looking for a Level 3 business administration apprenticeship. Treasurer of the school charity committee, recording £1,200 raised in a year, and confident with Excel and email." },
      { label: "Digital apprenticeship", text: "Curious, practical school leaver applying for a Level 3 IT support or software apprenticeship. Built two simple websites and a Python game in my spare time, and help family and neighbours set up phones, laptops, and Wi-Fi." },
    ],
    bullets: [
      "Measured and recorded the dimensions of 40 machined parts during a week of engineering work experience.",
      "Designed and built a remote-controlled buggy for GCSE Engineering, from CAD drawing to final test.",
      "Kept the fixings aisle stocked and tidy across busy weekend shifts at a DIY store.",
      "Helped customers choose the right screws, wall plugs, and tools for their projects.",
      "Completed a full health and safety induction, including PPE and machine guarding rules.",
      "Worked in a team of four to design and race a model car in the F1 in Schools competition.",
      "Repaired donated bikes with friends and sold them at a school charity stall.",
      "Hasn't missed or been late for a shift in the first three months of a weekend job.",
    ],
    skillGroups: [
      { label: "Practical skills", items: ["Using hand and power tools safely", "Measuring and checking parts", "Basic CAD", "Following technical drawings", "Soldering and simple wiring"] },
      { label: "Personal strengths", items: ["Reliability and good timekeeping", "Willingness to learn", "Attention to detail", "Teamwork", "Following instructions"] },
    ],
    tips: [
      { heading: "Lead with the apprenticeship you want", text: "Name the type and level of apprenticeship in your profile, such as a Level 3 engineering apprenticeship. Employers often recruit for several schemes at once." },
      { heading: "Use school projects as evidence", text: "A practical project shows the skills an employer will build on. Describe what you made, the tools you used, and a problem you solved along the way." },
      { heading: "Show you're dependable", text: "Reliability matters as much as grades to most apprenticeship employers. A weekend job, a sports commitment, or strong attendance is worth a line." },
    ],
    guides: ["your-first-cv", "skills-for-a-first-job-resume"],
    faqs: [
      { question: "What should I put on a CV for an apprenticeship?", answer: "Your GCSE or other results, any work experience placement or part-time job, school or personal projects, and the practical skills you've used. Name the apprenticeship and level you want in your profile." },
      { question: "Do I need work experience to get an apprenticeship?", answer: "No. Apprenticeships are designed for people starting out, and employers expect to train you. A school placement, a weekend job, or a practical hobby still helps show you're ready." },
      { question: "Should I include predicted or actual GCSE grades?", answer: "Give your actual grades once you have them, especially English and Maths, which many apprenticeships ask for at grade 4 or above. If you're still at school, give predicted grades and label them clearly." },
    ],
  },
  {
    slug: "computer-science-co-op", job: "Computer science co-op", category: "Technology", template: "compact",
    seoTitle: scheduled("/cv-examples/computer-science-co-op/").title,
    description: scheduled("/cv-examples/computer-science-co-op/").description,
    intro: "Co-op employers in Canada hire students for a specific four-month work term, and they read resumes for evidence that you can contribute from week one. This example shows a second-year student whose strongest material is class and personal projects, with each project naming the applicant's own part.",
    person: { name: "Arjun Mehta", headline: "Computer Science student seeking a Summer 2027 co-op term", location: "Toronto, ON", phone: "(416) 555-0164" },
    summary: "Second-year Computer Science student looking for a four-month co-op term from May to August 2027 in software development. Built the conflict checker for a course-planning web app used by about 300 classmates and a Python data pipeline for a transit dashboard. Comfortable with Java, Python, TypeScript, and Git, and used to delivering in teams on graded sprints.",
    sectionOrder: ["summary", "education", "projects", "experience", "skills", "additional", "languages", "certifications"],
    education: [entry("Bachelor of Computer Science (Co-op), Year 2", "Lakeshore Polytechnic University, Toronto, ON", "Sep 2025 – Apr 2029 (expected)", ["Cumulative GPA 3.7/4.0; Dean's Honour List, 2025–26.", "Relevant courses: Data Structures and Algorithms, Software Design, Databases, Computer Networks."])],
    projects: [
      entry("Course planner web app (team of four)", "Software Design course project", "Jan – Apr 2026", ["Built the timetable conflict checker in TypeScript and React, my part of a four-person project.", "Wrote integration tests that caught a time-zone bug before the class demo.", "About 300 classmates used the app to plan their fall term."]),
      entry("Transit delay dashboard", "Personal project", "Summer 2025", ["Pulled public transit open data with a Python pipeline and charted weekly delays in a small Flask app.", "Documented setup in a README so a classmate could run it in under ten minutes."]),
      entry("Library seat finder", "24-hour hackathon", "Nov 2025", ["Built the Android front end in Kotlin with two teammates; placed third of 40 teams."]),
    ],
    experience: [entry("IT Help Desk Assistant (part-time)", "Lakeshore Polytechnic University Library", "Sep 2025 – Present", ["Resolve 15 to 25 student laptop, Wi-Fi, and printing issues a shift.", "Wrote three how-to guides that reduced repeat printing questions."])],
    skills: "Languages: Java, Python, TypeScript, SQL, Kotlin\nTools: Git, React, Flask, PostgreSQL, Linux command line\nPractices: unit and integration testing, code review, Agile sprints",
    additional: { title: "Co-op availability", text: "Available for a four-month work term from May to August 2027, in person or hybrid in the Greater Toronto Area" },
    profiles: [
      { label: "First co-op term", text: "First-year Computer Science student looking for a first co-op term in software or IT. Strong Java foundation from courses, plus two small Python projects and a personal website on GitHub. Keen to learn professional practices such as code review, testing, and working from tickets." },
      { label: "Second or third work term", text: "Third-year Software Engineering co-op student with two previous work terms, in QA automation and back-end development. Wrote Pytest and Selenium suites that ran on every pull request, and shipped two small API features to production. Looking for a fall back-end term with ownership of a service." },
      { label: "International student in co-op", text: "International Computer Science student in a co-op program, authorized to work during co-op terms on a co-op work permit. Built a full-stack expense tracker and contributed bug fixes to an open-source library. Available for a Winter 2028 term anywhere in Ontario." },
    ],
    bullets: [
      "Designed the conflict-checking logic for a course planner used by about 300 students.",
      "Wrote 40 integration tests and set up GitHub Actions so every pull request ran them.",
      "Refactored a Python data pipeline from scripts into modules, halving the time to add a data source.",
      "Reviewed teammates' pull requests weekly and kept the project README and setup steps current.",
      "Placed third of 40 teams at a 24-hour hackathon with an Android seat-finder app.",
      "Resolved 15 to 25 help desk tickets a shift, escalating network outages with clear notes.",
      "Presented a course project demo to 120 classmates and two industry judges.",
      "Tutored first-year students in Java during weekly peer study sessions.",
    ],
    skillGroups: [
      { label: "Technical skills", items: ["Java and Python", "TypeScript and React", "SQL and PostgreSQL", "Git and code review", "Unit and integration testing", "Linux command line"] },
      { label: "Workplace skills", items: ["Working in Agile teams", "Clear written documentation", "Explaining technical problems simply", "Managing time across courses and projects"] },
    ],
    tips: [
      { heading: "Lead with the work term you want", text: "Co-op employers hire for a specific term. Put the term and its dates in your profile or a short availability line, so a recruiter can match you to the right posting at a glance." },
      { heading: "Show your part in team projects", text: "Most class projects are team efforts. Say which piece you built or led and what the project achieved, so a reviewer can see your own contribution rather than the group's." },
      { heading: "Follow your co-op office's rules first", text: "Many universities ask students to use the co-op office's resume format, or to have resumes reviewed before applying through their job board. Check those rules first; this example's structure fits most of them." },
    ],
    guides: ["software-engineer-resume-projects", "canadian-resume-format"],
    faqs: [
      { question: "What should a co-op resume include?", answer: "Your program and year, the work term you're applying for, relevant courses, two or three projects with your own contribution, any job or volunteer role, and grouped technical skills. One page is standard for co-op applications." },
      { question: "Should I include my GPA on a co-op resume?", answer: "Include it when it's strong, usually 3.0 out of 4.0 or higher, or when a posting asks for it. Some university co-op offices have their own guidance, so check that first." },
      { question: "How do I write a co-op resume with no work experience?", answer: "Lead with projects and coursework: what you built, the tools you used, and the result. A part-time job or volunteer role still shows reliability, even when it isn't technical." },
    ],
  },
];

export const examplePath = (slug: string) => `/cv-examples/${slug}/`;
/** The examples this build publishes: everything live, plus scheduled ones in a preview build (see scheduled-pages.ts). */
export const cvExamples: CVExample[] = allCVExamples.filter(example => isVisible(examplePath(example.slug)));

export function cvExample(slug: string) { return cvExamples.find(example => example.slug === slug); }

/** Related examples: same category first, then the rest in list order. */
/**
 * Three related examples: the same category first, then the examples that follow this one in
 * the list, so each page links to a different set rather than every page repeating the first few.
 */
export function relatedExamples(example: CVExample, count = 3) {
  const index = cvExamples.findIndex(item => item.slug === example.slug);
  const others = [...cvExamples.slice(index + 1), ...cvExamples.slice(0, index)];
  return [...others.filter(item => item.category === example.category), ...others.filter(item => item.category !== example.category)].slice(0, count);
}

/** The example as an editable CV. Ids are stable so the server and client render identically. */
export function exampleCV(example: CVExample): CV {
  const cv = emptyCV();
  const [first, ...rest] = example.person.name.toLowerCase().split(" ");
  cv.template = example.template;
  cv.personal = { name: example.person.name, headline: example.person.headline, email: `${first}.${rest.join("")}@example.com`, phone: example.person.phone, location: example.person.location, website: example.person.website ?? "" };
  cv.summary = example.summary; cv.skills = example.skills; cv.languages = example.languages ?? "";
  if (example.additional) { cv.additional = example.additional.text; cv.additionalTitle = example.additional.title; }
  if (example.sectionOrder) cv.sectionOrder = [...example.sectionOrder];
  const withIds = (section: string, entries: EntryData[] = []) => entries.map((item, index) => ({ id: `${example.slug}-${section}-${index + 1}`, ...item }));
  cv.experience = withIds("experience", example.experience); cv.education = withIds("education", example.education);
  cv.projects = withIds("projects", example.projects); cv.certifications = withIds("certifications", example.certifications);
  return cv;
}
