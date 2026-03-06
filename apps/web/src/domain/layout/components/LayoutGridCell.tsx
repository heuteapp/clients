import { useContext } from "react"
import style from "../layout.module.css"

import { HeuteLayoutContext } from "../layout.context";

function LayoutGridCell(props : LayoutGridCellProps) {
    const context = useContext(HeuteLayoutContext);

    const { measurements } = context!;

    return (
        <div className={style.cell} style={{
            width: measurements.cellSize.compact,
            height: measurements.cellSize.compact,
        }}/>
    )
}

export default LayoutGridCell


interface LayoutGridCellProps {

}

export type { LayoutGridCellProps }