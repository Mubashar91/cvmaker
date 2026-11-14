# FreeCVmaker six-month SEO plan

Prepared 12 November 2026 · Implementation window **16 November 2026 – 15 May 2027** · Times in Asia/Karachi

**Goal:** grow https://www.freecvmaker.online toward **100 organic Google clicks per day**. Do this by improving existing template and example pages, publishing practical AI editing tutorials, and expanding only the topics that earn relevant impressions. The plan assumes 6–8 working hours per week.

The 100-click goal is a stretch target, measured as **2,800 Google Search clicks over a trailing 28 days**. Current Search Console traffic, backlinks and index coverage were unavailable when this was written. All traffic figures below are conditional scenarios, not forecasts of what a new site will achieve in six months.

---

## Progress tracker

Update this table as work ships. When a page changes substantively, also add its path and date to [src/lib/content-dates.ts](src/lib/content-dates.ts) so the sitemap `lastmod` and the visible "Updated" date stay accurate.

| Item | Page | Planned week | Status | Notes |
| --- | --- | --- | --- | --- |
| Baseline | Search Console, analytics, inventory | Week 1 (16–22 Nov) | Code-side inventory done 12 Nov | GSC export and analytics check need account access (owner) |
| A | `/templates/category/student/` | Week 2 (23–29 Nov) | Shipped 12 Nov (early) | Links to E added |
| E | `/tips/improve-cv-bullet-points-with-ai/` (new) | Week 3 (30 Nov–6 Dec) | Shipped 12 Nov (early) | Third example is a student *placement* project: the AI button exists only on Work experience entries. Screenshots: `npm run guides:screenshots` (needs a running site) |
| J | `/tips/ai-cv-maker-vs-template-builder/` | Week 4 (7–13 Dec) | Done 12 Nov | Correction done; now links to E and I |
| B | `/templates/category/simple/` | Week 5 (14–20 Dec) | Shipped 14 Nov (early) | Full basic resume example (Outline template) with PDF and Word export notes; links to the ATS collection and the US format guide |
| C | `/tips/us-resume-format/` | Week 6 (21–27 Dec) | Shipped 14 Nov (early) | Complete reverse-chronological example, editable via "Edit this resume"; student reordering explained |
| D | `/templates/category/ats-friendly/` | Week 7 (28 Dec–3 Jan) | Shipped 14 Nov (early) | Full example plus its text extracted from the real PDF (`npm run ats:sample`); links to the ATS guide and job match. Clarity is the single-template ATS page (CSV plan) |
| F | `/cv-examples/teacher/` | Week 9 (11–17 Jan) | Drafted 14 Nov; review pending | Second full example: primary ECT in England with two PGCE placements; links to the UK format guide and E. **Still needs a UK-teaching reviewer** |
| G | `/cv-examples/retail-assistant/` | Week 10 (18–24 Jan) | Shipped 14 Nov (early) | Year 12 (NSW) casual retail example with availability, peer support, op shop volunteering, and referees; links to the Australian guides and student templates |
| H | `/cv-examples/computer-science-co-op/` (new) | Week 11 (25–31 Jan) | Built 14 Nov; goes live 28 Jan 2027 | Overlap checked: no existing page covers a Canadian CS co-op resume from class projects. Scheduled in `scheduled-pages.ts` |
| I | `/ai-cv-job-match/` | Week 13 (8–14 Feb) | Shipped 14 Nov (early) | Exact free allowance (15 checks, 10 improved CVs a day, 3 a minute) and a worked fictional advert with a shortened evidence report |

### Codebase check, 12 November 2026

These facts came from the repository and the live site. They adjust parts of the plan below.

- **Indexing fixes are live (12 Nov).** `robots.txt` now disallows `/api/`. The 404 page carries a single `noindex` and its own title. `vercel.json` sends `X-Robots-Tag: noindex` for Next.js `.txt` payload files and `/_not-found/`. In Search Console, run **Validate fix** on each reported reason.
- **Search Console property.** The current property is the URL-prefix property `https://www.freecvmaker.online/`. The plan's measurement section asks for a **domain property**, which needs a DNS TXT record. Add it in week 1 and keep the URL-prefix property.
- **Item J is already corrected.** The guide and the site FAQ now say that the fixed helpers use no AI and that optional AI features send only the selected text when asked. Week 4 is now just a re-check plus links to E and I.
- **Per-page sitemap dates already exist** in [src/lib/content-dates.ts](src/lib/content-dates.ts), so the sitemap no longer uses one shared date. Keep that map updated.
- **Responsive template previews already ship** (320 px and 640 px WebP files under `public/templates/responsive/`).
- **Downloads:** the editor offers PDF and an editable Word (.docx) file. Both are **A4**. US pages should say so plainly; Word users can switch to US Letter.
- **AI usage limits as coded** (`api/_shared.mjs`, model `gpt-5-mini`):
  - Per visitor per day: summary 20, bullets 20, job match 15, tailor CV 10, cover letter 10.
  - Global cap `AI_DAILY_LIMIT` defaults to **2,000 requests per day**. At the illustrative $0.0125 per request that is up to **$25 a day**, which would spend the $10 credit in under a day.
  - The global cap is shared across server instances only when Upstash/Vercel KV is configured. Otherwise each instance keeps its own count.
  - **Action:** set `AI_DAILY_LIMIT` in Vercel (for example 25–40) until real cost per request is measured, and confirm the Redis store is configured.
- **Keyword ownership: existing pages that overlap planned items.** Give each query one owner and link the related pages both ways.
  - A vs `/tips/high-school-student-resume/`. A owns "high school resume **template**"; the guide owns "how to write a high school resume with no experience".
  - E vs `/tips/resume-action-verbs-and-bullet-points/`. E owns "improve bullet points **with AI**"; the existing guide owns verbs and manual writing. Both now link to each other.
  - F vs `/tips/teacher-cv-personal-statement/`. F is the full CV; the guide is the profile statement.
  - G vs `/tips/australian-student-resume/` and `/tips/part-time-job-cv/`. Link both from G.
  - H vs `/cv-examples/software-developer/`, `/cv-examples/frontend-developer/`, `/tips/software-engineer-resume-projects/`, `/tips/internship-cv/` and `/tips/canadian-resume-format/`. Create H only if none of these already satisfies "CS co-op resume". Otherwise expand the closest one.

### Keyword targeting plan (CSV), 14 November 2026

The owner added `freecvmaker.online — Keyword Targeting Plan - Keyword Plan.csv`, which shifts weight toward UK and Pakistan searches. Rows marked Existing were applied on 14 Nov. New pages and job examples go live on their CSV dates through `src/lib/scheduled-pages.ts`, with a daily rebuild at 00:30 Asia/Karachi (`.github/workflows/daily-rebuild.yml`).

**Owner action:** the rebuild needs the `VERCEL_DEPLOY_HOOK_URL` GitHub secret before 16 Nov.

Overlaps with this plan:
- **D vs `/templates/clarity/`.** The CSV makes Clarity the single "ATS-friendly CV template" page. D keeps `/templates/category/ats-friendly/` as the collection page. The two link to each other.
- **F vs `/teacher-cv-format/` (live 30 Nov).** That page targets schools in Pakistan. F stays the UK ECT example. The two link to each other.
- **`/canadian-cv-format/` (live 26 Nov) vs the two Canada guides.** The new page is for applicants from Pakistan and India, and links to both guides.
- **`/templates/`.** It now targets "CV template UK" and "free CV template". `/cv-template-word/` (live 19 Nov) owns the "CV template Word" queries.

---

## Keywords and monthly traffic scenarios

Sources: published U.S. search estimates from KwsTrends, updated 7 November 2026 [1], and Semrush September 2026 data [2]. Difficulty scores are provider estimates; low scores need checking against the actual competing pages. Monthly click ranges use a rounded 0.8–2.7% click-through rate, approximating positions 10–5 in AWR U.S. non-brand data [3].

| Keyword | Searches / month | Difficulty | Clicks / month |
| --- | --- | --- | --- |
| Reverse chronological resume template | 8,100 | 12 (lower) | 65–219 |
| High school resume template | 6,600 | 27 (lower) | 53–178 |
| Basic resume template | 6,000 | 20 (lower) | 48–162 |
| Simple resume template | 9,900 | 59 (medium) | 79–267 |
| High school student resume template | 3,600 | 41 (medium) | 29–97 |
| ATS friendly resume template | 18,100–22,000 | 70 (high) | 145–594 |
| AI powered resume builder | 7,300 | 83 (high) | 58–197 |
| Free resume builder | 90,500 | High (qualitative) | 724–2,444 |

Close variants overlap. Keep basic and simple templates together, and keep both high school phrases together. Do not add up all the rows as a site forecast. The ATS range reflects disagreement between providers. These U.S. figures must not be reused as UK, Canadian or Australian volumes.

---

## Research findings and market priorities

The earlier audit found:
- a working www canonical destination,
- a crawlable robots file,
- 119 sitemap page URLs,
- an editor marked noindex.

The homepage's mobile Lighthouse run scored 85 for performance and 100 on the automated SEO checks, with a 3.2-second LCP. These results are a dated baseline; retest after each release and after adding ads [4].

Even apparently easy phrases have established competitors. Indeed and Canva cover high school resume templates, CVMaker covers early-career teacher (ECT) CVs, and Canadian universities publish co-op samples. A low provider difficulty score is a reason to investigate, not proof that ranking will be easy [5–7].

| Market | Priority | Topic and evidence status |
| --- | --- | --- |
| United States | Primary | Student, simple and chronological templates. Published demand estimates available. |
| United Kingdom | Primary | CV bullet improvements and teacher placement examples. Exact long-tail volume unverified. |
| Australia | Test | Year 12 casual retail resume example. Exact volume unverified; specialist competition exists. |
| Canada | Test | Computer science co-op resume with class projects. Exact volume unverified; university competition exists. |
| Ireland and New Zealand | Later | Graduate placements and school-leaver apprenticeships. Validate demand before expanding. |
| Singapore and Germany | Later | English-language internship and developer CV examples. Local demand and conventions need separate validation. |

For each priority query:
1. Check the target country in a keyword tool.
2. Manually review the first ten organic results.
3. Record the date, search intent, result type, the strengths of the competing pages, and one specific improvement your page can offer.

Adding a country name to a search query does not show how a locally geolocated Google search would rank.

**Best product angle:** improve an existing CV with AI, review the factual changes, and download for free. Several competitors offer free rewriting. Differentiate with complete worked examples, transparent limits and a reliable editor. Check AI input and output for invented achievements [8].

---

## Page map and keyword ownership

All paths are under https://www.freecvmaker.online. Existing paths were seen in the audit. Proposed paths are recommendations and must be checked against the codebase before you create them. Keep existing URLs, and merge overlapping ideas into the strongest matching page.

| | Action | Path | Target queries |
| --- | --- | --- | --- |
| A | Update | `/templates/category/student/` | High school resume template; high school student resume template |
| B | Update | `/templates/category/simple/` | Simple resume template; basic resume template |
| C | Update | `/tips/us-resume-format/` | Reverse chronological resume template; US resume format |
| D | Update | `/templates/category/ats-friendly/` | ATS friendly resume template; plain single-column CV |
| E | New (proposed) | `/tips/improve-cv-bullet-points-with-ai/` | How to improve CV bullet points with AI; before and after CV bullets |
| F | Update | `/cv-examples/teacher/` | Primary ECT CV example with teaching placements |
| G | Update | `/cv-examples/retail-assistant/` | Year 12 casual retail resume example Australia |
| H | New (proposed) | `/cv-examples/computer-science-co-op/` | Computer science co-op resume example Canada; class projects |
| I | Update | `/ai-cv-job-match/` | Check CV against job description; AI CV job match |
| J | Update | `/tips/ai-cv-maker-vs-template-builder/` | AI CV maker vs template builder; when AI editing helps |

## What each page must deliver

**A. Student templates.** Add one complete high school first-job example with education, volunteering and projects. Explain what to leave out when experience is missing. Offer an editable template, plus PDF or Word download only where the workflow supports it. Link to the student CV maker, the no-experience guide and the AI editing tutorial.

**B. Simple templates.** Show two or three plain layouts with readable previews, full example text and guidance on choosing a layout. Explain PDF and Word export. Link to the ATS templates and the US format guide.

**C. US format guide.** Add a complete reverse chronological example, with recent experience first, dates and education. Explain what a student should move higher. Include an editable starting template. Use this existing guide before considering a separate chronological page.

**D. ATS templates.** Show selectable text and reading order using a real exported example. Explain how to follow the employer's requested format. Avoid invented ATS scores or promises of interviews. Link to the ATS guide and the job-match tool.

**E. AI bullet tutorial.** Use three fictional examples: retail, teaching placements and a student project. For each, show:
- the original wording,
- the facts supplied,
- the revised wording,
- an unsupported claim to remove.

Include real editor screenshots, and explain what selected text goes to the AI service.

**F. Teacher example.** Add two teaching placement entries and an ECT profile. Have a knowledgeable reviewer check the UK terminology. Link to the UK CV format guide and the AI editing tutorial.

**G. Australian retail example.** Add a Year 12 applicant with weekend availability, school responsibilities and relevant volunteering. Use Australian terminology. Link to the Australian format guide and the student templates.

**H. Canadian co-op example.** Show coursework, one substantial project, the applicant's own contributions and relevant tools. Explain how to follow the institution's co-op format requirements. Link to the Canadian format guide and the developer example.

**I. Job-match tool.** Describe exactly what the tool checks, its free allowance and the review step. Show a fictional job advert and a short, evidence-based report. Keep the primary action visible.

**J. Comparison guide.** Correct the FAQ that says no AI service is called; the homepage describes optional OpenAI requests. Check the current product and privacy wording, then explain how optional AI differs from fixed sentence helpers [9]. *Status: correction done 12 Nov 2026; see the tracker.*

---

## Six-month execution schedule

Start on **Monday 16 November 2026**. Publish or update on **Thursday by 18:00** Asia/Karachi time. Use Monday for evidence and drafting and Friday for QA. This timing is a working rhythm, not a ranking signal.

Each week, budget about:
- 3 hours for content,
- 2 hours for implementation and QA,
- 1–3 hours for measurement and research.

| Week | Dates | Work |
| --- | --- | --- |
| 1 | 16–22 Nov 2026 | **Baseline and inventory:** export 28-day Search Console data; inspect priority URLs; record current conversions. |
| 2 | 23–29 Nov 2026 | **A, student templates:** publish the high school sample and editable template flow. |
| 3 | 30 Nov–6 Dec 2026 | **E, AI bullet tutorial:** publish the new tutorial with three reviewed examples and screenshots. |
| 4 | 7–13 Dec 2026 | **J, factual corrections:** update AI claims and privacy descriptions; link J to E and I. |
| 5 | 14–20 Dec 2026 | **B, simple templates:** improve preview sizing, comparison copy and usable downloads. |
| 6 | 21–27 Dec 2026 | **C, US chronological format:** publish the full chronological example in the existing guide. |
| 7 | 28 Dec 2026–3 Jan 2027 | **D, ATS templates:** add export evidence and links to relevant guides. |
| 8 | 4–10 Jan 2027 | **Month two review:** check indexing and impressions; fix discovery problems before adding pages. |
| 9 | 11–17 Jan 2027 | **F, teacher example:** add the ECT placement example and relevant internal links. |
| 10 | 18–24 Jan 2027 | **G, retail example:** publish the Australian Year 12 example and local guidance. |
| 11 | 25–31 Jan 2027 | **H, Canadian co-op:** publish only if no existing page already satisfies this intent; otherwise expand that page. |
| 12 | 1–7 Feb 2027 | **Month three review:** evaluate all groups by country, query and completed downloads. |
| 13 | 8–14 Feb 2027 | **I, job-match tool:** improve the explanation, limits and one fictional report example. |
| 14 | 15–21 Feb 2027 | **Improve the first winner:** choose one of A–H using relevant impressions and conversion evidence. |
| 15 | 22–28 Feb 2027 | **Second winner update:** address the strongest missing question on a page already gaining visibility. |
| 16 | 1–7 Mar 2027 | **Month four review:** test titles on pages with meaningful impressions; log every change. |
| 17 | 8–14 Mar 2027 | **Conditional supporting article:** publish one new article only if queries show a distinct unmet intent. |
| 18 | 15–21 Mar 2027 | **Tool usability and performance:** retest import, AI editing and downloads on desktop and mobile. |
| 19 | 22–28 Mar 2027 | **Resource outreach:** contact a small set of relevant career educators with a useful free example; no paid link schemes. |
| 20 | 29 Mar–4 Apr 2027 | **Month five review:** review conversion, country mix and the six-month traffic trajectory. |
| 21 | 5–11 Apr 2027 | **Refresh the two strongest pages:** improve examples and internal links using observed queries. |
| 22 | 12–18 Apr 2027 | **Conditional second article:** use a new URL only for a distinct, supported intent; otherwise update an existing page. |
| 23 | 19–25 Apr 2027 | **Ad placement trial:** test one desktop placement, only if policy-eligible; monitor completion and speed. |
| 24 | 26 Apr–2 May 2027 | **Accuracy and broken-link pass:** check examples, claims, titles, canonical tags and site navigation. |
| 25 | 3–9 May 2027 | **Final optimisation:** fix the highest-impact indexing, CTR or conversion issue identified. |
| 26 | 10–15 May 2027 | **Six-month assessment:** compare trailing 28-day clicks, downloads, AI costs and ad revenue; set the next quarter. |

---

## Traffic goals and decision rules

The earlier keyword estimates describe ranking scenarios. They do not show that FreeCVmaker can reach those positions within six months, and a new site can get very few clicks while indexing and relevance build up. Establish the baseline in week 1.

| Scenario at month six | Google clicks / month | Average per day | What would support it |
| --- | --- | --- | --- |
| Limited visibility | 0–300 | 0–10 | Few pages earn relevant impressions. |
| Early traction | 300–900 | 10–30 | Several example or template pages rank for specific searches. |
| Broader traction | 900–2,100 | 30–70 | Multiple groups earn impressions and improved CTR. |
| Goal scenario | About 3,000 | 100 | About 150,000 monthly impressions at 2% CTR, or 75,000 at 4%. |

These are planning bands with no assigned probabilities. The goal needs 2,800 clicks in a trailing 28-day window; at 2% CTR, that window needs 140,000 impressions. Don't compare a 30-day total with a 28-day goal without adjusting for the extra days.

Three selected U.S. phrases (chronological, simple and high school templates) together model at roughly 200–660 monthly clicks at positions 5–10. Adding the ATS phrase gives about 345–1,254. Reaching the full goal therefore needs broader query coverage, higher positions or other successful pages. Related keywords can share demand, so these figures are illustrative only [1–3].

### Monthly decision checkpoints

- **Month one.** Establish indexing and measurement. If priority pages earn no impressions, inspect them.
- **Month two.** Where Google has discovered a page but not indexed it, rework the content or links. Diagnose the reported reason instead of repeatedly requesting indexing.
- **Month three.** Choose the two strongest groups using relevant impressions, clicks and completed downloads. If none shows traction, pause further country pages and investigate intent, differentiation and technical access.
- **Month four.** For pages with stable impressions, compare titles and snippets with the actual queries. Watch the results for several weeks, allowing for changes in average position.
- **Month five.** Calculate the gap to 100 daily clicks, and put most content effort into pages that show demand.
- **Month six.** Report the trailing 28-day result, and record why the next quarter should expand or consolidate particular topics.

---

## Technical SEO and publishing checklist

- **Crawl and canonical:**
  - The preferred URL is HTTPS www.
  - Host redirects are permanent.
  - Each public page has a single canonical.
  - Every sitemap entry returns a success status.
  - Private drafts and editor variants stay out of the index.
- **Sitemap:** include canonical public pages only. Update `lastmod` when content changes materially, by editing `src/lib/content-dates.ts` [10].
- **Page structure:** give each page a specific title, a clear main heading, a descriptive snippet, and visible links to related examples and the right tool. Write unique content that solves the query rather than repeating a country name.
- **Performance:** keep image dimensions reserved. Recheck the hero text rendering delay and any unused CSS or JavaScript. Retest mobile performance after adding ads [4].
- **Structured data:** use supported markup that matches the visible content, and validate it. Don't invent reviews, ratings or rich-result eligibility.
- **Editorial QA:**
  - Check every fictional example for consistency.
  - Verify local conventions against career services or official guidance.
  - Show an author, a review date and a way to request corrections.
- **Product QA:**
  - Test an empty CV, a realistic imported document, AI suggestions, rejecting unwanted edits, and a real export.
  - Check that the downloaded file contains no ad and no leftover example data.
- **Internal links:** link each guide to an example, each example to a fitting template, and each template to the editor. Prefer links to related roles or stages over arbitrary "next example" links.

### Measurement setup

- Use a Search Console **domain property**. Each week, record page, query, country, clicks, impressions, CTR and average position [11].
- Track editor starts, AI requests, successful suggestions and completed downloads in aggregate.
- Exclude CV contents, names, contact details and uploaded text from analytics.
- Record model ID, token usage and cost separately, without any CV text.

Two derived measures:
- **Organic download rate** = completed downloads from organic sessions ÷ organic sessions.
- **AI cost per completed CV** = total AI cost ÷ AI-assisted completed CVs.

Define each event once, and check that retries or double clicks don't inflate the totals.

---

## Free AI and advertising economics

Keep the value proposition accurate: free editing and download, optional AI help, and clear usage limits. The owner reported adding $10 of API credit. Verify model availability, current pricing and actual usage before setting a long-term allowance (see the AI limits note in the codebase check above).

**Illustrative budget only.** At $0.0125 per AI request, $10 funds 800 requests. Twenty requests a day costs $0.25 and would use up the $10 in 40 days; two requests per visitor double that cost. When measuring the real total, include prompt, output and billable reasoning tokens, retries and any tool charges.

Use a server-side allowance and request limit, and show visitors how much allowance remains. A request to improve one bullet should send only the text and context it needs. Track actual cost before describing AI use as unlimited.

**Advertising:**
- If approved, start advertising on useful public guides and examples.
- Assess the editor separately for publisher-content and placement eligibility.
- Keep ads clearly identifiable, and away from the Download, Improve with AI and template controls.
- Reserve desktop sidebar space, and protect the editor on small screens.
- Compare completion rates before and after each change [12].

**Revenue scenario:** pageviews ÷ 1,000 × page RPM. At 3,000 search visits a month and an assumed two pageviews per visit, 6,000 pageviews would earn $6 at $1 RPM, $18 at $3 RPM or $30 at $5 RPM. These RPM values test sensitivity; they are not a forecast. Consent, country mix, eligible ad views, ad blockers and ad demand all affect real revenue.

Keep a placement only if its measured net contribution and the user completion rate support it, counting hosting and AI costs. A search click, a pageview and an ad click are different measures; the six-month goal is about organic search clicks.

---

## Sources and research limitations

Research was checked on 12 November 2026. It combines a live inspection of the site, published keyword estimates, sampled search results and primary Google documentation. Public sources don't show FreeCVmaker's actual Google performance. The U.S. keyword dataset is an exploratory estimate, and several related terms have very different difficulty scores, so validate them before investing heavily.

1. KwsTrends U.S. keyword estimates: https://www.kwstrends.com/keywords/us/resume-template
   1b. KwsTrends AI and builder estimates: https://www.kwstrends.com/keywords/us/resume-builder
2. Semrush free resume builder estimate: https://www.semrush.com/website/resume.com/overview/
   2b. Semrush ATS estimate: https://www.semrush.com/website/resumeworded.com/overview/
3. AWR U.S. non-brand CTR by position: https://www.advancedwebranking.com/seo/organic-ctr
4. Mobile homepage lab report: https://pagespeed.web.dev/analysis/https-www-freecvmaker-online/2se205pz7k?form_factor=mobile
5. Indeed high school template competitor: https://www.indeed.com/career-advice/resumes-cover-letters/high-school-resume-template
6. CVMaker ECT competitor: https://www.cvmaker.uk/cv-example/early-career-teacher
7. University of Ottawa co-op guidance: https://www.uottawa.ca/study/career-experiential-learning/coop/resume
8. Google helpful content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
9. Existing AI comparison guide: https://www.freecvmaker.online/tips/ai-cv-maker-vs-template-builder/
   9b. Current product claims: https://www.freecvmaker.online/
10. Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
11. Search Console performance documentation: https://support.google.com/webmasters/answer/7576553
12. Google ad placement policy: https://support.google.com/adsense/answer/1346295
    12b. Publisher content eligibility: https://support.google.com/publisherpolicies/answer/11112688

Proposed URLs and publishing dates are implementation recommendations. Unknown search volumes remain unknown. The research labels for narrow UK, Australian and Canadian topics are qualitative; don't present them as verified low keyword-difficulty scores.
