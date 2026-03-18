import { GridSize, Pointer, ResizeHandle } from "@/src/core/types/shared/common";
import { Identifier } from "@/src/core/types/shared/data";
import { Draft } from "immer";
import { CardPositionInfo } from "@/src/core/types/shared/board";

export interface BoardSessionValue {
    pointerId?: number | null;
    cardCreation: BoardCardCreationState | null;
    cardMovement: BoardCardMovementState | null;
    cardResize: BoardCardResizeState | null;
}
    
export type BoardSessionUpdater = (updater: (draft: Draft<BoardSessionValue>) => void) => void;

//

export type BoardSessionManager = {
    current: BoardSessionValue;
    updater: BoardSessionUpdater;
}

//

export interface BoardBaseState {
    startPointer: Pointer;
}

export interface BoardCardBaseState extends BoardBaseState {
    cardId: Identifier;
}

export interface BoardCardCreationState extends BoardCardBaseState {
    startSize: GridSize;
    currentPlacement: CardPositionInfo | null;
}

export interface BoardCardMovementState extends BoardCardBaseState {
    startPlacement: CardPositionInfo;
    currentPlacement: CardPositionInfo | null;
}

export interface BoardCardResizeState extends BoardCardBaseState {
    startSectionId: Identifier;
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}