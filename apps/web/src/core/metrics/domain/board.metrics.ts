import { BoardMetricsContext, BoardMetricsValue } from "@/src/core/types/domain/board/board.metrics";
import { computeLayoutMetrics } from "./layout.metrics";

export function computeBoardMetrics(context: BoardMetricsContext): BoardMetricsValue | undefined {
    const layout = computeLayoutMetrics(context) ?? null;

    return {
        layout,
    }
}