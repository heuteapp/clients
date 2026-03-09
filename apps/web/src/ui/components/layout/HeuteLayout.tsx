"use client"

const padding = 8;

import { useLayoutEffect, useRef } from "react"

import style from "../layout.module.css"

import LayoutSectionContainer from "./LayoutSectionContainer";
import { useBoardContext } from "../../../core/domain/board/board.hooks";
import { HeuteLayoutProps } from "../../../core/domain/layout/types/props";
import { useBoardStore } from "@/src/core/stores/board.store";

export default function HeuteLayout(props: HeuteLayoutProps) {
  const context = useBoardContext();

  const { columnCount, rowCount } = props;
  const { registry, measurements } = context!;

  const sections = useBoardStore(state => state.sections);

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