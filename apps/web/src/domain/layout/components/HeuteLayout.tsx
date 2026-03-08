"use client"

const padding = 8;

import { useLayoutEffect } from "react"

import style from "../layout.module.css"

import LayoutSectionContainer from "./LayoutSectionContainer";
import { useBoardContext } from "../../board/board.hooks";
import { HeuteLayoutProps } from "../types/props";

export default function HeuteLayout(props: HeuteLayoutProps) {
  const context = useBoardContext();
  
  const { columnCount, rowCount, sections } = props;
  const { layoutRegistry, layoutRef } = context!;

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
        visibility: layoutRegistry.measurements!.containerSize.width > 0 ? "visible" : "hidden"
      }}
    >
        <LayoutSectionContainer sections={sections} />
    </div>
  )
}