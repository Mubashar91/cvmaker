import { templates, type Template } from "./model";

interface TemplateCollection {
  slug: string; name: string; title: string; description: string; intro: string;
  templates: readonly Template[];
  advice: { heading: string; text: string }[];
  checklist: string[];
}

export const templateCollections: readonly TemplateCollection[] = [
  {
    slug: "ats-friendly", name: "ATS-friendly", title: "Free ATS-Friendly CV & Resume Templates",
    description: "Choose a plain, single-column CV for online applications. Compare free templates with standard headings and selectable PDF text, then edit and download.",
    intro: "When an employer uses an applicant tracking system, a straightforward document is a sensible starting point. These templates keep your contact details and experience in one reading order, use familiar headings, and export real, selectable text.",
    templates: ["linear", "clarity", "compact", "professional", "classic", "student"],
    advice: [
      { heading: "Keep the reading order straightforward", text: "Start with Linear or Clarity when an application asks for a simple CV. Both avoid side columns and decorative text containers. Put your job title, employer, and dates together, and use familiar labels such as Work experience, Education, and Skills." },
      { heading: "Check the employer’s instructions first", text: "Application systems differ. A template cannot guarantee a successful parse or a shortlist. If the employer requests DOCX, use that format rather than uploading a PDF. For a PDF application, select and copy text from your downloaded file to check its order, then review any fields the application fills automatically." },
      { heading: "Make relevant experience easy to find", text: "Use the employer’s terminology for skills you actually have, and support them with examples in your experience or projects. Avoid repeating keywords without context. The Review CV tab helps you check missing contact details and incomplete entries before downloading." },
    ],
    checklist: ["Follow the requested file format.", "Use standard section headings and one clear reading order.", "Include job titles, organisations, and dates as text.", "Review extracted application fields before submitting."],
  },
  {
    slug: "professional", name: "Professional", title: "Free Professional CV Templates",
    description: "Find a professional CV template for business, consulting, management, or administration. Compare formal layouts, customise your details, and download free.",
    intro: "A professional CV puts the evidence first: a clear introduction, identifiable roles, and specific achievements. This collection pairs restrained typography with formal layouts for applications where a composed presentation makes sense.",
    templates: ["regent", "professional", "executive", "classic", "signature", "ledger", "heritage", "elegant"],
    advice: [
      { heading: "Choose a structure that fits your experience", text: "Professional and Regent give you a traditional single column. Executive uses a stronger introduction, while Ledger places section labels in a separate rail. Compare the actual previews and choose the document that makes your recent, relevant experience easiest to follow." },
      { heading: "Give achievements useful context", text: "For each role, explain what you did and the outcome you contributed to. Mention scope, responsibility, or reliable figures when they help. Keep claims accurate, distinguish your contribution from a team result, and avoid including confidential client information." },
      { heading: "Keep the presentation consistent", text: "Use one date format throughout, check organisation names, and give comparable roles a similar structure. A single accent colour and balanced spacing are usually enough. Review every PDF page after the final edit to catch awkward breaks or overly dense paragraphs." },
    ],
    checklist: ["Lead with recent experience relevant to the application.", "Keep employer names, titles, and dates consistent.", "Support broad claims with specific contributions.", "Check every page before sending."],
  },
  {
    slug: "modern", name: "Modern", title: "Free Modern CV Templates",
    description: "Explore free modern CV templates with clean typography, colour accents, and optional photos. Compare single and two-column layouts and download a PDF.",
    intro: "Modern can still be easy to read. These layouts use deliberate spacing, a clear hierarchy, and restrained colour to introduce your experience, with choices ranging from a soft single-column header to a structured two-column page.",
    templates: ["aurora", "summit", "modern", "horizon", "monogram", "compass", "atlas", "mosaic"],
    advice: [
      { heading: "Decide what belongs together", text: "A single column such as Aurora or Horizon keeps all sections in one sequence. Modern, Summit, and Atlas place supporting information alongside your experience. Two columns can make skills easy to find, but follow application instructions when an employer needs a plain format." },
      { heading: "Use colour with a purpose", text: "Choose one accent that makes headings easy to recognise without competing with the content. Folio’s presets work on white paper, and custom colours are adjusted for readable contrast. Preview the actual PDF rather than choosing from a thumbnail alone." },
      { heading: "Treat a photo as optional", text: "Several modern designs have space for a photo, but a good CV does not depend on one. Consider the employer’s instructions and local conventions. Photo layouts still work without an uploaded image, and your photograph is prepared on your device." },
    ],
    checklist: ["Choose one or two columns deliberately.", "Use a consistent accent and readable text size.", "Keep the profile focused on the opportunity.", "Confirm the layout still reads clearly across multiple pages."],
  },
  {
    slug: "simple", name: "Simple", title: "Free Simple CV Templates",
    description: "Create a clean CV with free simple templates. Compare minimal layouts, clear headings, and compact spacing, then edit online and download without a watermark.",
    intro: "A simple CV leaves room for the work itself. This collection keeps decoration restrained, so names, roles, qualifications, and skills are easy to locate. Choose a plain structure or a quiet typographic detail that suits your information.",
    templates: ["linear", "clarity", "minimal", "compact", "tech", "outline", "swiss", "student"],
    advice: [
      { heading: "Simple layouts still have different reading orders", text: "Linear and Clarity use a conventional single column. Minimal places short section labels to the left, while Swiss uses a stronger grid. If your priority is a plain online application, start with Linear; if a person will read the PDF directly, compare the quieter visual alternatives too." },
      { heading: "Edit the content before shrinking the type", text: "Remove repeated statements and shorten older, less relevant roles before choosing compact spacing. A CV does not need every task you have ever done. Keep the examples that help the reader understand why you fit this particular opportunity." },
      { heading: "Use the preview to choose the density", text: "Balanced spacing is a useful starting point. Compact fits more information; Airy gives short documents more room. Longer CVs can continue onto additional pages, so you do not have to force a detailed career into unreadably small text." },
    ],
    checklist: ["Remove repeated or irrelevant information.", "Use a familiar heading for each section.", "Check that the body text remains comfortable to read.", "Leave enough space to distinguish one role from the next."],
  },
  {
    slug: "student", name: "Student & first job", title: "Free Student & Graduate CV Templates",
    description: "Simple, free student CV templates for school leavers and fresh graduates. Put education, projects, and volunteering first, even without paid experience.",
    intro: "You can write a useful first CV before your first paid role. Start with your education and the things you have made, learned, organised, or supported. These templates give early-career applicants a clear structure without pretending to have a longer work history.",
    templates: ["student", "linear", "clarity", "academic", "compact", "aurora"],
    advice: [
      { heading: "Put your strongest evidence near the top", text: "If your education is most relevant, move it above work experience in the layout settings. Include the qualification, institution, dates, and selected modules or coursework that relate to the application. Leave out grades if they do not help or are not requested." },
      { heading: "Use projects and volunteering as evidence", text: "A group assignment, personal website, society event, or volunteering role can show what you can do. Explain your own contribution, the skills you used, and the outcome. Name a project accurately instead of presenting it as paid employment." },
      { heading: "Keep empty sections out of the way", text: "You do not need to fill every section. Folio leaves empty sections out of the PDF, and you can hide sections you do not need. A concise CV with accurate details is more useful than padding the document with unsupported claims." },
    ],
    checklist: ["Use an email address you check regularly.", "Include relevant education and projects.", "Explain your part in group or volunteer work.", "Hide sections you do not need."],
  },
  {
    slug: "with-photo", name: "With a photo", title: "Free CV Templates with a Photo",
    description: "Explore free CV templates with an optional profile photo. Crop your image privately in your browser, choose a layout, and download a PDF without a watermark.",
    intro: "If a photo is appropriate for your application, choose a template with a deliberate place for it. Every design here supports an optional circular portrait, prepared locally in your browser and included in your downloaded PDF.",
    templates: templates.filter(template => template.photo).map(template => template.id),
    advice: [
      { heading: "Check whether a photo belongs in the application", text: "Expectations differ between countries, employers, and industries. Read the vacancy instructions before adding one. You can use the editor without a photo, and removing an image does not remove your written details." },
      { heading: "Choose a layout that suits the image", text: "Aurora pairs a photo with a soft introduction. Portrait and Halo give it a centered position, while Sidebar and Atlas place it with supporting information. Compare the full-size examples before choosing how prominent the image should be." },
      { heading: "Review the crop at document size", text: "Use a clear image with your face near the centre and enough room around it for a circular crop. The editor accepts PNG, JPEG, or WebP and prepares the image on your device. Check the live PDF preview and remove or replace the photo if the crop cuts off an important detail." },
    ],
    checklist: ["Follow employer instructions and local conventions.", "Choose a clear image with room for a circular crop.", "Check the photo in the actual PDF preview.", "Keep the experience readable without relying on the image."],
  },
];

export function collectionPath(slug: string) { return `/templates/category/${slug}/`; }
