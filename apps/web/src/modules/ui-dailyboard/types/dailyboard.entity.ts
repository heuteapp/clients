import { UIEntity } from "@/src/modules/ui-base/types/ui.types";
import { DailyboardCardData, DailyboardData } from "@/src/modules/dailyboard/types/dailyboard.types";

/**
 * Represents a complete dailyboard entity combining UI state and dailyboard data
 */
export interface DailyboardEntity extends UIEntity {
    data: DailyboardData;
}

/**
 * Represents a dailyboard card entity combining UI state and card data
 */
export interface DailyboardCardEntity extends UIEntity {
    data: DailyboardCardData;
}