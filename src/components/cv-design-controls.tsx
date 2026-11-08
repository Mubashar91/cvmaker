"use client";
import { AlignJustify, Check, Type } from "lucide-react";
import type { CV } from "@/lib/model";

export function CVDesignControls({ cv, onFontChange, onDensityChange }: {
  cv: CV; onFontChange: (font: CV["font"]) => void; onDensityChange: (density: CV["density"]) => void;
}) {
  return <div className="document-settings">
    <fieldset><legend><Type size={17} />Body typeface</legend><p>The finishing touch, in your own style.</p>
      <div className="setting-options">{([
        { value: undefined, label: "Template default", sample: "default" },
        { value: "sans", label: "Clean sans", sample: "sans" },
        { value: "serif", label: "Classic serif", sample: "serif" },
      ] as const).map(option => <button key={option.sample} className="setting-option" aria-pressed={cv.font === option.value} onClick={() => onFontChange(option.value)}>
        <span className={`type-sample type-${option.sample}`} aria-hidden="true">Aa</span><span>{option.label}</span>{cv.font === option.value && <Check size={13} aria-hidden="true" />}
      </button>)}</div>
    </fieldset>
    <fieldset><legend><AlignJustify size={17} />Document spacing</legend><p>A little tighter, or a little more room to breathe.</p>
      <div className="setting-options">{([
        { value: "compact", label: "Compact", sample: "compact" },
        { value: undefined, label: "Balanced", sample: "balanced" },
        { value: "relaxed", label: "Airy", sample: "airy" },
      ] as const).map(option => <button key={option.sample} className="setting-option" aria-label={`${option.label} spacing`} aria-pressed={cv.density === option.value} onClick={() => onDensityChange(option.value)}>
        <span className={`spacing-sample spacing-${option.sample}`} aria-hidden="true"><i /><i /><i /></span><span>{option.label}</span>{cv.density === option.value && <Check size={13} aria-hidden="true" />}
      </button>)}</div>
    </fieldset>
  </div>;
}
