import type { MetadataRoute } from "next";
import { templates } from "@/lib/model";
import { tips } from "@/lib/tips";
import { collectionPath, templateCollections } from "@/lib/template-collections";
import { informationPages } from "@/lib/site-info";
import { absoluteUrl, CONTENT_UPDATED, SITE_URL } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];
  const paths = ["/", "/templates/", ...templates.map(t => `/templates/${t.id}/`), ...templateCollections.map(collection => collectionPath(collection.slug)), "/tips/", ...tips.map(t => `/tips/${t.slug}/`), ...informationPages.map(page => page.path)];
  return paths.map(path => ({ url: absoluteUrl(path)!, lastModified: CONTENT_UPDATED,
    ...(templates.some(template => path === `/templates/${template.id}/`) ? { images: [absoluteUrl(`/templates/${path.split("/")[2]}.webp`)!] } : {}),
  }));
}
