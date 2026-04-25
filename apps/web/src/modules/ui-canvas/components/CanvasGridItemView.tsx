import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import { CanvasGridItemViewProps } from "../types/props.types";

export function CanvasGridItemView({ ref, state, render } : CanvasGridItemViewProps) {
    return (
        <div
            ref={ref} className={style.gridItem} style={{
                gridTemplateColumns: `repeat(${state.colSpan}, var(--grid-cell-size))`,
                gridTemplateRows: `repeat(${state.rowSpan}, var(--grid-cell-size))`,
            }}
        >
            {render ? render(state) : null}
        </div>
    )
}