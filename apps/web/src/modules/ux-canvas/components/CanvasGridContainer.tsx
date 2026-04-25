import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { useMemo, useRef } from "react";
import { CanvasGridContainerProps } from "../types/canvas.props";
import { CanvasGridSection } from "./CanvasGridSection";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";

export function CanvasGridContainer({ colCount, rowCount, gridSources }: CanvasGridContainerProps) {
    const ref = useRef<HTMLDivElement>(null);

    const matrix = useMemo(() => {
        const result = Array.from({ length: rowCount }, () =>
            Array.from({ length: colCount }, () => ".")
        );

        gridSources.forEach(s => {
            const { rowIndex, colIndex, rowSpan, colSpan } = s.position;

            for (let r = 0; r < rowSpan; r++) {
                for (let c = 0; c < colSpan; c++) {
                    result[rowIndex - 1 + r][colIndex - 1 + c] = s.name;
                }
            }
        });

        return result;
    }, [rowCount, colCount]);

    const gridTemplateAreas = useMemo(() => {
        return matrix.map(row => `"${row.join(" ")}"`).join(" ");
    }, [matrix]);

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
                {gridSources.map((grid) => (
                    <CanvasGridSection key={grid.name} src={grid}/>
                ))}
            </div>        
        </TracedUniqueItem>
    )
}