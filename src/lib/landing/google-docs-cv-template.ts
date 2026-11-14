import type { LandingPage } from "../landing-types";
import { entry } from "../sample-cv";

// Jordan, Brightslot, Aspen Ridge, and Front Range State University are fictional.
// US numbers use the 555-01XX range reserved for fiction.
export const googleDocsCvTemplate: LandingPage = {
  slug: "google-docs-cv-template",
  kicker: "Free template · Google Docs",
  h1: "Free Google Docs resume template",
  intro: "A complete, editable resume you can open in Google Docs in about a minute: download the Word file, upload it to Google Drive, and replace the example with your own details. It also works as a Google Docs CV template for UK applications, and it's free with no sign-up.",
  points: ["Full worked example included", "Opens in Google Docs or Word", "One column, ATS-friendly", "No sign-up"],
  sections: [
    {
      id: "what-you-get", heading: "What this Google Docs resume template includes",
      paragraphs: [
        "This Google Docs resume template is a complete, filled-in resume rather than an empty frame. It downloads as a Word file, which Google Docs opens directly, and every line is ordinary editable text: a name and contact line, a summary, work history with bullet points, education, and grouped skills.",
        "We kept it to a single column on purpose. Two-column designs built from tables or text boxes often shift when they move between Word and Google Docs, and they can confuse the applicant tracking systems many US employers use. A one-column resume survives the trip intact and reads the same to a person and to a parser.",
        "The fictional example is a customer success specialist with about six years of work behind them, so it shows how to present a promotion inside one company, a short earlier job, and a skills section shaped around a job ad.",
      ],
    },
    {
      id: "open-in-google-docs", heading: "How to open the template in Google Docs",
      paragraphs: ["It takes about a minute, and all you need is a free Google account."],
      bullets: [
        "Download the Word file with the button on this page.",
        "In Google Drive, choose New, then File upload, and pick the downloaded file.",
        "Double-click the file in Drive, then choose Open with Google Docs at the top of the preview.",
        "In Docs, choose File, then Save as Google Docs. You now have your own copy to rename, share, and edit freely.",
        "For a US application, open File, then Page setup, and set the paper size to Letter; the download uses A4.",
        "Rename the copy straight away, for example Firstname Lastname Resume, so the version you send is never confused with the original.",
      ],
    },
    {
      id: "edit-without-breaking", heading: "Editing the template without breaking the layout",
      paragraphs: ["Most formatting problems in Google Docs come from pasting, not from typing. Three habits keep the template tidy."],
      subsections: [
        { heading: "Paste without formatting", paragraphs: ["Text copied from an old resume or a website brings its own fonts and spacing. Use Paste without formatting (Ctrl+Shift+V, or Cmd+Shift+V on a Mac) so new words pick up the template's style."] },
        { heading: "Keep dates on the tab stop", paragraphs: ["Each job title is followed by a tab and the dates, which sit against a right-aligned tab stop. If a date drops onto the next line, shorten the title or the company line instead of adding spaces."] },
        { heading: "Delete whole sections cleanly", paragraphs: ["To remove a section, select from its heading down to the last line before the next heading and delete it in one go. That way no empty bullet or orphaned heading rule is left behind."] },
      ],
    },
  ],
  example: {
    heading: "Worked example: a customer success resume in Google Docs",
    paragraphs: ["This is the full resume inside the Word download. Replace every detail with your own, then delete any line you couldn't back up in an interview."],
    cv: {
      id: "google-docs", template: "linear",
      person: { name: "Jordan Ellis", headline: "Customer Success Specialist", location: "Denver, CO", phone: "(303) 555-0142", email: "jordan.ellis@example.com" },
      summary: "Customer success specialist with four years' experience onboarding and retaining small-business clients on a subscription scheduling platform. Manage a book of 120 accounts with 94% annual retention, run product training over video, and turn customer feedback into clear tickets for the product team. Looking for a senior customer success role at a B2B software company.",
      experience: [
        entry("Customer Success Specialist", "Brightslot Software, Denver, CO", "Mar 2023 – Present", [
          "Manage onboarding and renewals for 120 small-business accounts, keeping annual retention at 94%",
          "Run weekly training webinars for new customers, averaging 35 attendees a session",
          "Wrote 18 help-center articles that cut repeat how-to tickets by about a quarter",
          "Spot churn risks in usage data and agree recovery plans with account managers each month",
        ]),
        entry("Customer Support Representative", "Brightslot Software, Denver, CO", "Jun 2021 – Feb 2023", [
          "Resolved 40 to 60 chat and email tickets a day with a 96% satisfaction score",
          "Led the support team's move to a new ticketing tool, which led to my promotion",
        ]),
        entry("Front Desk Associate", "Aspen Ridge Fitness, Boulder, CO", "Sep 2019 – May 2021", ["Handled sign-ups, billing questions, and class bookings for a gym with 2,000 members"]),
      ],
      education: [entry("B.A. in Communication", "Front Range State University", "2015 – 2019")],
      skills: "Customer success: onboarding, renewals, quarterly business reviews, churn analysis\nTools: Zendesk, HubSpot, Looker dashboards, Google Workspace\nCommunication: product training, help-center writing, cross-team escalation",
    },
    notes: [
      { heading: "One employer, two job titles", text: "The promotion at Brightslot appears as two entries with their own dates. A quick scan shows the progression, which one combined entry would hide." },
      { heading: "Numbers a hiring manager can ask about", text: "Retention, ticket volume, satisfaction, and webinar attendance are figures this person would know from their own dashboards. Use only numbers you could explain in an interview." },
      { heading: "Skills that mirror the job ad", text: "The tools listed are the kind a customer success posting names. Swap in the tools from the ad you're answering, but only the ones you've used. The [resume keyword checker](/resume-keyword-checker/) shows which ones are missing." },
    ],
  },
  after: [
    {
      id: "pdf-and-sharing", heading: "Downloading a PDF and sharing it safely",
      paragraphs: [
        "Most applications want a PDF. In Google Docs choose File, then Download, then PDF Document; the PDF keeps the fonts and line breaks exactly as you see them. Open it once before uploading, because a stray empty page at the end is easy to miss.",
        "If you send a link rather than a file, check who can open it. Share with specific people where you can, or set the link to Viewer, so nobody can change your resume or read your comments. Turn link sharing off again once the application has closed.",
      ],
    },
    {
      id: "docs-or-builder", heading: "Google Docs template or an online resume builder?",
      paragraphs: ["Both routes are free here, so choose by how you like to work. You can also combine them: build in the [free CV maker](/templates/), download the Word version, and upload that to Google Docs for comments."],
      table: {
        caption: "This Google Docs template compared with Folio's CV maker",
        head: ["", "Google Docs template", "Folio CV maker"],
        rows: [
          ["Best for", "Getting comments from a friend or careers adviser", "Trying several designs without retyping"],
          ["Layout", "One column, as downloaded", "40 designs, including two-column layouts"],
          ["Downloads", "PDF or Word, from Google Docs", "A designed PDF or an editable Word file"],
          ["Account", "A free Google account", "None needed"],
          ["Where your resume is kept", "Your Google Drive", "Your browser, on your device"],
        ],
      },
    },
    {
      id: "uk-and-pakistan", heading: "Using a Google Docs CV template in the UK or Pakistan",
      paragraphs: [
        "Outside the US the same document is usually called a CV and printed on A4, which is what the download already uses. A UK Google Docs CV template follows the same order with British spelling, a personal profile instead of a summary, and often two pages for an experienced applicant; the [UK CV format guide](/tips/uk-cv-format/) lists the rest.",
        "Employers in Pakistan often expect a fuller education history, from Matric onwards, and sometimes a little personal information. The [Pakistani CV format guide](/cv-format-pakistan/) explains the Google Docs CV format changes to make before you apply there.",
      ],
    },
  ],
  download: { label: "Download the Word file (.docx)", note: "Opens in Google Docs, Microsoft Word, and LibreOffice. It uses A4 paper; switch to Letter under File, then Page setup, for US applications." },
  faqs: [
    { question: "Is this Google Docs resume template free?", answer: "Yes. The download, the worked example, and the online CV maker are all free, with no sign-up. Google Docs itself needs a free Google account." },
    { question: "Why is it a Word file instead of a Google Docs link?", answer: "A Word file works everywhere. Uploaded to Google Drive it becomes your own Google Doc, with no request-access step and no shared original that someone else could edit. It also opens in Microsoft Word if you'd rather work there." },
    { question: "Will the formatting change when I open it in Google Docs?", answer: "It shouldn't. The template avoids tables, text boxes, and columns, which are what usually move between Word and Docs. If a font ever looks different, select all the text and choose Calibri again from the font menu." },
    { question: "How long should a resume made in Google Docs be?", answer: "One page for most US applicants with under about ten years of experience, and two after that. Docs shows a page-break line, so you can see the moment you run over." },
    { question: "Can I use it as a UK CV?", answer: "Yes. It's already on A4. Rename Summary to Profile, switch to British spelling, and check the dates read day-month-year if you include full dates." },
  ],
  related: [
    { href: "/resume-template-word/", label: "Microsoft Word resume template" },
    { href: "/harvard-cv-template/", label: "Harvard-style resume template" },
    { href: "/tips/us-resume-format/", label: "US resume format guide" },
    { href: "/templates/", label: "All free CV templates" },
  ],
};
