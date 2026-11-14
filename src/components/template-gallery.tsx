"use client";
import Link from "next/link";
import { lazy, Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUpRight, Eye, Search, SlidersHorizontal, X } from "lucide-react";
import { templates, templateStyles, type Template, type TemplateStyle } from "@/lib/model";
import { sortTemplates, type TemplateSort } from "@/lib/template-sort";
import { TemplateCard } from "./template-card";
// Loaded on the first Preview click: it carries every template's description, which the grid itself doesn't need.
const TemplatePreviewDialog = lazy(() => import("./template-preview-dialog").then(module => ({ default: module.TemplatePreviewDialog })));
import { useCV } from "./cv-context";

export type StyleFilter = "All" | TemplateStyle | "With photo";
export function matchesFilter(template: typeof templates[number], filter: StyleFilter) {
  return filter === "All" || (filter === "With photo" ? template.photo : template.style === filter);
}

export function StyleFilters({ value, onChange, label = "Filter templates by style", available = templates }: { value: StyleFilter; onChange: (value: StyleFilter) => void; label?: string; available?: readonly typeof templates[number][] }) {
  return <div className="filter-chips" role="group" aria-label={label}>{(["All", ...templateStyles, "With photo"] as StyleFilter[]).map(style => {
    const count = available.filter(t => matchesFilter(t, style)).length;
    return <button key={style} aria-pressed={value === style} onClick={() => onChange(style)}>{style}<span className="chip-count">{count}</span></button>;
  })}</div>;
}

export function TemplateGallery({ headingLevel = 3, onChoose, initialLimit, featured = [], templateIds }: { headingLevel?: 2 | 3; onChoose?: (template: Template) => void; initialLimit?: number; featured?: readonly Template[]; templateIds?: readonly Template[] }) {
  const router = useRouter(); const { setCV } = useCV();
  const [style, setStyle] = useState<StyleFilter>("All");
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  // The search matcher (and the template descriptions it reads) loads when the search box is first used.
  const [matcher, setMatcher] = useState<((id: Template, query: string) => boolean) | null>(null);
  function loadSearch() { if (!matcher) void import("@/lib/template-search").then(module => setMatcher(() => module.matchesTemplateSearch)); }
  const [columns, setColumns] = useState("all");
  const [sort, setSort] = useState<TemplateSort>("recommended");
  const [preview, setPreview] = useState<Template | null>(null);
  // Once loaded, the dialog stays mounted so closing it returns focus to the Preview button.
  const [dialogWanted, setDialogWanted] = useState(false);
  function openPreview(id: Template) { setDialogWanted(true); setPreview(id); }
  const available = templateIds ? templateIds.flatMap(id => templates.filter(t => t.id === id)) : [...templates];
  const ordered = [...featured.flatMap(id => available.filter(t => t.id === id)), ...available.filter(t => !featured.includes(t.id))];
  const matching = sortTemplates(ordered.filter(t => matchesFilter(t, style) && (columns === "all" || t.columns === Number(columns)) && (!query.trim() || !matcher || matcher(t.id, query))), sort);
  const shown = initialLimit && !expanded ? matching.slice(0, initialLimit) : matching;
  function choose(template: Template) {
    setPreview(null);
    if (onChoose) return onChoose(template);
    setCV(current => ({ ...current, template })); router.push("/editor/");
  }
  return <div className="gallery">
    <div className="template-discovery"><label className="template-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search CV templates</span><input type="search" value={query} placeholder="Try “ATS”, “student”, or “designer”…" onFocus={loadSearch} onChange={event => { loadSearch(); setQuery(event.target.value); setExpanded(false); }} />{query && <button aria-label="Clear template search" onClick={() => setQuery("")}><X size={16} /></button>}</label>
      <div className="discovery-selects"><label><SlidersHorizontal size={15} aria-hidden="true" /><span className="sr-only">Template columns</span><select aria-label="Template columns" value={columns} onChange={event => { setColumns(event.target.value); setExpanded(false); }}><option value="all">Any layout</option><option value="1">Single column</option><option value="2">Two columns</option></select></label><label><span className="sr-only">Sort templates</span><select aria-label="Sort templates" value={sort} onChange={event => setSort(event.target.value as TemplateSort)}><option value="recommended">Recommended</option><option value="newest">Newest first</option><option value="name">Name A–Z</option></select></label></div>
    </div>
    <div className="gallery-toolbar"><StyleFilters value={style} onChange={value => { setStyle(value); setExpanded(false); }} available={available} /><span className="gallery-count" role="status">{matching.length} {matching.length === 1 ? "design" : "designs"}, all free</span></div>
    {shown.length ? <div className="template-grid">{shown.map(template => <article key={template.id} className="template-tile"><TemplateCard template={template} headingLevel={headingLevel} onSelect={() => choose(template.id)} /><div className="template-tile-actions"><button className="template-quick-preview" onClick={() => openPreview(template.id)} aria-label={`Preview ${template.name} template`}><Eye size={15} />Preview</button><Link href={`/templates/${template.id}/`} className="template-detail-link">Details <ArrowUpRight size={15} /><span className="sr-only"> about {template.name}</span></Link></div></article>)}</div> : <div className="template-empty"><Search size={28} />{headingLevel === 2 ? <h2 className="template-empty-title">No designs match these filters.</h2> : <h3 className="template-empty-title">No designs match these filters.</h3>}<p>Try a shorter search or explore every style.</p><button className="button outline" onClick={() => { setQuery(""); setColumns("all"); setStyle("All"); }}>Reset filters</button></div>}
    {shown.length < matching.length && <div className="gallery-more"><span>There’s a little something for every story.</span><button className="button outline" onClick={() => setExpanded(true)}>Show {matching.length - shown.length} more templates <ArrowDown size={16} /></button></div>}
    {dialogWanted && <Suspense fallback={null}><TemplatePreviewDialog template={preview} ids={matching.map(t => t.id)} onChange={setPreview} onChoose={choose} onClose={() => setPreview(null)} /></Suspense>}
  </div>;
}
