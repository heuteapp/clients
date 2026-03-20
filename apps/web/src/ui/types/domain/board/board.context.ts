import { BoardRegistry } from "@/src/ui/types/domain/board/board.registry";

export interface BoardContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
}