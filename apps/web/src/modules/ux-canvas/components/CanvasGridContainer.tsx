import { useRef } from "react";
import { CanvasGridContainerProps } from "../types/canvas.props";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";
import { CanvasGridContainerView } from "../../ui-canvas/components/CanvasGridContainerView";
import { CanvasGridSection } from "./CanvasGridSection";

export function CanvasGridContainer({ rowCount, colCount, gridSources }: CanvasGridContainerProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <TracedUniqueItem
            type="canvas-grid-container"
            ref={ref}
        >
            <CanvasGridContainerView 
                state={{
                    dimensions: {
                        rowCount,
                        colCount
                    }
                }}
                ref={ref}
            >
                {gridSources.map(s => (
                    <CanvasGridSection key={s.name} src={s} />
                ))}
            </CanvasGridContainerView>
        </TracedUniqueItem>
    )
}