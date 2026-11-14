import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export", trailingSlash: true, images: { unoptimized: true }, poweredByHeader: false, devIndicators: false, allowedDevOrigins: ["127.0.0.1"],
  // CSS arrives inside the HTML instead of two render-blocking stylesheet requests. Measured on a
  // throttled mobile profile with compression: first paint and LCP about 400 ms sooner on the
  // homepage, a template page, a tool, and a guide. Cost: HTML grows ~22 KB (brotli) per full load.
  experimental: { inlineCss: true },
};
export default config;
