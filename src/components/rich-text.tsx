import Link from "next/link";
import { Fragment } from "react";
import { richParts } from "@/lib/rich-text";

/** Renders [text](/path/) markup in a content string as internal links. */
export function RichText({ text }: { text: string }) {
  return <>{richParts(text).map((part, index) => part.href ? <Link key={index} href={part.href}>{part.text}</Link> : <Fragment key={index}>{part.text}</Fragment>)}</>;
}
