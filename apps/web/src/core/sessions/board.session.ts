import { GridPosition, GridSize, Pointer, ResizeHandle } from "@/src/core/types/shared/common";
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
    currentSectionId: Identifier | null;
    currentPosition: GridPosition | null;
}

export interface CardMovementSession extends CardBaseSession {
    startPosition: GridPosition;
    startSectionId: Identifier;
    currentSectionId: Identifier;
    currentPosition: GridPosition;
}

export interface CardResizeSession extends CardBaseSession {
    startSectionId: Identifier;
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}