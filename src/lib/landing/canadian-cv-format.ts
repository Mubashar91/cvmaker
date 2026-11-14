import type { LandingPage } from "../landing-types";
import { entry } from "../sample-cv";

// Bilal, Sindhu Valley Distribution, Lakeshore Fulfilment Centre, and Indus Coast University of
// Engineering are fictional. North American numbers use the 555-01XX range reserved for fiction.
export const canadianCvFormat: LandingPage = {
  slug: "canadian-cv-format",
  kicker: "CV format · Canada",
  h1: "Canadian CV format for applicants from Pakistan and India",
  intro: "A CV that works in Lahore or Delhi needs real changes before it works in Toronto or Vancouver. This page walks through the Canadian CV format for applicants from Pakistan and India: what to remove, how to explain your degree and overseas jobs, and a full example resume you can edit for free.",
  points: ["What to remove and what to add", "Degree and job context explained", "Full example resume", "Free, no sign-up"],
  sections: [
    {
      id: "cv-or-resume", heading: "In Canada, your CV is called a resume",
      paragraphs: [
        "Canadian employers call the document a resume, and most expect two pages at most. In Canada a CV usually means a long academic record for university and research posts. If you're applying to companies, write a resume even when the job ad says CV; the format on this page is what recruiters there have in mind.",
        "The biggest change for applicants from Pakistan and India is what comes out. Provincial human rights laws limit what employers may consider when hiring, so recruiters are uncomfortable seeing personal details on a resume, and some will set one aside rather than risk any appearance of bias.",
      ],
    },
    {
      id: "remove-and-add", heading: "What to remove and what to add",
      paragraphs: ["Work through your existing CV line by line with this table. Most applicants find the result is shorter, and easier to read, than the original."],
      table: {
        caption: "Turning a Pakistani or Indian CV into a Canadian resume",
        head: ["Remove", "Add or change"],
        rows: [
          ["Photo", "Nothing in its place; Canadian resumes have no photo"],
          ["Date of birth, age, and marital status", "Your work authorization, such as permanent resident or open work permit"],
          ["Father's name, religion, and caste", "Your city and province, or \"Relocating to Toronto, ON in March 2027\""],
          ["CNIC, Aadhaar, or passport number", "A Canadian phone number if you have one, and a LinkedIn URL"],
          ["Matric and Intermediate marks", "Your degree, with its Canadian equivalence from a credential assessment"],
          ["Declaration and signature at the end", "A one-line description under each overseas employer"],
        ],
      },
    },
    {
      id: "degree", heading: "Explaining your degree and qualifications",
      paragraphs: [
        "Canadian employers can't easily judge a degree from a university they've never heard of. A credential assessment solves that. If you immigrated through Express Entry you probably already have an Educational Credential Assessment from an organization such as WES; quote its result in your education section.",
        "Write the degree under its original name, then the equivalence, for example \"Bachelor of Engineering (Industrial), assessed by WES as equivalent to a Canadian four-year bachelor's degree\". For regulated professions such as engineering, nursing, accounting, or teaching, add where you are in the licensing process with the provincial body, because many jobs require that licence.",
      ],
    },
    {
      id: "overseas-experience", heading: "Making overseas work experience count",
      paragraphs: [
        "Recruiters often say they want Canadian experience. What many of them mean is evidence that you'll communicate clearly, take initiative, and deliver results they understand. Much of that can be shown on paper.",
        "Under each overseas employer, add one line of context: what the company does, its size, and who it serves. \"Packaged-food distributor with 1,200 staff supplying about 9,000 retailers\" tells a Toronto recruiter more than a name they can't look up. Translate local terms, and give large figures as percentages or in Canadian dollars.",
        "If you've volunteered or worked any job since arriving, list it first, even if it's unrelated to your field. A recent Canadian line with a reference who can be called often matters more to an employer than its job title.",
      ],
    },
    {
      id: "details", heading: "Length, language scores, and references",
      paragraphs: ["A few smaller conventions finish the job."],
      bullets: [
        "Two pages at most, or one if you have under five years of experience.",
        "Mention IELTS or CELPIP results only when the posting asks about language proficiency.",
        "Leave references off the resume, and line up two or three, ideally including one in Canada, for when they're requested.",
        "Canadian spelling mixes British and American habits, such as colour, centre, and organize; whichever you choose, be consistent.",
      ],
    },
  ],
  example: {
    heading: "Worked example: a Canadian resume for a supply chain analyst from Pakistan",
    paragraphs: ["Bilal spent six years in distribution in Karachi and is now a permanent resident in Ontario, working part-time while he looks for an analyst role. His resume keeps the strongest Pakistani experience but presents it the way a Canadian recruiter reads."],
    cv: {
      id: "canada", template: "linear",
      person: { name: "Bilal Ahmed", headline: "Supply Chain Analyst · Permanent Resident", location: "Mississauga, ON", phone: "(416) 555-0133", email: "bilal.ahmed@example.com" },
      summary: "Supply chain analyst with six years in consumer goods distribution in Pakistan, now a permanent resident in Ontario. Built demand forecasts and replenishment plans for a network of about 9,000 retailers, cutting stock-outs by 18% while lowering inventory. Experienced with SAP and Power BI, and looking for a supply chain or inventory analyst role in the Greater Toronto Area.",
      experience: [
        entry("Warehouse Associate (part-time)", "Lakeshore Fulfilment Centre, Mississauga, ON", "Jun 2026 – Present", [
          "Pick, pack, and audit e-commerce orders with 99.8% picking accuracy",
          "Suggested relabelling fast-moving bins, which the shift lead adopted across the aisle",
        ]),
        entry("Supply Chain Analyst", "Sindhu Valley Distribution, Karachi, Pakistan", "Jan 2021 – Apr 2026", [
          "Packaged-food distributor with 1,200 staff supplying about 9,000 retailers across southern Pakistan",
          "Built weekly demand forecasts for 450 products, cutting stock-outs by 18% in two years",
          "Reduced average inventory by 12%, about CAD 1.1 million, through new reorder points",
          "Designed Power BI dashboards used by 20 regional sales managers",
        ]),
        entry("Assistant Logistics Officer", "Sindhu Valley Distribution, Karachi, Pakistan", "Jul 2019 – Dec 2020", ["Scheduled 60 to 80 truck dispatches a day and tracked on-time delivery"]),
      ],
      education: [entry("Bachelor of Engineering, Industrial and Manufacturing", "Indus Coast University of Engineering, Karachi, Pakistan", "2015 – 2019", ["Assessed by WES as equivalent to a Canadian four-year bachelor's degree"])],
      certifications: [entry("Microsoft Certified: Power BI Data Analyst Associate", "Microsoft", "2024")],
      skills: "Supply chain: demand forecasting, replenishment planning, inventory optimization, S&OP support\nTools: SAP, Power BI, Excel (Power Query, advanced formulas), SQL basics\nLanguages: English, Urdu, Sindhi",
    },
    notes: [
      { heading: "Status in the headline", text: "\"Permanent Resident\" answers the first question many Canadian recruiters have about an overseas applicant, before they start wondering about sponsorship." },
      { heading: "The Canadian job comes first", text: "The part-time warehouse role is recent, local, and easy to verify, so it sits at the top even though the Karachi job is more senior." },
      { heading: "Context and currency translated", text: "The Pakistani employer gets a one-line description, and money appears as a percentage and in Canadian dollars, so nothing has to be looked up." },
    ],
  },
  after: [
    {
      id: "more-help", heading: "More help with a Canadian job search",
      paragraphs: [
        "For the general Canadian layout, including a version for students, read the [Canadian resume format guide](/tips/canadian-resume-format/). If your main challenge is years of experience from abroad, the [resume guide for newcomers to Canada](/tips/canadian-newcomer-resume/) goes further into job titles and employer descriptions.",
        "Coming from a Pakistani-style CV? Compare this page with the [Pakistani CV format](/cv-format-pakistan/) to see exactly which sections to drop. Then open the example above in the free CV maker, try a different design if you like, and download a PDF; for Letter-size paper, use the Word download and change the page size.",
      ],
    },
  ],
  download: { label: "Download the Canadian resume (.docx)", note: "Set on A4; in Word choose Layout, then Size, then Letter, which is standard in Canada." },
  faqs: [
    { question: "Should I put a photo on my resume for Canada?", answer: "No. Canadian resumes don't include photos, and many recruiters prefer not to see one because it shows personal characteristics they aren't allowed to consider." },
    { question: "Do I need a Canadian address before I apply?", answer: "No, but say where you'll be. \"Relocating to Calgary, AB in June 2027\" works; if you're already in Canada, your city and province are enough." },
    { question: "Should I mention my work permit or PR status?", answer: "Yes, briefly. A line such as \"Permanent resident\" or \"Open work permit, valid to 2028\" in your headline saves the recruiter from having to ask." },
    { question: "Do Canadian employers accept degrees from Pakistan and India?", answer: "Many do, especially with a credential assessment such as WES. Regulated professions like engineering, nursing, and accounting also need a licence from the provincial body before you can practise." },
    { question: "How long should a resume for Canada be?", answer: "One to two pages. Cut older jobs to a line each and leave school results out entirely." },
  ],
  related: [
    { href: "/tips/canadian-resume-format/", label: "Canadian resume format guide" },
    { href: "/tips/canadian-newcomer-resume/", label: "Canadian resume for newcomers" },
    { href: "/cv-format-pakistan/", label: "Pakistani CV format" },
    { href: "/uae-cv-format/", label: "UAE CV format" },
  ],
};
