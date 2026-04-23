import { DailyboardCardPlacement } from "../../dailyboard/types/dailyboard.data.types";
import { GridRect, GridSpan, Rect } from "../../shared/types/common";
import { CanvasMetrics } from "../../ui-canvas/types/canvas.metrics";

export interface DailyboardCardPlacementContent {
    cardSize: GridSpan;
    targetCardKey?: string;
}

export interface DailyboardCardPlacementState {
    content: DailyboardCardPlacementContent | null;
    hammer: HammerManager | null;
    canvasMetrics: CanvasMetrics | null;

    dailyboardElement: HTMLDivElement | null;
    sectionElement: HTMLDivElement | null;
    sectionElementData: { name: string; position: GridRect } | null;
    gridElement: HTMLDivElement | null;

    ghostCardElement: HTMLDivElement | null;
    ghostCardGridPos: GridRect | null;
    ghostCardPos: Rect | null;
    isGhostCardOverlapping: boolean;

    suggestedCardElement: HTMLDivElement | null;
    suggestedCardGridPos: GridRect | null;
    suggestedCardPos: Rect | null;
}

export interface DailyboardCardPlacementResult {
    content: DailyboardCardPlacementContent;
    success: boolean;
    placement: DailyboardCardPlacement | null;
}