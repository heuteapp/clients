import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { CanvasGridItemView } from "./CanvasGridItemView";
import { canvasView } from "../utils/view.utils";

export const CanvasGridSectionView = canvasView<"grid-section">(({ ref, state, impl }) => (
    <div
        ref={ref} 
        className={impl.className(style.gridSection)}
        style={impl.style({
            gridArea: state.item.areaName
        })}
    >            
        {impl.content(() => (
            <CanvasGridItemView
                state={{ ...state.item }}
            />
        ))}
    </div>
));