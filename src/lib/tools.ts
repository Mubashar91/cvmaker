// Free browser tools. Each works on the visitor's device with predefined templates and
// plain JavaScript. None of them call an AI service or a server.
export const tools = [
  {
    path: "/cover-letter-maker/", name: "Cover letter maker", icon: "mail",
    title: "Free Cover Letter Maker — Professional Templates & PDF",
    description: "Create a cover letter online for free, with no sign-up. Our cover letter builder turns your details into a professional letter to edit and download as a PDF.",
    summary: "Turn your details into a tailored letter, edit every line, then copy, print, or download it as a PDF.",
  },
  {
    path: "/resume-keyword-checker/", name: "Resume keyword checker", icon: "search",
    title: "Free Resume Keyword Checker — Compare Your CV to a Job",
    description: "Check your resume against a job description for free. See matching and missing keywords and how to check ATS compatibility. Nothing is uploaded.",
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
    path: "/resume-bullet-point-generator/", name: "Resume bullet point builder", icon: "list",
    title: "Free Resume Bullet Point Generator — No Sign-Up",
    description: "Build resume bullet points from your own actions, tasks, and results. Edit and copy each line for work, projects, or volunteering. Free, with no sign-up or AI.",
    summary: "Turn an action, a task, and an optional result into an editable CV bullet point using your own facts.",
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
  description: "Free job application tools: a cover letter maker, resume keyword checker, summary builder, objective generator, bullet point builder, and skill ideas.",
};

export const studentPage = {
  path: "/cv-maker-for-students/", label: "CV maker for students",
  title: "Free CV Maker for Students & Graduates",
  description: "A free student resume builder and CV maker: start from an education-first layout, follow clear guidance, and download a PDF, even with no work experience.",
};

export const noExperiencePage = {
  path: "/cv-with-no-experience/", label: "CV with no experience",
  title: "Free Resume Builder With No Experience — First Job CV",
  description: "Create a CV with no work experience for free. Use projects, volunteering, and everyday responsibilities to show your skills, then download a PDF without sign-up.",
};
