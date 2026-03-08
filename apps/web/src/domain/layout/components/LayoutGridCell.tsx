import style from "../layout.module.css"

import { useLayoutContext } from "../layout.hooks";
import { useLayoutEffect, useRef } from "react";

function LayoutGridCell(props : LayoutGridCellProps) {
    const context = useLayoutContext();

    const { registry, measurements } = context!;
    const id = props.rowIndex + "-" + props.colIndex;

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        registry.registerCell(props.sectionId, id, ref, props)

        return () => {
            registry.unregisterCell(props.sectionId, id)
        }
    }, [id, registry])

    return (
        <div className={style.cell} style={{
            width: measurements.cellSize.compact,
            height: measurements.cellSize.compact,
            visibility: "hidden"
        }}/>
    )
}

export default LayoutGridCell


interface LayoutGridCellProps {
    sectionId: string,
    rowIndex: number,
    colIndex: number,
}

export type { LayoutGridCellProps }