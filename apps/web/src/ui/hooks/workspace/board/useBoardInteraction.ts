import { useMemo } from "react";
import { createBoardInteraction } from "@/src/ui/interactions/domain/board.interaction";
import { BoardInteraction } from "@/src/ui/types/domain/board/board.interaction";
import { BoardSessionManager } from "@/src/ui/types/domain/board/board.session";

export function useBoardInteraction(sessionManager: BoardSessionManager) : BoardInteraction {
    const interaction = useMemo(() => {
        return createBoardInteraction(sessionManager);
    }, [sessionManager]);

    return interaction;
}