import { ListChecks, Mail, ScanSearch, Sparkles, Target, Wand2, type LucideProps } from "lucide-react";
import type { tools } from "@/lib/tools";

const icons = { mail: Mail, search: ScanSearch, sparkles: Sparkles, wand: Wand2, target: Target, list: ListChecks };
export function ToolIcon({ name, ...props }: { name: typeof tools[number]["icon"] } & LucideProps) {
  const Icon = icons[name]; return <Icon aria-hidden="true" {...props} />;
}
