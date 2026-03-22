import { useLayoutEffect, useRef } from "react"
import style from "@/src/ui/styles/layout.module.css"

import { BoardLayoutSectionProps } from "@/src/ui/types/domain/board/board.props";
import { useBoardContext } from "@/src/ui/hooks/core/domain/useBoardContext";
import LayoutGrid from "./LayoutGrid";

export function LayoutSection(props : BoardLayoutSectionProps) {
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
                gridArea: props.name,
                padding: "var(--section-padding)",
                margin: "var(--section-margin)"
            }}
        >
            <LayoutGrid sectionId={props.id} colSpan={props.position.colSpan} rowSpan={props.position.rowSpan}/>
        </div>
    )
}