import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasRootViewProps } from "../types/props.types";
import { CanvasGridContainerView } from "./CanvasGridContainerView";
import { VIEW } from "../../ui-base/utils/view.utils";
import { canvasView } from "../utils/view.utils";

export const CanvasRootView = (props : CanvasRootViewProps) => (
    VIEW(canvasView("canvas-root"))
    .RENDER(props, ({ ref, state, slot }) => {
      return (
        <div 
          ref={ref} 
          className={clsx(style.canvas, ...(slot.className?.["&"] || []))}
        >
          {slot.render?.["&"] ? slot.render["&"](state) 
            : <CanvasGridContainerView state={{ dimensions: { colCount: state.canvas.colCount, rowCount: state.canvas.rowCount }, grids: state.canvas.grids }} port={props.port} />}
        </div>
      )
    })
)