import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collectionPath, templateCollections } from "@/lib/template-collections";

export function TemplateCollections({ except }: { except?: string }) {
  return <div className="collection-grid">{templateCollections.filter(collection => collection.slug !== except).map(collection => <Link className="collection-card" href={collectionPath(collection.slug)} key={collection.slug}>
    <span>{collection.templates.length} free designs</span><h3>{collection.name}<ArrowUpRight size={18} /></h3><p>{collection.description.split(". ")[0]}.</p>
  </Link>)}</div>;
}
