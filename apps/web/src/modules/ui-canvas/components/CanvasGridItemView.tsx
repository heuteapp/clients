import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { useRef } from "react";
import { CanvasGridItemViewProps } from "../types/props.types";

export function CanvasGridItemView({ state } : CanvasGridItemViewProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={ref} className={style.gridItem} style={{
                gridTemplateColumns: `repeat(${state.colSpan}, var(--grid-cell-size))`,
                gridTemplateRows: `repeat(${state.rowSpan}, var(--grid-cell-size))`,
            }}
        />
    )
}