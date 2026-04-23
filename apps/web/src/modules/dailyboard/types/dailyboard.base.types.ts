import { BoardBase, BoardBaseData, BoardCardBase, BoardCardBaseData } from "../../board/types/board.base.types";
import { YYMMDDDate } from "../../shared/types/date.types";

export interface DailyboardBase extends BoardBase {
    categoryPath: string;
    date: YYMMDDDate;
    cards: DailyboardCardBase[];
}

export interface DailyboardCardBase extends BoardCardBase {
    
}

//

export type DailyboardBaseData<TBase extends DailyboardBase = DailyboardBase> = BoardBaseData<TBase>

export type DailyboardCardBaseData<TBase extends DailyboardCardBase = DailyboardCardBase> = BoardCardBaseData<TBase>