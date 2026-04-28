import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasRootViewProps } from "../types/props.types";
import { CanvasGridContainerView } from "./CanvasGridContainerView";
import { VIEWROOT } from "../../t-core/utils/view.utils";
import { canvasRootView } from "../utils/view.utils";

export const CanvasRootView = (props : CanvasRootViewProps) => (
    VIEWROOT(canvasRootView(), props)
    .CONFIG({})
    .RENDER(({ ref, state, slot }) => {
      return (
        <div 
          ref={ref} 
          className={clsx(style.canvas, ...(slot.className?.["&"] || []))}
        >
          {slot.render?.["&"] ? slot.render["&"](state) 
            : (
              <CanvasGridContainerView 
                state={{ dimensions: { colCount: state.canvas.colCount, rowCount: state.canvas.rowCount }, grids: state.canvas.grids }}
                context={{}}
                port={props.port} 
              />
            )}
        </div>
      )
    })
)