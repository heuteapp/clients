import { createContext } from "react";
import { LayoutContextValue } from "@/src/modules/ui-layout/types/layout.context";

export const LayoutContext = createContext<LayoutContextValue | null>(null);