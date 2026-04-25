import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { useRef } from "react"

import { CanvasGridSectionProps } from "@/src/modules/ux-canvas/types/canvas.props";
import { TracedItem } from "../../t-core/components/TracedItem";
import CanvasGridItem from "./CanvasGridItem";

//

export function CanvasGridSection({ src }: CanvasGridSectionProps) {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <TracedItem
            type={"canvas-grid-section"}
            data={src}
            id={src.name}
            ref={ref}
        >
            <div
                ref={ref}
                className={style.gridSection}
                style={{
                    gridArea: src.name
                }}
            >
                <CanvasGridItem src={src}/>
            </div>        
        </TracedItem>
    )
}