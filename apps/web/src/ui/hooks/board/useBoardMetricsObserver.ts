import { useEffect, useRef } from "react"
import { BoardMetricsManager } from "@/src/ui/types/board/board.metrics"
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { updateBoardMetrics } from "@/src/ui/metrics/domain/board/update";
import { BoardMetricsValue } from "@/src/core/types/domain/board/board.metrics";
import { BoardContentManager } from "../../types/board/board.content";
import { BoardThemeManager } from "../../types/board/board.theme";

export function useBoardMetricsObserver(
    rootRef: React.RefObject<HTMLDivElement | null>,
    registry: BoardRegistry,
    contentManager: BoardContentManager,
    themeManager: BoardThemeManager,
    metricsManager: BoardMetricsManager
)  {
    useEffect(() => {
        const element = rootRef.current;
        if(!element) return;

        const observer = new ResizeObserver(() => {
            updateBoardMetrics(registry, contentManager, themeManager, metricsManager);
        })

        const mutationObserver = new MutationObserver(() => {
            updateBoardMetrics(registry, contentManager, themeManager, metricsManager);    
        })

        mutationObserver.observe(element, {
            childList: true,
            subtree: true,
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [rootRef, registry, contentManager, themeManager, metricsManager])
}