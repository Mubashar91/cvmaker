import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "CV Editor — Build & Download Your Free CV", description: "Edit your CV, import a PDF or DOCX, switch templates, and download a clean PDF. Your information is processed locally in your browser.", path: "/editor/", noIndex: true });
export default function EditorLayout({ children }: { children: ReactNode }) { return children; }
