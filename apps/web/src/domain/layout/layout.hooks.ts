import { useContext, useEffect, useState } from "react"

import { HeuteLayoutContext } from "./layout.context";
import { LayoutAnalyze, LayoutMeasurements } from "./layout.types";

//

export function useHeuteLayout() {
    const ctx = useContext(HeuteLayoutContext)

    if (!ctx) {
        throw new Error("useHeuteLayout must be used inside HeuteLayout")
    }

    return ctx
}

export function useLayoutMeasurements({ containerRef, columnCount, rowCount, analyze, padding }: LayoutMeasurementsParams) : LayoutMeasurements {

    const cellCount = {
        horizontal: columnCount,
        vertical: rowCount
    };

    const [cellSize, setCellSize] = useState({
        full: 0,
        inner: 0
    });

    const [containerSize, setContainerSize] = useState({
        width: 0,
        height: 0
    })

    useEffect(() => {
        const element = containerRef.current
        if (!element) return

        const observer = new ResizeObserver(() => {
            const { clientWidth, clientHeight } = element
            const { sectionCount } = analyze;

            const full = Math.min(
                clientWidth / columnCount,
                clientHeight / rowCount
            );

            const inner = Math.min(
                (clientWidth - ((sectionCount.horizontal + 4) * padding * 2)) / columnCount,
                (clientHeight - ((sectionCount.vertical + 4) * padding * 2)) / rowCount
            );

            const _cellSize =
            {
                full,
                inner
            }

            setCellSize(prev =>
                prev.full === _cellSize.full && prev.inner === _cellSize.inner
                ? prev
                : _cellSize
            );

            const _containerSize = 
            {
                width: cellSize.full * cellCount.horizontal,
                height: cellSize.full * cellCount.vertical
            }

            setContainerSize(
                prev => prev.width === _containerSize.width && prev.height === _containerSize.height
                ? prev
                : _containerSize
            );
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [columnCount, rowCount, analyze, padding])

  return {
    cellCount,
    cellSize,
    containerSize
  }
}



export interface LayoutMeasurementsParams {
    containerRef: React.RefObject<HTMLDivElement | null>
    columnCount: number
    rowCount: number
    analyze: LayoutAnalyze
    padding: number
}