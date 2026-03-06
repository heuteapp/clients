"use client"

const padding = 12;

import { useRef } from "react"

import style from "../layout.module.css"

import { HeuteLayoutData } from "../layout.types"
import { analyzeLayout } from "../layout.utils"
import LayoutSection from "./LayoutSection";
import { useLayoutMeasurements } from "../layout.hooks";
import { HeuteLayoutContext } from "../layout.context";
import LayoutContainer from "./LayoutContainer";

interface HeuteLayoutProps extends HeuteLayoutData {
  
}

export default function HeuteLayout({ columnCount, rowCount, sections }: HeuteLayoutProps) {

  const rootRef = useRef<HTMLDivElement>(null)
  const analyze = analyzeLayout(sections);

  const measurements = useLayoutMeasurements({
    containerRef: rootRef,
    columnCount,
    rowCount,
    analyze,
    padding
  })

  console.log("render layout", { measurements })

  return (
    <div ref={rootRef} className={style.layout} style={{
      visibility: measurements.containerSize.width > 0 ? "visible" : "hidden"
    }}>
      <HeuteLayoutContext.Provider value={{ rootRef, analyze, measurements }}>
        <LayoutContainer sections={sections} />
      </HeuteLayoutContext.Provider>
      <div>{measurements.containerSize.width}</div>
    </div>
  )
}