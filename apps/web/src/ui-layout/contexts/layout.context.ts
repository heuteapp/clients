import { createContext } from "react";
import { LayoutContextValue } from "@/src/ui-layout/types/layout.context";

export const LayoutContext = createContext<LayoutContextValue | null>(null);