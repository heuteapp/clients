import { GridRect, GridSpan, ResizeParams } from "../types/common";

export const isGridRectOverlapping = (a: GridRect, b: GridRect) => {
    return !(a.colIndex + a.colSpan <= b.colIndex ||
             a.colIndex >= b.colIndex + b.colSpan ||
             a.rowIndex + a.rowSpan <= b.rowIndex ||
             a.rowIndex >= b.rowIndex + b.rowSpan);
}

export const isGridRectOverlappingSome = (rect: GridRect, others: GridRect[]) => {
    return others.some(other => isGridRectOverlapping(rect, other));
}

export const findBestGridRectPosition = (
    rect: GridRect,
    others: GridRect[],
    totalSize: GridSpan
): GridRect | null => {

    const { colSpan: totalCol, rowSpan: totalRow } = totalSize;

    const isValid = (r: GridRect) =>
        r.rowIndex >= 1 &&
        r.colIndex >= 1 &&
        r.rowIndex + r.rowSpan - 1 <= totalRow &&
        r.colIndex + r.colSpan - 1 <= totalCol;

    let best: GridRect | null = null;
    let bestScore = Infinity;

    const startRow = rect.rowIndex;
    const startCol = rect.colIndex;

    const maxRadius = Math.max(totalRow, totalCol);

    for (let r = 0; r <= maxRadius; r++) {

        for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {

                const row = startRow + dy;
                const col = startCol + dx;

                const candidate: GridRect = {
                    rowIndex: row,
                    colIndex: col,
                    colSpan: rect.colSpan,
                    rowSpan: rect.rowSpan
                };

                if (!isValid(candidate)) continue;
                if (isGridRectOverlappingSome(candidate, others)) continue;

                const score = Math.abs(dx) + Math.abs(dy);

                if (score < bestScore) {
                    best = candidate;
                    bestScore = score;
                }
            }
        }

        if (best) return best;
    }

    return null;
};

export function resizeGridRect(rect: GridRect, params: ResizeParams): GridRect {
    const { direction, delta, dimensions, minSpan } = params;
    let newRect: GridRect = { ...rect };

    const resizeRight = () => {
        newRect.colSpan = Math.min(
            dimensions.colCount - newRect.colIndex,
            Math.max(minSpan.colSpan, rect.colSpan + delta.col)
        );
    };

    const resizeLeft = () => {
        newRect.colSpan = Math.max(minSpan.colSpan, rect.colSpan - delta.col);
        newRect.colIndex = rect.colIndex + (rect.colSpan - newRect.colSpan);
        
        newRect.colIndex = Math.max(0, newRect.colIndex);
        if (newRect.colIndex === 0) {
            newRect.colSpan = rect.colIndex + rect.colSpan;
        }
        
        const maxColIndex = dimensions.colCount - newRect.colSpan;
        if (newRect.colIndex > maxColIndex) {
            newRect.colIndex = maxColIndex;
        }
    };

    const resizeBottom = () => {
        newRect.rowSpan = Math.min(
            dimensions.rowCount - newRect.rowIndex,
            Math.max(minSpan.rowSpan, rect.rowSpan + delta.row)
        );
    };

    const resizeTop = () => {
        newRect.rowSpan = Math.max(minSpan.rowSpan, rect.rowSpan - delta.row);
        newRect.rowIndex = rect.rowIndex + (rect.rowSpan - newRect.rowSpan);
        
        newRect.rowIndex = Math.max(0, newRect.rowIndex);
        if (newRect.rowIndex === 0) {
            newRect.rowSpan = rect.rowIndex + rect.rowSpan;
        }
        
        const maxRowIndex = dimensions.rowCount - newRect.rowSpan;
        if (newRect.rowIndex > maxRowIndex) {
            newRect.rowIndex = maxRowIndex;
        }
    };

    const clampHorizontal = () => {
        newRect.colIndex = Math.max(0, newRect.colIndex);
        const maxColIndex = dimensions.colCount - newRect.colSpan;
        if (newRect.colIndex > maxColIndex) {
            newRect.colIndex = maxColIndex;
        }
    };

    const clampVertical = () => {
        newRect.rowIndex = Math.max(0, newRect.rowIndex);
        const maxRowIndex = dimensions.rowCount - newRect.rowSpan;
        if (newRect.rowIndex > maxRowIndex) {
            newRect.rowIndex = maxRowIndex;
        }
    };

    // Ana switch case
    switch (direction) {
        case 'e':
            resizeRight();
            break;

        case 'w':
            resizeLeft();
            break;

        case 's':
            resizeBottom();
            break;

        case 'n':
            resizeTop();
            break;

        case 'se':
            resizeRight();
            resizeBottom();
            break;

        case 'sw':
            resizeLeft();
            resizeBottom();
            clampHorizontal();
            break;

        case 'ne':
            resizeTop();
            resizeRight();
            clampVertical();
            break;

        case 'nw':
            resizeLeft();
            resizeTop();
            clampHorizontal();
            clampVertical();
            break;
    }

    return newRect;
}