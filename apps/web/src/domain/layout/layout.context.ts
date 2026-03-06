import { createContext } from "react"
import { LayoutAnalyze } from "./layout.utils";
import { LayoutMeasurements } from "./layout.hooks";

export const HeuteLayoutContext = createContext<LayoutContext | null>(null);

export interface LayoutContext {
  analyze: LayoutAnalyze
  measurements: LayoutMeasurements
}