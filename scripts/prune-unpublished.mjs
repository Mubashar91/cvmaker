import { readdir, readFile, rm } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

// A static export writes the not-found page for a scheduled page that isn't live yet (see
// src/app/[landing]/page.tsx). Served as a file, that would be a "soft 404" with status 200.
// Delete every exported route whose HTML is the not-found page, so the host returns a real 404.
const root = resolve("out");
const NOT_FOUND = "<title>Page not found | Folio</title>";
const keep = new Set(["_next", "404", "_not-found"]);
const pruned = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("__next.") || (directory === root && keep.has(entry.name))) continue;
    const child = join(directory, entry.name);
    const html = await readFile(join(child, "index.html"), "utf8").catch(() => "");
    if (html.includes(NOT_FOUND)) { await rm(child, { recursive: true }); pruned.push("/" + relative(root, child).split("\\").join("/") + "/"); }
    else await walk(child);
  }
}

await walk(root);
console.log(pruned.length ? `Unpublished pages removed from the export (real 404s until their go-live build): ${pruned.join(", ")}` : "No unpublished pages in the export.");
