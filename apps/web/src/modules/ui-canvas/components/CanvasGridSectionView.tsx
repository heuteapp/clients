import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasGridSectionViewProps } from "../types/props.types";
import { VIEW } from "../../ui-base/utils/view.utils";
import { canvasView } from "../utils/view.utils";

export const CanvasGridSectionView = (props : CanvasGridSectionViewProps) => (
    VIEW(canvasView("canvas-grid-section"))
    .RENDER(props, ({ ref, state, x, y }) => (
        <div
            ref={ref}
            className={clsx(style.gridSection, ...(x.className?.["&"] || []))}
            style={{
                gridArea: state.areaName
            }}
        >
            {y.render?.["canvas-grid-item"] ? y.render["canvas-grid-item"]?.(state) : null}
        </div>  
    ))
)