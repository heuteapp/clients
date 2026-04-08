import { YYMMDDDate } from "../../shared/types/date.types";

export interface DailyboardBase {
    layoutName: string;
    layoutVersion: number;
    date: YYMMDDDate;
    cards: DailyboardCardBase[];
}

export interface DailyboardCardBase {
    name: string;
}

//

export type DailyboardBaseContent = Omit<DailyboardBase, "cards">;

export type DailyboardCardBaseContent = Omit<DailyboardCardBase, "name">;