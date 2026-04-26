import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasRootViewProps } from "../types/props.types";
import { CanvasGridContainerView } from "./CanvasGridContainerView";
import { getPort, VIEW } from "../../ui-base/utils/view.utils";
import { canvasView } from "../utils/view.utils";

export const CanvasRootView = (props : CanvasRootViewProps) => (
    VIEW(canvasView("canvas-root"))
    .RENDER(props, ({ ref, state, x, y }) => (
      <div 
        ref={ref} 
        className={clsx(style.canvas, ...(x.className?.["&"] || []))}
      >
        {y.render?.["canvas-grid-container"]?.["&"] ? y.render["canvas-grid-container"]["&"](state) 
          : state.container && <CanvasGridContainerView state={state.container} port={props.port} />}
      </div>
    ))
)