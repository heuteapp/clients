import React from "react";
import { CanvasMetrics } from "../types/canvas.metrics";
import { applyCanvasMetrics, calculateCanvasMetrics } from "../metrics/canvas.metrics";
import { StoredCanvasModel, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { useMetricsContext } from "../../ui-shared/hooks/useMetricsContext";
import { TracingDomainSelector } from "../../t-shared/types/tracing.types";

export const useCanvasMetrics = (metricsId: string, selector: TracingDomainSelector, dataSource: StoredCanvasModel | null, styleSource: StoredCanvasStyle | null) : CanvasMetrics => {
    const { subscribe, unsubscribe } = useMetricsContext();
    const metrics = React.useRef<CanvasMetrics>({ value: null });

    React.useEffect(() => {
        subscribe(metricsId, () => {
            metrics.current.value = calculateCanvasMetrics({ selector, dataSource, styleSource });
            applyCanvasMetrics({ selector, metrics: metrics.current!, styleSource });
        });

        return () => {
            unsubscribe(metricsId);
        }
    }, [metricsId, selector, dataSource, styleSource]);

    return metrics.current!;
}