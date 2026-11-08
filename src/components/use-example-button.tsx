"use client";
import { useRouter } from "next/navigation";
import { PencilLine } from "lucide-react";
import type { CV } from "@/lib/model";
import { useCV } from "./cv-context";

/** Opens a fictional example CV in the editor so the visitor can replace it with their own details. */
export function UseExampleButton({ cv, children, className = "button accent large" }: { cv: CV; children: React.ReactNode; className?: string }) {
  const { setCV } = useCV(); const router = useRouter();
  return <button className={className} onClick={() => { setCV(structuredClone(cv)); router.push("/editor/"); }}><PencilLine size={18} />{children}</button>;
}
