import { useEffect, useRef, useState } from "react"
import { LayoutRegistry, LayoutSectionNode, LayoutGridNode, LayoutCellNode } from "../board/board.registry"
import { LayoutMeasurements } from "./types/layout.dom.types"
import { LayoutSectionData } from "./types/layout.data.types"
import { calculateSectionCount } from "./layout.utils"

export function useLayoutRegistry(): LayoutRegistry {
  const registryRef = useRef<LayoutRegistry | null>(null)

  if (!registryRef.current) {
    const sections = new Map<string, LayoutSectionNode>()

    registryRef.current = {
      measurements: null,
      root: null,
      container: null,
      sections,

      registerRoot(ref, props) {
        this.root = { ref, props }
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