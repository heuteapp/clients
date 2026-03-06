import { useLayoutEffect, useRef } from "react"
import style from "../layout.module.css"

import { LayoutSectionData } from "../layout.types"
import LayoutGrid from "./LayoutGrid";
import { useLayoutContext } from "../layout.hooks";

function LayoutSection(props : LayoutSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const context = useLayoutContext();

    const { registry, measurements } = context!;

    useLayoutEffect(() => {
        registry.registerSection(props.id, ref, props)

        return () => {
        registry.unregisterSection(props.id)
        }
    }, [props.id, registry])

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
            <LayoutGrid colSpan={props.colSpan} rowSpan={props.rowSpan} sectionId={props.id} />
        </div>
    )
}

export default LayoutSection


interface LayoutSectionProps extends LayoutSectionData {
    padding: number
}

export type { LayoutSectionProps }