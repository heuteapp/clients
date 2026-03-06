import { useContext, useRef } from "react"
import style from "../layout.module.css"

import { HeuteLayoutContext } from "../layout.context";
import LayoutSection from "./LayoutSection";
import { LayoutSectionData } from "../layout.types";

function LayoutSectionContainer({ sections }: LayoutSectionContainerProps) {
    const context = useContext(HeuteLayoutContext);

    const { rootRef, measurements } = context!;

    return (
        <div className={style.container} style={{
          width: (measurements.containerSize.width),
          height: (measurements.containerSize.height),
        }}>
          {
            sections.map((section, index) => (
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


interface LayoutSectionContainerProps {
    sections: LayoutSectionData[]
}

export type { LayoutSectionContainerProps as LayoutContainerProps }