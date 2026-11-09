"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, LockKeyhole, Plus } from "lucide-react";
import { useCV } from "./cv-context";
import { CopyButton } from "./tool-fields";
import { addSkill, professionGroups, professions, skillGroupLabels, skillsAsLines, type SkillKind } from "@/lib/skills-library";

export function SkillsFinder() {
  const { setCV, setStartSection } = useCV(); const router = useRouter();
  const [id, setId] = useState(professions[0].id); const [chosen, setChosen] = useState<Set<string>>(new Set());
  const profession = professions.find(item => item.id === id)!;
  const lines = skillsAsLines(profession, chosen);
  function toggle(skill: string) { setChosen(current => { const next = new Set(current); if (next.has(skill)) next.delete(skill); else next.add(skill); return next; }); }
  function addToCV() {
    setCV(current => {
      let skills = current.skills;
      for (const kind of Object.keys(skillGroupLabels) as SkillKind[]) for (const skill of profession[kind]) if (chosen.has(skill)) skills = addSkill(skills, skillGroupLabels[kind], skill);
      return { ...current, skills };
    });
    setStartSection("skills"); router.push("/editor/");
  }
  return <div className="tool-workspace skills-workspace">
    <div className="tool-form"><section className="tool-step" aria-labelledby="skills-pick"><div className="tool-step-head"><h2 id="skills-pick"><span className="step-number">1</span>Choose a job</h2></div>
      <div className="tool-field"><label htmlFor="skills-profession">Profession</label><select id="skills-profession" value={id} onChange={event => { setId(event.target.value); setChosen(new Set()); }}>{professionGroups.map(group => <optgroup key={group} label={group}>{professions.filter(item => item.group === group).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</optgroup>)}</select></div>
      {(Object.keys(skillGroupLabels) as SkillKind[]).map(kind => <fieldset className="skill-pick-group" key={kind}><legend>{kind === "hard" ? "Job skills" : kind === "tools" ? "Tools and software" : "Strengths"}</legend><div className="skill-chips">{profession[kind].map(skill => <button key={skill} type="button" className="skill-chip" aria-pressed={chosen.has(skill)} onClick={() => toggle(skill)}>{chosen.has(skill) ? <Check size={13} aria-hidden="true" /> : <Plus size={13} aria-hidden="true" />}{skill}</button>)}</div></fieldset>)}
    </section></div>
    <div className="tool-output"><div className="tool-output-head"><h2 className="tool-output-title">Your skills section</h2><span>{chosen.size} selected</span></div>
      {lines ? <pre className="skills-preview">{lines}</pre> : <p className="tool-empty">Select the skills you can back up with an example. They are grouped the way the CV editor expects, one line per group.</p>}
      <div className="tool-actions"><button type="button" className="button dark" disabled={!chosen.size} onClick={addToCV}>Add to my CV<ArrowRight size={16} aria-hidden="true" /></button><CopyButton text={lines} label="Copy skills" /></div>
      <p className="tool-privacy"><LockKeyhole size={14} aria-hidden="true" />Predefined suggestions, chosen by you. Adding them keeps the skills already in your CV.</p>
    </div>
  </div>;
}
