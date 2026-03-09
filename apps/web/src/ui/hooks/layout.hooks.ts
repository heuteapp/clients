import { useEffect, useRef, useState } from "react"
import { LayoutMeasurements, LayoutMeasurementsParams } from "../types/layout/dom"
import { calculateSectionCount } from "../calculations/layout/section-count"
import { calculateCellSize } from "../calculations/layout/cell-size";
import { calculateContainerSize } from "../calculations/layout/container-size";
import { BoardRegistry } from "../registries/board.registry.types";

export function useLayoutMeasurements({ registry, gridDimensions, sections, padding }: LayoutMeasurementsParams) : LayoutMeasurements {
    const layout = registry.layout;
    const layoutRef = layout.ref!;

    const measurementsRef = useRef<LayoutMeasurements>({
        sectionCount: {
            horizontal: 0,
            vertical: 0
        },
        cellCount: {
            horizontal: 0,
            vertical: 0
        },
        cellSize: {
            full: 0,
            inner: 0,
            compact: 0
        },
        gridSize: {
            maxWidth: 0,
            maxHeight: 0
        },
        containerSize: {
            width: 0,
            height: 0
        }
    });

    const measurements = measurementsRef.current;

    measurements.sectionCount = calculateSectionCount(sections);
    measurements.cellCount = {
        horizontal: gridDimensions.columnCount,
        vertical: gridDimensions.rowCount
    };

    useEffect(() => {
        const element = layoutRef.current;
        if (!element) return

        const observer = new ResizeObserver(() => {
            paint({ element, registry, measurementsRef })
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [measurements.cellCount, measurements.sectionCount, padding])

  return measurements
}

// 
function paint({ element, registry, measurementsRef } : { element: HTMLDivElement, registry: BoardRegistry, measurementsRef: React.RefObject<LayoutMeasurements> }) {
    const layout = registry.layout;
    const layoutRef = layout.ref;
    
    const { clientWidth, clientHeight } = element
    const measurements = measurementsRef.current;
    const padding = 6;

    const cellSize = calculateCellSize(clientWidth, clientHeight, measurements.cellCount, padding);
    measurementsRef.current.cellSize = cellSize;

    const gridSize = {
        maxWidth: measurements.cellCount.horizontal * cellSize.inner,
        maxHeight: measurements.cellCount.vertical * cellSize.inner
    }
    
    measurementsRef.current.gridSize = gridSize;
    
    const containerSize = calculateContainerSize(measurements.cellCount, cellSize.full);
    measurementsRef.current.containerSize = containerSize;

    element.style.setProperty("--cell-size-full", `${cellSize.full}px`);
    element.style.setProperty("--cell-size-inner", `${cellSize.inner}px`);
    element.style.setProperty("--cell-size-compact", `${cellSize.compact}px`);

    element.style.setProperty("--grid-max-width", `${gridSize.maxWidth}px`);
    element.style.setProperty("--grid-max-height", `${gridSize.maxHeight}px`);

    element.style.setProperty("--container-width", `${containerSize.width}px`);
    element.style.setProperty("--container-height", `${containerSize.height}px`);

    //

    const layoutElement = layoutRef.current;
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
                    width: measurements.gridSize.maxWidth / (measurements.cellCount.horizontal / section.props!.colSpan),
                    height: measurements.gridSize.maxHeight / (measurements.cellCount.vertical / section.props!.rowSpan)
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