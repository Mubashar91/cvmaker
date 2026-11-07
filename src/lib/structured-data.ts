import { templates, type Template } from "./model";
import { templateDetails } from "./template-details";
import { absoluteUrl, CONTENT_UPDATED, DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "./seo";
import type { tips } from "./tips";

const organization = () => ({ "@type": "Organization", "@id": absoluteUrl("/#organization"), name: SITE_NAME, url: absoluteUrl("/"), logo: { "@type": "ImageObject", url: absoluteUrl("/apple-touch-icon.png"), width: 180, height: 180 } });

export function websiteSchema() {
  if (!SITE_URL) return undefined;
  return { "@context": "https://schema.org", "@graph": [
    organization(),
    { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: SITE_NAME, url: absoluteUrl("/"), description: DEFAULT_DESCRIPTION, inLanguage: "en", publisher: { "@id": absoluteUrl("/#organization") } },
    { "@type": "WebApplication", "@id": absoluteUrl("/#app"), name: "Folio CV Maker", url: absoluteUrl("/"), description: DEFAULT_DESCRIPTION, image: absoluteUrl("/social/folio.png"), applicationCategory: "BusinessApplication", operatingSystem: "Web browser", browserRequirements: "Requires JavaScript and a modern web browser", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@id": absoluteUrl("/#organization") }, featureList: ["PDF and DOCX import", `${templates.length} professional CV templates`, "Optional profile photo", "Live PDF preview", "Ten accent colours", "Free multi-page PDF downloads", "Local browser drafts", "No account required"] },
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

export function articleSchema(tip: typeof tips[number]) {
  if (!SITE_URL) return undefined;
  return {
    "@context": "https://schema.org", "@type": "Article", "@id": absoluteUrl(`/tips/${tip.slug}/#article`),
    headline: tip.title, description: tip.description, url: absoluteUrl(`/tips/${tip.slug}/`),
    author: organization(), publisher: organization(), dateModified: CONTENT_UPDATED, inLanguage: "en",
    mainEntityOfPage: absoluteUrl(`/tips/${tip.slug}/`), image: absoluteUrl(`/social/guides/${tip.slug}.png`),
    articleSection: tip.category, wordCount: [tip.intro, ...tip.sections.flatMap(section => [...section.paragraphs, ...(section.bullets ?? []), section.example ?? ""]), tip.takeaway].join(" ").split(/\s+/).length,
  };
}
