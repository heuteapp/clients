import style from "../layout.module.css"

import { useLayoutEffect, useRef } from "react";
import { useBoardContext } from "../../board/board.hooks";

function LayoutGridCell(props : LayoutGridCellProps) {
    const context = useBoardContext();

    const { layoutRegistry } = context!;
    const id = props.rowIndex + "-" + props.colIndex;

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        layoutRegistry.registerCell(props.sectionId, id, ref, props)

        return () => {
            layoutRegistry.unregisterCell(props.sectionId, id)
        }
    }, [id, layoutRegistry])

    return (
        <div className={style.cell} style={{
            width: layoutRegistry.measurements!.cellSize.compact,
            height: layoutRegistry.measurements!.cellSize.compact,
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