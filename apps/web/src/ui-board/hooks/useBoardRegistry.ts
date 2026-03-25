import React from "react"
import { BoardRegistry } from "@/src/ui-board/types/board.registry";
import { createBoardRegistry } from "@/src/ui-board/registries/board.registry";
import { LayoutRegistry } from "@/src/ui-layout/types/layout.registry";

export const useBoardRegistry = (boardRef: React.RefObject<HTMLDivElement>, layoutRegistry: LayoutRegistry) : BoardRegistry => {
    const registry = React.useRef<BoardRegistry>(null);

    React.useEffect(() => {
        return () => {
            registry.current = createBoardRegistry(boardRef, layoutRegistry);
        }
    }, []);

    return registry.current!;
}