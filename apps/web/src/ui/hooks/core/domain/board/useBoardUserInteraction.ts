import { useMemo } from "react";
import { createBoardUserInteraction } from "@/src/ui/interactions/domain/board.interaction";
import { BoardUserInteraction } from "@/src/types/core/domain/board/board.interaction";
import { BoardUserSessionManager } from "@/src/types/core/domain/board/board.session";

export function useBoardUserInteraction(sessionManager: BoardUserSessionManager) : BoardUserInteraction {
    const interaction = useMemo(() => {
        return createBoardUserInteraction(sessionManager);
    }, [sessionManager]);

    return interaction;
}