import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { useRef } from "react";
import { CanvasGridItemProps } from "@/src/modules/ux-canvas/types/canvas.props";
import { TracedItem } from "../../t-core/components/TracedItem";

function CanvasGridItem({ src } : CanvasGridItemProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <TracedItem
            type={"canvas-grid-item"}
            id={src.name}
            data={src}
            ref={ref}
        >
            <div
                ref={ref} className={style.gridItem} style={{
                    gridTemplateColumns: `repeat(${src.position.colSpan}, var(--grid-cell-size))`,
                    gridTemplateRows: `repeat(${src.position.rowSpan}, var(--grid-cell-size))`,
                }}
            />        
        </TracedItem>
    )
}

export default CanvasGridItem