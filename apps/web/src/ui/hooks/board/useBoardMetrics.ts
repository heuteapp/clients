import { useEffect, useRef } from "react"
import { BoardMetrics, BoardMetricsValue } from "@/src/ui/types/board/board.metrics"
import { updateBoardMetrics } from "@/src/ui/dom/sync/board/updateBoardMetrics";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";

export function useBoardMetrics(
    rootRef: React.RefObject<HTMLDivElement | null>,
    registry: BoardRegistry,
) : BoardMetrics {

    const metrics = useRef<BoardMetricsValue>({
        layout: {
            sectionsCount: {
                horizontal: 0,
                vertical: 0
            },
            gridCellsCount: {
                horizontal: 0,
                vertical: 0
            },
            sectionContainerSize: {
                width: 0,
                height: 0
            },
            gridSize: {
                width: 0,
                height: 0
            },
            gridCellSize: {
                full: 0,
                inner: 0,
                compact: 0
            }
        }
    });

    useEffect(() => {
        const element = rootRef.current;
        if(!element) return;

        const observer = new ResizeObserver(() => {
            updateBoardMetrics(registry, metrics);
        })

        const mutationObserver = new MutationObserver(() => {
            updateBoardMetrics(registry, metrics);    
        })

        mutationObserver.observe(element, {
            childList: true,
            subtree: true,
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [rootRef, registry])

    return metrics;
}