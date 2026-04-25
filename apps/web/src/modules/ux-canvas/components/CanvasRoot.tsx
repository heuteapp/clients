"use client"

import { CanvasRootProps } from "../types/canvas.props";
import { TracedUniqueItem } from "../../t-core/components/TracedUniqueItem";
import { useRef } from "react";
import { CanvasRootView } from "../../ui-canvas/components/CanvasRootView";
import { CanvasGridContainer } from "./CanvasGridContainer";

export function CanvasRoot({ rootRef, src, className, sx }: CanvasRootProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = rootRef || internalRef;

  return (
    <TracedUniqueItem
      type="canvas-root"
      data={src}
      ref={ref}
    >
      <CanvasRootView 
        ref={ref}
        state={{}}
        className={className}
        sx={sx}
        render={() => <CanvasGridContainer colCount={src.colCount} rowCount={src.rowCount} gridSources={src.grids}/>}
      />
    </TracedUniqueItem>
  )
}