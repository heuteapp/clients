import { Pointer } from "../../shared/types/common";

export const findGridInSubtree = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.querySelector<HTMLDivElement>("[data-layout-grid]");
    return gridEl || null;
}

export const findGridClosest = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.closest<HTMLDivElement>("[data-layout-grid]");
    return gridEl || null;
}

export const findGridAtPoint = (clientX: number, clientY: number): HTMLDivElement | null => {
    const element = document.elementFromPoint(clientX, clientY);
    return element?.closest<HTMLDivElement>("[data-layout-grid]") || null;
}

export const findSectionInSubtree = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.querySelector<HTMLDivElement>("[data-layout-section]");
    return gridEl || null;
}

export const findSectionClosest = (el: HTMLDivElement): HTMLDivElement | null => {
    const gridEl = el.closest<HTMLDivElement>("[data-layout-section]");
    return gridEl || null;
}

export const findSectionAtPoint = (clientX: number, clientY: number): HTMLDivElement | null => {
    const element = document.elementFromPoint(clientX, clientY);
    return element?.closest<HTMLDivElement>("[data-layout-section]") || null;
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
            colSpan: parseInt(sectionEl.dataset.layoutSectionColspan || "0", 10),
            rowSpan: parseInt(sectionEl.dataset.layoutSectionRowspan || "0", 10)
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

export const getCellAtCursor = (client: Pointer, gridRect: DOMRect, cellSize: number) => {
    const col = Math.floor((client.x - gridRect.left) / cellSize);
    const row = Math.floor((client.y - gridRect.top) / cellSize);
    return { col, row };
}

//

export const getDailyboardParent = (el: HTMLDivElement): HTMLDivElement | null => {
    const parent = el.closest<HTMLDivElement>("[data-dailyboard-id]");

    if(!parent) {
        return null;
    }

    return parent as HTMLDivElement;
}