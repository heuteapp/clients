import { createContext } from "react"
import { LayoutRegistry } from "@/src/domain/layout/layout.registry";

export const HeuteBoardContext = createContext<BoardContext | null>(null);

export interface BoardContext {
    rootRef: React.RefObject<HTMLDivElement | null>
    layoutRegistry: LayoutRegistry
}