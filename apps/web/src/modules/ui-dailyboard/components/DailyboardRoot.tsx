"use client"

import "@/src/modules/ui-dailyboard/styles/dailyboard.css";
import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.scss"
import { useLayoutEffect } from "react";

import DailyboardCardContainer from "./DailyboardCardContainer";

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
      data-dailyboard
      data-id={dailyboardData.id}
      data-layout-name={layoutData.name}
      data-layout-version={layoutData.version}
      data-date={dailyboardData.date}
      ref={dailyboardRef} 
      className={style.dailyboard}
    >
      <LayoutRoot data={layoutData} />
      <DailyboardCardContainer cards={dailyboardCards} />
    </div>
  )
}