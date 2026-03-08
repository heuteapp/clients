"use client"

const padding = 8;

import { useLayoutEffect, useMemo, useRef } from "react"

import style from "../layout.module.css"

import { HeuteLayoutData } from "../layout.types"
import { analyzeLayout } from "../layout.utils"
import { useLayoutMeasurements } from "../layout.hooks";
import { HeuteLayoutContext } from "../layout.context";
import LayoutSectionContainer from "./LayoutSectionContainer";
import { LayoutRegistry } from "../layout.registry";
import { useBoardContext } from "../../board/board.hooks";

export default function HeuteLayout(props: HeuteLayoutProps) {
  const context = useBoardContext();
  
  const { columnCount, rowCount, sections } = props;
  const { layoutRegistry } = context!;

  const layoutRef = useRef<HTMLDivElement>(null);
  const analyze = analyzeLayout(sections);

  const measurements = useLayoutMeasurements({
    layoutRef,
    columnCount,
    rowCount,
    analyze,
    padding
  })
  
  context.layoutRegistry.measurements = measurements;

  const contextValue = useMemo(
    () => ({
      layoutRef,
      analyze,
      measurements,
      registry: layoutRegistry,
    }),
    [analyze, measurements, layoutRegistry]
  )

  useLayoutEffect(() => {
    layoutRegistry.registerRoot(layoutRef, props)

    return () => {
    layoutRegistry.unregisterRoot()
    }
  }, [layoutRegistry])

  return (
    <div 
      ref={layoutRef} 
      className={style.layout} 
      style={{
        visibility: measurements.containerSize.width > 0 ? "visible" : "hidden"
      }}
    >
      <HeuteLayoutContext.Provider value={contextValue}>
        <LayoutSectionContainer sections={sections} />
      </HeuteLayoutContext.Provider>
    </div>
  )
}

export interface HeuteLayoutProps extends HeuteLayoutData {
  registry?: LayoutRegistry
}
