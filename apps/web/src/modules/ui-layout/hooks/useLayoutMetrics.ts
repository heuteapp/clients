import React from "react";
import { LayoutMetrics } from "../types/layout.metrics";
import { applyLayoutMetrics, calculateLayoutMetrics } from "../metrics/layout.metrics";
import { LayoutRegistry } from "../types/layout.registry";
import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";

export const useLayoutMetrics = (registry: LayoutRegistry, dataSource: StoredLayoutData | null, styleSource: StoredLayoutStyle | null) : LayoutMetrics => {
    const metrics = React.useRef<LayoutMetrics>(null);

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            metrics.current = calculateLayoutMetrics(registry, dataSource, styleSource);
            applyLayoutMetrics(registry, metrics.current!);
        });

        if (registry.layout.ref.current) {
            resizeObserver.observe(registry.layout.ref.current);
        }

        return () => {
            resizeObserver.disconnect();
        }
    }, [dataSource, styleSource]);

    return metrics.current!;
}