import type { Metadata, Viewport } from "next";
import { CVProvider } from "@/components/cv-context";
import { DEFAULT_DESCRIPTION, SITE_URL } from "@/lib/seo";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import "./templates.css";
import "./editor.css";
import "./information.css";
import "./tools.css";
export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: { default: "Free CV Maker & Resume Builder | Folio", template: "%s | Folio" },
  description: DEFAULT_DESCRIPTION, applicationName: "Folio CV Maker", referrer: "no-referrer",
  creator: "Folio", publisher: "Folio",
  verification: { google: [process.env.GOOGLE_SITE_VERIFICATION || "7U0t1clm8oCEUc9NGe-IxndEvE3kLOogRfeSRmT37iQ", "HJzQh0DnLV4xtlGzepLqI8TTDgfc7PCb4HtwUyRxkS4"] },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }] },
  category: "productivity", robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#10352b", colorScheme: "light" };
// Cookie-free Vercel Web Analytics: page views plus a few anonymous events (src/lib/analytics.ts).
// Only included in builds made by Vercel; set NEXT_PUBLIC_ANALYTICS=off to leave it out.
const analytics = process.env.VERCEL === "1" && process.env.NEXT_PUBLIC_ANALYTICS !== "off";
const analyticsQueue = "window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};";
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning: browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes
  // to <html>/<body> before React hydrates. This only ignores attribute differences on these two tags.
  // Plain <script> (not next/script): AdSense rejects the data-nscript attribute next/script adds.
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
    <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1973808469256982" crossOrigin="anonymous" />
      {analytics && <><script dangerouslySetInnerHTML={{ __html: analyticsQueue }} /><script defer src="/_vercel/insights/script.js" /></>}
    </head>
    <body suppressHydrationWarning><a href="#main-content" className="skip-link">Skip to content</a><CVProvider>{children}</CVProvider></body>
  </html>;
}
