import type { Guide } from "./guide-types";
import { countryGuides } from "./guides-country";
import { applicationGuides } from "./guides-applications";
import { plainText } from "./rich-text";
export type { Guide, GuideSection } from "./guide-types";

const coreGuides: Guide[] = [
  {
    slug: "write-a-clear-profile", title: "Write a CV profile that sounds like you",
    seoTitle: "How to Write a CV Profile or Resume Summary",
    description: "Write a clear, honest CV profile with practical tips on structure, relevant strengths, and tailoring your summary to the role.",
    category: "Profile & positioning",
    image: { kind: "example", id: "marketing-executive", alt: "Marketing executive CV example with a short, specific profile under the name and contact details", caption: "A fictional marketing executive CV from our CV examples, in the Creative template." },
    tool: { href: "/resume-summary-builder/", label: "Try the summary builder", text: "Enter a few details and get three editable profile drafts built from your own words." },
    faqs: [
      { question: "Is a CV profile the same as a resume summary?", answer: "Yes. UK CVs usually call it a profile or personal statement; US and Canadian resumes call it a professional summary. A resume objective is a variation that focuses on the role you want, and suits students and career changers." },
      { question: "How long should a CV profile be?", answer: "Two to four sentences, or about 40 to 90 words. If it runs longer, it is probably repeating your experience section." },
      { question: "Should I write my profile in the first person?", answer: "Most CV profiles leave the pronoun out entirely and start with the role or an action, such as “Customer support lead with five years…”. Avoid the third person, which can sound distant on a document you wrote yourself." },
    ],
    intro: "Your profile is a short introduction to the person behind the experience. A few specific, honest sentences help a reader understand what you do, what you bring, and why the opportunity makes sense for you.",
    sections: [
      { id: "what-to-include", heading: "Start with the essentials", paragraphs: [
        "Aim for two to four sentences. Introduce your professional focus, mention relevant experience or education, and highlight strengths that matter for the role. You do not need to fit your entire career into this space.",
        "Choose information that helps someone understand the rest of your CV. A useful opening gives context: the type of work you do, the problems you enjoy solving, or the area you are developing.",
      ] },
      { id: "be-specific", heading: "Replace broad claims with useful details", paragraphs: [
        "Phrases such as hardworking, passionate, and results-driven tell a reader very little on their own. Use that space for a concrete capability or a kind of work you can support with examples.",
        "If you mention a strength in your profile, make sure the experience or projects below give it some substance. Do not add a skill because it appears in a job description if you cannot discuss or demonstrate it.",
      ], example: "Frontend developer building responsive, accessible interfaces with React and TypeScript. Comfortable working with designers and engineers to turn a product idea into a reliable, maintainable web experience." },
      { id: "tailor-your-profile", heading: "Adapt the emphasis to the opportunity", paragraphs: [
        "Read the job description before you finalize the profile. Identify the responsibilities you have relevant evidence for, then bring those strengths forward. Tailoring means choosing your most useful details, rather than copying the advert.",
        "For an early-career application, relevant coursework, projects, volunteering, or a professional interest can provide context. You do not need to imply years of employment you do not have.",
      ] },
      { id: "profile-by-stage", heading: "Match the profile to where you are now", paragraphs: [
        "An experienced applicant can open with their field and the kind of work they are known for, then name one or two areas of depth. Mentioning years of experience is reasonable when the number is accurate and relevant to the role.",
        "If you are changing careers, connect the two sides. Name the transferable strengths you can evidence, such as planning schedules, explaining technical information, or working with customers, and mention any training or projects in the new field.",
        "Graduates and school leavers can lead with their course or the area they want to work in, followed by a relevant project, placement, or part-time role. A clear direction is more useful than a list of personal qualities.",
      ], example: "Customer support lead moving into UX research. Five years of interviewing customers, documenting recurring problems, and sharing findings with product teams. Recently completed a usability testing course and a small research project for a local charity." },
      { id: "profile-mistakes", heading: "Avoid the most common profile problems", paragraphs: [
        "Writing about yourself in the third person can sound distant on a document you wrote yourself. Most CV profiles leave out the pronoun entirely and start with the role or an action, which also keeps the sentences short.",
        "A profile that only describes the job you want gives the reader little to work with. An objective such as \"seeking a challenging role in a dynamic company\" can usually be replaced with a sentence about the work you do best and the evidence for it.",
        "Length is the other common problem. If the profile runs past four or five lines, it is probably repeating the experience section. Keep the overview here and let the detail sit below.",
      ] },
      { id: "final-profile-check", heading: "Read it aloud before you keep it", paragraphs: [
        "Use language you would be comfortable saying in an interview. Remove repeated adjectives and sentences that could describe almost anyone. Keep the introduction clear enough to understand in one reading.",
      ], bullets: ["Does it explain your professional focus?", "Can you support every statement with a real example?", "Does it fit the role you are applying for?", "Have you removed information repeated word for word below?"] },
    ],
    takeaway: "A good profile sets up the evidence in the rest of your CV. Be specific, keep it brief, and use your own voice.",
  },
  {
    slug: "describe-your-experience", title: "How to describe work experience on your CV",
    seoTitle: "How to Write Work Experience on a CV (With Examples)",
    description: "Present work experience clearly with relevant responsibilities, honest achievements, action-led bullet points, and consistent job details.",
    category: "Experience & achievements",
    image: { kind: "example", id: "project-manager", alt: "Project manager CV example where each role lists achievements as short, action-led bullet points with dates aligned to the right", caption: "A fictional project manager CV from our CV examples, in the Edge template." },
    tool: { href: "/cv-examples/", label: "Browse CV examples", text: "See how experience is written in complete, fictional CVs for real jobs, then edit one for free." },
    intro: "The experience section should help a reader understand the work you did and the contribution you made. A clear description is more useful than an impressive-sounding list of responsibilities.",
    sections: [
      { id: "organize-the-basics", heading: "Make each role easy to identify", paragraphs: [
        "Start with your most recent role and work backwards. Include the job title, organization, and dates. Use the same date format throughout the CV, and make it clear when a role is current.",
        "Give recent, relevant experience the most space. Older roles can be shorter when they add context without contributing much evidence for the opportunity. Keep titles accurate rather than changing them to sound more senior.",
      ] },
      { id: "write-useful-bullets", heading: "Write points that explain a contribution", paragraphs: [
        "Start each point with a direct action: built, organized, supported, designed, maintained, or improved. Explain the work, then add the context or outcome that makes it useful.",
        "Avoid putting several unrelated activities into one long sentence. A small set of focused bullets is easier to scan than a dense paragraph. Use the description field in Folio to write one point on each line.",
      ], example: "Built a responsive customer dashboard with reusable interface components. Worked with the support team to clarify common user questions and make account information easier to find." },
      { id: "use-evidence", heading: "Add outcomes you can stand behind", paragraphs: [
        "Numbers can help explain scale or progress, but only use figures you know are accurate. If a result was shared across a team, describe your own part in it.",
        "You can still write a specific achievement without a percentage. A completed release, a clearer workflow, a tool people used, or a difficult issue you resolved can all demonstrate useful work. Keep confidential business or customer details out of the document.",
      ] },
      { id: "how-much-per-role", heading: "Decide how much to write for each role", paragraphs: [
        "Three to six points is a practical range for a recent, relevant role. Earlier positions may need only one or two points, or a single line with the title, organization, and dates. The space should follow relevance, not the length of time you spent there.",
        "If one role covered very different responsibilities, group the points by theme or keep the strongest examples. A reader rarely needs every task you performed; they need enough to understand the level and type of work you did.",
      ] },
      { id: "gaps-and-freelance", heading: "Handle gaps, contracts, and freelance work plainly", paragraphs: [
        "A gap between roles does not need a long explanation on the CV. If it helps, add a brief, honest line such as career break, caring responsibilities, travel, or study, and include anything relevant you did during that time.",
        "Short contracts and freelance work can be grouped under one heading with the overall dates, followed by a few points about notable projects. Only name clients you have permission to mention, and describe the work itself when you cannot.",
      ], example: "Freelance web developer, 2022–2024. Built and maintained websites for small local businesses, including booking pages, menu and content updates, and basic search optimization." },
      { id: "keep-experience-relevant", heading: "Connect the experience to the role", paragraphs: [
        "Read your points against the job description. Bring the most relevant examples nearer the top, and remove statements that repeat the same idea. The aim is to make your evidence easy to find.",
      ], bullets: ["Check that dates and organization names are correct.", "Use present tense for ongoing responsibilities and past tense for completed work.", "Explain unfamiliar internal terms in ordinary language.", "Keep every claim consistent with what you can discuss in an interview."] },
    ],
    takeaway: "Describe what you did, why it mattered, and what you contributed. Accuracy and context make experience convincing.",
  },
  {
    slug: "your-first-cv", title: "Build your first CV, even without work experience",
    seoTitle: "How to Write a CV With No Experience",
    description: "Create your first CV using education, projects, skills, volunteering, and part-time work. Practical guidance for students and graduates.",
    category: "Students & first applications",
    image: { kind: "example", id: "student", alt: "Student CV example with education first, followed by projects, a part-time job, and volunteering", caption: "A fictional student CV from our CV examples, in the Student template." },
    tool: { href: "/cv-maker-for-students/", label: "Open the student CV maker", text: "Start with an education-first layout made for students, school leavers, and graduates." },
    faqs: [
      { question: "What do I put on a CV if I have no experience?", answer: "Lead with education, then add projects, volunteering, part-time or casual work, and activities such as clubs or societies. Each one can show skills an employer wants, such as reliability, teamwork, or organisation." },
      { question: "Should a student CV be one page?", answer: "One page is usually enough for a student or school leaver. Two pages is fine once you have several relevant projects or roles, but never stretch the content to fill space." },
      { question: "Is a resume objective useful with no experience?", answer: "Yes. A short objective that names the role you want and what you bring can help when you have little work history. Try the [resume objective generator](/resume-objective-generator/) for a first draft." },
    ],
    intro: "A first CV is not an empty version of an experienced person's document. It is a clear account of what you know, what you have tried, and the experience you can bring to a first opportunity.",
    sections: [
      { id: "sections-to-include", heading: "Know which sections a first CV needs", paragraphs: [
        "A first CV usually needs contact details, a short profile, education, and skills. Projects, volunteering, part-time work, achievements, and languages can follow when you have something relevant to add. Leave out any section you would only fill with placeholder text.",
        "You do not need to include your date of birth, marital status, or full home address. A town or city is usually enough for your location. Expectations differ between countries, so check the application guidance if you are unsure what an employer wants.",
      ], bullets: ["Contact details: name, email, phone number, and town or city", "Profile: two or three sentences about your direction", "Education: qualification, institution, dates, and relevant results", "Skills, projects, and experience you can talk about in an interview"] },
      { id: "start-with-education", heading: "Start with your strongest relevant evidence", paragraphs: [
        "Education may be your most useful starting point. Include the qualification, institution, and dates. If you are still studying, make that clear rather than presenting an unfinished course as a completed qualification.",
        "Relevant coursework or a substantial academic project can help explain what you learned. Choose details that relate to the role. There is no need to list every module or every school subject.",
      ] },
      { id: "include-projects", heading: "Give projects and volunteering real space", paragraphs: [
        "A project can demonstrate how you approach a problem and what you can produce. Explain the purpose, your own contribution, and the tools or methods you used. A small, finished project can be easier to discuss than an ambitious idea that never became something usable.",
        "Volunteering, society roles, caring responsibilities, and part-time work may also demonstrate useful skills. Describe the experience respectfully and focus on the activities that matter for your application.",
      ], example: "Created a searchable directory for a local volunteer group. Organized the information, built a responsive interface, and tested keyboard navigation with a small group of users." },
      { id: "choose-honest-skills", heading: "List skills you can explain or demonstrate", paragraphs: [
        "Choose a short set of relevant skills. A reader should be able to connect them with your studies, projects, or other experience. Avoid long lists of tools you have only briefly encountered.",
        "Do not invent employment, client work, qualifications, or certifications to make the document look fuller. If a course is in progress, label it that way. A clear first CV gives you a truthful starting point for a conversation.",
      ] },
      { id: "first-profile", heading: "Write a short profile without a job history", paragraphs: [
        "Your profile can focus on what you are studying, what you want to do next, and one piece of evidence that shows your interest. It is fine to say clearly that you are looking for a first role, a placement, or an apprenticeship.",
        "Avoid filling the space with qualities every applicant claims. One concrete detail, such as a project you finished or a responsibility you held, tells the reader more than several adjectives.",
      ], example: "Business studies student looking for a part-time retail or customer service role. Experienced in handling payments and helping visitors through weekend volunteering at a community café, and comfortable working as part of a busy team." },
      { id: "arrange-your-first-cv", heading: "Make the order work for your story", paragraphs: [
        "Try placing education and projects before work experience when they are more relevant. The Student template gives you clear section bands, and you can reorder the sections in the editor. Hide sections that do not add anything useful.",
      ], bullets: ["Use an email address you check regularly.", "Add a short profile focused on the opportunity.", "Include portfolio or project links only when they work.", "Download the PDF and read every page before applying."] },
    ],
    takeaway: "You do not need to make your experience sound bigger. Show the real things you have learned, done, and contributed.",
  },
  {
    slug: "choose-your-template", title: "How to choose a CV template that fits the role",
    seoTitle: "How to Choose a Professional CV Template",
    description: "Compare traditional, modern, minimal, creative, and student CV layouts. Choose a template that makes your experience clear and easy to follow.",
    category: "Templates & presentation",
    image: { kind: "template", id: "summit", alt: "Summit CV template with a full-width colour header above a tinted side column for contact details, education, and skills", caption: "Summit template, fictional sample content. One of 40 free layouts in the editor." },
    tool: { href: "/templates/", label: "Compare all templates", text: "Preview every free template at full size and switch between them without retyping." },
    intro: "A good CV template supports the information on the page. Start with readability and the application requirements, then choose a visual style you feel comfortable sending.",
    sections: [
      { id: "start-with-the-role", heading: "Read the application instructions first", paragraphs: [
        "Some employers specify a file type, length, or format. Follow those instructions before choosing a design. If a portal requests a plain document or a particular template, use the requested format.",
        "Folio exports selectable-text PDFs. If you need DOCX output for a specific application, keep an editable original in your word processor. Importing DOCX into Folio does not change the PDF format of the download.",
      ] },
      { id: "compare-the-layouts", heading: "Compare a few clearly different layouts", paragraphs: [
        "Classic uses serif typography, a centered name, thin rules, and italic roles. Professional pairs a formal serif body with left-aligned section headings and restrained navy accents. Both keep a familiar single-column reading order.",
        "Modern puts experience and projects beside supporting information. Minimal uses quiet labels in a left rail. Creative adds numbered editorial headings and warm accents, while Student uses clear academic section bands.",
      ] },
      { id: "how-it-will-be-read", heading: "Consider how the CV will be read", paragraphs: [
        "Many applications pass through an online portal or applicant tracking system before a person reads them. A single-column layout with standard headings gives the clearest reading order. Two-column designs are easy for people to scan, but some systems may read the columns in an unexpected order.",
        "If you are uploading to a portal, a plain layout such as Clarity or Linear is a cautious choice. If you are emailing a CV directly to a person or bringing it to an interview, a more designed template can work well. No template can guarantee how a particular system will handle the file.",
      ] },
      { id: "photo-or-not", heading: "Decide whether to include a photo", paragraphs: [
        "Expectations about photos vary by country and industry. CVs in the UK, Ireland, the United States, and Canada usually leave the photo out, partly to reduce the risk of bias in hiring. In parts of continental Europe, the Middle East, and Asia, a professional photo is more common.",
        "If you are unsure, follow the job advert, the employer's guidance, or what is usual where the job is based. In Folio's photo templates the photo is optional, so you can preview the layout both ways before deciding.",
      ] },
      { id: "preview-real-content", heading: "Use your actual information to decide", paragraphs: [
        "A sample preview gives you a sense of the style. Your own experience determines how the finished document reads. Put your information into the editor, switch between a few templates, and review the page breaks.",
        "Check long job titles, contact details, and any detailed project descriptions. Choose the design that helps a reader find the important information without unnecessary effort. Your details stay in place when you switch templates.",
      ] },
      { id: "keep-design-consistent", heading: "Let the layout do its job", paragraphs: [
        "Consistency matters more than decoration. Use a stable date format, clear section order, and concise descriptions. A more expressive template still needs accurate, relevant information.",
      ], bullets: ["Keep the name and contact details easy to find.", "Check every preview page.", "Hide empty or unhelpful sections.", "Follow the employer's file-format instructions."] },
    ],
    takeaway: "Choose the template that makes your information easiest to follow. A clear document is more useful than a crowded one.",
  },
  {
    slug: "keep-it-focused", title: "How long should a CV be? Make every line count",
    seoTitle: "How Long Should a CV or Resume Be? Keep It Relevant",
    description: "Decide what belongs in your CV, choose a useful length, remove repetition, and give relevant experience room to breathe.",
    category: "Structure & clarity",
    image: { kind: "template", id: "compact", alt: "Compact CV template: a dense single-column layout that puts the job title and employer on one line to fit more on a page", caption: "Compact template, fictional sample content." },
    tool: { href: "/editor/", label: "See your page count live", text: "The editor’s live preview shows every page as it will download, so you can trim with confidence." },
    intro: "A useful CV gives the right information enough room. Editing is less about reaching a magic page count and more about helping the reader understand your fit for the opportunity.",
    sections: [
      { id: "choose-a-useful-length", heading: "Use the space your experience needs", paragraphs: [
        "A short CV may be a sensible starting point for an early-career application. More experienced applicants may need additional pages to present substantial relevant work. Academic and specialist applications may have different expectations.",
        "Check the employer's instructions. Do not shrink the type or remove necessary context simply to force everything onto a single page. Folio lets your content flow across as many A4 pages as it needs.",
      ] },
      { id: "usual-lengths", heading: "Know the usual lengths", paragraphs: [
        "In the UK and much of Europe, two A4 pages is a common length for an experienced applicant, while one page often suits students, recent graduates, and people with a few years of experience. In the United States, a one-page résumé is common for early-career roles.",
        "Academic, medical, and research CVs are often much longer because they list publications, teaching, grants, and presentations. Senior applicants with long, relevant careers can justify more space too. Treat these as starting points rather than rules.",
      ] },
      { id: "prioritize-relevance", heading: "Give relevant information priority", paragraphs: [
        "Identify the responsibilities and skills that matter for the role. Make your strongest evidence easy to find in the profile, recent experience, projects, and skills sections.",
        "Older or less relevant roles can take fewer lines. You can keep an accurate record of your career without giving every position the same amount of space. A tailored version may be shorter than your full working draft.",
      ] },
      { id: "remove-repetition", heading: "Cut repeated ideas before useful evidence", paragraphs: [
        "Look for several points describing the same strength. Keep the clearest example, then use the space for another useful detail. Remove introductory phrases that do not change the meaning.",
        "Use direct sentences and ordinary words. Replace a long explanation of a routine task with a short description of the work and its context. Keep technical terms when they help the reader understand relevant experience.",
      ], example: "Instead of a long list of repeated collaboration statements, describe one specific piece of work you completed with another team and explain your own contribution." },
      { id: "what-to-cut-first", heading: "Know what to cut first", paragraphs: [
        "When a CV feels too long, start with the details that add the least evidence: duties anyone in the role would have, very old positions, school grades once you have a degree, and generic skills such as word processing or teamwork listed without any context.",
        "You can also remove the line \"References available on request\" and personal details the employer does not need. If the content is right but the page still feels crowded, try a denser layout such as Compact before reducing the text size.",
      ] },
      { id: "review-the-page", heading: "Review the document as a reader", paragraphs: [
        "Step back from the form and read the PDF preview. Notice where your attention goes first, whether headings are clear, and whether any paragraph feels much denser than the rest.",
      ], bullets: ["Keep formatting and dates consistent.", "Remove sections that do not help the application.", "Give recent, relevant work more space.", "Check the final downloaded PDF, not only the editing form."] },
    ],
    takeaway: "Keep the length that serves your application. Remove repetition and leave room for clear, relevant evidence.",
  },
  {
    slug: "before-you-send", title: "CV checklist: one last look before you send",
    seoTitle: "CV Checklist — What to Check Before Applying",
    description: "Use this final CV checklist to review contact details, dates, spelling, links, page breaks, and the PDF you send to an employer.",
    category: "Final checks & applications",
    image: { kind: "example", id: "nurse", alt: "Nurse CV example with registration details in the profile and certifications listed with their dates", caption: "A fictional nurse CV from our CV examples, in the Professional template." },
    tool: { href: "/resume-keyword-checker/", label: "Compare your CV with the advert", text: "Before you send, check which terms from the job description your CV already covers." },
    intro: "A short, deliberate review helps you catch the details that are easy to miss while writing. Give the finished document a fresh read before you attach it to an application.",
    sections: [
      { id: "check-your-details", heading: "Make sure someone can reach you", paragraphs: [
        "Read your name, email address, phone number, and location carefully. Use an email address you check regularly. If you include a portfolio, professional profile, or project link, open it and confirm that it leads to the page you intended.",
        "Check whether a shared link requires permission or a sign-in that the recipient might not have. A clear, accessible public portfolio is more useful than a link the reader cannot open.",
      ] },
      { id: "check-the-facts", heading: "Review dates, titles, and claims", paragraphs: [
        "Compare job titles, organization names, dates, and qualifications with your records. Make sure ongoing work and completed work are described accurately. Check that the profile is consistent with the evidence below it.",
        "If you imported a PDF or DOCX, compare every field with the extracted text. Unusual headings, tables, and multi-column layouts can require corrections. Missing information is left blank rather than guessed.",
      ] },
      { id: "check-the-pdf", heading: "Open the actual file you plan to send", paragraphs: [
        "Look through every preview page, then download the PDF and open that file. Check that the text is readable, the sections appear in the right order, and nothing important has been left out.",
        "If the employer requests a particular format or filename, follow those instructions. Otherwise, a clear filename containing your name and CV makes the document easy to identify. Folio does not add a watermark to the export.",
      ] },
      { id: "tailor-this-application", heading: "Tailor the CV to this application", paragraphs: [
        "Read the job advert again and compare it with your CV. Check that the profile reflects the type of role, that your most relevant experience appears near the top, and that the skills section uses the advert's terms where they accurately describe you.",
        "Keep a general version of your CV as a starting point and save tailored copies with clear names. If an employer invites you to an interview, you can then see exactly which version they read.",
      ] },
      { id: "send-it-properly", heading: "Send it the way the employer asks", paragraphs: [
        "If you are applying by email, write a short message that names the role, says where you saw it, and mentions that your CV is attached. Use a clear subject line, attach the file, and check that the attachment opens before you send.",
        "If the employer asks for a cover letter, portfolio, or answers to specific questions, include them. A complete application is easier to review than a strong CV with missing pieces.",
      ], example: "Subject: Application for Junior Designer – Alex Morgan. Please find my CV attached for the Junior Designer role advertised on your website. I would welcome the chance to discuss how my studio projects relate to the position." },
      { id: "save-your-version", heading: "Keep a copy of the version you send", paragraphs: [
        "Save a separate PDF for the application so you know what the employer received. If you want to edit later, save a browser draft or download a portable draft before closing the tab.",
      ], bullets: ["Read the document aloud for awkward wording.", "Check spelling, punctuation, and consistent dates.", "Confirm all included links work.", "Review every PDF page and the application instructions."] },
    ],
    takeaway: "Check the details, open the downloaded file, and keep the version you send. A careful final review is part of a professional application.",
  },
];
/** Every word a reader sees in the guide body, without link markup. */
export function guideText(guide: Guide): string {
  return plainText([guide.intro, ...guide.sections.flatMap(section => [...section.paragraphs, ...(section.bullets || []), section.example || "", ...(section.subsections || []).flatMap(sub => [sub.heading, ...sub.paragraphs, ...(sub.bullets || [])]), ...(section.table ? section.table.rows.flat() : [])]), ...(guide.faqs || []).flatMap(faq => [faq.question, faq.answer]), guide.takeaway].join(" "));
}
const guides = [...coreGuides, ...applicationGuides, ...countryGuides];
export const tips = guides.map(guide => {
  const words = guideText(guide).split(/\s+/).filter(Boolean).length;
  return { ...guide, words, readTime: Math.max(2, Math.ceil(words / 200)) };
});
export type Tip = typeof tips[number];

/** How the guide index is organised. Every guide appears in exactly one group. */
export const guideGroups = [
  { id: "writing", heading: "Writing your CV", text: "Profiles, experience, length, and your first CV.", slugs: ["write-a-clear-profile", "describe-your-experience", "your-first-cv", "keep-it-focused", "choose-your-template"] },
  { id: "applying", heading: "Cover letters, ATS, and sending", text: "Everything between a finished CV and a sent application.", slugs: ["how-to-write-a-cover-letter", "ats-friendly-cv", "common-cv-mistakes", "before-you-send"] },
  { id: "countries", heading: "CVs and resumes by country", text: "Local conventions for the UK, US, Canada, and Australia.", slugs: ["resume-vs-cv", "uk-cv-format", "us-resume-format", "canadian-resume-format", "australian-resume-format"] },
] as const;

/** Related reading: the same index group first, then the rest. */
export function relatedGuides(slug: string, count = 3): Tip[] {
  const group = guideGroups.find(item => (item.slugs as readonly string[]).includes(slug));
  const same = tips.filter(tip => tip.slug !== slug && (group?.slugs as readonly string[] | undefined)?.includes(tip.slug));
  return [...same, ...tips.filter(tip => tip.slug !== slug && !same.includes(tip))].slice(0, count);
}
