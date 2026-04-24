import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { useRef } from "react"

import { CanvasGridSectionProps } from "@/src/modules/ui-canvas/types/canvas.props";
import { TracedItem } from "../../t-core/components/TracedItem";
import CanvasGridItem from "./CanvasGridItem";

//

export function CanvasGridSection(props : CanvasGridSectionProps) {
    const { data } = props;
    const ref = useRef<HTMLDivElement>(null)

    return (
        <TracedItem
            type={"canvas-grid-section"}
            id={data.name}
            ref={ref}
        >
            <div
                ref={ref}
                className={style.gridSection}
                style={{
                    gridArea: data.name
                }}
            >
                <CanvasGridItem data={data}/>
            </div>        
        </TracedItem>
    )
}