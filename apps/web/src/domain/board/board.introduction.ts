import { GridSize, Pointer, ResizeHandle } from "@/src/types";

export interface BoardIntroduction {
    cardResize: CardResizeState | null;
    pointer?: Pointer;
}

export interface CardBaseState {
    cardId: string;
    startSectionId: string;
    startPointer: Pointer;
}

export interface CardResizeState extends CardBaseState {
    currentSectionId: string;
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}