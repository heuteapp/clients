import { useLayoutEffect, useRef } from "react"
import style from "@/src/ui/styles/layout.module.css"

import { LayoutSectionProps } from "@/src/ui/types/layout/layout.props";
import { useBoardContext } from "@/src/ui/hooks/board/useBoardContext";
import LayoutGrid from "./LayoutGrid";

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
                gridArea: props.name,
                padding: "var(--section-padding)",
                margin: "var(--section-margin)"
            }}
        >
            <LayoutGrid sectionId={props.id} colSpan={props.position.colSpan} rowSpan={props.position.rowSpan}/>
        </div>
    )
}

export default LayoutSection