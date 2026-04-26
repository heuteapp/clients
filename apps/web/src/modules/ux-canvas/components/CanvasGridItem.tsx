import { useRef } from "react";
import { CanvasGridItemProps } from "@/src/modules/ux-canvas/types/canvas.props";
import { TracedItem } from "../../t-core/components/TracedItem";
import { CanvasGridItemView } from "../../ui-canvas/components/CanvasGridItemView";

export function CanvasGridItem({ src, slot }: CanvasGridItemProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <TracedItem
            type={"canvas-grid-item"}
            id={src.name}
            data={src}
            ref={ref}
        >
            <CanvasGridItemView 
                ref={ref} 
                state={{
                    data: src
                }} 
                slot={slot}
            />
        </TracedItem>
    )
}