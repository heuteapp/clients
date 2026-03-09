import style from "@/src/ui/styles/layout.module.css"

import LayoutSection from "./LayoutSection";
import { LayoutSectionContainerProps } from "../../../types/layout/props";
import { useBoardContext } from "../../hooks/board.hooks";
import { useLayoutEffect, useRef } from "react";

function LayoutSectionContainer(props: LayoutSectionContainerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const context = useBoardContext();

    const { measurements, registry } = context!;

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
            width: (measurements!.containerSize.width),
            height: (measurements!.containerSize.height),
          }}
        >
          {
            props.sections.map((section, index) => (
              <LayoutSection
                key={index}
                padding={12}
                {...section}
              />
            ))}
        </div>
    )
}

export default LayoutSectionContainer