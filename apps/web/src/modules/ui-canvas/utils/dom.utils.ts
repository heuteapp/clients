import { CanvasDataContent, CanvasGridDataContent } from "../../canvas/types/canvas.data.types";
import { Pointer } from "../../shared/types/common";

//

export const findCanvasInSubtree = (el: HTMLDivElement): HTMLDivElement | null => {
    return el.querySelector<HTMLDivElement>("[data-canvas]") || null;
}

export const findCanvasClosest = (el: HTMLDivElement): HTMLDivElement | null => {
    return el.closest<HTMLDivElement>("[data-canvas]") || null;
}

export const findCanvasFromPoint = (clientX: number, clientY: number): HTMLDivElement | null => {
    const allElements = document.elementsFromPoint(clientX, clientY);
    
    for (const element of allElements) {
        const canvas = (element as HTMLElement).closest<HTMLDivElement>("[data-canvas]");
        if (canvas) return canvas;
    }
    
    return null;
}

export const getCanvasData = (canvasEl: HTMLDivElement) : CanvasDataContent | null => {
    if(!canvasEl.dataset.canvas) {
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
    const gridEl = el.querySelector<HTMLDivElement>("[data-canvas-grid]");
    return gridEl || null;
}

export const findCanvasGridClosest = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.closest<HTMLDivElement>("[data-canvas-grid]");
    return gridEl || null;
}

export const findCanvasGridAtPoint = (clientX: number, clientY: number): HTMLDivElement | null => {
    const allElements = document.elementsFromPoint(clientX, clientY);
    
    for (const element of allElements) {
        const grid = (element as HTMLElement).closest<HTMLDivElement>("[data-canvas-grid]");
        if (grid) return grid;
    }
    
    return null;
}

export const findAllCanvasGrids = (el: HTMLDivElement): HTMLDivElement[] => {
    return Array.from(findCanvasInSubtree(el)?.querySelectorAll<HTMLDivElement>("[data-canvas-grid]") || []);
}

export const getCanvasGridData = (gridEl: HTMLDivElement): CanvasGridDataContent | null => {
    if(!gridEl.dataset.canvasGrid) {
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

export const findGridInSubtree = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.querySelector<HTMLDivElement>("[data-canvas-grid]");
    return gridEl || null;
}

export const findGridClosest = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.closest<HTMLDivElement>("[data-canvas-grid]");
    return gridEl || null;
}

export const findGridAtPoint = (clientX: number, clientY: number): HTMLDivElement | null => {
    const allElements = document.elementsFromPoint(clientX, clientY);
    
    for (const element of allElements) {
        const grid = (element as HTMLElement).closest<HTMLDivElement>("[data-canvas-grid]");
        if (grid) return grid;
    }
    
    return null;
}

//

export const getGridData = (gridEl: HTMLDivElement) => {
    if(!gridEl.dataset.canvasGrid) {
        return null;
    }

    return {
        name: gridEl.dataset.canvasGridName || "",
        position: {
            colIndex: parseInt(gridEl.dataset.canvasGridColIndex || "0", 10),
            rowIndex: parseInt(gridEl.dataset.canvasGridRowIndex || "0", 10),
            colSpan: parseInt(gridEl.dataset.canvasGridColSpan || "0", 10),
            rowSpan: parseInt(gridEl.dataset.canvasGridRowSpan || "0", 10)
        }
    };
}

//

export const calcGridPointerAtCursor = (client: Pointer, gridRect: DOMRect, cellSize: number) => {
    const col = Math.floor((client.x - gridRect.left) / cellSize) + 1;
    const row = Math.floor((client.y - gridRect.top) / cellSize) + 1;
    return { col, row };
}