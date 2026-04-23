"use client"

import { useLayoutEffect } from "react"

import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { CanvasGridSection } from "./CanvasSection";
import { CanvasRootProps } from "../types/canvas.props";
import { useCanvasContext } from "../hooks/useCanvasContext";
import { getCanvasDataSet } from "../utils/ui.utils";

export function CanvasRoot(props: CanvasRootProps) {
  const { data } = props;
  const { registry, dataSource: source } = useCanvasContext();

  const sections = source?.sections ?? [];
  const canvasRef = registry.canvas.ref;

  useLayoutEffect(() => {
    registry.registerCanvasRoot(canvasRef, props)

    return () => {
      registry.unregisterCanvas()
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
      ref={canvasRef} 
      className={style.canvas}
      style={{
        gridTemplateColumns: `repeat(${data.colCount}, var(--canvas-cell-size))`,
        gridTemplateRows: `repeat(${data.rowCount}, var(--canvas-cell-size))`,
        gridTemplateAreas
      }}
      {...getCanvasDataSet(data)}
    >
      {sections.map((section) => (
        <CanvasGridSection key={section.name} data={section}/>
      ))}
    </div>
  )
}