import { Pointer } from "../../shared/types/common";

export const findGridInSubtree = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.querySelector<HTMLDivElement>("[data-layout-section-grid]");
    return gridEl || null;
}

export const findGridClosest = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.closest<HTMLDivElement>("[data-layout-section-grid]");
    return gridEl || null;
}

export const findGridAtPoint = (clientX: number, clientY: number): HTMLDivElement | null => {
    const element = document.elementFromPoint(clientX, clientY);
    return element?.closest<HTMLDivElement>("[data-layout-section-grid]") || null;
}

//

export const getGridData = (gridEl: HTMLDivElement) => {
    return {
        colSpan: parseInt(gridEl.dataset.layoutGridColspan || "0", 10),
        rowSpan: parseInt(gridEl.dataset.layoutGridRowspan || "0", 10)
    };
}

//

export const getCellAtCursor = (client: Pointer, gridRect: DOMRect, cellSize: number) => {
    const col = Math.floor((client.x - gridRect.left) / cellSize);
    const row = Math.floor((client.y - gridRect.top) / cellSize);
    return { col, row };
}

//

export const getSectionParent = (el: HTMLDivElement): HTMLDivElement | null => {
    const parent = el.parentElement;

    if(!parent?.dataset.section) {
        return null;
    }

    return parent as HTMLDivElement;
}

export const getDailyboardParent = (el: HTMLDivElement): HTMLDivElement | null => {
    const parent = el.closest<HTMLDivElement>("[data-dailyboard-id]");

    if(!parent) {
        return null;
    }

    return parent as HTMLDivElement;
}

export const getSectionMeta = (sectionEl: HTMLDivElement) => {
    const name = sectionEl.dataset.sectionName || "";

    return { name };
}