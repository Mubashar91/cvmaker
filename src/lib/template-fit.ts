import type { Template } from "./model";
import type { FAQ } from "@/components/faq-list";

/**
 * Hand-written per template: jobs the layout suits (with a reason), an honest verdict on how
 * applicant tracking systems handle it, and one extra question. Like template-content.ts, every
 * entry is written for its own layout; don't generate these from template attributes.
 */
/** ats is omitted where the page already answers it at length (Clarity). */
export interface TemplateFit { jobs: [string, string][]; ats?: string; faq: FAQ }

export const templateFit: Record<Template, TemplateFit> = {
  classic: {
    jobs: [
      ["Legal secretary or paralegal", "Law firms expect a sober page, and bold firm names show where you trained at a glance."],
      ["Civil service officer", "Centred headings and right-aligned dates match the formal tone of public-sector applications."],
      ["Bank branch adviser", "Traditional banks favour understated documents that print cleanly in black and white."],
      ["School business manager", "Employer-first entries make the schools and trusts you've worked for easy to spot."],
    ],
    ats: "Classic gives a parser nothing to trip over: one column, conventional section names, and a centred name and contact line that are ordinary text rather than an image. The one habit to check is its employer-first order. If a portal pre-fills fields from your upload, confirm the job titles came from the italic line beneath each employer.",
    faq: { question: "Can I switch Classic to a sans-serif font?", answer: "Yes. The typeface setting in the editor changes the body text to sans-serif while keeping the centred layout and fine rules. Serif suits law, finance, and the civil service; sans-serif reads a little more modern on screen." },
  },
  modern: {
    jobs: [
      ["Operations coordinator", "The main column carries process improvements while systems and certifications sit neatly alongside."],
      ["Digital marketing executive", "Tools and channels fit the side column, leaving campaign results room to breathe."],
      ["IT support analyst", "Certifications such as CompTIA or ITIL stay visible without crowding the ticket and project work."],
      ["Account manager", "A full-width profile frames the client story before the two columns begin."],
    ],
    ats: "Modern's side column is real, selectable text, so nothing is hidden from a parser. What varies is order: some applicant tracking systems read the right-hand column after the main one, others interleave lines. If a large employer's portal is the only route in, keep the most important skills in your profile and experience bullets as well as in the side column.",
    faq: { question: "Does Modern suit a graduate CV?", answer: "It works once you have a placement, internship, or part-time job to fill the main column. If your CV is still short, Modern switches to the full page width automatically, so it never looks half-empty." },
  },
  sidebar: {
    jobs: [
      ["Project coordinator", "The panel lists methodologies and tools, so the main column can focus on delivery results."],
      ["Laboratory technician", "Techniques and safety certifications sit together where a lab manager checks first."],
      ["Recruitment consultant", "Contact details and languages stay visible on every page of a longer client-facing CV."],
      ["Junior architect", "Software skills such as Revit and AutoCAD fill the panel beside a project-led main column."],
    ],
    ats: "The dark panel looks bold, but its contents are plain text that applicant tracking systems can extract. Because the panel comes first visually, some parsers read your skills and education before your name and experience. That rarely causes a rejection, yet for high-volume corporate portals a single-column template is the lower-risk upload, with Sidebar kept for email applications.",
    faq: { question: "Can I put a photo in the Sidebar panel?", answer: "Yes. Add a photo under Personal details and it replaces the initials at the top of the panel. Leave it out for UK and US employers, where photos aren't expected; the initials keep the panel looking finished." },
  },
  executive: {
    jobs: [
      ["Finance director", "A formal header band and accent rules suit board-level applications and executive search firms."],
      ["Head of operations", "Bold job titles make a long progression of leadership roles easy to follow."],
      ["Senior management consultant", "The single column gives each engagement room for scope, team size, and outcome."],
      ["Practice manager", "Accent-coloured employers help a hiring panel see which organisations you've led."],
    ],
    ats: "Executive keeps a classic reading order: header, then one column of sections with standard names. Your name and contact details sit inside the colour band but remain selectable text, so a parser finds them. If you add a photo to the band, systems simply skip it; recruiters in the UK and US usually prefer it left out of senior applications too.",
    faq: { question: "Is Executive too formal for a mid-level role?", answer: "Not if you choose a softer accent colour. The structure is just clear sections and bold titles; it reads as formal mainly because of the dark header band, which a lighter colour softens." },
  },
  atlas: {
    jobs: [
      ["UX designer", "Portfolio links and tools sit in the light panel while case studies lead the main column."],
      ["Physiotherapist", "Registrations and clinical courses stay visible beside a patient-focused experience section."],
      ["Event manager", "Languages and supplier software fit the panel, leaving the left column for event outcomes."],
      ["Customer experience lead", "An optional photo suits markets where one is expected, without dominating the page."],
    ],
    ats: "Atlas places supporting details in a right-hand panel, which most parsers read after the main column. The tint is a background colour behind real text, so it doesn't block extraction. Keep anything an advert lists as essential, such as a licence or a core tool, in a bullet point as well, so it's found whichever way a system orders the columns.",
    faq: { question: "Is the Atlas panel suitable for long skill lists?", answer: "It holds a short, grouped list best. Around three groups of four to six skills keep the panel balanced; longer lists crowd it and lose their at-a-glance value, so move the rest into your experience bullets." },
  },
  timeline: {
    jobs: [
      ["Logistics supervisor", "Hanging dates make steady promotions through warehouse and transport roles obvious."],
      ["Nurse with several placements", "Each ward or trust gets its own marker, so a varied history still reads in order."],
      ["Software engineer with contracts", "Back-to-back contracts line up on the timeline instead of looking fragmented."],
      ["Retail area manager", "Progression from store to area level is visible before anyone reads a bullet."],
    ],
    ats: "The timeline line and markers are drawn decoration; the dates themselves are text in a left gutter. Parsers usually read each date before its entry, which most systems handle well, but a few attach dates more reliably when they follow the job title. If a portal shows blank dates after upload, type them into its form fields rather than switching template.",
    faq: { question: "Can I use Timeline if my career has gaps?", answer: "Yes, and it's honest about them. Add a short entry for a career break, study, or caring role so the line stays continuous and the gap is explained in your own words." },
  },
  duo: {
    jobs: [
      ["Sales executive", "The bold split header gives a confident first impression without crowding the body."],
      ["Hotel front office manager", "An optional photo suits hospitality markets where one is customary."],
      ["Marketing coordinator", "Square section markers add a little brand feel to a clean, readable page."],
      ["Product support specialist", "Contact details sit apart from your name, so they're quick to find and copy."],
    ],
    ats: "Only the header uses colour blocks; everything below runs as a single column, so the body is about as parser-friendly as a plain CV. The two halves of the header are separate text areas, and a system may read your contact details before your name. That's harmless in practice, since parsers recognise email addresses and phone numbers wherever they appear.",
    faq: { question: "Which colours work best for Duo's two tones?", answer: "Choose a deep accent such as navy, green, or burgundy. The lighter half is generated from it automatically, so a dark accent gives the clearest contrast between your name and contact details." },
  },
  professional: {
    jobs: [
      ["Business analyst", "Formal serif text suits corporate clients who read requirements and reports all day."],
      ["Operations manager", "Employer-led entries show stability across well-known organisations."],
      ["Insurance underwriter", "A restrained navy accent matches the conservative tone of financial services."],
      ["Procurement officer", "A clear single column leaves room for savings, suppliers, and contract values."],
    ],
    ats: "Professional reads top to bottom with nothing beside the main text, which is exactly what applicant tracking systems prefer. The navy rule under the header is a drawn line, not a text box, and section titles use names parsers recognise. It's one of the safest designed templates to upload to a corporate portal.",
    faq: { question: "Does Professional work for public-sector applications?", answer: "Yes. Its formal tone suits councils, NHS trusts, and government departments. Many of those employers also use their own application form, so keep the CV's dates and job titles identical to what you enter there." },
  },
  swiss: {
    jobs: [
      ["Architect", "The strict grid and heavy rules echo the discipline of technical drawings."],
      ["Graphic designer in a corporate team", "Typographic confidence shows taste without relying on colour or illustration."],
      ["Mechanical engineer", "Left-column section titles make long technical experience easy to navigate."],
      ["Data scientist", "A labelled contact row keeps GitHub and portfolio links tidy and easy to find."],
    ],
    ats: "Swiss puts section titles in a narrow left column beside the details, but it's still a single reading order: a parser meets each title, then its content. The heavy rules are drawn lines and the coloured full stop is a character, so nothing is lost in extraction. Keep standard section names, because the grid makes unusual ones stand out.",
    faq: { question: "Can Swiss work without its coloured full stop?", answer: "Yes. Choose black or charcoal as the accent and the full stop matches your name, leaving a purely black-and-white grid that prints crisply." },
  },
  minimal: {
    jobs: [
      ["Policy researcher", "Quiet typography lets dense, evidence-based work speak for itself."],
      ["Copy editor", "A neutral palette shows restraint, which is the job itself."],
      ["Accountant in practice", "Left labels make qualifications and client work quick to locate."],
      ["Senior developer", "No decoration means more room for architecture decisions and outcomes."],
    ],
    ats: "With labels on the left and content on the right, Minimal looks like two columns, but each label belongs to the section beside it, so text extracts in the natural order. There are no icons, tables, or photos to interfere. It suits online applications well; just avoid renaming sections to something a parser won't recognise.",
    faq: { question: "Does Minimal suit a first CV?", answer: "It does if you have enough content to fill the open spacing. With very little to list, a template with section bands, such as Student, can make a short CV look more complete." },
  },
  tech: {
    jobs: [
      ["Front-end developer", "Frameworks and languages appear as tags, so a hiring manager matches the stack in seconds."],
      ["DevOps engineer", "Grouped tags such as Cloud, CI/CD, and Monitoring organise a long list of tools."],
      ["Data analyst", "SQL, Python, and BI tools stand out without a separate skills page."],
      ["IT technician", "Certifications and hardware skills read cleanly as compact tags."],
    ],
    ats: "Tech is a single-column layout, and its skill tags are text with a tinted background, not images. Group them with the \"Category: skill, skill\" format so a parser also sees a readable list. Name each technology exactly as the job advert writes it, including versions where it matters, because keyword matching is literal.",
    faq: { question: "How many skill tags should I include in Tech?", answer: "Around 12 to 20 across three or four groups. More than that dilutes the ones that matter; keep the list to tools you could discuss confidently in a technical interview." },
  },
  compact: {
    jobs: [
      ["Senior engineer with ten-plus years", "Dense spacing fits a long career on two pages without dropping key projects."],
      ["Contractor with many short roles", "Title and employer on one line keep a busy history compact."],
      ["Academic moving into industry", "Publications and projects fit without the CV sprawling to four pages."],
      ["Apprentice or school leaver", "A plain, tidy page suits a first application where content is short and practical."],
    ],
    ats: "Compact keeps everything in one plain column with small accent-coloured titles, so applicant tracking systems read it in order. The tighter spacing doesn't affect extraction. The risk is human rather than technical: very dense pages tire a reader, so keep bullets to one or two lines and cut anything that doesn't support the role.",
    faq: { question: "Can I make Compact less dense?", answer: "Yes. Switch the spacing setting in the editor to balanced or relaxed. You keep the same structure with more breathing room, which suits a shorter CV." },
  },
  elegant: {
    jobs: [
      ["Executive assistant", "Refined serif capitals suit senior support roles where presentation matters."],
      ["Wedding or events planner", "A monogram adds a personal touch clients notice."],
      ["Gallery or museum assistant", "Centred titles between fine rules feel at home in arts organisations."],
      ["Private school teacher", "A graceful page suits independent schools with a traditional ethos."],
    ],
    ats: "Elegant's monogram is a circle drawn around your initials as text, and the spaced capitals are ordinary characters, so a parser reads your name correctly. Sections follow one column with entries left-aligned. If you add a photo instead of the monogram, systems ignore it; nothing else in the layout hides text from extraction.",
    faq: { question: "Is Elegant suitable for a corporate application?", answer: "For support, client, and administrative roles, yes: its serif capitals and bronze accent read as polished rather than playful. For finance or law, switch the accent to navy or charcoal for a more restrained finish." },
  },
  portrait: {
    jobs: [
      ["Hotel guest relations agent", "Hospitality employers in many countries expect a friendly photo."],
      ["Real estate agent", "A personal, approachable header suits a job built on client trust."],
      ["Fitness instructor", "The photo and warm layout suit people-facing wellness roles."],
      ["Cabin crew applicant", "Airlines that request a photo get a clear one beside your contact details."],
    ],
    ats: "Applicant tracking systems ignore the photo, so Portrait's large image neither helps nor harms parsing. The dotted leaders are drawn lines and every heading is text in a single column. The real decision is cultural: use Portrait where photos are customary, and choose a template without one for most UK, US, and Canadian employers.",
    faq: { question: "What kind of photo works best in Portrait?", answer: "A recent head-and-shoulders photo with a plain background and good light, cropped so your face fills most of the circle. The editor crops it on your device; nothing is uploaded." },
  },
  creative: {
    jobs: [
      ["Content strategist", "Editorial serif headings signal a writer's ear for tone."],
      ["Brand designer", "Warm accents show taste while keeping the CV readable for recruiters."],
      ["PR account executive", "Numbered sections give a polished, magazine-like flow."],
      ["Bookshop manager", "Personality without clutter suits independent retail."],
    ],
    ats: "Creative looks expressive, but structurally it's a single column with italic section headings that are ordinary text. Section numbers are characters too, so a parser may read \"01 Experience\" as a heading, which systems generally still recognise. For a large corporate portal, keep the default section names rather than inventing playful ones.",
    faq: { question: "Should I use Creative for a design job if I have a portfolio?", answer: "Yes, as a companion to it. Put the portfolio link in your contact details and let the CV summarise roles, tools, and results; the portfolio carries the visual work." },
  },
  corner: {
    jobs: [
      ["Social media coordinator", "A geometric corner adds energy without distracting from metrics."],
      ["Startup operations generalist", "A modern touch of colour suits young companies."],
      ["Hospitality supervisor", "A friendly, airy page fits customer-facing applications."],
      ["Junior marketing assistant", "A large name and coloured title make a short first CV look confident."],
    ],
    ats: "The triangles in Corner are decoration drawn in the page corners, separate from your text, so applicant tracking systems read the content as an ordinary single column. Your coloured title is text, not an image. Keep the accent dark enough that the title stays legible if a recruiter prints in greyscale.",
    faq: { question: "Does Corner suit a conservative industry?", answer: "It can feel playful for law or finance. For those, choose a deep accent such as navy, or move to a traditional template like Professional." },
  },
  bold: {
    jobs: [
      ["Sales development representative", "A large name and solid tabs project confidence in competitive roles."],
      ["Radio or podcast producer", "Strong section tabs give a punchy, media-style rhythm."],
      ["Recruitment account manager", "Colour-matched bullets make achievements pop on a busy recruiter's screen."],
      ["Startup founder seeking employment", "A memorable first glance suits a career built on initiative."],
    ],
    ats: "Bold's section tabs are coloured bars with the section name as white text on top, and parsers read that text normally. The strip across each page is decoration. Because the tabs are visually heavy, check that your accent colour still contrasts with white; extraction is unaffected, but a low-contrast heading is harder for people to scan.",
    faq: { question: "Is Bold suitable for a graduate CV?", answer: "Yes, for sales, marketing, and media graduate schemes. It gives a short CV a strong shape. For finance or law, a traditional template fits the culture better." },
  },
  student: {
    jobs: [
      ["Summer intern", "Education and projects can lead the page with clear bands."],
      ["Graduate scheme applicant", "Modules, dissertation, and placements stay easy to scan."],
      ["Part-time retail or café worker", "A tidy, friendly page suits weekend and holiday jobs."],
      ["Apprenticeship applicant", "Section bands make GCSEs, work experience, and skills look complete."],
    ],
    ats: "Student's pale section bands are background shading behind real headings, so applicant tracking systems read each title and its content in order. The centred header is ordinary text. With content mostly from school or university, the bigger risk is vague wording, so name modules, tools, and projects specifically.",
    faq: { question: "Can I keep using Student after I graduate?", answer: "For your first year or two, yes. Once full-time work becomes your strongest section, move experience above education, or switch to Linear or Professional without retyping." },
  },
  academic: {
    jobs: [
      ["PhD applicant", "Institution-first entries foreground your universities and supervisors."],
      ["Postdoctoral researcher", "A long single column holds publications and grants without crowding."],
      ["Further education lecturer", "Traditional typography suits college and university teaching posts."],
      ["Museum curator", "Scholarly presentation fits research-led cultural roles."],
    ],
    ats: "Academic is a single serif column with double rules drawn under each heading, a layout parsers handle comfortably. University recruitment systems often ask you to list publications in their own form as well, so keep titles and years identical in both places to avoid confusion during shortlisting.",
    faq: { question: "Should I include referees in an Academic CV?", answer: "Usually yes, unlike a standard CV. Academic posts often ask for two or three referees with titles and institutions; add them in the additional section, renamed to Referees." },
  },
  monogram: {
    jobs: [
      ["Client services manager", "A recognisable initials tile gives your CV a personal mark."],
      ["Operations analyst", "Vertical accent bars keep a dense body easy to scan."],
      ["Freelance consultant", "The tile works like a small personal brand on proposals and CVs."],
      ["Office manager", "An uncluttered body suits busy hiring managers in small firms."],
    ],
    ats: "The square tile shows your initials as text on a coloured block, and the rest of Monogram is a single column with simple accent bars, so parsing follows the visual order. If you replace the tile with a photo, the image is skipped by applicant tracking systems; your name and contact details remain readable beside it.",
    faq: { question: "Which accent colour suits the Monogram tile?", answer: "A colour with strong contrast against white initials: navy, forest green, burgundy, or charcoal. Pale accents make the initials hard to read." },
  },
  horizon: {
    jobs: [
      ["Healthcare administrator", "An open, approachable layout suits patient-facing support roles."],
      ["Technical account manager", "A tinted header frames your title before detailed experience."],
      ["Team leader in a contact centre", "Fine rules keep metrics and responsibilities easy to scan."],
      ["Business development executive", "A contemporary look with an optional photo suits international markets."],
    ],
    ats: "Horizon's tinted header is a background colour behind your name and contact text, not a picture, so systems extract it normally. Below the accent line the body is one column with section labels beside fine rules. It's a sound choice for portals; leave the photo out unless the employer's country expects one.",
    faq: { question: "Can I use Horizon for an internal promotion?", answer: "Yes. Its calm, contemporary style suits an internal application, where the panel knows your organisation; focus the bullets on results since your last role change." },
  },
  ribbon: {
    jobs: [
      ["Restaurant manager", "Full-width ribbons separate service, people, and financial results cleanly."],
      ["Communications officer", "A splash of warm colour suits charities and councils with friendly brands."],
      ["Contact centre team leader", "Visible section breaks help a quick reader find team metrics fast."],
      ["Travel consultant", "An italic serif title and colour feel welcoming in leisure businesses."],
    ],
    ats: "Each ribbon is a coloured shape with the section name in white lettering laid over it, so the heading extracts like any other line of text. Because those headings rely on contrast, pick an accent dark enough to print well; if a recruiter pastes your text into their own system, the words come through even when the colour doesn't.",
    faq: { question: "How many sections should a Ribbon CV have?", answer: "Five or six work best. Every section gets a full-width ribbon, so many small sections make the page look striped; merge short ones, such as hobbies and volunteering, into Additional information." },
  },
  outline: {
    jobs: [
      ["Civil engineer", "Clear visual boundaries mirror the structured way engineers present information."],
      ["Payroll administrator", "Outlined headings keep a methodical, detail-first document tidy."],
      ["Facilities coordinator", "A framed contact block makes your phone number easy to find on a busy site."],
      ["Quality inspector", "Restrained typography suits regulated, compliance-driven work."],
    ],
    ats: "Outline's frame and section outlines are borders drawn around ordinary text, not tables or text boxes, so nothing interrupts the reading order. The whole CV flows as one column of plain type. Use standard section names and you can upload it to most recruitment portals with confidence.",
    faq: { question: "Can Outline be printed in black and white?", answer: "Yes. The frame and outlined headings are fine lines rather than filled shapes, so the page prints crisply on any office printer and uses very little ink." },
  },
  editorial: {
    jobs: [
      ["Journalist", "Oversized serif type and chapter headings feel at home in a newsroom."],
      ["Copywriter", "Expressive typography shows you care how words look on the page."],
      ["Communications manager", "Chapter numbers give a long career a clear editorial structure."],
      ["Publishing assistant", "A typographic CV suits publishers who notice small details."],
    ],
    ats: "Editorial's large chapter numbers sit beside the headings as text, so a parser may read \"02\" as part of a title. Most applicant tracking systems still map \"02 Experience\" to your work history, but on a strict corporate portal, check the preview it shows after upload. Underneath, the body is a plain full-width column.",
    faq: { question: "Does Editorial need a long CV to look right?", answer: "It looks best with three or more substantial sections. On a very short CV the oversized name can dominate the page; Creative offers a similar editorial feel at a smaller scale." },
  },
  summit: {
    jobs: [
      ["Sales manager", "A colour header and tinted column give a confident, modern first page."],
      ["IT project manager", "Certifications and tools stay visible beside delivery results."],
      ["Regional operations lead", "Experience leads the main column, with supporting skills to the side."],
      ["Business consultant", "An optional photo or initials suit international, client-facing roles."],
    ],
    ats: "Summit pairs a colour header with a tinted side column. Both contain real text; the small contact icons are graphics that parsers skip, which is harmless because the email address and phone number beside them are text. As with other two-column layouts, the order a system reads the columns can vary, so repeat critical skills in your experience bullets.",
    faq: { question: "Can I use Summit without a photo?", answer: "Yes. Without a photo the header shows your initials in a circle, so the colour band still looks balanced and finished." },
  },
  compass: {
    jobs: [
      ["Customer onboarding specialist", "Friendly icons make a client-facing CV quick to scan."],
      ["Field service technician", "The contact grid keeps your phone and location prominent for employers who call."],
      ["Graduate in operations", "Section icons give a short CV an organised, finished look."],
      ["Tour coordinator", "An optional photo suits markets where one is expected."],
    ],
    ats: "Beneath its header, Compass is a single column, and each icon sits beside a heading written in ordinary text, so parsers still recognise Experience, Education, and Skills. The contact grid holds plain text too, and systems identify email addresses and phone numbers wherever they appear on the page.",
    faq: { question: "Does Compass suit a technical CV?", answer: "Yes, for support, field, and operations roles. For developer roles with long tool lists, Tech shows skills more efficiently as grouped tags." },
  },
  halo: {
    jobs: [
      ["Activities coordinator in a care home", "A warm, centred photo suits people-focused care roles."],
      ["Beauty therapist", "A memorable photo header fits salons and spas where clients see you first."],
      ["Language teacher abroad", "Schools in many countries ask for a photo, and Halo presents one warmly."],
      ["Restaurant host", "Symmetry and a centred introduction feel welcoming and polished."],
    ],
    ats: "Halo's ring and colour band are decoration around your introduction; the centred name, title, and contact line are text that parsers read normally. Centred headings above fine rules don't affect extraction either. As with any photo template, applicant tracking systems ignore the image, and UK and US recruiters often prefer none.",
    faq: { question: "What kind of photo suits the Halo ring?", answer: "A clear head-and-shoulders photo with your face in the middle of the frame, because the ring crops to the centre. The editor crops it to a circle on your device, so nothing is uploaded." },
  },
  clarity: {
    jobs: [
      ["Graduate applying through online portals", "Standard section names map cleanly onto portal fields."],
      ["Civil service candidate", "A plain format suits applications where the content is judged, not the design."],
      ["Warehouse or logistics operative", "A straightforward page suits employers who screen high volumes quickly."],
      ["Bank or insurance applicant", "Conservative industries read a simple CV as professional."],
    ],
    faq: { question: "Will Clarity look too plain to a human reader?", answer: "Not if the content is strong. Consistent dates, short bullets with results, and a three-sentence profile make the plainness look deliberate; the design is meant to get out of the way." },
  },
  prism: {
    jobs: [
      ["Growth marketer", "An angled header gives an energetic first page for fast-moving teams."],
      ["Product designer at a start-up", "A dynamic shape signals a modern eye."],
      ["Technical sales engineer", "A bold header balances a technical, conventional body."],
      ["Community manager for a gaming brand", "The faceted edge suits youthful, digital-first companies."],
    ],
    ats: "Your name and title sit in white on Prism's angled colour shape, and parsers read them as text because the shape is drawn behind them. The slanted section markers are decoration beside normal headings, and the body runs in one column. Keep the accent dark enough for white lettering to stay readable when printed.",
    faq: { question: "Is Prism appropriate for a corporate role?", answer: "For marketing, sales, and technology teams, yes. For finance, law, or the public sector the angled header may feel too energetic; Edge offers one strong graphic element in a calmer tone." },
  },
  gazette: {
    jobs: [
      ["Newspaper reporter", "A masthead and dateline show you know newsroom conventions."],
      ["Sub-editor", "An italic lede lets your profile read like a standfirst."],
      ["Press officer", "Ruled columns separate media work from skills and education."],
      ["Author or ghostwriter", "Classic serif typography suits a career built on words."],
    ],
    ats: "In Gazette the wide left column carries experience and projects, while education and skills sit to the right of a vertical rule. A parser extracts both columns, though not always in the order they appear on the page. For applications emailed to an editor that makes no difference at all.",
    faq: { question: "How long should the profile lede be in Gazette?", answer: "Two or three sentences. The italic lede runs across the page, so a long paragraph turns into a heavy block of slanted text; keep it short, like a newspaper standfirst." },
  },
  heritage: {
    jobs: [
      ["Solicitor", "A double-ruled frame and engraved capitals suit traditional legal practices."],
      ["Private banker", "A crafted finish matches clients who value discretion and tradition."],
      ["Concierge in a luxury hotel", "Ornaments and serif capitals echo heritage hospitality brands."],
      ["Humanities lecturer", "Traditional typography suits classical and historical disciplines."],
    ],
    ats: "The frame is drawn around the text area on each page, and the small ornaments sit on their own between title and content, so parsers pass over both. To check for yourself, copy the text out of your downloaded PDF into a plain editor: Heritage's entries come out in order, employer first.",
    faq: { question: "Does Heritage suit a short CV?", answer: "It suits one or two full pages. The frame and ornaments add formality, so very short content can look sparse inside them; give each entry a result or two before choosing it." },
  },
  ledger: {
    jobs: [
      ["Applicant to an EU institution", "A form-like structure echoes the European CV conventions many institutions use."],
      ["Translator", "Labelled contact details and languages are easy to scan in multilingual work."],
      ["Supply chain planner", "Right-aligned labels make dense information easy to compare."],
      ["International NGO officer", "A clean, neutral structure travels well between countries."],
    ],
    ats: "Ledger's labels sit left of a single vertical rule, with each section's content to the right. Because every label belongs to its own section, text extracts in a sensible order: label, then entries. The rule itself is a drawn line. Keep labels to standard words such as Experience and Education, since they double as section names for a parser.",
    faq: { question: "Is Ledger the same as a Europass CV?", answer: "No. Ledger borrows the clear, labelled structure common in European CVs, but it isn't the official Europass format. If an employer asks for Europass specifically, use the EU's own Europass tool." },
  },
  mosaic: {
    jobs: [
      ["Product manager", "Tiles summarise education, skills, and certifications before the roadmap work."],
      ["UX researcher", "A well-organised page reflects a structured way of thinking."],
      ["Business analyst in tech", "Tinted contact tiles keep LinkedIn and portfolio links tidy."],
      ["Customer success manager", "Equal-height tiles make a varied skill set look balanced."],
    ],
    ats: "Mosaic keeps experience and projects full width, which is the part applicant tracking systems weigh most. The education, skills, and certification tiles sit side by side in a row, so a parser may read across them rather than one block at a time. If a portal pre-fills your education from the upload, check those fields before submitting.",
    faq: { question: "Which accent colour suits Mosaic?", answer: "A mid-tone such as teal, blue, or green. The tiles use a pale tint of your accent, so very dark accents produce greyish tiles and very bright ones can look loud." },
  },
  tide: {
    jobs: [
      ["Wellbeing coach", "Soft waves give a calm, friendly first impression."],
      ["Early years teacher", "A gentle, contemporary design suits education settings."],
      ["Spa or leisure supervisor", "An optional photo and wave header fit hospitality and wellness."],
      ["Healthcare assistant", "Clear single-column sections keep care experience easy to follow."],
    ],
    ats: "The waves in Tide are drawn behind your name and title, which remain white text that parsers read. The small wave beside each heading is decoration, and the content beneath runs in one column. Applicant tracking systems skip the optional photo, so the layout uploads to most portals without trouble.",
    faq: { question: "Does the Tide header take up a lot of space?", answer: "Only the top band of the first page; later pages keep a slim wave, so most of your content area is untouched. If space is tight, compact spacing recovers a few lines." },
  },
  edge: {
    jobs: [
      ["Structural engineer", "One strong graphic idea suits a profession that values clarity."],
      ["Management consultant", "Connected headings give a confident, structured feel."],
      ["Architectural technologist", "A colour stripe adds identity without clutter."],
      ["Project manager", "Accent bullets make delivery results stand out."],
    ],
    ats: "Edge's stripe and connecting lines are graphics along the left margin; your name, headings, and entries form one column of text, so extraction is straightforward. The accent-coloured bullets are simply characters in your chosen colour. It's a safe pick for portals as long as section names stay conventional.",
    faq: { question: "Does Edge suit a senior role?", answer: "Yes. A single graphic element looks deliberate rather than decorative, which suits senior engineering, consulting, and project roles. Choose a deep accent for a quieter finish." },
  },
  signature: {
    jobs: [
      ["Personal assistant to a CEO", "An italic serif name gives a polished, personal first impression."],
      ["Interior designer", "Elegant typography reflects an eye for detail."],
      ["Boutique hotel manager", "A calm sans-serif body keeps hospitality experience readable."],
      ["Fundraising officer", "A warm, personal style suits relationship-led roles."],
    ],
    ats: "The italic name is set in a serif typeface, not handwriting or an image, so parsers read it like any other text. Contact details are right-aligned beside it and may be extracted before or after your name, which systems handle easily. Below the header, entries follow one clean column.",
    faq: { question: "Is Signature suitable for a graduate?", answer: "Yes, especially for client-facing, creative, and hospitality roles. Its personal header gives a short CV character, while the sans-serif body keeps it practical." },
  },
  linear: {
    jobs: [
      ["Developer applying through job boards", "A plain hierarchy suits automated screening and quick human reads."],
      ["Administrator", "Standard headings fit employers who ask for a simple CV."],
      ["Research assistant", "Selectable text and one column make methods and results easy to find."],
      ["Career changer", "A neutral layout keeps attention on transferable skills, not design."],
    ],
    ats: "Linear has no icons, panels, tables, or decorative rules in the content, so applicant tracking systems read it exactly top to bottom, and its section labels use names they expect. For the strictest portals it's as safe as Clarity; choose between the two on looks, since Linear has a bolder name and a touch more character.",
    faq: { question: "Can I add a photo to Linear?", answer: "No, Linear has no photo placement by design. If you need one, Horizon and Duo keep a single-column body with space for a photo." },
  },
  aurora: {
    jobs: [
      ["Product marketing manager", "Soft arcs give a contemporary, polished feel."],
      ["Hotel sales coordinator", "An optional photo and warm header suit client-facing hospitality roles."],
      ["Communications assistant", "A gentle introduction frames a clean, readable body."],
      ["Customer success associate", "Round section markers keep a friendly, approachable tone."],
    ],
    ats: "Aurora's arcs are decoration in the header corner, and your name, title, and contact details stay as text on the left. Sections below use small round markers beside ordinary headings in one column. If you add the optional photo on the right, parsers skip it; nothing else stands between your text and extraction.",
    faq: { question: "Does Aurora suit a senior role?", answer: "It suits senior roles in communications, hospitality, and product. For finance or law, a traditional template such as Regent sends a more formal signal." },
  },
  atelier: {
    jobs: [
      ["Interior architect", "An editorial masthead suits design-led practices."],
      ["Fashion designer", "Strong typographic contrast shows a considered aesthetic."],
      ["Creative director", "Numbered chapters give a long portfolio career clear structure."],
      ["Art teacher", "A considered, creative document suits arts education."],
    ],
    ats: "Atelier's oversized italic name is text, and its pale chapter numbers sit beside the section labels as text too, so a parser may read a number before each heading. Experience runs full width in one column. For studio applications sent by email this doesn't matter; for corporate portals, check the parsed result.",
    faq: { question: "Should I include a portfolio link in Atelier?", answer: "Yes. Put it in the website field so it appears in your contact row. Reviewers in creative fields usually open the portfolio before reading the CV in detail." },
  },
  regent: {
    jobs: [
      ["Head of department in a school", "A formal nameplate suits leadership roles in education."],
      ["Chartered accountant", "Restrained detail matches established professional firms."],
      ["Professional services consultant", "Small-capital labels and a framed contact row look composed."],
      ["Charity director", "A formal yet warm finish suits established organisations."],
    ],
    ats: "Regent's frame around the contact row is a drawn border and the centred nameplate is text, so applicant tracking systems pick up your name, email, and phone without difficulty. Section labels use small capitals, which are ordinary letters to a parser, and the single-column body keeps every entry in a predictable order.",
    faq: { question: "Does Regent suit a two-page CV?", answer: "Yes. The nameplate leads the first page and the same single column continues after it, so a longer professional history reads smoothly from start to finish." },
  },
};
