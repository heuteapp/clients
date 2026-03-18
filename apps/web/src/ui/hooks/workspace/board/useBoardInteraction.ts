import { useMemo } from "react";
import { createBoardUserInteraction } from "@/src/ui/interactions/domain/board.interaction";
import { BoardUserInteraction } from "@/src/ui/types/domain/board/board.interaction";
import { BoardSessionManager } from "@/src/ui/types/domain/board/board.session";

export function useBoardInteraction(sessionManager: BoardSessionManager) : BoardUserInteraction {
    const interaction = useMemo(() => {
        return createBoardUserInteraction(sessionManager);
    }, [sessionManager]);

    return interaction;
}