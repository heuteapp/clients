import { BoardSessionUpdater } from "../sessions/board"
import { BoardInteraction } from "./board.interaction.types"


export function createBoardInteraction(
    setSession: BoardSessionUpdater
): BoardInteraction {

    const interaction: BoardInteraction = {
        pointer: null,
        eventType: null,
        eventHandlers: null,

        setSession,

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

            interaction.setSession((draft) => {
                draft.cardCreate = state;
                draft.cardMove = null;
                draft.cardResize = null;
            })
            
            interaction.eventType = "create";
            interaction.eventHandlers?.OnStart(interaction.eventType, state)
        },

        updateCardCreate(sectionId, position) {
            interaction.setSession(prev => {
                if(!prev.cardCreate) return prev;

                return {
                    ...prev,
                    cardCreate: {
                        ...prev.cardCreate,
                        currentSectionId: sectionId,
                        currentPosition: position,
                    }
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

            interaction.setSession((draft) => {
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

            interaction.setSession((draft) => {
                draft.cardResize = state;
                draft.cardCreate = null;
                draft.cardMove = null;
            })

            interaction.eventType = "resize";
            interaction.eventHandlers?.OnStart(interaction.eventType, state)
        },

        endInteraction() {
            if(!interaction.eventType) return;

            interaction.eventHandlers?.OnEnd(interaction.eventType);
            interaction.eventType = null;

            interaction.setSession((draft) => {
                draft.cardCreate = null;
                draft.cardMove = null;
                draft.cardResize = null;
            })
        }
    }

    return interaction
}