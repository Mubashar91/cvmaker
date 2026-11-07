import Link from "next/link";
import { ChevronRight } from "lucide-react";
export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="breadcrumbs">{items.map((item, index) => <span className="breadcrumb-item" key={item.name}>{index > 0 && <ChevronRight size={12} />}{item.href ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</span>)}</nav>;
}
