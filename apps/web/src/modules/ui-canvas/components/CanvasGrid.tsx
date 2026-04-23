import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { useLayoutEffect, useRef } from "react";
import { useCanvasContext } from "@/src/modules/ui-canvas/hooks/useCanvasContext";
import { CanvasGridProps } from "@/src/modules/ui-canvas/types/canvas.props";
import { getCanvasGridDataSet } from "../utils/ui.utils";

function CanvasGrid(props : CanvasGridProps) {
    const context = useCanvasContext();

    const { registry } = context!;

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        registry.registerCanvasGrid(props.sectionId, ref, props)

        return () => {
            registry.unregisterCanvasGrid(props.sectionId)
        }
    }, [props.sectionId, registry])

    const data = registry.getCanvasSection(props.sectionId)?.props?.data;

    return (
        <div 
            data-canvas-grid
            ref={ref} className={style.grid} style={{
                gridTemplateColumns: `repeat(${props.colSpan}, var(--grid-cell-size))`,
                gridTemplateRows: `repeat(${props.rowSpan}, var(--grid-cell-size))`,
            }}
            {...getCanvasGridDataSet(data ?? null)}
        />
    )
}

export default CanvasGrid