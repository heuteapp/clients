import { createContext } from "react"
import { LayoutAnalyze, LayoutMeasurements } from "./layout.types";

export const HeuteLayoutContext = createContext<LayoutContext | null>(null);

export interface LayoutContext {
  analyze: LayoutAnalyze
  measurements: LayoutMeasurements
}