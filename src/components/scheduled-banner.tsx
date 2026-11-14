import { CalendarClock } from "lucide-react";
import { isEarlyPreview, scheduledPage } from "@/lib/scheduled-pages";
import { formatDate } from "@/lib/seo";

/** Shown only in a preview build (dev, or SHOW_SCHEDULED=1) on a page whose go-live date hasn't come. */
export function ScheduledBanner({ path }: { path: string }) {
  if (!isEarlyPreview(path)) return null;
  const page = scheduledPage(path)!;
  return <p className="scheduled-banner" role="note"><CalendarClock size={16} aria-hidden="true" />Preview: this page goes live on {formatDate(page.publishAt)} (00:00, Asia/Karachi). It is not in the sitemap and is marked noindex until then.</p>;
}
