import style from "../layout.module.css"

import LayoutSection from "./LayoutSection";
import { LayoutSectionData } from "../layout.types";
import { useLayoutContext } from "../layout.hooks";

function LayoutSectionContainer({ sections }: LayoutSectionContainerProps) {
    const context = useLayoutContext();

    const { measurements } = context!;

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