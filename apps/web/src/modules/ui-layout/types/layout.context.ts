import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";
import { LayoutRegistry } from "./layout.registry";
import { LayoutMetrics } from "./layout.metrics";

export interface LayoutContextValue {
    dataSource: StoredLayoutData | null;
    styleSource: StoredLayoutStyle | null;
    registry: LayoutRegistry;    
    metrics: LayoutMetrics;
}