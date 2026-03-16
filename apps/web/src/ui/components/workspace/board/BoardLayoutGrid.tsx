import style from "@/src/ui/styles/layout.module.css"

import { useLayoutEffect, useRef } from "react";
import { useBoardContext } from "@/src/ui/hooks/workspace/useBoardContext";
import { BoardLayoutGridProps } from "@/src/ui/types/domain/board/board.props";

function BoardLayoutGrid(props : BoardLayoutGridProps) {
    const context = useBoardContext();

    const { registry } = context!;

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        registry.registerLayoutGrid(props.sectionId, ref, props)

        return () => {
            registry.unregisterLayoutGrid(props.sectionId)
        }
    }, [props.sectionId, registry])

    return (
        <div ref={ref} className={style.grid} style={{
            gridTemplateColumns: `repeat(${props.colSpan}, var(--cell-size-inner))`,
            gridTemplateRows: `repeat(${props.rowSpan}, var(--cell-size-inner))`,
        }}/>
    )
}

export default BoardLayoutGrid