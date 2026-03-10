import { useEffect } from "react";
import { useBoardStore } from "@/src/stores/board.store";
import { handleCardCreateInteraction, finishCardCreationState } from "@/src/ui/interactions/domain/board/states/create-card/handler";
import { BoardContextValue } from "@/src/ui/types/board/board.context";
import { BoardInteractionType } from "@/src/core/types/domain/board/board.interaction";
import { CardCreationState } from "@/src/core/types/domain/board/board.session";

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