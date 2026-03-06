import { createContext } from "react"
import { analyzeLayout } from "./layout.utils"

export interface HeuteLayoutContextType {
  squareSize: { full: number, inner: number }
  analyze: ReturnType<typeof analyzeLayout>
}

export const HeuteLayoutContext = createContext<HeuteLayoutContextType | null>(null);