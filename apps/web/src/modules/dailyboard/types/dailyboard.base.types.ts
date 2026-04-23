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

export type DailyboardBaseContent = Omit<DailyboardBase, "cards">;

export type DailyboardCardBaseContent = Omit<DailyboardCardBase, "name">;