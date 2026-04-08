import React from "react";
import { DailyboardMetrics } from "../types/dailyboard.metrics";
import { applyDailyboardMetrics, calculateDailyboardMetrics } from "../metrics/dailyboard.metrics";
import { DailyboardRegistry } from "../types/dailyboard.registry";
import { LayoutMetrics } from "../../ui-layout/types/layout.metrics";
import { useMetricsContext } from "../../ui-shared/hooks/useMetricsContext";

export const useDailyboardMetrics = (registry: DailyboardRegistry, layoutMetrics: LayoutMetrics) : DailyboardMetrics => {
    const { subscribe, unsubscribe } = useMetricsContext();
    const metrics = React.useRef<DailyboardMetrics>(null);

    React.useEffect(() => {
        subscribe("dailyboard", () => {
            metrics.current = calculateDailyboardMetrics({layout: layoutMetrics});
            applyDailyboardMetrics({registry, metrics: metrics.current!});
        });

        return () => {
            unsubscribe("dailyboard");
        }
    }, [registry, layoutMetrics]);

    return metrics.current!;
}