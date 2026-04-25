import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasGridSectionViewProps } from "../types/props.types";
import { CanvasGridItemView } from "./CanvasGridItemView";

//

export function CanvasGridSectionView({ ref, state, className, render }: CanvasGridSectionViewProps) {
    return (
        <div
            ref={ref}
            className={clsx(style.gridSection, ...(className?.body || []))}
            style={{
                gridArea: state.areaName
            }}
        >
            {render?.item 
                ? render.item(state) 
                : state.item && <CanvasGridItemView state={state.item} />}
        </div>        
    )
}