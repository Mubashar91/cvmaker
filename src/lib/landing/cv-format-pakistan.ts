import type { LandingPage } from "../landing-types";
import { entry } from "../sample-cv";

// Ayesha, Meridian Savings Bank, Northstar Contact Centre, and Lahore Riverside Institute of
// Management are fictional. Exam boards are real names used only to show the format.
export const cvFormatPakistan: LandingPage = {
  slug: "cv-format-pakistan",
  kicker: "CV format · Pakistan",
  h1: "Pakistani CV format, with a free Word download",
  intro: "The CV format in Pakistan differs from British or American conventions in a few important ways: more education detail, marks from Matric and Intermediate, and sometimes a personal information section. This page shows a complete Pakistani CV format example that you can download in Word for free and edit.",
  points: ["Full example CV", "CV format in Word (.docx)", "Private, government, and multinational jobs", "Free, no sign-up"],
  sections: [
    {
      id: "standard-order", heading: "The standard Pakistani CV format, section by section",
      paragraphs: ["Recruiters in Pakistan expect to find information in a familiar order. Follow it and your CV is easy to compare with others; skip a section they look for, such as your Intermediate result, and they may assume something is missing."],
      table: {
        caption: "Pakistani CV format: what each section contains",
        head: ["Section", "What goes in it"],
        rows: [
          ["Contact details", "Full name, mobile number with +92, email, and city; a LinkedIn profile if it's current"],
          ["Profile or career objective", "Three or four lines on your experience and the job you want, written for this application"],
          ["Work experience", "Most recent job first: company, city, dates, and three to five achievements"],
          ["Education", "Degree with CGPA, then Intermediate and Matric with board, year, and marks"],
          ["Skills and languages", "Software and technical skills, plus English, Urdu, and any regional language"],
          ["Certifications and training", "Professional exams and short courses, with the year"],
          ["Personal information", "Only when the employer expects it, usually last"],
        ],
      },
    },
    {
      id: "education", heading: "How to list Matric, Intermediate, and your degree",
      paragraphs: [
        "Employers here read the education section closely, especially for entry-level jobs. List it newest first: your bachelor's or master's degree, then Intermediate, then Matric. For each, give the qualification, the university or board, the year, and the result.",
        "Show a degree result as CGPA out of 4.00, for example 3.42/4.00, and name the university in full. For Intermediate, name your group: FSc Pre-Engineering, FSc Pre-Medical, ICS, I.Com, or FA. For Matric, say Science or Arts. Give marks as obtained out of the total, exactly as they appear on your result card.",
        "If you studied the Cambridge system, write O Levels and A Levels with subjects and grades instead of Matric and Intermediate. Add your IBCC equivalence only when an application asks for it.",
      ],
      example: { label: "Education in Pakistani CV format (fictional)", text: "BS Computer Science, CGPA 3.42/4.00 · Lahore Riverside Institute of Technology · 2024\n\nFSc Pre-Engineering, 942/1100 · BISE Lahore · 2020\n\nMatric (Science), 1015/1100 · BISE Lahore · 2018" },
    },
    {
      id: "personal-information", heading: "Personal information: what to include and what to hold back",
      paragraphs: [
        "Many local employers, and most government-linked roles, still expect a short personal information section at the end: father's name, date of birth, domicile, and sometimes marital status. Multinationals and private companies hiring through online portals rarely need it, and leaving it out keeps the CV focused on your work.",
        "Be careful with your CNIC number. A CV gets forwarded, printed, and uploaded to job sites, so write \"CNIC: available on request\" and share the number only with an employer you've checked, at the offer or document-verification stage. The same goes for your full home address; your city is enough on a CV.",
        "A photo is common on Pakistani CVs, and some local employers expect one. If you add it, use a recent passport-style photo on a plain background. Leave it off when applying to multinationals or employers abroad, who usually prefer a CV without a photo.",
      ],
    },
    {
      id: "by-employer", heading: "Private, government, and multinational CVs compared",
      paragraphs: ["The core format stays the same, but three details shift with the kind of employer. Check the advert too: if it asks for a specific form or format, that overrides everything here."],
      table: {
        caption: "Adjusting your CV for different employers in Pakistan",
        head: ["", "Private company", "Government or semi-government", "Multinational"],
        rows: [
          ["Length", "One to two pages", "Two pages is common", "One to two pages"],
          ["Photo", "Often included", "Usually expected", "Usually left off"],
          ["Personal information", "Brief, if at all", "Father's name, date of birth, domicile", "Not needed"],
          ["How you apply", "Email or job portal, Word or PDF", "Often an official form, with the CV attached", "Online portal, usually PDF"],
        ],
      },
    },
  ],
  example: {
    heading: "Worked example: a Pakistani CV for a banking role",
    paragraphs: ["Ayesha works in retail banking in Lahore and is applying for a relationship manager post. Her CV keeps the order local banks expect, including school results and a short personal information section at the end."],
    cv: {
      id: "pakistan", template: "professional",
      person: { name: "Ayesha Siddiqui", headline: "Customer Relationship Officer, Retail Banking", location: "Lahore, Pakistan", phone: "+92 300 0000000", email: "ayesha.siddiqui@example.com" },
      summary: "Customer relationship officer with three years in retail banking, opening accounts, solving digital banking problems, and meeting branch deposit targets. Consistently in the top three of 14 branch staff for new current accounts, and comfortable explaining products in English and Urdu. Looking for a relationship manager role in a growing branch network.",
      experience: [
        entry("Customer Relationship Officer", "Meridian Savings Bank, Gulberg Branch, Lahore", "Jul 2023 – Present", [
          "Open 25 to 35 new accounts a month, completing KYC checks and paperwork with no audit findings",
          "Help customers set up the mobile banking app, reducing walk-in requests for simple transfers",
          "Reached 112% of the personal deposit target in 2025 by following up dormant accounts",
          "Log and resolve complaints within the bank's turnaround times, escalating suspected fraud the same day",
        ]),
        entry("Call Centre Agent, Banking", "Northstar Contact Centre, Lahore", "Aug 2022 – Jun 2023", ["Answered 70 to 90 calls a day on card blocks, balance queries, and complaints in English and Urdu"]),
      ],
      education: [
        entry("BBA (Hons) Banking and Finance, CGPA 3.31/4.00", "Lahore Riverside Institute of Management", "2018 – 2022"),
        entry("Intermediate (I.Com), 901/1100", "BISE Lahore", "2018"),
        entry("Matric (Science), 987/1100", "BISE Lahore", "2016"),
      ],
      certifications: [entry("Anti-Money Laundering and CFT Awareness", "Meridian Savings Bank, in-house training", "2023")],
      skills: "Banking: account opening, KYC and AML checks, deposit products, complaint handling\nSoftware: core banking system, Microsoft Excel, Outlook\nCommunication: customer service in English and Urdu, in branch and by phone",
      languages: "English: fluent\nUrdu: native\nPunjabi: conversational",
      additional: { title: "Personal information", text: "Father's name: Tariq Siddiqui\nDate of birth: 4 March 2000\nDomicile: Lahore\nCNIC: available on request" },
    },
    notes: [
      { heading: "Marks in the form employers expect", text: "Intermediate and Matric show marks out of the board total, and the degree shows CGPA out of 4.00, so a recruiter can compare candidates at a glance." },
      { heading: "Personal details last, CNIC held back", text: "The section a local bank looks for is there, but at the end, and the CNIC number isn't printed on a document that will be forwarded around." },
      { heading: "Achievements, not duties", text: "\"112% of the deposit target\" and \"no audit findings\" say far more than \"responsible for account opening\"." },
    ],
  },
  after: [
    {
      id: "word-format", heading: "CV format in Word: editing and sending the file",
      paragraphs: [
        "The download is this CV format in Word (.docx) on A4, the paper size used in Pakistan, in a plain one-column layout that job portals and HR software read correctly. Open it in Microsoft Word or the free Word for the web, type over the example, and delete the personal information section if the job doesn't need it.",
        "When you apply, save a PDF copy too: in Word choose File, then Save As, and pick PDF. Send the PDF by default and the Word file only when a recruiter asks for an editable CV. Name both files with your full name rather than just CV.docx.",
      ],
    },
    {
      id: "free-cv-format", heading: "A free CV format with more design",
      paragraphs: ["For a more polished layout than Word allows, enter your details in the [free CV maker](/templates/) and choose from 40 designs, including templates with space for a photo. There's no sign-up and no watermark, and you can still download the plain Word version for employers who want to edit it. Applying abroad? The [Canadian CV format](/canadian-cv-format/) and [UAE CV format](/uae-cv-format/) guides explain what those employers expect instead."],
    },
  ],
  download: { label: "Download the CV format in Word (.docx)", note: "A4, editable in Microsoft Word, Word for the web, Google Docs, and WPS Office. Delete the personal information section if the employer doesn't ask for it." },
  faqs: [
    { question: "Should I add a photo to my CV in Pakistan?", answer: "For many local employers, yes; a recent passport-style photo is common. Leave it off for multinationals and jobs abroad, where photos are usually unwelcome." },
    { question: "Do I need to write my father's name on my CV?", answer: "Only if the employer expects it, which is common for government and some local jobs. Private companies and multinationals don't need it." },
    { question: "Should my CV include my CNIC number?", answer: "Write \"available on request\" instead. Your CV is shared widely, and a CNIC number can be misused; give it to a verified employer when they ask for it." },
    { question: "How long should a CV be in Pakistan?", answer: "One to two pages for most private-sector jobs. Fresh graduates should aim for one full page, and experienced professionals can use two." },
    { question: "Should my CV be in English or Urdu?", answer: "English, for almost all private, multinational, and government jobs. List Urdu and any regional language in your languages section." },
  ],
  related: [
    { href: "/teacher-cv-format/", label: "Teacher CV format for Pakistani schools" },
    { href: "/canadian-cv-format/", label: "Canadian CV format for Pakistani applicants" },
    { href: "/uae-cv-format/", label: "UAE CV format" },
    { href: "/harvard-cv-template/", label: "Harvard-style CV template" },
  ],
};
