import { BoardSession, BoardSessionUpdater } from "@/src/ui/types/board/board.session"
import { BoardInteraction } from "./board.interaction.types"


export function createBoardInteraction(
    sessionRef: React.RefObject<BoardSession>,
    sessionUpdater: BoardSessionUpdater
): BoardInteraction {

    const interaction: BoardInteraction = {
        pointer: null,
        eventType: null,
        eventHandlers: null,
        sessionRef,

        sessionUpdater,

        setEventHandlers(handlers) {
            interaction.endInteraction()
            interaction.eventHandlers = handlers
        },

        startCardCreate(size) {
            const state = {
                cardId: "temp",
                startPointer: interaction.pointer!,
                startSize: size,
                currentSectionId: null,
                currentPosition: null
            }

            interaction.sessionUpdater((draft) => {
                draft.status = "progress";
                draft.cardCreate = state;
                draft.cardMove = null;
                draft.cardResize = null;
            })
            
            interaction.eventType = "create";
            interaction.eventHandlers?.OnStart(interaction.eventType, state)
        },

        updateCardCreate(sectionId, position) {
            interaction.sessionUpdater((draft) => {
                if(draft.cardCreate) {
                    draft.cardCreate.currentSectionId = sectionId;
                    draft.cardCreate.currentPosition = position;
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
                draft.status = "progress";
                draft.cardMove = state;
                draft.cardCreate = null;
                draft.cardResize = null;
            })

            interaction.eventType = "move";
            interaction.eventHandlers?.OnStart(interaction.eventType, state)
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
                draft.status = "progress";
                draft.cardResize = state;
                draft.cardCreate = null;
                draft.cardMove = null;
            })

            interaction.eventType = "resize";
            interaction.eventHandlers?.OnStart(interaction.eventType, state)
        },

        executeInteraction() {
            if(!interaction.eventType) return;

            interaction.sessionUpdater((draft) => {
                draft.status = "executing";
            })
        },

        successInteraction() {
            if(!interaction.eventType) return;

            interaction.sessionUpdater((draft) => {
                draft.status = "success";
            })

            interaction.eventHandlers?.OnSuccess(interaction.eventType, interaction.getCurrentState()!);
            interaction.endInteraction();
        },

        cancelInteraction() {
            if(!interaction.eventType) return;

            interaction.eventHandlers?.OnCancel(interaction.eventType, interaction.getCurrentState()!);
            interaction.endInteraction();
        },

        errorInteraction(error) {
            if(!interaction.eventType) return;

            interaction.sessionUpdater((draft) => {
                draft.status = "error";
            })

            interaction.eventHandlers?.OnError(interaction.eventType, interaction.getCurrentState()!, error);
            interaction.endInteraction();
        },

        endInteraction() {
            if(!interaction.eventType) return;

            interaction.eventHandlers?.OnEnd(interaction.eventType);
            interaction.eventType = null;

            interaction.sessionUpdater((draft) => {
                draft.status = "idle";
                draft.cardCreate = null;
                draft.cardMove = null;
                draft.cardResize = null;
            })
        },

        getCurrentState() {
            if(!interaction.eventType) return null;

            const session = sessionRef.current;
            if(!session) return null;

            switch(interaction.eventType) {
                case "create":
                    return session.cardCreate;
                case "move":
                    return session.cardMove;
                case "resize":
                    return session.cardResize;
                default:
                    return null;
            }
        }
    }

    return interaction
}