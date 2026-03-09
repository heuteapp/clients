import { GridSize, GridPosition } from "@/src/types/shared/common";
import { CardBaseState } from "./CardBaseState";

export interface CardCreateState extends CardBaseState {
    startSize: GridSize;
    currentSectionId: string | null;
    currentPosition: GridPosition | null;
}