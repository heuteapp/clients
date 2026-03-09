import { useEffect, useRef } from "react"
import { BoardMetrics, BoardMetricsParams } from "@/src/ui/types/board/board.dom"
import { calculateSectionsCount } from "@/src/ui/calculations/layout/sections-count"
import { applyBoardMetricsToDOM } from "@/src/ui/utils/board/applyBoardMetricsToDOM";
import { calculateBoardMetrics } from "../../calculations/board/board-metrics";

export function useBoardMetrics({ registry, gridDimensions, sections, padding }: BoardMetricsParams) : React.RefObject<BoardMetrics> {
    const layout = registry.layout;
    const layoutRef = layout.ref!;

    const metricsRef = useRef<BoardMetrics>({
        layoutSectionsCount: {
            horizontal: 0,
            vertical: 0
        },
        layoutGridCellsCount: {
            horizontal: 0,
            vertical: 0
        },
        layoutGridCellSize: {
            full: 0,
            inner: 0,
            compact: 0
        },
        layoutGridSize: {
            width: 0,
            height: 0
        },
        layoutSectionContainerSize: {
            width: 0,
            height: 0
        }
    });

    const metrics = metricsRef.current;

    metrics.layoutSectionsCount = calculateSectionsCount(sections);
    metrics.layoutGridCellsCount = {
        horizontal: gridDimensions.columnCount,
        vertical: gridDimensions.rowCount
    };
    console.log(metrics);


    useEffect(() => {
        const element = layoutRef.current;
        if (!element) return

        const observer = new ResizeObserver(() => {
            const newMetrics = calculateBoardMetrics(registry);

            if (newMetrics) {
                metricsRef.current = newMetrics;
                applyBoardMetricsToDOM({ registry, metrics: newMetrics })
            }
        })

        const mutationObserver = new MutationObserver(() => {
            const newMetrics = calculateBoardMetrics(registry);

            if (newMetrics) {
                metricsRef.current = newMetrics;
                applyBoardMetricsToDOM({ registry, metrics: newMetrics })
            }        
        })

        mutationObserver.observe(element, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [registry, gridDimensions, sections, padding])

  return metricsRef;
}