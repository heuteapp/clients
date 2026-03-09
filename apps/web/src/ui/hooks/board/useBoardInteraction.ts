import { useMemo } from "react";
import { createBoardInteraction } from "@/src/ui/interactions/board.interaction";
import { BoardInteraction } from "@/src/ui/interactions/board.interaction.types";
import { BoardSession, BoardSessionUpdater } from "@/src/ui/types/board/board.session";

export function useBoardInteraction(sessionRef: React.RefObject<BoardSession>, sessionUpdater: BoardSessionUpdater) : BoardInteraction {
    const interaction = useMemo(() => {
        return createBoardInteraction(sessionRef, sessionUpdater);
    }, [sessionRef, sessionUpdater]);

    return interaction;
}