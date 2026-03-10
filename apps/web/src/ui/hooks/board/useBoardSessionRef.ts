import { useMemo, useRef } from "react";
import { BoardSession } from "@/src/ui/types/board/board.session";
import { produce } from "immer";

export function useBoardSession() : BoardSession {
    const sessionRef = useRef({
        pointerId: null,
        cardCreation: null,
        cardMovement: null,
        cardResize: null,
    });
    
    const sessionUpdater = (updater: (draft: any) => void) => {
        sessionRef.current = produce(sessionRef.current, updater)
    }

    const session = useMemo (() => {
        return {
            ref: sessionRef,
            updater: sessionUpdater
        }
    }, []);

    return session;
}