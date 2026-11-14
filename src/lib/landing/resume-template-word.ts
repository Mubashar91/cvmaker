import type { LandingPage } from "../landing-types";
import { entry } from "../sample-cv";

// Marcus, Lakeview Family Practice, Northgate Urgent Care, and Riverbend Career College are fictional.
// US numbers use the 555-01XX range reserved for fiction.
export const resumeTemplateWord: LandingPage = {
  slug: "resume-template-word",
  kicker: "Free template · Microsoft Word · US",
  h1: "Free Microsoft Word resume template",
  intro: "An easy resume template for Microsoft Word, with a complete worked example: download the .docx, switch the page to Letter size, and type over the example with your own experience. It's a free download with no sign-up, no trial, and no watermark.",
  points: ["Free download, no sign-up", "Full worked example", "Simple one-page layout", "Opens in Word or Word for the web"],
  sections: [
    {
      id: "what-you-get", heading: "An easy resume template that stays easy to edit",
      paragraphs: [
        "Most Microsoft Word resume templates look impressive until you try to change them. Text sits in boxes, columns are built from invisible tables, and one extra line pushes half the page out of place. This resume template free download is the opposite: plain paragraphs, real headings, bullet lists, and dates on a tab stop, so typing over the example is all the editing you need.",
        "It's laid out the way US hiring managers expect. Your name and contact line come first, then a short summary, experience with the newest job on top, education, certifications, and skills. There's no photo, no date of birth, and no references section, none of which belong on a US resume.",
      ],
    },
    {
      id: "letter-size", heading: "Switch the template to US Letter in two clicks",
      paragraphs: [
        "The download is set on A4, the international paper size, which is slightly taller and narrower than US Letter. In Word, open the Layout tab, choose Size, then Letter. The text reflows on its own; check that the last few lines haven't moved onto a second page.",
        "While you're on the Layout tab, look at Margins. Anything from half an inch to one inch is normal. If you're a line or two over one page, narrowing the margins slightly is better than shrinking the font below 10.5 points, which makes a resume harder to read.",
      ],
    },
    {
      id: "us-conventions", heading: "US resume rules the template already follows",
      paragraphs: ["A few conventions trip up applicants who've written CVs for other countries. The template handles each one, so you don't have to remember them while you write."],
      bullets: [
        "One page for most people with under about ten years of experience; two pages only when every line earns its place.",
        "City and state rather than a full street address, plus a phone number, a professional email, and a LinkedIn URL if you have one.",
        "No personal pronouns: \"Coordinated 30 patient visits a day\", not \"I coordinated\".",
        "Present tense for your current job, past tense for earlier ones.",
        "Certifications and licenses in their own section, because many US job postings require them by name.",
      ],
    },
  ],
  example: {
    heading: "Worked example: a medical assistant resume in Word",
    paragraphs: ["Marcus has worked in outpatient clinics for five years and wants a lead medical assistant role. The Word download contains this complete resume; it fits on one Letter page once you switch the size."],
    cv: {
      id: "resume-word-us", template: "outline",
      person: { name: "Marcus Reed", headline: "Certified Medical Assistant (CMA)", location: "Columbus, OH", phone: "(614) 555-0186", email: "marcus.reed@example.com" },
      summary: "Certified medical assistant with five years in busy family and urgent care practices. Room 25 to 30 patients a day, take vitals and histories, draw blood, and keep Epic records complete before the provider walks in. Ready to lead a clinical support team and train new assistants.",
      experience: [
        entry("Medical Assistant", "Lakeview Family Practice, Columbus, OH", "Mar 2022 – Present", [
          "Room 25 to 30 patients a day for three providers, recording vitals, medications, and visit reasons in Epic",
          "Perform venipuncture, EKGs, and point-of-care tests, with no specimen rejections in the last 12 months",
          "Handle prior authorizations for imaging and specialty medications, cutting average approval time from eight days to five",
          "Trained four new medical assistants on rooming workflow and infection control",
        ]),
        entry("Patient Services Representative", "Northgate Urgent Care, Columbus, OH", "Jan 2020 – Feb 2022", [
          "Checked in up to 80 patients a shift, verified insurance, and collected co-pays",
          "Scheduled follow-ups and referrals and answered billing questions by phone",
        ]),
      ],
      education: [entry("Medical Assistant Diploma", "Riverbend Career College, Columbus, OH", "2019 – 2020", ["Externship: 160 hours in a multi-provider family practice"])],
      certifications: [
        entry("Certified Medical Assistant (CMA)", "American Association of Medical Assistants", "2020 – Present"),
        entry("Basic Life Support (BLS)", "American Heart Association", "Renewed 2025"),
      ],
      skills: "Clinical: vitals, venipuncture, EKG, injections, point-of-care testing, infection control\nAdministrative: Epic EHR, prior authorizations, insurance verification, scheduling\nLanguages: English, conversational Spanish",
    },
    notes: [
      { heading: "The credential is in the headline", text: "Many medical assistant postings require certification, so \"Certified Medical Assistant (CMA)\" appears right under the name, where a recruiter's eye lands first." },
      { heading: "Clinical numbers, not adjectives", text: "Patients per day, specimen rejections, and approval times show competence more convincingly than \"detail-oriented\" or \"hard-working\"." },
      { heading: "A short second job", text: "The front-desk role gets two bullets because it shows insurance and scheduling skills. Older, unrelated jobs can be left off a US resume entirely." },
    ],
  },
  after: [
    {
      id: "save-as-pdf", heading: "Save your resume as a PDF from Word",
      paragraphs: [
        "Unless a posting asks for a Word document, upload a PDF so your layout looks the same on every screen. On Windows choose File, then Save As, and set the file type to PDF. On a Mac choose File, then Save As, and pick PDF from the format menu. In Word for the web, use File, then Download, then Download as PDF.",
        "Before you upload, open the PDF and try selecting a line of text. If you can highlight individual words, an applicant tracking system can read them too; a resume saved as an image can't be read at all.",
      ],
    },
    {
      id: "more-design", heading: "Want a resume with more design?",
      paragraphs: ["This template is deliberately simple, which is what makes it reliable in Word. If you'd like a two-column layout, a colour header, or a different typeface, enter your details once in the [free CV maker](/templates/) and download any of its designs as a PDF; the Word download from the maker gives you this same clean, editable version alongside it. Applying for jobs in the UK instead? Use the [UK CV template for Word](/cv-template-word/), which keeps A4 and British conventions."],
    },
  ],
  download: { label: "Download the Word resume template (.docx)", note: "Set on A4; switch to Letter under Layout, then Size. Works in Microsoft Word, Word for the web, Word for Mac, and LibreOffice." },
  faqs: [
    { question: "Is this Microsoft Word resume template really free?", answer: "Yes. There's no sign-up, trial, or watermark. You need a program that opens .docx files, and Word for the web is free with a Microsoft account." },
    { question: "Is the template ATS-friendly?", answer: "Yes. It's one column of real text with standard section names and no tables, text boxes, or graphics, which is the format applicant tracking systems read most reliably. Save it as a PDF unless the posting asks for Word." },
    { question: "How do I make the resume one page?", answer: "Switch to Letter size first, then cut the oldest or least relevant bullets. If you're still a line or two over, set the margins to 0.7 inches before you consider a smaller font." },
    { question: "Should I include an objective on my resume?", answer: "A short summary works better for most people because it describes what you already offer. An objective can help a career changer or a first-time job seeker explain what they're aiming for." },
    { question: "Can I add a photo in Word?", answer: "You can, but you shouldn't for US jobs. Many US employers avoid resumes with photos to reduce the risk of bias claims, and some screen them out." },
  ],
  related: [
    { href: "/cv-template-word/", label: "UK CV template for Word" },
    { href: "/google-docs-cv-template/", label: "Google Docs resume template" },
    { href: "/harvard-cv-template/", label: "Harvard-style resume template" },
    { href: "/tips/us-resume-format/", label: "US resume format guide" },
  ],
};
