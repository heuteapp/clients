import { useEffect } from "react";
import { handleCardCreateInteraction, finishCardCreationState } from "@/src/ui/interactions/domain/board/states/create-card/handler";
import { BoardContextValue } from "@/src/ui/types/board/board.context";
import { BoardInteractionType } from "@/src/core/types/domain/board/board.interaction";
import { findCardUnderPointer } from "../../interactions/domain/board/board.detector";

export function useBoardPointerEvents(
    context: BoardContextValue
) {
    const { rootRef, registry, session, interaction, actions } = context;

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

            switch (interaction.type) {
                case BoardInteractionType.Idle: {

                }
            }
        }

        function handlePointerMove(e: PointerEvent) {

            interaction.pointer = {
                x: e.clientX,
                y: e.clientY
            }

            const currentSession = session.current

            switch (interaction.type) {
                case BoardInteractionType.CardCreation: {
                    handleCardCreateInteraction(context)
                }
                case BoardInteractionType.Idle: {
                    
                }
            }
        }

        let lastClickTime = 0
        const DOUBLE_CLICK_THRESHOLD = 300

        function handlePointerUp(e: PointerEvent) {
            const root = rootRef.current
            if (!root) return

            root.releasePointerCapture(e.pointerId)

            switch (interaction.type) {
                case BoardInteractionType.CardCreation: {
                    handleCardCreateInteraction(context)
                }
                break;
                case BoardInteractionType.Idle: {

                    const now = performance.now()
                    if (now - lastClickTime < DOUBLE_CLICK_THRESHOLD) {
                        const result = findCardUnderPointer(registry, { x: e.clientX, y: e.clientY });
                        if (result) {
                            const { card } = result;

                            if(card.props?.name)
                            actions.deleteCard(card.props?.name)
                        }

                        lastClickTime = 0 // sıfırla
                    } else {
                        lastClickTime = now
                    }
                }
                break;
            }

            const currentSession = session.current

            if (
                currentSession.cardCreation
            ) {


                interaction.finishInteraction();
            }
        }


        interaction.setCallbacks({
            OnStart: (type) => {
                if (type === BoardInteractionType.CardCreation) {
                    handleCardCreateInteraction(context)
                }
            },
            OnFinish: (type, state) => {
                switch (type) {
                    case BoardInteractionType.CardCreation: {

                    }
                }

                if (type === BoardInteractionType.CardCreation) {
                    finishCardCreationState(context);
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