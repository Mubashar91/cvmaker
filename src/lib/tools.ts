// Application tools: classic tools run on the visitor's device; optional AI
// features send only the text the visitor supplies, and only when they ask.
import { professions } from "./skills-library";
export const tools = [
  {
    path: "/cover-letter-maker/", name: "Cover letter maker", icon: "mail",
    title: "Cover Letter Templates UK — Free Maker & Examples",
    description: "Free cover letter templates for UK jobs: three layouts, two full example letters, and a maker that fills in your details. Download a PDF, no sign-up.",
    summary: "Turn your details into a tailored letter, edit every line, then copy, print, or download it as a PDF.",
  },
  {
    path: "/resume-keyword-checker/", name: "Resume keyword checker", icon: "search",
    title: "Free Resume Keyword Checker for Job Descriptions",
    description: "Check your resume against a job description for free. See matching and missing keywords and how to check ATS compatibility. Nothing is uploaded.",
    summary: "Compare your CV with a job description and see which keywords you cover and which are missing.",
  },
  {
    path: "/ai-cv-job-match/", name: "AI CV job match", icon: "sparkles",
    title: "Free AI CV Checker — Match Your CV to a Job",
    description: "Check your CV against a job description with free AI help: see which requirements you meet with evidence, what is missing, and what to improve.",
    summary: "Paste a job advert and get an AI report on your CV: met requirements, gaps, and honest improvements.",
  },
  {
    path: "/resume-summary-builder/", name: "Resume summary builder", icon: "wand",
    title: "Resume Summary Templates: 12 Examples & Free Builder",
    description: "12 resume summary templates and CV personal profile examples to copy, plus a free builder that turns your own details into three editable drafts.",
    summary: "Combine your own details into three professional summary drafts, then add one to your CV.",
  },
  {
    path: "/resume-objective-generator/", name: "Resume objective generator", icon: "target",
    title: "Free Resume Objective Generator for Students",
    description: "Write a resume objective for an internship, first job, or career change. Combine your details with clear sentence patterns, then edit the result. Free.",
    summary: "Write a short career objective for an internship, a first job, or a change of direction.",
  },
  {
    path: "/resume-bullet-point-generator/", name: "Resume bullet point builder", icon: "list",
    title: "Free Resume Bullet Point Generator — No Sign-Up",
    description: "Build resume bullet points from your own actions, tasks, and results. Edit and copy each line for work, projects, or volunteering. Free, no sign-up or AI.",
    summary: "Turn an action, a task, and an optional result into an editable CV bullet point using your own facts.",
  },
  {
    path: "/resume-skills/", name: "Skills for your resume", icon: "list",
    title: `Skills to Put on a Resume — Free Ideas for ${professions.length} Jobs`,
    description: `Find skills to put on your resume for ${professions.length} jobs, from software developer to nurse. Pick hard skills, tools, and strengths and add them to your CV for free.`,
    summary: `Browse common skills, tools, and strengths for ${professions.length} jobs and add the ones that fit to your CV.`,
  },
] as const;

export type ToolPath = typeof tools[number]["path"];
export function tool(path: ToolPath) { return tools.find(item => item.path === path)!; }
/** A tool name for mid-sentence use: lowercased, keeping acronyms such as AI and CV. */
export function toolCardLabel(name: string): string {
  return name.split(" ").map(word => (word === word.toUpperCase() ? word : word.toLowerCase())).join(" ");
}

export const toolsHub = {
  path: "/tools/", label: "Free tools",
  title: "Free CV & Resume Tools for Job Applications",
  description: "Free job application tools: a cover letter maker, resume keyword checker, summary builder, objective generator, bullet point builder, and skill ideas.",
};

export const studentPage = {
  path: "/cv-maker-for-students/", label: "CV maker for students",
  title: "Student CV Template & Example — Free CV Maker",
  description: "A free student CV template and example: start from an education-first layout, follow clear guidance, and download a PDF, even with no work experience.",
};

export const noExperiencePage = {
  path: "/cv-with-no-experience/", label: "CV with no experience",
  title: "CV Example With No Experience — Free CV Builder",
  description: "A full CV example with no work experience: a student's CV built from school, volunteering, and projects. Edit it free and download a PDF, no sign-up.",
};
