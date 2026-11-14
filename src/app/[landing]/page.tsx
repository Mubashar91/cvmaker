import { notFound } from "next/navigation";
import { LandingArticle } from "@/components/landing-article";
import { landingPage } from "@/lib/landing-pages";
import { isEarlyPreview, isVisible, scheduled, scheduledPages } from "@/lib/scheduled-pages";
import { pageMetadata } from "@/lib/seo";

// Scheduled guide pages at /<slug>/ (see scheduled-pages.ts). A static export needs at least one
// param, so every scheduled slug is listed; a page before its date renders notFound(), and
// scripts/prune-unpublished.mjs deletes that output after the build, so the URL is a real 404.
export const dynamicParams = false;
export function generateStaticParams() { return scheduledPages.filter(page => page.kind === "landing").map(page => ({ landing: page.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ landing: string }> }) {
  const { landing } = await params; const page = landingPage(landing); if (!page) return {};
  const path = `/${landing}/`; const meta = scheduled(path);
  return pageMetadata({ title: meta.title, description: meta.description, path, image: `/social/pages/${landing}.png`, article: true, noIndex: isEarlyPreview(path) });
}

export default async function ScheduledLandingPage({ params }: { params: Promise<{ landing: string }> }) {
  const { landing } = await params; const page = landingPage(landing);
  if (!page || !isVisible(`/${landing}/`)) notFound();
  return <LandingArticle page={page} />;
}
