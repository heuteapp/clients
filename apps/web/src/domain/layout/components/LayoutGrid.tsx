import { useContext } from "react"
import style from "../layout.module.css"

import { HeuteLayoutContext } from "../layout.context";

function LayoutGrid(props : LayoutGridProps) {
    const context = useContext(HeuteLayoutContext);

    const { measurements } = context!;

    return (
        <div className={style.container} style={{
            gridTemplateColumns: `repeat(${props.colSpan}, ${measurements.cellSize.inner}px)`,
            gridTemplateRows: `repeat(${props.rowSpan}, ${measurements.cellSize.inner}px)`,
        }}/>
    )
}

export default LayoutGrid


interface LayoutGridProps  {
    colSpan: number,
    rowSpan: number,
}

export type { LayoutGrid }