import { BoardInteraction } from "@/src/ui/types/domain/board/board.interaction"
import { createIdentifier } from "@/src/core/utils/shared/data"
import { BoardSessionManager } from "@/src/ui/types/domain/board/board.session"
import { BoardInteractionType } from "@/src/core/types/domain/board/board.interaction"

export function createBoardInteraction(
    session: BoardSessionManager
): BoardInteraction {

    const interaction: BoardInteraction = {
        pointer: null,
        type: BoardInteractionType.Idle,
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
            
            interaction.type = BoardInteractionType.CardCreation;
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

            interaction.type = BoardInteractionType.CardMovement;
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
            interaction.type = BoardInteractionType.Idle;

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
                case BoardInteractionType.CardCreation:
                    return session.cardCreation;
                case BoardInteractionType.CardMovement:
                    return session.cardMovement;
                case BoardInteractionType.CardResize:
                    return session.cardResize;
                default:
                    return null;
            }
        }
    }

    return interaction
}