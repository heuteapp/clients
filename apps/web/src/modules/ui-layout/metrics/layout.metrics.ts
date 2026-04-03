import { LayoutMetrics } from "../types/layout.metrics";
import { LayoutRegistry } from "../types/layout.registry";

export function calculateLayoutMetrics(registry: LayoutRegistry) : LayoutMetrics | null {
    const rootRef = registry.layout.ref;
    const rootEl = rootRef.current;

    if(!rootEl) {
        return null;
    }

    const rootRect = rootEl.getBoundingClientRect();

    const layout = registry.layout;

    if (!layout.props) {
        return null;
    }

    const { colCount, rowCount } = layout.props.data;

    const cellWidth = rootRect.width / colCount;
    const cellHeight = rootRect.height / rowCount;

    const cellSize = Math.min(cellWidth, cellHeight);

    return {
        cellSize: {
            full: cellSize,
            inner: cellSize * 0.9,
        }
    }
}

export function applyLayoutMetrics(registry: LayoutRegistry, metrics: LayoutMetrics) {
    const layoutRef = registry.layout.ref;
    const layoutEl = layoutRef.current;

    if (!layoutEl) {
        return;
    }

    const cellSize = metrics.cellSize.full;

    layoutEl.style.setProperty("--cell-size", `${cellSize}px`);
}