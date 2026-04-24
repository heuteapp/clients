export interface BoardBase {
    canvasName: string;
    canvasVersion: number;
    cards: BoardCardBase[];

    getKey: () => string;
}

export interface BoardCardBase {
    name: string;
}

export type BoardBaseData<TBase extends BoardBase = BoardBase> = Omit<TBase, "cards" | "getKey">;

export type BoardCardBaseData<TBase extends BoardCardBase = BoardCardBase> = Omit<TBase, never>;

//

import { YYMMDDDate } from "../../d-shared/types/date.types";

export interface DailyboardBase extends BoardBase {
    categoryPath: string;
    date: YYMMDDDate;
    cards: DailyboardCardBase[];
}

export interface DailyboardCardBase extends BoardCardBase {
    
}

export type DailyboardBaseData<TBase extends DailyboardBase = DailyboardBase> = BoardBaseData<TBase>

export type DailyboardCardBaseData<TBase extends DailyboardCardBase = DailyboardCardBase> = BoardCardBaseData<TBase>