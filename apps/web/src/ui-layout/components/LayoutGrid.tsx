import style from "@/src/ui/styles/layout.module.css"

import { useLayoutEffect, useRef } from "react";
import { useLayoutContext } from "@/src/ui-layout/hooks/useLayoutContext";
import { LayoutGridProps } from "@/src/ui-layout/types/layout.props";

function LayoutGrid(props : LayoutGridProps) {
    const context = useLayoutContext();

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

export default LayoutGrid