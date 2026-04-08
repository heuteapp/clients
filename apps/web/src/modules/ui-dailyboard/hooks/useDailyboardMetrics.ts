import React from "react";
import { DailyboardMetrics } from "../types/dailyboard.metrics";
import { applyDailyboardMetrics, calculateDailyboardMetrics } from "../metrics/dailyboard.metrics";
import { DailyboardRegistry } from "../types/dailyboard.registry";
import { LayoutMetrics } from "../../ui-layout/types/layout.metrics";

export const useDailyboardMetrics = (registry: DailyboardRegistry, layoutMetrics: LayoutMetrics) : DailyboardMetrics => {
    const metrics = React.useRef<DailyboardMetrics>(null);

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            metrics.current = calculateDailyboardMetrics(layoutMetrics);
            applyDailyboardMetrics(registry, metrics.current!);
        });

        resizeObserver.observe(document.body);

        return () => {
            resizeObserver.disconnect();
        }
    }, [registry, layoutMetrics]);

    return metrics.current!;
}