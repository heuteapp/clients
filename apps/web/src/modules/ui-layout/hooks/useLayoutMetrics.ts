import React from "react";
import { LayoutMetrics } from "../types/layout.metrics";
import { applyLayoutMetrics, calculateLayoutMetrics } from "../metrics/layout.metrics";
import { LayoutRegistry } from "../types/layout.registry";
import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";
import { useMetricsContext } from "../../ui-shared/hooks/useMetricsContext";

export const useLayoutMetrics = (registry: LayoutRegistry, dataSource: StoredLayoutData | null, styleSource: StoredLayoutStyle | null) : LayoutMetrics => {
    const { subscribe, unsubscribe } = useMetricsContext();
    const metrics = React.useRef<LayoutMetrics>(null);

    React.useEffect(() => {
        subscribe("layout", () => {
            metrics.current = calculateLayoutMetrics({ registry, dataSource, styleSource });
            applyLayoutMetrics({ registry, metrics: metrics.current!, styleSource });
        });

        return () => {
            unsubscribe("layout");
        }
    }, [registry, dataSource, styleSource]);

    return metrics.current!;
}