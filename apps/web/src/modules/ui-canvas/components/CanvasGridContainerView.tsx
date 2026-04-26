import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasGridContainerViewProps } from "../types/props.types";
import { useMemo } from "react";
import { CanvasGridSectionView } from "./CanvasGridSectionView";

//

export function CanvasGridContainerView({ ref, state, className, sx, render, slot }: CanvasGridContainerViewProps) {
    const matrix = useMemo(() => {
        const result = Array.from({ length: state.rowCount }, () =>
            Array.from({ length: state.colCount }, () => ".")
        );

        state.areas.forEach(s => {
            const { rowIndex, colIndex, rowSpan, colSpan } = s.position;

            for (let r = 0; r < rowSpan; r++) {
                for (let c = 0; c < colSpan; c++) {
                    result[rowIndex - 1 + r][colIndex - 1 + c] = s.areaName;
                }
            }
        });

        return result;
    }, [state.rowCount, state.colCount]);

    const gridTemplateAreas = useMemo(() => {
        return matrix.map(row => `"${row.join(" ")}"`).join(" ");
    }, [matrix]);

    return (  
        <div
            ref={ref}
            className={clsx(style.gridContainer, ...(className?.["&"] || []))}
            style={{
                gridTemplateColumns: `repeat(${state.colCount}, var(--canvas-cell-size))`,
                gridTemplateRows: `repeat(${state.rowCount}, var(--canvas-cell-size))`,
                gridTemplateAreas
            }}
        > 
            {slot?.render ? slot.render(state) : render?.["&"] ? render["&"](state) : state.areas.map(s => <CanvasGridSectionView key={s.areaName} state={s} className={className} sx={sx} render={render} />)}
        </div>       
    )
}