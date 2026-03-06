import style from "../layout.module.css"

import { useLayoutContext } from "../layout.hooks";

function LayoutGridCell(props : LayoutGridCellProps) {
    const context = useLayoutContext();

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