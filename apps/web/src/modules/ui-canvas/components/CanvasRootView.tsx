import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasRootViewProps } from "../types/props.types";
import { CanvasGridContainerView } from "./CanvasGridContainerView";

export function CanvasRootView({ ref, state, className, render } : CanvasRootViewProps) {
    return (
      <div 
        ref={ref} 
        className={clsx(style.canvas, ...(className || []))}
      >
        {render ? render(state) : state.container && <CanvasGridContainerView state={state.container} />}
      </div>
    )
}