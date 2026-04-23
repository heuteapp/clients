import React from "react"
import { DailyboardRegistry } from "@/src/modules/ui-dailyboard/types/dailyboard.registry";
import { createDailyboardRegistry } from "@/src/modules/ui-dailyboard/registries/dailyboard.registry";
import { CanvasRegistry } from "@/src/modules/ui-canvas/types/canvas.registry";

export const useDailyboardRegistry = (dailyboardRef: React.RefObject<HTMLDivElement | null>, canvasRegistry: CanvasRegistry) : DailyboardRegistry => {
   return React.useRef<DailyboardRegistry>(createDailyboardRegistry(dailyboardRef, canvasRegistry)).current!;
}