import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
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

    const rootRect = layoutElement.getBoundingClientRect();
    const layoutSectionContainer = layout.sectionContainer;

    if (!layoutSectionContainer?.ref?.current) return;

    layoutSectionContainer.sections.forEach(section => {
        const sectionElement = section.ref?.current;
        if(!sectionElement) return;

        const sectionStyle = themeManager.current!.sections.find(s => s.name === section.props!.name);

        if(sectionStyle) {
            sectionElement.style.setProperty("--section-padding-left", `${sectionStyle?.box.padding?.left || 0}px`);
            sectionElement.style.setProperty("--section-padding-top", `${sectionStyle?.box.padding?.top || 0}px`);
            sectionElement.style.setProperty("--section-padding-right", `${sectionStyle?.box.padding?.right || 0}px`);
            sectionElement.style.setProperty("--section-padding-bottom", `${sectionStyle?.box.padding?.bottom || 0}px`);
        }
        else {
            sectionElement.style.setProperty("--section-padding-left", `0px`);
            sectionElement.style.setProperty("--section-padding-top", `0px`);
            sectionElement.style.setProperty("--section-padding-right", `0px`);
            sectionElement.style.setProperty("--section-padding-bottom", `0px`);
        }
        
        const sectionGrid = section.grid;
        if (!sectionGrid?.ref?.current) return;

        const sectionRect = sectionGrid.ref.current.getBoundingClientRect();
        const cards = registry.getBoardCardsForSection(section.props!.id) ?? [];

        const gridSize = {
            width: sectionRect.width,
            height: sectionRect.height
        }

        const { clientWidth: layoutWidth, clientHeight: layoutHeight } = layoutElement;

        const gap = layoutWidth * 0.0075;

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

            cardElement.style.setProperty("--card-left", `${position.left}px`);
            cardElement.style.setProperty("--card-top", `${position.top}px`);
            cardElement.style.setProperty("--card-width", `${position.width}px`);
            cardElement.style.setProperty("--card-height", `${position.height}px`);
        });
    });
}
