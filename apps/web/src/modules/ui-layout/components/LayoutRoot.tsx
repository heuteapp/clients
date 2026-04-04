"use client"

import { useLayoutEffect } from "react"

import style from "@/src/modules/ui-layout/styles/layout.module.css"

import { LayoutSection } from "./LayoutSection";
import { LayoutRootProps } from "../types/layout.props";
import { useLayoutContext } from "../hooks/useLayoutContext";

export function LayoutRoot(props: LayoutRootProps) {
  const { data } = props;
  const { registry, source } = useLayoutContext();

  const sections = source?.sections ?? [];
  const layoutRef = registry.layout.ref;

  useLayoutEffect(() => {
    registry.registerLayout(layoutRef, props)

    return () => {
      registry.unregisterLayout()
    }
  }, [registry])

  const matrix = Array.from({ length: data.rowCount }, () =>
    Array.from({ length: data.colCount }, () => ".")
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
      ref={layoutRef} 
      className={style.layout}
      style={{
        gridTemplateColumns: `repeat(${data.colCount}, var(--layout-cell-size))`,
        gridTemplateRows: `repeat(${data.rowCount}, var(--layout-cell-size))`,
        gridTemplateAreas
      }}
    >
      {sections.map((section) => (
        <LayoutSection key={section.name} data={section}/>
      ))}
    </div>
  )
}