"use client"

const padding = 8;

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
  const [squareSize, setSquareSize] = useState<{ full: number, inner: number }>({ full: 0, inner: 0 });
  const analyze = analyzeLayout(sections);

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = element

      setSquareSize({
        full:         Math.min(
          (clientWidth) / columnCount,
          (clientHeight) / rowCount
        ),
        inner: Math.min(
          (clientWidth - ((analyze.maxHorizontal + 1) * padding * 2)) / columnCount,
          (clientHeight - ((analyze.maxVertical + 1) * padding * 2)) / rowCount
        )
      })
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [columnCount, rowCount])

  return (
    <div ref={containerRef} className={style.layout}>
      {containerRef.current &&
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
  squareSize: { full: number, inner: number }
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
        left: (colIndex -1)* squareSize.full,
        top: (rowIndex -1)* squareSize.full,
        width: (colSpan * squareSize.full) - (padding * 2),
        height: (rowSpan * squareSize.full) - (padding * 2),
        padding: padding,
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
      <div className={style.container} style={{
        width: (colSpan * (squareSize.inner)),
        height: (rowSpan * (squareSize.inner)),
        gridTemplateColumns: `repeat(${colSpan}, 1fr)`,
        gridTemplateRows: `repeat(${rowSpan}, 1fr)`,
      }}>
        {
          Array.from({ length: colSpan * rowSpan }, (_, i) => (
            <div key={i} 
              className={style.item} 
                style={{
                  width: squareSize.inner - (padding * 2),
                  height: squareSize.inner - (padding * 2),
                }}
            >
              {squareSize.full.toFixed(1)}x{squareSize.inner.toFixed(1)}
            </div>
          ))
        }
      </div>

    </div>
  )
}