import { useLayoutEffect, useRef } from "react"
import style from "@/src/ui/styles/layout.module.css"

import { LayoutSectionProps } from "@/src/ui/types/layout/LayoutProps";
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
            left: `calc(${props.colIndex - 1} * var(--cell-size-full) + ${props.padding}px)`,
            top: `calc(${props.rowIndex - 1} * var(--cell-size-full) + ${props.padding}px)`,
            width: `calc(${props.colSpan} * var(--cell-size-full) - ${props.padding * 2}px)`,
            height: `calc(${props.rowSpan} * var(--cell-size-full) - ${props.padding * 2}px)`,
            padding: props.padding,
        }}
        >
            <LayoutGrid colSpan={props.colSpan} rowSpan={props.rowSpan} sectionId={props.id} />
        </div>
    )
}

export default LayoutSection