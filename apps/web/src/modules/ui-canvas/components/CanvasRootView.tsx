import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { canvasView } from "../utils/view.utils";
import { CanvasGridContainerView } from "./CanvasGridContainerView";

export const CanvasRootView = canvasView<"root">(({ ref, state, impl }) => (
  <div 
    ref={ref} 
    className={impl.className(style.root)}
    style={impl.style()}
  >
    {impl.content(() => (
      <CanvasGridContainerView { ...
        impl.pass<"grid-container">({ state: state.container })
      } />
    ))}
  </div>
));