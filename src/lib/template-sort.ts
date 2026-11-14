import { newTemplates, templates, type Template } from "./model";

// Kept apart from template-search.ts so the gallery can sort without loading the search data.

export type TemplateSort = "recommended" | "newest" | "name";
export function sortTemplates(items: typeof templates[number][], sort: TemplateSort) {
  if (sort === "name") return [...items].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "newest") return [...items].sort((a, b) => {
    const rank = (id: Template) => newTemplates.includes(id) ? newTemplates.indexOf(id) : newTemplates.length + templates.findIndex(item => item.id === id);
    return rank(a.id) - rank(b.id);
  });
  return items;
}
