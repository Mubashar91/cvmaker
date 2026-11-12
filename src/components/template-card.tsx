"use client";
import { Check, ArrowRight } from "lucide-react";
import { newTemplates, templates, type Template } from "@/lib/model";
import { templatePreview, previewSrcSet } from "@/lib/previews";

export function MiniCV({ template, large = false, alt = "" }: { template: Template; large?: boolean; alt?: string }) {
  return <img
    className={`template-sample${large ? " is-large" : ""}`}
    src={templatePreview(template)}
    srcSet={previewSrcSet(templatePreview(template))} sizes={large ? "(max-width: 640px) 280px, 380px" : "(max-width: 640px) 160px, 300px"}
    width={953} height={1348}
    alt={alt} aria-hidden={alt ? undefined : true} decoding="async" loading={large ? "eager" : "lazy"} fetchPriority={large ? "high" : "auto"}
  />;
}

export function TemplateCard({ template, selected, onSelect, headingLevel = 3 }: {
  template: typeof templates[number]; selected?: boolean; onSelect: () => void; headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return <div className={`template-card${selected ? " selected" : ""}`} style={{ "--template-color": template.color } as React.CSSProperties}>
    <button className="template-choice" onClick={onSelect} aria-label={`Use ${template.name} template`} aria-pressed={selected}>
      <span className="template-free" aria-hidden="true">Free</span>
      {newTemplates.includes(template.id) && <span className="template-new" aria-hidden="true">New</span>}
      <span className="template-sheet"><MiniCV template={template.id} /></span>
      <span className="template-use" aria-hidden="true">{selected ? <><Check size={15} /> In use</> : <>Use template <ArrowRight size={15} /></>}</span>
    </button>
    <div className="template-meta"><Heading className="template-name"><span className="template-dot" aria-hidden="true" />{template.name}</Heading><span className="template-tag">{template.style}{template.photo ? " · Photo" : ""}</span></div>
    <p className="template-note">{template.note}</p>
  </div>;
}
