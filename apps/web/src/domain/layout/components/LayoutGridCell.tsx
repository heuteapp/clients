import style from "../layout.module.css"

import { useLayoutContext } from "../layout.hooks";
import { useLayoutEffect, useRef } from "react";

function LayoutGridCell(props : LayoutGridCellProps) {
    const context = useLayoutContext();

    const { registry, measurements } = context!;
    const id = props.rowIndex + "-" + props.colIndex;

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        registry.registerGrid(id, ref)

        return () => {
        registry.unregisterGrid(id)
        }
    }, [id, registry])

    return (
        <div className={style.cell} style={{
            width: measurements.cellSize.compact,
            height: measurements.cellSize.compact,
        }}/>
    )
}

export default LayoutGridCell


interface LayoutGridCellProps {
    rowIndex: number,
    colIndex: number,
}

export type { LayoutGridCellProps }