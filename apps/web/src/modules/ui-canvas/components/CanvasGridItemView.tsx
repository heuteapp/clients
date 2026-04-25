import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import { CanvasGridItemViewProps } from "../types/props.types";
import clsx from "clsx";

export function CanvasGridItemView({ ref, state, className, render } : CanvasGridItemViewProps) {
    const viewKey = "canvas-grid-item";
    const viewClassName = className?.[viewKey];
    const viewRender = render?.[viewKey];

    return (
        <div
            ref={ref} className={clsx(style.gridItem, ...(viewClassName || []))} style={{
                gridTemplateColumns: `repeat(${state.colSpan}, var(--grid-cell-size))`,
                gridTemplateRows: `repeat(${state.rowSpan}, var(--grid-cell-size))`,
            }}
        >
            {viewRender ? viewRender(state) : null}
        </div>
    )
}