import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { useRef } from "react";
import { CanvasGridContainerProps } from "../types/canvas.props";

export function CanvasGridContainer(props : CanvasGridContainerProps) {
    const ref = useRef<HTMLDivElement>(null);


    return (
        <div
            ref={ref}
            className={style.gridContainer}
        >
            
        </div>
    )
}