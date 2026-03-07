import { useContext, useEffect, useMemo, useRef, useState } from "react"

import { HeuteLayoutContext } from "./layout.context";
import { LayoutAnalyze, LayoutMeasurements } from "./layout.types";
import { LayoutCellNode, LayoutGridNode, LayoutRegistry, LayoutSectionNode } from "./layout.registry";

//

export function useLayoutContext() {
    const ctx = useContext(HeuteLayoutContext)

    if (!ctx) {
        throw new Error("useHeuteLayout must be used inside HeuteLayout")
    }

    return ctx
}

export function useLayoutRegistry(): LayoutRegistry {
  const registryRef = useRef<LayoutRegistry | null>(null)

  if (!registryRef.current) {
    const sections = new Map<string, LayoutSectionNode>()

    registryRef.current = {
      root: null,
      container: null,
      sections,

      registerRoot(ref, props, measurements) {
        this.root = { ref, props, measurements }
      },

      unregisterRoot() {
        this.root = null
      },

      registerContainer(ref) {
        this.container = { ref }
      },

      unregisterContainer() {
        this.container = null
      },

      registerSection(id, ref, props) {
        let section = sections.get(id)

        if (!section) {
          section = { ref, props, grid: null }
          sections.set(id, section)
        } else {
          section.ref = ref
          section.props = props
        }

        return section
      },

      unregisterSection(id) {
        sections.delete(id)
      },

      registerGrid(sectionId, ref, props) {
        let section = sections.get(sectionId)

        if (!section) {
          section = {
            ref: { current: null },
            props: {} as any,
            grid: null,
          }
          sections.set(sectionId, section)
        }

        const grid: LayoutGridNode = {
          ref,
          props,
          cells: section.grid?.cells || new Map(),
        }

        section.grid = grid
        return grid
      },

      unregisterGrid(sectionId) {
        const section = sections.get(sectionId)
        if (section) section.grid = null
      },

      registerCell(sectionId, id, ref, props) {
        let section = sections.get(sectionId)

        if (!section) {
          section = {
            ref: { current: null },
            props: {} as any,
            grid: null,
          }
          sections.set(sectionId, section)
        }

        if (!section.grid) {
          section.grid = {
            ref: { current: null },
            props: {} as any,
            cells: new Map(),
          }
        }

        const cell: LayoutCellNode = { ref, props }
        section.grid.cells.set(id, cell)

        return cell
      },

      unregisterCell(sectionId, id) {
        sections.get(sectionId)?.grid?.cells.delete(id)
      },

      getSection(id) {
        return sections.get(id)
      },

      getGrid(sectionId) {
        return sections.get(sectionId)?.grid || undefined
      },

      getCell(sectionId, id) {
        return sections.get(sectionId)?.grid?.cells.get(id) || undefined
      }
    }
  }

  return registryRef.current
}

export function useLayoutMeasurements({ rootRef, columnCount, rowCount, analyze, padding }: LayoutMeasurementsParams) : LayoutMeasurements {

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
        const element = rootRef.current
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
    rootRef: React.RefObject<HTMLDivElement | null>
    columnCount: number
    rowCount: number
    analyze: LayoutAnalyze
    padding: number
}