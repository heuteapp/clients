import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { canvasRootView } from "../utils/view.utils";
import { CanvasGridContainerView } from "./CanvasGridContainerView";

export const CanvasRootView = canvasRootView(({ ref, state, impl }) => (
  <div 
    ref={ref} 
    className={impl.className(style.root)}
    style={impl.style()}
  >
    {impl.content(() => (
      <CanvasGridContainerView 
        state={{ ...state.container }}
      />
    ))}
  </div>
));