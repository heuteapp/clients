import { calculateBoardMetrics } from "@/src/ui/dom/calculations/board/board-metrics";
import { applyBoardMetricsToDOM } from "./applyBoardMetricsToDOM";
import { BoardMetrics } from "@/src/ui/types/board/board.metrics";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";

export function updateBoardMetrics(registry: BoardRegistry, metrics: BoardMetrics) {
    const metricsValue = calculateBoardMetrics(registry);

    if (!metricsValue) return null;

    metrics.current = metricsValue;
    applyBoardMetricsToDOM({ registry, metrics: metricsValue });
}