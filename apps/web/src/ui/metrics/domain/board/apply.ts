import { BoardRegistry } from "@/src/ui/types/board/board.registry";
import { BoardMetricsValue } from "@/src/core/types/domain/board/board.metrics";
import { BoardThemeManager } from "@/src/ui/types/board/board.theme";

export function applyBoardMetrics(registry: BoardRegistry, themeManager: BoardThemeManager, metricsValue: BoardMetricsValue) {
    const layout = registry.layout;
    if(!layout) return;

    const layoutElement = layout.ref.current;
    if (!layoutElement) return;

    if(!metricsValue.layout) return;

    const { gridCellSize, gridFullSize, sectionContainerSize } = metricsValue.layout;

    layoutElement.style.setProperty("--cell-size-full", `${gridCellSize.total}px`);
    layoutElement.style.setProperty("--cell-size-inner", `${gridCellSize.inner}px`);
    layoutElement.style.setProperty("--cell-size-compact", `${gridCellSize.compact}px`);

    layoutElement.style.setProperty("--grid-max-width", `${gridFullSize.width}px`);
    layoutElement.style.setProperty("--grid-max-height", `${gridFullSize.height}px`);

    layoutElement.style.setProperty("--container-width", `${sectionContainerSize.width}px`);
    layoutElement.style.setProperty("--container-height", `${sectionContainerSize.height}px`);

    const layoutRect = layoutElement.getBoundingClientRect();

    layout.sections.forEach(section => {
        const sectionElement = section.ref?.current;
        if(!sectionElement) return;

        const gridElement = section.grid?.ref?.current;
        if (!gridElement) return;

        const sectionStyle = themeManager.current!.sections.find(s => s.name === section.props!.name);

        const sectionPadding = {
            left: sectionStyle?.box.padding?.left || 0,
            top: sectionStyle?.box.padding?.top || 0,
            right: sectionStyle?.box.padding?.right || 0,
            bottom: sectionStyle?.box.padding?.bottom || 0,
        };

        const sectionMargin = {
            left: sectionStyle?.box.margin?.left || 0,
            top: sectionStyle?.box.margin?.top || 0,
            right: sectionStyle?.box.margin?.right || 0,
            bottom: sectionStyle?.box.margin?.bottom || 0,
        }

        sectionElement.style.setProperty("--section-padding", `${sectionPadding.top}px ${sectionPadding.right}px ${sectionPadding.bottom}px ${sectionPadding.left}px`);
        sectionElement.style.setProperty("--section-margin", `${sectionMargin.top}px ${sectionMargin.right}px ${sectionMargin.bottom}px ${sectionMargin.left}px`);

        const sectionGrid = section.grid;
        if (!sectionGrid?.ref?.current) return;

        const cards = registry.getBoardCardsForSection(section.props!.id) ?? [];

        const gridRect = gridElement.getBoundingClientRect();

        const gap = layoutRect.width * 0.005; // 1% of layout width as gap

        const localGridRect = {
            left: (gridRect.left) + gap,
            top: (gridRect.top) + gap,
            width: gridRect.width - gap * 2,
            height: gridRect.height - gap * 2
        }

        const stepSize = {
            width: localGridRect.width / section.props!.position.colSpan,
            height: localGridRect.height / section.props!.position.rowSpan
        }


        cards.forEach(card => {
            const cardElement = card.ref?.current;
            if (!cardElement) return;

            const props = card.props!;

            const placement = props.placement;
            if (!placement) return;

            const gridPosition = placement.position;
            if(!gridPosition) return;

            const rawPosition = {
                left: localGridRect.left + (gridPosition.colIndex - 1) * stepSize.width,
                top: localGridRect.top + (gridPosition.rowIndex - 1) * stepSize.height,
                width: gridPosition.colSpan * stepSize.width,
                height: gridPosition.rowSpan * stepSize.height,
            }

            const position = {
                left: rawPosition.left + gap,
                top: rawPosition.top + gap,
                width: rawPosition.width - gap * 2,
                height: rawPosition.height - gap * 2
            }

            cardElement.style.setProperty("--card-left", `${position.left}px`);
            cardElement.style.setProperty("--card-top", `${position.top}px`);
            cardElement.style.setProperty("--card-width", `${position.width}px`);
            cardElement.style.setProperty("--card-height", `${position.height}px`);
        });
    });
}
