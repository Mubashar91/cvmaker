// Bump when the thumbnails in public/templates are regenerated, so browsers
// don't keep showing a cached older render under the same file name.
const PREVIEW_VERSION = "4";
export function templatePreview(id: string): string {
  return `/templates/${id}.webp?v=${PREVIEW_VERSION}`;
}

// Bump when the example renders in public/examples are regenerated.
const EXAMPLE_PREVIEW_VERSION = "1";
export function examplePreview(slug: string): string {
  return `/examples/${slug}.webp?v=${EXAMPLE_PREVIEW_VERSION}`;
}
