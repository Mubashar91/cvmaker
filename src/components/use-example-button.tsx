"use client";
import { useRouter } from "next/navigation";
import { PencilLine } from "lucide-react";
import type { CV } from "@/lib/model";
import { useCV } from "./cv-context";

/** Opens a fictional example CV in the editor so the visitor can replace it with their own details. */
export function UseExampleButton({ cv, children, className = "button accent large" }: { cv: CV; children: React.ReactNode; className?: string }) {
  const { loadCV, unsaved } = useCV(); const router = useRouter();
  function open() {
    if (unsaved && !window.confirm("Open this example? The CV you have open has changes that aren’t saved in this browser. Choose Cancel, then save it in the editor, to keep it.")) return;
    // A new CV, detached from any saved CV; it counts as unsaved only once the visitor edits it.
    loadCV(structuredClone(cv));
    router.push("/editor/");
  }
  return <button className={className} onClick={open}><PencilLine size={18} />{children}</button>;
}
