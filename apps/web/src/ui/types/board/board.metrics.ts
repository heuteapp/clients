import { LayoutMetricsValue } from "@/src/ui/types/layout/layout.metrics";

export type BoardMetrics = React.RefObject<BoardMetricsValue | null>

export type BoardMetricsValue = {
    layout: LayoutMetricsValue
}