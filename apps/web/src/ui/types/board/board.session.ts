import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/core/types/shared/common";
import { Identifier } from "@/src/core/types/shared/data";
import { Draft } from "immer";

export interface BoardSession {
    pointerId?: number | null;
    status: BoardSessionStatus;
    cardCreate: CardCreateState | null;
    cardResize: CardResizeState | null;
    cardMove: CardMoveState | null;
}

export type BoardSessionStatus = "idle" | "progress" | "executing" | "succeeded" | "cancelled" | "failed";
    
export type BoardSessionUpdater = (updater: (draft: Draft<BoardSession>) => void) => void;

//

export interface CardBaseState {
    cardId: string;
    startPointer: Pointer;
}

export interface CardCreateState extends CardBaseState {
    startSize: GridSize;
    currentSectionId: Identifier | null;
    currentPosition: GridPosition | null;
}

export interface CardMoveState extends CardBaseState {
    startPosition: GridPosition;
    startSectionId: Identifier;
    currentSectionId: Identifier;
    currentPosition: GridPosition;
}

export interface CardResizeState extends CardBaseState {
    startSectionId: Identifier;
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}