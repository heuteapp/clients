import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { useRef } from "react";
import { CanvasGridContainerProps } from "../types/canvas.props";
import { CanvasGridSection } from "./CanvasGridSection";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";

export function CanvasGridContainer(props : CanvasGridContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { colCount, rowCount, grids } = props;

    const matrix = Array.from({ length: rowCount }, () =>
        Array.from({ length: colCount }, () => ".")
    );

    grids.forEach(s => {
        const { rowIndex, colIndex, rowSpan, colSpan } = s.position;

        for (let r = 0; r < rowSpan; r++) {
            for (let c = 0; c < colSpan; c++) {
                matrix[rowIndex - 1 + r][colIndex - 1 + c] = s.name;
            }
        }
    });

    const gridTemplateAreas = matrix
        .map(row => `"${row.join(" ")}"`)
        .join(" ");

    return (
        <TracedUniqueItem
            type="canvas-grid-container"
            ref={ref}
        >
            <div
                ref={ref}
                className={style.gridContainer}
                style={{
                    gridTemplateColumns: `repeat(${colCount}, var(--canvas-cell-size))`,
                    gridTemplateRows: `repeat(${rowCount}, var(--canvas-cell-size))`,
                    gridTemplateAreas
                }}
            > 
                {grids.map((grid) => (
                    <CanvasGridSection key={grid.name} data={grid}/>
                ))}
            </div>        
        </TracedUniqueItem>
    )
}