**Folio SEO and site review — 12 November 2026**

Implementation update: the subsequent fixes add responsive preview assets, correct the three obsolete guides, add contextual links, introduce page-specific modification dates, and move optional provider scripts after hydration. Fresh editor/tool/privacy visits do not start advertising. Analytics now requires explicit opt-in after Web Analytics is enabled in the Vercel project; dashboard enablement and production deployment are still required. Historical live measurements below describe the audited deployment, not the updated local build. Five production-browser regression tests and 37 API tests passed.

The site has a sound crawlable foundation. The main remaining work is accurate content, dependable measurement, and faster mobile loading. This review did not find a broad crawl block, duplicate canonical setup, or broken public route. It does not establish how many pages Google has indexed or how well they rank.

Scope: the current project, a fresh production build, all 119 URLs in the live sitemap, the editor, six representative mobile pages, redirect and error-page probes, and current Google documentation. This review makes no production changes.

**What already works**

| Check | Result |
| --- | --- |
| Production build and TypeScript | Passed |
| Existing strict SEO audit | Passed for 120 exported routes, including the intentionally excluded editor |
| AI API regression tests | All 37 passed with mocked providers; no billable requests were made |
| Live sitemap | HTTP 200; 119 canonical public URLs |
| Live public URLs | All 119 returned HTTP 200 |
| Canonicals | All crawled pages used the expected HTTPS www URL |
| Titles and descriptions | No exact duplicates found across the crawled pages |
| Public-page main headings | One H1 per indexable page |
| Editor indexing | Correctly uses noindex, follow and is excluded from the sitemap |
| Robots | Allows crawling and points to the correct sitemap |
| Missing page | A deliberately nonexistent URL returned a real HTTP 404 |
| Images in fetched HTML | All had alt attributes and width/height attributes; decorative empty alt text is valid |
| Navigation | No unknown internal page destinations or broken fragments found in the crawl |
| Mobile width | No horizontal document overflow on the six sampled pages at 390 pixels |
| Content coverage | 40 template detail pages, 16 job-specific examples, and 38 guides |

The crawl checked exact duplicate main text as well as metadata and found none. This is not a claim that every page is sufficiently differentiated for every search query, or a substitute for reviewing Google Search Console exclusions.

**Prioritized work**

| Priority | Work | Evidence and expected benefit |
| --- | --- | --- |
| High | Restore analytics collection | The deployed /_vercel/insights/script.js returned 404 on all six browser samples and on direct/cache-busted rechecks. Page views and application events cannot be relied on while the loader fails. |
| High | Update inaccurate guides | Three live guides still describe features that have since been added as unavailable. This misleads readers and weakens the path from guide to tool. |
| High | Improve mobile template-page loading | The catalogue's observed LCP was 6.38 and 6.36 seconds in two synthetic cold loads. Reduce image and third-party work, then measure again. |
| High | Restrict advertising scripts to intended pages | The editor, privacy page, and matching form all load the advertising script from the root layout. The editor downloaded about 262 KB of advertising JavaScript in the initial sample. |
| Medium | Use dates for each page | Sitemap lastmod, visible update labels, and Article dateModified share one global date. Keep them tied to substantive updates for the individual page. |
| Medium | Improve contextual internal linking | Several useful guides have only one other crawled page linking to them inside its main content, despite broad footer navigation. |
| Medium | Use search and conversion data to choose the next work | Search Console indexing, queries, CTR, countries, and conversion data were not available in this review. Avoid choosing expansion priorities from assumed search volume. |
| Medium | Add evidence of the people and work behind the advice | The author page exists and sources are present, but the author's profile list is empty. Real profile links, reviewed examples, and documented tests can make the advice more credible. |
| Medium, diagnostic | Investigate a possible hydration timing problem | Instrumented mobile runs reported React error 418; separate control runs did not. Confirm the conditions before treating it as a persistent fault or attributing it to advertising. |
| Low | Update structured-data expectations and the SEO plan | FAQ rich results have been retired. Existing application schema also lacks the rating/review needed for Google's software-app rich result. The internal strategy still says AI is deferred. |
| Low | Shorten the HTTP apex redirect chain | http://freecvmaker.online currently takes two permanent redirects to the canonical www HTTPS URL. The destination is correct. |

**1. Analytics and search measurement**

The page HTML includes /_vercel/insights/script.js, but the URL responds with a 404 HTML page. This was confirmed in browser requests and with a cache-busting query parameter. The source includes anonymous events for imports, downloads, and tailored-CV creation in src/lib/analytics.ts, src/app/editor/page.tsx, src/components/job-match.tsx, and src/components/tailored-cv.tsx. Those events need a working collection script, and custom-event availability also needs to be checked against the actual hosting plan.

Check that Web Analytics is enabled for the correct Vercel project/deployment and that its script endpoint works on the custom domain. After configuration and deployment, verify a page view and a test download in the dashboard. The current privacy page says visits are counted, so check that this accurately describes the deployed service.

For organic search, review the Search Console sitemap and Page Indexing reports, then export query/page/country/device performance. Check important tool pages individually with URL Inspection. A reachable sitemap and verification tags do not prove successful indexing, ownership verification, or search traffic. [Google's Search Console guide](https://developers.google.com/search/docs/monitor-debug/search-console-start) explains the relevant reports.

**2. Refresh the guides that contradict the product**

These statements were found in the live main content as well as the source:

| Page | Outdated statement | Source |
| --- | --- | --- |
| /tips/free-resume-builder-without-payment/ | Folio does not export Word CVs; its helpers do not call AI | src/lib/guides-free-tools.ts |
| /tips/ai-cv-maker-vs-template-builder/ | Folio does not provide AI rewriting and does not call an AI service | src/lib/guides-free-tools.ts |
| /tips/us-first-job-resume/ | Folio does not offer editable Word export | src/lib/guides-country-blogs.ts |

Replace those statements with the actual distinction: local editing and fixed-pattern helpers work without AI; optional AI features send the selected text after a user action; PDF and editable Word CV downloads are available. Preserve the valid limitation that CV output is A4 unless the product is changed. Word export uses a clean editable layout rather than copying every PDF template's graphic design, so explain that accurately.

Also update SEO-STRATEGY.md. It still says AI features are deferred and AI rewriting is unimplemented. Refresh the keyword-to-page map around the features that actually exist. Keep the summary builder's description accurate: the standalone builder uses predefined patterns, while AI summary improvement lives in the editor. Do not add an AI keyword to a page whose tool does not provide that behavior.

Review other feature explanations when adding capabilities, rather than only updating the homepage. Add a lightweight content check for known obsolete product claims.

**3. Mobile performance and advertising scope**

The browser observations used a 390-pixel viewport, a cold context for each page, four-times CPU slowdown, 100 ms network latency, and approximately 4 Mbps downstream. Measurements were collected six seconds after DOMContentLoaded. They are synthetic observations, not Lighthouse scores or real-user Core Web Vitals results.

| Page | Observed LCP | Transferred resources, initial sample |
| --- | --- | --- |
| Homepage | 7.85 seconds initially; 1.50 seconds on repeat | Approximately 0.96 MB |
| Template catalogue | 6.38 seconds initially; 6.36 seconds on repeat | Approximately 1.18 MB |
| AI CV job match | 1.46 seconds, one sample | Approximately 0.67 MB |
| ATS-friendly guide | 4.77 seconds, one sample | Approximately 0.79 MB |
| Editor, blank CV | 2.28 seconds, one sample | Approximately 0.63 MB |
| Privacy | 1.98 seconds initially; 1.51 seconds on repeat | Approximately 0.70 MB |

The homepage result varies substantially, so it would be misleading to call 7.85 seconds its normal speed. The repeated catalogue result is the stronger optimization signal. Observed layout shift remained below 0.1 in these short windows, but longer sessions and interactions were not measured. INP was not assessed. Google's good-performance targets are LCP at most 2.5 seconds, INP at most 200 ms, and CLS at most 0.1, assessed using real-user percentiles. [Web Vitals guidance](https://web.dev/articles/vitals).

The public PageSpeed API returned HTTP 429 RESOURCE_EXHAUSTED. No PageSpeed score or CrUX result is available from that attempt.

Concrete improvements to test:

- Serve smaller responsive preview files for cards. MiniCV and GuideImage use 953 by 1348 images without srcset/sizes; several requested template images were approximately 74–82 KB each. Keep the large version for full previews.
- Restrict the AdSense loader in src/app/layout.tsx to intended content routes. A disabled adConfig does not disable that root script. Loading a script is distinct from displaying an advertisement; the review did not prove that an ad was shown inside the editor.
- Test delaying nonessential advertising work until the main content is usable. The loader plus its implementation script accounted for about 260 KB in the editor sample.
- Review the approximately 90 KB Latin Archivo font and avoid loading unused character sets or variants. Test font-display and a close fallback for text LCP.
- Keep PDF/DOCX processing dynamically loaded. It already has lazy-loading code; do not remove that advantage while optimizing.
- Consider route-specific styles and client boundaries after the larger image/advertising costs are addressed. The root layout currently imports editor, information, template, and tools styles on every route.

**4. Hydration: preserve the uncertainty**

React error 418 appeared on all six initial instrumented mobile samples and on all three instrumented repeats. It means React detected a mismatch between server-rendered and client-rendered content. [React's error reference](https://react.dev/errors/418).

However, three separate plain-browser control runs and three throttled mobile control runs completed without that error. Controls included normal requests, blocked advertising, and blocked external requests. Therefore the cause and its real-user frequency remain unconfirmed; the evidence does not establish that advertising causes it. Reproduce with production error logging and a clean browser before changing server/client markup or adding hydration-warning suppression. The checked pages remained readable.

**5. Dates, structured data, and search appearance**

All live sitemap entries use 2026-11-11 as lastmod. src/lib/seo.ts supplies CONTENT_UPDATED to the sitemap, Article markup, and visible guide/policy labels. Changing one constant can make unchanged pages appear newly updated. Add per-page published/modified values and use them consistently; preserve historical publication dates. Twenty-two of the 54 live Article objects have no datePublished. Add known dates where records exist, rather than inventing them. Google says sitemap lastmod should reflect a significant update to that page. [Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

The live crawl found FAQPage markup on 44 pages. Keep useful visible FAQs, but do not plan on FAQ rich results: Google retired that search feature in May 2026. Removing the redundant Google-focused JSON-LD can be a low-priority cleanup; its presence is not evidence of an indexing penalty. [Google's documentation updates](https://developers.google.com/search/updates).

Eight pages contain WebApplication markup without review or aggregateRating. They can describe an application semantically, but this does not satisfy Google's software-app rich-result rating/review requirement. Add rating markup only when authentic, visible reviews exist. Do not fabricate ratings to clear a validator. [Software-app requirements](https://developers.google.com/search/docs/appearance/structured-data/software-app).

Titles and descriptions are already distinct; avoid treating arbitrary character counts as an SEO score. Test whether titles clearly communicate the task and supported downloads, particularly where Word export is now an advantage. Use Search Console query and CTR data to judge changes.

**6. Internal linking, useful content, and authority**

Several guides have only one other crawled page linking to them within main content. Examples include common-cv-mistakes, teacher-cv-personal-statement, uk-student-cv-checklist, canadian-newcomer-resume, and australian-student-resume. Footer links were deliberately excluded from this count.

Add relevant links where a reader would naturally need the next step: the teacher example to the teacher profile guide; student pages to the UK student checklist; the Canadian format guide to the newcomer guide; and the Australian format guide to the student guide. Keep links descriptive and avoid mechanically adding every guide to every page.

The existing examples, source lists, author bylines, and editorial-policy page are strengths. Improve them with documented worked examples of the actual tools, genuine user feedback collected with permission, and review by an appropriate career adviser where available. Add the maintainer's genuine public professional profiles to src/lib/site-info.ts when supplied. Do not imply credentials, endorsements, or hiring outcomes that have not been established.

Use research to select the next content. The keyword map explicitly says volume and difficulty are unverified. Prioritize pages already receiving relevant impressions, and improve their usefulness before producing many similar variants. Add a new page when it solves a distinct task, rather than duplicating a page for another spelling of the same query. Google's content guidance emphasizes usefulness and original value rather than a target word count. [Helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

**7. What needs account access or further evidence**

This review has no private Search Console, analytics dashboard, backlink dataset, advertising-account settings, or keyword-volume data. It cannot establish actual Google index coverage, ranking positions, CTR, manual actions, backlink quality, ad-account consent configuration, or organic conversion rate. Search-engine site queries are not a reliable substitute for the private indexing reports.

Check these after restoring collection: successful sitemap submission; excluded pages and Google-selected canonicals; mobile real-user LCP/INP/CLS; search queries by country/device; visitors reaching the editor; imports; successful PDF/Word downloads; and match-tool completion. Never include CV contents or job descriptions in analytics events.

Security header policy, full keyboard/screen-reader accessibility, every external editorial reference, and all editor/download workflows were not exhaustively tested. The editor's H1 appears outside its main element; the crawl's main-only heading counter therefore showed zero there. Because it is a noindex application route and has an H1 elsewhere in its HTML, this was not counted as a public-page SEO blocker.

**Recommended implementation order**

1. Restore the analytics loader and check the real indexing/performance reports.
2. Correct the three inaccurate guides and the obsolete SEO feature map.
3. Reduce catalogue image weight and remove advertising work from editing forms; retest mobile loads.
4. Investigate the hydration observation with production diagnostics.
5. Add per-page dates and contextual links, then improve evidence and author transparency.
6. Clean up structured-data expectations, refine titles using query data, and expand only where a distinct user need is supported.

Detailed machine evidence is saved under .local-review/seo-audit/: live.json, browser.json, browser-repeat.json, probes.json, hydration-probes.json, fetched HTML, and mobile screenshots. These files contain public-page data, not CV submissions or API secrets.
