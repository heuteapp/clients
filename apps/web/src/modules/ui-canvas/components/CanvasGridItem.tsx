import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { useLayoutEffect, useRef } from "react";
import { useCanvasContext } from "@/src/modules/ui-canvas/hooks/useCanvasContext";
import { CanvasGridItemProps } from "@/src/modules/ui-canvas/types/canvas.props";
import { getCanvasGridDataSet } from "../utils/ui.utils";

function CanvasGridItem(props : CanvasGridItemProps) {
    const { data } = props;

    const context = useCanvasContext();

    const { registry } = context!;

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        registry.registerCanvasGridItem(data.name, ref, props)

        return () => {
            registry.unregisterCanvasGridItem(data.name)
        }
    }, [data.name, registry])

    return (
        <div 
            data-canvas-grid
            ref={ref} className={style.gridItem} style={{
                gridTemplateColumns: `repeat(${data.position.colSpan}, var(--grid-cell-size))`,
                gridTemplateRows: `repeat(${data.position.rowSpan}, var(--grid-cell-size))`,
            }}
            {...getCanvasGridDataSet(data)}
        />
    )
}

export default CanvasGridItem