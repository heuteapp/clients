import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";
import { useLayoutMetrics } from "../../ui-layout/hooks/useLayoutMetrics";
import { LayoutRegistry } from "../../ui-layout/types/layout.registry";
import { DailyboardMetrics } from "../types/dailyboard.metrics";

export const calcDailyboardMetrics = (registry: LayoutRegistry, dataSource: StoredLayoutData | null, styleSource: StoredLayoutStyle | null) : DailyboardMetrics => {
    
    const layoutMetrics = useLayoutMetrics(registry, dataSource, styleSource);

    return {
        layout: layoutMetrics
    }
}