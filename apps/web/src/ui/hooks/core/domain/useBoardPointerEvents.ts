import { useEffect } from "react";
import { handleCardCreateInteraction, finishCardCreationState } from "@/src/ui/interactions/domain/board/states/create-card/handler";
import { BoardUserInteractionType } from "@/src/types/core/domain/board/board.interaction";
import { findCardUnderPointer } from "../../../interactions/domain/board/board.detector";
import { useBoardContext } from "./useBoardContext";

export function useBoardPointerEvents() {
    const context = useBoardContext();

    const { rootRef, interaction, registry, sessionManager, contentManager } = context

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
                case BoardUserInteractionType.Idle: {

                }
            }
        }

        function handlePointerMove(e: PointerEvent) {

            interaction.pointer = {
                x: e.clientX,
                y: e.clientY
            }

            const currentSession = sessionManager.current

            switch (interaction.type) {
                case BoardUserInteractionType.CardCreation: {
                    handleCardCreateInteraction(context)
                }
                case BoardUserInteractionType.Idle: {
                    
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
                case BoardUserInteractionType.CardCreation: {
                    handleCardCreateInteraction(context)
                }
                break;
                case BoardUserInteractionType.Idle: {

                    const now = performance.now()
                    if (now - lastClickTime < DOUBLE_CLICK_THRESHOLD) {
                        const result = findCardUnderPointer(registry, { x: e.clientX, y: e.clientY });
                        if (result) {
                            const { card } = result;

                            if(card.props?.name)
                            contentManager.current!.deleteCard(card.props?.name)
                        }

                        lastClickTime = 0 // sıfırla
                    } else {
                        lastClickTime = now
                    }
                }
                break;
            }

            const currentSession = sessionManager.current

            if (
                currentSession.cardCreation
            ) {


                interaction.finishInteraction();
            }
        }


        interaction.setCallbacks({
            OnStart: (type) => {
                if (type === BoardUserInteractionType.CardCreation) {
                    handleCardCreateInteraction(context)
                }
            },
            OnFinish: (type, state) => {
                switch (type) {
                    case BoardUserInteractionType.CardCreation: {

                    }
                }

                if (type === BoardUserInteractionType.CardCreation) {
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