import style from "@/src/modules/ui-layout/styles/layout.module.scss"

import { useLayoutEffect, useRef } from "react";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import { LayoutGridProps } from "@/src/modules/ui-layout/types/layout.props";
import { getCanvasGridDataSet } from "../utils/ui.utils";

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

    const data = registry.getLayoutSection(props.sectionId)?.props?.data;

    return (
        <div 
            data-layout-grid
            ref={ref} className={style.grid} style={{
                gridTemplateColumns: `repeat(${props.colSpan}, var(--grid-cell-size))`,
                gridTemplateRows: `repeat(${props.rowSpan}, var(--grid-cell-size))`,
            }}
            {...getCanvasGridDataSet(data ?? null)}
        />
    )
}

export default LayoutGrid