import { isGridRectOverlapping } from "../../d-core/utils/common";
import { BoardCardModel } from "../types/board.model.types";

export const isBoardCardOverlapping = (a: BoardCardModel, b: BoardCardModel) => {
    if(a.placement === null || b.placement === null) {
        return false;
    }

    return isGridRectOverlapping(a.placement.position, b.placement.position);
}