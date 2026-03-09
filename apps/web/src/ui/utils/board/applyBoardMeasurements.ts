import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardMetrics } from "@/src/ui/types/board/board.dom";
import { calculateGridCellSize } from "@/src/ui/calculations/layout/grid-cell-size";
import { calculateSectionContainerSize } from "@/src/ui/calculations/layout/section-container-size";

export function applyBoardMeasurements({ registry, metricsRef } : { registry: BoardRegistry, metricsRef: React.RefObject<BoardMetrics> }) {
    const layout = registry.layout;
    const layoutRef = layout.ref;
    const layoutElement = layoutRef.current;

    if (!layoutElement) return;
    
    const { clientWidth, clientHeight } = layoutElement
    const measurements = metricsRef.current;
    const padding = 6;

    const cellSize = calculateGridCellSize(clientWidth, clientHeight, measurements.layoutGridCellsCount, padding);
    metricsRef.current.layoutGridCellSize = cellSize;

    const gridSize = {
        width: measurements.layoutGridCellsCount.horizontal * cellSize.inner,
        height: measurements.layoutGridCellsCount.vertical * cellSize.inner
    }
    
    metricsRef.current.layoutGridSize = gridSize;
    
    const containerSize = calculateSectionContainerSize(measurements.layoutGridCellsCount, cellSize);
    metricsRef.current.layoutSectionContainerSize = containerSize;

    layoutElement.style.setProperty("--cell-size-full", `${cellSize.full}px`);
    layoutElement.style.setProperty("--cell-size-inner", `${cellSize.inner}px`);
    layoutElement.style.setProperty("--cell-size-compact", `${cellSize.compact}px`);

    layoutElement.style.setProperty("--grid-max-width", `${gridSize.width}px`);
    layoutElement.style.setProperty("--grid-max-height", `${gridSize.height}px`);

    layoutElement.style.setProperty("--container-width", `${containerSize.width}px`);
    layoutElement.style.setProperty("--container-height", `${containerSize.height}px`);

    //

    if(layoutElement) {        
        const layoutSectionContainer = layout.sectionContainer;
        if(!layoutSectionContainer?.ref?.current) return;

        layoutSectionContainer.sections.forEach(section => {
            const sectionGrid = section.grid;
            if(!sectionGrid?.ref?.current) return;

            const sectionGridElement = sectionGrid.ref.current;
            const sectionRect = sectionGridElement.getBoundingClientRect();
            const rootRect = layoutElement.getBoundingClientRect();

            registry.getBoardCardsForSection(section.props!.id)?.forEach(card => {
                const cardElement = card.ref?.current;
                if(!cardElement) return;

                const props = card.props!;

                const gridSize = {
                    width: measurements.layoutGridSize.width / (measurements.layoutGridCellsCount.horizontal / section.props!.colSpan),
                    height: measurements.layoutGridSize.height / (measurements.layoutGridCellsCount.vertical / section.props!.rowSpan)
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

                const rawPosition = {
                    left: gridRect.left + (props.colIndex - 1) * stepSize.width,
                    top: gridRect.top + (props.rowIndex - 1) * stepSize.height,
                    width: props.colSpan * stepSize.width,
                    height: props.rowSpan * stepSize.height,
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
            })
        })
    }
}