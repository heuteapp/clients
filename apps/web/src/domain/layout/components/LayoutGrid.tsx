import { useContext } from "react"
import style from "../layout.module.css"

import { HeuteLayoutContext } from "../layout.context";
import LayoutGridCell from "./LayoutGridCell";

function LayoutGrid(props : LayoutGridProps) {
    const context = useContext(HeuteLayoutContext);

    const { measurements } = context!;

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
    colSpan: number,
    rowSpan: number,
}

export type { LayoutGrid }