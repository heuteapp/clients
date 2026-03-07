import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/types";

//

export interface BoardSession {
    cardResize: CardResizeState | null;
    cardMove: CardMoveState | null;
    pointer: Pointer | null;
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