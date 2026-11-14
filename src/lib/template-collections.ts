import { emptyCV, templates, type CV, type Entry, type Section, type Template } from "./model";
import { atsSampleText } from "./generated/ats-sample-text";

type EntryData = Omit<Entry, "id">;
const entry = (title: string, organization: string, dates: string, lines: string[] = []): EntryData => ({ title, organization, dates, description: lines.join("\n") });

/**
 * A complete, fictional sample document shown in full on a collection page and openable in the
 * editor. Names, schools, and organisations are invented; the phone number is in the 555-01xx
 * range reserved for fiction and the email uses the reserved example.com domain.
 */
export interface CollectionExample {
  id: string; heading: string; intro: string; template: Template;
  person: { name: string; headline: string; location: string; phone: string; email: string };
  sectionOrder: Section[];
  summary: string; education: EntryData[]; experience: EntryData[]; projects: EntryData[];
  skills: string; languages: string; additional: { title: string; text: string };
  omit: { heading: string; items: string[] };
  downloadNote: string;
  links: { href: string; label: string }[];
  /** Text extracted from this example's real PDF export, in reading order (scripts/build-ats-sample.ts). */
  extracted?: string;
}

interface TemplateCollection {
  slug: string; name: string; title: string; description: string; intro: string;
  templates: readonly Template[];
  advice: { heading: string; text: string }[];
  checklist: string[];
  example?: CollectionExample;
}

const highSchoolExample: CollectionExample = {
  id: "high-school-resume-example", template: "student",
  heading: "High school resume example for a first job",
  intro: "Jordan is a fictional high school junior applying for a first part-time job in retail or food service. There is no paid work to list, so the resume leads with school, then uses volunteering, a class project, and clear availability as evidence. Read it in full here, or open it in the editor and replace every detail with your own.",
  person: { name: "Jordan Reyes", headline: "High School Student", location: "Columbus, OH", phone: "(614) 555-0148", email: "jordan.reyes@example.com" },
  sectionOrder: ["summary", "education", "experience", "projects", "skills", "languages", "additional", "certifications"],
  summary: "High school junior looking for a part-time job in retail or food service on weekday evenings and weekends. Experienced in serving customers and handling cash as a concession stand volunteer, and helps run a Saturday food pantry shift. Reliable, punctual, and quick to learn a new routine.",
  education: [entry("High School Diploma (expected June 2028)", "Westbrook High School, Columbus, OH", "2024 – 2028", ["GPA 3.6; honor roll for three semesters.", "Relevant classes: Business Applications, Algebra II, Spanish II."])],
  experience: [
    entry("Food Pantry Volunteer", "Eastside Community Pantry", "Sep 2025 – Present", ["Help run a Saturday distribution shift for about 60 households: restocking shelves, checking visitors in, and carrying orders to cars.", "Trained two new student volunteers on the check-in sheet and food-safety rules."]),
    entry("Concession Stand Volunteer", "Westbrook High Athletic Boosters", "Fall 2025 – Present", ["Take orders and handle cash and card payments at home football games, keeping the line moving at halftime.", "Count and balance the cash box with an adult supervisor after each game."]),
  ],
  projects: [entry("School store inventory tracker", "Business Applications class project", "Spring 2026", ["Built a Google Sheets tracker for the school store’s 40 products with three classmates.", "Used two months of sales to suggest which snacks to reorder; the store adviser used the list for the next order."])],
  skills: "Skills: Customer service, cash handling, teamwork, time management\nTools: Google Sheets, Google Docs, Canva",
  languages: "English: Native\nSpanish: Conversational",
  additional: { title: "Activities and availability", text: "Junior varsity soccer: fall season, 2024 – present\nAvailability: weekday evenings from 4 p.m. (from 6 p.m. during soccer season), weekends, and full time in summer" },
  omit: {
    heading: "What to leave out without work experience",
    items: [
      "A job you didn’t have. Label volunteering and school roles as what they are, as this example does.",
      "An empty Work experience heading. Folio leaves empty sections out of the PDF and Word download.",
      "Your date of birth, a photo, your full street address, or your Social Security number. A US employer asks for what it needs later.",
      "A references list or “References available on request”. Have two names ready if you’re asked.",
      "Middle school activities and any skill you can’t point to an example for.",
    ],
  },
  downloadNote: "Opens in the Student template with every line editable. Download a PDF or an editable Word file; both use A4 paper, so if an employer asks for US Letter, change the page size in Word or Google Docs before sending.",
  links: [
    { href: "/tips/high-school-student-resume/", label: "How to write a high school resume" },
    { href: "/cv-with-no-experience/", label: "Writing a CV with no experience" },
    { href: "/cv-maker-for-students/", label: "The free CV maker for students" },
    { href: "/tips/improve-cv-bullet-points-with-ai/", label: "Improving bullet points with AI, safely" },
  ],
};

// Morgan, Lone Star Supply, Trinity Home Goods, and North Dallas Community College are fictional.
const atsExample: CollectionExample = {
  id: "ats-resume-example", template: "clarity",
  heading: "An ATS-friendly resume example, and the text a parser reads",
  intro: "Morgan's resume uses the Clarity template: one column, standard headings, and nothing but text. Underneath it is the text extracted from the downloaded PDF, line by line, so you can see the reading order an applicant tracking system actually receives.",
  person: { name: "Morgan Lee", headline: "Logistics Coordinator", location: "Dallas, TX", phone: "(214) 555-0119", email: "morgan.lee@example.com" },
  sectionOrder: ["summary", "experience", "education", "skills", "languages", "additional", "projects", "certifications"],
  summary: "Logistics coordinator with five years of experience scheduling inbound and outbound freight for a regional distributor. Track 120 to 150 shipments a week in SAP and carrier portals, resolve delivery exceptions before they reach customers, and keep on-time delivery above 97%. Looking for a senior coordinator or transportation planner role.",
  experience: [
    entry("Logistics Coordinator", "Lone Star Supply Co., Dallas, TX", "Mar 2022 – Present", ["Schedule 120 to 150 inbound and outbound shipments a week across eight regional carriers", "Kept on-time delivery above 97% for two years by rebooking at-risk loads before cut-off", "Resolve damaged or short deliveries with carriers and file freight claims, recovering $18,000 in 2025", "Maintain shipment records in SAP and send a daily exceptions report to the warehouse manager"]),
    entry("Shipping Clerk", "Lone Star Supply Co., Dallas, TX", "Jun 2020 – Feb 2022", ["Prepared bills of lading and packing lists for 40 to 60 orders a day"]),
    entry("Warehouse Associate", "Trinity Home Goods, Irving, TX", "Aug 2018 – May 2020", ["Picked, packed, and loaded orders and trained new starters on handheld scanners"]),
  ],
  education: [entry("Associate of Applied Science, Logistics and Supply Chain", "North Dallas Community College", "2016 – 2018")],
  projects: [],
  skills: "Logistics: freight scheduling, carrier management, freight claims, bills of lading\nSystems: SAP, carrier portals, Microsoft Excel (VLOOKUP, pivot tables)\nSafety: OSHA 10-Hour General Industry, forklift certified",
  languages: "English\nSpanish (conversational)",
  additional: { title: "Additional information", text: "Available for occasional weekend cover during peak season" },
  omit: { heading: "What this resume leaves out on purpose", items: ["Tables, text boxes, and side columns", "Contact details hidden in a page header or footer", "Skill bars, icons, and charts", "Creative section names such as \"My journey\"", "A photo, or any image that contains text"] },
  downloadNote: "Opens in the Clarity template with every line editable. Download a PDF with selectable text, or an editable Word file when an employer asks for one. Both use A4; for a US application, switch the Word file to Letter size before sending.",
  links: [
    { href: "/tips/ats-friendly-cv/", label: "How to make a CV ATS-friendly" },
    { href: "/ai-cv-job-match/", label: "Check your CV against a job advert" },
    { href: "/resume-keyword-checker/", label: "Free resume keyword checker" },
    { href: "/templates/clarity/", label: "Why Clarity suits applicant tracking systems" },
  ],
  extracted: atsSampleText,
};

// Rosa and the employers below are fictional.
const simpleExample: CollectionExample = {
  id: "simple-resume-example", template: "outline",
  heading: "A basic resume example in a simple template",
  intro: "Rosa's resume shows what a simple layout does best: nothing competes with the content. It's a basic resume template filled in for a bookkeeper with seven years of experience, kept to one page by choosing what to leave out.",
  person: { name: "Rosa Delgado", headline: "Full-Charge Bookkeeper", location: "Phoenix, AZ", phone: "(602) 555-0177", email: "rosa.delgado@example.com" },
  sectionOrder: ["summary", "experience", "education", "skills", "languages", "additional", "projects", "certifications"],
  summary: "Full-charge bookkeeper with seven years of experience keeping the books for construction and property businesses. Close the month within five working days, reconcile 11 bank and credit card accounts, and prepare clean files for the outside CPA. Looking for a senior bookkeeper or accounting coordinator role.",
  experience: [
    entry("Full-Charge Bookkeeper", "Desert Ridge Builders, Phoenix, AZ", "Apr 2021 – Present", ["Run accounts payable and receivable for a contractor with $14m annual revenue", "Close the month within five working days and prepare job-cost reports for project managers", "Reconcile 11 bank and credit card accounts in QuickBooks Online every month", "Cut overdue receivables by 40% by sending statements weekly instead of monthly"]),
    entry("Accounts Assistant", "Saguaro Property Management, Tempe, AZ", "Jan 2018 – Mar 2021", ["Processed rent receipts and vendor bills for 600 rental units", "Prepared 1099 forms for about 90 contractors each January"]),
  ],
  education: [entry("Certificate in Accounting", "Valley Community College", "2016 – 2017")],
  projects: [],
  skills: "Bookkeeping: accounts payable and receivable, bank reconciliations, month-end close, job costing\nSoftware: QuickBooks Online, Bill.com, Microsoft Excel\nCertification: Certified Bookkeeper (AIPB)",
  languages: "English\nSpanish (fluent)",
  additional: { title: "Additional information", text: "" },
  omit: { heading: "What a simple resume skips", items: ["A photo, unless an employer asks", "Decorative icons and skill-level bars", "Bullets longer than two lines", "An objective that repeats the summary", "Jobs older than about 15 years"] },
  downloadNote: "Opens in the Outline template with every line editable. Download a PDF to keep this exact layout, or an editable Word file, which keeps the same headings and order in one clean column. Both use A4; switch the Word file to Letter for US employers.",
  links: [
    { href: "/templates/category/ats-friendly/", label: "ATS-friendly resume templates" },
    { href: "/tips/us-resume-format/", label: "US resume format guide" },
    { href: "/templates/linear/", label: "The Linear template" },
    { href: "/resume-template-word/", label: "Microsoft Word resume template" },
  ],
};

/** The collection example as an editable CV. Ids are stable so server and client render identically. */
export function collectionExampleCV(example: CollectionExample): CV {
  const cv = emptyCV();
  cv.template = example.template;
  cv.personal = { ...cv.personal, ...example.person };
  cv.summary = example.summary; cv.skills = example.skills; cv.languages = example.languages;
  cv.additional = example.additional.text; cv.additionalTitle = example.additional.title;
  cv.sectionOrder = [...example.sectionOrder];
  const withIds = (section: string, entries: EntryData[]) => entries.map((item, index) => ({ id: `${example.id}-${section}-${index + 1}`, ...item }));
  cv.education = withIds("education", example.education); cv.experience = withIds("experience", example.experience); cv.projects = withIds("projects", example.projects);
  return cv;
}

export const templateCollections: readonly TemplateCollection[] = [
  {
    slug: "ats-friendly", name: "ATS-friendly", title: "Free ATS-Friendly CV & Resume Templates",
    description: "Choose a plain, single-column CV for online applications. Compare free templates with standard headings and selectable PDF text, then edit and download.",
    intro: "When an employer uses an applicant tracking system, a straightforward document is a sensible starting point. These templates keep your contact details and experience in one reading order, use familiar headings, and export real, selectable text.",
    templates: ["linear", "clarity", "compact", "professional", "classic", "student"],
    example: atsExample,
    advice: [
      { heading: "Keep the reading order straightforward", text: "Start with [Linear](/templates/linear/) or [Clarity](/templates/clarity/) when an application asks for a simple CV. Both avoid side columns and decorative text containers; the Clarity page explains, line by line, why its layout suits applicant tracking systems. Put your job title, employer, and dates together, and use familiar labels such as Work experience, Education, and Skills." },
      { heading: "Check the employer’s instructions first", text: "Application systems differ. A template cannot guarantee a successful parse or a shortlist. If the employer requests DOCX, use that format rather than uploading a PDF. For a PDF application, select and copy text from your downloaded file to check its order, then review any fields the application fills automatically." },
      { heading: "Make relevant experience easy to find", text: "Use the employer’s terminology for skills you actually have, and support them with examples in your experience or projects. Avoid repeating keywords without context. The Review CV tab helps you check missing contact details and incomplete entries before downloading." },
    ],
    checklist: ["Follow the requested file format.", "Use standard section headings and one clear reading order.", "Include job titles, organisations, and dates as text.", "Review extracted application fields before submitting."],
  },
  {
    slug: "professional", name: "Professional", title: "Free Professional CV Templates",
    description: "Find a professional CV template for business, consulting, management, or administration. Compare formal layouts, customise your details, and download free.",
    intro: "A professional CV puts the evidence first: a clear introduction, identifiable roles, and specific achievements. This collection pairs restrained typography with formal layouts for applications where a composed presentation makes sense.",
    templates: ["regent", "professional", "executive", "classic", "signature", "ledger", "heritage", "elegant"],
    advice: [
      { heading: "Choose a structure that fits your experience", text: "Professional and Regent give you a traditional single column. Executive uses a stronger introduction, while Ledger places section labels in a separate rail. Compare the actual previews and choose the document that makes your recent, relevant experience easiest to follow." },
      { heading: "Give achievements useful context", text: "For each role, explain what you did and the outcome you contributed to. Mention scope, responsibility, or reliable figures when they help. Keep claims accurate, distinguish your contribution from a team result, and avoid including confidential client information." },
      { heading: "Keep the presentation consistent", text: "Use one date format throughout, check organisation names, and give comparable roles a similar structure. A single accent colour and balanced spacing are usually enough. Review every PDF page after the final edit to catch awkward breaks or overly dense paragraphs." },
    ],
    checklist: ["Lead with recent experience relevant to the application.", "Keep employer names, titles, and dates consistent.", "Support broad claims with specific contributions.", "Check every page before sending."],
  },
  {
    slug: "modern", name: "Modern", title: "Free Modern CV Templates",
    description: "Explore free modern CV templates with clean typography, colour accents, and optional photos. Compare single and two-column layouts and download a PDF.",
    intro: "Modern can still be easy to read. These layouts use deliberate spacing, a clear hierarchy, and restrained colour to introduce your experience, with choices ranging from a soft single-column header to a structured two-column page.",
    templates: ["aurora", "summit", "modern", "horizon", "monogram", "compass", "atlas", "mosaic"],
    advice: [
      { heading: "Decide what belongs together", text: "A single column such as Aurora or Horizon keeps all sections in one sequence. Modern, Summit, and Atlas place supporting information alongside your experience. Two columns can make skills easy to find, but follow application instructions when an employer needs a plain format." },
      { heading: "Use colour with a purpose", text: "Choose one accent that makes headings easy to recognise without competing with the content. Folio’s presets work on white paper, and custom colours are adjusted for readable contrast. Preview the actual PDF rather than choosing from a thumbnail alone." },
      { heading: "Treat a photo as optional", text: "Several modern designs have space for a photo, but a good CV does not depend on one. Consider the employer’s instructions and local conventions. Photo layouts still work without an uploaded image, and your photograph is prepared on your device." },
    ],
    checklist: ["Choose one or two columns deliberately.", "Use a consistent accent and readable text size.", "Keep the profile focused on the opportunity.", "Confirm the layout still reads clearly across multiple pages."],
  },
  {
    slug: "simple", name: "Simple", title: "Free Simple CV Templates",
    description: "Create a clean CV with free simple templates. Compare minimal layouts, clear headings, and compact spacing. Edit online and download without a watermark.",
    intro: "A simple CV leaves room for the work itself. This collection keeps decoration restrained, so names, roles, qualifications, and skills are easy to locate. Choose a plain structure or a quiet typographic detail that suits your information.",
    templates: ["linear", "clarity", "minimal", "compact", "tech", "outline", "swiss", "student"],
    example: simpleExample,
    advice: [
      { heading: "Simple layouts still have different reading orders", text: "Linear and Clarity use a conventional single column. Minimal places short section labels to the left, while Swiss uses a stronger grid. If your priority is a plain online application, start with Linear; if a person will read the PDF directly, compare the quieter visual alternatives too." },
      { heading: "Edit the content before shrinking the type", text: "Remove repeated statements and shorten older, less relevant roles before choosing compact spacing. A CV does not need every task you have ever done. Keep the examples that help the reader understand why you fit this particular opportunity." },
      { heading: "Use the preview to choose the density", text: "Balanced spacing is a useful starting point. Compact fits more information; Airy gives short documents more room. Longer CVs can continue onto additional pages, so you do not have to force a detailed career into unreadably small text." },
    ],
    checklist: ["Remove repeated or irrelevant information.", "Use a familiar heading for each section.", "Check that the body text remains comfortable to read.", "Leave enough space to distinguish one role from the next."],
  },
  {
    slug: "student", name: "Student & first job", title: "Free Student CV & High School Resume Templates",
    description: "Free student CV and high school resume templates, with a complete first-job example to edit. Lead with school, projects, and volunteering.",
    intro: "You can write a useful first CV or resume before your first paid role, whether you are in high school, college, or university. Start with your education and the things you have made, learned, organised, or supported. These templates give early-career applicants a clear structure without pretending to have a longer work history.",
    example: highSchoolExample,
    templates: ["student", "linear", "clarity", "academic", "compact", "aurora"],
    advice: [
      { heading: "Put your strongest evidence near the top", text: "If your education is most relevant, move it above work experience in the layout settings. Include the qualification, institution, dates, and selected modules or coursework that relate to the application. Leave out grades if they do not help or are not requested." },
      { heading: "Use projects and volunteering as evidence", text: "A group assignment, personal website, society event, or volunteering role can show what you can do. Explain your own contribution, the skills you used, and the outcome. Name a project accurately instead of presenting it as paid employment." },
      { heading: "Keep empty sections out of the way", text: "You do not need to fill every section. Folio leaves empty sections out of the PDF, and you can hide sections you do not need. A concise CV with accurate details is more useful than padding the document with unsupported claims." },
    ],
    checklist: ["Use an email address you check regularly.", "Include relevant education and projects.", "Explain your part in group or volunteer work.", "Hide sections you do not need."],
  },
  {
    slug: "with-photo", name: "With a photo", title: "Free CV Templates with a Photo",
    description: "Free CV templates with an optional profile photo. Crop your image privately in your browser, choose a layout, and download a PDF without a watermark.",
    intro: "If a photo is appropriate for your application, choose a template with a deliberate place for it. Every design here supports an optional circular portrait, prepared locally in your browser and included in your downloaded PDF.",
    templates: templates.filter(template => template.photo).map(template => template.id),
    advice: [
      { heading: "Check whether a photo belongs in the application", text: "Expectations differ between countries, employers, and industries. Read the vacancy instructions before adding one. You can use the editor without a photo, and removing an image does not remove your written details." },
      { heading: "Choose a layout that suits the image", text: "Aurora pairs a photo with a soft introduction. Portrait and Halo give it a centered position, while Sidebar and Atlas place it with supporting information. Compare the full-size examples before choosing how prominent the image should be." },
      { heading: "Review the crop at document size", text: "Use a clear image with your face near the centre and enough room around it for a circular crop. The editor accepts PNG, JPEG, or WebP and prepares the image on your device. Check the live PDF preview and remove or replace the photo if the crop cuts off an important detail." },
    ],
    checklist: ["Follow employer instructions and local conventions.", "Choose a clear image with room for a circular crop.", "Check the photo in the actual PDF preview.", "Keep the experience readable without relying on the image."],
  },
];

export function collectionPath(slug: string) { return `/templates/category/${slug}/`; }
