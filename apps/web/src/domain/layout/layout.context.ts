import { createContext } from "react"
import { LayoutAnalyze, LayoutMeasurements } from "./layout.types";

export const HeuteLayoutContext = createContext<LayoutContext | null>(null);

export interface LayoutContext {
  rootRef: React.RefObject<HTMLDivElement | null>
  analyze: LayoutAnalyze
  measurements: LayoutMeasurements
}