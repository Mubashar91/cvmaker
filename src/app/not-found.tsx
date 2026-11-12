import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/site-chrome";
// Override the root layout's "index, follow" so the exported /_not-found/ page (served with
// HTTP 200) does not carry contradictory robots tags or the homepage title.
export const metadata: Metadata = { title: { absolute: "Page not found | Folio" }, robots: { index: false, follow: true } };
export default function NotFound() { return <><Header /><main id="main-content" className="page-hero not-found"><div className="container"><h1>This page isn’t here.</h1><p>Let’s get you back to your next chapter.</p><Link href="/" className="button accent large">Back to home</Link></div></main><Footer /></>; }
