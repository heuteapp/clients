import { BoardBase, BoardCardBase } from "../../board/types/board.base.types";
import { YYMMDDDate } from "../../shared/types/date.types";

export interface DailyboardBase extends BoardBase {
    categoryPath: string;
    date: YYMMDDDate;
    cards: DailyboardCardBase[];
}

export interface DailyboardCardBase extends BoardCardBase {
    
}

//

export type DailyboardBaseData = Omit<DailyboardBase, "cards">;

export type DailyboardCardBaseData = Omit<DailyboardCardBase, "name">;