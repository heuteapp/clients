import { BoxStyle } from "@/src/modules/shared/types/style";
import { DailyboardBase, DailyboardCardBase } from "./dailyboard.base.types";

export interface DailyboardStyle extends DailyboardBase {
    box: BoxStyle;
    cards: DailyboardCardStyle[];
}

export interface DailyboardCardStyle extends DailyboardCardBase {
    box: BoxStyle;
}

export type DailyboardStyleContent = Omit<DailyboardStyle, "cards">;

export type DailyboardCardStyleContent = DailyboardCardStyle;