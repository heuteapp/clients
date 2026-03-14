import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardMetricsValue } from "@/src/core/types/domain/board/board.metrics";

export function applyBoardMetrics({ registry, metrics }: { registry: BoardRegistry, metrics: BoardMetricsValue }) {
    const layout = registry.layout;
    const layoutElement = layout.ref?.current;
    if (!layoutElement) return;

    const { sectionContainerValue, sectionValue } = metrics.layout!;


    layoutElement.style.setProperty("--cell-size-full", `${sectionValue.gridValue.cellValue.size.full}px`);
    layoutElement.style.setProperty("--cell-size-inner", `${sectionValue.gridValue.cellValue.size.inner}px`);
    layoutElement.style.setProperty("--cell-size-compact", `${sectionValue.gridValue.cellValue.size.compact}px`);

    layoutElement.style.setProperty("--grid-spacing-padding", `${sectionValue.gridValue.spacing.padding}px`);
    layoutElement.style.setProperty("--grid-max-width", `${sectionValue.gridValue.size.width}px`);
    layoutElement.style.setProperty("--grid-max-height", `${sectionValue.gridValue.size.height}px`);

    layoutElement.style.setProperty("--container-width", `${sectionContainerValue.size.width}px`);
    layoutElement.style.setProperty("--container-height", `${sectionContainerValue.size.height}px`);

    const rootRect = layoutElement.getBoundingClientRect();
    const layoutSectionContainer = layout.sectionContainer;

    if (!layoutSectionContainer?.ref?.current) return;

    layoutSectionContainer.sections.forEach(section => {
        const sectionGrid = section.grid;
        if (!sectionGrid?.ref?.current) return;

        const sectionRect = sectionGrid.ref.current.getBoundingClientRect();
        const cards = registry.getBoardCardsForSection(section.props!.id) ?? [];

        const gridSize = {
            width: metrics.layout!.sectionValue.gridValue.size.width / (metrics.layout!.sectionValue.gridValue.cellCount.horizontal / section.props!.position.colSpan),
            height: metrics.layout!.sectionValue.gridValue.size.height / (metrics.layout!.sectionValue.gridValue.cellCount.vertical / section.props!.position.rowSpan)
        }

        const gap = metrics.layout!.sectionValue.gridValue.spacing.padding;

        const localGridRect = {
            left: (sectionRect.left - rootRect.left) + gap,
            top: (sectionRect.top - rootRect.top) + gap,
            width: gridSize.width - gap * 2,
            height: gridSize.height - gap * 2
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

            console.log(position);

            cardElement.style.setProperty("--card-left", `${position.left}px`);
            cardElement.style.setProperty("--card-top", `${position.top}px`);
            cardElement.style.setProperty("--card-width", `${position.width}px`);
            cardElement.style.setProperty("--card-height", `${position.height}px`);
        });
    });
}
