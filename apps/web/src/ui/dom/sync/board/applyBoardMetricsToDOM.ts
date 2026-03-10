import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardMetricsValue } from "@/src/ui/types/board/board.metrics";

export function applyBoardMetricsToDOM({ registry, metrics }: { registry: BoardRegistry, metrics: BoardMetricsValue }) {
    const layout = registry.layout;
    const layoutElement = layout.ref?.current;
    if (!layoutElement) return;

    const { gridCellSize, gridSize, sectionContainerSize } = metrics.layout;

    layoutElement.style.setProperty("--cell-size-full", `${gridCellSize.full}px`);
    layoutElement.style.setProperty("--cell-size-inner", `${gridCellSize.inner}px`);
    layoutElement.style.setProperty("--cell-size-compact", `${gridCellSize.compact}px`);

    layoutElement.style.setProperty("--grid-max-width", `${gridSize.width}px`);
    layoutElement.style.setProperty("--grid-max-height", `${gridSize.height}px`);

    layoutElement.style.setProperty("--container-width", `${sectionContainerSize.width}px`);
    layoutElement.style.setProperty("--container-height", `${sectionContainerSize.height}px`);

    const rootRect = layoutElement.getBoundingClientRect();
    const layoutSectionContainer = layout.sectionContainer;

    if (!layoutSectionContainer?.ref?.current) return;

    layoutSectionContainer.sections.forEach(section => {
        const sectionGrid = section.grid;
        if (!sectionGrid?.ref?.current) return;

        const sectionRect = sectionGrid.ref.current.getBoundingClientRect();
        const cards = registry.getBoardCardsForSection(section.props!.id) ?? [];

        const gridSize = {
            width: metrics.layout.gridSize.width / (metrics.layout.gridCellsCount.horizontal / section.props!.colSpan),
            height: metrics.layout.gridSize.height / (metrics.layout.gridCellsCount.vertical / section.props!.rowSpan)
        }

        const gap = 6;

        const gridRect = {
            left: (sectionRect.left - rootRect.left) + gap,
            top: (sectionRect.top - rootRect.top) + gap,
            width: gridSize.width - gap * 2,
            height: gridSize.height - gap * 2
        }

        const stepSize = {
            width: gridRect.width / section.props!.colSpan,
            height: gridRect.height / section.props!.rowSpan
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
                left: gridRect.left + (gridPosition.colIndex - 1) * stepSize.width,
                top: gridRect.top + (gridPosition.rowIndex - 1) * stepSize.height,
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