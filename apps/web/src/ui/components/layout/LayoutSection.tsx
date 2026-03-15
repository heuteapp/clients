import { useLayoutEffect, useRef } from "react"
import style from "@/src/ui/styles/layout.module.css"

import { LayoutSectionProps } from "@/src/ui/types/layout/layout.props";
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
    }, [props, registry])

    return (
        <div
            ref={ref}
            className={style.section}
            style={{
                gridArea: props.name
            }}
        />
    )
}

export default LayoutSection