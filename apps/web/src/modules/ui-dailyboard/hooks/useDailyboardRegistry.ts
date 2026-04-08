import React from "react"
import { DailyboardRegistry } from "@/src/modules/ui-dailyboard/types/dailyboard.registry";
import { createDailyboardRegistry } from "@/src/modules/ui-dailyboard/registries/dailyboard.registry";
import { LayoutRegistry } from "@/src/modules/ui-layout/types/layout.registry";

export const useDailyboardRegistry = (dailyboardRef: React.RefObject<HTMLDivElement | null>, layoutRegistry: LayoutRegistry) : DailyboardRegistry => {
   return React.useRef<DailyboardRegistry>(createDailyboardRegistry(dailyboardRef, layoutRegistry)).current!;
}