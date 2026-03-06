"use client"

const padding = 12;

import { useRef } from "react"

import style from "../layout.module.css"

import { HeuteLayoutData } from "../layout.types"
import { analyzeLayout } from "../layout.utils"
import LayoutSection from "./LayoutSection";
import { useLayoutSize } from "../layout.hooks";

interface HeuteLayoutProps extends HeuteLayoutData {
  
}

export default function HeuteLayout({ columnCount, rowCount, sections }: HeuteLayoutProps) {

  const containerRef = useRef<HTMLDivElement>(null)
  const analyze = analyzeLayout(sections);

  const squareSize = useLayoutSize({
    containerRef,
    columnCount,
    rowCount,
    analyze,
    padding
  })

  return (
    <div ref={containerRef} className={style.layout}>
      <div className={style.container} style={{
        width: (squareSize.full * columnCount),
        height: (squareSize.full * rowCount),
      }}>
        {containerRef.current &&
          sections.map((section, index) => (
            <LayoutSection
              key={index}
              squareSize={squareSize}
              padding={padding}
              {...section}
            />
          ))}
      </div>
    </div>
  )
}