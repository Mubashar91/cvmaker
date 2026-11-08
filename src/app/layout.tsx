import type { Metadata, Viewport } from "next";
import { CVProvider } from "@/components/cv-context";
import { DEFAULT_DESCRIPTION, SITE_URL } from "@/lib/seo";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import "./templates.css";
import "./editor.css";
import "./information.css";
export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: { default: "Free CV Maker & Resume Builder | Folio", template: "%s | Folio" },
  description: DEFAULT_DESCRIPTION, applicationName: "Folio CV Maker", referrer: "no-referrer",
  creator: "Folio", publisher: "Folio",
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || "7U0t1clm8oCEUc9NGe-IxndEvE3kLOogRfeSRmT37iQ" },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }] },
  category: "productivity", robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#10352b", colorScheme: "light" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning: browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes
  // to <html>/<body> before React hydrates. This only ignores attribute differences on these two tags.
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><body suppressHydrationWarning><a href="#main-content" className="skip-link">Skip to content</a><CVProvider>{children}</CVProvider></body></html>;
}
