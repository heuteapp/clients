import { LayoutMetricsValue } from "@/src/core/types/domain/layout/layout.metrics"
import { BoardThemeValue } from "./board.theme";
import { BoardContentValue } from "./board.content";

export type BoardMetricsValue = {
    layout: LayoutMetricsValue | null
}

export type BoardMetricsContext = {
    layoutSize: { width: number; height: number };
    content: BoardContentValue;
    theme: BoardThemeValue;
}