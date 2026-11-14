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

// Bump when the cover letter layout renders in public/cover-letters are regenerated.
const LETTER_PREVIEW_VERSION = "1";
export function letterPreview(layout: string): string {
  return `/cover-letters/${layout}.webp?v=${LETTER_PREVIEW_VERSION}`;
}

/** Smaller versions for cards; full-size previews keep the original source. */
export function previewSrcSet(src: string): string {
  const [file, query] = src.split("?");
  const suffix = query ? `?${query}` : "";
  const resized = (width: number) => file.replace(/\/([^/]+)\.webp$/, `/responsive/$1-${width}.webp`) + suffix;
  return `${resized(320)} 320w, ${resized(480)} 480w, ${resized(640)} 640w, ${src} 953w`;
}

/** Rendered width of the large preview beside a page heading (.template-detail-example in templates.css). */
export const DETAIL_PREVIEW_SIZES = "(max-width: 640px) min(416px, calc(100vw - 56px)), (max-width: 980px) min(416px, calc(100vw - 80px)), min(510px, calc(47vw - 96px))";
