import { DailyboardMetrics } from "../types/dailyboard.metrics";
import { LayoutMetrics } from "../../ui-layout/types/layout.metrics";
import { DailyboardRegistry } from "../types/dailyboard.registry";

export const calculateDailyboardMetrics = (layoutMetrics: LayoutMetrics) : DailyboardMetrics => {
    return {
        layout: layoutMetrics
    }
}

export const applyDailyboardMetrics = (registry: DailyboardRegistry, metrics: DailyboardMetrics) => {
    
}