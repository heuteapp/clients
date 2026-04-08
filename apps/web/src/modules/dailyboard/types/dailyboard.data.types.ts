import { GridRect } from "../../shared/types/common";
import { DailyboardBase, DailyboardCardBase } from "./dailyboard.base.types";

export interface DailyboardData extends DailyboardBase {
    cards: DailyboardCardData[];
}

export interface DailyboardCardData extends DailyboardCardBase {
    material: DailyboardCardMaterial;
    placement: DailyboardCardPlacement | null;
}

export type DailyboardDataContent = Omit<DailyboardData, "cards">;

export type DailyboardCardDataContent = DailyboardCardData;


//

export interface DailyboardCardMaterial {
    title: string | null;
}

export interface DailyboardCardPlacement {
    sectionName: string;
    position: GridRect;
}