"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [{ href: "/templates/", label: "Templates" }, { href: "/#how-it-works", label: "How it works" }, { href: "/tips/", label: "CV guides" }, { href: "/about/", label: "About us" }, { href: "/contact/", label: "Contact" }, { href: "/privacy/", label: "Privacy" }];
  return <header className="site-header"><div className="container header-inner">
    <Logo />
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname.startsWith(link.href) ? "page" : undefined}>{link.label}</Link>)}</nav>
    <div className="header-actions"><Link href="/editor/" className="button accent nav-cta">Create my CV <ArrowRight size={16} /></Link><button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
  </div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowRight size={16} /></Link>)}<Link href="/editor/" onClick={() => setOpen(false)}>Open the CV editor <ArrowRight size={16} /></Link></nav>}</header>;
}
