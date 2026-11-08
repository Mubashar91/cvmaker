import { emptyCV, type CV, type Entry, type Template } from "./model";

// Job-specific CV examples. Every person, employer, school, and figure in these CVs is fictional
// and exists only to show how a strong CV for the role can read. Phone numbers use Ofcom's
// reserved drama range and email addresses use example.com, so nothing reaches a real person.
type EntryData = Omit<Entry, "id">;
const entry = (title: string, organization: string, dates: string, lines: string[] = []): EntryData => ({ title, organization, dates, description: lines.join("\n") });

export interface CVExample {
  slug: string; job: string; category: string; template: Template;
  seoTitle: string; description: string; intro: string;
  person: { name: string; headline: string; location: string; phone: string };
  summary: string; skills: string;
  experience: EntryData[]; education: EntryData[]; projects?: EntryData[]; certifications?: EntryData[];
  profiles: { label: string; text: string }[];
  bullets: string[];
  skillGroups: { label: string; items: string[] }[];
  tips: { heading: string; text: string }[];
  guides: string[];
}

export const cvExamples: CVExample[] = [
  {
    slug: "nurse", job: "Nurse", category: "Healthcare", template: "professional",
    seoTitle: "Nurse CV Example — Free Template & Writing Tips",
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
    guides: ["write-a-clear-profile", "describe-your-experience"],
  },
  {
    slug: "software-developer", job: "Software developer", category: "Technology", template: "tech",
    seoTitle: "Software Developer CV Example — Free Template",
    description: "A software developer CV example with a grouped tech stack, results-led bullet points, and a clear profile. Edit it free and download a PDF.",
    intro: "Engineering managers scan a developer CV for three things: the technologies you use, what you built with them, and how your work helped the team or product. This example groups skills by area and describes each role through shipped work.",
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
    seoTitle: "Customer Service CV Example — Free Template",
    description: "A customer service CV example with a profile, achievement-led bullet points, and key skills. Adapt it for call centre, retail, or online support roles.",
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
    description: "A retail assistant CV example with a short profile, shop-floor experience, and skills. Ideal for first jobs and part-time roles. Edit free and download a PDF.",
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
    guides: ["your-first-cv", "keep-it-focused"],
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
    seoTitle: "Administrator CV Example — Free Template & Tips",
    description: "An administrator CV example with an organised profile, office experience, and in-demand skills. Use it for admin assistant or office roles and download a PDF.",
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
    description: "An accountant CV example with a professional profile, finance experience, and technical skills. Show qualifications and results clearly, then download a PDF.",
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
];

export function cvExample(slug: string) { return cvExamples.find(example => example.slug === slug); }

/** Related examples: same category first, then the rest in list order. */
export function relatedExamples(example: CVExample, count = 3) {
  const others = cvExamples.filter(item => item.slug !== example.slug);
  return [...others.filter(item => item.category === example.category), ...others.filter(item => item.category !== example.category)].slice(0, count);
}

/** The example as an editable CV. Ids are stable so the server and client render identically. */
export function exampleCV(example: CVExample): CV {
  const cv = emptyCV();
  const [first, ...rest] = example.person.name.toLowerCase().split(" ");
  cv.template = example.template;
  cv.personal = { name: example.person.name, headline: example.person.headline, email: `${first}.${rest.join("")}@example.com`, phone: example.person.phone, location: example.person.location, website: "" };
  cv.summary = example.summary; cv.skills = example.skills;
  const withIds = (section: string, entries: EntryData[] = []) => entries.map((item, index) => ({ id: `${example.slug}-${section}-${index + 1}`, ...item }));
  cv.experience = withIds("experience", example.experience); cv.education = withIds("education", example.education);
  cv.projects = withIds("projects", example.projects); cv.certifications = withIds("certifications", example.certifications);
  return cv;
}
