"use client"

import style from "@/src/styles/domain/HeuteLayout.module.css"
import { forwardRef } from "react"

//

interface HeuteLayoutProps {
  sections: LayoutSectionProps[];
}

export default function HeuteLayout({ sections }: HeuteLayoutProps) {
  return (
    <div className={style.layout}>
      {sections.map((section, index) => (
        <LayoutSection
          key={index}
          colIndex={section.colIndex}
          rowIndex={section.rowIndex}
          colSpan={section.colSpan}
          rowSpan={section.rowSpan}
        />
      ))}
    </div>
  )
}

//

interface LayoutSectionProps {
  colIndex: number;
  rowIndex: number;
  colSpan: number;
  rowSpan: number;
}

const LayoutSection = forwardRef<HTMLDivElement, LayoutSectionProps>((props, ref) => {
  return (
    <div className={style.layoutSection} ref={ref}>

    </div>
  );
})