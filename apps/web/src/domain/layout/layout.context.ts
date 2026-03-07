import { createContext } from "react"
import { LayoutAnalyze, LayoutMeasurements } from "./layout.types";
import { LayoutRegistry } from "./layout.registry";

export const HeuteLayoutContext = createContext<LayoutContext | null>(null);

export interface LayoutContext {
  layoutRef: React.RefObject<HTMLDivElement | null>
  registry: LayoutRegistry
  analyze: LayoutAnalyze
  measurements: LayoutMeasurements
}