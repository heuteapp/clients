import { BoardMetricsContext } from "@/src/types/core/domain/board/board.metrics";
import { LayoutMetricsValue, LayoutMetricsTotalSpacing, LayoutMetricsGridFullSize, LayoutMetricsSectionContainerSize } from "@/src/types/core/domain/layout/layout.metrics";

export function computeLayoutMetrics(context: BoardMetricsContext): LayoutMetricsValue | undefined {
    const { layoutSize, content, theme } = context;
    const { layout, sections } = content;
    const { sections: sectionStyles } = theme;

    if(!layout) return;

    if (sections.length === 0) return;

    const sectionCount = {
        horizontal: 0,
        vertical: 0,
    };

    const getMaxOverlap = (axis: 'row' | 'col') => {
        const maxIndex = Math.max(...sections.map(s => 
            axis === 'row' 
                ? s.position.rowIndex + s.position.rowSpan - 1 
                : s.position.colIndex + s.position.colSpan - 1
        ));

        return Math.max(
            ...Array.from({ length: maxIndex }, (_, i) => 
                sections.reduce((count, s) => {
                    const start = axis === 'row' 
                    ? s.position.rowIndex : s.position.colIndex;
                    
                    const end = axis === 'row' 
                    ? s.position.rowIndex + s.position.rowSpan - 1 : s.position.colIndex + s.position.colSpan - 1;
                    return count + (i + 1 >= start && i + 1 <= end ? 1 : 0);
                }, 0)
            )
        );
    };

    sectionCount.horizontal = getMaxOverlap('row');
    sectionCount.vertical = getMaxOverlap('col');

    const totalSpacing: LayoutMetricsTotalSpacing = {
        horizontal: { padding: 0, margin: 0 },
        vertical: { padding: 0, margin: 0 },
    };

    const totalWidth = (layoutSize.width - totalSpacing.horizontal.margin)  / layout.columnCount;
    const totalHeight = (layoutSize.height - totalSpacing.vertical.margin) / layout.rowCount;

    const stepSize = Math.min(totalWidth, totalHeight);

    let minInnerWidth = Infinity;
    let minInnerHeight = Infinity;

    sections.forEach(s => {
        const style = sectionStyles.find(st => st.name === s.name);
        if (!style) return;

        const box = style.box;

        const hPadding = (box.padding?.left || 0) + (box.padding?.right || 0);
        const vPadding = (box.padding?.top || 0) + (box.padding?.bottom || 0);

        const hMargin = (box.margin?.left || 0) + (box.margin?.right || 0);
        const vMargin = (box.margin?.top || 0) + (box.margin?.bottom || 0);

        totalSpacing.horizontal.padding = Math.max(totalSpacing.horizontal.padding, hPadding);
        totalSpacing.vertical.padding = Math.max(totalSpacing.vertical.padding, vPadding);

        totalSpacing.horizontal.margin = Math.max(totalSpacing.horizontal.margin, hMargin);
        totalSpacing.vertical.margin = Math.max(totalSpacing.vertical.margin, vMargin);

        const colSpan = s.position.colSpan;
        const rowSpan = s.position.rowSpan;

        const sectionWidth = colSpan * stepSize;
        const sectionHeight = rowSpan * stepSize;

        const innerWidth = (sectionWidth - (totalSpacing.horizontal.padding + totalSpacing.horizontal.margin)) / colSpan;
        const innerHeight = (sectionHeight - (totalSpacing.vertical.padding + totalSpacing.vertical.margin)) / rowSpan;

        minInnerWidth = Math.min(minInnerWidth, innerWidth);
        minInnerHeight = Math.min(minInnerHeight, innerHeight);
    });

    const gridCellSize = {
        total: Math.min(totalWidth, totalHeight),
        inner: Math.min(minInnerWidth, minInnerHeight),
        compact: Math.min(minInnerWidth, minInnerHeight) * 0.9,
    };

    const gridFullSize: LayoutMetricsGridFullSize = {
        width: gridCellSize.inner * layout.columnCount,
        height: gridCellSize.inner * layout.rowCount,
    };

    const sectionContainerFullSize: LayoutMetricsSectionContainerSize = {
        width: gridFullSize.width + totalSpacing.horizontal.padding + totalSpacing.horizontal.margin,
        height: gridFullSize.height + totalSpacing.vertical.padding + totalSpacing.vertical.margin,
    };

    const metricsValue: LayoutMetricsValue = {
        sectionCount,
        totalSpacing,
        gridCellSize,
        gridFullSize,
        sectionContainerSize: sectionContainerFullSize
    };

    return metricsValue;
}