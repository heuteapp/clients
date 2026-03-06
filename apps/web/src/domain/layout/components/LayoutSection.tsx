import { useContext, useRef } from "react"
import style from "../layout.module.css"

import { LayoutSectionData } from "../layout.types"
import { HeuteLayoutContext } from "../layout.context";

function LayoutSection(props : LayoutSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const context = useContext(HeuteLayoutContext);

    const { measurements } = context!;

    return (
        <div
        ref={ref}
        className={style.section}
        style={{
            position: "absolute",
            left: (props.colIndex -1)* measurements.cellSize.full,
            top: (props.rowIndex -1)* measurements.cellSize.full,
            width: (props.colSpan * measurements.cellSize.full) - (props.padding * 2),
            height: (props.rowSpan * measurements.cellSize.full) - (props.padding * 2),
            padding: props.padding,
        }}
        >
            <div className={style.container} style={{
                gridTemplateColumns: `repeat(${props.colSpan}, ${measurements.cellSize.inner}px)`,
                gridTemplateRows: `repeat(${props.rowSpan}, ${measurements.cellSize.inner}px)`,
            }}/>
        </div>
    )
}

export default LayoutSection


interface LayoutSectionProps extends LayoutSectionData {
    padding: number
}

export type { LayoutSectionProps }