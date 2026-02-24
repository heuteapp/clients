import { Point } from "./point";
import { Size } from "./size";

export interface Rect extends Point, Size {
}

export default Rect;

export function isRectOverlapping(rectA: Rect, rectB: Rect): boolean {
    return (
        rectA.x < rectB.x + rectB.width &&
        rectA.x + rectA.width > rectB.x &&
        rectA.y < rectB.y + rectB.height &&
        rectA.y + rectA.height > rectB.y
    );
}