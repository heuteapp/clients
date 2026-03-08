import { useEffect, useState } from "react"
import { LayoutMeasurements } from "./types/dom"
import { LayoutSectionData } from "./types/data"
import { calculateSectionCount } from "./calculations/section-count"
import { calculateCellSize } from "./calculations/cell-size";
import { calculateContainerSize } from "./calculations/container-size";

export function useLayoutMeasurements({ layoutRef, columnCount, rowCount, sections, padding }: LayoutMeasurementsParams) : LayoutMeasurements {

    const sectionCount = calculateSectionCount(sections);

    const cellCount = {
        horizontal: columnCount,
        vertical: rowCount
    };

    const [cellSize, setCellSize] = useState({
        full: 0,
        inner: 0,
        compact: 0
    });

    const [containerSize, setContainerSize] = useState({
        width: 0,
        height: 0
    })

    useEffect(() => {
        const element = layoutRef.current
        if (!element) return

        const observer = new ResizeObserver(() => {
            const { clientWidth, clientHeight } = element

            const _cellSize = calculateCellSize(clientWidth, clientHeight, columnCount, rowCount, padding);
            setCellSize(prev =>
                prev.full === _cellSize.full && prev.inner === _cellSize.inner && prev.compact === _cellSize.compact
                ? prev : _cellSize
            );
            
            const _containerSize = calculateContainerSize(cellCount, _cellSize.full);
            setContainerSize(
                prev => prev.width === _containerSize.width && prev.height === _containerSize.height
                ? prev : _containerSize
            );
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [columnCount, rowCount, sectionCount, padding])

  return {
    sectionCount,
    cellCount,
    cellSize,
    containerSize
  }
}



export interface LayoutMeasurementsParams {
    layoutRef: React.RefObject<HTMLDivElement | null>
    columnCount: number
    rowCount: number
    sections: LayoutSectionData[]
    padding: number
}