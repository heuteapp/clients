import { createContext } from "react"
import { LayoutAnalyze, LayoutMeasurements } from "./layout.types";

export const HeuteLayoutContext = createContext<LayoutContext | null>(null);

export interface LayoutContext {
  rootRef: React.RefObject<HTMLDivElement | null>
  analyze: LayoutAnalyze
  measurements: LayoutMeasurements
}

export interface LayoutRegistry {
  sections: Map<string, React.RefObject<HTMLDivElement | null>>
  grids: Map<string, React.RefObject<HTMLDivElement | null>>
  cells: Map<string, React.RefObject<HTMLDivElement | null>>

  registerSection(id: string, ref: React.RefObject<HTMLDivElement | null>): void
  unregisterSection(id: string): void

  registerGrid(id: string, ref: React.RefObject<HTMLDivElement | null>): void
  unregisterGrid(id: string): void

  registerCell(id: string, ref: React.RefObject<HTMLDivElement | null>): void
  unregisterCell(id: string): void
}