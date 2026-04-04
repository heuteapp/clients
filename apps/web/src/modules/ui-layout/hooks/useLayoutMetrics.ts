import React from "react";
import { LayoutMetrics } from "../types/layout.metrics";
import { applyLayoutMetrics, calculateLayoutMetrics } from "../metrics/layout.metrics";
import { LayoutRegistry } from "../types/layout.registry";

export const useLayoutMetrics = (registry: LayoutRegistry) : LayoutMetrics => {
    const metrics = React.useRef<LayoutMetrics>(null);

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            metrics.current = calculateLayoutMetrics(registry);
            applyLayoutMetrics(registry, metrics.current!);
        });

        if (registry.layout.ref.current) {
            resizeObserver.observe(registry.layout.ref.current);
        }

        return () => {
            resizeObserver.disconnect();
        }
    });

    return metrics.current!;
}