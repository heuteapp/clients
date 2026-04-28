import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasGridSectionViewProps } from "../types/props.types";
import { VIEW } from "../../t-core/utils/view.utils";
import { canvasView } from "../utils/view.utils";

export const CanvasGridSectionView = (props : CanvasGridSectionViewProps) => (
    VIEW(canvasView("canvas-grid-section"))
    .RENDER(props, ({ ref, state, slot }) => (
        <div
            ref={ref}
            className={clsx(style.gridSection, ...(slot.className?.["&"] || []))}
            style={{
                gridArea: state.data.name
            }}
        >
            {slot.render?.["&"] ? slot.render["&"]?.(state) : null}
        </div>  
    ))
)