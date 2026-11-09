// Predefined skill suggestions by profession. These are common, widely recognised skills for
// each kind of role, written for people to choose from — not a list to copy in full.
// Nothing here is generated at runtime, and nothing is sent anywhere.

export interface ProfessionSkills {
  id: string; name: string; group: string;
  /** Job-specific abilities and knowledge. */
  hard: string[];
  /** Ways of working that employers commonly ask about for this role. */
  soft: string[];
  /** Software, equipment, and methods. Use the ones you have actually used. */
  tools: string[];
  /** A related CV example on this site, if there is one. */
  example?: string;
}

export const professionGroups = ["Technology", "Design & marketing", "Business & finance", "Office & customer support", "Education & healthcare", "Retail, hospitality & logistics", "Early career"] as const;

export const professions: ProfessionSkills[] = [
  { id: "software-developer", name: "Software developer", group: "Technology", example: "software-developer",
    hard: ["Object-oriented programming", "API design and integration", "Automated testing", "Debugging and troubleshooting", "Code review", "Database design", "Version control", "Writing technical documentation", "Performance optimisation", "Secure coding practices"],
    soft: ["Problem-solving", "Clear written communication", "Collaboration with product and design", "Estimating and planning work", "Mentoring", "Learning new technologies quickly"],
    tools: ["Git", "Python", "Java", "C#", "TypeScript", "SQL", "Docker", "CI/CD pipelines", "Cloud platforms (AWS, Azure, or GCP)", "Jira"] },
  { id: "frontend-developer", name: "Frontend developer", group: "Technology", example: "frontend-developer",
    hard: ["Responsive web design", "Web accessibility (WCAG)", "Component-based architecture", "State management", "Cross-browser testing", "Web performance optimisation", "Consuming REST and GraphQL APIs", "Design system implementation", "Unit and end-to-end testing", "Semantic HTML"],
    soft: ["Attention to detail", "Working closely with designers", "Explaining technical trade-offs", "Prioritisation", "User empathy", "Giving and receiving feedback"],
    tools: ["JavaScript", "TypeScript", "React", "Vue.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "Figma", "Git", "Playwright", "Jest or Vitest"] },
  { id: "web-developer", name: "Web developer", group: "Technology", example: "software-developer",
    hard: ["Website build and maintenance", "Content management systems", "Responsive layouts", "Basic SEO implementation", "Form handling and validation", "Web hosting and deployment", "Accessibility checks", "Website performance", "Integrating third-party services", "Back-end scripting"],
    soft: ["Client communication", "Managing several projects", "Translating requirements into features", "Time management", "Self-directed learning", "Documenting work for clients"],
    tools: ["HTML", "CSS", "JavaScript", "PHP", "WordPress", "Node.js", "MySQL", "Git", "Webflow", "Google Search Console"] },
  { id: "data-analyst", name: "Data analyst", group: "Technology", example: "data-analyst",
    hard: ["Data cleaning and preparation", "Exploratory data analysis", "Data visualisation", "Dashboard design", "Descriptive statistics", "A/B test analysis", "Writing SQL queries", "Data modelling", "Defining metrics and KPIs", "Reporting to stakeholders"],
    soft: ["Analytical thinking", "Turning findings into recommendations", "Presenting to non-technical audiences", "Curiosity", "Attention to detail", "Managing stakeholder requests"],
    tools: ["SQL", "Excel (pivot tables, Power Query)", "Power BI", "Tableau", "Python (pandas)", "R", "Google Sheets", "Looker Studio", "BigQuery", "dbt"] },
  { id: "it-support", name: "IT support technician", group: "Technology",
    hard: ["Hardware and software troubleshooting", "User account management", "Device setup and imaging", "Network fundamentals", "Ticket triage and escalation", "Writing knowledge-base articles", "Backup and recovery", "Endpoint security basics", "Printer and peripheral support", "Asset tracking"],
    soft: ["Patience with non-technical users", "Clear explanations", "Calm under pressure", "Customer service", "Time management", "Teamwork"],
    tools: ["Windows", "macOS", "Microsoft 365", "Active Directory", "Microsoft Intune", "ServiceNow", "Jira Service Management", "Remote desktop tools", "PowerShell", "Google Workspace admin"] },
  { id: "graphic-designer", name: "Graphic designer", group: "Design & marketing", example: "graphic-designer",
    hard: ["Visual identity and branding", "Typography", "Layout and composition", "Colour theory", "Print production and prepress", "Digital and social media design", "Illustration", "Packaging design", "Preparing files for handover", "Following brand guidelines"],
    soft: ["Creative problem-solving", "Taking and applying feedback", "Presenting concepts", "Meeting deadlines", "Understanding a client brief", "Collaboration with copywriters and marketers"],
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Figma", "Adobe After Effects", "Canva", "Procreate"] },
  { id: "ux-designer", name: "UX/UI designer", group: "Design & marketing",
    hard: ["User research and interviews", "Usability testing", "Information architecture", "Wireframing", "Interactive prototyping", "Interaction design", "Accessibility in design", "Design systems", "Journey mapping", "Writing interface copy"],
    soft: ["Empathy for users", "Facilitating workshops", "Communicating design decisions", "Collaboration with engineers", "Balancing user and business needs", "Receiving critique"],
    tools: ["Figma", "FigJam", "Miro", "Maze", "Lookback", "Adobe XD", "Hotjar", "Notion"] },
  { id: "marketing", name: "Marketing executive", group: "Design & marketing", example: "marketing-executive",
    hard: ["Campaign planning", "Content marketing", "Email marketing", "Social media management", "Search engine optimisation (SEO)", "Paid search and social advertising", "Marketing analytics", "Copywriting", "Market research", "Budget tracking"],
    soft: ["Creativity", "Written communication", "Organisation", "Working with agencies and suppliers", "Data-informed decision-making", "Adaptability"],
    tools: ["Google Analytics", "Google Ads", "Meta Ads Manager", "HubSpot", "Mailchimp", "Canva", "Hootsuite", "WordPress", "Semrush"] },
  { id: "project-manager", name: "Project manager", group: "Business & finance", example: "project-manager",
    hard: ["Project planning and scheduling", "Scope management", "Risk and issue management", "Budget management", "Stakeholder management", "Agile and Scrum delivery", "Resource planning", "Status reporting", "Change control", "Supplier management"],
    soft: ["Leadership", "Negotiation", "Clear communication", "Decision-making", "Conflict resolution", "Keeping teams aligned"],
    tools: ["Microsoft Project", "Jira", "Asana", "Smartsheet", "Confluence", "Excel", "Monday.com", "PRINCE2 methods", "PMP methods"] },
  { id: "accountant", name: "Accountant", group: "Business & finance", example: "accountant",
    hard: ["Month-end and year-end close", "Financial statement preparation", "Account reconciliations", "Budgeting and forecasting", "Variance analysis", "Tax compliance", "Accounts payable and receivable", "Payroll processing", "Audit preparation", "Internal controls"],
    soft: ["Accuracy", "Integrity and confidentiality", "Meeting deadlines", "Explaining figures to non-finance colleagues", "Organisation", "Analytical thinking"],
    tools: ["Excel (advanced)", "Xero", "QuickBooks", "Sage", "SAP", "Oracle NetSuite", "Power BI"] },
  { id: "hr", name: "HR assistant or advisor", group: "Business & finance",
    hard: ["Recruitment and onboarding", "Employee records management", "Employment policy guidance", "Absence management", "Payroll coordination", "Employee relations support", "Training coordination", "Writing job descriptions", "HR reporting", "Data protection in HR"],
    soft: ["Discretion", "Empathy", "Clear communication", "Impartiality", "Organisation", "Handling sensitive conversations"],
    tools: ["BambooHR", "Workday", "Sage HR", "Applicant tracking systems", "Microsoft 365", "LinkedIn Recruiter"] },
  { id: "sales", name: "Sales representative", group: "Business & finance",
    hard: ["Prospecting and lead generation", "Needs analysis", "Product demonstrations", "Negotiation", "Closing sales", "Account management", "Pipeline management", "Sales forecasting", "Writing proposals", "Upselling and cross-selling"],
    soft: ["Persuasive communication", "Resilience", "Active listening", "Relationship building", "Self-motivation", "Time management"],
    tools: ["Salesforce", "HubSpot CRM", "LinkedIn Sales Navigator", "Microsoft Dynamics", "Excel", "Zoom or Teams"] },
  { id: "administrative-assistant", name: "Administrative assistant", group: "Office & customer support", example: "administrator",
    hard: ["Diary and calendar management", "Minute taking", "Document preparation and formatting", "Data entry", "Records and file management", "Travel and meeting arrangements", "Invoice processing", "Office supplies management", "Handling correspondence", "Basic bookkeeping"],
    soft: ["Organisation", "Discretion", "Attention to detail", "Prioritising competing requests", "Professional phone manner", "Reliability"],
    tools: ["Microsoft Word", "Microsoft Excel", "Outlook", "Microsoft Teams", "Google Workspace", "SharePoint", "Adobe Acrobat"] },
  { id: "receptionist", name: "Receptionist", group: "Office & customer support", example: "receptionist",
    hard: ["Greeting visitors", "Switchboard and call handling", "Appointment booking", "Visitor sign-in and security", "Taking payments", "Handling post and deliveries", "Maintaining the reception area", "Data protection", "Message taking", "Basic admin support"],
    soft: ["Warm, professional manner", "Multitasking", "Calm with difficult callers", "Clear communication", "Organisation", "Discretion"],
    tools: ["Booking and practice-management systems", "Microsoft Outlook", "Phone systems", "Card payment terminals", "Microsoft Excel"] },
  { id: "customer-service", name: "Customer service advisor", group: "Office & customer support", example: "customer-service",
    hard: ["Handling enquiries by phone, email, and chat", "Complaint resolution", "Order and account management", "Processing refunds and returns", "Logging cases accurately", "Product knowledge", "Following escalation procedures", "Meeting service levels", "Identifying recurring issues", "Data protection"],
    soft: ["Active listening", "Empathy", "Patience", "Clear, friendly communication", "Problem-solving", "Staying calm under pressure"],
    tools: ["Zendesk", "Salesforce Service Cloud", "Freshdesk", "Intercom", "CRM systems", "Microsoft 365"] },
  { id: "teacher", name: "Teacher", group: "Education & healthcare", example: "teacher",
    hard: ["Lesson planning", "Curriculum knowledge", "Differentiation", "Formative and summative assessment", "Behaviour management", "Supporting students with additional needs", "Safeguarding", "Data tracking and reporting", "Parent communication", "Classroom technology"],
    soft: ["Clear explanation", "Patience", "Adaptability", "Organisation", "Building relationships with students", "Collaborating with colleagues"],
    tools: ["Google Classroom", "Microsoft Teams for Education", "Interactive whiteboards", "School management information systems", "Kahoot!", "Seesaw"] },
  { id: "nurse", name: "Nurse", group: "Education & healthcare", example: "nurse",
    hard: ["Patient assessment", "Medication administration", "Care planning", "Wound care", "Infection prevention and control", "Recognising and escalating deterioration", "Clinical documentation", "Discharge planning", "Patient education", "Safeguarding"],
    soft: ["Compassion", "Calm under pressure", "Communication with patients and families", "Teamwork across professions", "Attention to detail", "Prioritisation"],
    tools: ["Electronic patient records", "Infusion pumps", "Vital signs monitoring equipment", "E-rostering systems", "Early warning scoring systems"] },
  { id: "care-assistant", name: "Care assistant", group: "Education & healthcare", example: "care-assistant",
    hard: ["Personal care", "Supporting mobility and safe moving", "Medication prompting", "Meal preparation and nutrition", "Recording care notes", "Dementia care", "Infection control", "Recognising changes in health", "Supporting daily activities", "Safeguarding"],
    soft: ["Compassion", "Patience", "Respect for dignity and independence", "Reliability", "Clear communication", "Teamwork"],
    tools: ["Digital care-planning systems", "Hoists and moving equipment", "Care visit scheduling apps"] },
  { id: "retail-assistant", name: "Retail assistant", group: "Retail, hospitality & logistics", example: "retail-assistant",
    hard: ["Customer service on the shop floor", "Till operation and cash handling", "Visual merchandising", "Stock replenishment", "Stock counts", "Processing returns", "Product knowledge", "Opening and closing procedures", "Loss prevention awareness", "Click-and-collect orders"],
    soft: ["Friendly communication", "Teamwork", "Reliability", "Working well at busy times", "Initiative", "Flexibility with shifts"],
    tools: ["Point-of-sale (POS) systems", "Handheld stock scanners", "Card payment terminals", "Stock management systems"] },
  { id: "hospitality", name: "Hospitality staff (server, bartender)", group: "Retail, hospitality & logistics",
    hard: ["Table service", "Taking orders accurately", "Food safety and hygiene", "Allergen awareness", "Bar service and drink preparation", "Responsible service of alcohol", "Cash and card payments", "Handling bookings", "Upselling", "Opening and closing duties"],
    soft: ["Friendly, confident manner", "Working under pressure", "Teamwork", "Multitasking", "Problem-solving with guests", "Stamina on long shifts"],
    tools: ["EPOS systems", "Table booking systems", "Coffee machines", "Card payment terminals"] },
  { id: "warehouse-operative", name: "Warehouse operative", group: "Retail, hospitality & logistics", example: "warehouse-operative",
    hard: ["Picking and packing orders", "Goods-in and despatch", "Stock rotation", "Inventory counts", "Loading and unloading", "Safe manual handling", "Quality checks", "Following health and safety procedures", "Labelling and documentation", "Returns processing"],
    soft: ["Reliability and punctuality", "Accuracy", "Teamwork", "Working to targets", "Physical stamina", "Following instructions"],
    tools: ["Handheld RF scanners", "Warehouse management systems", "Pallet trucks", "Forklifts (with a valid licence)", "Label printers"] },
  { id: "student", name: "Student or graduate (transferable skills)", group: "Early career", example: "student",
    hard: ["Research and referencing", "Report and essay writing", "Presentations", "Data analysis for coursework", "Project planning", "Basic spreadsheet skills", "Event organising", "Customer service from part-time work", "Social media for a club or society", "Languages"],
    soft: ["Willingness to learn", "Time management", "Teamwork from group projects", "Communication", "Reliability", "Taking initiative"],
    tools: ["Microsoft Word", "Microsoft Excel", "PowerPoint", "Google Docs and Sheets", "Canva", "Zoom or Teams"] },
];

export function professionById(id: string) { return professions.find(profession => profession.id === id); }

/** Group chosen skills by type, as lines the CV editor understands ("Label: a, b"). */
export function skillsAsLines(profession: ProfessionSkills, chosen: Iterable<string>): string {
  const set = new Set(chosen);
  return ([["Skills", profession.hard], ["Tools", profession.tools], ["Strengths", profession.soft]] as const)
    .map(([label, items]) => [label, items.filter(item => set.has(item))] as const)
    .filter(([, items]) => items.length)
    .map(([label, items]) => `${label}: ${items.join(", ")}`)
    .join("\n");
}

export const skillGroupLabels = { hard: "Skills", tools: "Tools", soft: "Strengths" } as const;
export type SkillKind = keyof typeof skillGroupLabels;

/** Whether a skill already appears in the CV's skills text (case-insensitive, whole phrase). */
export function hasSkill(skills: string, skill: string): boolean {
  const escaped = skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[\\s,;:•])${escaped}(?=$|[\\s,;.•])`, "m").test(skills.toLowerCase());
}

/** Add a skill to its "Label: a, b" line, creating the line if needed. Keeps every other line as written. */
export function addSkill(skills: string, label: string, skill: string): string {
  if (hasSkill(skills, skill)) return skills;
  const lines = skills.split("\n");
  const index = lines.findIndex(line => line.toLowerCase().startsWith(`${label.toLowerCase()}:`));
  if (index >= 0) { const line = lines[index].trimEnd(); lines[index] = `${line}${/:$/.test(line) ? " " : ", "}${skill}`; return lines.join("\n"); }
  return [...lines.filter((line, i) => line.trim() || i < lines.length - 1), `${label}: ${skill}`].join("\n").replace(/^\n+/, "");
}

/** "Cloud platforms (AWS, Azure, or GCP)" → ["cloud platforms", "aws", "azure", "gcp"]. */
function phrasesOf(skill: string): string[] {
  const inner = skill.match(/\(([^)]*)\)/)?.[1];
  const base = skill.replace(/\s*\([^)]*\)/g, "");
  return [...base.split(/\s+or\s+/i), ...(inner ? inner.split(/,\s*(?:or\s+)?|\s+or\s+/i) : [])]
    .map(part => part.trim())
    .filter(part => part.length > 1 && part.split(/\s+/).length <= 4);
}

/** Short predefined skills and tools, keyed in lowercase, with their usual written form. */
export const knownSkillPhrases: ReadonlyMap<string, string> = new Map(professions.flatMap(profession => [...profession.hard, ...profession.soft, ...profession.tools]).flatMap(phrasesOf).map(phrase => [phrase.toLowerCase(), phrase]));
