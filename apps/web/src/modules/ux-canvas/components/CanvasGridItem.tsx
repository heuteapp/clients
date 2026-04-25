import { useRef } from "react";
import { CanvasGridItemProps } from "@/src/modules/ux-canvas/types/canvas.props";
import { TracedItem } from "../../t-core/components/TracedItem";
import { CanvasGridItemView } from "../../ui-canvas/components/CanvasGridItemView";

function CanvasGridItem({ src } : CanvasGridItemProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <TracedItem
            type={"canvas-grid-item"}
            id={src.name}
            data={src}
            ref={ref}
        >
            <CanvasGridItemView ref={ref} state={{
                colSpan: src.position.colSpan,
                rowSpan: src.position.rowSpan,
                showCells: false
            }} />
        </TracedItem>
    )
}

export default CanvasGridItem