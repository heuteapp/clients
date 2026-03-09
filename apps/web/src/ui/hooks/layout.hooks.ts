import { useEffect, useRef, useState } from "react"
import { LayoutMeasurements, LayoutMeasurementsParams } from "../types/layout/dom"
import { calculateSectionCount } from "../calculations/layout/section-count"
import { calculateCellSize } from "../calculations/layout/cell-size";
import { calculateContainerSize } from "../calculations/layout/container-size";

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
            const { clientWidth, clientHeight } = element

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
                const layoutRect = layoutElement.getBoundingClientRect();
                layoutElement.style.setProperty("--layout-root-left", `${layoutRect.left}px`);
                layoutElement.style.setProperty("--layout-root-top", `${layoutRect.top}px`);
                layoutElement.style.setProperty("--layout-root-width", `${layoutRect.width}px`);
                layoutElement.style.setProperty("--layout-root-height", `${layoutRect.height}px`);

                const layoutSectionContainer = layout.sectionContainer;
                if(layoutSectionContainer) {
                    const containerRect = layoutSectionContainer.ref!.current!.getBoundingClientRect();
                    layoutSectionContainer.ref!.current!.style.setProperty("--layout-section-container-left", `${containerRect.left}px`);
                    layoutSectionContainer.ref!.current!.style.setProperty("--layout-section-container-top", `${containerRect.top}px`);
                    layoutSectionContainer.ref!.current!.style.setProperty("--layout-section-container-width", `${containerRect.width}px`);
                    layoutSectionContainer.ref!.current!.style.setProperty("--layout-section-container-height", `${containerRect.height}px`);

                    layoutSectionContainer.sections.forEach(section => {
                        const sectionElement = section.grid?.ref?.current;
                        if(sectionElement) {
                            const sectionRect = sectionElement.getBoundingClientRect();
                            sectionElement.style.setProperty("--layout-section-left", `${sectionRect.left}px`);
                            sectionElement.style.setProperty("--layout-section-top", `${sectionRect.top}px`);
                            sectionElement.style.setProperty("--layout-section-width", `${sectionRect.width}px`);
                            sectionElement.style.setProperty("--layout-section-height", `${sectionRect.height}px`);

                            const sectionGrid = section.grid;
                            if(sectionGrid) {
                                const sectionGridElement = sectionGrid.ref?.current;
                                if(sectionGridElement) {
                                    const sectionGridRect = sectionGridElement.getBoundingClientRect();
                                    sectionGridElement.style.setProperty("--layout-grid-left", `${sectionGridRect.left}px`);
                                    sectionGridElement.style.setProperty("--layout-grid-top", `${sectionGridRect.top}px`);
                                    sectionGridElement.style.setProperty("--layout-grid-width", `${sectionGridRect.width}px`);
                                    sectionGridElement.style.setProperty("--layout-grid-height", `${sectionGridRect.height}px`);
                                }
                            }
                        }
                    })
                }
            }
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [measurements.cellCount, measurements.sectionCount, padding])

  return measurements
}