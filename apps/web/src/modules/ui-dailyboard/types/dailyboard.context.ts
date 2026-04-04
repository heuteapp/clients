import { LayoutContextValue } from "@/src/modules/ui-layout/types/layout.context";
import { DailyboardRegistry } from "./dailyboard.registry";
import { StoredDailyboardRoot } from "@/src/heute-store/types/dailyboard.types";

export interface DailyboardContextValue {    
    source: StoredDailyboardRoot | null;
    layout: LayoutContextValue;
    registry: DailyboardRegistry;    
}