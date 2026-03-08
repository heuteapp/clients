import { useLayoutEffect, useRef } from "react"
import style from "../layout.module.css"

import { LayoutSectionProps } from "../types/props";
import LayoutGrid from "./LayoutGrid";
import { useBoardContext } from "../../board/board.hooks";

function LayoutSection(props : LayoutSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const context = useBoardContext();

    const { layoutRegistry } = context!;

    useLayoutEffect(() => {
        layoutRegistry.registerSection(props.id, ref, props)

        return () => {
            layoutRegistry.unregisterSection(props.id)
        }
    }, [props.id, layoutRegistry])

    return (
        <div
        ref={ref}
        className={style.section}
        style={{
            position: "absolute",
            left: (props.colIndex -1)* layoutRegistry.measurements!.cellSize.full,
            top: (props.rowIndex -1)* layoutRegistry.measurements!.cellSize.full,
            width: (props.colSpan * layoutRegistry.measurements!.cellSize.full) - (props.padding * 2),
            height: (props.rowSpan * layoutRegistry.measurements!.cellSize.full) - (props.padding * 2),
            padding: props.padding,
        }}
        >
            <LayoutGrid colSpan={props.colSpan} rowSpan={props.rowSpan} sectionId={props.id} />
        </div>
    )
}

export default LayoutSection