import { DailyboardBase, DailyboardCardBase } from "./dailyboard.base.types";
import { BoardCardStyle, BoardCardStyleData, BoardStyle, BoardStyleData } from "../../board/types/board.style.types";

export interface DailyboardStyle extends DailyboardBase, BoardStyle {
    cards: DailyboardCardStyle[];
}

export interface DailyboardCardStyle extends DailyboardCardBase, BoardCardStyle {

}

export type DailyboardStyleData<TBase extends DailyboardStyle = DailyboardStyle> = BoardStyleData<TBase>

export type DailyboardCardStyleData<TBase extends DailyboardCardStyle = DailyboardCardStyle> = BoardCardStyleData<TBase>;