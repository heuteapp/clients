import { useRef } from "react";
import { BoardSession } from "@/src/ui/types/board/board.session";
import { produce } from "immer";
import { BoardSessionState, BoardSessionUpdater } from "@/src/core/types/domain/board/board.session";

export function useBoardSession() : BoardSession {
    const ref = useRef<BoardSessionState>({
        pointerId: null,
        cardCreation: null,
        cardMovement: null,
        cardResize: null,
    });

    const updater: BoardSessionUpdater = (fn) => {
        ref.current = produce(ref.current, fn);
    };

    return Object.assign(ref, { updater });
}