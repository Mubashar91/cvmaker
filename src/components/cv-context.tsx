"use client";
import { createContext, useContext, useState, type Dispatch, type SetStateAction, type ReactNode } from "react";
import { emptyCV, type CV, type Section } from "@/lib/model";
interface CVState {
  cv: CV; setCV: Dispatch<SetStateAction<CV>>;
  pendingFile: File | null; setPendingFile: Dispatch<SetStateAction<File | null>>;
  /** A section the editor should open on next, e.g. after a tool adds a profile. Consumed once. */
  startSection: Section | null; setStartSection: Dispatch<SetStateAction<Section | null>>;
}
const Context = createContext<CVState | null>(null);
export function CVProvider({ children }: { children: ReactNode }) {
  const [cv, setCV] = useState(emptyCV); const [pendingFile, setPendingFile] = useState<File | null>(null); const [startSection, setStartSection] = useState<Section | null>(null);
  return <Context.Provider value={{ cv, setCV, pendingFile, setPendingFile, startSection, setStartSection }}>{children}</Context.Provider>;
}
export function useCV() { const context = useContext(Context); if (!context) throw new Error("CVProvider required"); return context; }
