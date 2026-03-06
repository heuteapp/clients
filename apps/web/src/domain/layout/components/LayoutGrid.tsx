import style from "../layout.module.css"

import LayoutGridCell from "./LayoutGridCell";
import { useLayoutContext } from "../layout.hooks";

function LayoutGrid(props : LayoutGridProps) {
    const context = useLayoutContext();

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