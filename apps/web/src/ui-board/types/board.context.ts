import { BoardRegistry } from "@/src/ui-board/types/board.registry";

export interface BoardContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
}