import { analyzeLayout } from "@/src/utils"
import { createContext } from "react"

export interface HeuteLayoutContextType {
  squareSize: { full: number, inner: number }
  analyze: ReturnType<typeof analyzeLayout>
}

export const HeuteLayoutContext = createContext<HeuteLayoutContextType | null>(null);