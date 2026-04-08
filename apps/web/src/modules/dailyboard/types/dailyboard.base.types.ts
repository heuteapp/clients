import { YYMMDDDate } from "../../shared/types/date.types";

export interface DailyboardBase {
    categoryPath: string;
    date: YYMMDDDate;
    layoutName: string;
    layoutVersion: number;
    cards: DailyboardCardBase[];
}

export interface DailyboardCardBase {
    name: string;
}

//

export type DailyboardBaseContent = Omit<DailyboardBase, "cards">;

export type DailyboardCardBaseContent = Omit<DailyboardCardBase, "name">;