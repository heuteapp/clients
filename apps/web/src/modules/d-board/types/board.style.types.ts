import { BoxStyle } from "@/src/modules/d-shared/types/style";
import { BoardBase, BoardBaseData, BoardCardBase, BoardCardBaseData } from "./board.base.types";

export interface BoardStyle extends BoardBase {
    box: BoxStyle;
    cards: BoardCardStyle[];
}

export interface BoardCardStyle extends BoardCardBase {
    box: BoxStyle;
}

export type BoardStyleData<TBase extends BoardStyle = BoardStyle> = BoardBaseData<TBase>

export type BoardCardStyleData<TBase extends BoardCardStyle = BoardCardStyle> = BoardCardBaseData<TBase>

//

import { DailyboardBase, DailyboardCardBase } from "./board.base.types";

export interface DailyboardStyle extends DailyboardBase, BoardStyle {
    cards: DailyboardCardStyle[];
}

export interface DailyboardCardStyle extends DailyboardCardBase, BoardCardStyle {

}

export type DailyboardStyleData<TBase extends DailyboardStyle = DailyboardStyle> = BoardStyleData<TBase>

export type DailyboardCardStyleData<TBase extends DailyboardCardStyle = DailyboardCardStyle> = BoardCardStyleData<TBase>;