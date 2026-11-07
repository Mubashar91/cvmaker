import { HomePage } from "@/components/home-page";
import { StructuredData } from "@/components/structured-data";
import { DEFAULT_DESCRIPTION, pageMetadata } from "@/lib/seo";
import { websiteSchema } from "@/lib/structured-data";
export const metadata = pageMetadata({ title: "Free CV Maker & Resume Builder — No Sign-Up", description: DEFAULT_DESCRIPTION, path: "/" });
export default function Home() {
  return <><StructuredData data={websiteSchema()} /><HomePage /></>;
}
