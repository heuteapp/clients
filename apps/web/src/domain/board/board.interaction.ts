import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/types";
import { BoardSession } from "./board.session";

export interface BoardInteraction {
    pointer: Pointer | null;
    eventHandlers: BoardInteractionEventHandlers | null

    getSession: () => BoardSession
    setSession: (updater: (prev: BoardSession) => BoardSession) => void

    setEventHandlers: (handlers: BoardInteractionEventHandlers | null) => void

    startCardCreate: (
        size: GridSize
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
    OnStart: () => void;
    OnEnd: () => void;
}

//

export function createBoardInteraction(
    getSession: () => BoardSession,
    setSession: (updater: (prev: BoardSession) => BoardSession) => void
): BoardInteraction {

    const interaction: BoardInteraction = {
        pointer: null,
        eventHandlers: null,

        getSession,
        setSession,

        setEventHandlers(handlers) {
            interaction.endInteraction()
            interaction.eventHandlers = handlers
        },

        startCardCreate(size) {
            setSession(prev => ({
                ...prev,
                cardMove: null,
                cardResize: null,
                cardCreate: {
                    cardId: "temp",
                    startPointer: interaction.pointer!,
                    startSize: size,
                    currentSectionId: null
                }
            }))

            interaction.eventHandlers?.OnStart()
        },

        startCardMove(cardId, sectionId, pointer, position) {
            setSession(prev => ({
                ...prev,
                cardCreate: null,
                cardResize: null,
                cardMove: {
                cardId,
                startSectionId: sectionId,
                startPointer: pointer,
                startPosition: position,
                currentSectionId: sectionId,
                currentPosition: position
                }
            }))

            interaction.eventHandlers?.OnStart()
        },

        startCardResize(cardId, sectionId, pointer, size, handle) {
            setSession(prev => ({
                ...prev,
                cardCreate: null,
                cardMove: null,
                cardResize: {
                cardId,
                startSectionId: sectionId,
                startPointer: pointer,
                startSize: size,
                currentSize: size,
                resizeHandle: handle
                }
            }))

            interaction.eventHandlers?.OnStart()
        },

        endInteraction() {
            interaction.eventHandlers?.OnEnd()

            setSession(prev => ({
                ...prev,
                cardCreate: null,
                cardMove: null,
                cardResize: null,
                pointer: null
            }))
        }
    }

    return interaction
}