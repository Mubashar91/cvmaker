import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  // /api/ holds POST-only AI endpoints. Crawlers find the paths in client JavaScript and
  // get a redirect plus a 405, which Search Console reports as indexing problems.
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: absoluteUrl("/sitemap.xml") };
}
