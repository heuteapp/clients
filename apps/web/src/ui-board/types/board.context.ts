import { BoardRegistry } from "./board.registry";

export interface BoardContextValue {
    rootRef: React.RefObject<HTMLDivElement | null>;
    registry: BoardRegistry;    
}