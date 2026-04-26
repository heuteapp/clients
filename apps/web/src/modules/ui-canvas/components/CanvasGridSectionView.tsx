import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasGridSectionViewProps } from "../types/props.types";
import { CanvasGridItemView } from "./CanvasGridItemView";

//

export function CanvasGridSectionView({ ref, state, className, render, slot }: CanvasGridSectionViewProps) {
    const viewKey = "canvas-grid-section";
    const viewClassName = className?.[viewKey];
    const viewRender = render?.[viewKey];

    return (
        <div
            ref={ref}
            className={clsx(style.gridSection, ...(viewClassName || []))}
            style={{
                gridArea: state.areaName
            }}
        >
            {slot?.render ? slot.render(state) : viewRender ? viewRender(state) : state.item && <CanvasGridItemView state={state.item} />}
        </div>        
    )
}