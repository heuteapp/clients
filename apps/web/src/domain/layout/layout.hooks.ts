import { useContext, useEffect, useState } from "react"

import { HeuteLayoutContext } from "./layout.context";
import type { LayoutAnalyze } from "./layout.utils";

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
    }

    const [cellSize, setCellSize] = useState({
        full: 0,
        inner: 0
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
            )

            const inner = Math.min(
                (clientWidth - ((sectionCount.horizontal + 4) * padding * 2)) / columnCount,
                (clientHeight - ((sectionCount.vertical + 4) * padding * 2)) / rowCount
            )

            setCellSize(prev =>
                prev.full === full && prev.inner === inner
                ? prev
                : { full, inner }
            )
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [columnCount, rowCount, analyze, padding])

  return {
    cellCount,
    cellSize
  }
}



export interface LayoutMeasurements {
    cellCount: {
        horizontal: number,
        vertical: number
    }
    cellSize: {
        full: number,
        inner: number
    }
}

export interface LayoutMeasurementsParams {
    containerRef: React.RefObject<HTMLDivElement | null>
    columnCount: number
    rowCount: number
    analyze: LayoutAnalyze
    padding: number
}