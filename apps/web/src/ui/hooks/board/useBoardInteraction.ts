import { useMemo } from "react";
import { createBoardInteraction } from "@/src/ui/interactions/board.interaction";
import { BoardInteraction } from "@/src/ui/types/board/board.interaction";
import { BoardSessionState, BoardSessionUpdater } from "@/src/core/types/domain/board/board.session";

export function useBoardInteraction(sessionRef: React.RefObject<BoardSessionState>, sessionUpdater: BoardSessionUpdater) : BoardInteraction {
    const interaction = useMemo(() => {
        return createBoardInteraction(sessionRef, sessionUpdater);
    }, [sessionRef, sessionUpdater]);

    return interaction;
}