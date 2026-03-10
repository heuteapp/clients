import { useEffect } from "react";
import { useBoardStore } from "@/src/stores/board.store";
import { handleCardCreateInteraction, endCardCreateInteraction } from "@/src/ui/interactions/domain/board/sessions/create-card/handler";
import { BoardContextValue } from "@/src/ui/types/board/board.context";
import { BoardInteractionType } from "@/src/core/types/domain/board/board.interaction";

export function useBoardPointerEvents(
    context: BoardContextValue
) {
    const createCard = useBoardStore(state => state.createCard);
    const { rootRef, registry, session, interaction } = context;

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
                handleCardCreateInteraction(context)
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


        interaction.setCallbacks({
            OnStart: (type) => {
                if (type === BoardInteractionType.CardCreation) {
                    handleCardCreateInteraction(context)
                }
            },
            OnFinish: (type) => {
                if (type === BoardInteractionType.CardCreation) {
                    endCardCreateInteraction(context);
                }
            }
        });

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