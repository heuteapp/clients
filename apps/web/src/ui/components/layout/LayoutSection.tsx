import { useLayoutEffect, useRef } from "react"
import style from "@/src/ui/styles/layout.module.css"

import { LayoutSectionProps } from "@/src/ui/types/layout/layout.props";
import LayoutGrid from "./LayoutGrid";
import { useBoardContext } from "@/src/ui/hooks/board";

function LayoutSection(props : LayoutSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const context = useBoardContext();

    const { registry } = context!;

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
            left: `calc((${props.position.colIndex - 1} * var(--cell-size-full)) + var(--section-padding-left))`,
            top: `calc((${props.position.rowIndex - 1} * var(--cell-size-full)) + var(--section-padding-top))`,
            width: `calc((${props.position.colSpan} * var(--cell-size-full)) - var(--section-padding-left) + var(--section-padding-right))`,
            height: `calc((${props.position.rowSpan} * var(--cell-size-full)) - var(--section-padding-top) + var(--section-padding-bottom))`,
            padding: `var(--section-padding-top) var(--section-padding-right) var(--section-padding-bottom) var(--section-padding-left)`,
        }}
        >
            <LayoutGrid colSpan={props.position.colSpan} rowSpan={props.position.rowSpan} sectionId={props.id} />
        </div>
    )
}

export default LayoutSection