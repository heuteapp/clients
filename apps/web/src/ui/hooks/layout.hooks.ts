import { useEffect, useState } from "react"
import { LayoutMeasurements, LayoutMeasurementsParams } from "../types/layout/dom"
import { calculateSectionCount } from "../calculations/layout/section-count"
import { calculateCellSize } from "../calculations/layout/cell-size";
import { calculateContainerSize } from "../calculations/layout/container-size";

export function useLayoutMeasurements({ layoutRef, gridDimensions, sections, padding }: LayoutMeasurementsParams) : LayoutMeasurements {

    const sectionCount = calculateSectionCount(sections);

    const cellCount = {
        horizontal: gridDimensions.columnCount,
        vertical: gridDimensions.rowCount
    };

    const [cellSize, setCellSize] = useState({
        full: 0,
        inner: 0,
        compact: 0
    });

    const [gridSize, setGridSize] = useState({
        maxWidth: 0,
        maxHeight: 0
    })

    const [containerSize, setContainerSize] = useState({
        width: 0,
        height: 0
    })

    console.log(gridDimensions, cellCount, gridSize);

    useEffect(() => {
        const element = layoutRef.current
        if (!element) return

        const observer = new ResizeObserver(() => {
            const { clientWidth, clientHeight } = element

            const _cellSize = calculateCellSize(clientWidth, clientHeight, cellCount, padding);
            setCellSize(prev =>
                prev.full === _cellSize.full && prev.inner === _cellSize.inner && prev.compact === _cellSize.compact
                ? prev : _cellSize
            );

            const _gridSize = {
                maxWidth: cellCount.horizontal * _cellSize.inner,
                maxHeight: cellCount.vertical * _cellSize.inner
            }
            setGridSize(prev => 
                prev.maxWidth === _gridSize.maxWidth && prev.maxHeight === _gridSize.maxHeight
                ? prev : _gridSize
            );
            
            const _containerSize = calculateContainerSize(cellCount, _cellSize.full);
            setContainerSize(
                prev => prev.width === _containerSize.width && prev.height === _containerSize.height
                ? prev : _containerSize
            );
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [cellCount, sectionCount, padding])

  return {
    sectionCount,
    cellCount,
    cellSize,
    gridSize,
    containerSize
  }
}