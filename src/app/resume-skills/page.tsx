import Link from "next/link";
import { ToolPage } from "@/components/tool-page";
import { SkillsFinder } from "@/components/skills-finder";
import { pageMetadata } from "@/lib/seo";
import { professionGroups, professions } from "@/lib/skills-library";
import { tool } from "@/lib/tools";
import { cvExample } from "@/lib/cv-examples";

const page = tool("/resume-skills/");
export const metadata = pageMetadata({ title: page.title, description: page.description, path: page.path, image: "/social/tools/resume-skills.png" });

/** Every predefined list as plain HTML, so the suggestions are readable without the tool. */
function SkillsLibrary() {
  return <section className="section skills-library" aria-labelledby="skills-by-job"><div className="container">
    <div className="section-head"><div><h2 id="skills-by-job">Skills for a resume, by job.</h2><p>Common skills, tools, and strengths for {professions.length} jobs. Pick the ones you can back up with an example.</p></div></div>
    {professionGroups.map(group => <div className="skills-library-group" key={group}><h3>{group}</h3><div className="skills-library-grid">{professions.filter(item => item.group === group).map(item => <details key={item.id} className="skills-library-item"><summary><span>Skills for a {item.name.toLowerCase()} resume</span></summary>
      <div className="skills-library-lists"><div><h4>Job skills</h4><ul>{item.hard.map(skill => <li key={skill}>{skill}</li>)}</ul></div><div><h4>Tools and software</h4><ul>{item.tools.map(skill => <li key={skill}>{skill}</li>)}</ul></div><div><h4>Strengths</h4><ul>{item.soft.map(skill => <li key={skill}>{skill}</li>)}</ul></div></div>
      {item.example && cvExample(item.example) && <Link className="text-link" href={`/cv-examples/${item.example}/`}>See a complete {cvExample(item.example)!.job.toLowerCase()} CV example</Link>}
    </details>)}</div></div>)}
  </div></section>;
}

export default function ResumeSkillsPage() {
  return <ToolPage path={page.path} heading="Skills to put on a resume: ideas for 22 jobs."
    intro="Choose a job to see common job skills, tools, and strengths, select the ones you can back up, and add them to your CV in one click. Every list is predefined, and you can browse them all below."
    points={[`${professions.length} jobs covered`, "Job skills, tools, and strengths", "Adds to your CV in one click", "No sign-up"]}
    featureList={[`Skill suggestions for ${professions.length} jobs`, "Job skills, tools, and personal strengths", "Grouped skills lines for the CV editor", "Copy to clipboard", "Add to the CV in Folio’s editor"]}
    extra={<SkillsLibrary />}
    guide={[
      { id: "types-of-skills", heading: "Job skills, tools, and strengths", paragraphs: [
        "Job skills, often called hard skills, are the abilities and knowledge specific to the work, such as care planning, month-end close, or responsive web design. Tools are the software, equipment, and methods you use. Strengths, often called soft skills, describe how you work: communication, organisation, or staying calm under pressure.",
        "Employers usually look for all three, but they weigh job skills and tools most heavily in the skills section. Strengths are more convincing when an experience bullet shows them in action.",
      ] },
      { id: "choose-skills", heading: "How to choose which skills to list", paragraphs: ["Start from the job advert, not from the longest list you can make."], bullets: [
        "Pick skills the advert asks for that you can support with an example.",
        "Aim for roughly 8 to 12 skills in total, grouped by type.",
        "Put the most relevant group first, and write tool names exactly as their makers do.",
        "Leave out skills almost everyone has, such as using email, unless the advert asks for them.",
        "Check your choices with the [resume keyword checker](/resume-keyword-checker/).",
      ] },
      { id: "where-skills-go", heading: "Where skills belong on a CV", paragraphs: [
        "Most CVs have a short skills section, written as grouped lines such as “Tools: Excel, Power BI, SQL”. Folio’s editor reads these lines, and some templates, such as Tech, show each group as labelled tags.",
        "The strongest place for a skill is inside your experience, next to what you achieved with it. See how that works in our [CV examples by job](/cv-examples/), or read [how to describe your work experience](/tips/describe-your-experience/).",
      ] },
    ]}
    faqs={[
      { question: "How many skills should I put on my resume?", answer: "Around 8 to 12 relevant skills is a practical range for most CVs. Quality matters more than quantity: each one should be relevant to the role and backed up elsewhere in your CV." },
      { question: "Are soft skills worth listing?", answer: "A few, if the advert asks for them. They are more convincing when an achievement in your experience section shows them, for example leading a handover or resolving a complaint." },
      { question: "Should I list a tool I have only used a little?", answer: "Only if you could talk about how you used it. If you are still learning it, say so honestly, for example “Python (basic)”." },
      { question: "Are these skill lists complete?", answer: "No list can cover every job. These are common, widely recognised skills to help you start. Always check the job advert and add skills specific to the role." },
    ]}>
    <SkillsFinder />
  </ToolPage>;
}
