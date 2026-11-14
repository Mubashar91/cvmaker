import type { LandingPage } from "../landing-types";
import { entry } from "../sample-cv";

// Amelia, Westbrook University, and Harlow & Pike Consulting are fictional.
export const harvardCvTemplate: LandingPage = {
  slug: "harvard-cv-template",
  kicker: "Free template · Harvard style",
  h1: "Harvard resume template (Harvard-style CV)",
  intro: "The Harvard resume format is a plain, one-page layout: education first, a serif typeface, bold headings over thin rules, and dates on the right. This free Harvard resume template follows that style, with a complete worked example you can edit online or download as a Word file.",
  note: "Folio is not affiliated with Harvard University. \"Harvard-style\" describes a widely used format, not an official university template.",
  points: ["One page, education first", "Full worked example", "Word download included", "Free, no sign-up"],
  sections: [
    {
      id: "what-is-harvard-format", heading: "What makes a resume \"Harvard style\"",
      paragraphs: [
        "The name comes from the resume guidance Harvard's career services office gives its students, which many other universities and employers have since copied. There is no single official file. What people mean by a Harvard resume template is a set of habits that make a page easy to scan in a few seconds.",
        "Those habits are simple: one page and one column, a traditional serif font at a readable size, section headings in bold or small capitals with a thin rule beneath, the organisation and city on the left, dates aligned on the right, and bullet points that open with an action verb and never use I or my. There's no photo, no graphics, and no skill-level bars.",
      ],
      table: {
        caption: "The Harvard resume format, section by section",
        head: ["Section", "What goes in it"],
        rows: [
          ["Education", "Degree, institution, city, and graduation month and year; GPA or classification if it helps; honours, thesis, and relevant courses"],
          ["Experience", "Jobs and internships, most recent first, each with two to five bullets that end in a result"],
          ["Leadership & Activities", "Societies, sports, volunteering, and positions of responsibility, with what you were trusted to do"],
          ["Skills & Interests", "Languages, technical tools, lab methods, and two or three genuine interests"],
        ],
      },
    },
    {
      id: "education-first", heading: "Why education comes first, and when to move it",
      paragraphs: [
        "Students and recent graduates lead with education because it's their most recent and most relevant achievement, and because recruiters for graduate programmes, consulting, and finance often screen on degree and grades first. If you haven't finished, give the expected graduation date, and include a GPA or degree classification only when it strengthens your application.",
        "After two or three years of full-time work, move Experience above Education and cut each degree to a single line. The page stays Harvard-style; only the order changes, because your work now carries more weight than your coursework.",
      ],
    },
    {
      id: "writing-bullets", heading: "Writing Harvard-style bullet points",
      paragraphs: ["Each bullet should say what you did, how you did it, and what changed, in no more than two lines. Use the past tense for finished roles and the present tense for the one you're in. Cut any bullet that only lists a duty; if nothing changed because of you, the line probably isn't earning its space."],
      example: { label: "Before and after (fictional)", text: "Before: Responsible for social media for the investment club.\n\nAfter: Grew the investment club's LinkedIn following from 300 to 1,100 in a year by publishing weekly market notes written by first-year members." },
    },
  ],
  example: {
    heading: "Worked example: a one-page Harvard-style resume",
    paragraphs: ["Amelia is graduating with an economics degree and applying for analyst roles in consulting and finance. Her resume fits on one page with a little room to spare, which leaves space to tailor a line or two for each application."],
    cv: {
      id: "harvard", template: "classic",
      person: { name: "Amelia Hart", headline: "Economics graduate · analyst roles", location: "Boston, MA", phone: "(617) 555-0167", email: "amelia.hart@example.com" },
      summary: "",
      sectionOrder: ["education", "experience", "additional", "skills", "summary", "projects", "languages", "certifications"],
      education: [
        entry("B.A. in Economics, minor in Statistics", "Westbrook University, Boston, MA", "May 2026", [
          "GPA 3.7/4.0; Dean's List for six semesters",
          "Senior thesis: Remote Work and Commercial Rents in Mid-Sized US Cities",
          "Relevant courses: Econometrics, Corporate Finance, Data Analysis in R",
        ]),
      ],
      experience: [
        entry("Summer Analyst", "Harlow & Pike Consulting, Boston, MA", "Jun – Aug 2025", [
          "Built an Excel cost model comparing three warehouse sites for a retail client, which chose the recommended location",
          "Interviewed 14 store managers and summarized the findings in slides used at the final client presentation",
          "Cleaned and merged five years of sales data (1.2 million rows) in R for the project team",
        ]),
        entry("Research Assistant", "Westbrook University, Department of Economics", "Sep 2024 – May 2026", [
          "Collect and code commercial lease data for a faculty study of office demand",
          "Wrote R scripts that cut the data-cleaning step from two days to three hours",
        ]),
        entry("Peer Tutor, Introductory Economics", "Westbrook University Learning Center", "Jan 2024 – May 2025", ["Tutored about 25 first-year students a semester in weekly small-group sessions"]),
      ],
      additional: { title: "Leadership & Activities", text: "Treasurer, Westbrook Investment Club (2024–2026): managed a $25,000 student-run portfolio and reported returns monthly\nCaptain, novice rowing squad (2023–2024): organized training for 18 rowers" },
      skills: "Technical: Excel (financial modeling), R, SQL, Tableau, PowerPoint\nLanguages: Spanish (professional working proficiency)\nInterests: long-distance rowing, urban history podcasts, cooking for large groups",
    },
    notes: [
      { heading: "No summary at the top", text: "Harvard-style resumes for students usually skip the profile. The education entry, with degree, grades, and thesis, does that job in less space. Experienced applicants can add a two-line summary if the employer expects one." },
      { heading: "Every bullet ends in a result", text: "The client chose the site, the slides were used, the data step got faster. Even a short role earns its line when it shows an outcome." },
      { heading: "Activities with real responsibility", text: "Treasurer of a $25,000 portfolio says more than a list of club memberships. Pick two or three activities and say what you were trusted with." },
    ],
  },
  after: [
    {
      id: "uk-and-pakistan", heading: "Harvard CV template for the UK and Pakistan",
      paragraphs: [
        "In the UK, a Harvard CV template means the same clean format on A4. Replace the GPA with your degree classification, such as a 2:1 or a First, put A levels on one line under the degree, and use British spelling. Many UK graduate schemes accept two pages, but a one-page Harvard-style CV is still a strong choice for banking, consulting, and law.",
        "Students in Pakistan often look for a CV format Harvard style for internships and multinational employers. Keep the same structure, give your CGPA out of 4.0, list Intermediate (FSc, FA, ICS, or I.Com) and Matric results briefly under the degree, and leave out personal details such as your father's name or CNIC number unless the employer asks for them.",
      ],
    },
    {
      id: "harvard-or-academic", heading: "Harvard resume or academic CV?",
      paragraphs: ["A Harvard-style resume is a one-page case for one job. An academic CV is a complete record for research and teaching posts, listing publications, conference talks, grants, and referees, with no page limit. For a PhD place, a postdoc, or a lectureship, use the [Academic CV template](/templates/academic/) instead; for almost everything else, the one-page format here fits better."],
    },
    {
      id: "edit-online-or-word", heading: "Edit it online or in Word",
      paragraphs: [
        "Open the example in the free CV maker to edit it in your browser with a live preview, then download a PDF. It's shown in the [Classic template](/templates/classic/), a centred serif layout that matches the Harvard look, and you can try Professional or Regent with the same content in one click.",
        "Prefer Microsoft Word? The download gives you the same resume as an editable .docx in Cambria, a serif font, with right-aligned dates and real bullet lists. That makes it a ready-made Harvard CV template for Word. It's set on A4; choose Layout, then Size, then Letter in Word for US applications.",
      ],
    },
  ],
  download: { label: "Download the Harvard template (.docx)", note: "Editable in Microsoft Word, Google Docs, and LibreOffice. A4 by default; in Word choose Layout, then Size, then Letter for US applications." },
  faqs: [
    { question: "Is this the official Harvard resume template?", answer: "No. Folio isn't affiliated with Harvard University. This is a Harvard-style template that follows the widely shared conventions of the format: one page, education first, a serif font, and action-led bullets." },
    { question: "What font does a Harvard resume use?", answer: "A traditional serif such as Times New Roman, Garamond, or Cambria, at 10.5 to 12 points. The Word download uses Cambria; select all the text to switch it to Times New Roman in one step." },
    { question: "Should a Harvard-style resume have a summary?", answer: "Usually not for students and graduates, because education leads the page. Experienced candidates sometimes add a two-line summary; keep it short so everything still fits on one page." },
    { question: "Can a Harvard resume be two pages?", answer: "The format is built for one page, and most US employers expect one page from graduates. A second page makes sense only with long experience, and by then a professional template may suit you better." },
    { question: "Is the Harvard CV template ATS-friendly?", answer: "Yes. It's a single column of real text with standard headings, which applicant tracking systems read easily. Keep it that way by not adding tables, text boxes, or a photo." },
  ],
  related: [
    { href: "/templates/academic/", label: "Academic CV template" },
    { href: "/templates/classic/", label: "Classic CV template" },
    { href: "/google-docs-cv-template/", label: "Google Docs resume template" },
    { href: "/cv-template-word/", label: "UK CV template for Word" },
    { href: "/tips/us-resume-format/", label: "US resume format guide" },
  ],
};
