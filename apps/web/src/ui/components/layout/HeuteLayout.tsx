"use client"

const padding = 8;

import { useLayoutEffect } from "react"

import style from "@/src/ui/styles/layout.module.css"

import { useBoardContext } from "@/src/ui/hooks/board";
import { HeuteLayoutProps } from "@/src/ui/types/layout/layout.props";
import { useBoardContentStore } from "@/src/stores/board.content.store";
import LayoutSection from "./LayoutSection";

export default function HeuteLayout(props: HeuteLayoutProps) {
  const context = useBoardContext();

  const { registry } = context!;

  const sections = useBoardContentStore(state => state.sections);

  const layoutRef = registry.layout!.ref!;

  useLayoutEffect(() => {
    registry.registerLayout(layoutRef, props)

    return () => {
      registry.unregisterLayout()
    }
  }, [registry])

  const matrix = Array.from({ length: props.rowCount }, () =>
    Array.from({ length: props.columnCount }, () => ".")
  );

  sections.forEach(s => {
    const { rowIndex, colIndex, rowSpan, colSpan } = s.position;

    for (let r = 0; r < rowSpan; r++) {
      for (let c = 0; c < colSpan; c++) {
        matrix[rowIndex - 1 + r][colIndex - 1 + c] = s.name;
      }
    }
  });

  const gridTemplateAreas = matrix
  .map(row => `"${row.join(" ")}"`)
  .join(" ");

  return (
    <div 
      ref={registry.layout!.ref} 
      className={style.layout}
      style={{
        gridTemplateColumns: `repeat(${props.columnCount}, var(--cell-size-inner))`,
        gridTemplateRows: `repeat(${props.rowCount}, var(--cell-size-inner))`,
        gridTemplateAreas
      }}
    >
      {sections.map(section => (
        <LayoutSection key={section.name} {...section}/>
      ))}
    </div>
  )
}