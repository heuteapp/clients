import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";
import { LayoutMetrics } from "../types/layout.metrics";
import { LayoutRegistry } from "../types/layout.registry";
import { normalizeEdgeInsets } from "../../shared/utils/style";

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

    const { clientWidth: layoutWidth, clientHeight: layoutHeight } = layoutEl;

    const layoutCellWidth = layoutWidth / layout.props.data.colCount;
    const layoutCellHeight = layoutHeight / layout.props.data.rowCount;

    const layoutCellSize = Math.min(layoutCellWidth, layoutCellHeight);

    const sections = dataSource?.sections || [];
    const sectionStyles = styleSource?.sections || [];

    let gridCellSize = layoutCellSize;

    sections.forEach(section => {
        const style = sectionStyles.find(s => s.id === section.id);

        const colSpan = section.position.colSpan;
        const rowSpan = section.position.rowSpan;

        const width = colSpan * layoutCellSize;
        const height = rowSpan * layoutCellSize;

        const padding = normalizeEdgeInsets(style?.box.padding);
        const totalPaddingX = padding.left + padding.right;
        const totalPaddingY = padding.top + padding.bottom;

        const margin = normalizeEdgeInsets(style?.box.margin);
        const totalMarginX = margin.left + margin.right;
        const totalMarginY = margin.top + margin.bottom;

        const totalSpacingX = totalPaddingX + totalMarginX;
        const totalSpacingY = totalPaddingY + totalMarginY;

        const contentWidth = width - totalSpacingX - 2;
        const contentHeight = height - totalSpacingY - 2;

        const cellWidth = contentWidth / colSpan;
        const cellHeight = contentHeight / rowSpan;

        const cellSize = Math.min(cellWidth, cellHeight);

        if (cellSize < gridCellSize) {
            gridCellSize = cellSize;
        }
    });

    return {
        cellSize: {
            layout: layoutCellSize,
            grid: gridCellSize,
        }
    }
}

export function applyLayoutMetrics(registry: LayoutRegistry, metrics: LayoutMetrics, styleSource: StoredLayoutStyle | null) {
    const layoutRef = registry.layout.ref;
    const layoutEl = layoutRef.current;

    if (!layoutEl) {
        return;
    }

    const layoutCellSize = metrics.cellSize.layout;
    const gridCellSize = metrics.cellSize.grid;

    layoutEl.style.setProperty("--layout-cell-size", `${layoutCellSize}px`);
    layoutEl.style.setProperty("--grid-cell-size", `${gridCellSize}px`);

    registry.getLayoutSections()?.forEach(section => {
        const style = styleSource?.sections.find(s => s.id === section.props?.data.id);

        const padding = normalizeEdgeInsets(style?.box.padding);
        const margin = normalizeEdgeInsets(style?.box.margin);

        const el = section.ref?.current;
        if(el) {
            el.style.padding = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;
            el.style.margin = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`;
        }
    });
}