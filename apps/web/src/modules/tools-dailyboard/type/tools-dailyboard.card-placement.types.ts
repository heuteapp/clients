import { DailyboardCardPlacement } from "../../dailyboard/types/dailyboard.data.types";
import { GridSize } from "../../shared/types/common";

export interface DailyboardCardPlacementState {
    cardSize: GridSize;
    targetCardKey?: string;
}

export interface DailyboardCardPlacementResult {
    state: DailyboardCardPlacementState;
    success: boolean;
    placement: DailyboardCardPlacement | null;
}