"use client"

import "@/src/modules/ui-dailyboard/styles/dailyboard.css";
import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.scss"
import { useLayoutEffect } from "react";

import DailyboardCardContainer from "./DailyboardCardContainer";

import { useDailyboardContext } from "../hooks/useDailyboardContext";
import { DailyboardRootProps } from "../types/dailyboard.props";
import { LayoutRoot } from "@/src/modules/ui-layout/components/LayoutRoot";
import { useLayoutContext } from "../../ui-layout/hooks/useLayoutContext";
import { getDailyboardDataSet } from "../utils/ui.utils";

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
      ref={dailyboardRef} 
      className={style.dailyboard}
      {...getDailyboardDataSet(dailyboardData)}
    >
      <LayoutRoot data={layoutData} />
      <DailyboardCardContainer cards={dailyboardCards} />
    </div>
  )
}