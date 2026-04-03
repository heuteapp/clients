import { GridRect } from "@/src/modules/shared/types/common";
import { YYMMDDDate } from "../../shared/types/date.types";

export interface Dailyboard {
    layoutName: string;
    layoutVersion: number;
    categoryPath: string;
    date: YYMMDDDate;
    cards: DailyboardCard[];
}

export interface DailyboardCard {
    name: string;
    content: DailyboardCardContent;
    placement: DailyboardCardPlacement | null;
}

//

export type DailyboardData = Omit<Dailyboard, "cards">;

export type DailyboardCardData = Omit<DailyboardCard, "">;

//

export interface DailyboardCardContent {
    title: string | null;
}

export interface DailyboardCardPlacement {
    sectionName: string;
    position: GridRect;
}