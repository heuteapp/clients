import { LayoutContextValue } from "../types/layout.context";
import { LayoutMetrics } from "../types/layout.metrics";

export function calculateLayoutMetrics(contextValue: LayoutContextValue) : LayoutMetrics | null {
    const { rootRef } = contextValue;

    const rootEl = rootRef.current;

    if(!rootEl) {
        return null;
    }

    const rootRect = rootEl.getBoundingClientRect();

    const layout = contextValue.registry.layout;

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