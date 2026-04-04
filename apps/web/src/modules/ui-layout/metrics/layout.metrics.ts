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

    const cellFullSize = Math.min(
        layoutWidth / colCount,
        layoutHeight / rowCount
    );

    const cellSizeInner = cellFullSize - totalGap;

    return {
        cellSize: {
            full: cellFullSize,
            inner: cellSizeInner,
        }
    }
}

export function applyLayoutMetrics(registry: LayoutRegistry, metrics: LayoutMetrics) {
    const layoutRef = registry.layout.ref;
    const layoutEl = layoutRef.current;

    if (!layoutEl) {
        return;
    }

    const cellSizeFull = metrics.cellSize.full;
    const cellSizeInner = metrics.cellSize.inner;

    layoutEl.style.setProperty("--cell-size-full", `${cellSizeFull}px`);
    layoutEl.style.setProperty("--cell-size-inner", `${cellSizeInner}px`);
}