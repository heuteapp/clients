import style from "@/src/modules/ui-layout/styles/layout.module.css"

import { useLayoutEffect, useRef } from "react";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { LayoutGridProps } from "@/src/modules/ui-layout/types/layout.props";

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
        <div 
            data-layout-section-grid
            data-layout-grid-section-id={props.sectionId}
            data-layout-grid-colspan={props.colSpan}
            data-layout-grid-rowspan={props.rowSpan}
            ref={ref} className={style.grid} style={{
                gridTemplateColumns: `repeat(${props.colSpan}, var(--grid-cell-size))`,
                gridTemplateRows: `repeat(${props.rowSpan}, var(--grid-cell-size))`,
            }}
        />
    )
}

export default LayoutGrid