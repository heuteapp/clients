import { LayoutMetrics } from "../types/layout.metrics";
import { LayoutRegistry } from "../types/layout.registry";

export function calculateLayoutMetrics(registry: LayoutRegistry) : LayoutMetrics | null {
    const layoutRef = registry.layout.ref;
    const layoutEl = layoutRef.current;

    if(!layoutEl) {
        return null;
    }

    const layout = registry.layout;

    if (!layout.props) {
        return null;
    }

    const { clientWidth: layoutWidth, clientHeight: layoutHeight } = layoutEl;
    const { colCount, rowCount } = layout.props.data;


    const totalGap = 16;

    const layoutCellSize = Math.min(
        layoutWidth / colCount,
        layoutHeight / rowCount
    );
    
    const gridCellSize = layoutCellSize - totalGap;

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