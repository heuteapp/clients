import { GridSize, Pointer, ResizeHandle } from "@/src/core/types/shared/common";
import { Identifier } from "@/src/core/types/shared/data";
import { Draft } from "immer";
import { CardPositionInfo } from "@/src/core/types/shared/board";

//

export interface BoardBaseSessionManager<
    TValue extends BoardBaseSessionValue = BoardBaseSessionValue,
    TUpdater extends BoardBaseSessionUpdater<TValue> = BoardBaseSessionUpdater<TValue>
> {
    current: TValue;
    updater: TUpdater;
}

export interface BoardBaseSessionValue {
    pointerId?: number | null;
}

export type BoardBaseSessionUpdater<TValue extends BoardBaseSessionValue> 
    = (updater: (draft: Draft<TValue>) => void) => void;

//

export interface BoardUserSessionValue extends BoardBaseSessionValue {
    cardCreation: BoardCardCreationState | null;
    cardMovement: BoardCardMovementState | null;
    cardResize: BoardCardResizeState | null;
}
    
export type BoardUserSessionUpdater = BoardBaseSessionUpdater<BoardUserSessionValue>;

//

export interface BoardUserSessionManager extends BoardBaseSessionManager<BoardUserSessionValue, BoardUserSessionUpdater> {
    
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