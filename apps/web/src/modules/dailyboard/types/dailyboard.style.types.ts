import { BoxStyle } from "@/src/modules/shared/types/style";
import { DailyboardBase, DailyboardCardBase } from "./dailyboard.base.types";
import { BoardCardStyleData, BoardStyleData } from "../../board/types/board.style.types";

export interface DailyboardStyle extends DailyboardBase {
    box: BoxStyle;
    cards: DailyboardCardStyle[];
}

export interface DailyboardCardStyle extends DailyboardCardBase {
    box: BoxStyle;
}

export type DailyboardStyleData<TBase extends DailyboardStyle = DailyboardStyle> = BoardStyleData<TBase>

export type DailyboardCardStyleData<TBase extends DailyboardCardStyle = DailyboardCardStyle> = BoardCardStyleData<TBase>;