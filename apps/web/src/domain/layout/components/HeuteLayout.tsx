"use client"

const padding = 12;

import { useLayoutEffect, useMemo, useRef } from "react"

import style from "../layout.module.css"

import { HeuteLayoutData } from "../layout.types"
import { analyzeLayout } from "../layout.utils"
import { useLayoutMeasurements, useLayoutRegistry } from "../layout.hooks";
import { HeuteLayoutContext } from "../layout.context";
import LayoutSectionContainer from "./LayoutSectionContainer";
import { LayoutRegistry } from "../layout.registry";

export default function HeuteLayout({ columnCount, rowCount, sections, registry }: HeuteLayoutProps) {
  if(!registry) {
    registry = useLayoutRegistry()
  }

  const rootRef = useRef<HTMLDivElement>(null)
  const analyze = analyzeLayout(sections);

  const measurements = useLayoutMeasurements({
    rootRef,
    columnCount,
    rowCount,
    analyze,
    padding
  })

  const contextValue = useMemo(
    () => ({
      rootRef,
      analyze,
      measurements,
      registry: registry,
    }),
    [analyze, measurements, registry]
  )

  useLayoutEffect(() => {
    registry.registerRoot(rootRef)

    return () => {
    registry.unregisterRoot()
    }
  }, [registry])

  return (
    <div 
      ref={rootRef} 
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
