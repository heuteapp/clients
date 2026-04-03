"use client"

import { useLayoutEffect } from "react"

import style from "@/src/modules/ui-layout/styles/layout.module.css"

import { LayoutSection } from "./LayoutSection";
import { LayoutRootProps } from "../types/layout.props";
import { useLayoutContext } from "../hooks/useLayoutContext";

export function LayoutRoot(props: LayoutRootProps) {
  const { registry } = useLayoutContext();

  // !! FIX HERE !!
  const sections = [] as any[];

  const layoutRef = registry.layout!.ref!;

  useLayoutEffect(() => {
    registry.registerLayout(layoutRef, props)

    return () => {
      registry.unregisterLayout()
    }
  }, [registry])

  const matrix = Array.from({ length: props.rowCount }, () =>
    Array.from({ length: props.colCount }, () => ".")
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
        gridTemplateColumns: `repeat(${props.colCount}, var(--cell-size-full))`,
        gridTemplateRows: `repeat(${props.rowCount}, var(--cell-size-full))`,
        gridTemplateAreas
      }}
    >
      {sections.map(section => (
        <LayoutSection key={section.name} {...section}/>
      ))}
    </div>
  )
}