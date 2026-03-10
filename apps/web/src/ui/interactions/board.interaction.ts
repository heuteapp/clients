import { BoardInteraction } from "@/src/ui/types/board/board.interaction"
import { createIdentifier } from "@/src/core/utils/shared/data"
import { BoardSession } from "@/src/ui/types/board/board.session"


export function createBoardInteraction(
    session: BoardSession
): BoardInteraction {

    const interaction: BoardInteraction = {
        pointer: null,
        eventType: null,
        eventHandlers: null,
        session,

        setEventHandlers(handlers) {
            interaction.finishInteraction()
            interaction.eventHandlers = handlers
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
            
            interaction.eventType = "creation";
            interaction.eventHandlers?.OnStart?.(interaction.eventType, state)
        },

        updateCardCreation(placement) {
            interaction.session.updater((draft) => {
                if(draft.cardCreation) {
                    draft.cardCreation.currentPlacement = placement;
                }
            })

            interaction.eventHandlers?.OnUpdate?.(interaction.eventType!, interaction.getCurrentState()!)
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

            interaction.eventType = "movement";
            interaction.eventHandlers?.OnStart?.(interaction.eventType, state)
        },

        finishInteraction() {
            if(!interaction.eventType) return;

            interaction.eventHandlers?.OnFinish?.(interaction.eventType, interaction.getCurrentState()!);
            interaction.eventType = null;

            interaction.session.updater((draft) => {
                draft.cardCreation = null;
                draft.cardMovement = null;
                draft.cardResize = null;
            })
        },

        getCurrentState() {
            if(!interaction.eventType) return null;

            const session = interaction.session.ref.current;
            if(!session) return null;

            switch(interaction.eventType) {
                case "creation":
                    return session.cardCreation;
                case "movement":
                    return session.cardMovement;
                case "resize":
                    return session.cardResize;
                default:
                    return null;
            }
        }
    }

    return interaction
}