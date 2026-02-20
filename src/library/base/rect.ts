import Point from "./point";
import Size from "./size";

// (x, y) + (x + width, y + height)
export interface Rect extends Point, Size {}

export default Rect;