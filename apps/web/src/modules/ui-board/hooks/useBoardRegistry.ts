import React from "react"
import { BoardRegistry } from "@/src/modules/ui-board/types/board.registry";
import { createBoardRegistry } from "@/src/modules/ui-board/registries/board.registry";
import { LayoutRegistry } from "@/src/modules/ui-layout/types/layout.registry";

export const useBoardRegistry = (boardRef: React.RefObject<HTMLDivElement | null>, layoutRegistry: LayoutRegistry) : BoardRegistry => {
    const registry = React.useRef<BoardRegistry>(null);

    React.useEffect(() => {
        return () => {
            registry.current = createBoardRegistry(boardRef, layoutRegistry);
        }
    }, []);

    return registry.current!;
}