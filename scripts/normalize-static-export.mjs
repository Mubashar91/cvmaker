import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

// Next 16.4's exporter flattens forward slashes in segment filenames, while its
// Windows directory walk supplies backslashes. That leaves nested __next.*
// directories where the browser expects flat files. Publish both forms so the
// exported site works on ordinary static hosts without custom server rewrites.
const root = resolve("out");
let added = 0;

async function flatten(directory, routeDirectory, parts) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    const names = [...parts, entry.name];
    if (entry.isDirectory()) await flatten(source, routeDirectory, names);
    else if (entry.isFile() && entry.name.endsWith(".txt")) {
      const destination = join(routeDirectory, names.join("."));
      const data = await readFile(source);
      const existing = await readFile(destination).catch(error => {
        if (error.code !== "ENOENT") throw error;
        return undefined;
      });
      if (existing) {
        if (!existing.equals(data)) throw new Error(`Conflicting static segment file: ${destination}`);
      } else {
        await writeFile(destination, data, { flag: "wx" }); added++;
      }
    }
  }
}

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const child = join(directory, entry.name);
    if (entry.name.startsWith("__next.")) await flatten(child, directory, [entry.name]);
    else await walk(child);
  }
}

await walk(root);
console.log(`Static export ready: ${added} segment prefetch filename${added === 1 ? "" : "s"} normalised.`);
