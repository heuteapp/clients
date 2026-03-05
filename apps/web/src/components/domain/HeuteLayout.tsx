"use client"

import style from "@/src/styles/domain/HeuteLayout.module.css"
import { forwardRef } from "react"

//

interface HeuteLayoutProps {

}

export default function HeuteLayout({  }: HeuteLayoutProps) {
  return (
    <div className={style.layout}>

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