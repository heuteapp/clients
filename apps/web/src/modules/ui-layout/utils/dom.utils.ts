import { LayoutDataContent, LayoutSectionDataContent } from "../../layout/types/layout.data.types";
import { Pointer } from "../../shared/types/common";

//

export const findCanvasInSubtree = (el: HTMLDivElement): HTMLDivElement | null => {
    return el.querySelector<HTMLDivElement>("[data-layout]") || null;
}

export const findCanvasClosest = (el: HTMLDivElement): HTMLDivElement | null => {
    return el.closest<HTMLDivElement>("[data-layout]") || null;
}

export const findCanvasFromPoint = (clientX: number, clientY: number): HTMLDivElement | null => {
    const allElements = document.elementsFromPoint(clientX, clientY);
    
    for (const element of allElements) {
        const canvas = (element as HTMLElement).closest<HTMLDivElement>("[data-layout]");
        if (canvas) return canvas;
    }
    
    return null;
}

export const getCanvasData = (canvasEl: HTMLDivElement) : LayoutDataContent | null => {
    if(!canvasEl.dataset.layout) {
        return null;
    }

    return {
        name: canvasEl.dataset.name || "",
        version: parseInt(canvasEl.dataset.version || "0", 10),
        colCount: parseInt(canvasEl.dataset.colCount || "0", 10),
        rowCount: parseInt(canvasEl.dataset.rowCount || "0", 10)
    };
}

//

export const findCanvasGridInSubtree = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.querySelector<HTMLDivElement>("[data-layout-grid]");
    return gridEl || null;
}

export const findCanvasGridClosest = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.closest<HTMLDivElement>("[data-layout-grid]");
    return gridEl || null;
}

export const findCanvasGridAtPoint = (clientX: number, clientY: number): HTMLDivElement | null => {
    const allElements = document.elementsFromPoint(clientX, clientY);
    
    for (const element of allElements) {
        const grid = (element as HTMLElement).closest<HTMLDivElement>("[data-layout-grid]");
        if (grid) return grid;
    }
    
    return null;
}

export const findAllCanvasGrids = (el: HTMLDivElement): HTMLDivElement[] => {
    return Array.from(findCanvasInSubtree(el)?.querySelectorAll<HTMLDivElement>("[data-layout-grid]") || []);
}

export const getCanvasGridData = (gridEl: HTMLDivElement): LayoutSectionDataContent | null => {
    if(!gridEl.dataset.layoutGrid) {
        return null;
    }

    return {
        name: gridEl.dataset.name || "",
        position: {
            colIndex: parseInt(gridEl.dataset.colIndex || "0", 10),
            rowIndex: parseInt(gridEl.dataset.rowIndex || "0", 10),
            colSpan: parseInt(gridEl.dataset.colSpan || "0", 10),
            rowSpan: parseInt(gridEl.dataset.rowSpan || "0", 10)
        }
    };  
}

//

export const findSectionInSubtree = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.querySelector<HTMLDivElement>("[data-layout-section]");
    return gridEl || null;
}

export const findSectionClosest = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.closest<HTMLDivElement>("[data-layout-section]");
    return gridEl || null;
}

export const findSectionAtPoint = (clientX: number, clientY: number): HTMLDivElement | null => {
    const allElements = document.elementsFromPoint(clientX, clientY);
    
    for (const element of allElements) {
        const section = (element as HTMLElement).closest<HTMLDivElement>("[data-layout-section]");
        if (section) return section;
    }
    
    return null;
}

//

export const getSectionData = (sectionEl: HTMLDivElement) => {
    if(!sectionEl.dataset.layoutSection) {
        return null;
    }

    return {
        name: sectionEl.dataset.layoutSectionName || "",
        position: {
            colIndex: parseInt(sectionEl.dataset.layoutSectionColIndex || "0", 10),
            rowIndex: parseInt(sectionEl.dataset.layoutSectionRowIndex || "0", 10),
            colSpan: parseInt(sectionEl.dataset.layoutSectionColSpan || "0", 10),
            rowSpan: parseInt(sectionEl.dataset.layoutSectionRowSpan || "0", 10)
        }
    };
}

export const getSectionDataForGrid = (gridEl: HTMLDivElement) => {
    const section = findSectionClosest(gridEl);
    if (!section) {
        return null;
    }

    return getSectionData(section)!;
}

//

export const calcGridPointerAtCursor = (client: Pointer, gridRect: DOMRect, cellSize: number) => {
    const col = Math.floor((client.x - gridRect.left) / cellSize) + 1;
    const row = Math.floor((client.y - gridRect.top) / cellSize) + 1;
    return { col, row };
}