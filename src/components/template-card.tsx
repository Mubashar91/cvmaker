"use client";
import { Check, ArrowRight } from "lucide-react";
import { newTemplates, templateById, templates, type Template } from "@/lib/model";
import { templatePreview, previewSrcSet } from "@/lib/previews";

/**
 * A template preview image with descriptive alt text. Set `decorative` inside a control whose
 * label already names the template, so screen readers hear the label once.
 */
export function MiniCV({ template, large = false, alt, sizes, decorative = false }: { template: Template; large?: boolean; alt?: string; sizes?: string; decorative?: boolean }) {
  return <img
    className={`template-sample${large ? " is-large" : ""}`}
    src={templatePreview(template)}
    srcSet={previewSrcSet(templatePreview(template))} sizes={sizes ?? (large ? "(max-width: 640px) 280px, 380px" : "(max-width: 640px) 160px, 300px")}
    width={953} height={1348}
    alt={alt ?? `${templateById(template).name} CV template preview`} aria-hidden={decorative || undefined} decoding="async" loading={large ? "eager" : "lazy"} fetchPriority={large ? "high" : "auto"}
  />;
}

export function TemplateCard({ template, selected, onSelect, headingLevel = 3 }: {
  template: typeof templates[number]; selected?: boolean; onSelect: () => void; headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  // The badges and the "Use template" pill sit beside the button, not inside it, so the button
  // has no visible text that its label would have to repeat.
  return <div className={`template-card${selected ? " selected" : ""}`} style={{ "--template-color": template.color } as React.CSSProperties}>
    <div className="template-choice-wrap">
      <button className="template-choice" onClick={onSelect} aria-label={`Use ${template.name} template`} aria-pressed={selected}>
        <span className="template-sheet"><MiniCV template={template.id} decorative /></span>
      </button>
      <span className="template-free" aria-hidden="true">Free</span>
      {newTemplates.includes(template.id) && <span className="template-new" aria-hidden="true">New</span>}
      <span className="template-use" aria-hidden="true">{selected ? <><Check size={15} /> In use</> : <>Use template <ArrowRight size={15} /></>}</span>
    </div>
    <div className="template-meta"><Heading className="template-name"><span className="template-dot" aria-hidden="true" />{template.name}</Heading><span className="template-tag">{template.style}{template.photo ? " · Photo" : ""}</span></div>
    <p className="template-note">{template.note}</p>
  </div>;
}
