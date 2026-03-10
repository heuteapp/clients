import { BoardInteraction } from "@/src/ui/types/board/board.interaction"
import { createIdentifier } from "@/src/core/utils/shared/data"
import { BoardSessionState, BoardSessionUpdater } from "@/src/core/types/domain/board/board.session"


export function createBoardInteraction(
    sessionRef: React.RefObject<BoardSessionState>,
    sessionUpdater: BoardSessionUpdater
): BoardInteraction {

    const interaction: BoardInteraction = {
        pointer: null,
        eventType: null,
        eventHandlers: null,
        sessionRef,

        sessionUpdater,

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

            interaction.sessionUpdater((draft) => {
                draft.cardCreation = state;
                draft.cardMovement = null;
                draft.cardResize = null;
            })
            
            interaction.eventType = "creation";
            interaction.eventHandlers?.OnStart?.(interaction.eventType, state)
        },

        updateCardCreation(placement) {
            interaction.sessionUpdater((draft) => {
                if(draft.cardCreation) {
                    draft.cardCreation.currentPlacement = placement;
                }
            })

            const currentState = interaction.getCurrentState();

            if(currentState) {
                interaction.eventHandlers?.OnUpdate?.(interaction.eventType!, currentState)
            }
        },

        startCardMovement(cardId, placement) {
            const state = {
                cardId,
                startPointer: interaction.pointer!,
                startPlacement: placement,
                currentPlacement: null,
            }

            interaction.sessionUpdater((draft) => {
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

            interaction.sessionUpdater((draft) => {
                draft.cardCreation = null;
                draft.cardMovement = null;
                draft.cardResize = null;
            })
        },

        getCurrentState() {
            if(!interaction.eventType) return null;

            const session = sessionRef.current;
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