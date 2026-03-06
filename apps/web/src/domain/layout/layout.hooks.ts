import { useContext, useEffect, useState } from "react"

import { HeuteLayoutContext } from "./layout.context";
import { HeuteLayoutAnalyze } from "./layout.types";

//

export function useHeuteLayout() {
    const ctx = useContext(HeuteLayoutContext)

    if (!ctx) {
        throw new Error("useHeuteLayout must be used inside HeuteLayout")
    }

    return ctx
}
export function useLayoutSize({ containerRef, columnCount, rowCount, analyze, padding }: UseLayoutSizeParams) {

    const [squareSize, setSquareSize] = useState({
        full: 0,
        inner: 0
    })

    useEffect(() => {
        const element = containerRef.current
        if (!element) return

        const observer = new ResizeObserver(() => {
        const { clientWidth, clientHeight } = element

        const full = Math.min(
            clientWidth / columnCount,
            clientHeight / rowCount
        )

        const inner = Math.min(
            (clientWidth - ((analyze.maxHorizontal + 4) * padding * 2)) / columnCount,
            (clientHeight - ((analyze.maxVertical + 4) * padding * 2)) / rowCount
        )

        setSquareSize(prev =>
            prev.full === full && prev.inner === inner
            ? prev
            : { full, inner }
        )
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [columnCount, rowCount, analyze, padding])

  return squareSize
}

interface UseLayoutSizeParams {
    containerRef: React.RefObject<HTMLDivElement | null>
    columnCount: number
    rowCount: number
    analyze: HeuteLayoutAnalyze
    padding: number
}