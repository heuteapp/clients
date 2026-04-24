import React from "react";
import { BoardMetrics } from "../types/board.metrics";
import { applyBoardMetrics, calculateBoardMetrics } from "../metrics/board.metrics";
import { BoardRegistry } from "../types/board.registry";
import { useMetricsContext } from "../../ui-shared/hooks/useMetricsContext";
import { useCanvasContext } from "../../ui-canvas/hooks/useCanvasContext";

export const useBoardMetrics = (metricsId: string, registry: BoardRegistry) : BoardMetrics => {
    const { metrics: canvasMetrics } = useCanvasContext();

    const { subscribe, unsubscribe } = useMetricsContext();
    const metrics = React.useRef<BoardMetrics>({ value: null });

    React.useEffect(() => {
        subscribe(metricsId, () => {
            metrics.current.value = calculateBoardMetrics({canvas: canvasMetrics.value});
            applyBoardMetrics({registry, metrics: metrics.current!});
        });

        return () => {
            unsubscribe(metricsId);
        }
    }, [metricsId, registry, canvasMetrics]);

    return metrics.current!;
}