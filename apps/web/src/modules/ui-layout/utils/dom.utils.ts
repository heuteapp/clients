import { Pointer } from "../../shared/types/common";

export const findGridElement = (clientX: number, clientY: number): HTMLDivElement | null => {
    const element = document.elementFromPoint(clientX, clientY);
    return element?.closest<HTMLDivElement>("[data-layout-grid]") || null;
}

export const getGridMeta = (gridEl: HTMLDivElement) => {
    const totalCols = parseInt(gridEl.dataset.layoutGridColspan || "0", 10);
    const totalRows = parseInt(gridEl.dataset.layoutGridRowspan || "0", 10);

    const sectionSize = {
        colSpan: totalCols,
        rowSpan: totalRows
    };
    
    return { sectionSize };
}

export const getCellAtCursor = (client: Pointer, gridRect: DOMRect, cellSize: number) => {
    const col = Math.floor((client.x - gridRect.left) / cellSize);
    const row = Math.floor((client.y - gridRect.top) / cellSize);
    return { col, row };
}

//

export const getSectionParent = (gridEl: HTMLDivElement): HTMLDivElement | null => {
    const parent = gridEl.parentElement;

    if(!parent?.dataset.section) {
        return null;
    }

    return parent as HTMLDivElement;
}