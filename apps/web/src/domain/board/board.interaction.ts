import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/types";
import { BoardSession } from "./board.session";

export interface BoardInteraction {
    session: BoardSession
    eventHandlers: BoardInteractionEventHandlers | null

    setEventHandlers: (handlers: BoardInteractionEventHandlers | null) => void;

    startCardCreate: (size: GridSize) => void;
    startCardResize: (cardId: string, sectionId: string, pointer: Pointer, size: GridSize, resizeHandle: ResizeHandle) => void;
    startCardMove: (cardId: string, sectionId: string, pointer: Pointer, position: GridPosition) => void;
    endInteraction: () => void;
}

export interface BoardInteractionEventHandlers {
    OnStart: () => void;
    OnEnd: () => void;
}

//

export function createBoardInteraction(session: BoardSession): BoardInteraction {

    const interaction: BoardInteraction = {
        session,
        eventHandlers: null,

        setEventHandlers(handlers) {
            interaction.endInteraction();
            interaction.eventHandlers = handlers;
        },

        startCardCreate(size) {
            interaction.session.cardMove = null
            interaction.session.cardResize = null

            interaction.session.cardCreate = {
                cardId: "temp",
                startPointer: session.pointer!,
                startSize: size,
                currentSectionId: null
            }

            interaction.eventHandlers?.OnStart();
        },

        startCardMove(cardId, sectionId, pointer, position) {
            interaction.session.cardCreate = null
            interaction.session.cardResize = null


            interaction.session.cardMove = {
                cardId,
                startSectionId: sectionId,
                startPointer: pointer,
                startPosition: position,
                currentSectionId: sectionId,
                currentPosition: position
            }

            interaction.eventHandlers?.OnStart();
        },

        startCardResize(cardId, sectionId, pointer, size, handle) {
            interaction.session.cardCreate = null
            interaction.session.cardMove = null

            interaction.session.cardResize = {
                cardId,
                startSectionId: sectionId,
                startPointer: pointer,
                startSize: size,
                currentSize: size,
                resizeHandle: handle
            }

            interaction.eventHandlers?.OnStart();
        },

        endInteraction() {
            interaction.session.cardCreate = null
            interaction.session.cardMove = null
            interaction.session.cardResize = null
            interaction.session.pointer = null

            interaction.eventHandlers?.OnEnd();
        }
    }

    return interaction
}