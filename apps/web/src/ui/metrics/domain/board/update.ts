import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardMetricsManager } from "@/src/ui/types/board/board.metrics";
import { applyBoardMetrics } from "./apply";
import { computeBoardMetrics } from "@/src/core/metrics/domain/board.metrics";
import { BoardMetricsContext } from "@/src/core/types/domain/board/board.metrics";
import { BoardContentManager } from "@/src/ui/types/board/board.content";
import { BoardThemeManager } from "@/src/ui/types/board/board.theme";

export function updateBoardMetrics(registry: BoardRegistry, metricsManager: BoardMetricsManager, contentManager: BoardContentManager, themeManager: BoardThemeManager) {
    if(!registry || !metricsManager || !contentManager || !themeManager) return false;
    if(!contentManager.current || !themeManager.current) return false;

    const layout = registry.layout;
    if(!layout) return false;

    const layoutElement = layout.ref.current;
    if (!layoutElement) return false;

    const context : BoardMetricsContext = {
        layoutSize: {
            width: layoutElement.clientWidth,
            height: layoutElement.clientHeight
        },
        content: contentManager.current,
        theme: themeManager.current

    }

    const metricsValue = computeBoardMetrics(context);

    if (!metricsValue) return false;

    applyBoardMetrics({ registry, metrics: metricsValue });
    metricsManager.current = metricsValue;

    return true;
}