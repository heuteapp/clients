import style from "../layout.module.css"

import LayoutGridCell from "./LayoutGridCell";
import { useLayoutContext } from "../layout.hooks";
import { useLayoutEffect, useRef } from "react";

function LayoutGrid(props : LayoutGridProps) {
    const context = useLayoutContext();

    const { registry, measurements } = context!;

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        registry.registerGrid(props.sectionId, ref, props)

        return () => {
            registry.unregisterGrid(props.sectionId)
        }
    }, [props.sectionId, registry])

    return (
        <div ref={ref} className={style.grid} style={{
            gridTemplateColumns: `repeat(${props.colSpan}, ${measurements.cellSize.inner}px)`,
            gridTemplateRows: `repeat(${props.rowSpan}, ${measurements.cellSize.inner}px)`,
        }}>
            {
                Array.from({ length: props.rowSpan }).map((_, rowIndex) => (
                    Array.from({ length: props.colSpan }).map((_, colIndex) => (
                        <LayoutGridCell
                            key={rowIndex + "-" + colIndex}
                            sectionId={props.sectionId}
                            rowIndex={rowIndex + 1}
                            colIndex={colIndex + 1}
                        />
                    ))
                ))
            }
        </div>
    )
}

export default LayoutGrid


interface LayoutGridProps  {
    sectionId: string,
    colSpan: number,
    rowSpan: number,
}

export type { LayoutGridProps }