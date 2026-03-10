import { GridPosition, GridRect, GridSize, Pointer, ResizeHandle } from "@/src/core/types/shared/common";
import { Identifier } from "@/src/core/types/shared/data";
import { Draft } from "immer";

export interface BoardSessionState {
    pointerId?: number | null;
    cardCreation: CardCreationSession | null;
    cardMovement: CardMovementSession | null;
    cardResize: CardResizeSession | null;
}
    
export type BoardSessionUpdater = (updater: (draft: Draft<BoardSessionState>) => void) => void;

//

export interface CardBaseSession{
    cardId: Identifier;
    startPointer: Pointer;
}

export interface CardCreationSession extends CardBaseSession {
    startSize: GridSize;
    currentPlacement: CardPositionInfo | null;
}

//

export interface CardMovementSession extends CardBaseSession {
    startPlacement: CardPositionInfo;
    currentPlacement: CardPositionInfo | null;
}

export interface CardResizeSession extends CardBaseSession {
    startSectionId: Identifier;
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}

//

export interface CardPositionInfo {
    sectionId: Identifier;
    position: GridPosition;
}