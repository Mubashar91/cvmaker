import type { LandingPage } from "../landing-types";
import { entry } from "../sample-cv";

// Hannah, Kestrel Packaging, Arden Office Supplies, and Westmere University are fictional.
export const cvTemplateWord: LandingPage = {
  slug: "cv-template-word",
  kicker: "Free template · Microsoft Word · UK",
  h1: "Free UK CV template for Word",
  intro: "Download a complete UK CV template for Word: an editable .docx on A4, laid out in the British order recruiters expect, with a full worked example to replace with your own details. It opens in Microsoft Word, Word for the web, and LibreOffice, and it's free with no sign-up.",
  points: ["UK format on A4", "Full worked example", "Editable .docx download", "No sign-up or subscription"],
  sections: [
    {
      id: "uk-format", heading: "What goes into this UK format CV template",
      paragraphs: [
        "The template follows the British CV layout from top to bottom: your name and contact line, a short personal profile, work experience with the most recent job first, education, skills, and a closing line for anything a UK employer often asks about, such as a driving licence or right to work. It's set on A4 and comfortably fits two pages, the usual length for someone with a few years of experience.",
        "Just as important is what it leaves out. There's no photo, date of birth, marital status, or nationality, because UK employers don't expect them and many would rather not see them. There's no References section either: employers ask for referees when they make an offer, so the space is better spent on evidence.",
      ],
      table: {
        caption: "UK CV format: include and leave out",
        head: ["Include", "Leave out"],
        rows: [
          ["Name, phone, email, and town or city", "Full postal address and a photo"],
          ["A three- to four-line personal profile", "Date of birth, age, and marital status"],
          ["Jobs in reverse order, with results", "National Insurance number"],
          ["Degree and A level or GCSE summary", "\"References available on request\""],
          ["Driving licence or right to work, if relevant", "Reasons for leaving and salary history"],
        ],
      },
    },
    {
      id: "edit-in-word", heading: "Editing the CV template in Microsoft Word",
      paragraphs: ["Everything in the file is ordinary text with real headings, bullet lists, and tab stops, so editing is a matter of typing over the example. A few Word features make it quicker."],
      subsections: [
        { heading: "Jump between sections", paragraphs: ["Open View, then Navigation Pane. Each section heading appears in the pane, so you can click straight to Education or Skills instead of scrolling a two-page document."] },
        { heading: "Keep the dates lined up", paragraphs: ["Dates sit on a right-aligned tab stop at the end of each job title line. Type the title, press Tab once, then type the dates. If they wrap, shorten the title rather than reducing the font size."] },
        { heading: "Add or remove a bullet", paragraphs: ["Press Enter at the end of a bullet for a new one in the same style. To delete one, select the whole line including its end and press Delete, so the list numbering and spacing stay even."] },
      ],
    },
  ],
  example: {
    heading: "Worked example: a UK sales coordinator CV in Word",
    paragraphs: ["Hannah has six years in sales support and wants her next role to include managing key accounts. This is the complete CV inside the Word download, on two A4 pages at most."],
    cv: {
      id: "cv-word-uk", template: "minimal",
      person: { name: "Hannah Brooks", headline: "Sales Coordinator", location: "Birmingham", phone: "07700 900215", email: "hannah.brooks@example.com" },
      summary: "Sales coordinator with six years' experience supporting B2B sales teams in packaging and office supplies. Run order processing and account administration for 70 trade customers, keep the CRM accurate enough to forecast from, and resolve delivery problems before they reach the sales manager. Looking for an account manager role where I can look after key customers directly.",
      experience: [
        entry("Sales Coordinator", "Kestrel Packaging Ltd, Birmingham", "Apr 2022 – Present", [
          "Process 250 to 300 trade orders a month in Salesforce and the warehouse system with an error rate under 1%",
          "Look after day-to-day contact for 70 trade accounts, including quotes, price changes, and credit-limit queries",
          "Built a weekly pipeline report that the sales manager now uses for the monthly forecast meeting",
          "Cut late deliveries to the top 10 customers by a third by agreeing fixed dispatch days with the warehouse",
        ]),
        entry("Sales Administrator", "Arden Office Supplies, Solihull", "Aug 2019 – Mar 2022", [
          "Set up new customer accounts and supplier price lists in Sage and kept them up to date",
          "Answered the sales line and inbox, turning around most quote requests the same day",
        ]),
        entry("Retail Sales Assistant", "Arden Office Supplies, Solihull", "Jun 2017 – Jul 2019", ["Served trade and walk-in customers and ran the weekly stationery promotion display"]),
      ],
      education: [
        entry("BA (Hons) Business and Marketing, 2:1", "Westmere University", "2014 – 2017"),
        entry("A levels: Business (A), Geography (B), English Language (C)", "Solihull Sixth Form", "2012 – 2014"),
      ],
      skills: "Sales support: order processing, quotations, account administration, pipeline reporting\nSystems: Salesforce, Sage 200, Microsoft Excel (pivot tables, XLOOKUP), Outlook\nCustomer: trade account management, delivery problem-solving, clear written updates",
      additional: { title: "Additional information", text: "Full UK driving licence. Full right to work in the UK." },
    },
    notes: [
      { heading: "A profile that names the next job", text: "The last sentence says what Hannah wants: an account manager role. UK recruiters read the profile first, so a clear target helps them see where the CV fits." },
      { heading: "Two roles, one employer, honest dates", text: "Her move from shop floor to sales administration at the same firm is shown as separate entries. It explains the career path without a paragraph of explanation." },
      { heading: "Practical extras at the end", text: "A driving licence and right to work matter for many UK roles, so one plain line answers both questions without a separate Personal details section." },
    ],
  },
  after: [
    {
      id: "word-or-pdf", heading: "Send the Word file or a PDF?",
      paragraphs: [
        "Send whatever the advert asks for. Many UK recruitment agencies prefer a Word CV, because they reformat it and remove your contact details before forwarding it to their client. Employers who use an online application portal usually accept either, and a PDF guarantees the layout won't move on someone else's screen.",
        "Word makes the PDF for you: choose File, then Save As, and pick PDF as the file type, or use File, then Export, on newer versions. Name it with your own name, such as Hannah-Brooks-CV.pdf, so it's easy to find in a recruiter's downloads.",
      ],
    },
    {
      id: "word-templates-compared", heading: "Why a plain Word CV template beats a decorative one",
      paragraphs: [
        "Word's own template gallery and many free download sites offer eye-catching CV templates built from tables, text boxes, and shapes. They look good as a picture, but they're awkward to edit, they often break when someone opens them in a different version of Word, and the text in boxes can be skipped or scrambled when an applicant tracking system reads the file.",
        "This template does the opposite: plain paragraphs, real headings, and tab stops, with typography doing the work. If you'd like a designed layout as well, build the CV in the [free CV maker](/templates/), choose from 40 designs for the PDF, and keep this Word version for agencies and anyone who needs to edit it.",
      ],
    },
    {
      id: "other-versions", heading: "Need a US resume or a Google Docs version?",
      paragraphs: ["For a job in the United States, the conventions change: one page, Letter-size paper, and \"resume\" rather than CV. The [Microsoft Word resume template](/resume-template-word/) is set up for that. If you'd rather edit online with comments from a friend or careers adviser, the [Google Docs resume template](/google-docs-cv-template/) explains how to open a template like this one in Docs."],
    },
  ],
  download: { label: "Download the UK CV template (.docx)", note: "A4, in Calibri. Works in Microsoft Word 2010 or later, Word for the web, LibreOffice, and Google Docs." },
  faqs: [
    { question: "Do I need to pay for Microsoft Word to use this template?", answer: "No. Word for the web is free with a Microsoft account, and LibreOffice Writer is free to download. Both open and save .docx files. The template itself is free with no sign-up." },
    { question: "Will the template work on a Mac?", answer: "Yes. It's a standard .docx file, so it opens in Word for Mac and in Pages, although Pages may adjust the tab stops slightly. Check the date column after opening it." },
    { question: "How long should a UK CV be?", answer: "Two A4 pages for most people with work experience, and one page for a first job. The template fits two pages with the example content, so you have room for your own." },
    { question: "Should I add a photo to a UK CV?", answer: "No, unless the employer specifically asks, which is rare outside acting and modelling. Leaving it out avoids bias and keeps the space for evidence." },
    { question: "Can I change the font and colour?", answer: "Yes. Select all the text and choose another font such as Arial or Calibri Light; the headings use the template's accent colour, which you can change from the Font Color menu." },
  ],
  related: [
    { href: "/resume-template-word/", label: "Microsoft Word resume template (US)" },
    { href: "/tips/uk-cv-format/", label: "UK CV format guide" },
    { href: "/templates/", label: "All free CV templates" },
    { href: "/google-docs-cv-template/", label: "Google Docs resume template" },
  ],
};
