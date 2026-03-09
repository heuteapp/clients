import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardMetrics } from "@/src/ui/types/board/board.dom";

export function applyBoardMetricsToDOM({ registry, metrics }: { registry: BoardRegistry, metrics: BoardMetrics }) {
    const layout = registry.layout;
    const layoutElement = layout.ref?.current;
    if (!layoutElement) return;

    const { layoutGridCellsCount, layoutGridCellSize, layoutGridSize, layoutSectionContainerSize } = metrics;

    layoutElement.style.setProperty("--cell-size-full", `${layoutGridCellSize.full}px`);
    layoutElement.style.setProperty("--cell-size-inner", `${layoutGridCellSize.inner}px`);
    layoutElement.style.setProperty("--cell-size-compact", `${layoutGridCellSize.compact}px`);

    layoutElement.style.setProperty("--grid-max-width", `${layoutGridSize.width}px`);
    layoutElement.style.setProperty("--grid-max-height", `${layoutGridSize.height}px`);

    layoutElement.style.setProperty("--container-width", `${layoutSectionContainerSize.width}px`);
    layoutElement.style.setProperty("--container-height", `${layoutSectionContainerSize.height}px`);

    const rootRect = layoutElement.getBoundingClientRect();
    const layoutSectionContainer = layout.sectionContainer;
    if (!layoutSectionContainer?.ref?.current) return;

    layoutSectionContainer.sections.forEach(section => {
        const sectionGrid = section.grid;
        if (!sectionGrid?.ref?.current) return;

        const sectionRect = sectionGrid.ref.current.getBoundingClientRect();
        const cards = registry.getBoardCardsForSection(section.props!.id) ?? [];

        const gap = 6;
        const stepSize = {
            width: layoutGridSize.width / (layoutGridCellsCount.horizontal / section.props!.colSpan),
            height: layoutGridSize.height / (layoutGridCellsCount.vertical / section.props!.rowSpan)
        };

        cards.forEach(card => {
            const cardElement = card.ref?.current;
            if (!cardElement) return;

            const props = card.props!;
            const rawPosition = {
                left: sectionRect.left - rootRect.left + (props.colIndex - 1) * stepSize.width,
                top: sectionRect.top - rootRect.top + (props.rowIndex - 1) * stepSize.height,
                width: props.colSpan * stepSize.width,
                height: props.rowSpan * stepSize.height
            };

            const position = {
                left: rawPosition.left + gap,
                top: rawPosition.top + gap,
                width: rawPosition.width - gap * 2,
                height: rawPosition.height - gap * 2
            };

            cardElement.style.setProperty("--card-left", `${position.left}px`);
            cardElement.style.setProperty("--card-top", `${position.top}px`);
            cardElement.style.setProperty("--card-width", `${position.width}px`);
            cardElement.style.setProperty("--card-height", `${position.height}px`);
        });
    });
}