import { HomePage } from "@/components/home-page";
import { StructuredData } from "@/components/structured-data";
import { DEFAULT_DESCRIPTION, pageMetadata } from "@/lib/seo";
import { faqs } from "@/lib/faqs";
import { faqSchema, websiteSchema } from "@/lib/structured-data";
export const metadata = pageMetadata({ title: "Free CV Maker UK — Build & Download a CV Online", description: DEFAULT_DESCRIPTION, path: "/" });
export default function Home() {
  return <><StructuredData data={websiteSchema()} /><StructuredData data={faqSchema(faqs)} /><HomePage /></>;
}
