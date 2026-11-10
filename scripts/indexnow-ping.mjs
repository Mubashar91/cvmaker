// Submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver — not Google).
// Run AFTER a deploy, so the key file and the new pages are already live:
//   npm run seo:indexnow
// The key file is public/<key>.txt; IndexNow verifies it on the live site before
// accepting URLs, so a ping from a build that is not deployed yet is refused.
import { readFile } from "node:fs/promises";

const KEY = "4ec2061c202b078fdb60d5223e56cce9";

const sitemap = await readFile("out/sitemap.xml", "utf8").catch(() => {
  console.error("out/sitemap.xml not found. Run `npm run build` first.");
  process.exit(1);
});
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1].replace(/&amp;/g, "&"));
if (!urls.length) { console.error("The sitemap is empty. Set NEXT_PUBLIC_SITE_URL and rebuild."); process.exit(1); }
const { host } = new URL(urls[0]);
const keyLocation = `https://${host}/${KEY}.txt`;

const keyCheck = await fetch(keyLocation).then(r => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`)))).catch(error => error);
if (keyCheck instanceof Error || keyCheck.trim() !== KEY) {
  console.error(`The key file is not live yet at ${keyLocation} (${keyCheck instanceof Error ? keyCheck.message : "contents differ"}).`);
  console.error("Deploy first, then run this again.");
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation, urlList: urls }),
});
// 200 = accepted; 202 = accepted, key verification pending.
if (response.status === 200 || response.status === 202) {
  console.log(`IndexNow accepted ${urls.length} URLs for ${host} (HTTP ${response.status}).`);
} else {
  console.error(`IndexNow rejected the submission: HTTP ${response.status} ${await response.text()}`);
  process.exit(1);
}
