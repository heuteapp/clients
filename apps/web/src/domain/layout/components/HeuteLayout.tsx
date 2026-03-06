"use client"

const padding = 12;

import style from "../layout.module.css"

import { HeuteLayoutData } from "../layout.types"
import { analyzeLayout } from "../layout.utils"
import { useEffect, useRef, useState } from "react"
import LayoutSection from "./LayoutSection";

interface HeuteLayoutProps extends HeuteLayoutData {
  
}

export default function HeuteLayout({
  columnCount,
  rowCount,
  sections,
}: HeuteLayoutProps) {

  const containerRef = useRef<HTMLDivElement>(null)
  const [squareSize, setSquareSize] = useState<{ full: number, inner: number }>({ full: 0, inner: 0 });
  const analyze = analyzeLayout(sections);

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = element

      const full = 
        Math.min(clientWidth / columnCount, clientHeight / rowCount)
      

      const inner =
        Math.min(
          (clientWidth - ((analyze.maxHorizontal + 4) * padding * 2)) / columnCount,
          (clientHeight - ((analyze.maxVertical + 4) * padding * 2)) / rowCount
        )
      

      setSquareSize(prev => {
        if (prev.full === full && prev.inner === inner) return prev
        return { full, inner }
      })
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [columnCount, rowCount])

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