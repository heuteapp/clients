import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types"
import { LayoutRegistry } from "./layout.registry"

export interface LayoutMetrics {
    value: LayoutMetricsValue | null;
}

export interface LayoutMetricsValue {
    viewSize: {
        width: number;
        height: number;
    },
    cellSize: {
        layout: number,
        grid: number,
    }
}

export interface CalculateLayoutMetricsProps {
    registry: LayoutRegistry, 
    dataSource: StoredLayoutData | null, 
    styleSource: StoredLayoutStyle | null
}

export interface ApplyLayoutMetricsProps {
    registry: LayoutRegistry,
    metrics: LayoutMetrics
    styleSource: StoredLayoutStyle | null
}