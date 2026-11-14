import { templates, type Template } from "./model";
import { templateDetails } from "./template-details";
import { templateCollections } from "./template-collections";

export function matchesTemplateSearch(id: Template, query: string): boolean {
  const template = templates.find(item => item.id === id)!;
  const details = templateDetails[id];
  const categories = templateCollections.filter(collection => collection.templates.includes(id)).map(collection => `${collection.name} ${collection.slug}`).join(" ");
  const searchable = `${template.name} ${template.style} ${template.note} ${details.bestFor} ${details.features.join(" ")} ${categories}`.toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean).every(term => searchable.includes(term));
}
// Sorting lives in template-sort.ts; re-exported for existing imports.
export { sortTemplates, type TemplateSort } from "./template-sort";
