"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { templateById, type Template } from "@/lib/model";
import { templateDetails } from "@/lib/template-details";
import { MiniCV } from "./template-card";

export function TemplatePreviewDialog({ template, ids, onChange, onChoose, onClose }: {
  template: Template | null; ids: Template[]; onChange: (id: Template) => void;
  onChoose: (id: Template) => void; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = template !== null;
  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => { element?.close(); document.body.style.overflow = previous; };
  }, [isOpen]);
  const current = template ? templateById(template) : null;
  const details = template ? templateDetails[template] : null;
  const index = template ? ids.indexOf(template) : -1;
  function step(direction: number) {
    if (ids.length > 1) onChange(ids[(index + direction + ids.length) % ids.length]);
  }
  return <dialog ref={dialog} className="template-preview-dialog" aria-labelledby="template-preview-title" onCancel={onClose}
    onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); } }}
    onKeyDown={event => { if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); } if (event.key === "ArrowRight") { event.preventDefault(); step(1); } }}>
    {current && details && <>
      <div className="template-preview-top"><span>Take a closer look <span className="preview-position" role="status">{index + 1} / {ids.length}</span></span><button className="icon-button" aria-label="Close template preview" onClick={onClose} autoFocus><X size={21} /></button></div>
      <div className="template-preview-layout">
        <figure className="template-preview-paper"><MiniCV template={current.id} large alt={`${current.name} CV template full-size example`} /><figcaption>Fictional example. Your own details stay with you when you choose a template.</figcaption></figure>
        <div className="template-preview-info"><span className="template-detail-kind">{details.category}</span><h2 id="template-preview-title">{current.name}</h2><p>{details.heading}</p>
          <div className="preview-facts"><span>{current.columns === 1 ? "Single column" : "Two columns"}</span><span>{current.photo ? "Optional photo" : "No photo"}</span><span>Free A4 PDF</span></div>
          <p>{details.bestFor}</p><ul className="check-list">{details.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul>
          <button className="button dark" onClick={() => onChoose(current.id)}>Use {current.name}<ArrowRight size={16} /></button>
          <Link className="template-detail-link" href={`/templates/${current.id}/`}>Read about this layout <ArrowRight size={14} /></Link>
          <div className="preview-navigation"><button className="button outline" disabled={ids.length < 2} onClick={() => step(-1)} aria-label="Previous template"><ArrowLeft size={16} />Previous</button><button className="button outline" disabled={ids.length < 2} onClick={() => step(1)} aria-label="Next template">Next<ArrowRight size={16} /></button></div>
        </div>
      </div>
    </>}
  </dialog>;
}
