import React from "react";
import { DailyboardMetrics } from "../types/dailyboard.metrics";
import { applyDailyboardMetrics, calculateDailyboardMetrics } from "../metrics/dailyboard.metrics";
import { DailyboardRegistry } from "../types/dailyboard.registry";
import { useMetricsContext } from "../../ui-shared/hooks/useMetricsContext";
import { useCanvasContext } from "../../ui-canvas/hooks/useCanvasContext";

export const useDailyboardMetrics = (metricsId: string, registry: DailyboardRegistry) : DailyboardMetrics => {
    const { metrics: canvasMetrics } = useCanvasContext();

    const { subscribe, unsubscribe } = useMetricsContext();
    const metrics = React.useRef<DailyboardMetrics>({ value: null });

    React.useEffect(() => {
        subscribe(metricsId, () => {
            metrics.current.value = calculateDailyboardMetrics({canvas: canvasMetrics.value});
            applyDailyboardMetrics({registry, metrics: metrics.current!});
        });

        return () => {
            unsubscribe(metricsId);
        }
    }, [metricsId, registry, canvasMetrics]);

    return metrics.current!;
}