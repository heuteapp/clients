import { useMemo } from "react";
import { produce } from "immer";
import { BoardSessionManager } from "@/src/ui/types/board/board.session";

export function useBoardSessionManager(): BoardSessionManager {
    const session = useMemo<BoardSessionManager>(() => {
        const obj: BoardSessionManager = {
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