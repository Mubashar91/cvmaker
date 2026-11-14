import Link from "next/link";
import { Fragment } from "react";
import { richParts } from "@/lib/rich-text";
import { isVisible } from "@/lib/scheduled-pages";

/**
 * Renders [text](/path/) markup in a content string as internal links. A link to a scheduled page
 * stays plain text until that page is part of the build, so no page ever links to a 404.
 * Server-only: the check reads the build's date, so keep this out of client components.
 */
export function RichText({ text }: { text: string }) {
  return <>{richParts(text).map((part, index) => part.href && isVisible(part.href.split("#")[0]) ? <Link key={index} href={part.href}>{part.text}</Link> : <Fragment key={index}>{part.text}</Fragment>)}</>;
}
