import { BoardMetricsValue } from "@/src/ui/types/board/board.metrics";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { calculateLayoutMetrics } from "@/src/ui/metrics/domain/layout/calculate";

export function calculateBoardMetrics(registry: BoardRegistry) : BoardMetricsValue | undefined {
    const layout = calculateLayoutMetrics(registry) ?? null;

    return {
        layout
    };
}
