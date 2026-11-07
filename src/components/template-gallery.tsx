"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { templates, templateStyles, type Template, type TemplateStyle } from "@/lib/model";
import { TemplateCard } from "./template-card";
import { useCV } from "./cv-context";

export type StyleFilter = "All" | TemplateStyle | "With photo";
export function matchesFilter(template: typeof templates[number], filter: StyleFilter) {
  return filter === "All" || (filter === "With photo" ? template.photo : template.style === filter);
}

export function StyleFilters({ value, onChange, label = "Filter templates by style" }: { value: StyleFilter; onChange: (value: StyleFilter) => void; label?: string }) {
  return <div className="filter-chips" role="group" aria-label={label}>{(["All", ...templateStyles, "With photo"] as StyleFilter[]).map(style => {
    const count = templates.filter(t => matchesFilter(t, style)).length;
    return <button key={style} aria-pressed={value === style} onClick={() => onChange(style)}>{style}<span className="chip-count">{count}</span></button>;
  })}</div>;
}

export function TemplateGallery({ headingLevel = 3, onChoose, initialLimit, featured = [] }: { headingLevel?: 2 | 3; onChoose?: (template: Template) => void; initialLimit?: number; featured?: readonly Template[] }) {
  const router = useRouter(); const { setCV } = useCV();
  const [style, setStyle] = useState<StyleFilter>("All");
  const [expanded, setExpanded] = useState(false);
  const ordered = [...featured.flatMap(id => templates.filter(t => t.id === id)), ...templates.filter(t => !featured.includes(t.id))];
  const matching = ordered.filter(t => matchesFilter(t, style));
  const shown = initialLimit && !expanded ? matching.slice(0, initialLimit) : matching;
  function choose(template: Template) {
    if (onChoose) return onChoose(template);
    setCV(current => ({ ...current, template })); router.push("/editor/");
  }
  return <div className="gallery">
    <div className="gallery-toolbar"><StyleFilters value={style} onChange={value => { setStyle(value); setExpanded(false); }} /><span className="gallery-count" role="status">{matching.length} {matching.length === 1 ? "design" : "designs"}, all free</span></div>
    <div className="template-grid">{shown.map(template => <article key={template.id} className="template-tile"><TemplateCard template={template} headingLevel={headingLevel} onSelect={() => choose(template.id)} /><Link href={`/templates/${template.id}/`} className="template-detail-link">About {template.name} <ArrowUpRight size={15} /></Link></article>)}</div>
    {shown.length < matching.length && <div className="gallery-more"><span>There’s a little something for every story.</span><button className="button outline" onClick={() => setExpanded(true)}>Show {matching.length - shown.length} more templates <ArrowDown size={16} /></button></div>}
  </div>;
}
