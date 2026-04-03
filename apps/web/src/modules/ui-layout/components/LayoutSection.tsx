import style from "@/src/modules/ui-layout/styles/layout.module.css"

import { useLayoutEffect, useRef } from "react"
import LayoutGrid from "./LayoutGrid";

import { LayoutSectionProps } from "@/src/modules/ui-layout/types/layout.props";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";

//

export function LayoutSection(props : LayoutSectionProps) {
    const { data } = props;
    const ref = useRef<HTMLDivElement>(null)
    const context = useLayoutContext();

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
                gridArea: data.name,
                padding: "var(--section-padding)",
                margin: "var(--section-margin)"
            }}
        >
            <LayoutGrid sectionId={props.id} colSpan={data.position.colSpan} rowSpan={data.position.rowSpan}/>
        </div>
    )
}