import { useEffect, useRef, useState } from "react"
import { LayoutMeasurements, LayoutMeasurementsParams } from "../types/layout/dom"
import { calculateSectionCount } from "../calculations/layout/section-count"
import { calculateCellSize } from "../calculations/layout/cell-size";
import { calculateContainerSize } from "../calculations/layout/container-size";

export function useLayoutMeasurements({ layoutRef, gridDimensions, sections, padding }: LayoutMeasurementsParams) : LayoutMeasurements {
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
        const element = layoutRef.current
        if (!element) return

        const observer = new ResizeObserver(() => {
            const { clientWidth, clientHeight } = element

            const cellSize = calculateCellSize(clientWidth, clientHeight, measurements.cellCount, padding);
            measurementsRef.current.cellSize = cellSize;

            const gridSize = {
                maxWidth: measurements.cellCount.horizontal * cellSize.inner,
                maxHeight: measurements.cellCount.vertical * cellSize.inner
            }
            
            measurementsRef.current.gridSize = gridSize;
            
            const containerSize = calculateContainerSize(measurements.cellCount, cellSize.full);
            measurementsRef.current.containerSize = containerSize;
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [measurements.cellCount, measurements.sectionCount, padding])

  return measurements
}