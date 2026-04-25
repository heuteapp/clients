import React from "react";
import { BoardMetrics } from "../types/board.metrics";
import { applyBoardMetrics, calculateBoardMetrics } from "../metrics/board.metrics";
import { useMetricsContext } from "../../ui-core/hooks/useMetricsContext";
import { useCanvasContext } from "../../ux-canvas/hooks/useCanvasContext";
import { TracingDomainSelector } from "../../t-core/types/tracing.types";

export const useBoardMetrics = (metricsId: string, selector: TracingDomainSelector) : BoardMetrics => {
    const { metrics: canvasMetrics } = useCanvasContext();

    const { subscribe, unsubscribe } = useMetricsContext();
    const metrics = React.useRef<BoardMetrics>({ value: null });

    React.useEffect(() => {
        subscribe(metricsId, () => {
            metrics.current.value = calculateBoardMetrics({canvas: canvasMetrics.value});
            applyBoardMetrics({selector, metrics: metrics.current!});
        });

        return () => {
            unsubscribe(metricsId);
        }
    }, [metricsId, selector, canvasMetrics]);

    return metrics.current!;
}