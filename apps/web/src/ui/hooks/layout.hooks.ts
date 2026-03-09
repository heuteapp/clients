import { useEffect, useRef } from "react"
import { LayoutMeasurements, LayoutMeasurementsParams } from "@/src/ui/types/layout/dom"
import { calculateSectionCount } from "@/src/ui/calculations/layout/section-count"
import { applyBoardMeasurements } from "@/src/ui/utils/board/applyBoardMeasurements";

export function useLayoutMeasurements({ registry, gridDimensions, sections, padding }: LayoutMeasurementsParams) : LayoutMeasurements {
    const layout = registry.layout;
    const layoutRef = layout.ref!;

    const measurementsRef = useRef<LayoutMeasurements>({
        sectionCount: {
            horizontal: 0,
            vertical: 0
        },
        cellCount: {
            horizontal: 0,
            vertical: 0
        },
        cellSize: {
            full: 0,
            inner: 0,
            compact: 0
        },
        gridSize: {
            maxWidth: 0,
            maxHeight: 0
        },
        containerSize: {
            width: 0,
            height: 0
        }
    });

    const measurements = measurementsRef.current;

    measurements.sectionCount = calculateSectionCount(sections);
    measurements.cellCount = {
        horizontal: gridDimensions.columnCount,
        vertical: gridDimensions.rowCount
    };

    useEffect(() => {
        const element = layoutRef.current;
        if (!element) return

        const observer = new ResizeObserver(() => {
            applyBoardMeasurements({ registry, measurementsRef })
        })

        const mutationObserver = new MutationObserver(() => {
            applyBoardMeasurements({ registry, measurementsRef })
        })

        mutationObserver.observe(element, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [measurements.cellCount, measurements.sectionCount, padding])

  return measurements
}