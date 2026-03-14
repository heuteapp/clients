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
            left: `calc(${props.position.colIndex - 1} * var(--cell-size-full) + var(--section-padding))`,
            top: `calc(${props.position.rowIndex - 1} * var(--cell-size-full) + var(--section-padding))`,
            width: `calc(${props.position.colSpan} * var(--cell-size-full) - calc(var(--section-padding) * 2))`,
            height: `calc(${props.position.rowSpan} * var(--cell-size-full) - calc(var(--section-padding) * 2))`,
            padding: `var(--section-padding)`,
        }}
        >
            <LayoutGrid colSpan={props.position.colSpan} rowSpan={props.position.rowSpan} sectionId={props.id} />
        </div>
    )
}

export default LayoutSection