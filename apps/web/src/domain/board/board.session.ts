import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/types";

//

export function createBoardSession(): BoardSession {
    return {
        cardCreate: null,
        cardResize: null,
        cardMove: null,
        pointer: null,
    }
}

//

export interface BoardSession {
    cardCreate: CardCreateState | null;
    cardResize: CardResizeState | null;
    cardMove: CardMoveState | null;
    pointer: Pointer | null;
}

export interface CardBaseState {
    cardId: string;
    startPointer: Pointer;
}

export interface CardCreateState extends CardBaseState {
    startSize: GridSize;
    currentSectionId: string | null;
}

export interface CardResizeState extends CardBaseState {
    startSectionId: string;
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}

export interface CardMoveState extends CardBaseState {
    startPosition: GridPosition;
    startSectionId: string;
    currentSectionId: string;
    currentPosition: GridPosition;
}