// Content strings may contain internal links written as [descriptive text](/path/).
// Only site-relative paths are recognised, so content can never link off-site by accident.
export const RICH_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** The text as a reader would see it, without link markup (for schema, counts, and summaries). */
export function plainText(text: string): string { return text.replace(RICH_LINK, "$1"); }

export type RichPart = { text: string; href?: string };
export function richParts(text: string): RichPart[] {
  const parts: RichPart[] = []; let last = 0;
  for (const match of text.matchAll(RICH_LINK)) {
    if (match.index > last) parts.push({ text: text.slice(last, match.index) });
    parts.push({ text: match[1], href: match[2] }); last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}
