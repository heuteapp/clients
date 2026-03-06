import { useContext, useRef } from "react"
import style from "../layout.module.css"

import { HeuteLayoutContext } from "../layout.context";
import LayoutSection from "./LayoutSection";
import { LayoutSectionData } from "../layout.types";

function LayoutContainer({ sections }: LayoutContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const context = useContext(HeuteLayoutContext);

    const { rootRef, measurements } = context!;

    return (
        <div className={style.container} style={{
          width: (measurements.containerSize.width),
          height: (measurements.containerSize.height),
        }}>
          {rootRef.current &&
            sections.map((section, index) => (
              <LayoutSection
                key={index}
                squareSize={measurements.cellSize}
                padding={12}
                {...section}
              />
            ))}
        </div>
    )
}

export default LayoutContainer


interface LayoutContainerProps {
    sections: LayoutSectionData[]
}

export type { LayoutContainerProps }