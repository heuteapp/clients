import { LayoutContextValue } from "@/src/modules/ui-layout/types/layout.context";
import { DailyboardRegistry } from "./dailyboard.registry";
import { StoredDailyboardData} from "@/src/heute-store/types/dailyboard.types";
import { DailyboardMetrics } from "./dailyboard.metrics";

export interface DailyboardContextValue {    
    dataSource: StoredDailyboardData | null;
    layout: LayoutContextValue;
    registry: DailyboardRegistry;    
    metrics: DailyboardMetrics;
}