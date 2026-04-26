import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import { CanvasGridItemViewProps } from "../types/props.types";
import clsx from "clsx";

export function CanvasGridItemView({ ref, state, port, slot } : CanvasGridItemViewProps) {
    return (
        <div
            ref={ref} className={clsx(style.gridItem, ...(port.className || []))} style={{
                gridTemplateColumns: `repeat(${state.colSpan}, var(--grid-cell-size))`,
                gridTemplateRows: `repeat(${state.rowSpan}, var(--grid-cell-size))`,
            }}
        >
            {slot?.render ? slot.render(state) : port.render ? port.render(state) : null}
        </div>
    )
}