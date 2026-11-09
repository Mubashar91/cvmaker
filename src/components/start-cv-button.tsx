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
  const { setCV } = useCV(); const router = useRouter();
  return <button className={className} onClick={() => { const cv = emptyCV(); setCV({ ...cv, template: template ?? cv.template, sectionOrder: sectionOrder ? [...sectionOrder] : cv.sectionOrder }); router.push("/editor/"); }}>{children}<ArrowRight size={17} /></button>;
}
