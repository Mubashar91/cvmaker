import { ChevronDown } from "lucide-react";
import { RichText } from "./rich-text";

export interface FAQ { question: string; answer: string }

/** Native disclosure list: works without JavaScript and keeps every answer in the HTML. */
export function FaqList({ faqs }: { faqs: readonly FAQ[] }) {
  return <div className="faq-list">{faqs.map(faq => <details key={faq.question}><summary>{faq.question}<ChevronDown size={20} aria-hidden="true" /></summary><p><RichText text={faq.answer} /></p></details>)}</div>;
}
