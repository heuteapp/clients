import { GridSize, Pointer, ResizeHandle } from "@/src/core/types/shared/common";
import { Identifier } from "@/src/core/types/shared/data";
import { Draft } from "immer";
import { CardPositionInfo } from "@/src/core/types/shared/board";

export interface BoardSessionValue {
    pointerId?: number | null;
    cardCreation: CardCreationState | null;
    cardMovement: CardMovementState | null;
    cardResize: CardResizeState | null;
}
    
export type BoardSessionUpdater = (updater: (draft: Draft<BoardSessionValue>) => void) => void;

//

export interface SessionBaseState {
    startPointer: Pointer;
}

export interface CardBaseState extends SessionBaseState {
    cardId: Identifier;
}

export interface CardCreationState extends CardBaseState {
    startSize: GridSize;
    currentPlacement: CardPositionInfo | null;
}

export interface CardMovementState extends CardBaseState {
    startPlacement: CardPositionInfo;
    currentPlacement: CardPositionInfo | null;
}

export interface CardResizeState extends CardBaseState {
    startSectionId: Identifier;
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}