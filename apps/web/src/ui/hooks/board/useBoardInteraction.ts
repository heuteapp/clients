import { useMemo } from "react";
import { createBoardInteraction } from "@/src/ui/interactions/domain/board.interaction";
import { BoardInteraction } from "@/src/ui/types/board/board.interaction";
import { BoardSessionManager } from "@/src/ui/types/board/board.session";

export function useBoardInteraction(session: BoardSessionManager) : BoardInteraction {
    const interaction = useMemo(() => {
        return createBoardInteraction(session);
    }, [session]);

    return interaction;
}