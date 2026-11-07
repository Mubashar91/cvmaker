export interface GuideSection {
  id: string; heading: string; paragraphs: string[]; bullets?: string[]; example?: string;
}
export interface Guide {
  slug: string; title: string; seoTitle: string; description: string; category: string;
  intro: string; sections: GuideSection[]; takeaway: string;
}
const guides: Guide[] = [
  {
    slug: "write-a-clear-profile", title: "Write a CV profile that sounds like you",
    seoTitle: "How to Write a CV Profile — Tips & Examples",
    description: "Write a clear, honest CV profile with practical tips on structure, relevant strengths, and tailoring your summary to the role.",
    category: "Profile & positioning",
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
      { id: "final-profile-check", heading: "Read it aloud before you keep it", paragraphs: [
        "Use language you would be comfortable saying in an interview. Remove repeated adjectives and sentences that could describe almost anyone. Keep the introduction clear enough to understand in one reading.",
      ], bullets: ["Does it explain your professional focus?", "Can you support every statement with a real example?", "Does it fit the role you are applying for?", "Have you removed information repeated word for word below?"] },
    ],
    takeaway: "A good profile sets up the evidence in the rest of your CV. Be specific, keep it brief, and use your own voice.",
  },
  {
    slug: "describe-your-experience", title: "Show the work that matters",
    seoTitle: "How to Describe Work Experience on a CV",
    description: "Present work experience clearly with relevant responsibilities, honest achievements, action-led bullet points, and consistent job details.",
    category: "Experience & achievements",
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
      { id: "keep-experience-relevant", heading: "Connect the experience to the role", paragraphs: [
        "Read your points against the job description. Bring the most relevant examples nearer the top, and remove statements that repeat the same idea. The aim is to make your evidence easy to find.",
      ], bullets: ["Check that dates and organization names are correct.", "Use present tense for ongoing responsibilities and past tense for completed work.", "Explain unfamiliar internal terms in ordinary language.", "Keep every claim consistent with what you can discuss in an interview."] },
    ],
    takeaway: "Describe what you did, why it mattered, and what you contributed. Accuracy and context make experience convincing.",
  },
  {
    slug: "your-first-cv", title: "Build your first CV, even without work experience",
    seoTitle: "How to Make Your First CV With No Experience",
    description: "Create your first CV using education, projects, skills, volunteering, and part-time work. Practical guidance for students and graduates.",
    category: "Students & first applications",
    intro: "A first CV is not an empty version of an experienced person's document. It is a clear account of what you know, what you have tried, and the experience you can bring to a first opportunity.",
    sections: [
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
      { id: "arrange-your-first-cv", heading: "Make the order work for your story", paragraphs: [
        "Try placing education and projects before work experience when they are more relevant. The Student template gives you clear section bands, and you can reorder the sections in the editor. Hide sections that do not add anything useful.",
      ], bullets: ["Use an email address you check regularly.", "Add a short profile focused on the opportunity.", "Include portfolio or project links only when they work.", "Download the PDF and read every page before applying."] },
    ],
    takeaway: "You do not need to make your experience sound bigger. Show the real things you have learned, done, and contributed.",
  },
  {
    slug: "choose-your-template", title: "Find the right first impression",
    seoTitle: "How to Choose a Professional CV Template",
    description: "Compare traditional, modern, minimal, creative, and student CV layouts. Choose a template that makes your experience clear and easy to follow.",
    category: "Templates & presentation",
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
    slug: "keep-it-focused", title: "Make every line earn its place",
    seoTitle: "How Long Should a CV Be? Keep It Relevant",
    description: "Decide what belongs in your CV, choose a useful length, remove repetition, and give relevant experience room to breathe.",
    category: "Structure & clarity",
    intro: "A useful CV gives the right information enough room. Editing is less about reaching a magic page count and more about helping the reader understand your fit for the opportunity.",
    sections: [
      { id: "choose-a-useful-length", heading: "Use the space your experience needs", paragraphs: [
        "A short CV may be a sensible starting point for an early-career application. More experienced applicants may need additional pages to present substantial relevant work. Academic and specialist applications may have different expectations.",
        "Check the employer's instructions. Do not shrink the type or remove necessary context simply to force everything onto a single page. Folio lets your content flow across as many A4 pages as it needs.",
      ] },
      { id: "prioritize-relevance", heading: "Give relevant information priority", paragraphs: [
        "Identify the responsibilities and skills that matter for the role. Make your strongest evidence easy to find in the profile, recent experience, projects, and skills sections.",
        "Older or less relevant roles can take fewer lines. You can keep an accurate record of your career without giving every position the same amount of space. A tailored version may be shorter than your full working draft.",
      ] },
      { id: "remove-repetition", heading: "Cut repeated ideas before useful evidence", paragraphs: [
        "Look for several points describing the same strength. Keep the clearest example, then use the space for another useful detail. Remove introductory phrases that do not change the meaning.",
        "Use direct sentences and ordinary words. Replace a long explanation of a routine task with a short description of the work and its context. Keep technical terms when they help the reader understand relevant experience.",
      ], example: "Instead of a long list of repeated collaboration statements, describe one specific piece of work you completed with another team and explain your own contribution." },
      { id: "review-the-page", heading: "Review the document as a reader", paragraphs: [
        "Step back from the form and read the PDF preview. Notice where your attention goes first, whether headings are clear, and whether any paragraph feels much denser than the rest.",
      ], bullets: ["Keep formatting and dates consistent.", "Remove sections that do not help the application.", "Give recent, relevant work more space.", "Check the final downloaded PDF, not only the editing form."] },
    ],
    takeaway: "Keep the length that serves your application. Remove repetition and leave room for clear, relevant evidence.",
  },
  {
    slug: "before-you-send", title: "One last look before you send",
    seoTitle: "CV Checklist — What to Check Before Applying",
    description: "Use this final CV checklist to review contact details, dates, spelling, links, page breaks, and the PDF you send to an employer.",
    category: "Final checks & applications",
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
      { id: "save-your-version", heading: "Keep a copy of the version you send", paragraphs: [
        "Save a separate PDF for the application so you know what the employer received. If you want to edit later, save a browser draft or download a portable draft before closing the tab.",
      ], bullets: ["Read the document aloud for awkward wording.", "Check spelling, punctuation, and consistent dates.", "Confirm all included links work.", "Review every PDF page and the application instructions."] },
    ],
    takeaway: "Check the details, open the downloaded file, and keep the version you send. A careful final review is part of a professional application.",
  },
];
export const tips = guides.map(guide => ({
  ...guide,
  readTime: Math.max(2, Math.ceil([guide.intro, ...guide.sections.flatMap(section => [...section.paragraphs, ...(section.bullets || []), section.example || ""]), guide.takeaway].join(" ").split(/\s+/).length / 200)),
  paragraphs: guide.sections.flatMap(section => section.paragraphs),
}));
