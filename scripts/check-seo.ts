import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadImage } from "@napi-rs/canvas";
import { templates } from "../src/lib/model";
import { tips } from "../src/lib/tips";
import { collectionPath, templateCollections } from "../src/lib/template-collections";
import { informationPages, siteOperator } from "../src/lib/site-info";
import { cvExamples } from "../src/lib/cv-examples";
import { noExperiencePage, studentPage, tools, toolsHub } from "../src/lib/tools";

function decode(value: string) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
function attributes(tag: string) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], decode(match[2])]));
}
function metadata(html: string, key: string) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => attributes(match[0])).find(tag => tag.name === key || tag.property === key)?.content;
}
function canonical(html: string) {
  return [...html.matchAll(/<link\b[^>]*>/gi)].map(match => attributes(match[0])).find(tag => tag.rel === "canonical")?.href;
}
const routes: { path: string; image: string; schema?: string; noIndex?: boolean }[] = [
  { path: "/", image: "folio", schema: "WebApplication" },
  { path: studentPage.path, image: "cv-maker-for-students", schema: "FAQPage" },
  { path: noExperiencePage.path, image: "cv-with-no-experience", schema: "FAQPage" },
  { path: toolsHub.path, image: "tools", schema: "CollectionPage" },
  ...tools.map(item => ({ path: item.path, image: `tools/${item.path.slice(1, -1)}`, schema: "WebApplication" })),
  { path: "/templates/", image: "templates", schema: "CollectionPage" },
  ...templates.map(template => ({ path: `/templates/${template.id}/`, image: template.id, schema: "CreativeWork" })),
  ...templateCollections.map(collection => ({ path: collectionPath(collection.slug), image: `collections/${collection.slug}`, schema: "CollectionPage" })),
  { path: "/cv-examples/", image: "cv-examples", schema: "CollectionPage" },
  ...cvExamples.map(example => ({ path: `/cv-examples/${example.slug}/`, image: `examples/${example.slug}`, schema: "Article" })),
  { path: "/tips/", image: "tips" },
  ...tips.map(tip => ({ path: `/tips/${tip.slug}/`, image: `guides/${tip.slug}`, schema: "Article" })),
  ...informationPages.map(page => ({ path: page.path, image: page.path.slice(1, -1), schema: page.path === "/about/" ? "AboutPage" : page.path === "/contact/" ? "ContactPage" : "WebPage" })),
  { path: "/editor/", image: "folio", noIndex: true },
];

async function main() {
  const home = await readFile("out/index.html", "utf8");
  const origin = canonical(home) ? new URL(canonical(home)!).origin : undefined;
  if (process.argv.includes("--require-origin")) assert(origin, "Set NEXT_PUBLIC_SITE_URL to the real public origin and rebuild before running a launch SEO check.");
  const titles = new Set<string>(), descriptions = new Set<string>();
  const knownPaths = new Set(routes.map(route => route.path));
  for (const route of routes) {
    const html = await readFile(join("out", route.path.slice(1), "index.html"), "utf8");
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    const description = metadata(html, "description") ?? "";
    assert(title.includes("Folio"), `${route.path}: missing branded title`);
    assert(!titles.has(title), `${route.path}: duplicate title`); titles.add(title);
    assert(description.length >= 50, `${route.path}: missing useful description`);
    assert(!descriptions.has(description), `${route.path}: duplicate description`); descriptions.add(description);
    assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `${route.path}: expected one main heading`);
    const robots = metadata(html, "robots") ?? "";
    assert(robots.includes(route.noIndex ? "noindex" : "index"), `${route.path}: incorrect index policy`);
    if (!route.noIndex) assert(!robots.includes("noindex"), `${route.path}: public page is excluded from indexing`);
    if (origin) {
      assert.equal(canonical(html), new URL(route.path, origin).href, `${route.path}: incorrect canonical`);
      const imageUrl = new URL(`/social/${route.image}.png`, origin).href;
      assert.equal(metadata(html, "og:image"), imageUrl, `${route.path}: incorrect Open Graph image`);
      assert.equal(metadata(html, "twitter:image"), imageUrl, `${route.path}: incorrect Twitter image`);
      assert.equal(metadata(html, "og:url"), new URL(route.path, origin).href, `${route.path}: incorrect social URL`);
      const structured = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].flatMap(match => {
        const data = JSON.parse(match[1]); return data["@graph"] ?? [data];
      });
      if ("schema" in route) assert(structured.some(item => item["@type"] === route.schema), `${route.path}: missing ${route.schema} schema`);
      const guide = tips.find(tip => route.path === `/tips/${tip.slug}/`);
      if (guide?.sources?.length) {
        const article = structured.find(item => item["@type"] === "Article");
        assert.deepEqual(article?.citation?.map((source: { url: string }) => source.url), guide.sources.map(source => source.url), `${route.path}: article citations must match its references`);
      }
      if (route.path.startsWith("/templates/") && route.path !== "/templates/" || route.path.startsWith("/tips/") || route.path.startsWith("/cv-examples/") || route.path === toolsHub.path || route.path === studentPage.path || route.path === noExperiencePage.path || tools.some(item => item.path === route.path) || informationPages.some(page => page.path === route.path)) {
        assert(structured.some(item => item["@type"] === "BreadcrumbList"), `${route.path}: missing breadcrumbs`);
      }
      if (route.path === "/templates/") {
        const collection = structured.find(item => item["@type"] === "CollectionPage");
        assert.equal(collection.mainEntity.itemListElement.length, templates.length);
      }
      const category = templateCollections.find(collection => collectionPath(collection.slug) === route.path);
      if (route.path === "/about/") {
        const person = structured.find(item => item["@type"] === "Person");
        assert.equal(person?.name, siteOperator.name, "About page must identify the real maintainer");
        assert.equal(person?.jobTitle, siteOperator.role, "Maintainer role must match the supplied professional profile");
        assert.equal(person?.alumniOf?.name, siteOperator.university, "Maintainer education must match the supplied profile");
        assert(!person?.telephone && !person?.address, "Public profile must not expose a private phone number or address");
      }
      if (route.path === "/contact/") {
        const contact = structured.find(item => item["@type"] === "ContactPage");
        assert.equal(contact?.mainEntity?.email, siteOperator.email, "Contact schema must use the visible contact email");
        assert(html.includes(`mailto:${siteOperator.email}`), "Contact page must have a working email link");
      }
      if (category) {
        const collection = structured.find(item => item["@type"] === "CollectionPage");
        assert.equal(collection.mainEntity.numberOfItems, category.templates.length, `${route.path}: incorrect collection count`);
        assert.deepEqual(collection.mainEntity.itemListElement.map((item: { item: { url: string } }) => item.item.url), category.templates.map(id => new URL(`/templates/${id}/`, origin).href), `${route.path}: structured list differs from visible templates`);
      }
    } else {
      assert.equal(canonical(html), undefined, `${route.path}: local build must not invent a public domain`);
      assert.equal(metadata(html, "og:url"), undefined, `${route.path}: local build must not invent a social URL`);
    }
    for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
      const image = attributes(match[0]); assert("alt" in image, `${route.path}: image is missing alternative text`);
    }
    for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
      const href = attributes(match[0]).href;
      if (!href?.startsWith("/") || href.startsWith("//")) continue;
      const pathname = new URL(href, "https://local.invalid").pathname;
      assert(knownPaths.has(pathname), `${route.path}: internal link points to an unknown page: ${href}`);
    }
    const guide = tips.find(tip => route.path === `/tips/${tip.slug}/`);
    if (guide?.sourcesChecked) {
      assert(html.includes(`dateTime="${guide.sourcesChecked}"`) || html.includes(`datetime="${guide.sourcesChecked}"`), `${route.path}: missing source-check date`);
      const links = [...html.matchAll(/<a\b[^>]*>/gi)].map(match => attributes(match[0]).href);
      for (const source of guide.sources || []) assert(links.includes(source.url), `${route.path}: missing visible source link: ${source.url}`);
    }
  }
  for (const image of new Set(routes.map(route => route.image))) {
    const asset = await loadImage(await readFile(`out/social/${image}.png`));
    assert.equal(asset.width, 1200, `${image}: social image width`); assert.equal(asset.height, 630, `${image}: social image height`);
  }
  for (const template of templates) {
    const image = await loadImage(await readFile(`out/templates/${template.id}.webp`));
    assert(image.width >= 900 && image.height >= 1300, `${template.id}: missing full-size CV preview`);
  }
  for (const example of cvExamples) {
    const image = await loadImage(await readFile(`out/examples/${example.slug}.webp`));
    assert(image.width >= 900 && image.height >= 1300, `${example.slug}: missing full-size CV example preview`);
  }
  const icon = await loadImage(await readFile("out/apple-touch-icon.png"));
  assert.equal(icon.width, 180); assert.equal(icon.height, 180);
  const sitemap = await readFile("out/sitemap.xml", "utf8"), robots = await readFile("out/robots.txt", "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1]));
  if (origin) {
    assert.deepEqual(new Set(urls), new Set(routes.filter(route => !route.noIndex).map(route => new URL(route.path, origin).href)), "Sitemap must include every public page and exclude the editor");
    assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "robots.txt must point to the sitemap");
  } else assert.equal(urls.length, 0, "A domain-free build must not publish invented sitemap URLs");
  console.log(`SEO checks passed for ${routes.length} pages: unique titles/descriptions, index policies, headings, social assets, template previews, and icon.${origin ? " Canonicals, social URLs, structured data, breadcrumbs, sitemap, and robots.txt also passed." : " Set NEXT_PUBLIC_SITE_URL and rebuild when a public address is available; then run npm run seo:check -- --require-origin."}`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
