import { useRef } from "react"
import style from "../layout.module.css"

import { LayoutSectionData } from "../layout.types"

function LayoutSection(props : LayoutSectionProps) {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div
        ref={ref}
        className={style.section}
        style={{
            position: "absolute",
            left: (props.colIndex -1)* props.squareSize.full,
            top: (props.rowIndex -1)* props.squareSize.full,
            width: (props.colSpan * props.squareSize.full) - (props.padding * 2),
            height: (props.rowSpan * props.squareSize.full) - (props.padding * 2),
            padding: props.padding,
        }}
        >
        <div className={style.container} style={{
            gridTemplateColumns: `repeat(${props.colSpan}, ${props.squareSize.inner}px)`,
            gridTemplateRows: `repeat(${props.rowSpan}, ${props.squareSize.inner}px)`,
        }}/>
        </div>
    )
}

export default LayoutSection


interface LayoutSectionProps extends LayoutSectionData {
    padding: number
    squareSize: { full: number, inner: number }
}

export type { LayoutSectionProps }