import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { useRef } from "react";
import { CanvasGridItemProps } from "@/src/modules/ux-canvas/types/canvas.props";
import { TracedItem } from "../../t-core/components/TracedItem";

function CanvasGridItem(props : CanvasGridItemProps) {
    const { data } = props;

    const ref = useRef<HTMLDivElement>(null);

    return (
        <TracedItem
            type={"canvas-grid-item"}
            id={data.name}
            data={data}
            ref={ref}
        >
            <div
                ref={ref} className={style.gridItem} style={{
                    gridTemplateColumns: `repeat(${data.position.colSpan}, var(--grid-cell-size))`,
                    gridTemplateRows: `repeat(${data.position.rowSpan}, var(--grid-cell-size))`,
                }}
            />        
        </TracedItem>
    )
}

export default CanvasGridItem