import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { useLayoutEffect, useRef } from "react"

import { CanvasSectionProps } from "@/src/modules/ui-canvas/types/canvas.props";
import { useCanvasContext } from "@/src/modules/ui-canvas/hooks/useCanvasContext";
import CanvasGrid from "./CanvasGrid";

//

export function CanvasSection(props : CanvasSectionProps) {
    const { data } = props;
    const ref = useRef<HTMLDivElement>(null)
    const context = useCanvasContext();

    const { registry } = context!;

    useLayoutEffect(() => {
        registry.registerCanvasSection(data.id, ref, props)

        return () => {
            registry.unregisterCanvasSection(data.id)
        }
    }, [data.id, registry])

    return (
        <div
            data-canvas-section
            data-canvas-section-name={data.name}
            data-canvas-section-col-index={props.data.position.colIndex}
            data-canvas-section-row-index={props.data.position.rowIndex}
            data-canvas-section-col-span={props.data.position.colSpan}
            data-canvas-section-row-span={props.data.position.rowSpan}
            ref={ref}
            className={style.section}
            style={{
                gridArea: data.name,
                padding: "8px",
            }}
        >
            <CanvasGrid sectionId={data.id} colSpan={props.data.position.colSpan} rowSpan={props.data.position.rowSpan} />
        </div>
    )
}