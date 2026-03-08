import style from "../layout.module.css"

import LayoutSection from "./LayoutSection";
import { LayoutSectionData } from "../layout.types";
import { useBoardContext } from "../../board/board.hooks";

function LayoutSectionContainer({ sections }: LayoutSectionContainerProps) {
    const context = useBoardContext();

    const { layoutRegistry } = context!;

    return (
        <div className={style.container} style={{
          width: (layoutRegistry.measurements!.containerSize.width),
          height: (layoutRegistry.measurements!.containerSize.height),
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