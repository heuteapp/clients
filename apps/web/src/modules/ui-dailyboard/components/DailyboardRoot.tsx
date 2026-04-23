"use client"

import "@/src/modules/ui-dailyboard/styles/dailyboard.css";
import style from "@/src/modules/ui-dailyboard/styles/dailyboard.module.scss"
import { useLayoutEffect } from "react";

import DailyboardCardContainer from "./DailyboardCardContainer";

import { useDailyboardContext } from "../hooks/useDailyboardContext";
import { DailyboardRootProps } from "../types/dailyboard.props";
import { CanvasRoot } from "@/src/modules/ui-canvas/components/CanvasRoot";
import { useCanvasContext } from "../../ui-canvas/hooks/useCanvasContext";
import { getDailyboardDataSet } from "../utils/ui.utils";

//

export function DailyboardRoot(props: DailyboardRootProps) {
  const { registry } = useDailyboardContext();

  const { data: dailyboardData } = props;
  const dailyboardRef = registry.dailyboard.ref;
  const dailyboardCards = dailyboardData.cards;

  const { dataSource: canvasData } = useCanvasContext();

  useLayoutEffect(() => {
    registry.registerDailyboard(dailyboardRef, props)

    return () => {
      registry.unregisterDailyboard()
    }
  }, [registry])
  
  if(!dailyboardCards) return null;
  if(!canvasData) return null;

  return (
    <div 
      ref={dailyboardRef} 
      className={style.dailyboard}
      {...getDailyboardDataSet(dailyboardData)}
    >
      <CanvasRoot data={canvasData} />
      <DailyboardCardContainer cards={dailyboardCards} />
    </div>
  )
}