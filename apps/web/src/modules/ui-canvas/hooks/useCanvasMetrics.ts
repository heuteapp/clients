import React from "react";
import { CanvasMetrics } from "../types/canvas.metrics";
import { applyCanvasMetrics, calculateCanvasMetrics } from "../metrics/canvas.metrics";
import { CanvasRegistry } from "../types/canvas.registry";
import { StoredCanvasData, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { useMetricsContext } from "../../ui-shared/hooks/useMetricsContext";

export const useCanvasMetrics = (metricsId: string, registry: CanvasRegistry, dataSource: StoredCanvasData | null, styleSource: StoredCanvasStyle | null) : CanvasMetrics => {
    const { subscribe, unsubscribe } = useMetricsContext();
    const metrics = React.useRef<CanvasMetrics>({ value: null });

    React.useEffect(() => {
        subscribe(metricsId, () => {
            metrics.current.value = calculateCanvasMetrics({ registry, dataSource, styleSource });
            applyCanvasMetrics({ registry, metrics: metrics.current!, styleSource });
        });

        return () => {
            unsubscribe(metricsId);
        }
    }, [metricsId, registry, dataSource, styleSource]);

    return metrics.current!;
}