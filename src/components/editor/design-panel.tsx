"use client";
import { useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUp, Check, Eye, EyeOff, LayoutTemplate, Palette, Pipette, Settings2 } from "lucide-react";
import { CVDesignControls } from "@/components/cv-design-controls";
import { DragHandle, useDragSort } from "@/components/sortable";
import { TemplateCard } from "@/components/template-card";
import { matchesFilter, StyleFilters, type StyleFilter } from "@/components/template-gallery";
import { matchesTemplateSearch } from "@/lib/template-search";
import { accentColors, move, moveTo, readableAccent, sectionTitle, templateById, templates, type CV, type Section } from "@/lib/model";

interface DesignPanelProps {
  cv: CV;
  update: <K extends keyof CV>(key: K, value: CV[K]) => void;
  /** Reorders sections, as one undoable step. */
  reorder: (change: (order: Section[]) => Section[]) => void;
  toggleSection: (key: Section) => void;
}

export function DesignPanel({ cv, update, reorder, toggleSection }: DesignPanelProps) {
  const [customPick, setCustomPick] = useState("");
  const [templateQuery, setTemplateQuery] = useState("");
  const [styleFilter, setStyleFilter] = useState<StyleFilter>("All");
  const sort = useDragSort((from, to) => reorder(order => moveTo(order, from, to)));
  const current = templateById(cv.template);
  const customAccent = !!cv.accent && !accentColors.some(c => c.value === cv.accent);
  const adjusted = customAccent && !!customPick && readableAccent(customPick) !== customPick.toLowerCase();
  const shownTemplates = templates.filter(t => (matchesFilter(t, styleFilter) && matchesTemplateSearch(t.id, templateQuery)) || t.id === cv.template);
  const swatch = (color: string) => ({ "--swatch": color }) as CSSProperties;
  function pickCustom(value: string) { setCustomPick(value); update("accent", readableAccent(value)); }

  return <div className="design-panel" id="design-panel" tabIndex={-1}>
    <div className="form-heading"><h2>Find your kind of first impression.</h2></div>
    <p className="form-description">Switch freely. Your content comes with you.</p>

    <fieldset className="accent-picker">
      <legend><Palette size={16} /> Accent colour <span>{cv.accent ? accentColors.find(c => c.value === cv.accent)?.name ?? `Custom ${cv.accent.toUpperCase()}` : `${current.name} default`}</span></legend>
      <div className="swatches">
        <button className="swatch is-default" aria-pressed={!cv.accent} aria-label={`${current.name} default colour`} title={`${current.name} default`} style={swatch(current.color)} onClick={() => update("accent", undefined)}>{!cv.accent && <Check size={14} />}</button>
        <span className="swatch-divider" aria-hidden="true" />
        {accentColors.map(c => <button key={c.value} className="swatch" aria-pressed={cv.accent === c.value} aria-label={c.name} title={c.name} style={swatch(c.value)} onClick={() => update("accent", c.value)}>{cv.accent === c.value && <Check size={14} />}</button>)}
        <span className="swatch-divider" aria-hidden="true" />
        <label className={`swatch is-custom${customAccent ? " is-on" : ""}`} title="Choose your own colour" style={customAccent ? swatch(cv.accent!) : undefined}>
          <input type="color" className="sr-only" aria-label="Choose your own accent colour" value={customPick || cv.accent || current.color} onChange={e => pickCustom(e.target.value)} />
          {customAccent ? <Check size={14} /> : <Pipette size={15} />}
        </label>
      </div>
      {adjusted && <p className="accent-note">Darkened slightly so headings stay readable in print.</p>}
    </fieldset>

    <CVDesignControls cv={cv} onFontChange={font => update("font", font)} onDensityChange={density => update("density", density)} />

    <div className="design-subhead"><h3><LayoutTemplate size={16} /> Template</h3><StyleFilters value={styleFilter} onChange={setStyleFilter} /></div>
    <label className="template-search editor-template-search">
      <LayoutTemplate size={16} /><span className="sr-only">Search editor templates</span>
      <input type="search" data-native-undo value={templateQuery} onChange={event => setTemplateQuery(event.target.value)} placeholder="Search by name, style, or purpose" />
    </label>
    <div className="editor-template-grid">{shownTemplates.map(t => <TemplateCard key={t.id} template={t} selected={cv.template === t.id} onSelect={() => update("template", t.id)} />)}</div>

    <div className="layout-settings">
      <h3><Settings2 size={16} /> Section order & visibility</h3>
      <p>Drag sections, or move them up or down. Empty sections are always hidden. Two-column layouts such as Modern, Sidebar, Atlas, Summit, and Gazette keep education, skills, and certifications in their side column; Mosaic shows them as tiles.</p>
      <div className="order-list" ref={sort.ref}>
        {cv.sectionOrder.map((key, i) => <div className={`order-row${sort.itemClass(i)}`} data-sort-item key={key}>
          <span><DragHandle onPointerDown={event => sort.start(i, event)} />{sectionTitle(cv, key)}</span>
          <div>
            <button className="icon-button" aria-label={`Move ${sectionTitle(cv, key)} section up`} disabled={i === 0} onClick={() => reorder(order => move(order, i, -1))}><ArrowUp size={14} /></button>
            <button className="icon-button" aria-label={`Move ${sectionTitle(cv, key)} section down`} disabled={i === cv.sectionOrder.length - 1} onClick={() => reorder(order => move(order, i, 1))}><ArrowDown size={14} /></button>
            <button className="icon-button" aria-label={`${cv.hiddenSections.includes(key) ? "Show" : "Hide"} ${sectionTitle(cv, key)}`} onClick={() => toggleSection(key)}>{cv.hiddenSections.includes(key) ? <EyeOff size={15} /> : <Eye size={15} />}</button>
          </div>
        </div>)}
      </div>
    </div>
  </div>;
}
