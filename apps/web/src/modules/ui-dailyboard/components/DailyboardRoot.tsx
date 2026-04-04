"use client"

import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.css"
import { useLayoutEffect, useRef } from "react";

import DailyboardCardContainer from "./DailyboardCardContainer";
import DailyboardGhostCard from "./DailyboardGhostCard";

import { useDailyboardContext } from "../hooks/useDailyboardContext";
import { DailyboardRootProps } from "../types/dailyboard.props";
import { LayoutRoot } from "@/src/modules/ui-layout/components/LayoutRoot";
import { useLayoutContext } from "../../ui-layout/hooks/useLayoutContext";

//

export function DailyboardRoot(props: DailyboardRootProps) {
  const { registry } = useDailyboardContext();
  const { source: layoutSource } = useLayoutContext();
  const dailyboardRef = registry.dailyboard.ref;

  
  const cards = props.data.cards;

  useLayoutEffect(() => {
    registry.registerDailyboard(dailyboardRef, props)

    return () => {
      registry.unregisterDailyboard()
    }
  }, [registry])
  
  if(!layoutSource) return null;
  if(!cards) return null;

  return (
    <div ref={dailyboardRef} className={style.dailyboard}>
      <LayoutRoot id={layoutSource.id} data={layoutSource} />
      <DailyboardCardContainer cards={cards} />
      <DailyboardGhostCard />
    </div>
  )
}