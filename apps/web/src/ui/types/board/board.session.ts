import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/types/shared/common";
import { Draft } from "immer";

export interface BoardSession {
    pointerId?: number | null;
    cardCreate: CardCreateState | null;
    cardResize: CardResizeState | null;
    cardMove: CardMoveState | null;
}
    
export type BoardSessionUpdater = (updater: (draft: Draft<BoardSession>) => void) => void;

export interface CardBaseState {
    cardId: string;
    startPointer: Pointer;
}

export interface CardCreateState extends CardBaseState {
    startSize: GridSize;
    currentSectionId: string | null;
    currentPosition: GridPosition | null;
}

export interface CardMoveState extends CardBaseState {
    startPosition: GridPosition;
    startSectionId: string;
    currentSectionId: string;
    currentPosition: GridPosition;
}

export interface CardResizeState extends CardBaseState {
    startSectionId: string;
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}