"use client"

import style from "@/src/modules/ux-canvas/styles/canvas.module.scss"

import { CanvasRootProps } from "../types/canvas.props";
import { useCanvasContext } from "../hooks/useCanvasContext";
import { CanvasGridContainer } from "./CanvasGridContainer";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";
import { useRef } from "react";

export function CanvasRoot({ rootRef, src }: CanvasRootProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = rootRef || internalRef;

  return (
    <TracedUniqueItem
      type="canvas-root"
      data={src}
      ref={ref}
    >
      <div 
        ref={ref} 
        className={style.canvas}
      >
        <CanvasGridContainer colCount={src.colCount} rowCount={src.rowCount} gridSources={src.grids}/>
      </div>
    </TracedUniqueItem>
  )
}