import type { NextConfig } from "next";
const config: NextConfig = { output: "export", trailingSlash: true, images: { unoptimized: true }, poweredByHeader: false, devIndicators: false, allowedDevOrigins: ["127.0.0.1"] };
export default config;
