import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardMetricsManager } from "@/src/ui/types/board/board.metrics";
import { calculateBoardMetrics } from "./calculate";
import { applyBoardMetrics } from "./apply";

export function updateBoardMetrics(registry: BoardRegistry, metrics: BoardMetricsManager) {
    const metricsValue = calculateBoardMetrics(registry);

    if (!metricsValue) return null;

    metrics.current = metricsValue;
    applyBoardMetrics({ registry, metrics: metricsValue });
}