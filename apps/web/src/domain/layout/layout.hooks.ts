import { useContext, useEffect, useMemo, useState } from "react"

import { HeuteLayoutContext } from "./layout.context";
import { LayoutAnalyze, LayoutMeasurements } from "./layout.types";
import { LayoutRegistry, LayoutSectionNode } from "./layout.registry";

//

export function useLayoutContext() {
    const ctx = useContext(HeuteLayoutContext)

    if (!ctx) {
        throw new Error("useHeuteLayout must be used inside HeuteLayout")
    }

    return ctx
}

export function useLayoutRegistry(): LayoutRegistry {
    return useMemo<LayoutRegistry>(() => {
        const sections = new Map<string, LayoutSectionNode>()

        return {
            container: null,
            sections,

            registerContainer(node) {
                this.container = node
            },

            unregisterContainer() {
                this.container = null
            },

            registerSection(id, ref, props) {
                sections.set(id, {
                id,
                ref,
                props,
                grid: null,
                })
            },

            unregisterSection(id) {
                sections.delete(id)
            },

            registerGrid(sectionId, ref, props) {
                const section = sections.get(sectionId)
                if (!section) return

                section.grid = {
                id: sectionId,
                ref,
                props,
                cells: new Map(),
                }
            },

            unregisterGrid(sectionId) {
                const section = sections.get(sectionId)
                if (!section) return
                section.grid = null
            },

            registerCell(gridId, id, ref, props) {
                for (const section of sections.values()) {
                if (section.grid?.id === gridId) {
                    section.grid.cells.set(id, {
                    id,
                    ref,
                    props,
                    })
                }
                }
            },

            unregisterCell(gridId, id) {
                for (const section of sections.values()) {
                if (section.grid?.id === gridId) {
                    section.grid.cells.delete(id)
                }
                }
            },
        }
    }, [])
}

export function useLayoutMeasurements({ containerRef, columnCount, rowCount, analyze, padding }: LayoutMeasurementsParams) : LayoutMeasurements {

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

            const compact = inner * 0.9;

            const _cellSize =
            {
                full,
                inner,
                compact
            }

            setCellSize(prev =>
                prev.full === _cellSize.full && prev.inner === _cellSize.inner && prev.compact === _cellSize.compact
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