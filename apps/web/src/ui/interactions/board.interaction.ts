import { BoardSessionSetter } from "../sessions/board.session.types"
import { BoardInteraction } from "./board.interaction.types"


export function createBoardInteraction(
    setSession: BoardSessionSetter
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

            interaction.setSession(() => ({
                cardMove: null,
                cardResize: null,
                cardCreate: state
            }))
            
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

            interaction.setSession(() => ({
                cardCreate: null,
                cardResize: null,
                cardMove: state
            }))

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

            interaction.setSession(() => ({
                cardCreate: null,
                cardMove: null,
                cardResize: state
            }))

            interaction.eventType = "resize";
            interaction.eventHandlers?.OnStart(interaction.eventType, state)
        },

        endInteraction() {
            if(!interaction.eventType) return;

            interaction.eventHandlers?.OnEnd(interaction.eventType);
            interaction.eventType = null;

            interaction.setSession(() => ({
                cardCreate: null,
                cardMove: null,
                cardResize: null,
                pointer: null
            }))
        }
    }

    return interaction
}