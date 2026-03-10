import { useMemo } from "react";
import { produce } from "immer";
import { BoardSession } from "@/src/ui/types/board/board.session";

export function useBoardSession(): BoardSession {
    const session = useMemo<BoardSession>(() => {
        const obj: BoardSession = {
            current: {
                pointerId: null,
                cardCreation: null,
                cardMovement: null,
                cardResize: null,
            },
            updater: (fn) => {
                obj.current = produce(obj.current, fn);
            }
        };
        return obj;
    }, []);

    return session;
}