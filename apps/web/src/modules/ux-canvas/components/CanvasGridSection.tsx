import { useRef } from "react"

import { CanvasGridSectionProps } from "@/src/modules/ux-canvas/types/canvas.props";
import { TracedItem } from "../../t-core/components/TracedItem";
import { CanvasGridItem } from "./CanvasGridItem";
import { CanvasGridSectionView } from "../../ui-canvas/components/CanvasGridSectionView";

//

export function CanvasGridSection({ src, slot }: CanvasGridSectionProps) {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <TracedItem
            type={"canvas-grid-section"}
            data={src}
            id={src.name}
            ref={ref}
        >
            <CanvasGridSectionView 
                ref={ref} 
                state={{
                    data: src
                }} 
                slot={{
                    ...slot,
                    render: {
                        "canvas-grid-item": (state) => <CanvasGridItem src={state.data} />
                    }
                }}
            />
        </TracedItem>
    )
}