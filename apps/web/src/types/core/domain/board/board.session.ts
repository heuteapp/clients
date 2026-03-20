import { GridSize, Pointer, ResizeHandle } from "@/src/core/types/shared/common";
import { Identifier } from "@/src/core/types/shared/data";
import { Draft } from "immer";
import { CardPositionInfo } from "@/src/core/types/shared/board";

//

export interface BoardBaseSessionManager<
    TValue extends BoardBaseSessionValue,
    TUpdater extends BoardBaseSessionUpdater<TValue>
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
    cardCreation: BoardUserCardCreationState | null;
    cardMovement: BoardUserCardMovementState | null;
    cardResize: BoardUserCardResizeState | null;
}
    
export type BoardUserSessionUpdater = BoardBaseSessionUpdater<BoardUserSessionValue>;

//

export interface BoardUserSessionManager extends BoardBaseSessionManager<BoardUserSessionValue, BoardUserSessionUpdater> {
    
}

//

export interface BoardBaseState {
    startPointer: Pointer;
}

//

export interface BoardUserBaseState extends BoardBaseState {

}

export interface BoardUserCardBaseState extends BoardUserBaseState {
    cardId: Identifier;
}

export interface BoardUserCardCreationState extends BoardUserBaseState {
    startSize: GridSize;
    currentPlacement: CardPositionInfo | null;
}

export interface BoardUserCardMovementState extends BoardUserBaseState {
    startPlacement: CardPositionInfo;
    currentPlacement: CardPositionInfo | null;
}

export interface BoardUserCardResizeState extends BoardUserBaseState {
    startSectionId: Identifier;
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}