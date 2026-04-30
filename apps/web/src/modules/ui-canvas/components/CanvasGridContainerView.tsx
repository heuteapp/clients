import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { useMemo } from "react";
import { CanvasGridSectionView } from "./CanvasGridSectionView";
import { canvasView } from "../utils/view.utils";

export const CanvasGridContainerView = canvasView("grid-container", ({ ref, state, impl }) => {
    const matrix = useMemo(() => {
        const result = Array.from({ length: state.dimensions.rowCount }, () =>
            Array.from({ length: state.dimensions.colCount }, () => ".")
        );

        state.items.forEach(s => {
            const { rowIndex, colIndex, rowSpan, colSpan } = s.position;

            for (let r = 0; r < rowSpan; r++) {
                for (let c = 0; c < colSpan; c++) {
                    result[rowIndex - 1 + r][colIndex - 1 + c] = s.areaName;
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
            className={impl.className(style.gridContainer)}
            style={impl.style({
                gridTemplateColumns: `repeat(${state.dimensions.colCount}, var(--canvas-cell-size))`,
                gridTemplateRows: `repeat(${state.dimensions.rowCount}, var(--canvas-cell-size))`,
                gridTemplateAreas
            })}
        > 
            {impl.content(() => (
                state.items.map(item => (
                    <CanvasGridSectionView { ...
                        impl.pass<"grid-section">({ 
                            key: item.areaName,
                            state: { item }
                        })
                    } />
                ))
            ))}
        </div>       
    )
});