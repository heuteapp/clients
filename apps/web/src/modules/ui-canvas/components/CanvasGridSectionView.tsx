import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasGridSectionViewProps } from "../types/props.types";
import { CanvasGridItemView } from "./CanvasGridItemView";
import { getPort } from "../../ui-base/utils/view.utils";

//

export function CanvasGridSectionView({ ref, state, port, slot }: CanvasGridSectionViewProps) {
    return (
        <div
            ref={ref}
            className={clsx(style.gridSection, ...(port.className?.["&"] || []))}
            style={{
                gridArea: state.areaName
            }}
        >
            {slot?.render ? slot.render(state) : port.render?.["&"] ? port.render["&"](state) : state.item && <CanvasGridItemView state={state.item} port={getPort(port, "canvas-grid-item")} />}
        </div>        
    )
}