import { useLayoutEffect, useRef } from "react"
import style from "@/src/ui/styles/layout.module.css"

import { LayoutSectionProps } from "../../types/layout/props";
import LayoutGrid from "./LayoutGrid";
import { useBoardContext } from "../../hooks/board.hooks";

function LayoutSection(props : LayoutSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const context = useBoardContext();

    const { registry, measurements } = context!;

    useLayoutEffect(() => {
        registry.registerLayoutSection(props.id, ref, props)

        return () => {
            registry.unregisterLayoutSection(props.id)
        }
    }, [props.id, registry])

    return (
        <div
        ref={ref}
        className={style.section}
        style={{
            position: "absolute",
            left: (props.colIndex -1)* measurements!.cellSize.full,
            top: (props.rowIndex -1)* measurements!.cellSize.full,
            width: (props.colSpan * measurements!.cellSize.full) - (props.padding * 2),
            height: (props.rowSpan * measurements!.cellSize.full) - (props.padding * 2),
            padding: props.padding,
        }}
        >
            <LayoutGrid colSpan={props.colSpan} rowSpan={props.rowSpan} sectionId={props.id} />
        </div>
    )
}

export default LayoutSection