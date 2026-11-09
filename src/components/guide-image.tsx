import type { Guide } from "@/lib/guide-types";
import { examplePreview, letterPreview, templatePreview } from "@/lib/previews";

export function guideImageSrc(image: NonNullable<Guide["image"]>): string {
  return image.kind === "template" ? templatePreview(image.id) : image.kind === "example" ? examplePreview(image.id) : letterPreview(image.id);
}

/** A real A4 render from the site (template, example CV, or cover letter), with its intrinsic size to avoid layout shift. */
export function GuideImage({ image, priority = false, className = "article-figure" }: { image: NonNullable<Guide["image"]>; priority?: boolean; className?: string }) {
  return <figure className={className}><span className="article-figure-sheet"><img src={guideImageSrc(image)} alt={image.alt} width={953} height={1348} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"} /></span><figcaption>{image.caption}</figcaption></figure>;
}
