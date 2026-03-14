import style from "@/src/ui/styles/layout.module.css"

import LayoutSection from "./LayoutSection";
import { LayoutSectionContainerProps } from "@/src/ui/types/layout/layout.props";
import { useBoardContext } from "@/src/ui/hooks/board";
import { useLayoutEffect, useRef } from "react";

function LayoutSectionContainer(props: LayoutSectionContainerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const context = useBoardContext();

    const { registry } = context!;

    useLayoutEffect(() => {
        registry.registerLayoutSectionContainer(ref, props)

        return () => {
          registry.unregisterLayoutSectionContainer()
        }
    }, [registry])

    return (
        <div 
          ref={ref} 
          className={style.container} 
          style={{
            width: "var(--container-width)",
            height: "var(--container-height)",
          }}
        >
          {
            props.sections.map((section, index) => (
              <LayoutSection
                key={index}
                {...section}
              />
            ))}
        </div>
    )
}

export default LayoutSectionContainer