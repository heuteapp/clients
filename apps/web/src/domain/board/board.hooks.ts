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

export function useBoardInteraction({ rootRef, session }: { rootRef: React.RefObject<HTMLDivElement | null>, session: BoardSession }) : BoardInteraction {
    const interactionRef = useRef<BoardInteraction | null>(null);

    if(!interactionRef.current) {
        interactionRef.current = createBoardInteraction(rootRef, session);
    }

    const interaction = interactionRef.current;

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        
        function handlePointerMove(e: PointerEvent) {
            session.pointer = { x: e.clientX, y: e.clientY };
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
    }, [interaction]);

    return interaction;
}