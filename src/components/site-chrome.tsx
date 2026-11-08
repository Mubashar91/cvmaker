import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Logo } from "./logo";
import { templates } from "@/lib/model";
import { collectionPath, templateCollections } from "@/lib/template-collections";
export { Logo } from "./logo";
export { Header } from "./header";

export function Footer() {
  return <footer className="site-footer"><div className="container footer-top">
    <div className="footer-brand"><Logo /><p>A professional CV for your next chapter. Free to create, private by design.</p><span className="footer-privacy"><ShieldCheck size={16} /> Your CV is processed on your device</span></div>
    <div className="footer-column"><h2>Create your CV</h2><Link href="/editor/">Free CV maker</Link><Link href="/templates/">All CV templates</Link><Link href="/tips/">CV writing guides</Link><Link href="/privacy/">Privacy promise</Link><Link href="/privacy/#drafts">Saving & deleting drafts</Link></div>
    <div className="footer-column footer-templates"><h2>Templates</h2>{templates.map(t => <Link key={t.id} href={`/templates/${t.id}/`}>{t.name}</Link>)}{templateCollections.map(collection => <Link key={collection.slug} href={collectionPath(collection.slug)}>{collection.name} CVs</Link>)}</div>
  </div><div className="container footer-bottom"><span>Folio. Made for your next chapter.</span><span>{templates.length} templates · Free PDF downloads · No watermarks</span></div></footer>;
}
