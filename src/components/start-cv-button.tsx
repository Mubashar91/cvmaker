"use client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { emptyCV, type CV, type Template } from "@/lib/model";
import { useCV } from "./cv-context";

/** Opens the editor with this template, keeping anything already typed in this tab. */
export function StartCVButton({ template = "classic", children = "Create my free CV", className = "button dark" }: { template?: Template; children?: React.ReactNode; className?: string }) {
  const { setCV } = useCV(); const router = useRouter();
  return <button className={className} onClick={() => { setCV(current => ({ ...current, template })); router.push("/editor/"); }}>{children}<ArrowRight size={17} /></button>;
}

/** Starts a blank CV, optionally with a template and section order (e.g. education first for students). */
export function NewCVButton({ children = "Create my free CV", className = "button dark", template, sectionOrder }: { children?: React.ReactNode; className?: string; template?: Template; sectionOrder?: CV["sectionOrder"] }) {
  const { loadCV, unsaved } = useCV(); const router = useRouter();
  function start() {
    if (unsaved && !window.confirm("Start a new CV? The CV you have open has changes that aren’t saved in this browser. Choose Cancel, then save it in the editor, to keep it.")) return;
    const cv = emptyCV();
    // A new CV, detached from any saved CV, so saving it never overwrites another one.
    loadCV({ ...cv, template: template ?? cv.template, sectionOrder: sectionOrder ? [...sectionOrder] : cv.sectionOrder });
    router.push("/editor/");
  }
  return <button className={className} onClick={start}>{children}<ArrowRight size={17} /></button>;
}
