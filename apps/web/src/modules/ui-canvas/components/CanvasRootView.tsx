import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasRootViewProps } from "../types/props.types";
import { CanvasGridContainerView } from "./CanvasGridContainerView";

export function CanvasRootView({ ref, state, className, render, slot } : CanvasRootViewProps) {
  const viewClassName = className?.["&"];
  const viewRender = render?.["&"];

  return (
    <div 
      ref={ref} 
      className={clsx(style.canvas, ...(viewClassName || []))}
    >
      {slot?.render ? slot.render(state) : viewRender ? viewRender(state) : state.container && <CanvasGridContainerView state={state.container} />}
    </div>
  )
}