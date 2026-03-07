import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/types";

export interface BoardInteraction {
    cardResize: CardResizeState | null;
    cardMove: CardMoveState | null;
    pointer: Pointer | null;

    startCardResize: (cardId: string, sectionId: string, pointer: Pointer, size: GridSize, resizeHandle: ResizeHandle) => void;
    startCardMove: (cardId: string, sectionId: string, pointer: Pointer, position: GridPosition) => void;
    endInteraction: () => void;
}

export interface CardBaseState {
    cardId: string;
    startSectionId: string;
    startPointer: Pointer;
}

export interface CardResizeState extends CardBaseState {
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}

export interface CardMoveState extends CardBaseState {
    startPosition: GridPosition;
    currentSectionId: string;
    currentPosition: GridPosition;
}

//

export function createBoardInteraction(): BoardInteraction {

    const interaction: BoardInteraction = {
        pointer: null,
        cardMove: null,
        cardResize: null,

        startCardMove(cardId, sectionId, pointer, position) {
            interaction.cardResize = null

            interaction.cardMove = {
                cardId,
                startSectionId: sectionId,
                startPointer: pointer,
                startPosition: position,
                currentSectionId: sectionId,
                currentPosition: position
            }
        },

        startCardResize(cardId, sectionId, pointer, size, handle) {
            interaction.cardMove = null

            interaction.cardResize = {
                cardId,
                startSectionId: sectionId,
                startPointer: pointer,
                startSize: size,
                currentSize: size,
                resizeHandle: handle
            }
        },

        endInteraction() {
            interaction.cardMove = null
            interaction.cardResize = null
            interaction.pointer = null
        }
    }

    return interaction
}