import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/types";
import { BoardSession, BoardSessionSetter, CardBaseState } from "./session/board.session.types";

export interface BoardInteraction {
    pointer: Pointer | null;
    eventType: BoardInteractionEventType | null;
    eventHandlers: BoardInteractionEventHandlers | null

    setSession: (updater: (prev: BoardSession) => BoardSession) => void
    setEventHandlers: (handlers: BoardInteractionEventHandlers | null) => void

    startCardCreate: (
        size: GridSize
    ) => void

    updateCardCreate: (
        sectionId: string | null,
        position: GridPosition | null
    ) => void

    startCardResize: (
        cardId: string,
        sectionId: string,
        pointer: Pointer,
        size: GridSize,
        resizeHandle: ResizeHandle
    ) => void

    startCardMove: (
        cardId: string,
        sectionId: string,
        pointer: Pointer,
        position: GridPosition
    ) => void

    endInteraction: () => void
}

export interface BoardInteractionEventHandlers {
    OnStart: (type: BoardInteractionEventType, state: CardBaseState) => void;
    OnEnd: (type: BoardInteractionEventType) => void;
}

export type BoardInteractionEventType = "create" | "move" | "resize";

//

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