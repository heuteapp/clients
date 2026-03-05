"use client"

import style from "@/src/styles/domain/HeuteLayout.module.css"
import { useMemo, useRef } from "react"

interface HeuteLayoutProps {
  columns: number
  rows: number
  sections: LayoutSectionData[]
}

export default function HeuteLayout({
  columns,
  rows,
  sections,
}: HeuteLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const squareSize = useMemo(() => {
    if (!containerRef.current) return 0

    const { clientWidth, clientHeight } = containerRef.current

    return Math.min(
      clientWidth / columns,
      clientHeight / rows
    )
  }, [columns, rows])

  return (
    <div ref={containerRef} className={style.layout}>
      {squareSize > 0 &&
        sections.map((section, index) => (
          <LayoutSection
            key={index}
            squareSize={squareSize}
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
  squareSize: number
}

function LayoutSection({
  squareSize,
  colIndex,
  rowIndex,
  colSpan,
  rowSpan,
}: LayoutSectionProps) {
  return (
    <div
      className={style.layoutSection}
      style={{
        position: "absolute",
        left: (colIndex -1)* squareSize,
        top: (rowIndex -1)* squareSize,
        width: (colSpan * squareSize) - 8,
        height: (rowSpan * squareSize) - 8,
        gridTemplateColumns: `repeat(${colSpan}, 1fr)`,
        gridTemplateRows: `repeat(${rowSpan}, 1fr)`,
      }}
    >
      {// do grid items
        Array.from({ length: colSpan * rowSpan }, (_, i) => (
          <div key={i} className={style.layoutSectionItem} />
        ))
      }
    </div>
  )
}