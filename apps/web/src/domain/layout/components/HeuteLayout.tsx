"use client"

const padding = 8;

import { useLayoutEffect, useRef } from "react"

import style from "../layout.module.css"

import LayoutSectionContainer from "./LayoutSectionContainer";
import { useBoardContext } from "../../board/board.hooks";
import { HeuteLayoutProps } from "../types/props";

export default function HeuteLayout(props: HeuteLayoutProps) {
  const context = useBoardContext();

  const { columnCount, rowCount, sections } = props;
  const { registry, measurements } = context!;

  const layoutRef = registry.layout!.ref!;

  useLayoutEffect(() => {
    registry.registerLayout(layoutRef, props)

    return () => {
      registry.unregisterLayout()
    }
  }, [registry])

  return (
    <div 
      ref={registry.layout!.ref} 
      className={style.layout} 
      style={{
        visibility: measurements!.containerSize.width > 0 ? "visible" : "hidden"
      }}
    >
        <LayoutSectionContainer sections={sections} />
    </div>
  )
}