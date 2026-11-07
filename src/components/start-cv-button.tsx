"use client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Template } from "@/lib/model";
import { useCV } from "./cv-context";

export function StartCVButton({ template = "classic", children = "Create my free CV", className = "button dark" }: { template?: Template; children?: React.ReactNode; className?: string }) {
  const { setCV } = useCV(); const router = useRouter();
  return <button className={className} onClick={() => { setCV(current => ({ ...current, template })); router.push("/editor/"); }}>{children}<ArrowRight size={17} /></button>;
}
