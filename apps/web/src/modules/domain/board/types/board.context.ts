import { BoardRegistry } from "@/src/modules/domain/board/types/board.registry";

export interface BoardContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
}