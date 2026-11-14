import type { LandingPage } from "../landing-types";
import { entry } from "../sample-cv";

// Sana, Gulfway Facilities Management, Creekside Trading, Lyallpur Weaving Mills, and Chenab Valley
// University are fictional. The phone number is a placeholder.
export const uaeCvFormat: LandingPage = {
  slug: "uae-cv-format",
  kicker: "CV format · UAE",
  h1: "UAE CV format, with a Dubai CV example",
  intro: "Employers in Dubai, Abu Dhabi, and across the UAE expect a few details that a UK or US CV leaves out, such as your visa status, nationality, and notice period. This guide explains the UAE CV format and gives you a complete Dubai CV example to edit and download free.",
  points: ["Visa, notice period, and photo explained", "Full Dubai CV example", "Word download included", "Free, no sign-up"],
  sections: [
    {
      id: "what-is-different", heading: "What makes a UAE CV different",
      paragraphs: [
        "UAE employers hire people from dozens of countries, often from abroad, so a recruiter's first questions are practical: can this person start soon, do they already live here, and will they need a new visa? A UAE CV answers those questions near the top, before the reader reaches your experience.",
        "Otherwise the format is familiar: a short profile, work history newest first, education, skills, and languages, usually on two A4 pages. Large employers and recruitment agencies often use applicant tracking systems, so a clean one-column layout with standard headings is the safest choice.",
      ],
      table: {
        caption: "Details a UAE CV usually includes",
        head: ["Detail", "How to write it"],
        rows: [
          ["Location", "City and country, such as Dubai, UAE, or the country you're applying from"],
          ["Visa status", "Residence visa (employment), visit visa with its expiry date, or \"requires visa sponsorship\""],
          ["Nationality", "Commonly listed, because it can affect visa processing"],
          ["Notice period", "\"Available immediately\" or \"30 days' notice\""],
          ["Driving licence", "UAE licence, or the country your licence is from"],
          ["Languages", "English and Arabic levels, plus others such as Urdu, Hindi, or Tagalog"],
        ],
      },
    },
    {
      id: "photo-and-personal", heading: "Photo and personal details on a UAE CV",
      paragraphs: [
        "A professional photo is still common on CVs in the UAE, and many recruiters are used to seeing one. It isn't required, and international companies increasingly accept CVs without it. If you include a photo, use a recent head-and-shoulders shot on a plain background, dressed as you would for the interview.",
        "Keep personal details short: nationality, visa status, and your date of birth only if the advert asks for it. Never include your passport or Emirates ID number; those belong on official forms, not on a document recruiters forward and store. Marital status and religion don't belong on a CV either unless an employer specifically asks.",
      ],
    },
    {
      id: "visa-and-notice", heading: "Visa status and notice period: how to word them",
      paragraphs: [
        "These two lines decide how quickly an employer can hire you, so be precise and honest. Recruiters check them first, and a vague phrase can leave your CV waiting in a pile.",
        "Applying from Pakistan, India, or elsewhere? Say so plainly and name the city you're in. Some employers only hire people already in the country, and others recruit abroad all the time; a clear line saves both sides a wasted call.",
      ],
      example: { label: "Wording that works (fictional)", text: "Visa: UAE residence visa (employment), valid until August 2027\n\nVisa: Visit visa, valid until 15 January 2027; available to start immediately\n\nVisa: Based in Lahore; requires employment visa sponsorship\n\nNotice period: 30 days" },
    },
  ],
  example: {
    heading: "Worked example: a Dubai CV for an HR and administration coordinator",
    paragraphs: ["Sana moved from Pakistan to Dubai five years ago and now coordinates HR for a facilities company. Her CV puts the practical details in one block and shows the UAE-specific processes she already knows."],
    cv: {
      id: "uae", template: "compact",
      person: { name: "Sana Malik", headline: "HR and Administration Coordinator", location: "Dubai, UAE", phone: "+971 50 000 0000", email: "sana.malik@example.com" },
      summary: "HR and administration coordinator with five years in Dubai, supporting recruitment, onboarding, and visa processing for companies of 150 to 400 staff. Coordinated work permits and residence visas for more than 120 new joiners and keep HR records ready for audit. Looking for an HR officer role with a growing company in Dubai or Abu Dhabi.",
      experience: [
        entry("HR and Administration Coordinator", "Gulfway Facilities Management LLC, Dubai", "Feb 2023 – Present", [
          "Coordinate onboarding for 30 to 40 new joiners a year, from offer letters to medicals and Emirates ID appointments",
          "Track visa, work permit, and medical insurance renewals for 260 employees, with no lapses in 2025",
          "Prepare monthly attendance and leave reports for payroll",
          "Arrange staff accommodation moves and company events with outside suppliers",
        ]),
        entry("Administrative Assistant", "Creekside Trading Co., Dubai", "Aug 2021 – Jan 2023", ["Ran the front desk, travel bookings, and supplier invoices for a 150-person trading company"]),
        entry("Admin Officer", "Lyallpur Weaving Mills, Faisalabad, Pakistan", "Jul 2019 – Jun 2021", ["Kept employee files and attendance records for a 500-person mill"]),
      ],
      education: [entry("BBA, Human Resource Management", "Chenab Valley University, Faisalabad, Pakistan", "2015 – 2019")],
      certifications: [entry("CIPD Level 3 Certificate in People Practice", "Chartered Institute of Personnel and Development", "2024")],
      skills: "HR: onboarding, visa and work permit coordination, HR records, attendance and leave\nSystems: cloud HR software, Microsoft Excel, Outlook\nAdministration: supplier management, travel, events",
      languages: "English: fluent\nUrdu: native\nArabic: basic",
      additional: { title: "Personal details", text: "Nationality: Pakistani\nVisa: UAE residence visa (employment), valid until August 2027\nNotice period: 30 days\nDriving licence: UAE" },
    },
    notes: [
      { heading: "Practical details in one block", text: "Visa, notice period, and licence sit together, so a recruiter can answer all three hiring questions at a glance." },
      { heading: "UAE processes named plainly", text: "Emirates ID appointments, work permits, and visa renewals show she already knows the local process, which is exactly what an HR team in Dubai needs." },
      { heading: "Earlier experience kept brief", text: "The job in Pakistan is a single line. It shows a longer career without taking space from her UAE roles." },
    ],
  },
  after: [
    {
      id: "length-and-tailoring", heading: "Length, language, and tailoring",
      paragraphs: [
        "Two A4 pages is normal for experienced applicants in the UAE, and one page suits graduates. Write in English unless the advert is in Arabic. If you speak Arabic, give an honest level, because many customer-facing and government-related roles value it highly.",
        "Recruiters in the UAE receive very large numbers of applications, so tailor the top third of your CV every time: the headline, the profile, and the first bullet under your current job. Use the advert's job title where it accurately describes you.",
      ],
    },
    {
      id: "from-pakistan-india", heading: "Applying to UAE jobs from Pakistan or India",
      paragraphs: [
        "Start from the CV you'd use at home, then remove what UAE employers don't need: your father's name, CNIC or Aadhaar number, and long school results. Keep your degree and professional qualifications, and add the visa line so it's clear you'll need sponsorship. The [Pakistani CV format](/cv-format-pakistan/) shows the starting point.",
        "Also considering Canada? The rules there are stricter again, with no photo or nationality at all. The [Canadian CV format](/canadian-cv-format/) covers that version, and the [CV templates with a photo](/templates/category/with-photo/) suit UAE applications where you'd like to include one.",
      ],
    },
  ],
  download: { label: "Download the UAE CV (.docx)", note: "A4, editable in Microsoft Word, Word for the web, and Google Docs. To add a photo in Word, use Insert, then Pictures." },
  faqs: [
    { question: "Should I include a photo on my CV in the UAE?", answer: "It's common but not required. A professional head-and-shoulders photo is fine for most UAE employers, and international companies often accept CVs without one." },
    { question: "Do I need to write my nationality?", answer: "It's usual, because nationality can affect visa processing. Put it in a short personal details line rather than at the very top." },
    { question: "How do I write my visa status on a CV?", answer: "Be specific: the visa type and its expiry date, such as \"UAE residence visa (employment), valid until August 2027\", or \"requires visa sponsorship\" if you're applying from abroad." },
    { question: "Should I include my expected salary?", answer: "No. Salary comes up once an employer is interested, often in the first call. A figure on your CV can rule you out before anyone reads further." },
    { question: "How long should a UAE CV be?", answer: "Two A4 pages for experienced candidates and one for graduates. Recruiters skim quickly, so lead each section with your strongest point." },
  ],
  related: [
    { href: "/cv-format-pakistan/", label: "Pakistani CV format" },
    { href: "/canadian-cv-format/", label: "Canadian CV format" },
    { href: "/templates/category/with-photo/", label: "CV templates with a photo" },
    { href: "/cv-template-word/", label: "UK CV template for Word" },
  ],
};
