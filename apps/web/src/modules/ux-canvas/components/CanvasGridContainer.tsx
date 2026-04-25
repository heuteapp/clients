import { useRef } from "react";
import { CanvasGridContainerProps } from "../types/canvas.props";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";
import { CanvasGridContainerView } from "../../ui-canvas/components/CanvasGridContainerView";
import { CanvasGridSection } from "./CanvasGridSection";

export function CanvasGridContainer({ colCount, rowCount, gridSources }: CanvasGridContainerProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <TracedUniqueItem
            type="canvas-grid-container"
            ref={ref}
        >
            <CanvasGridContainerView 
                ref={ref}
                state={{
                    colCount,
                    rowCount,
                    areas: gridSources.map(s => ({
                        areaName: s.name,
                        position: s.position,
                    }))
                }}
                render={() => {
                    return gridSources.map(s => (
                        <CanvasGridSection key={s.name} src={s} />
                    ))
                }}
            />
        </TracedUniqueItem>
    )
}