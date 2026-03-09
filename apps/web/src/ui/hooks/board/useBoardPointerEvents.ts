import { useBoardStore } from "@/src/stores/board";
import { useEffect } from "react";
import { BoardInteraction } from "@/src/ui/interactions/board.interaction.types";
import { setCreateMode } from "@/src/ui/interactions/create-card/dom";
import { handleCardCreateInteraction, endCardCreateInteraction } from "@/src/ui/interactions/create-card/handler";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardMetrics } from "@/src/ui/types/board/board.dom";
import { BoardSession, CardCreateState } from "@/src/ui/types/board/board.session";

export function useBoardPointerEvents(
    rootRef: React.RefObject<HTMLDivElement | null>,
    registry: BoardRegistry,
    metricsRef: React.RefObject<BoardMetrics>,
    sessionRef: React.RefObject<BoardSession>,
    interaction: BoardInteraction
) {
    const addCard = useBoardStore(state => state.addCard);

    useEffect(() => {
        const root = rootRef.current
        if (!root) return


        function handlePointerDown(e: PointerEvent) {
            const root = rootRef.current
            if (!root) return

            e.preventDefault()
            root.setPointerCapture(e.pointerId)

            interaction.pointer = {
                x: e.clientX,
                y: e.clientY
            }
        }

        function handlePointerMove(e: PointerEvent) {

            interaction.pointer = {
                x: e.clientX,
                y: e.clientY
            }

            const currentSession = sessionRef.current

            if (currentSession.cardCreate) {
                handleCardCreateInteraction(rootRef.current!, registry, sessionRef, metricsRef, interaction, currentSession.cardCreate)
                return
            }

            if (currentSession.cardMove) return
            if (currentSession.cardResize) return
        }

        function handlePointerUp(e: PointerEvent) {
            const root = rootRef.current
            if (!root) return

            root.releasePointerCapture(e.pointerId)

            const currentSession = sessionRef.current

            if (
                currentSession.cardCreate
            ) {
                if(!currentSession.cardCreate.currentSectionId || !currentSession.cardCreate.currentPosition) {
                    interaction.endInteraction();
                }
                else {
                    const cardCreateState = sessionRef.current.cardCreate!;

                    if(cardCreateState.currentSectionId && cardCreateState.currentPosition) {
                        addCard(interaction, {
                            id: crypto.randomUUID(),
                            sectionId: cardCreateState.currentSectionId!,
                            rowIndex: cardCreateState.currentPosition!.rowIndex,
                            colIndex: cardCreateState.currentPosition!.colIndex,
                            rowSpan: cardCreateState.startSize.rowSpan,
                            colSpan: cardCreateState.startSize.colSpan,
                        })
                    }
                }
            }
        }


        interaction.setEventHandlers({

            OnStart: (type, state) => {

                if (type === "create") {

                    setCreateMode(root, true)

                    handleCardCreateInteraction(root, registry, sessionRef, metricsRef, interaction, state as CardCreateState)
                }
            },

            OnEnd: (type) => {

                if (type === "create") {
                    setCreateMode(root, false)
                    endCardCreateInteraction(root, registry, interaction);
                }
            }

        })

        root.addEventListener("pointerdown", handlePointerDown)
        root.addEventListener("pointermove", handlePointerMove)
        root.addEventListener("pointerup", handlePointerUp)

        return () => {

            root.removeEventListener("pointerdown", handlePointerDown)
            root.removeEventListener("pointermove", handlePointerMove)
            root.removeEventListener("pointerup", handlePointerUp)

        }

    }, [rootRef, interaction, registry])
}