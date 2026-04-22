import { GridRect, GridSpan } from "../../shared/types/common";

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