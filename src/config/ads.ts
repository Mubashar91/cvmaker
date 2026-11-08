// Ads are disabled until BOTH values are explicitly configured by the site owner.
// Use an isolated provider embed URL. Never pass CV fields, draft data, or identifiers.
// This switch is not an AdSense setup. A real AdSense integration also needs the
// owner's publisher configuration, current vendor/privacy disclosures, and any
// required consent management before an ad script can be loaded. See README.md.
export const adConfig: { enabled: boolean; providerEmbedUrl: string | null } = {
  enabled: false,
  providerEmbedUrl: null,
};
