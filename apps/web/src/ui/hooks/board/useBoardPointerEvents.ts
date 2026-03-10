import { useBoardStore } from "@/src/stores/board.store";
import { useEffect } from "react";
import { BoardInteraction } from "@/src/ui/types/board/board.interaction";
import { setCreateMode } from "@/src/ui/interactions/board/create-card/dom";
import { handleCardCreateInteraction, endCardCreateInteraction } from "@/src/ui/interactions/board/create-card/handler";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardMetrics } from "@/src/ui/types/board/board.dom";
import { BoardSessionState, CardCreationSession } from "@/src/core/types/domain/board/board.session";

export function useBoardPointerEvents(
    rootRef: React.RefObject<HTMLDivElement | null>,
    registry: BoardRegistry,
    metricsRef: React.RefObject<BoardMetrics>,
    sessionRef: React.RefObject<BoardSessionState>,
    interaction: BoardInteraction
) {
    const createCard = useBoardStore(state => state.createCard);

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

            if (currentSession.cardCreation) {
                handleCardCreateInteraction(rootRef.current!, registry, sessionRef, metricsRef, interaction, currentSession.cardCreation)
                return
            }

            if (currentSession.cardMovement) return
            if (currentSession.cardResize) return
        }

        function handlePointerUp(e: PointerEvent) {
            const root = rootRef.current
            if (!root) return

            root.releasePointerCapture(e.pointerId)

            const currentSession = sessionRef.current

            if (
                currentSession.cardCreation
            ) {
                const cardCreateState = currentSession.cardCreation!;

                if(cardCreateState.currentSectionId && cardCreateState.currentPosition) {
                    const section = registry.getLayoutSection(cardCreateState.currentSectionId);
                    if(!section) return;

                    createCard({
                        placement: {
                            sectionName: section.props!.name,
                            position: {
                                colIndex: cardCreateState.currentPosition.colIndex,
                                rowIndex: cardCreateState.currentPosition.rowIndex,
                                colSpan: cardCreateState.startSize.colSpan,
                                rowSpan: cardCreateState.startSize.rowSpan,
                            }
                        }
                    })
                }

                interaction.finishInteraction();
            }
        }


        interaction.setEventHandlers({

            OnStart: (type, state) => {

                if (type === "create") {

                    setCreateMode(root, true)

                    handleCardCreateInteraction(root, registry, sessionRef, metricsRef, interaction, state as CardCreationSession)
                }
            },

            OnFinish: (type) => {

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