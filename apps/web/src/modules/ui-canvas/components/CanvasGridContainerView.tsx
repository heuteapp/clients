import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"
import clsx from "clsx";

import { CanvasGridContainerViewProps } from "../types/props.types";
import { useMemo } from "react";
import { CanvasGridSectionView } from "./CanvasGridSectionView";
import { VIEW, VIEWCONTENT } from "../../t-core/utils/view.utils";
import { canvasView } from "../utils/view.utils";

//

export const CanvasGridContainerView = (props : CanvasGridContainerViewProps) => (
    VIEW(canvasView("canvas-grid-container"), props)
    .RENDER(({ ref, state, context, slot }) => {
        const matrix = useMemo(() => {
            const result = Array.from({ length: state.dimensions.rowCount }, () =>
                Array.from({ length: state.dimensions.colCount }, () => ".")
            );

            state.grids.forEach(s => {
                const { rowIndex, colIndex, rowSpan, colSpan } = s.position;

                for (let r = 0; r < rowSpan; r++) {
                    for (let c = 0; c < colSpan; c++) {
                        result[rowIndex - 1 + r][colIndex - 1 + c] = s.name;
                    }
                }
            });

            return result;
        }, [state.dimensions.rowCount, state.dimensions.colCount]);

        const gridTemplateAreas = useMemo(() => {
            return matrix.map(row => `"${row.join(" ")}"`).join(" ");
        }, [matrix]);

        return (  
            <div
                ref={ref}
                className={clsx(style.gridContainer, ...(slot["&"]?.className || []))}
                style={{
                    gridTemplateColumns: `repeat(${state.dimensions.colCount}, var(--canvas-cell-size))`,
                    gridTemplateRows: `repeat(${state.dimensions.rowCount}, var(--canvas-cell-size))`,
                    gridTemplateAreas
                }}
            > 
                {VIEWCONTENT(state, () => (
                    state.grids.map(s => (
                        <CanvasGridSectionView 
                            key={s.name} 
                            state={{ data: s }} 
                            context={context}
                        />
                    ))
                ), slot["&"]?.wrapper)}
            </div>       
        )
    })
)