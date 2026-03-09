import { useEffect, useRef } from "react"
import { BoardMetrics, BoardMetricsParams } from "@/src/ui/types/board/board.dom"
import { calculateSectionsCount } from "@/src/ui/calculations/layout/sections-count"
import { applyBoardMeasurements } from "@/src/ui/utils/board/applyBoardMeasurements";

export function useBoardMetrics({ registry, gridDimensions, sections, padding }: BoardMetricsParams) : BoardMetrics {
    const layout = registry.layout;
    const layoutRef = layout.ref!;

    const measurementsRef = useRef<BoardMetrics>({
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

    const measurements = measurementsRef.current;

    measurements.layoutSectionsCount = calculateSectionsCount(sections);
    measurements.layoutGridCellsCount = {
        horizontal: gridDimensions.columnCount,
        vertical: gridDimensions.rowCount
    };
    console.log(measurements);


    useEffect(() => {
        const element = layoutRef.current;
        if (!element) return

        const observer = new ResizeObserver(() => {
            applyBoardMeasurements({ registry, metricsRef: measurementsRef })
        })

        const mutationObserver = new MutationObserver(() => {
            applyBoardMeasurements({ registry, metricsRef: measurementsRef })
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

  return measurements
}