"use client";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { templates, type CV } from "@/lib/model";

export function CVPhotoField({ photo, template, onChoose, onRemove }: {
  photo: CV["photo"]; template: typeof templates[number]; onChoose: () => void; onRemove: () => void;
}) {
  return <div className="photo-field">
    <button className="photo-preview" aria-label={photo ? "Replace CV photo" : "Add a profile photo"} onClick={onChoose}>
      {photo ? <img src={photo} alt="Your CV photo" /> : <ImagePlus size={24} strokeWidth={1.4} />}
    </button>
    <div className="photo-copy"><span className="photo-label">Profile photo <small>Optional</small></span>
      <p>{template.photo ? "A personal touch. Prepared privately on your device." : "Choose a template marked Photo to include it in your CV."}</p>
      <div className="photo-actions"><button onClick={onChoose}><Plus size={13} />{photo ? "Replace photo" : "Add photo"}</button>{photo && <button className="danger" onClick={onRemove}><Trash2 size={13} />Remove photo</button>}</div>
      <details className="photo-guidance"><summary>Photo guidelines</summary><p>Follow the employer’s instructions and the conventions of your country and industry. Photo templates: {templates.filter(item => item.photo).map(item => item.name).join(", ")}. Your photo stays on this device.</p></details>
    </div>
  </div>;
}
