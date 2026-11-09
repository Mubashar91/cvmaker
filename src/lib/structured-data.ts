import { templates, type Template } from "./model";
import { templateDetails } from "./template-details";
import { collectionPath, type templateCollections } from "./template-collections";
import { informationPage, siteOperator, type InformationPath } from "./site-info";
import { absoluteUrl, CONTENT_UPDATED, DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "./seo";
import type { tips } from "./tips";
import type { CVExample } from "./cv-examples";
import { plainText } from "./rich-text";

/** Only for questions and answers that are visible on the same page. */
export function faqSchema(faqs: readonly { question: string; answer: string }[]) {
  if (!SITE_URL || !faqs.length) return undefined;
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: plainText(faq.answer) } })) };
}

/** A free browser tool page: the tool runs on the page itself. */
export function toolSchema({ path, name, description, featureList }: { path: string; name: string; description: string; featureList: string[] }) {
  if (!SITE_URL) return undefined;
  return {
    "@context": "https://schema.org", "@type": "WebApplication", "@id": absoluteUrl(`${path}#app`), name, url: absoluteUrl(path), description,
    applicationCategory: "BusinessApplication", operatingSystem: "Web browser", browserRequirements: "Requires JavaScript and a modern web browser",
    isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, featureList, inLanguage: "en",
    isPartOf: { "@id": absoluteUrl("/#website") }, creator: { "@id": absoluteUrl("/#organization") },
  };
}

/** A hub page that lists other pages on the site. */
export function collectionPageSchema({ path, name, description, items }: { path: string; name: string; description: string; items: { name: string; path: string }[] }) {
  if (!SITE_URL) return undefined;
  return {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": absoluteUrl(`${path}#page`), name, url: absoluteUrl(path), description,
    isPartOf: { "@id": absoluteUrl("/#website") }, inLanguage: "en", dateModified: CONTENT_UPDATED,
    mainEntity: { "@type": "ItemList", numberOfItems: items.length, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: absoluteUrl(item.path) })) },
  };
}

export const CV_EXAMPLES_DESCRIPTION = "Free CV examples for real jobs, from nurse and teacher to software developer. Each has profile examples, bullet points, skills, and a template to edit.";

const sameAs = () => (siteOperator.profiles.length ? { sameAs: [...siteOperator.profiles] } : {});
const organization = () => ({ "@type": "Organization", "@id": absoluteUrl("/#organization"), name: SITE_NAME, url: absoluteUrl("/"), logo: { "@type": "ImageObject", url: absoluteUrl("/apple-touch-icon.png"), width: 180, height: 180 }, contactPoint: { "@type": "ContactPoint", contactType: "website support", email: siteOperator.email, url: absoluteUrl("/contact/") }, founder: { "@id": absoluteUrl("/about/#maintainer") } });
const person = () => ({ "@type": "Person", "@id": absoluteUrl("/about/#maintainer"), name: siteOperator.name, jobTitle: siteOperator.role, url: absoluteUrl("/about/"), ...sameAs() });

export function informationPageSchema(path: InformationPath) {
  if (!SITE_URL) return undefined;
  const page = informationPage(path);
  const base = { "@context": "https://schema.org", "@type": path === "/about/" ? "AboutPage" : path === "/contact/" ? "ContactPage" : "WebPage",
    "@id": absoluteUrl(`${path}#page`), url: absoluteUrl(path), name: page.title, description: page.description,
    inLanguage: "en", dateModified: CONTENT_UPDATED, isPartOf: { "@id": absoluteUrl("/#website") }, publisher: organization() };
  if (path === "/about/") return { "@context": "https://schema.org", "@graph": [
    { ...base, mainEntity: { "@id": absoluteUrl("/about/#maintainer") }, about: { "@id": absoluteUrl("/#organization") } },
    { ...person(), description: "Frontend developer based in Pakistan, maintainer of Folio CV Maker, and author of its CV writing guides.",
      knowsAbout: [...siteOperator.skills, "CV writing", "Résumé design"], alumniOf: { "@type": "CollegeOrUniversity", name: siteOperator.university } },
  ] };
  if (path === "/contact/") return { ...base, mainEntity: { "@type": "ContactPoint", email: siteOperator.email, contactType: "website support", url: absoluteUrl(path) } };
  return base;
}

export function websiteSchema() {
  if (!SITE_URL) return undefined;
  return { "@context": "https://schema.org", "@graph": [
    organization(),
    { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: SITE_NAME, url: absoluteUrl("/"), description: DEFAULT_DESCRIPTION, inLanguage: "en", publisher: { "@id": absoluteUrl("/#organization") } },
    { "@type": "WebApplication", "@id": absoluteUrl("/#app"), name: "Folio CV Maker", url: absoluteUrl("/"), description: DEFAULT_DESCRIPTION, image: absoluteUrl("/social/folio.png"), applicationCategory: "BusinessApplication", operatingSystem: "Web browser", browserRequirements: "Requires JavaScript and a modern web browser", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@id": absoluteUrl("/#organization") }, featureList: ["PDF and DOCX import", `${templates.length} professional CV templates`, "Optional profile photo", "Live PDF preview", "Typeface and spacing controls", "Ten accent colours or your own", "Languages and custom sections", "CV review checks and plain-text export", "Free multi-page PDF downloads", "Local browser drafts", "Free cover letter maker", "Resume keyword checker", "No account required"] },
  ] };
}

export function templateSchema(id: Template) {
  if (!SITE_URL) return undefined;
  const template = templates.find(item => item.id === id)!;
  return {
    "@context": "https://schema.org", "@type": "CreativeWork", "@id": absoluteUrl(`/templates/${id}/#template`),
    name: `${template.name} CV template`, description: templateDetails[id].description,
    url: absoluteUrl(`/templates/${id}/`), image: absoluteUrl(`/templates/${id}.webp`),
    genre: `${template.style} CV template`, inLanguage: "en", isAccessibleForFree: true,
    creator: organization(), dateModified: CONTENT_UPDATED,
    potentialAction: { "@type": "CreateAction", name: `Create a CV with the ${template.name} template`, target: absoluteUrl("/editor/") },
  };
}

export function templateCollectionSchema() {
  if (!SITE_URL) return undefined;
  return {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": absoluteUrl("/templates/#page"),
    name: `${templates.length} Free CV Templates`, url: absoluteUrl("/templates/"),
    description: "Compare free traditional, modern, creative, and simple CV templates. Edit online and download your PDF.",
    isPartOf: { "@id": absoluteUrl("/#website") }, inLanguage: "en",
    mainEntity: { "@type": "ItemList", name: "Free professional CV templates", numberOfItems: templates.length,
      itemListElement: templates.map((template, index) => ({ "@type": "ListItem", position: index + 1,
        item: { "@type": "CreativeWork", name: `${template.name} CV template`, url: absoluteUrl(`/templates/${template.id}/`), image: absoluteUrl(`/templates/${template.id}.webp`), description: templateDetails[template.id].description, isAccessibleForFree: true },
      })),
    },
  };
}

export function categoryCollectionSchema(collection: typeof templateCollections[number]) {
  if (!SITE_URL) return undefined;
  const path = collectionPath(collection.slug);
  return {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": absoluteUrl(`${path}#page`),
    name: collection.title, description: collection.description, url: absoluteUrl(path),
    isPartOf: { "@id": absoluteUrl("/#website") }, inLanguage: "en", dateModified: CONTENT_UPDATED,
    mainEntity: { "@type": "ItemList", name: collection.title, numberOfItems: collection.templates.length,
      itemListElement: collection.templates.map((id, index) => ({ "@type": "ListItem", position: index + 1,
        item: { "@type": "CreativeWork", name: `${templates.find(template => template.id === id)!.name} CV template`,
          url: absoluteUrl(`/templates/${id}/`), image: absoluteUrl(`/templates/${id}.webp`),
          description: templateDetails[id].description, isAccessibleForFree: true },
      })),
    },
  };
}

export function articleSchema(tip: typeof tips[number]) {
  if (!SITE_URL) return undefined;
  return {
    "@context": "https://schema.org", "@type": "Article", "@id": absoluteUrl(`/tips/${tip.slug}/#article`),
    headline: tip.title, description: tip.description, url: absoluteUrl(`/tips/${tip.slug}/`),
    author: person(), publisher: organization(), ...(tip.published ? { datePublished: tip.published } : {}), dateModified: CONTENT_UPDATED, inLanguage: "en",
    mainEntityOfPage: absoluteUrl(`/tips/${tip.slug}/`), image: absoluteUrl(`/social/guides/${tip.slug}.png`),
    articleSection: tip.category, wordCount: tip.words,
  };
}

export function cvExamplesCollectionSchema(examples: CVExample[]) {
  if (!SITE_URL) return undefined;
  return {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": absoluteUrl("/cv-examples/#page"),
    name: "CV examples by job", url: absoluteUrl("/cv-examples/"), description: CV_EXAMPLES_DESCRIPTION,
    isPartOf: { "@id": absoluteUrl("/#website") }, inLanguage: "en", dateModified: CONTENT_UPDATED,
    mainEntity: { "@type": "ItemList", name: "CV examples by job", numberOfItems: examples.length,
      itemListElement: examples.map((example, index) => ({ "@type": "ListItem", position: index + 1,
        item: { "@type": "Article", headline: `${example.job} CV example`, url: absoluteUrl(`/cv-examples/${example.slug}/`), image: absoluteUrl(`/examples/${example.slug}.webp`) },
      })),
    },
  };
}

export function cvExampleSchema(example: CVExample) {
  if (!SITE_URL) return undefined;
  const path = `/cv-examples/${example.slug}/`;
  return {
    "@context": "https://schema.org", "@type": "Article", "@id": absoluteUrl(`${path}#article`),
    headline: `${example.job} CV example`, description: example.description, url: absoluteUrl(path),
    author: person(), publisher: organization(), dateModified: CONTENT_UPDATED, inLanguage: "en",
    mainEntityOfPage: absoluteUrl(path), image: absoluteUrl(`/examples/${example.slug}.webp`),
    articleSection: "CV examples", about: { "@type": "Occupation", name: example.job },
  };
}
