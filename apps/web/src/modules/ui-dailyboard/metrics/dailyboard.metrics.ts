import { DailyboardMetrics } from "../types/dailyboard.metrics";
import { LayoutMetrics } from "../../ui-layout/types/layout.metrics";

export const calculateDailyboardMetrics = (layoutMetrics: LayoutMetrics) : DailyboardMetrics => {
    return {
        layout: layoutMetrics
    }
}