import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/types";

export interface BoardIntroduction {
    cardResize: CardResizeState | null;
    cardMove: CardMoveState | null;
    pointer?: Pointer;
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