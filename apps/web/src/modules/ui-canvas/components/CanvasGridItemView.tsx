import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import { CanvasGridItemViewProps } from "../types/props.types";
import clsx from "clsx";
import { VIEW, VIEWCONTENT } from "../../t-core/utils/view.utils";
import { canvasView } from "../utils/view.utils";

export const CanvasGridItemView = (props : CanvasGridItemViewProps) => (
    VIEW(canvasView("canvas-grid-item"), props)
    .RENDER(({ ref, state, slot }) => (
        <div
            ref={ref} className={clsx(style.gridItem, ...(slot.className || []))} style={{
                gridTemplateColumns: `repeat(${state.data.position.colSpan}, var(--grid-cell-size))`,
                gridTemplateRows: `repeat(${state.data.position.rowSpan}, var(--grid-cell-size))`,
            }}
        >
            {VIEWCONTENT(state, null, slot.wrapper)}
        </div>
    ))
)