import { GridRect } from "@/src/modules/shared/types/common";

export interface Dailyboard {
    layoutName: string;
    layoutVersion: number;
    categoryPath: string;
    date: Date;
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