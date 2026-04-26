import { useRef } from "react";
import { CanvasGridContainerProps } from "../types/canvas.props";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";
import { CanvasGridContainerView } from "../../ui-canvas/components/CanvasGridContainerView";
import { CanvasGridSection } from "./CanvasGridSection";

export function CanvasGridContainer({ colCount, rowCount, gridSources, slot }: CanvasGridContainerProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <TracedUniqueItem
            type="canvas-grid-container"
            ref={ref}
        >
            <CanvasGridContainerView 
                ref={ref}
                state={{
                    dimensions: { colCount, rowCount },
                    grids: gridSources
                }}
                slot={{
                    ...slot,
                    render: {
                        "&": (state) => {
                            return state.grids.map(s => (
                                <CanvasGridSection key={s.name} src={s} />
                            ))
                        }
                    }
                }}
            />
        </TracedUniqueItem>
    )
}