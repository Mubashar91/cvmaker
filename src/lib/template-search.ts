import { newTemplates, templates, type Template } from "./model";
import { templateDetails } from "./template-details";
import { templateCollections } from "./template-collections";

export function matchesTemplateSearch(id: Template, query: string): boolean {
  const template = templates.find(item => item.id === id)!;
  const details = templateDetails[id];
  const categories = templateCollections.filter(collection => collection.templates.includes(id)).map(collection => `${collection.name} ${collection.slug}`).join(" ");
  const searchable = `${template.name} ${template.style} ${template.note} ${details.bestFor} ${details.features.join(" ")} ${categories}`.toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean).every(term => searchable.includes(term));
}

export type TemplateSort = "recommended" | "newest" | "name";
export function sortTemplates(items: typeof templates[number][], sort: TemplateSort) {
  if (sort === "name") return [...items].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "newest") return [...items].sort((a, b) => {
    const rank = (id: Template) => newTemplates.includes(id) ? newTemplates.indexOf(id) : newTemplates.length + templates.findIndex(item => item.id === id);
    return rank(a.id) - rank(b.id);
  });
  return items;
}
