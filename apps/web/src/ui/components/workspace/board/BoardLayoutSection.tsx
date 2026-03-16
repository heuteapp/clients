import { useLayoutEffect, useRef } from "react"
import style from "@/src/ui/styles/layout.module.css"

import { BoardLayoutSectionProps } from "@/src/ui/types/board/board.props";
import { useBoardContext } from "@/src/ui/hooks/board/useBoardContext";
import BoardLayoutGrid from "./BoardLayoutGrid";

function BoardLayoutSection(props : BoardLayoutSectionProps) {
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
            <BoardLayoutGrid sectionId={props.id} colSpan={props.position.colSpan} rowSpan={props.position.rowSpan}/>
        </div>
    )
}

export default BoardLayoutSection