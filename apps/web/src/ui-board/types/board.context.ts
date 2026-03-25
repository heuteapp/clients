import { LayoutContextValue } from "@/src/ui-layout/types/layout.context";
import { BoardRegistry } from "./board.registry";

export interface BoardContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
    layout: LayoutContextValue
}