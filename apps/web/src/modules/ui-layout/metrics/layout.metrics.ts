import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";
import { LayoutMetrics } from "../types/layout.metrics";
import { LayoutRegistry } from "../types/layout.registry";

export function calculateLayoutMetrics(registry: LayoutRegistry, dataSource: StoredLayoutData | null, styleSource: StoredLayoutStyle | null) : LayoutMetrics | null {
    const layoutRef = registry.layout.ref;
    const layoutEl = layoutRef.current;

    if(!layoutEl) {
        return null;
    }

    const layout = registry.layout;

    if (!layout.props) {
        return null;
    }

    return {
        cellSize: {
            layout: layoutCellSize,
            grid: gridCellSize,
        }
    }
}

export function applyLayoutMetrics(registry: LayoutRegistry, metrics: LayoutMetrics) {
    const layoutRef = registry.layout.ref;
    const layoutEl = layoutRef.current;

    if (!layoutEl) {
        return;
    }

    const layoutCellSize = metrics.cellSize.layout;
    const gridCellSize = metrics.cellSize.grid;

    layoutEl.style.setProperty("--layout-cell-size", `${layoutCellSize}px`);
    layoutEl.style.setProperty("--grid-cell-size", `${gridCellSize}px`);
}