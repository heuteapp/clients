import { YYMMDDDate } from "../../shared/types/date.types";

export interface DailyboardBase {
    categoryPath: string;
    date: YYMMDDDate;
    canvasName: string;
    canvasVersion: number;
    cards: DailyboardCardBase[];
}

export interface DailyboardCardBase {
    name: string;
}

//

export type DailyboardBaseData = Omit<DailyboardBase, "cards">;

export type DailyboardCardBaseData = Omit<DailyboardCardBase, "name">;