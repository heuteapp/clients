import { LayoutContextValue } from "@/src/modules/ui-layout/types/layout.context";
import { DailyboardRegistry } from "./dailyboard.registry";

export interface DailyboardContextValue {    
    layout: LayoutContextValue;
    registry: DailyboardRegistry;    
}