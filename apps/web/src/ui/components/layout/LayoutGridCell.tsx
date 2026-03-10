import style from "@/src/ui/styles/layout.module.css"

import { useLayoutEffect, useRef } from "react";
import { useBoardContext } from "@/src/ui/hooks/board";
import { LayoutGridCellProps } from "@/src/ui/types/layout/layout.props";
import { ClientId, Identifier } from "@/src/core/types/shared/data";

function LayoutGridCell(props : LayoutGridCellProps) {
    const context = useBoardContext();

    const { registry } = context!;
    const id : Identifier = {
        client: `${props.rowIndex}-${props.colIndex}` as ClientId,
        server: null
    };

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