import { BoardMetricsContext } from "@/src/core/types/domain/board/board.metrics";
import { LayoutMetricsValue, LayoutMetricsTotalSpacing, LayoutMetricsGridFullSize } from "@/src/core/types/domain/layout/layout.metrics";

export function computeLayoutMetrics(context: BoardMetricsContext): LayoutMetricsValue | undefined {
    const { layoutSize, content, theme } = context;
    const { layout, sections } = content;
    const { sections: sectionStyles } = theme;

    if (sections.length === 0) return;

    const maxRow = Math.max(...sections.map(s => s.position.rowIndex + s.position.rowSpan - 1));
    const maxCol = Math.max(...sections.map(s => s.position.colIndex + s.position.colSpan - 1));

    const sectionCount = {
        horizontal: 0,
        vertical: 0,
    };

    sectionCount.horizontal = Array.from({ length: maxRow }, (_, rowIndex) => 
        sections.reduce((count, s) => {
            const rowStart = s.position.rowIndex;
            const rowEnd = s.position.rowIndex + s.position.rowSpan - 1;
            return count + (rowIndex + 1 >= rowStart && rowIndex + 1 <= rowEnd ? 1 : 0);
        }, 0)
    ).reduce((max, curr) => Math.max(max, curr), 0);

    sectionCount.vertical = Array.from({ length: maxCol }, (_, colIndex) => 
        sections.reduce((count, s) => {
            const colStart = s.position.colIndex;
            const colEnd = s.position.colIndex + s.position.colSpan - 1;
            return count + (colIndex + 1 >= colStart && colIndex + 1 <= colEnd ? 1 : 0);
        }, 0)
    ).reduce((max, curr) => Math.max(max, curr), 0);

    const totalSpacing: LayoutMetricsTotalSpacing = {
        horizontal: { padding: 0, margin: 0 },
        vertical: { padding: 0, margin: 0 },
    };

    sections.forEach((s) => {
        const style = sectionStyles.find(st => st.name === s.name);
        if (!style) return;

        const box = style.box;

        const hPadding = (box.padding?.left || 0) + (box.padding?.right || 0);
        const vPadding = (box.padding?.top || 0) + (box.padding?.bottom || 0);

        const hMargin = (box.margin?.left || 0) + (box.margin?.right || 0);
        const vMargin = (box.margin?.top || 0) + (box.margin?.bottom || 0);

        totalSpacing.horizontal.padding += hPadding;
        totalSpacing.horizontal.margin += hMargin;
        totalSpacing.vertical.padding += vPadding;
        totalSpacing.vertical.margin += vMargin;
    });

    const totalWidth = layoutSize.width / sectionCount.vertical;
    const totalHeight = layoutSize.height / sectionCount.horizontal;

    const innerWidth = (layoutSize.width + totalSpacing.horizontal.padding + totalSpacing.horizontal.margin) / sectionCount.vertical;
    const innerHeight = (layoutSize.height + totalSpacing.vertical.padding + totalSpacing.vertical.margin) / sectionCount.horizontal;

    const gridCellSize = {
        total: Math.min(totalWidth, totalHeight),
        inner: Math.min(innerWidth, innerHeight),
        compact: Math.min(innerWidth, innerHeight) * 0.9,
    };

    const gridTotalSize: LayoutMetricsGridFullSize = {
        width: gridCellSize.inner * (layout?.columnCount || 0),
        height: gridCellSize.inner * (layout?.rowCount || 0),
    };

    const metricsValue: LayoutMetricsValue = {
        sectionCount,
        totalSpacing,
        gridCellSize,
        gridTotalSize,
    };

    return metricsValue;
}