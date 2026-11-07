import Link from "next/link";
import { Header, Footer } from "@/components/site-chrome";
export default function NotFound() { return <><Header /><main id="main-content" className="page-hero not-found"><div className="container"><h1>This page isn’t here.</h1><p>Let’s get you back to your next chapter.</p><Link href="/" className="button accent large">Back to home</Link></div></main><Footer /></>; }
