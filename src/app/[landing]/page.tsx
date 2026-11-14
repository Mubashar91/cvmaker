import { notFound } from "next/navigation";
import { LandingArticle } from "@/components/landing-article";
import { landingPage, landingPages } from "@/lib/landing-pages";
import { isEarlyPreview, isVisible, scheduled, scheduledPages } from "@/lib/scheduled-pages";
import { pageMetadata } from "@/lib/seo";

// Scheduled guide pages at /<slug>/ (see scheduled-pages.ts). Only live pages are built, so any
// other slug is a real 404, on Vercel and on a plain static host alike.
// A static export must build at least one page, though. Before the first go-live date there is
// none, so the earliest page alone is built and renders notFound() (noindex, linked from nowhere)
// until its date. On a static host, scripts/prune-unpublished.mjs also deletes that output; Vercel
// builds with its own pipeline, which skips npm's postbuild step.
export const dynamicParams = false;
export function generateStaticParams() {
  const live = landingPages.map(page => page.slug);
  const earliest = scheduledPages.filter(page => page.kind === "landing").sort((a, b) => a.publishAt.localeCompare(b.publishAt))[0].slug;
  return (live.length ? live : [earliest]).map(landing => ({ landing }));
}

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
