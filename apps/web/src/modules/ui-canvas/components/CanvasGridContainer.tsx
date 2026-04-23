import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { useRef } from "react";
import { CanvasGridContainerProps } from "../types/canvas.props";
import { CanvasGridSection } from "./CanvasGridSection";

export function CanvasGridContainer(props : CanvasGridContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { grids } = props;

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