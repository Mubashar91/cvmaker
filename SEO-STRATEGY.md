# Free CV Maker keyword map

The supplied keyword list is a set of research candidates. Search volume, difficulty, demand by country, and ranking potential have not been verified. Keep closely related queries on one useful page; preserve established URLs so existing links and indexing remain valid.

## Priority shortlist

| Supplied target | Canonical content destination | Current coverage |
| --- | --- | --- |
| Free AI CV Maker | `/` | Targets free CV maker, online CV builder, and free resume maker. Optional AI summary/bullet improvement and CV tailoring now exist. |
| Free CV Maker Without Signup | `/` | Homepage copy, pricing and signup FAQs, and working editor and download flow. |
| Free AI Resume Builder | `/` | Shares homepage intent. Describe the optional AI feature accurately alongside the local template workflow. |
| Free Resume Builder Without Payment | `/` | Free editing and PDF download, no card, subscription, or watermark. |
| Free AI Resume Summary Generator | `/resume-summary-builder/` | Free resume summary and CV personal statement builder using fixed patterns. Describe the optional AI feature accurately alongside the local template workflow. |
| Free AI Cover Letter Generator | `/cover-letter-maker/` | Free, editable cover letter templates with PDF download. Describe the optional AI feature accurately alongside the local template workflow. |
| Free Resume Bullet Point Generator | `/resume-bullet-point-generator/` | Working browser tool that combines an action, task, context, and optional result; editable and copyable. |
| Free CV Maker for Students | `/cv-maker-for-students/` | Education-first editor setup, templates, fictional example, and student guidance. |
| Free Resume Builder for Fresh Graduates | `/cv-maker-for-students/` | Same audience and intent as the student page; do not split into a competing graduate page. |
| Free ATS Resume Checker | `/resume-keyword-checker/` and `/tips/ats-friendly-cv/` | Keyword comparison and format guidance only. There is no employer ATS simulation or validated ATS score; do not claim either. |
| Free CV Template for Software Engineers | `/cv-examples/software-developer/` | Complete editable software developer example with profiles, bullets, skills, and a template. |
| Free CV Template for Teachers | `/cv-examples/teacher/` | Complete editable teaching example and writing guidance. |
| Free Resume Builder for No Experience | `/cv-with-no-experience/` | First-job landing page for students and non-students, blank Clarity CV setup, examples of transferable evidence, and related writing tools. |
| Free Resume Keyword Matcher | `/resume-keyword-checker/` | Existing matcher reads PDF/DOCX locally and compares terms with a job description. Keep this URL rather than adding a duplicate `/resume-keyword-matcher/`. |
| Free CV Maker with PDF Download | `/` | Homepage explains the free A4 PDF download and import limits. |

## Supporting clusters

- **Templates:** `/templates/` and its existing category pages cover ATS-friendly, professional, modern, simple, student, and photo layouts. No template guarantees compatibility with every application system.
- **Professions:** use `/cv-examples/software-developer/`, `/cv-examples/frontend-developer/`, `/cv-examples/accountant/`, `/cv-examples/teacher/`, `/cv-examples/customer-service/`, `/cv-examples/graphic-designer/`, `/cv-examples/project-manager/`, `/cv-examples/nurse/`, `/cv-examples/marketing-executive/`, `/cv-examples/data-analyst/`, and `/cv-examples/administrator/`. Software engineer and web developer intent can use the software and frontend examples; there is no separate web developer page. Do not create a second set of near-identical top-level pages.
- **First applications:** connect `/cv-with-no-experience/`, `/cv-maker-for-students/`, `/tips/your-first-cv/`, `/tips/part-time-job-cv/`, `/tips/internship-cv/`, and `/tips/projects-on-a-cv/`. The landing pages start the task; the guides explain it in detail.
- **Writing tools:** summary, objective, bullet point, cover letter, and skills tools support their own distinct tasks. Describe fixed sentence patterns honestly. AI rewriting is available in the editor; LinkedIn summaries and application emails remain unimplemented.
- **Country intent:** use the UK, US, Canadian, and Australian format guides under `/tips/`. They already contain local terminology, free-template links, beginner advice, and editor limitations. CV output is A4; do not promise US Letter CV downloads.

## Delivery and measurement

### Added blog coverage

These 20 original posts extend the existing `/tips/` collection. They target distinct informational tasks and link to the existing tool or landing page for the creation task.

All 20 were revised after an editorial research pass using primary sources. Their section citations, source lists, and check dates are recorded in the content; [BLOG-RESEARCH.md](BLOG-RESEARCH.md) maps the findings to the revisions. Keyword demand and difficulty remain unverified.

| Blog path under `/tips/` | Keyword intent |
| --- | --- |
| `free-cv-maker-without-signup/` | Free CV creation without registration |
| `free-resume-builder-without-payment/` | Checking free downloads and payment limits |
| `cv-pdf-download-checklist/` | Free CV PDF download and file checks |
| `ai-cv-maker-vs-template-builder/` | Understanding free AI CV makers versus template tools |
| `tailor-resume-to-job-description/` | Resume keyword matching against an advert |
| `resume-summary-examples-for-students/` | Student resume summaries without experience |
| `career-change-resume-summary/` | Career-change resume summary examples |
| `cover-letter-with-no-experience/` | First-job cover letter writing |
| `resume-action-verbs-and-bullet-points/` | Resume action verbs and bullet point structure |
| `skills-for-a-first-job-resume/` | Resume skills without paid experience |
| `high-school-student-resume/` | High school first-resume format |
| `fresh-graduate-cv-checklist/` | Fresh graduate CV format and evidence |
| `software-engineer-resume-projects/` | Software engineer resume project examples |
| `teacher-cv-personal-statement/` | Teacher CV personal statement examples |
| `customer-service-resume-skills/` | Customer service resume skills and evidence |
| `data-analyst-resume-projects/` | Data analyst resume project descriptions |
| `uk-student-cv-checklist/` | UK student CV format |
| `us-first-job-resume/` | US first-job resume with no experience |
| `canadian-newcomer-resume/` | Canadian resume for newcomers |
| `australian-student-resume/` | Australian student and casual-job resume |

### Release checks

New public routes need a unique title and description, a visible main heading, canonical and social URLs, breadcrumbs, relevant structured data, a generated social image, sitemap inclusion, and contextual internal links. The shared SEO audit checks exported pages, internal links, metadata, assets, and sitemap consistency.

```powershell
npm run seo:assets
npm run typecheck
npm run build
npm run seo:check -- --require-origin
```

The production origin is configured by the project. Deploy the reviewed local changes through the existing hosting process, then use Search Console to inspect the new URLs and submit the sitemap. No deployment or Search Console submission is performed by this change.

Before expanding a cluster, validate candidates in Keyword Planner and compare regional interest in Google Trends. Use Search Console query and page data to record impressions, clicks, CTR, and average position by country. Check whether the intended page receives relevant queries and whether visitors can complete the intended task. Compare equivalent periods after indexing; do not treat a ranking change as proof that one copy edit caused it.

AI-specific coverage can now describe the implemented summary, bullet, cover letter, matching, and tailoring features. Keep each target aligned with the page that actually provides it. ATS score queries need a defined, tested assessment before making scoring claims. The supplied content allocation ends at 40% AI tools and 25% student content; it is incomplete and is not used as a publishing quota.

This approach follows [Google's guidance on useful, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and the [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): provide a useful destination for each intent and describe it clearly.
