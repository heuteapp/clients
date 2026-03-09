import { useMemo } from "react";
import { createBoardInteraction } from "@/src/ui/interactions/board.interaction";
import { BoardInteraction } from "@/src/ui/interactions/board.interaction.types";
import { BoardSessionUpdater } from "@/src/ui/types/board/board.session";

export function useBoardInteraction(sessionUpdater: BoardSessionUpdater) : BoardInteraction {
    const interaction = useMemo(() => {
        return createBoardInteraction(sessionUpdater);
    }, [sessionUpdater]);

    return interaction;
}