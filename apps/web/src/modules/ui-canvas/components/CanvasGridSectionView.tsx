import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasGridSectionViewProps } from "../types/props.types";
import { CanvasGridItemView } from "./CanvasGridItemView";

//

export function CanvasGridSectionView({ ref, state, className, render, slot }: CanvasGridSectionViewProps) {
    return (
        <div
            ref={ref}
            className={clsx(style.gridSection, ...(className?.["&"] || []))}
            style={{
                gridArea: state.areaName
            }}
        >
            {slot?.render ? slot.render(state) : render?.["&"] ? render["&"](state) : state.item && <CanvasGridItemView state={state.item} />}
        </div>        
    )
}