import style from "../layout.module.css"

import LayoutSection from "./LayoutSection";
import { LayoutSectionContainerProps } from "../types/props";
import { useBoardContext } from "../../board/board.hooks";

function LayoutSectionContainer({ sections }: LayoutSectionContainerProps) {
    const context = useBoardContext();

    const { measurements } = context!;

    return (
        <div className={style.container} style={{
          width: (measurements!.containerSize.width),
          height: (measurements!.containerSize.height),
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