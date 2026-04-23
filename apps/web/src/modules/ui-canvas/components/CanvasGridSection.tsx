import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { useLayoutEffect, useRef } from "react"

import { CanvasGridSectionProps } from "@/src/modules/ui-canvas/types/canvas.props";
import { useCanvasContext } from "@/src/modules/ui-canvas/hooks/useCanvasContext";
import { TracedItem } from "../../t-shared/components/TracedItem";
import CanvasGridItem from "./CanvasGridItem";

//

export function CanvasGridSection(props : CanvasGridSectionProps) {
    const { data } = props;
    const ref = useRef<HTMLDivElement>(null)
    const context = useCanvasContext();

    const { registry } = context!;

    useLayoutEffect(() => {
        registry.registerCanvasGridSection(data.name, ref, props)

        return () => {
            registry.unregisterCanvasGridSection(data.name)
        }
    }, [data.name, registry])

    return (
        <TracedItem
            type={"canvas-grid-section"}
            id={data.name}
            ref={ref}
        >
            <div
                ref={ref}
                className={style.gridSection}
                style={{
                    gridArea: data.name
                }}
            >
                <CanvasGridItem data={data}/>
            </div>        
        </TracedItem>
    )
}