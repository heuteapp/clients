import { GridPosition } from "@/src/types/shared/common";
import { CardBaseState } from "./CardBaseState";

export interface CardMoveState extends CardBaseState {
    startPosition: GridPosition;
    startSectionId: string;
    currentSectionId: string;
    currentPosition: GridPosition;
}