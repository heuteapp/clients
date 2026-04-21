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
    color: DailyboardCardColor;
    frontSide: DailyboardCardSide;
    backSide: DailyboardCardSide;
}

export interface DailyboardCardPlacement {
    sectionName: string;
    position: GridRect;
}

export enum DailyboardCardColor {
    Default,
    Brown,
    Blue,
    LightBlue,
    Teal,
    Aqua,
    Green,
    LimeGreen,
    Yellow,
    LightOrange,
    Orange,
    Red,
    DarkRed,
    LightPink,
    Pink,
    Magenta,
    Purple,
    DarkPurple,
    DarkGrey,
    MediumGrey,
    LightGrey,
    White
}

export type DailyboardCardSide = 
    | DailyboardCardPlainTextSide 

export interface DailyboardCardSideBase {
    type: "plain-text" | "bullet-points"
}

export interface DailyboardCardPlainTextSide extends DailyboardCardSideBase {
    type: "plain-text";
    text: string;
}