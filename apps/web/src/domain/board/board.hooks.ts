import { useContext, useEffect, useRef, useState } from "react"
import { BoardContext } from "./board.context"
import { BoardInteraction, createBoardInteraction } from "./board.interaction"
import { BoardSession, createBoardSession } from "./board.session"

export function useBoardContext() {
    const ctx = useContext(BoardContext)

    if (!ctx) {
        throw new Error("useHeuteBoard must be used inside HeuteBoard")
    }

    return ctx
}

export function useBoardInteraction() : BoardInteraction {
    const [session, setSession] = useState(createBoardSession())

    const interactionRef = useRef<BoardInteraction | null>(null);

    if(!interactionRef.current) {
        interactionRef.current = createBoardInteraction(() => session, setSession);
    }

    return interactionRef.current;
}

export function useBoardPointerEvents(
  rootRef: React.RefObject<HTMLDivElement | null>,
  interaction: BoardInteraction
) {
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        function handlePointerMove(e: PointerEvent) {
            interaction.pointer = { x: e.clientX, y: e.clientY };

            const session = interaction.getSession();  
            session.pointerId = e.pointerId;

            if (session.cardCreate) {
                console.log("Card Create Move");
                return;
            }

            if (session.cardMove) {
                console.log("Card Move");
                return;
            }

            if (session.cardResize) {
                console.log("Card Resize");
                return;
            }
        }

        function handlePointerUp() {
            const session = interaction.getSession();
            if(session.cardCreate || session.cardMove || session.cardResize) {
                interaction.endInteraction();
            }
        }

        interaction.setEventHandlers({
            OnStart: () => {
                const session = interaction.getSession();
                if(session.cardCreate) {
                    root.dataset.interactionCardCreate = "true";
                    console.log("Card Create Start");
                    return;
                }
            },
            OnEnd: () => {
                const session = interaction.getSession();
                if(session.cardCreate) {
                    delete root.dataset.interactionCardCreate;
                    console.log("Card Create End");
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