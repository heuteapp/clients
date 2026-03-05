"use client"

import HeuteLayoutData from "@/src/data/domain/layout/HeuteLayoutData"
import style from "@/src/styles/domain/HeuteLayout.module.css"
import { analyzeLayout } from "@/src/utils"
import { useEffect, useRef, useState } from "react"

interface HeuteLayoutProps extends HeuteLayoutData {
  
}

export default function HeuteLayout({
  columnCount,
  rowCount,
  sections,
}: HeuteLayoutProps) {

  const containerRef = useRef<HTMLDivElement>(null)
  const [squareSize, setSquareSize] = useState(0);
  const analyze = analyzeLayout(sections);

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = element

      setSquareSize(
        Math.min(
          (clientWidth + (analyze.maxHorizontal * 16)) / columnCount,
          (clientHeight + (analyze.maxVertical * 16)) / rowCount
        )
      )
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [columnCount, rowCount])

  return (
    <div ref={containerRef} className={style.layout}>
      {squareSize > 0 &&
        sections.map((section, index) => (
          <LayoutSection
            key={index}
            squareSize={squareSize}
            analyze={analyze}
            {...section}
          />
        ))}
    </div>
  )
}

interface LayoutSectionData {
  colIndex: number
  rowIndex: number
  colSpan: number
  rowSpan: number
}

interface LayoutSectionProps extends LayoutSectionData {
  analyze: ReturnType<typeof analyzeLayout>
  squareSize: number
}

function LayoutSection({
  squareSize,
  colIndex,
  rowIndex,
  colSpan,
  rowSpan,
  analyze
}: LayoutSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={style.section}
      style={{
        position: "absolute",
        left: (colIndex -1)* squareSize,
        top: (rowIndex -1)* squareSize,
        width: (colSpan * squareSize) - 16,
        height: (rowSpan * squareSize) - 16,
        gridTemplateColumns: `repeat(${colSpan}, 1fr)`,
        gridTemplateRows: `repeat(${rowSpan}, 1fr)`,
      }}
      onMouseEnter={() => {
        if (ref.current) {
          ref.current.classList.add(style.highlighted)
        }
      }}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.classList.remove(style.highlighted)
        }
      }}
    >
      {// do grid items
        Array.from({ length: colSpan * rowSpan }, (_, i) => (
          <div key={i} 
            className={style.layoutSectionItem} 
              style={{
                width: squareSize - 16,
                height: squareSize - 16,
              }}
            />
        ))
      }
    </div>
  )
}