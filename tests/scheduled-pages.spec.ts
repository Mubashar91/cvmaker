import { expect, test } from "@playwright/test";
import { isLive, publishedISO, publishInstant, scheduledPages } from "../src/lib/scheduled-pages";
import { allLandingPages } from "../src/lib/landing-pages";
import { allCVExamples } from "../src/lib/cv-examples";

test("scheduled pages go live at midnight Asia/Karachi, never earlier", () => {
  expect(publishInstant("2026-11-16").toISOString()).toBe("2026-11-15T19:00:00.000Z");
  expect(publishedISO("2026-11-16")).toBe("2026-11-16T00:00:00+05:00");
  expect(isLive("/harvard-cv-template/", new Date("2026-11-15T18:59:59Z"))).toBe(false);
  expect(isLive("/harvard-cv-template/", new Date("2026-11-15T19:00:00Z"))).toBe(true);
  expect(isLive("/cv-examples/chef/", new Date("2026-12-09T18:59:59Z"))).toBe(false);
  // Pages that aren't scheduled are always live.
  expect(isLive("/templates/", new Date("2000-01-01T00:00:00Z"))).toBe(true);
  expect(() => publishInstant("16/11/2026")).toThrow();
});

test("every scheduled page has a short title, a 120–155 character description, and content", () => {
  for (const page of scheduledPages) {
    expect(page.title.length + " | Folio".length, page.slug).toBeLessThanOrEqual(60);
    expect(page.description.length, page.slug).toBeGreaterThanOrEqual(120);
    expect(page.description.length, page.slug).toBeLessThanOrEqual(155);
    const hasContent = page.kind === "landing" ? allLandingPages.some(item => item.slug === page.slug) : allCVExamples.some(item => item.slug === page.slug);
    expect(hasContent, `${page.path} has no content`).toBe(true);
  }
  // And no landing content exists without a schedule entry (its route would never be built).
  for (const page of allLandingPages) expect(scheduledPages.some(item => item.slug === page.slug), page.slug).toBe(true);
});

test("every scheduled guide page has a full worked example and a FAQ", () => {
  for (const page of allLandingPages) {
    expect(page.example.cv.experience?.length ?? 0, page.slug).toBeGreaterThan(0);
    expect(page.example.cv.education?.length ?? 0, page.slug).toBeGreaterThan(0);
    expect(page.faqs.length, page.slug).toBeGreaterThanOrEqual(3);
  }
});
