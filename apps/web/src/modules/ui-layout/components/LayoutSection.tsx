import style from "@/src/modules/ui-layout/styles/layout.module.css"

import { useLayoutEffect, useRef } from "react"

import { LayoutSectionProps } from "@/src/modules/ui-layout/types/layout.props";
import { useLayoutContext } from "@/src/modules/ui-layout/hooks/useLayoutContext";
import LayoutGrid from "./LayoutGrid";

//

export function LayoutSection(props : LayoutSectionProps) {
    const { data } = props;
    const ref = useRef<HTMLDivElement>(null)
    const context = useLayoutContext();

    const { registry } = context!;

    useLayoutEffect(() => {
        registry.registerLayoutSection(data.id, ref, props)

        return () => {
            registry.unregisterLayoutSection(data.id)
        }
    }, [data.id, registry])

    return (
        <div
            data-section
            data-section-name={data.name}
            ref={ref}
            className={style.section}
            style={{
                gridArea: data.name,
                padding: "8px",
            }}
        >
            <LayoutGrid sectionId={data.id} colSpan={props.data.position.colSpan} rowSpan={props.data.position.rowSpan} />
        </div>
    )
}