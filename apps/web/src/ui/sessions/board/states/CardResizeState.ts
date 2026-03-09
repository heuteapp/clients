import { GridSize, ResizeHandle } from "@/src/types/shared/common";
import { CardBaseState } from "./CardBaseState";

export interface CardResizeState extends CardBaseState {
    startSectionId: string;
    startSize: GridSize;
    currentSize: GridSize;
    resizeHandle: ResizeHandle;
}