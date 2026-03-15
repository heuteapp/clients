"use client"

const padding = 8;

import { useLayoutEffect, useRef } from "react"

import style from "@/src/ui/styles/layout.module.css"

import LayoutSectionContainer from "./LayoutSectionContainer";
import { useBoardContext } from "@/src/ui/hooks/board";
import { HeuteLayoutProps } from "@/src/ui/types/layout/layout.props";
import { useBoardStore } from "@/src/stores/board.content.store";

export default function HeuteLayout(props: HeuteLayoutProps) {
  const context = useBoardContext();

  const { registry } = context!;

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
    >
        <LayoutSectionContainer sections={sections} />
    </div>
  )
}