import style from "@/src/ui/styles/layout.module.css"

import { useLayoutEffect, useRef } from "react";
import { useBoardContext } from "../../hooks/board.hooks";
import { LayoutGridCellProps } from "@/src/ui/types/layout/layout.props";

function LayoutGridCell(props : LayoutGridCellProps) {
    const context = useBoardContext();

    const { registry, measurements } = context!;
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
            width: measurements!.layoutGridCellSize.compact,
            height: measurements!.layoutGridCellSize.compact,
            visibility: "hidden"
        }}/>
    )
}

export default LayoutGridCell