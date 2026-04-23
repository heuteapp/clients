import { isGridRectOverlapping } from "../../d-shared/utils/common";
import { DailyboardCardModel } from "../types/dailyboard.model.types";

export const isDailyboardCardOverlapping = (a: DailyboardCardModel, b: DailyboardCardModel) => {
    if(a.placement === null || b.placement === null) {
        return false;
    }

    return isGridRectOverlapping(a.placement.position, b.placement.position);
}