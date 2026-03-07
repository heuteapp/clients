import { useContext, useEffect, useRef } from "react"
import { BoardContext } from "./board.context"
import { BoardInteraction, createBoardInteraction } from "./board.interaction"
import { BoardSession } from "./board.session"

export function useBoardContext() {
    const ctx = useContext(BoardContext)

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

        // Event listenerları başlat / durdur fonksiyonları
        function handlePointerMove(e: PointerEvent) {
            interaction.session.pointer = { x: e.clientX, y: e.clientY };

            if (interaction.session.cardCreate) return;
            if (interaction.session.cardMove) return;
            if (interaction.session.cardResize) return;
        }

        function handlePointerUp() {
            interaction.endInteraction();
            removeListeners();
        }

        function addListeners() {
            if(!root) return;
            root.addEventListener("pointermove", handlePointerMove);
            root.addEventListener("pointerup", handlePointerUp);
        }

        function removeListeners() {
            if(!root) return;
            root.removeEventListener("pointermove", handlePointerMove);
            root.removeEventListener("pointerup", handlePointerUp);
        }

        interaction.setEventHandlers({
            OnStart: addListeners,
            OnEnd: removeListeners
        });

        return () => removeListeners();

    }, [rootRef, interaction]);
}