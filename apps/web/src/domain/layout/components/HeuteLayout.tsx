"use client"

const padding = 8;

import { useLayoutEffect, useRef } from "react"

import style from "../layout.module.css"

import LayoutSectionContainer from "./LayoutSectionContainer";
import { useBoardContext } from "../../board/board.hooks";
import { HeuteLayoutProps } from "../types/props";

export default function HeuteLayout(props: HeuteLayoutProps) {
  const context = useBoardContext();
  const layoutRef = useRef<HTMLDivElement>(null);
  
  const { columnCount, rowCount, sections } = props;
  const { registry, measurements } = context!;

  useLayoutEffect(() => {
    registry.registerLayout(layoutRef, props)

    return () => {
      registry.unregisterLayout()
    }
  }, [registry])

  return (
    <div 
      ref={layoutRef} 
      className={style.layout} 
      style={{
        visibility: measurements!.containerSize.width > 0 ? "visible" : "hidden"
      }}
    >
        <LayoutSectionContainer sections={sections} />
    </div>
  )
}