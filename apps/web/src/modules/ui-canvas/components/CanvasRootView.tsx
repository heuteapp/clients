import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasRootViewProps } from "../types/props.types";
import { CanvasGridContainerView } from "./CanvasGridContainerView";
import { getPort } from "../../ui-base/utils/view.utils";

export function CanvasRootView({ ref, state, port, slot } : CanvasRootViewProps) {
  return (
    <div 
      ref={ref} 
      className={clsx(style.canvas, ...(port.className?.["&"] || []))}
    >
      {slot?.render ? slot.render(state) : port.render?.["&"] ? port.render["&"](state) : state.container && <CanvasGridContainerView state={state.container} port={getPort(port, "canvas-grid-container")} />}
    </div>
  )
}