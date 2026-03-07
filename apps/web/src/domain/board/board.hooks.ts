import { useContext, useEffect, useRef } from "react"
import { HeuteBoardContext } from "./board.context"
import { BoardInteraction, createBoardInteraction } from "./board.interaction"
import { BoardSession } from "./board.session"

export function useBoardContext() {
    const ctx = useContext(HeuteBoardContext)

    if (!ctx) {
        throw new Error("useHeuteBoard must be used inside HeuteBoard")
    }

    return ctx
}

export function useBoardInteraction({ session }: { session: BoardSession }) : BoardInteraction {
    const interactionRef = useRef<BoardInteraction | null>(null);

    if(!interactionRef.current) {
        interactionRef.current = createBoardInteraction(session);
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
            interaction.session.pointer = {
                x: e.clientX,
                y: e.clientY
            };

            const cardMove = interaction.session.cardMove;
            if (cardMove) {
                return;
            }

            const resize = interaction.session.cardResize;
            if (resize) {
                return;
            }
        }

        function handlePointerUp() {
            interaction.endInteraction();
        }

        root.addEventListener("pointermove", handlePointerMove);
        root.addEventListener("pointerup", handlePointerUp);
        
        return () => {
            root.removeEventListener("pointermove", handlePointerMove);
            root.removeEventListener("pointerup", handlePointerUp);
        };

    }, [rootRef, interaction]);
}