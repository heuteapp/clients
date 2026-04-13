import React from "react";
import { DailyboardMetrics } from "../types/dailyboard.metrics";
import { applyDailyboardMetrics, calculateDailyboardMetrics } from "../metrics/dailyboard.metrics";
import { DailyboardRegistry } from "../types/dailyboard.registry";
import { LayoutMetrics } from "../../ui-layout/types/layout.metrics";
import { useMetricsContext } from "../../ui-shared/hooks/useMetricsContext";
import { useLayoutContext } from "../../ui-layout/hooks/useLayoutContext";

export const useDailyboardMetrics = (metricsId: string, registry: DailyboardRegistry) : DailyboardMetrics => {
    const { metrics: layoutMetrics } = useLayoutContext();

    const { subscribe, unsubscribe } = useMetricsContext();
    const metrics = React.useRef<DailyboardMetrics>({ value: null });

    React.useEffect(() => {
        subscribe(metricsId, () => {
            metrics.current.value = calculateDailyboardMetrics({layout: layoutMetrics});
            applyDailyboardMetrics({registry, metrics: metrics.current!});
        });

        return () => {
            unsubscribe(metricsId);
        }
    }, [metricsId, registry, layoutMetrics]);

    return metrics.current!;
}