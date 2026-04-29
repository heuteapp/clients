import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasRootViewProps } from "../types/props.types";
import { CanvasGridContainerView } from "./CanvasGridContainerView";
import { VIEWCONTENT, VIEWROOT } from "../../t-core/utils/view.utils";
import { canvasRootView } from "../utils/view.utils";

export const CanvasRootView = (props : CanvasRootViewProps) => (
    VIEWROOT(canvasRootView, props)
    .CONFIG({})
    .RENDER(({ ref, context, state, slot }) => {
      return (
        <div 
          ref={ref} 
          className={clsx(style.canvas, ...(slot["&"]?.className || []))}
        >
          {VIEWCONTENT(state, () => (
            <CanvasGridContainerView 
              state={{ dimensions: { colCount: state.canvas.colCount, rowCount: state.canvas.rowCount }, grids: state.canvas.grids }}
              context={context}
            />
          ), slot["&"]?.wrapper)}
        </div>
      )
    })
)