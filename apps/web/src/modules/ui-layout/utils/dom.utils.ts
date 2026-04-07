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