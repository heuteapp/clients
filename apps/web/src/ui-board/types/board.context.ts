import { BoardRegistry } from "./board.registry";

export interface BoardContextValue {
    boardRef: React.RefObject<HTMLDivElement | null>;
    layoutRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
}