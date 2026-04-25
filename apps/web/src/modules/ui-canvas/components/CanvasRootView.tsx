import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasRootViewProps } from "../types/props.types";
import { CanvasGridContainerView } from "./CanvasGridContainerView";

export function CanvasRootView({ ref, state, className, render } : CanvasRootViewProps) {
  const viewClassName = className?.["canvas-root"];
  const viewRender = render?.["canvas-root"];

  return (
    <div 
      ref={ref} 
      className={clsx(style.canvas, ...(viewClassName || []))}
    >
      {viewRender ? viewRender(state) : state.container && <CanvasGridContainerView state={state.container} />}
    </div>
  )
}