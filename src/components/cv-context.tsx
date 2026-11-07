"use client";
import { createContext, useContext, useState, type Dispatch, type SetStateAction, type ReactNode } from "react";
import { emptyCV, type CV } from "@/lib/model";
const Context = createContext<{ cv: CV; setCV: Dispatch<SetStateAction<CV>>; pendingFile: File | null; setPendingFile: Dispatch<SetStateAction<File | null>> } | null>(null);
export function CVProvider({ children }: { children: ReactNode }) { const [cv, setCV] = useState(emptyCV); const [pendingFile, setPendingFile] = useState<File | null>(null); return <Context.Provider value={{ cv, setCV, pendingFile, setPendingFile }}>{children}</Context.Provider>; }
export function useCV() { const context = useContext(Context); if (!context) throw new Error("CVProvider required"); return context; }
