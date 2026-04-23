import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { useLayoutEffect, useRef } from "react";
import { CanvasGridContainerProps } from "../types/canvas.props";
import { CanvasGridSection } from "./CanvasGridSection";
import { useCanvasContext } from "../hooks/useCanvasContext";

export function CanvasGridContainer(props : CanvasGridContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { grids } = props;

    const context = useCanvasContext();
    const { registry } = context!;

    useLayoutEffect(() => {
        registry.registerCanvasGridContainer(ref, props);

        return () => {
            registry.unregisterCanvasGridContainer()
        }
    }, [registry])

    return (
        <div
            ref={ref}
            className={style.gridContainer}
        > 
        {grids.map((grid) => (
            <CanvasGridSection key={grid.name} data={grid}/>
        ))}
        </div>
    )
}