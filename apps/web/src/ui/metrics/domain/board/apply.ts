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

        const gridElement = section.grid?.ref?.current;
        if (!gridElement) return;

        const sectionStyle = themeManager.current!.sections.find(s => s.name === section.props!.name);

        const padding = {
            left: sectionStyle?.box.padding?.left || 0,
            top: sectionStyle?.box.padding?.top || 0,
            right: sectionStyle?.box.padding?.right || 0,
            bottom: sectionStyle?.box.padding?.bottom || 0,
        };

        sectionElement.style.setProperty("--section-padding", `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`);
        
        const sectionRect = {
            left: (section.props!.position.colIndex - 1) * gridCellSize.inner,
            top: (section.props!.position.rowIndex - 1) * gridCellSize.inner,
            width: section.props!.position.colSpan * gridCellSize.inner,
            height: section.props!.position.rowSpan * gridCellSize.inner,
        }

        sectionElement.style.setProperty("--section-left", `${sectionRect.left}px`);
        sectionElement.style.setProperty("--section-top", `${sectionRect.top}px`);
        sectionElement.style.setProperty("--section-width", `${sectionRect.width}px`);
        sectionElement.style.setProperty("--section-height", `${sectionRect.height}px`);
        
        const sectionGrid = section.grid;
        if (!sectionGrid?.ref?.current) return;

        const cards = registry.getBoardCardsForSection(section.props!.id) ?? [];

        const { left: rootLeft, top: rootTop } = rootRect;
        const { left: gridLeft, top: gridTop } = gridElement.getBoundingClientRect();
        const localGridLeft = gridLeft - rootLeft;
        const localGridTop = gridTop - rootTop;

        const gridRect = {
            left: localGridLeft + padding.left,
            top: localGridTop + padding.top,
            width: sectionRect.width - padding.left - padding.right,
            height: sectionRect.height - padding.top - padding.bottom
        };

        const gap = rootRect.width * 0.0075;

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
