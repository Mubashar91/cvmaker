// Free browser tools. Each works on the visitor's device with predefined templates and
// plain JavaScript. None of them call an AI service or a server.
export const tools = [
  {
    path: "/cover-letter-maker/", name: "Cover letter maker", icon: "mail",
    title: "Free Cover Letter Maker — Professional Templates & PDF",
    description: "Create a cover letter online for free. Fill in your details, choose a professional layout, edit every line, then copy, print, or download a PDF. No sign-up.",
    summary: "Turn your details into a tailored letter, edit every line, then copy, print, or download it as a PDF.",
  },
  {
    path: "/resume-keyword-checker/", name: "Resume keyword checker", icon: "search",
    title: "Free Resume Keyword Checker — Compare Your CV to a Job",
    description: "Check your resume against a job description for free. See matching and missing keywords in seconds. It runs in your browser, so nothing is uploaded or stored.",
    summary: "Compare your CV with a job description and see which keywords you cover and which are missing.",
  },
  {
    path: "/resume-summary-builder/", name: "Resume summary builder", icon: "wand",
    title: "Resume Summary Builder — Free CV Profile Generator",
    description: "Build a professional resume summary or CV profile from your own details. Get three editable versions and add your favourite to your CV. Free, no sign-up.",
    summary: "Combine your own details into three professional summary drafts, then add one to your CV.",
  },
  {
    path: "/resume-objective-generator/", name: "Resume objective generator", icon: "target",
    title: "Free Resume Objective Generator for Students & First Jobs",
    description: "Write a resume objective for an internship, first job, or career change. Combine your details with clear sentence patterns, then edit the result. Free.",
    summary: "Write a short career objective for an internship, a first job, or a change of direction.",
  },
  {
    path: "/resume-skills/", name: "Skills for your resume", icon: "list",
    title: "Skills to Put on a Resume — Free Ideas for 22 Jobs",
    description: "Find skills to put on your resume for 22 jobs, from software developer to nurse. Choose hard skills, tools, and strengths, then add them to your CV for free.",
    summary: "Browse common skills, tools, and strengths for 22 jobs and add the ones that fit to your CV.",
  },
] as const;

export type ToolPath = typeof tools[number]["path"];
export function tool(path: ToolPath) { return tools.find(item => item.path === path)!; }

export const toolsHub = {
  path: "/tools/", label: "Free tools",
  title: "Free CV & Resume Tools for Job Applications",
  description: "Free tools for every part of a job application: a cover letter maker, resume keyword checker, summary builder, objective generator, and skill ideas.",
};

export const studentPage = {
  path: "/cv-maker-for-students/", label: "CV maker for students",
  title: "Free CV Maker for Students & Graduates",
  description: "Make a student CV or graduate resume for free, even with no work experience. Start from an education-first layout, follow clear guidance, and download a PDF.",
};
