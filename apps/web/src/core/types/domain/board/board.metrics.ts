import { LayoutMetricsValue } from "@/src/core/types/domain/layout/layout.metrics"
import { BoardState } from "./board.store";
import { BoardThemeValue } from "./board.theme";

export type BoardMetricsValue = {
    layout: LayoutMetricsValue | null
}

export type BoardMetricsContext = {
    layoutSize: { width: number; height: number };
    state: BoardState;
    theme: BoardThemeValue;
}