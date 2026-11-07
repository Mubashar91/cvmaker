import { adConfig } from "@/config/ads";
export function AdSlot({ placement }: { placement: "home" | "tips" }) {
  if (!adConfig.enabled || !adConfig.providerEmbedUrl) return null;
  return <aside className="ad-space container" aria-label="Advertisement" data-placement={placement}><span>Advertisement</span><iframe title="Advertisement" src={adConfig.providerEmbedUrl} sandbox="allow-scripts" referrerPolicy="no-referrer" loading="lazy" /></aside>;
}
