import { GridPlacement } from "./grid-placement";
import { GridPoint } from "./grid-point";

export interface GridRect extends GridPoint, GridPlacement {
}

export default GridRect;

export function isGridRectOverlapping(rectA: GridRect, rectB: GridRect): boolean {
    return (
        rectA.col < rectB.col + rectB.colSpan &&
        rectA.col + rectA.colSpan > rectB.col &&
        rectA.row < rectB.row + rectB.rowSpan &&
        rectA.row + rectA.rowSpan > rectB.row
    );
}