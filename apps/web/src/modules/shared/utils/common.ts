import { GridRect } from "../../shared/types/common";

export const isGridRectOverlapping = (a: GridRect, b: GridRect) => {
    return !(a.colIndex + a.colSpan <= b.colIndex ||
             a.colIndex >= b.colIndex + b.colSpan ||
             a.rowIndex + a.rowSpan <= b.rowIndex ||
             a.rowIndex >= b.rowIndex + b.rowSpan);
}