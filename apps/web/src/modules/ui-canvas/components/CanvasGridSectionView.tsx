import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasGridSectionViewProps } from "../types/props.types";
import { VIEW, VIEWCONTENT } from "../../t-core/utils/view.utils";
import { canvasView } from "../utils/view.utils";
import { CanvasGridItemView } from "./CanvasGridItemView";

export const CanvasGridSectionView = (props : CanvasGridSectionViewProps) => (
    VIEW(canvasView("canvas-grid-section"), props)
    .RENDER(({ ref, state, context, slot }) => (
        <div
            ref={ref}
            className={clsx(style.gridSection, ...(slot["&"]?.className || []))}
            style={{
                gridArea: state.item.areaName
            }}
        >            
            {VIEWCONTENT(state, () => (
                <CanvasGridItemView 
                    state={{ ...state.item }} 
                    context={context}
                />
            ), slot["&"]?.wrapper)}
        </div>  
    ))
)