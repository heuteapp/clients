import { BoardUserInteraction } from "@/src/core/types/domain/board/board.interaction"
import { createIdentifier } from "@/src/core/utils/shared/data"
import { BoardSessionManager } from "@/src/core/types/domain/board/board.session"
import { BoardUserInteractionType } from "@/src/core/types/domain/board/board.interaction"

export function createBoardUserInteraction(
    session: BoardSessionManager
): BoardUserInteraction {

    const interaction: BoardUserInteraction = {
        pointer: null,
        type: BoardUserInteractionType.Idle,
        session,
        callbacks: null,

        setCallbacks(callbacks) {
            interaction.finishInteraction();
            interaction.callbacks = callbacks;
        },

        startCardCreate(size) {
            const state = {
                cardId: createIdentifier(),
                startPointer: interaction.pointer!,
                startSize: size,
                currentPlacement: null
            }

            interaction.session.updater((draft) => {
                draft.cardCreation = state;
                draft.cardMovement = null;
                draft.cardResize = null;
            })
            
            interaction.type = BoardUserInteractionType.CardCreation;
            interaction.callbacks?.OnStart?.(interaction.type, state)
        },

        updateCardCreation(placement) {
            interaction.session.updater((draft) => {
                if(draft.cardCreation) {
                    draft.cardCreation.currentPlacement = placement;
                }
            })

            interaction.callbacks?.OnUpdate?.(interaction.type, interaction.getCurrentState()!)
        },

        startCardMovement(cardId, placement) {
            const state = {
                cardId,
                startPointer: interaction.pointer!,
                startPlacement: placement,
                currentPlacement: null,
            }

            interaction.session.updater((draft) => {
                draft.cardMovement = state;
                draft.cardCreation = null;
                draft.cardResize = null;
            })

            interaction.type = BoardUserInteractionType.CardMovement;
            interaction.callbacks?.OnStart?.(interaction.type, state)
        },

        updateCardMovement(placement) {
            interaction.session.updater((draft) => {
                if(draft.cardMovement) {
                    draft.cardMovement.currentPlacement = placement;
                }
            })

            interaction.callbacks?.OnUpdate?.(interaction.type, interaction.getCurrentState()!)
        },

        finishInteraction() {
            if(!interaction.type) return;

            interaction.callbacks?.OnFinish?.(interaction.type, interaction.getCurrentState()!);
            interaction.type = BoardUserInteractionType.Idle;

            interaction.session.updater((draft) => {
                draft.cardCreation = null;
                draft.cardMovement = null;
                draft.cardResize = null;
            })
        },

        getCurrentState() {
            const session = interaction.session.current;
            if(!session) return null;

            switch(interaction.type) {
                case BoardUserInteractionType.CardCreation:
                    return session.cardCreation;
                case BoardUserInteractionType.CardMovement:
                    return session.cardMovement;
                case BoardUserInteractionType.CardResize:
                    return session.cardResize;
                default:
                    return null;
            }
        }
    }

    return interaction
}