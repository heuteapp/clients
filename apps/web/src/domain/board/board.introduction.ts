import { GridSize, Pointer } from "@/src/types";

export interface BoardIntroduction {
    pointer: Pointer;
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
}