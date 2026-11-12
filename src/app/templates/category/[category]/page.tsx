import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { TemplateGallery } from "@/components/template-gallery";
import { TemplateCollections } from "@/components/template-collections";
import { StartCVButton } from "@/components/start-cv-button";
import { CollectionExampleSection } from "@/components/collection-example";
import { collectionPath, templateCollections } from "@/lib/template-collections";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { categoryCollectionSchema } from "@/lib/structured-data";

export function generateStaticParams() { return templateCollections.map(collection => ({ category: collection.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const collection = templateCollections.find(item => item.slug === category);
  if (!collection) return {};
  return pageMetadata({ title: collection.title, description: collection.description, path: collectionPath(category), image: `/social/collections/${category}.png` });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const collection = templateCollections.find(item => item.slug === category);
  if (!collection) notFound();
  return <><Header /><main id="main-content">
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "CV templates", path: "/templates/" }, { name: collection.name, path: collectionPath(category) }])} />
    <StructuredData data={categoryCollectionSchema(collection)} />
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CV templates", href: "/templates/" }, { name: collection.name }]} /><h1>{collection.title}</h1><p>{collection.intro}</p><ul className="page-hero-points"><li><Check size={16} />{collection.templates.length} free designs</li><li><Check size={16} />No account or watermark</li><li><LockKeyhole size={16} />Your details stay on your device</li></ul></div></section>
    <section className="section templates-catalog" aria-label={`${collection.name} CV templates`}><div className="container"><TemplateGallery templateIds={collection.templates} /></div></section>
    {collection.example && <CollectionExampleSection example={collection.example} />}
    <section className="section template-advice"><div className="container collection-guidance"><div>{collection.advice.map(advice => <article key={advice.heading}><h2>{advice.heading}</h2><p>{advice.text}</p></article>)}</div><aside className="collection-checklist"><h2>Before you download</h2><ul className="check-list">{collection.checklist.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul><Link className="text-link" href={category === "student" ? "/tips/your-first-cv/" : "/tips/choose-your-template/"}>Read the writing guide<ArrowRight size={15} /></Link></aside></div></section>
    <section className="section collection-section"><div className="container"><div className="section-head"><div><h2>Explore another direction.</h2><p>Find the structure that suits your application.</p></div><Link href="/templates/" className="text-link">All templates<ArrowRight size={16} /></Link></div><TemplateCollections except={category} /></div></section>
    <section className="closing-cta"><div className="container closing-inner"><div><h2>Make your next move.</h2><p>Your experience, in a layout that suits you.</p></div><div className="closing-actions"><StartCVButton template={collection.templates[0]} className="button dark large" /><span>Free to create. Free to download.</span></div></div></section>
  </main><Footer /></>;
}
