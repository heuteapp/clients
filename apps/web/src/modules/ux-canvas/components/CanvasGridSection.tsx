import { useRef } from "react"

import { CanvasGridSectionProps } from "@/src/modules/ux-canvas/types/canvas.props";
import { TracedItem } from "../../t-core/components/TracedItem";
import { CanvasGridItem } from "./CanvasGridItem";
import { CanvasGridSectionView } from "../../ui-canvas/components/CanvasGridSectionView";

//

export function CanvasGridSection({ src, className, sx }: CanvasGridSectionProps) {
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
                    areaName: src.name,
                    position: src.position,
                }} 
                className={className} 
                sx={sx}
                render={() => <CanvasGridItem src={src} />}
            />
        </TracedItem>
    )
}