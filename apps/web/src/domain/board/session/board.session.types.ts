import { Pointer, GridSize, GridPosition, ResizeHandle } from "@/src/shared/types";

export interface BoardSession {
    pointerId?: number | null;
    cardCreate: CardCreateState | null;
    cardResize: CardResizeState | null;
    cardMove: CardMoveState | null;
}

export type BoardSessionSetter = React.Dispatch<React.SetStateAction<BoardSession>>;

export type BoardSessionTuple = [BoardSession, BoardSessionSetter];

//

export interface CardBaseState {
    cardId: string;
    startPointer: Pointer;
}

export interface CardCreateState extends CardBaseState {
    startSize: GridSize;
    currentSectionId: string | null;
    currentPosition: GridPosition | null;
}

export interface CardResizeState extends CardBaseState {
    startSectionId: string;
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}

export interface CardMoveState extends CardBaseState {
    startPosition: GridPosition;
    startSectionId: string;
    currentSectionId: string;
    currentPosition: GridPosition;
}