import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { canvasView } from "../utils/view.utils";

export const CanvasGridItemView = canvasView("grid-item", ({ ref, state, impl }) => (
    <div
        ref={ref} 
        className={impl.className(style.gridItem)} 
        style={impl.style({
            gridTemplateColumns: `repeat(${state.position.colSpan}, var(--grid-cell-size))`,
            gridTemplateRows: `repeat(${state.position.rowSpan}, var(--grid-cell-size))`,
        })}
    >
        {impl.content()}
    </div>
));