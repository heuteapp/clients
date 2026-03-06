"use client"

const padding = 12;

import { useRef } from "react"

import style from "../layout.module.css"

import { HeuteLayoutData } from "../layout.types"
import { analyzeLayout } from "../layout.utils"
import LayoutSection from "./LayoutSection";
import { useLayoutMeasurements } from "../layout.hooks";
import { HeuteLayoutContext } from "../layout.context";

interface HeuteLayoutProps extends HeuteLayoutData {
  
}

export default function HeuteLayout({ columnCount, rowCount, sections }: HeuteLayoutProps) {

  const containerRef = useRef<HTMLDivElement>(null)
  const analyze = analyzeLayout(sections);

  const measurements = useLayoutMeasurements({
    containerRef,
    columnCount,
    rowCount,
    analyze,
    padding
  })

  return (
    <div ref={containerRef} className={style.layout}>
      <HeuteLayoutContext.Provider value={{ analyze, measurements }}>
        <div className={style.container} style={{
          width: (measurements.cellSize.full * columnCount),
          height: (measurements.cellSize.full * rowCount),
        }}>
          {containerRef.current &&
            sections.map((section, index) => (
              <LayoutSection
                key={index}
                squareSize={measurements.cellSize}
                padding={padding}
                {...section}
              />
            ))}
        </div>
      </HeuteLayoutContext.Provider>
    </div>
  )
}