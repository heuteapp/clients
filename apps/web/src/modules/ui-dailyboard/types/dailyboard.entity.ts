import { UIEntity } from "@/src/modules/ui-base/types/ui.types";
import { DailyboardCardModel, DailyboardModel } from "@/src/modules/d-board/types/board.model.types";

/**
 * Represents a complete dailyboard entity combining UI state and dailyboard data
 */
export interface DailyboardEntity extends UIEntity {
    data: DailyboardModel;
}

/**
 * Represents a dailyboard card entity combining UI state and card data
 */
export interface DailyboardCardEntity extends UIEntity {
    data: DailyboardCardModel;
}