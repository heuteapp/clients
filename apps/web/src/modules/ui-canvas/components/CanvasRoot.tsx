"use client"

import { useLayoutEffect } from "react"

import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { CanvasRootProps } from "../types/canvas.props";
import { useCanvasContext } from "../hooks/useCanvasContext";
import { getCanvasDataSet } from "../utils/ui.utils";
import { CanvasGridContainer } from "./CanvasGridContainer";
import { TracedUniqueItem } from "../../t-shared/components/TracedUniqueItem";

export function CanvasRoot(props: CanvasRootProps) {
  const { data } = props;
  const { registry, dataSource: source } = useCanvasContext();

  const grids = source?.grids ?? [];
  const ref = registry.canvas.ref;

  useLayoutEffect(() => {
    registry.registerCanvasRoot(ref, props)

    return () => {
      registry.unregisterCanvasRoot()
    }
  }, [registry])

  return (
    <TracedUniqueItem
      type="canvas-root"
      data={data}
      ref={ref}
    >
      <div 
        ref={ref} 
        className={style.canvas}
      >
        <CanvasGridContainer colCount={data.colCount} rowCount={data.rowCount} grids={grids}/>
      </div>
    </TracedUniqueItem>
  )
}