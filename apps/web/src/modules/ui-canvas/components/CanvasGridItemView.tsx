import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import { CanvasGridItemViewProps } from "../types/props.types";
import clsx from "clsx";
import { VIEW } from "../../ui-base/utils/view.utils";
import { canvasView } from "../utils/view.utils";

export const CanvasGridItemView = (props : CanvasGridItemViewProps) => (
    VIEW(canvasView("canvas-grid-item"))
    .RENDER(props, ({ ref, state, x }) => (
        <div
            ref={ref} className={clsx(style.gridItem, ...(x.className || []))} style={{
                gridTemplateColumns: `repeat(${state.colSpan}, var(--grid-cell-size))`,
                gridTemplateRows: `repeat(${state.rowSpan}, var(--grid-cell-size))`,
            }}
        >
            {x.render ? x.render(state) : null}
        </div>
    ))
)