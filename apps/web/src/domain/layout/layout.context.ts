import { createContext } from "react"
import { LayoutContext } from "./layout.types";

export const HeuteLayoutContext = createContext<LayoutContext | null>(null);