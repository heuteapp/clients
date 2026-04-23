"use client"

import { useLayoutEffect } from "react"

import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { CanvasRootProps } from "../types/canvas.props";
import { useCanvasContext } from "../hooks/useCanvasContext";
import { getCanvasDataSet } from "../utils/ui.utils";
import { CanvasGridContainer } from "./CanvasGridContainer";

export function CanvasRoot(props: CanvasRootProps) {
  const { data } = props;
  const { registry, dataSource: source } = useCanvasContext();

  const grids = source?.grids ?? [];
  const canvasRef = registry.canvas.ref;

  useLayoutEffect(() => {
    registry.registerCanvasRoot(canvasRef, props)

    return () => {
      registry.unregisterCanvasRoot()
    }
  }, [registry])

  return (
    <div 
      ref={canvasRef} 
      className={style.canvas}
      {...getCanvasDataSet(data)}
    >
      <CanvasGridContainer colCount={data.colCount} rowCount={data.rowCount} grids={grids}/>
    </div>
  )
}