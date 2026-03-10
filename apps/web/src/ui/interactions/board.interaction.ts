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
                currentSectionId: null,
                currentPosition: null
            }

            interaction.sessionUpdater((draft) => {
                draft.cardCreation = state;
                draft.cardMovement = null;
                draft.cardResize = null;
            })
            
            interaction.eventType = "creation";
            interaction.eventHandlers?.OnStart?.(interaction.eventType, state)
        },

        updateCardCreate(sectionId, position) {
            interaction.sessionUpdater((draft) => {
                if(draft.cardCreation) {
                    draft.cardCreation.currentSectionId = sectionId;
                    draft.cardCreation.currentPosition = position;
                }
            })
        },

        startCardMove(cardId, sectionId, pointer, position) {
            const state = {
                cardId,
                startSectionId: sectionId,
                startPointer: pointer,
                startPosition: position,
                currentSectionId: sectionId,
                currentPosition: position
            }

            interaction.sessionUpdater((draft) => {
                draft.cardMovement = state;
                draft.cardCreation = null;
                draft.cardResize = null;
            })

            interaction.eventType = "movement";
            interaction.eventHandlers?.OnStart?.(interaction.eventType, state)
        },

        startCardResize(cardId, sectionId, pointer, size, handle) {
            const state = {
                cardId,
                startSectionId: sectionId,
                startPointer: pointer,
                startSize: size,
                currentSize: size,
                resizeHandle: handle
            }

            interaction.sessionUpdater((draft) => {
                draft.cardResize = state;
                draft.cardCreation = null;
                draft.cardMovement = null;
            })

            interaction.eventType = "resize";
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