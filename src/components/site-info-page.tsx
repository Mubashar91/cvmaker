import Link from "next/link";
import type { ReactNode } from "react";
import { Header, Footer } from "./site-chrome";
import { Breadcrumbs } from "./breadcrumbs";
import { StructuredData } from "./structured-data";
import { informationPages, informationPage, type InformationPath } from "@/lib/site-info";
import { breadcrumbSchema, CONTENT_UPDATED, CONTENT_UPDATED_LABEL } from "@/lib/seo";
import { informationPageSchema } from "@/lib/structured-data";

export function SiteInfoPage({ path, heading, summary, children }: { path: InformationPath; heading: string; summary?: string; children: ReactNode }) {
  const page = informationPage(path);
  return <><Header /><main id="main-content">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: page.label, path }])} />
    <StructuredData data={informationPageSchema(path)} />
    <section className="page-hero information-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: page.label }]} /><h1>{heading}</h1><p>{summary ?? page.description}</p><time dateTime={CONTENT_UPDATED}>Updated {CONTENT_UPDATED_LABEL}</time></div></section>
    <nav className="information-navigation" aria-label="About Folio and site policies"><div className="container">{informationPages.map(item => <Link key={item.path} href={item.path} aria-current={item.path === path ? "page" : undefined}>{item.label}</Link>)}</div></nav>
    {children}
  </main><Footer /></>;
}
