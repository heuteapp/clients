import { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { BoardContext } from "./board.context"
import { BoardInteraction, createBoardInteraction } from "./board.interaction"
import { BoardSession, BoardSessionSetter, BoardSessionTuple, createBoardSession } from "./board.session"

export function useBoardContext() {
    const ctx = useContext(BoardContext)

    if (!ctx) {
        throw new Error("useHeuteBoard must be used inside HeuteBoard")
    }

    return ctx
}

export function useBoardSession() : BoardSessionTuple {
    const tuple = useState(createBoardSession())

    return tuple;
}

export function useBoardInteraction(sessionSetter: BoardSessionSetter) : BoardInteraction {
    const interaction = useMemo(() => {
        return createBoardInteraction(sessionSetter);
    }, [sessionSetter]);

    return interaction;
}

export function useBoardPointerEvents(
  rootRef: React.RefObject<HTMLDivElement | null>,
  session: BoardSession,
  interaction: BoardInteraction
) {
    const sessionRef = useRef(session);
    
    useLayoutEffect(() => {
        sessionRef.current = session;
    }, [session]);


    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        function handlePointerMove(e: PointerEvent) {
            interaction.pointer = { x: e.clientX, y: e.clientY };
            const currentSession = sessionRef.current;

            currentSession.pointerId = e.pointerId;

            if (currentSession.cardCreate) {
                console.log("Card Create Move");
                return;
            }

            if (currentSession.cardMove) {
                console.log("Card Move");
                return;
            }

            if (currentSession.cardResize) {
                console.log("Card Resize");
                return;
            }
        }

        function handlePointerUp() {
            const currentSession = sessionRef.current;
            if(currentSession.cardCreate || currentSession.cardMove || currentSession.cardResize) {
                interaction.endInteraction();
            }
        }

        interaction.setEventHandlers({
            OnStart: () => {
                const currentSession = sessionRef.current;

                if(currentSession.cardCreate) {
                    root.dataset.interactionCardCreate = "true";
                    return;
                }
            },
            OnEnd: () => {
                const currentSession = sessionRef.current;

                if(currentSession.cardCreate) {
                    delete root.dataset.interactionCardCreate;
                    return;
                }
            }
        });

        root.addEventListener("pointermove", handlePointerMove);
        root.addEventListener("pointerup", handlePointerUp);

        return () => {
            root.removeEventListener("pointermove", handlePointerMove);
            root.removeEventListener("pointerup", handlePointerUp);
        }

    }, [rootRef, interaction]);
}