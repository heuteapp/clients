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

        function handlePointerMove(e: PointerEvent) {
            interaction.session.pointer = { x: e.clientX, y: e.clientY };
            interaction.session.pointerId = e.pointerId;

            if (interaction.session.cardCreate) {
                console.log("Card Create Move");
                return;
            }

            if (interaction.session.cardMove) {
                console.log("Card Move");
                return;
            }

            if (interaction.session.cardResize) {
                console.log("Card Resize");
                return;
            }
        }

        function handlePointerUp() {
            if(interaction.session.cardCreate || interaction.session.cardMove || interaction.session.cardResize) {
                interaction.endInteraction();
            }
        }

        interaction.setEventHandlers({
            OnStart: () => {
                if(interaction.session.cardCreate) {
                    root!.style.setProperty("--interaction-card-create", "true");
                    console.log("Card Create Start");
                    return;
                }
            },
            OnEnd: () => {
                if(interaction.session.cardCreate) {
                    root!.style.setProperty("--interaction-card-create", "false");
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