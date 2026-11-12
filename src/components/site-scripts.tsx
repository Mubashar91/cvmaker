"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Load optional providers after hydration, keeping form routes free of new ad requests. */
export function SiteScripts({ analytics }: { analytics: boolean }) {
  const pathname = usePathname();
  const contentPage = pathname === "/" || /^\/(tips|templates|cv-examples)(\/|$)/.test(pathname);
  useEffect(() => {
    if (!contentPage) return;
    let script: HTMLScriptElement | undefined;
    const timer = setTimeout(() => {
      script = document.createElement("script");
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1973808469256982";
      document.head.appendChild(script);
    }, 5_000);
    return () => { clearTimeout(timer); script?.remove(); };
  }, [contentPage]);
  useEffect(() => {
    if (!analytics) return;
    const script = document.createElement("script");
    script.defer = true; script.src = "/_vercel/insights/script.js";
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [analytics]);
  return null;
}
