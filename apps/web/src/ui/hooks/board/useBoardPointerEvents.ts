import { useBoardStore } from "@/src/stores/board.store";
import { useEffect } from "react";
import { BoardInteraction } from "@/src/ui/types/board/board.interaction";
import { handleCardCreateInteraction, endCardCreateInteraction } from "@/src/ui/interactions/domain/board/create-card/handler";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardMetrics } from "@/src/ui/types/board/board.metrics";
import { CardCreationSession } from "@/src/core/types/domain/board/board.session";
import { BoardSession } from "../../types/board/board.session";

export function useBoardPointerEvents(
    rootRef: React.RefObject<HTMLDivElement | null>,
    registry: BoardRegistry,
    session: BoardSession,
    interaction: BoardInteraction,
    metrics: BoardMetrics,
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

            const currentSession = session.current

            if (currentSession.cardCreation) {
                handleCardCreateInteraction(rootRef.current!, registry, session, metrics, interaction, currentSession.cardCreation)
                return
            }

            if (currentSession.cardMovement) return
            if (currentSession.cardResize) return
        }

        function handlePointerUp(e: PointerEvent) {
            const root = rootRef.current
            if (!root) return

            root.releasePointerCapture(e.pointerId)

            const currentSession = session.current

            if (
                currentSession.cardCreation
            ) {
                const cardCreateState = currentSession.cardCreation!;

                const currentPlacement = cardCreateState.currentPlacement;

                if(currentPlacement && currentPlacement.sectionId && currentPlacement.position) {
                    const section = registry.getLayoutSection(currentPlacement.sectionId);
                    if(!section) return;

                    createCard({
                        placement: {
                            sectionName: section.props!.name,
                            position: {
                                colIndex: currentPlacement.position.colIndex,
                                rowIndex: currentPlacement.position.rowIndex,
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

                if (type === "creation") {
                    handleCardCreateInteraction(root, registry, session, metrics, interaction, state as CardCreationSession)
                }
            },

            OnFinish: (type) => {

                if (type === "creation") {
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