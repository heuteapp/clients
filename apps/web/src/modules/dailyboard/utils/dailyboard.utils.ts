import { isGridRectOverlapping } from "../../shared/utils/common";
import { DailyboardCardData } from "../types/dailyboard.data.types";

export const isDailyboardCardOverlapping = (a: DailyboardCardData, b: DailyboardCardData) => {
    if(a.placement === null || b.placement === null) {
        return false;
    }

    return isGridRectOverlapping(a.placement.position, b.placement.position);
}