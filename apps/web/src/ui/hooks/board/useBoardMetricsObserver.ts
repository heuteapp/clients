import { useEffect } from "react"
import { updateBoardMetrics } from "@/src/ui/metrics/domain/board/update";
import { useBoardContext } from "./useBoardContext";

export function useBoardMetricsObserver() 
{
    const context = useBoardContext();

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

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        }
    }, [rootRef, registry, contentManager, themeManager, metricsManager])
}