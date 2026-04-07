"use client"

import "@/src/modules/ui-dailyboard/styles/dailyboard.css";
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

  const { data: dailyboardData } = props;
  const dailyboardRef = registry.dailyboard.ref;
  const dailyboardCards = dailyboardData.cards;

  const { dataSource: layoutData } = useLayoutContext();

  useLayoutEffect(() => {
    registry.registerDailyboard(dailyboardRef, props)

    return () => {
      registry.unregisterDailyboard()
    }
  }, [registry])
  
  if(!dailyboardCards) return null;
  if(!layoutData) return null;

  return (
    <div 
      data-dailyboard-id={dailyboardData.id}
      data-dailyboard-layout-name={layoutData.name}
      data-dailyboard-layout-version={layoutData.version}
      data-dailyboard-date={dailyboardData.date}
      ref={dailyboardRef} 
      className={style.dailyboard}
    >
      <LayoutRoot data={layoutData} />
      <DailyboardCardContainer cards={dailyboardCards} />
      <DailyboardGhostCard />
    </div>
  )
}