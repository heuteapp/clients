"use client"

import style from "@/src/modules/ui-canvas/styles/canvas.module.scss"

import { CanvasRootProps } from "../types/canvas.props";
import { useCanvasContext } from "../hooks/useCanvasContext";
import { CanvasGridContainer } from "./CanvasGridContainer";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";

export function CanvasRoot(props: CanvasRootProps) {
  const { data } = props;
  const { rootRef, dataSource: source } = useCanvasContext();

  const grids = source?.grids ?? [];

  return (
    <TracedUniqueItem
      type="canvas-root"
      data={data}
      ref={rootRef}
    >
      <div 
        ref={rootRef} 
        className={style.canvas}
      >
        <CanvasGridContainer colCount={data.colCount} rowCount={data.rowCount} grids={grids}/>
      </div>
    </TracedUniqueItem>
  )
}