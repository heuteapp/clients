import style from "@/src/ui/styles/layout.module.css"

import { useLayoutEffect, useRef } from "react";
import { useBoardContext } from "@/src/ui/hooks/board";
import { LayoutGridCellProps } from "@/src/ui/types/layout/layout.props";

function LayoutGridCell(props : LayoutGridCellProps) {
    const context = useBoardContext();

    const { registry } = context!;
    const id = props.rowIndex + "-" + props.colIndex;

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        registry.registerLayoutGridCell(props.sectionId, id, ref, props)

        return () => {
            registry.unregisterLayoutGridCell(props.sectionId, id)
        }
    }, [id, registry])

    return (
        <div className={style.cell} style={{
            width: "var(--cell-size-inner)",
            height: "var(--cell-size-inner)",
            visibility: "hidden"
        }}/>
    )
}

export default LayoutGridCell