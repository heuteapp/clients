import { calculateBoardMetrics } from "@/src/ui/dom/calculations/board/board-metrics";
import { applyBoardMetricsToDOM } from "./applyBoardMetricsToDOM";
import { BoardMetrics } from "@/src/ui/types/board/board.dom";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";

export function updateBoardMetrics(registry: BoardRegistry, metricsRef: React.RefObject<BoardMetrics | null>) {
    const newMetrics = calculateBoardMetrics(registry);

    if (!newMetrics) return null;

    metricsRef.current = newMetrics;
    applyBoardMetricsToDOM({ registry, metrics: newMetrics });

    return newMetrics;
}