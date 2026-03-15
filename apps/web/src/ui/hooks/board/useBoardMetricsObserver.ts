import { useEffect } from "react"
import { updateBoardMetrics } from "@/src/ui/metrics/domain/board/update";
import { BoardContextValue } from "../../types/board/board.context";

export function useBoardMetricsObserver(
    context: BoardContextValue) 
{
    const { rootRef, registry, contentManager, themeManager, metricsManager } = context;

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