import { LayoutContextValue } from "@/src/modules/ui-layout/types/layout.context";
import { BoardRegistry } from "./board.registry";

export interface BoardContextValue {    
    layout: LayoutContextValue;
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
}