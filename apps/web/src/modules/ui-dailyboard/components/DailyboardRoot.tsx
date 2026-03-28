"use client"

import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.css"
import { useLayoutEffect, useRef } from "react";

import DailyboardCardContainer from "./DailyboardCardContainer";
import DailyboardGhostCard from "./DailyboardGhostCard";

import { useDailyboardContext } from "../hooks/useDailyboardContext";
import { DailyboardRootProps } from "../types/dailyboard.props";
import { LayoutRoot } from "@/src/modules/ui-layout/components/LayoutRoot";

//

export function DailyboardRoot(props: DailyboardRootProps) {
  const { registry } = useDailyboardContext();
  const dailyboardRef = useRef<HTMLDivElement>(null);

  // !! FIX HERE !!
  const layout = null! as any;
  const cards = [] as any[];

  useLayoutEffect(() => {
    registry.registerDailyboard(dailyboardRef, props)

    return () => {
      registry.unregisterDailyboard()
    }
  }, [registry])
  
  if(!layout) return null;
  if(!cards) return null;

  return (
    <div ref={dailyboardRef} className={style.dailyboard}>
      <LayoutRoot {...layout} />
      <DailyboardCardContainer cards={cards} />
      <DailyboardGhostCard />
    </div>
  )
}