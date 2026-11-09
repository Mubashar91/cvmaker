"use client";
import { useId, useState } from "react";
import { Check, Lightbulb, Plus } from "lucide-react";
import { addSkill, hasSkill, professionGroups, professions, skillGroupLabels, type SkillKind } from "@/lib/skills-library";

/** Best guess at a profession from the CV's professional title, e.g. "Junior Data Analyst" → Data analyst. */
export function guessProfession(headline: string): string {
  const title = headline.toLowerCase();
  if (!title.trim()) return "";
  const scored = professions.map(profession => {
    const words = profession.name.toLowerCase().replace(/\(.*\)|\/|or /g, " ").split(/\s+/).filter(word => word.length > 2);
    return { id: profession.id, score: words.filter(word => title.includes(word)).length / words.length };
  }).sort((a, b) => b.score - a.score);
  return scored[0].score >= .5 ? scored[0].id : "";
}

/** Predefined skills for a chosen profession. Each chip adds one skill to the CV's skills text. */
export function SkillSuggestions({ skills, headline, onChange }: { skills: string; headline: string; onChange: (skills: string) => void }) {
  const [choice, setChoice] = useState(""); const id = useId();
  const professionId = choice || guessProfession(headline);
  const profession = professions.find(item => item.id === professionId);
  return <div className="skill-suggestions">
    <div className="skill-suggestions-head"><Lightbulb size={16} aria-hidden="true" /><label htmlFor={id}>Skill ideas for</label>
      <select id={id} value={professionId} onChange={event => setChoice(event.target.value)}>
        <option value="">Choose a profession…</option>
        {professionGroups.map(group => <optgroup key={group} label={group}>{professions.filter(item => item.group === group).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</optgroup>)}
      </select>
    </div>
    {profession ? <>
      {(Object.keys(skillGroupLabels) as SkillKind[]).map(kind => <div className="skill-chip-group" key={kind}><span>{skillGroupLabels[kind]}</span><div className="skill-chips">{profession[kind].map(skill => {
        const added = hasSkill(skills, skill);
        return <button key={skill} type="button" className="skill-chip" aria-pressed={added} disabled={added} onClick={() => onChange(addSkill(skills, skillGroupLabels[kind], skill))}>{added ? <Check size={13} aria-hidden="true" /> : <Plus size={13} aria-hidden="true" />}{skill}<span className="sr-only">{added ? " (added)" : ` — add to ${skillGroupLabels[kind]}`}</span></button>;
      })}</div></div>)}
      <p className="skill-suggestions-note">Only add skills you can back up with an example. You can edit or reorder the lines above at any time.</p>
    </> : <p className="skill-suggestions-note">Pick a profession to see common skills, tools, and strengths for that kind of role.</p>}
  </div>;
}
