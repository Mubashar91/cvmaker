import type { Template } from "./model";
import type { FAQ } from "@/components/faq-list";

/**
 * Original, template-specific content for each template page: how to write for the layout,
 * when to choose it or something else, and questions people ask about it. Every entry is
 * written for its layout rather than generated from attributes, so no two pages repeat
 * each other. Keep it that way when adding a template.
 */
export interface TemplateContent {
  /** Practical notes about writing for this specific layout. */
  writing: { heading: string; text: string }[];
  /** When this template is the right choice, and a named alternative when it is not. */
  choose: string;
  faqs: FAQ[];
  /** Optional title (without " | Folio") and heading when the page targets a specific search, e.g. ATS. */
  seoTitle?: string; h1?: string;
  /** Optional extra section for a template that answers a distinct question (written for that page only). */
  extra?: { id: string; heading: string; paragraphs: string[]; bullets?: string[] };
}

export const templateContent: Record<Template, TemplateContent> = {
  classic: {
    writing: [
      { heading: "Let the employer lead each entry", text: "Classic prints the employer or institution in bold before the role in italic, the way a traditional CV reads. Write the organisation name exactly as it is known, and keep the job title short enough to sit on one line beneath it. If you held several roles at one employer, add each as its own entry so the bold name repeats and the progression is obvious." },
      { heading: "Keep the centred headings to a few words", text: "Section titles sit centred between fine rules, so a long custom heading for the additional section looks heavier than it should. “Interests” or “Referees” fits; “Additional information and professional memberships” does not. Dates align to the right edge, which means “2019 – 2022” reads better than a full “September 2019 to June 2022”." },
      { heading: "Serif text rewards complete sentences", text: "The serif body suits short, full sentences in the profile and complete clauses in bullets. Fragments such as “Budget – £2m” look out of place. Three or four bullets per role, each one line or two, keeps a two-page CV from feeling dense." },
    ],
    choose: "Choose Classic when you want a CV that looks like a CV: law, accountancy, the civil service, academia, and any employer who would read a colour band as a distraction. It prints well in black and white and switches cleanly to a serif Word document. If you want the same restraint with a little more presence in the header, Professional adds a navy rule and a left-aligned title; if you need your skills to stand out, Classic buries them in a text block and Tech would serve you better.",
    faqs: [
      { question: "Why does the employer appear before my job title in Classic?", answer: "Classic follows the traditional British CV convention of leading with the organisation, then the role in italic beneath it. If you would rather lead with the job title, Professional and Clarity put the title first while keeping a formal look." },
      { question: "Can I add colour to the Classic template?", answer: "Yes, although it is designed as a black-and-white document. Any of the ten accent colours, or a custom one, recolours the name and headings while the rules stay fine and dark. Leave the default if you are applying to a conservative employer." },
      { question: "Is Classic suitable for a two-page CV?", answer: "It is. Headings are kept with the first entry beneath them, so a section never ends a page on its own, and the centred rules make it easy to see where page two begins. Use the compact spacing option if you are a few lines over." },
    ],
  },
  modern: {
    writing: [
      { heading: "Write the profile for the full width", text: "Modern runs your profile across the whole page before the columns begin, so it carries more weight here than in most layouts. Two or three full sentences work; a single line leaves a visible gap above the columns. Say what you do, the setting you do it in, and one result." },
      { heading: "Keep the side column short and specific", text: "Education, skills, and certifications sit in the narrower right column. Long skill lines wrap awkwardly there, so write one skill group per line with four or five items each, and keep degree names to their usual abbreviations. Certifications need only the name, issuer, and year." },
      { heading: "Let experience set the page length", text: "The main column holds experience and projects and decides how long the document is. When the side column is empty, Modern uses the full width automatically, so a CV with only experience still looks intentional. Four bullets per recent role and two for older ones keeps the two columns in step." },
    ],
    choose: "Choose Modern for office, technology, and client-facing roles where a recruiter will skim the page and you want your skills and qualifications visible without scrolling past your experience. Because supporting details sit in a column, check the employer’s application route: if you are uploading to a portal that parses CVs, Linear or Clarity keep the same content in one reading order. If you like the balance but want colour in the header, Summit adds a band and icons.",
    faqs: [
      { question: "What goes in the right-hand column of the Modern template?", answer: "Education, skills, and certifications. Everything else — your profile, work experience, projects, languages, and the additional section — stays in the main column. The order within each column follows the section order you set in the editor." },
      { question: "What happens if I have no skills or education to show?", answer: "Modern notices when the side column would be empty and lets the main column use the full page width, so you never get a blank strip down the right-hand side." },
      { question: "Will an applicant tracking system read the two columns correctly?", answer: "The PDF contains real text in a sensible order, and most modern systems cope with two columns, but a few older ones read across both. If the job advert mentions an online portal, download the Word version or switch to a single-column template such as Linear for that application." },
    ],
  },
  sidebar: {
    writing: [
      { heading: "Fill the panel with short lines", text: "The dark panel on the left is narrow and holds your contact details, education, skills, and certifications in white text. Write skills as single words or short phrases, one group per line, because a long line wraps several times in that width. Degree titles read best abbreviated: “BSc Computer Science” rather than the full award wording." },
      { heading: "Use the main column for the story", text: "Your name, title, profile, experience, and projects sit on the white side. Because the panel takes a third of the width, bullets wrap sooner than in a full-width layout; aim for one line each, with the result stated early. A profile of three sentences fills the space above the first role without pushing it onto page two." },
      { heading: "Decide on the photo or the initials", text: "Add a photo and it appears at the top of the panel as a circle; leave it out and Sidebar shows your initials there instead. Either is fine. The panel runs down every page, so a long CV keeps the same look on page two with the panel content continuing where it left off." },
    ],
    choose: "Choose Sidebar when you have a solid set of skills and qualifications that deserve to be seen at a glance — technical roles, healthcare, trades, and graduates with relevant modules all suit it. The colour panel prints as a full-height block, so avoid it where an employer asks for a plain document or will print in black and white; Atlas gives the same arrangement with a light tint instead, and Clarity keeps everything in one column.",
    faqs: [
      { question: "Can I change what appears in the Sidebar panel?", answer: "The panel always holds contact details, education, skills, and certifications; the main column holds the rest. You can reorder sections within each column and hide any section you do not need. Languages and the additional section stay in the main column." },
      { question: "Does the dark panel use a lot of ink when printed?", answer: "It does, as a solid block of colour on every page. If you expect the employer to print your CV, choose a lighter accent colour or use Atlas, which has the same structure with a pale panel." },
      { question: "Does the Sidebar template work without a photo?", answer: "Yes. Without a photo, the panel shows your initials in a circle, which looks deliberate rather than empty. Photos are usually left off CVs in the UK, Ireland, the US, and Canada." },
    ],
  },
  executive: {
    writing: [
      { heading: "Write a title that earns the band", text: "The colour band across the first page shows your name, professional title, and contact details in white. A title such as “Operations Director” or “Head of Finance” fills it with authority; a vague “Professional” does not. Keep contact details to four items so they fit on one line within the band." },
      { heading: "Lead with scope, then results", text: "Executive is formal and single-column, so each role has room for a sentence of context before the bullets: team size, budget, markets, or reporting line. Follow it with three or four bullets that state outcomes with numbers. Employers appear in your accent colour, which draws the eye down the career history, so make sure each is named consistently." },
      { heading: "Keep the second page as strong as the first", text: "The band appears only on the first page; later pages carry the same section styling without it. Put your most senior roles on page one, and use the education, certifications, and additional sections to close page two with board roles, memberships, or qualifications rather than leaving it half empty." },
    ],
    choose: "Choose Executive for senior management, finance, legal, and consulting applications where a commanding first page is expected and the content is strong enough to back it up. The band suits a confident colour such as navy or charcoal; a bright accent can feel loud for a formal role. If you want formality without a solid band, Professional and Regent keep the serif tone with lighter headers, and Heritage frames the page instead.",
    faqs: [
      { question: "Can I put a photo in the Executive header band?", answer: "Yes. A photo added under Personal details appears as a circle inside the band beside your name. Without one, the band shows just your name, title, and contact details, which is the usual choice for UK and US applications." },
      { question: "Does the colour band print on every page?", answer: "No. The full band appears on the first page only. Later pages keep the uppercase section titles with their short accent rules, so a long CV stays consistent without repeating the header." },
      { question: "Which accent colours suit the Executive template?", answer: "Navy, charcoal, forest, and burgundy keep it formal. Any custom colour is darkened just enough for white text to stay readable on the band, so lighter picks still work in print." },
    ],
  },
  atlas: {
    writing: [
      { heading: "Let the left column tell the story", text: "Atlas gives experience and projects the wide left column, so write them to be read in full: a context line for each role, then bullets with results. The profile sits above them at the same width, which suits three sentences rather than one." },
      { heading: "Treat the tinted panel as a summary", text: "The pale panel on the right gathers contact details, education, skills, and certifications. It is a place for facts, not explanation: degree, institution, dates; skill groups of four or five items; certificate name and year. Descriptions under education entries are shown but should stay to a line." },
      { heading: "Mind the panel on page two", text: "The panel continues on every page, so if your supporting sections run long they carry on beside your later roles. That looks fine when both columns fill; it looks unbalanced when one side runs out early. Trim older roles or hide a sparse section to keep the columns ending near each other." },
    ],
    choose: "Choose Atlas when you want the at-a-glance structure of a two-column CV without a block of dark colour: healthcare, education, administration, and business roles all suit it, and it prints lightly. The panel is tinted from your accent, so pastel-leaning picks look especially good. If you prefer the supporting details on the left, Sidebar mirrors the arrangement in a solid panel; for single-column simplicity with a photo, Horizon keeps the open feel.",
    faqs: [
      { question: "Which side is the panel on in the Atlas template?", answer: "The right. Your profile, experience, and projects run down the left; the tinted panel on the right holds your optional photo, contact details, education, skills, and certifications. Sidebar is the mirror image with a dark panel on the left." },
      { question: "How is the panel colour chosen?", answer: "It is a light tint of your accent colour, so switching from teal to plum changes the panel as well as the headings. The text in the panel stays dark for contrast whichever colour you choose." },
      { question: "Can I move skills out of the Atlas panel into the main column?", answer: "Not in Atlas — the panel is where education, skills, and certifications live. If you want skills in the main flow, perhaps as tags, switch to Tech or Mosaic; your content carries across." },
    ],
  },
  timeline: {
    writing: [
      { heading: "Write dates the gutter can show", text: "Timeline moves every date into a narrow left gutter beside the vertical line, so dates must be short: “2021 – 2024”, “Mar 2022 – Present”, or a single year for a certificate. A date written as a sentence wraps into several lines and breaks the rhythm. Leave the date empty for entries that have none and the marker still appears." },
      { heading: "Put progression in the titles", text: "Because the line makes the sequence of roles obvious, use job titles that show movement — “Junior Designer” to “Designer” to “Senior Designer” — rather than one umbrella title. Each marker on the line represents a role, degree, or project, so splitting a long tenure into its promotions makes the path visible." },
      { heading: "Keep descriptions aligned to the column", text: "Descriptions align to a single column on the right of the line, which is narrower than a full-width layout. Bullets of one line each read best; a paragraph under a role is fine but should stay to three lines. Skills and languages are text sections and sit in the same column without a marker." },
    ],
    choose: "Choose Timeline when your career has a clear sequence to show — several roles, a steady climb, or a return to work after a break you would rather present openly as part of the path. Dates are the first thing a reader sees, so it suits people whose timeline is a strength. If there are gaps you would rather not emphasise, a layout with dates on the right such as Modern or Outline draws less attention to them, and Compact fits more roles on a page.",
    faqs: [
      { question: "Where do the dates go in the Timeline template?", answer: "In a gutter on the left, next to the vertical line, so each role, degree, or project has its date beside its marker. Keep them short — years or month and year — so they fit on one line." },
      { question: "What appears on the timeline if an entry has no date?", answer: "The marker still appears and the gutter is simply left blank for that entry. Certifications or projects without dates sit on the line like everything else." },
      { question: "Does the Timeline template show employment gaps?", answer: "The dates make the sequence easy to follow, so a gap is visible but not highlighted. If you want to explain one, a short line in the profile or the additional section works better than leaving the reader to guess." },
    ],
  },
  duo: {
    writing: [
      { heading: "Balance the two halves of the header", text: "Duo splits the header into a solid colour block with your name, title, and optional photo, and a lighter block with your contact details. Four contact items fill the right half neatly; two leave it looking sparse, so include your location and a professional link if you have them." },
      { heading: "Use the square markers to pace the page", text: "Every section starts with a small colour square and a fine rule, which gives the single column a steady rhythm. Short sections — a three-line skills list, a one-entry certifications section — still get a marker, so avoid creating several tiny sections; merge small items into the additional section with a custom heading instead." },
      { heading: "Write entries that stand on their own", text: "The body is a plain single column with bold titles, accent-coloured organisations, and right-aligned dates. There is no panel to catch supporting details, so put key tools and skills into bullets where they were used, and keep the skills section to grouped lines for scanning." },
    ],
    choose: "Choose Duo when you want a modern header with real presence and a body that stays conventional and easy to parse — sales, marketing, product, and customer-facing roles suit it well. Because only the header uses colour blocks, it prints economically. If you want colour to continue down the page, Bold adds section tabs and a strip; if you want a softer header, Horizon tints it instead of splitting it.",
    faqs: [
      { question: "What is shown in each half of the Duo header?", answer: "The solid colour half carries your name, professional title, and photo if you add one. The lighter half carries your email, phone, location, and website. Both halves use your accent colour." },
      { question: "Does Duo work for a two-page CV?", answer: "Yes. The split header appears on the first page only; later pages continue the single column with the same square section markers, and headings are never left alone at the foot of a page." },
      { question: "Can I use Duo without a photo?", answer: "Yes. Without a photo the colour block holds your name and title with more room. Add one later under Personal details and the layout adjusts; the photo is cropped on your device and never uploaded." },
    ],
  },
  professional: {
    writing: [
      { heading: "Pair the title with the name", text: "Professional sets your name and professional title on the left with the contact block beside them, under a restrained navy rule. The title is read as part of the nameplate, so make it the role you are applying for or the one you hold, not a slogan. Contact details stack on the right, so four short items look tidiest." },
      { heading: "Lead entries with the employer", text: "Like Classic, Professional names the organisation first and sets your role in italic beneath it, in serif type. Bullets are indented and read as full clauses. Three bullets that each state a responsibility and its measurable effect suit this layout better than six fragments." },
      { heading: "Keep section titles left and lean", text: "Section titles sit left-aligned above fine rules, so the whole document reads from a single margin. The additional section’s heading appears in the same style, which makes “Professional memberships” or “Publications” a natural fit for this template." },
    ],
    choose: "Choose Professional for business, consulting, operations, and management applications where a formal serif document is expected but a centred, classical layout feels too old-fashioned. It is the most conventional of the serif templates in reading order. If you want a formal document with a stronger first page, Executive adds a colour band; if you want the formality with a lighter, more modern typeface, Outline or Regent are the next steps.",
    faqs: [
      { question: "How is Professional different from the Classic template?", answer: "Both use serif type and lead entries with the employer, but Classic centres the name and section headings while Professional aligns everything to the left margin, adds a navy header rule, and places the contact block beside the name. Professional looks a little more corporate." },
      { question: "Can I change the navy accent in Professional?", answer: "Yes. The navy is the template’s default; any of the ten accent colours or a custom colour replaces it in the header rule and headings. Charcoal and forest keep the formal tone." },
      { question: "Is the Professional template suitable for a graduate?", answer: "It can be, particularly for law, finance, and consulting applications. Move Education above Work experience in the editor so your degree leads, and use the Projects section for dissertation or placement work." },
    ],
  },
  swiss: {
    writing: [
      { heading: "Write a name that can be set large", text: "Swiss sets your name very large with a single coloured full stop after it, so a long double-barrelled name wraps to two lines. That still works, but check the preview. The contact row is labelled — Email, Phone, Location, Web — so you only need the values; the labels are supplied by the template." },
      { heading: "Use the left-column labels as signposts", text: "Each section begins with a heavy black rule and its title in a left column, with your content aligned to the right. Titles longer than two words wrap in that column, so prefer “Experience” to a custom “Professional and voluntary experience”. The additional section’s custom heading should follow the same rule." },
      { heading: "Let the grid do the formatting", text: "The Swiss style rewards plain, factual writing. Bullets of one line with a number in them look exactly right; adjectives and long sentences fight the grid. Skills written as grouped lines align neatly beneath the heavy rule, and dates sit in the right margin without ornament." },
    ],
    choose: "Choose Swiss when a disciplined typographic document will be read as a sign of judgement — design, architecture, engineering, and product roles especially. Its only colour is the full stop and the headings, so it prints crisply and works for people who find decorative templates uncomfortable. If you want the same strictness with less visual weight, Minimal uses a quieter left rail; if you need more room for long entries, the labels column in Swiss takes space that Linear gives back.",
    faqs: [
      { question: "What does the coloured full stop in the Swiss template do?", answer: "It is the template’s one colour accent, ending your name. Changing the accent colour changes the full stop and the section titles; the heavy rules stay black so the grid keeps its contrast." },
      { question: "Why are my contact details labelled in Swiss?", answer: "Swiss presents contact details as a labelled grid — Email, Phone, Location, Web — in the international typographic style. Enter just the values in the editor and the labels are added for you." },
      { question: "Does the Swiss template suit a long CV?", answer: "It suits two pages well, since the heavy rules make each section easy to find on either page. The left label column reduces the width available for text, so very long bullets wrap more than in a full-width layout." },
    ],
  },
  minimal: {
    writing: [
      { heading: "Keep the rail labels short", text: "Minimal places small section labels in a left rail with your details on the right. The rail is narrow, so the labels stay readable only when they are one or two words. A renamed additional section works best as “Interests” or “Awards”; a long custom title will wrap down the rail." },
      { heading: "Let white space carry the hierarchy", text: "There are no bands, rules, or colour accents to separate entries, only spacing. That means your own structure matters: bold titles, consistent date formats, and bullets of similar length. Mixing a four-line paragraph under one role with single bullets under the next will show more here than elsewhere." },
      { heading: "Write a profile worth the quiet", text: "The understated heading leads straight into the profile, which is the first thing read in a layout with no graphic to catch the eye. Make it concrete — field, years, one defining strength — and keep it to three sentences so the first role begins high on the page." },
    ],
    choose: "Choose Minimal when you want the document to disappear behind the content: editorial, research, consultancy, and senior individual-contributor roles where a plain black-and-grey page signals confidence. It is the quietest template in the catalogue and prints identically in colour or mono. If you want the same calm with a touch of structure, Outline frames the header and headings; if the left rail takes too much width for your long bullets, Linear gives the full page to the text.",
    faqs: [
      { question: "Is there any colour in the Minimal template?", answer: "By default it uses only black and grey. You can apply an accent colour to the name and rail labels if you want a hint of it, but the template is designed to work without one." },
      { question: "How is Minimal different from Linear?", answer: "Minimal places section labels in a left rail beside the content, which gives it a distinctive two-part structure. Linear stacks headings above the content in one plain column, which leaves more width for text and is the simpler choice for online portals." },
      { question: "Does Minimal support a photo?", answer: "No. Minimal, like the other Simple templates, has no photo placement. If you need a photo in a quiet layout, Horizon or Monogram keep a restrained body with a small photo in the header." },
    ],
  },
  tech: {
    writing: [
      { heading: "Write skills as labelled groups", text: "Tech turns each skill into a tag. Write one group per line in the form “Languages: TypeScript, Python, SQL” and the label appears beside its tags; a line without a label becomes a row of unlabelled tags. Six to eight tags per group fills a row cleanly, and separating items with commas, semicolons, or bars all work." },
      { heading: "Name the stack in the bullets too", text: "Tags show what you know; bullets prove it. Mention the tools where you used them — “Migrated the checkout service from Express to Fastify, cutting p95 latency by 40%” — because the organisation line is accent-coloured and the eye goes from it straight to the first bullet. Projects deserve the same treatment, with a link in the organisation field if you have one." },
      { heading: "Keep the compact sections moving", text: "Section titles are small uppercase labels, so the page scans quickly and long paragraphs stand out as a slowdown. Three or four bullets per role, one line each, matches the pace of the tag rows. Certifications fit in a few lines with name, issuer, and year." },
    ],
    choose: "Choose Tech for developer, engineering, data, and IT roles where a hiring manager will look for specific tools before reading anything else, and for analysts whose software skills are part of the pitch. The tags are real text, so searching the PDF for a tool name still finds it. If the job is technical but the employer is conservative — a bank, a government department — Compact or Clarity present the same content without tags. Mosaic offers a tiled layout if you want the skills to stand out in a more designed way.",
    faqs: [
      { question: "How do I make skill categories appear in the Tech template?", answer: "Start the line with the category and a colon: “Tools: Git, Docker, Jira”. The word before the colon becomes the label and everything after it becomes tags. A line without a colon is shown as plain tags." },
      { question: "Are the skill tags readable by applicant tracking systems?", answer: "Each tag is normal text in the PDF, so a search for a skill finds it and copy-and-paste keeps the words. The tags are drawn as small tinted boxes, which some parsers read in a slightly different order, so for a strict portal the Word download or Clarity is the safe option." },
      { question: "Can I use the Tech template for a non-technical job?", answer: "Yes. The tags work for any skills — languages spoken, software, certifications in a trade. Write groups such as “Clinical: Wound care, Phlebotomy” and the layout treats them the same way." },
    ],
  },
  compact: {
    writing: [
      { heading: "Write for one line per heading", text: "Compact puts the job title and the employer on one line, separated by a dot, with the date on the right. Both need to be short enough to share that line: “Senior Analyst · Northgate Insurance” works; a long departmental title pushes the employer to a second line. If a title is long, trim it and keep the detail for the first bullet." },
      { heading: "Earn the density", text: "Tight spacing means a wall of bullets reads as a wall. Vary the length a little, lead each with a strong verb, and make every bullet carry a fact. Five or six bullets for the current role, three for the previous, and one or two for older roles keeps the page scannable while fitting more than most templates manage in two pages." },
      { heading: "Use short dates and short section titles", text: "Section titles are small and accent-coloured and sit close to the text, so one-word titles look best. Dates of “2019 – 2022” align neatly in the right margin; written-out months add width the layout does not have." },
    ],
    choose: "Choose Compact when you have more than two pages of relevant experience and need it in two, or when you prefer a plain document with very little decoration — common in technical, scientific, and public-sector applications. It is also a good base for a Word download, since the structure is simple. If your CV is short, Compact will leave the lower half of the page empty, and Linear or Clarity will look more deliberate with the same content; if you want density with a traditional serif, Classic with the compact spacing option comes close.",
    faqs: [
      { question: "How much more fits on a page in the Compact template?", answer: "Roughly a quarter more than a standard layout, thanks to the single-line entry headings and tighter spacing. The exact amount depends on how long your bullets are. The spacing options in the editor can tighten or relax it further." },
      { question: "Does Compact still look fine for a short CV?", answer: "A one-page CV with two roles will leave space at the bottom. For a short career history, Linear, Student, or Clarity use the page more evenly; your content moves across without retyping." },
      { question: "Is Compact suitable for online application systems?", answer: "Yes. It is a single column with standard headings, plain text, no tables, and no graphics, which is what parsers handle best. The title-and-employer line uses a plain dot separator that copies as text." },
    ],
  },
  elegant: {
    writing: [
      { heading: "Choose between the monogram and a photo", text: "Elegant opens with your initials inside a fine circle above your name, or with a round photo in the same place if you add one. The initials are taken from your full name, so enter it as you want the letters to read. Below, your name is set in widely spaced serif capitals; a long name still fits, but a middle name may push it to two lines." },
      { heading: "Write entries for italic organisations", text: "Organisations and dates are set in italic under each bold title. That typographic contrast works best when the organisation is a proper name — “The Langham, London” — and the date is brief. Descriptions sit beneath with round bullet markers; two or three lines per role keep the page airy." },
      { heading: "Let the centred titles breathe", text: "Section titles are centred between short rules, so each section begins with a pause. That suits a CV with five or six substantial sections better than one with ten short ones. Combine small items — awards, memberships, interests — in the additional section under one heading." },
    ],
    choose: "Choose Elegant for hospitality, arts administration, events, luxury retail, education, and senior support roles where a graceful, well-set document reflects the work itself. Its bronze default is warm without being loud, and the serif body carries longer sentences well. If you want the same refinement without a monogram or photo, Signature uses an italic name and a sans-serif body; for formal rather than graceful, Heritage adds a page frame and ornaments.",
    faqs: [
      { question: "Where do my initials come from in the Elegant template?", answer: "From the name entered under Personal details: the first letter of the first and last words. “Amara Okafor” becomes AO. If you add a photo, it replaces the initials in the circle." },
      { question: "Can I change the bronze colour in Elegant?", answer: "Yes. Bronze is only the default. Plum, burgundy, forest, or a custom colour recolours the monogram circle, the section rules, and the dates. The serif text stays dark for readability." },
      { question: "Is Elegant a good choice for a creative portfolio CV?", answer: "For arts, design, and editorial work where restraint is valued, yes. If you want more expressive typography, Creative and Atelier bring numbered editorial headings while keeping the serif feel." },
    ],
  },
  portrait: {
    writing: [
      { heading: "Prepare a photo that suits a circle", text: "Portrait places a large round photo beside your name, so choose an image with your face centred and a plain background; the crop is made on your device and you can see the result in the preview. Without a photo, your initials sit in a colour circle of the same size, so the layout still balances." },
      { heading: "Fill both contact columns", text: "Contact details sit in two columns beneath your title. Four items — email, phone, location, website — fill the grid evenly; with two, one column stands empty. A city and country is enough for location, and a LinkedIn address works well as the website." },
      { heading: "Keep the dotted leaders clear", text: "Each section opens with a small ring, a spaced uppercase title, and a dotted leader running to the right edge. Short titles leave a long, satisfying leader; a long custom heading swallows it. Entries beneath are warm and conventional, with bullets under each role, so write them as you would in any single-column CV." },
    ],
    choose: "Choose Portrait when a photo is expected — much of continental Europe, the Middle East, and parts of Asia, and roles in hospitality, retail, aviation, and client services where a friendly face is part of the application. In the UK, Ireland, the US, and Canada, leave the photo out unless the employer asks, and consider whether a photo-led layout is the right signal at all; Halo and Monogram use a smaller photo, and Horizon tucks it into a tinted header.",
    faqs: [
      { question: "How large is the photo in the Portrait template?", answer: "It is the largest in the catalogue, a round image beside your name that sets the tone of the first page. It is cropped to a circle on your device, stays on your device, and appears in the PDF at print resolution." },
      { question: "What appears if I do not add a photo?", answer: "A colour circle with your initials in the same position, so the header keeps its shape. If you would rather have no circle at all, a template without a photo placement, such as Creative or Corner, is the better choice." },
      { question: "Should I use a photo on a CV for a UK or US employer?", answer: "Usually not. Employers in the UK, Ireland, the US, and Canada generally expect no photo, and some remove them to avoid bias. Portrait works without one, but a template that does not feature a photo may be the more natural choice there." },
    ],
  },
  creative: {
    writing: [
      { heading: "Write headings worth numbering", text: "Creative numbers each section — 01, 02, 03 — in italic serif, following the order you set in the editor. The numbering makes the sequence feel authored, so order sections deliberately: profile first, then the work that best fits the role, then education. Hidden and empty sections are skipped and the numbers close up." },
      { heading: "Give the serif name a short title", text: "A larger serif name sits over a short warm rule and your professional title. The title is the first line of your pitch; “Content Designer” or “Illustrator and Art Director” reads well, while a list of three roles crowds the header." },
      { heading: "Keep the body plainer than the headings", text: "The headings carry the personality, so the body can be clear and direct: concise entry headings, indented bullets, results stated plainly. A profile that sounds like a portfolio statement — what you make, for whom, and how it lands — suits this template better than a list of adjectives." },
    ],
    choose: "Choose Creative for design, content, communications, and editorial roles where a touch of typographic personality is expected and you are likely to send the CV directly to a person. It keeps a single column and plain bullets, so it remains readable and parses sensibly. If you want more drama in the masthead, Editorial and Atelier go further; if the employer is a large organisation with a formal process, Professional carries the same serif tone without the numbering.",
    faqs: [
      { question: "How are the section numbers decided in the Creative template?", answer: "They follow the section order you set under Templates & layout, counting only sections that have content and are not hidden. Move a section and its number changes to match." },
      { question: "Is the Creative template too informal for a corporate application?", answer: "It depends on the employer. The body is conventional, but the numbered italic headings signal a creative field. For a corporate role, Professional or Regent keep the serif style in a more formal frame." },
      { question: "Which accent colours work with Creative?", answer: "Its default is a warm terracotta. Bronze, burgundy, and forest keep the editorial warmth; cobalt or teal give it a cooler, more contemporary feel. The accent appears in the rule under your name and the headings." },
    ],
  },
  corner: {
    writing: [
      { heading: "Leave the corner to the shapes", text: "Two overlapping colour triangles sit in the top-right corner of the first page, behind nothing: your name and contact details stay on the left, so they never collide. A long name is fine. Keep contact details to a single line beneath your coloured title and the header stays airy." },
      { heading: "Use the accent rules as full stops", text: "Each section title carries a short, thick accent rule beneath it, which acts like punctuation. Sections with a single line of content — one certificate, two languages — look thin under such a confident heading, so group small items into the additional section or hide a section until it has substance." },
      { heading: "Write open, spaced entries", text: "The body is airy by design, with generous space between entries. That suits four or five well-chosen bullets per role rather than eight short ones, and a profile of two or three sentences. If you are a few lines over a page, choose the compact spacing option before cutting content." },
    ],
    choose: "Choose Corner for marketing, hospitality, start-up, and creative-adjacent roles where a modern touch of colour is welcome but the content needs to stay the focus; the colour lives in the corners, not behind the text. It prints well because the shapes are small. If you want colour that continues on every page, Bold and Edge carry a strip or stripe throughout; if you want a geometric header rather than a corner, Prism angles the whole band.",
    faqs: [
      { question: "Do the colour triangles appear on every page of the Corner template?", answer: "The large pair sits in the top-right corner of the first page, with a smaller one at the foot of that page. Later pages are plain apart from the accent rules under each section title, so a two-page CV stays light." },
      { question: "Can I move the colour corner to the left?", answer: "No, the shapes are fixed to the right so they never overlap your name and contact details on the left. You can change their colour with any accent or a custom colour." },
      { question: "Does the Corner template support a photo?", answer: "No. Corner has no photo placement; the corner shapes take that role in the header. For a modern layout with colour and a photo, Tide or Aurora are close in spirit." },
    ],
  },
  bold: {
    writing: [
      { heading: "Set a name that can carry size", text: "Bold prints your name large beneath a thin colour strip, with your title in the accent colour and a single contact line. It wants a name and a title, not a paragraph: keep the professional title to a few words and let the contact line hold four items." },
      { heading: "Write to the solid tabs", text: "Each section opens with a solid colour tab carrying its title in white. Tabs read loudly, so a CV with many short sections becomes a stack of coloured bars. Aim for five or six sections with real content, and use a custom heading in the additional section to gather the rest." },
      { heading: "Match the bullets to the energy", text: "Bullets pick up the accent colour, which draws attention to the first words of each line. Start them with strong verbs and results — “Grew”, “Launched”, “Cut” — and keep them to a line or two. A profile here should be confident and specific rather than modest." },
    ],
    choose: "Choose Bold for marketing, sales, media, events, and start-up roles where confidence is part of the brief and the CV may be read on screen, where the colour tabs help navigation. It prints with solid colour on every page, so it is a poor fit for employers who print in black and white or expect a plain document. If you want the structure with less ink, Ribbon narrows the colour to the section bands; if you want confidence without colour blocks, Swiss and Edge rely on line and type.",
    faqs: [
      { question: "Does the colour strip appear on every page in the Bold template?", answer: "Yes. A thin strip in your accent colour crowns every page, and the solid section tabs continue wherever a section begins, so page two looks like page one." },
      { question: "Will the Bold template print well in black and white?", answer: "It prints, but the tabs become dark grey blocks with white text and the strip a grey line. If the employer is likely to print, a lighter template such as Corner or Duo keeps the modern feel with less ink." },
      { question: "Which accent colour should I choose for Bold?", answer: "The default raspberry is energetic; cobalt and teal feel more corporate while keeping the impact. Whatever you choose is darkened if needed so the white text on the tabs stays readable." },
    ],
  },
  student: {
    extra: {
      id: "first-cv", heading: "Writing your first CV as a student?",
      paragraphs: [
        "This page is about the Student layout itself. For the whole process, from what to put first to how to describe a society role or a weekend job, use the [free student CV maker](/cv-maker-for-students/): it opens this template with education already at the top and includes a complete student CV example to edit.",
        "No jobs to list yet? The [CV with no experience](/cv-with-no-experience/) page shows a full example built only from school, volunteering, and projects.",
      ],
    },
    writing: [
      { heading: "Put education where it belongs", text: "Student is built for a CV where education and projects carry more weight than jobs. Open the editor from the student page and the section order starts with education; otherwise move it up under Templates & layout. Under each degree or course, use the description for relevant modules, grades, or a dissertation title — the academic bands make these details easy to find." },
      { heading: "Treat projects and part-time work as experience", text: "A group project, a dissertation, a volunteering role, or a weekend job all belong in this CV. Give each its own entry with a title, the organisation or course, dates, and two or three bullets that say what you did and what came of it. Numbers help even here: people helped, pages written, events run." },
      { heading: "Keep the profile honest and forward-looking", text: "The centred serif heading leads into a profile that should say what you are studying, what you have done that is relevant, and what you are applying for. Two or three sentences is enough; employers reading a student CV expect potential, not a career summary." },
    ],
    choose: "Choose Student for your first CV, a placement or internship application, a part-time job while studying, or a graduate scheme where education is your strongest evidence. The section bands make a short CV look organised rather than thin. Once you have two or three years of work experience, Linear, Clarity, or Modern will present it better; your content moves across unchanged.",
    faqs: [
      { question: "How do I put education before work experience in the Student template?", answer: "Open Templates & layout in the editor and move Education above Work experience with the arrows or by dragging. Starting from the CV maker for students page sets that order for you." },
      { question: "What should I write if I have no work experience?", answer: "Lead with education, add projects, volunteering, and course work as entries, and use the skills section for software, languages, and strengths you can evidence. Our guide to writing a CV with no experience walks through each section." },
      { question: "Is the Student template suitable for online application portals?", answer: "Yes. It is a single column with standard headings and no columns or graphics beyond the pale section bands, which are drawn behind real text." },
    ],
  },
  academic: {
    writing: [
      { heading: "Lead with the institution", text: "Academic names the institution or employer first, with the qualification or role beneath it, under small uppercase headings with double rules. Write institution names in full — “University of Edinburgh” rather than an abbreviation — because they are the bold line the reader scans." },
      { heading: "Use projects for research and publications", text: "The projects section suits research projects, theses, and publications: put the title in the title field, the journal, supervisor, or funder in the organisation field, and the year as the date. The additional section, renamed to “Publications” or “Conference presentations”, takes a simple one-per-line list." },
      { heading: "Keep the masthead formal", text: "A centred serif name and a single contact line sit above a double rule. Academic titles belong in the professional title field — “Dr” goes with the name, “Postdoctoral Research Fellow” goes in the title. Dates on the right accept ranges such as “2018 – 2022” and single years alike." },
    ],
    choose: "Choose Academic for research posts, lectureships, PhD applications, and teaching roles where a traditional, institution-led format is the norm, and for graduates applying to conservative employers who want the degree seen first. It is designed to run to several pages without losing structure. If your application is to industry rather than a university, Professional or Regent carry the same seriousness with a role-led reading order.",
    faqs: [
      { question: "Can the Academic template handle a long CV with publications?", answer: "Yes. It is a single column that flows across as many pages as needed, with headings kept beside their first entry. List publications one per line in the additional section with a custom heading, or as project entries if you want titles and years separated." },
      { question: "Why do the institutions appear in bold instead of my role?", answer: "Academic CVs conventionally lead with the institution. If you would rather lead with the role or job title, Regent and Professional keep a formal serif style with the title first." },
      { question: "Does Academic support a photo or colour?", answer: "It has no photo placement. The accent colour recolours the headings and rules; the default dark green keeps it traditional, and charcoal makes it effectively black and white." },
    ],
    extra: {
      id: "harvard-style", heading: "Academic CV vs Harvard-style CV",
      paragraphs: [
        "People who search for a Harvard CV template usually mean the plain, one-column résumé format popularised by Harvard's career services guidance: education first, a serif typeface, bold institution names, and dates on the right. It is a convention rather than a design, and Academic is the closest of these templates to it.",
        "The real difference is length and purpose. A Harvard-style résumé is normally one page for a job or internship, so research gets a line or two at most. An academic CV has no page limit and lists publications, conference papers, teaching, grants, and referees in full, because a hiring committee wants the complete record.",
        "For a lectureship, a postdoc, or a PhD place, keep the full academic CV in this template. For a graduate scheme, a consultancy, or a job outside universities, cut it to one page in the [Harvard-style CV template](/harvard-cv-template/), which walks through a complete one-page example.",
      ],
    },
  },
  monogram: {
    writing: [
      { heading: "Decide what the tile should say", text: "Monogram opens with a solid square tile holding your initials, taken from your name, beside your name, title, and contact details. Add a photo and it replaces the tile. The tile is small and composed, so the header stays understated whichever you choose — it is the vertical accent bars at each section that give the page its rhythm." },
      { heading: "Write to the vertical bars", text: "Each section title sits beside a short vertical accent bar, which draws the eye to the start of the section rather than across the page. Short titles work; the accent bar also means a section with one short line looks fine, so a brief certifications or languages section is not a problem here." },
      { heading: "Keep the body clean and factual", text: "The single-column body is uncluttered, with bold titles, dates on the right, and plain bullets. It suits business writing: context line, three results, next role. Keep the skills section to grouped lines so it reads as a quick inventory beneath the bar." },
    ],
    choose: "Choose Monogram for business, operations, client services, and consultancy roles where you want a recognisable, personal header without a large photo or a block of colour, and a body that any reader can follow. It prints lightly and reads well on screen. If you want the initials idea with more elegance, Elegant sets them in a circle over spaced capitals; if you want colour to run through the page, Edge or Bold are more assertive.",
    faqs: [
      { question: "What is the square tile in the Monogram template?", answer: "A solid square in your accent colour showing your initials, placed beside your name. It is the template’s signature. Add a photo under Personal details and the photo takes its place at the same size." },
      { question: "Can I use Monogram without initials or a photo?", answer: "The tile always shows something — your initials if there is no photo. If you would prefer no tile at all, Outline and Linear have a similar body without a header graphic." },
      { question: "Is the Monogram template suitable for senior roles?", answer: "Yes. Its restraint suits senior business roles; pair it with a dark accent such as charcoal or navy. For a more commanding first page, Executive adds a full header band." },
    ],
  },
  horizon: {
    writing: [
      { heading: "Fill the tinted header deliberately", text: "Horizon gathers your name, title, and contact details in a softly tinted header above a solid accent line, with an optional photo on the right. Four contact items fill the band neatly. The tint is light, so the header reads as a calm introduction rather than a banner; write a title that matches that tone." },
      { heading: "Use the full width for experience", text: "Below the header, everything runs full width: section labels in uppercase beside fine rules, then entries with bold titles and dates on the right. That width suits bullets that run to a line and a half with a number in them. Education entries have the same space, so a line of relevant modules or a grade fits comfortably." },
      { heading: "Keep the section labels brief", text: "The uppercase labels sit at the left of a fine rule that runs across the page, so a long label shortens the rule and unbalances the row. One or two words — “Experience”, “Key skills” — keep the rows even down the page." },
    ],
    choose: "Choose Horizon for technology, healthcare, administration, and business roles where you want a contemporary, approachable CV with an optional photo but no columns or heavy colour. It prints well and converts cleanly to Word. If you want a bolder header, Duo splits it into two colour blocks; if you do not need a photo and want even less decoration, Outline or Linear keep the open single column.",
    faqs: [
      { question: "Where does the photo go in the Horizon template?", answer: "On the right of the tinted header, as a circle beside your contact details. Without a photo the header simply holds your name, title, and contact details — it does not leave a gap." },
      { question: "How dark is the Horizon header?", answer: "It is a light tint of your accent colour with dark text, so it prints economically and stays readable in black and white. Only the thin line beneath it uses the full accent." },
      { question: "Is Horizon suitable for a two-page CV?", answer: "Yes. The header appears on the first page and later pages continue the full-width sections with the same labels and rules, so page two reads consistently." },
    ],
  },
  ribbon: {
    writing: [
      { heading: "Pair a bold name with an italic title", text: "Ribbon sets your name in bold uppercase and your professional title in italic serif beneath it. The two typefaces are the header, so there is no need for a photo or graphic; choose a title that reads well in italic — a role, not a tagline — and keep contact details to one line." },
      { heading: "Write section titles that fit a ribbon", text: "Every section begins with a full-width colour band carrying its title in white lettering. The bands are the strongest element on the page, so they suit a CV with five or six well-filled sections. A section with one short line beneath a full ribbon looks underpowered; merge small items under a custom heading in the additional section." },
      { heading: "Let the white space between ribbons work", text: "Entries sit on a plain white background between the bands with bold titles and right-aligned dates. Because the ribbons separate sections so clearly, you can be generous with bullets inside each — four or five per recent role — without the page feeling crowded." },
    ],
    choose: "Choose Ribbon for marketing, hospitality, communications, and customer-facing roles where visible structure and a little colour help a reader move through the page, particularly on screen. The bands print as colour blocks, so it uses more ink than most templates. If you like the clarity but want less colour, Outline draws the same section boundaries as outlines; if you want the bands only in the header, Executive and Duo concentrate the colour at the top.",
    faqs: [
      { question: "Can I change the colour of the ribbons?", answer: "Yes. The bands use your accent colour, with white lettering that stays readable because custom colours are darkened when needed. The default is a deep rose; navy, teal, and forest give a more corporate look." },
      { question: "Do the ribbons repeat on every page?", answer: "A ribbon appears wherever a section begins, on any page. If a section continues onto the next page, its entries continue without a second ribbon, so the structure stays clear." },
      { question: "Is the Ribbon template readable by applicant tracking systems?", answer: "The section titles are real text drawn over the coloured band and the body is a single column, so the reading order is straightforward. For a strict portal, the Word download gives the same content with standard headings." },
    ],
  },
  outline: {
    writing: [
      { heading: "Fill the frame, not the margins", text: "Outline encloses your name, title, and contact details in a fine rectangular frame. The frame sizes itself to the content, so four contact items keep it balanced; a long website address can be shortened to the readable path. Your title sits inside the frame too, so keep it to a line." },
      { heading: "Write beneath outlined headings", text: "Each section heading is an outlined box rather than a filled band, which gives structure without weight. The body beneath uses plain typography with bold titles and dates on the right. It rewards precise, factual bullets — scope, action, result — and reads as a document written by someone careful." },
      { heading: "Use the white space for breathing room", text: "Generous spacing between sections is part of the design. If you are over a page by a few lines, the compact spacing option in the editor tightens Outline without losing its character; cutting the weakest bullet from each role is the next step." },
    ],
    choose: "Choose Outline for engineering, administration, finance, operations, and project roles where clear boundaries and restraint reflect how you work. It prints crisply in black and white and keeps a single reading order. If you want the same precision with no boxes at all, Linear is plainer still; if you want structure with more colour, Ribbon fills the section bands and Edge adds a stripe.",
    faqs: [
      { question: "What is inside the frame in the Outline template?", answer: "Your name, professional title, and contact details. Everything else sits beneath it in a single column, with each section heading drawn as an outlined box." },
      { question: "Does the Outline template use colour?", answer: "Only in the frame and heading outlines, which use your accent colour. The default slate grey is close to black and white; a stronger accent makes the boxes more visible without adding fills." },
      { question: "Is Outline a good base for the Word download?", answer: "Yes. Its single column and standard headings translate directly, so the Word version keeps the same order and section names with simple headings in place of the outlined boxes." },
    ],
  },
  editorial: {
    writing: [
      { heading: "Set a name and a title with space between them", text: "Editorial sets your name very large in serif type, then a widely spaced professional title, then a strong accent rule. The title is letter-spaced, so a short one — “Writer”, “Art Director” — looks right; a long one stretches across the page. Contact details follow in a quiet line." },
      { heading: "Order the chapters with intent", text: "Large chapter numbers sit beside each serif section heading and follow the order you set in the editor, skipping empty and hidden sections. The numbers make the sequence feel deliberate, so decide the story: profile, then the work that proves it, then education and the rest." },
      { heading: "Write entries that read like paragraphs", text: "The full-width body and serif headings suit entries with a one-line context and three or four bullets written as complete thoughts. Project entries work especially well for published work, campaigns, or exhibitions: title, publication or client, year, and a bullet on the outcome." },
    ],
    choose: "Choose Editorial for writing, editing, design, communications, and publishing roles where expressive typography is a credential in itself and the CV is likely to be read by a person rather than parsed. The body stays a single column, so it remains clear. If you want the editorial feel with a more compact masthead, Atelier keeps the numbered chapters at a smaller scale; if you need a two-column newspaper feel, Gazette adds a vertical rule and an italic lede.",
    faqs: [
      { question: "How large is the name in the Editorial template?", answer: "It is the largest name setting in the catalogue, in serif type across the top of the first page. A long name wraps to two lines, which the layout handles, but check the preview and consider dropping a middle name." },
      { question: "Do the chapter numbers change when I reorder sections?", answer: "Yes. They are assigned from your section order each time the PDF is generated, counting only sections with content, so reordering or hiding a section renumbers the rest automatically." },
      { question: "Is Editorial too much for a corporate role?", answer: "For most corporate applications, yes — the oversized serif name reads as a creative statement. Regent or Professional carry a serif tone in a more formal frame." },
    ],
  },
  summit: {
    writing: [
      { heading: "Write the band like a nameplate", text: "A solid colour band runs across the top of the first page with your photo or initials beside your name and title in white. The band is the first thing read, so your title should be the role you want. Contact details do not sit in the band; they appear in the tinted side column with small icons, one per line." },
      { heading: "Keep the side column to facts", text: "The tinted column holds contact details, education, skills, and certifications. Icons introduce the contact lines, so a full address is unnecessary — city and country is enough. Skills written as short grouped lines wrap least in the column, and education entries read best with the degree, institution, and dates alone." },
      { heading: "Give the main column the achievements", text: "Your profile, experience, and projects fill the wider main column. With the supporting facts handled on the left, bullets here can concentrate on scope and results. The column continues on later pages alongside the tinted panel, so keep both roughly in step by trimming older roles rather than adding filler to the panel." },
    ],
    choose: "Choose Summit for business, technology, sales, and management applications where you want a confident header, supporting details visible at a glance, and a clean place for achievements, especially when the CV will be read on screen. It uses colour in the band and panel, so check the employer’s expectations before sending to a conservative organisation; Modern offers the same balance without the band, and Clarity keeps the content in a single column for portals.",
    faqs: [
      { question: "What is the difference between Summit and Sidebar?", answer: "Both have a side column for contact details, education, skills, and certifications. Sidebar uses a dark full-height panel with the name in the main column; Summit puts the name in a colour band across the top and keeps the side column lightly tinted with icons beside the contact details." },
      { question: "Which icons appear in the Summit template?", answer: "Small outline icons for email, phone, location, and website beside each contact line in the side column. They are drawn as vector shapes in the PDF, not font characters, so they look the same on every device." },
      { question: "Does the colour band repeat on page two?", answer: "No. The band appears on the first page only; later pages carry the tinted side column and the main column with the same section styling." },
    ],
  },
  compass: {
    writing: [
      { heading: "Fill the icon grid", text: "Compass shows your contact details in a two-column grid with an icon for each — email, phone, location, website. Four items complete the grid; with fewer, a cell stays empty, so include your location and a professional link where you can. Your name and title sit beside the grid, with an optional photo on the right." },
      { heading: "Let each section’s icon do the labelling", text: "Every section opens with a coloured circle containing a simple icon — a briefcase for experience, a graduation cap for education, a wrench for skills — beside its title and a fine rule. Because the icon already signals the section, titles can stay short, and a renamed additional section keeps a generic icon." },
      { heading: "Write a scannable body", text: "The body is a single clean column with bold titles, accent-coloured organisations, and dates on the right. It is built for quick reading, so bullets of one line with a concrete result suit it; a long paragraph under a role slows the page down more than it would in a serif template." },
    ],
    choose: "Choose Compass for client-facing, technology, operations, and early-career roles where a friendly, navigable CV helps a reader find each section at a glance, and where a modern look will not be read as informal. The icons are vector shapes, so they print cleanly. If you want icons only beside contact details, Summit uses them in a side column; if you want the clarity without any icons, Horizon or Outline keep the single column plain.",
    faqs: [
      { question: "Can I change the icons in the Compass template?", answer: "Each section has a fixed icon chosen to match it — briefcase, graduation cap, wrench, speech bubble for languages, folder for projects, award for certifications. The additional section uses a general icon whatever heading you give it." },
      { question: "Are the icons real text or images?", answer: "They are small vector outlines drawn into the PDF, so they scale sharply when printed or zoomed and never depend on a font being installed. The section titles beside them are ordinary selectable text." },
      { question: "Is Compass suitable for a senior role?", answer: "It can be, particularly in technology and product organisations with a modern culture. For a traditional employer, Executive or Professional will read as more established." },
    ],
  },
  halo: {
    writing: [
      { heading: "Centre a photo that will be seen first", text: "Halo places your round photo — or your initials — in a white ring over the lower edge of a colour band, with everything in the header centred beneath it. The photo is the focal point of the first page, so use one with your face centred and an even background. Without a photo, the initials keep the composition balanced." },
      { heading: "Write a centred introduction", text: "Your name, title, and contact details are centred below the ring. Centred text reads best in short lines: a name, a title of a few words, and contact details that fit on one or two lines. Long website addresses can be shortened to their path." },
      { heading: "Keep symmetry in the sections", text: "Each section heading is centred above a fine rule with a small dot at its midpoint, while the entries beneath align left as usual. Headings of one or two words keep the symmetry; a long custom heading sits awkwardly over the centred dot. Later pages carry a slim band at the top so the document stays recognisable." },
    ],
    choose: "Choose Halo when a photo is customary and you want it to be the warm centre of a balanced, symmetrical page — people-facing roles in hospitality, care, retail, teaching, and sales, and applications in countries where a photo is expected. In the UK, Ireland, the US, and Canada, leave the photo out or choose a layout that does not lead with one; Portrait and Monogram are the nearest with a side-set photo, and Horizon keeps it small.",
    faqs: [
      { question: "What appears in the Halo ring if I have no photo?", answer: "Your initials in the ring, in your accent colour, so the header keeps its centred shape. The initials come from the first and last words of your name." },
      { question: "Does the Halo colour band appear on every page?", answer: "The full band with the ring is on the first page. Later pages have a slim strip of the same colour at the top so the document stays consistent without repeating the header." },
      { question: "Can the Halo header be set in a lighter colour?", answer: "Any accent or custom colour works. The white ring keeps the photo separated from the band, and the name beneath stays dark on white, so light and dark accents both read clearly." },
    ],
  },
  clarity: {
    seoTitle: "Clarity: ATS-Friendly CV Template — Free, One Column", h1: "Free Clarity ATS-friendly CV template",
    extra: {
      id: "why-ats", heading: "Why Clarity works as an ATS-friendly CV template",
      paragraphs: [
        "An applicant tracking system reads your CV before a recruiter does. It pulls the text out of the file, sorts it into fields such as job title, employer, dates, and skills, and lets the recruiter search and filter the results. Text inside a graphic, two columns that read across each other, or headings the system doesn't recognise can all leave gaps in your record.",
        "Clarity avoids each of those by design. Every word is real, selectable text in a single column, so a parser reads it top to bottom in the same order you do. Sections use the names most systems look for, dates sit in the same place on every entry, and there are no tables, text boxes, icons, or photo to skip over.",
        "That makes Clarity a sound ATS resume template and a safe ATS CV format, but no layout can promise a result: each employer configures its system differently, and what gets you shortlisted is still the match between your experience and the advert. Check that match with the [resume keyword checker](/resume-keyword-checker/) or the [AI CV job match](/ai-cv-job-match/), and compare Clarity with the other plain layouts in the [ATS-friendly templates collection](/templates/category/ats-friendly/).",
      ],
      bullets: [
        "Copy the text out of your downloaded PDF and paste it into a plain text editor. If it reads in the right order there, a parser will read it in that order too.",
        "Name the file plainly, for example Firstname-Lastname-CV.pdf, so it stays recognisable in a recruiter's downloads.",
        "Use the advert's own job title in your profile when it accurately describes you; many recruiters search by title first.",
      ],
    },
    writing: [
      { heading: "Use the standard headings as they are", text: "Clarity names sections the way application systems expect — Professional summary, Work experience, Education, Skills — in one column with no panels, icons, or photo. The additional section can still be renamed; keep its heading conventional too, such as “Volunteering” or “Awards”, so a parser can file it." },
      { heading: "Write for a machine and a person", text: "Put the job title, employer, and dates in their own fields rather than combining them in the title, so each lands in the right place when a portal extracts them. Then write bullets for the person who reads the result: a strong verb, the task, and a measurable outcome, with the advert’s own terms where they are true of you." },
      { heading: "Make the plainness look intentional", text: "With no decoration, consistency is the design. Use the same date format throughout, the same bullet length, and a profile of three sentences. The balanced spacing option keeps it readable; compact fits a longer history into two pages without changing the structure." },
    ],
    choose: "Choose Clarity whenever an application goes through an online portal or applicant tracking system, when the employer asks for a simple CV, and for conservative industries where any graphic would be a distraction. It is the safest template in the catalogue for parsing and the cleanest base for a Word download. If you want a plain layout with a little more typographic presence for a human reader, Linear adds weight to the name and Outline adds light structure.",
    faqs: [
      { question: "Is Clarity the most ATS-friendly template?", answer: "It is designed for that: one column, standard section names, selectable text in reading order, and no tables, columns, icons, or photo. No template can guarantee how a specific system reads a file, so follow the employer’s format instructions and review any fields a portal fills in." },
      { question: "Can I add colour to the Clarity template?", answer: "The headings take your accent colour if you set one, and the default is near-black. Keep it dark for portals and printing — the point of Clarity is that nothing competes with the text." },
      { question: "Should I upload the PDF or the Word version from Clarity?", answer: "Use the format the employer asks for. Both carry the same content and headings. If the portal accepts either, the PDF keeps the layout exactly; the Word file is useful when a recruiter needs to edit or when DOCX is required." },
    ],
  },
  prism: {
    writing: [
      { heading: "Write a short header for the angle", text: "Prism sets your name and title in white on an angled colour header that slopes from left to right, with a lighter facet along its edge. The sloping edge means the right side of the header is shallower, so a long title may be clipped by the angle in the preview; keep it to a few words. Contact details sit below the header on white." },
      { heading: "Let the slanted markers lead", text: "Each section starts with a small slanted colour marker and a fine rule. The markers echo the header’s angle, so the page feels consistent even though the body is a conventional single column. Short section titles keep the row balanced; the additional section’s custom heading should be short too." },
      { heading: "Keep later pages in mind", text: "Pages after the first carry a slim angled strip rather than the full header, so a two-page CV keeps its identity without losing space. Put your strongest role on page one beneath the header, and let education and certifications close page two." },
    ],
    choose: "Choose Prism for marketing, design, technology, and start-up roles where an energetic first page is welcome and the reader will be a person, not a portal. The body is clear and the colour is confined to the header and markers, so it prints reasonably. If you want geometry with less commitment, Corner keeps the shapes in one corner; if you want a soft curve rather than a sharp angle, Tide uses a wave header with the same structure beneath.",
    faqs: [
      { question: "Will my name fit in the angled Prism header?", answer: "The header auto-sizes the name to fit on one line, so long names are set slightly smaller rather than wrapping. The professional title beneath it should stay short because the angle leaves less room on the right." },
      { question: "Does the angled header repeat on every page?", answer: "No. Later pages have a slim angled strip at the top in the same colour, which keeps the look while leaving the page free for content." },
      { question: "Does Prism support a photo?", answer: "No. The angled header is the visual focus, and there is no photo placement. Tide offers a similar modern header shape with an optional round photo." },
    ],
  },
  gazette: {
    writing: [
      { heading: "Write a profile that works as a lede", text: "Gazette opens your profile as an italic lede across the full width beneath the masthead, like the first paragraph of an article. It should read as one flowing paragraph of two or three sentences — who you are, what you cover, and what you are looking for — rather than a list of attributes. A profile written as fragments looks odd in italic." },
      { heading: "Give the masthead a dateline", text: "Your name sits large in serif type between a heavy rule and a fine one, with your contact details set as a dateline beneath. Four short items fit the dateline; a long website address can be trimmed to its path. Your professional title appears with the name, so keep it to a few words." },
      { heading: "Balance the two columns", text: "Experience and projects run in the wide left column; education, skills, and certifications sit to the right of a fine vertical rule. The right column is narrow, so write skill groups of four or five items and keep degree names brief. If the right column is empty, the left column uses the full width." },
    ],
    choose: "Choose Gazette for journalism, writing, editing, communications, publishing, and media roles where a newspaper-style typographic CV shows an understanding of the craft, and for anyone who wants a serif two-column layout with personality. The two columns and italic lede suit a human reader rather than a parser. If you need the serif tone in one column, Editorial and Atelier keep the editorial masthead; for a two-column layout in sans-serif, Modern is the plain equivalent.",
    faqs: [
      { question: "What goes in each column of the Gazette template?", answer: "The wide left column holds your experience and projects, under the italic lede. The right column, separated by a fine vertical rule, holds education, skills, and certifications. Languages and the additional section stay in the left column." },
      { question: "Why is my profile in italic in Gazette?", answer: "The profile is set as a newspaper lede — an italic opening paragraph across the full width. Write it as a flowing paragraph and it reads naturally; it is the template’s signature feature." },
      { question: "Is Gazette suitable for an online application portal?", answer: "Its two columns and italic lede are designed for a human reader. For a portal, download the Word version, which puts the same content in one column, or switch to Clarity for that application." },
    ],
  },
  heritage: {
    writing: [
      { heading: "Write a name for spaced capitals", text: "Heritage sets your name in widely spaced serif capitals above a small diamond ornament, with an italic title and a centred contact line. Spaced capitals take room, so a long name wraps to two lines; that still looks balanced inside the frame, but a middle name can be dropped. The italic title suits a formal role title." },
      { heading: "Lead with the institution", text: "Like the other traditional templates, Heritage puts the employer or institution first and the role beneath it. The double frame and ornaments give every page a formal setting, so the content should match: full organisation names, exact qualifications, and dates as years or month and year." },
      { heading: "Let the frame hold the page", text: "The double-ruled frame appears on every page, with a little less text width inside it than an unframed template. Aim for three bullets per role and a profile of three sentences; if you are over, the compact spacing option tightens the page without touching the frame." },
    ],
    choose: "Choose Heritage for law, finance, academia, hospitality, and the arts when a traditional document with a crafted, distinguished finish fits both the role and the organisation — a barristers’ chambers, a private bank, a heritage institution. It prints beautifully and reads as serious. If you want the serif formality without the frame and ornaments, Classic and Academic are plainer; if you want formality with a modern typeface, Regent is the bridge.",
    faqs: [
      { question: "Does the frame in the Heritage template print on every page?", answer: "Yes. The double-ruled frame borders every page, and the diamond ornaments mark the name and each section title, so a two-page CV looks like a matched pair." },
      { question: "Can I use a modern colour with Heritage?", answer: "The frame, ornaments, and headings take your accent colour. The default is a warm bronze; charcoal and burgundy keep the traditional feel, while teal or cobalt look unexpectedly fresh. Light colours are darkened to stay readable." },
      { question: "Is Heritage readable by applicant tracking systems?", answer: "The text is a single column in reading order, with the frame drawn as lines rather than a table, so it generally parses. For a strict portal, Clarity or the Word download is the safer route." },
    ],
  },
  ledger: {
    writing: [
      { heading: "Write labelled contact details", text: "Ledger labels your contact details — Email, Phone, Location, Web — to the right of the vertical rule, so enter just the values. The labels and the rule give the header a form-like clarity that suits the European CV convention of showing details in a consistent place." },
      { heading: "Keep the right-aligned labels short", text: "Section labels sit right-aligned to the left of one continuous vertical rule that runs from your name to your last entry. The label column is narrow, so one- or two-word titles align neatly; a long custom heading for the additional section wraps into several lines against the rule." },
      { heading: "Let the rule carry the reader down", text: "Everything on the right of the rule is in one column: profile, entries with bold titles and right-edge dates, grouped skills. The continuous line makes gaps visible, so keep spacing even by giving each role two to four bullets and avoiding a single long paragraph in the middle of the page." },
    ],
    choose: "Choose Ledger for applications in Germany, the Netherlands, Scandinavia, Switzerland, and international organisations where an orderly, form-like CV is the norm, and for anyone who likes a structure that is easy to compare across candidates. It prints lightly and reads in one column. If you want the labelled structure with a stronger grid, Swiss uses heavy rules; if you want the labels without the vertical line, Minimal places them in a quiet rail.",
    faqs: [
      { question: "Why are the section labels on the left of the line in Ledger?", answer: "Ledger follows the orderly style common in continental European CVs: labels right-aligned beside a continuous vertical rule, with the content to the right. It makes each section easy to find at a glance." },
      { question: "Does Ledger show a photo?", answer: "No. Although photos are common on CVs in some European countries, Ledger has no photo placement. Halo, Portrait, and Aurora are the nearest layouts with a photo." },
      { question: "Can I use Ledger for a UK or US application?", answer: "Yes. The structure is simply a labelled single column, which reads naturally anywhere. Keep the dates in the format the employer expects and the rest needs no change." },
    ],
  },
  mosaic: {
    writing: [
      { heading: "Fill the contact tiles", text: "Mosaic places your contact details in a row of tinted tiles beneath your name. Each tile holds one item, so four items — email, phone, location, website — give an even row. Tile text is small, so a long email address or website is better shortened than wrapped." },
      { heading: "Write for equal-height tiles", text: "Education, skills, and certifications share a row of equal-height tiles, positioned where the first of them appears in your section order. Because the tiles match in height, the longest one sets the row: keep each to a similar length, with skills as three or four grouped lines and education as degree, institution, and dates." },
      { heading: "Give experience the full width", text: "Experience and projects run full width with small tiled markers, so they read like any clear single-column CV. Place them above the tile row if your experience is the story, or below it if your qualifications matter more — the section order is yours." },
    ],
    choose: "Choose Mosaic for technology, product, design, and business roles where a modern, modular page that is quick to scan on screen will land well, and where you want key details grouped in tiles without a full side column. The tints are light, so it prints economically. If you want skills shown as tags rather than tiles, Tech does that; if you want a side column that runs the length of the page, Summit or Atlas are the next step.",
    faqs: [
      { question: "Where do the tiles appear in the Mosaic template?", answer: "The contact tiles sit under your name. The education, skills, and certifications tiles form one row placed where the first of those three sections appears in your section order, so moving Skills to the top moves the whole row up." },
      { question: "What if I only have one of education, skills, or certifications?", answer: "The row shows only the sections with content, so a single tile spans the width. Two tiles share the row equally." },
      { question: "Are the Mosaic tiles tables?", answer: "No. They are tinted boxes drawn behind ordinary text, and the text order follows your section order. For a portal that struggles with boxes, the Word download provides the same content with simple headings." },
    ],
  },
  tide: {
    writing: [
      { heading: "Write a header for the wave", text: "Two overlapping waves of colour form Tide’s header, with your name and title in white and an optional round photo on the right. The name auto-sizes to fit one line; the title beneath should be a few words so it sits comfortably above the wave’s curve. Contact details follow on white below the header." },
      { heading: "Keep the wave markers clear", text: "Each section title carries a small wave and a fine rule. The marker is the only decoration in the body, so the page stays calm; short titles leave the rule room to run. The body itself is a conventional single column with bold titles, accent-coloured organisations, and dates on the right." },
      { heading: "Plan for a slim wave on page two", text: "Later pages keep a slim wave at the top, so a two-page CV stays recognisable without the full header. Put the roles that matter most on page one and let education, certifications, and interests complete page two." },
    ],
    choose: "Choose Tide for education, healthcare, hospitality, wellbeing, and creative roles where a friendly, contemporary first impression suits the work and a photo may be welcome. The colour is confined to the header, so it prints without heavy ink. If you want a sharper geometric header, Prism angles it; if you prefer soft colour without a wave, Aurora uses layered arcs in a tinted header and Horizon keeps the tint plain.",
    faqs: [
      { question: "Does the Tide template work without a photo?", answer: "Yes. Without a photo, the wave header simply holds your name and title with more room. Add one under Personal details and it appears as a circle on the right of the header." },
      { question: "Can I change the wave colour?", answer: "Any accent or custom colour recolours both wave layers — the second is a lighter tint of the first — and the section markers. The default teal is calm; plum or terracotta make it warmer." },
      { question: "Is Tide suitable for a conservative employer?", answer: "The wave header reads as friendly and modern, which suits many care, education, and service roles. For law, finance, or the civil service, a plainer template such as Clarity or Professional is the safer choice." },
    ],
  },
  edge: {
    writing: [
      { heading: "Write a name the line can reach", text: "A solid stripe runs down the left edge of every page, and a heavy line extends from it to your name, so the name is read as the first stop on the stripe. Set it with your title beneath and a single contact line; the header is deliberately compact so the stripe and lines do the work." },
      { heading: "Keep the section titles in uppercase and short", text: "Finer lines reach from the stripe to each uppercase section title. Short titles keep the lines consistent down the page; a long custom heading breaks the rhythm. The additional section’s heading should be a word or two for the same reason." },
      { heading: "Use accent bullets with care", text: "Bullets take the accent colour, which gives each line a small anchor against the stripe. Three or four bullets per role, each starting with a verb, suit the architectural tone; long paragraphs soften it. Dates sit on the right, away from the stripe, so keep them short." },
    ],
    choose: "Choose Edge for engineering, architecture, consulting, construction, and business roles where one strong graphic idea signals confidence and precision without decoration. The stripe is the only colour and it prints as a narrow band, so it is economical. If you want the lines without a stripe on every page, Swiss and Outline rely on rules alone; if you want the stripe to carry the whole header, Executive and Bold use bands and tabs instead.",
    faqs: [
      { question: "Does the colour stripe appear on every page of the Edge template?", answer: "Yes. The stripe runs down the left edge of every page, and lines connect it to your name on the first page and to each section title wherever it falls." },
      { question: "How wide is the stripe, and does it reduce the text width?", answer: "It is a narrow band in the left margin, with the text starting a little further in than on an unframed template. The reduction is small, so bullets wrap only slightly sooner." },
      { question: "Can I use Edge in black and white?", answer: "Choose charcoal as the accent and the stripe, lines, and bullets become dark grey, which prints cleanly in mono while keeping the structure." },
    ],
  },
  signature: {
    writing: [
      { heading: "Write a name that suits italic", text: "Signature sets your name in a large italic serif, like a signature, with your title in spaced capitals beneath and your contact details right-aligned beside it. Italic serif favours a name of two or three words; the spaced-capital title should be short — “Account Director”, “Pastry Chef”. Contact details stack on the right, so four short items look tidiest." },
      { heading: "Pair italic titles with a plain body", text: "Section titles repeat the italic serif above light rules, but the body is a clean sans-serif with italic dates. That contrast means the body can be direct and factual — bold titles, concise bullets, numbers — and the headings supply the warmth." },
      { heading: "Use the dates as part of the style", text: "Dates are italic and sit on the right of each entry, so they are part of the typography rather than an afterthought. Use a consistent short form, such as “Jun 2021 – Present”, and the right edge reads as a neat column down the page." },
    ],
    choose: "Choose Signature for client-facing, creative, hospitality, and senior support roles where an elegant, personal CV that still feels modern will suit both you and the reader. It prints lightly and has no photo or colour block. If you want the elegance with a monogram or photo, Elegant adds one above spaced capitals; if you want the serif headings over a more formal body, Regent and Professional are the next choices.",
    faqs: [
      { question: "Is the italic name in the Signature template a handwriting font?", answer: "No. It is a large italic serif, the same typeface used for the section titles, so it reads as elegant rather than decorative and prints cleanly at any size." },
      { question: "Can I change the green accent in Signature?", answer: "Yes. The default forest green colours the name and headings; bronze, plum, or charcoal change the mood while the sans-serif body stays dark." },
      { question: "Does Signature support a photo?", answer: "No. The italic name is the header’s focus and there is no photo placement. Elegant offers a similar refined style with a round photo or initials above the name." },
    ],
  },
  linear: {
    writing: [
      { heading: "Let the name be the only emphasis", text: "Linear opens with a bold left-aligned name and a single contact line, then standard section labels in dark text. There is nothing else in the header, so the name and your professional title carry the first impression — make the title the role you want, written plainly." },
      { heading: "Write entries for a plain reading order", text: "Every entry follows the same pattern: bold title, organisation, dates on the right, then bullets. With no decoration, the writing is what the reader notices, so keep bullets parallel — each starting with a verb, each ending with a result — and the dates in one consistent format." },
      { heading: "Use the full width well", text: "With no rail, panel, or frame, Linear gives the whole page width to your text, which suits longer bullets and a two-paragraph profile if you need one. It also makes a short CV look sparse, so a first CV with little content may sit better in Student, which adds light section bands." },
    ],
    choose: "Choose Linear when you want a straightforward, text-first CV for online applications, technical roles, administration, or any employer who asks for a simple format, and when you want the most width for your writing. It is one of the two templates built specifically for application systems. Clarity is its sibling with standard section names and an even plainer header; if you want a little visible structure without leaving the single column, Outline and Minimal add it lightly.",
    faqs: [
      { question: "How does Linear differ from Clarity?", answer: "Both are plain single columns built for online applications. Linear gives the name more weight and uses the catalogue’s usual section labels; Clarity uses the most standard names — Professional summary, Work experience — and keeps the header to a single line. Either is a safe choice for a portal." },
      { question: "Can I add colour to the Linear template?", answer: "The headings take your accent colour if you set one; the default is a dark slate that reads as black. Keep it dark for application systems and printing." },
      { question: "Is Linear suitable for a long, detailed CV?", answer: "Yes. The full-width column and plain headings suit several pages of detail, and the Word download keeps the same structure if an employer needs an editable file." },
    ],
  },
  aurora: {
    writing: [
      { heading: "Write a header for soft colour", text: "Aurora tints the introduction softly and layers colour arcs in its upper corner, keeping your name, title, and contact details on the left with an optional photo on the right. The tint is light and the arcs sit away from the text, so a long name is fine. Choose a title that matches the calm tone — a role rather than a slogan." },
      { heading: "Pace the body with the round markers", text: "Each section opens with a small round marker in your accent colour. The markers are quiet, so the single column reads evenly whether a section is long or short. Keep titles brief and entries consistent: bold title, organisation, dates on the right, two to four bullets." },
      { heading: "Choose a colour that suits a tint", text: "Because the header is a tint of your accent and the arcs are layered tints too, the colour you choose matters more here than in a template with one solid band. Teal, plum, and cobalt make soft, contemporary headers; very dark accents produce a greyer tint." },
    ],
    choose: "Choose Aurora for product, communications, hospitality, and client-facing roles where a softer contemporary style and an optional photo suit the work, and where you want colour without a solid block. It prints lightly. If you want a modern header with a clearer shape, Tide uses waves and Prism angles; if you want the tinted header with no decoration at all, Horizon is the plainest of the three.",
    faqs: [
      { question: "What are the arcs in the Aurora header?", answer: "Layered arcs in tints of your accent colour, drawn in the upper corner of the softly tinted introduction. They are decoration behind the header, not a photo frame, and they stay clear of your name and contact details." },
      { question: "Where does the photo appear in Aurora?", answer: "On the right of the header as a circle, if you add one under Personal details. Without a photo the header holds just your name, title, and contact details, with the arcs in the corner." },
      { question: "Is Aurora suitable for printing in black and white?", answer: "Yes. The tint prints as a light grey and the arcs as faint shapes, with dark text throughout, so the document stays readable." },
    ],
  },
  atelier: {
    writing: [
      { heading: "Set a short title under the masthead", text: "Atelier opens with an oversized italic serif name over a bold rule and a compact contact row. The row holds four items comfortably in small type, so include email, phone, location, and a portfolio link. Your professional title sits with the name; keep it to a few words so the masthead stays clean." },
      { heading: "Order the numbered chapters", text: "Large, pale chapter numbers sit beside sans-serif section labels and follow your section order, skipping empty sections. The numbering invites a sequence, so decide what the reader should meet first — for a designer, perhaps projects before experience." },
      { heading: "Write entries with room for specifics", text: "Experience is a full-width single column, which gives each bullet room for a specific achievement: the client, the deliverable, and the result. Project entries work well for portfolio pieces, with the organisation field holding the client or a link." },
    ],
    choose: "Choose Atelier for design, architecture, writing, and creative-direction roles where a considered editorial document with strong typographic contrast reflects your craft, and the CV will be read by a person. Its body is conventional, so it stays readable. If you want the numbered chapters at a larger scale, Editorial goes bigger; if you want serif warmth in a more conventional frame, Creative uses numbered italic headings with a smaller name.",
    faqs: [
      { question: "What is the difference between Atelier and Editorial?", answer: "Both use numbered sections and a serif masthead. Editorial sets the name at the largest size in the catalogue with serif section headings; Atelier keeps the name a little smaller in italic over a bold rule, with pale chapter numbers beside sans-serif labels, which gives it more contrast and a slightly more compact first page." },
      { question: "Can I reorder the chapters in Atelier?", answer: "Yes. The numbers follow the section order you set under Templates & layout and skip hidden or empty sections, so the sequence is always yours." },
      { question: "Does Atelier support a photo?", answer: "No. The masthead is typographic and there is no photo placement. For a creative layout with a photo, Portrait or Tide are the nearest." },
    ],
  },
  regent: {
    writing: [
      { heading: "Write a nameplate in capitals", text: "Regent centres your name in uppercase serif with your professional title beneath, then frames the contact row in a fine rectangle. Uppercase takes width, so a long name sets a little smaller; the title should be a formal role title. Four contact items fill the framed row evenly." },
      { heading: "Use small capitals as section labels", text: "Section titles are set in small capitals with short accent rules, which keeps them quiet and even. Titles of one or two words look best; a long custom heading in small capitals runs across the page. Entries beneath follow one familiar reading order with the role first." },
      { heading: "Write with restraint", text: "Regent’s tone is composed, and the content should match: a profile of three measured sentences, bullets that state scope and outcome without superlatives, and dates in a consistent short form. It suits a CV of two pages with five or six substantial sections." },
    ],
    choose: "Choose Regent for consulting, education leadership, professional services, and established organisations where a formal document is expected but you prefer the role, not the employer, to lead each entry. It prints cleanly and reads as serious without feeling old-fashioned. If you want the employer-first convention, Classic and Professional provide it; if you want more presence on the first page, Executive adds a colour band.",
    faqs: [
      { question: "What is the frame around the contact details in Regent?", answer: "A fine rectangular rule that encloses the contact row beneath your name, giving the nameplate a finished edge. It sizes itself to the contact details you enter." },
      { question: "Does Regent put the job title or the employer first?", answer: "The job title. Unlike Classic, Professional, Academic, and Heritage, which lead with the organisation, Regent shows your role in bold and the employer beneath it, which many readers find quicker to scan." },
      { question: "Which accent colours suit Regent?", answer: "The default navy keeps it formal; charcoal, forest, and burgundy also work well. The accent appears in the short rules beneath the small-capital section titles and in the headings." },
    ],
  },
};
