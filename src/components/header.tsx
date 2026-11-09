"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [{ href: "/templates/", label: "Templates" }, { href: "/cv-examples/", label: "CV examples" }, { href: "/cover-letter-maker/", label: "Cover letter" }, { href: "/tools/", label: "Free tools" }, { href: "/tips/", label: "CV guides" }, { href: "/about/", label: "About us" }, { href: "/contact/", label: "Contact" }];
  const mobileOnly = [{ href: "/privacy/", label: "Privacy" }];
  // Tool pages sit at the top level; keep "Free tools" marked while on any of them.
  const toolPaths = ["/resume-keyword-checker/", "/resume-summary-builder/", "/resume-objective-generator/", "/resume-bullet-point-generator/", "/resume-skills/"];
  const current = (href: string) => pathname.startsWith(href) || (href === "/tools/" && toolPaths.some(path => pathname.startsWith(path)));
  return <header className="site-header"><div className="container header-inner">
    <Logo />
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={current(link.href) ? "page" : undefined}>{link.label}</Link>)}</nav>
    <div className="header-actions"><Link href="/editor/" className="button accent nav-cta">Create my CV <ArrowRight size={16} /></Link><button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
  </div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[...links, ...mobileOnly].map(link => <Link key={link.href} href={link.href} aria-current={current(link.href) ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}<ArrowRight size={16} /></Link>)}<Link href="/editor/" onClick={() => setOpen(false)}>Open the CV editor <ArrowRight size={16} /></Link></nav>}</header>;
}
