import type { Metadata } from "next";
import { templates } from "./model";
import { siteOperator } from "./site-info";

export const SITE_NAME = "Folio";
export const CONTENT_UPDATED = "2026-11-09";
const dateLabel = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
/** "9 November 2026" for an ISO date. */
export function formatDate(iso: string): string { return dateLabel.format(new Date(`${iso}T00:00:00Z`)); }
export const CONTENT_UPDATED_LABEL = formatDate(CONTENT_UPDATED);
export const DEFAULT_DESCRIPTION = `Create a professional CV online for free with ${templates.length} templates. Import a PDF or DOCX, edit your details, and download a PDF. No sign-up, payment, or watermark.`;

function configuredOrigin(): string | undefined {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return undefined;
  const url = new URL(configured);
  if (!/^https?:$/.test(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a complete http(s) origin, without a path, credentials, or query string.");
  }
  return url.origin;
}

export const SITE_URL = configuredOrigin();
export function absoluteUrl(path: string): string | undefined {
  return SITE_URL ? new URL(path, SITE_URL).toString() : undefined;
}

export function pageMetadata({ title, description, path, image = "/social/folio.png", noIndex = false, article = false }: {
  title: string; description: string; path: string; image?: string; noIndex?: boolean; article?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl(image);
  const pageTitle = `${title} | ${SITE_NAME}`;
  return {
    title: { absolute: pageTitle }, description,
    alternates: canonical ? { canonical } : undefined,
    robots: { index: !noIndex, follow: true, googleBot: { index: !noIndex, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: {
      type: article ? "article" : "website", title: pageTitle, description,
      siteName: "Folio Free CV Maker", locale: "en_GB", url: canonical,
      images: socialImage ? [{ url: socialImage, width: 1200, height: 630, type: "image/png", alt: `${title} — Folio free CV maker` }] : [],
      ...(article ? { modifiedTime: CONTENT_UPDATED, authors: [siteOperator.name] } : {}),
    },
    twitter: { card: "summary_large_image", title: pageTitle, description, images: socialImage ? [socialImage] : [] },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  if (!SITE_URL) return undefined;
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}
