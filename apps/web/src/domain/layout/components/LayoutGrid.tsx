import style from "../layout.module.css"

import LayoutGridCell from "./LayoutGridCell";
import { useLayoutContext } from "../layout.hooks";
import { useLayoutEffect, useRef } from "react";

function LayoutGrid(props : LayoutGridProps) {
    const context = useLayoutContext();

    const { registry, measurements } = context!;

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        registry.registerCell(props.sectionId, ref)

        return () => {
        registry.unregisterCell(props.sectionId)
        }
    }, [props.sectionId, registry])

    return (
        <div className={style.grid} style={{
            gridTemplateColumns: `repeat(${props.colSpan}, ${measurements.cellSize.inner}px)`,
            gridTemplateRows: `repeat(${props.rowSpan}, ${measurements.cellSize.inner}px)`,
        }}>
            {[...Array(props.colSpan * props.rowSpan)].map((_, index) => (
                <LayoutGridCell key={index} />
            ))}
        </div>
    )
}

export default LayoutGrid


interface LayoutGridProps  {
    sectionId: string,
    colSpan: number,
    rowSpan: number,
}

export type { LayoutGrid }