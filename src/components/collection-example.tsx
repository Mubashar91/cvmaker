import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { UseExampleButton } from "./use-example-button";
import { collectionExampleCV, type CollectionExample } from "@/lib/template-collections";
import { isTextSection, sectionHasContent, sectionTitle, type CV, type Section } from "@/lib/model";

const lines = (text: string) => text.split("\n").map(line => line.trim()).filter(Boolean);

function TextLines({ text }: { text: string }) {
  return <>{lines(text).map(line => {
    const split = line.indexOf(": ");
    return <p key={line}>{split > 0 ? <><strong>{line.slice(0, split)}:</strong> {line.slice(split + 2)}</> : line}</p>;
  })}</>;
}

function DocumentSection({ cv, section }: { cv: CV; section: Section }) {
  if (!sectionHasContent(cv, section)) return null;
  const title = sectionTitle(cv, section);
  if (isTextSection(section)) return <section><h4>{title}</h4>{section === "summary" ? <p>{cv.summary}</p> : <TextLines text={cv[section]} />}</section>;
  return <section><h4>{title}</h4>{cv[section].map(item => <div className="sample-entry" key={item.id}>
    <p className="sample-entry-head"><strong>{item.title}</strong><span>{item.dates}</span></p>
    <p className="sample-entry-org">{item.organization}</p>
    <ul>{lines(item.description).map(line => <li key={line}>{line}</li>)}</ul>
  </div>)}</section>;
}

/** A complete fictional CV as readable page text. Place it under an h2: the name is an h3, sections h4. */
export function SampleDocument({ cv, label }: { cv: CV; label: string }) {
  const contact = [cv.personal.location, cv.personal.phone, cv.personal.email, cv.personal.website].filter(Boolean);
  return <article className="sample-document" aria-label={label}>
    <header><h3>{cv.personal.name}</h3><p className="sample-headline">{cv.personal.headline}</p><p className="sample-contact">{contact.join(" · ")}</p></header>
    {cv.sectionOrder.filter(section => !cv.hiddenSections.includes(section)).map(section => <DocumentSection key={section} cv={cv} section={section} />)}
  </article>;
}

/** A complete fictional sample, readable on the page and openable in the editor. */
export function CollectionExampleSection({ example }: { example: CollectionExample }) {
  const cv = collectionExampleCV(example);
  return <section className="section collection-example" id={example.id} aria-labelledby={`${example.id}-heading`}><div className="container collection-guidance">
    <div>
      <h2 id={`${example.id}-heading`}>{example.heading}</h2>
      <p>{example.intro}</p>
      <SampleDocument cv={cv} label={`Fictional resume for ${example.person.name}`} />
      <p className="sample-caption">Every person, school, and organization in this example is fictional.</p>
    </div>
    <aside className="collection-checklist">
      <h2>{example.omit.heading}</h2>
      <ul className="check-list omit-list">{example.omit.items.map(item => <li key={item}><X size={17} aria-hidden="true" />{item}</li>)}</ul>
      <UseExampleButton cv={cv} className="button dark">Edit this resume</UseExampleButton>
      <p className="sample-download-note">{example.downloadNote}</p>
      <ul className="sample-links">{example.links.map(link => <li key={link.href}><Link className="text-link" href={link.href}>{link.label}<ArrowRight size={15} /></Link></li>)}</ul>
    </aside>
  </div></section>;
}
