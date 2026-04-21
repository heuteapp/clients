import { GridRect } from "../../shared/types/common";
import { DailyboardBase, DailyboardCardBase } from "./dailyboard.base.types";

export interface DailyboardData extends DailyboardBase {
    cards: DailyboardCardData[];
}

export interface DailyboardCardData extends DailyboardCardBase {
    content: DailyboardCardMaterial;
    placement: DailyboardCardPlacement | null;
}

export type DailyboardDataContent = Omit<DailyboardData, "cards">;

export type DailyboardCardDataContent = DailyboardCardData;


//

export interface DailyboardCardMaterial {
    title: string | null;
    color: DailyboardCardColor;
    frontFace: DailyboardCardFace;
    backFace: DailyboardCardFace;
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

export type DailyboardCardFace = 
    | DailyboardCardPlainTextFace 
    | DailyboardCardBulletListFace

export interface DailyboardCardPlainTextFace {
    type: "plain-text";
    text: string;
}

export type DailyboardCardBulletListFace =
    | DailyboardCardBullet1x2ListFace
    | DailyboardCardBullet2x2ListFace
    | DailyboardCardBullet2x3ListFace;

export interface DailyboardCardBullet1x2ListFace {
    type: "bullet-list";
    layout: "1x2";
    bullets: {
        "1x1": string;
        "1x2": string;
    }
}

export interface DailyboardCardBullet2x2ListFace {
    type: "bullet-list";
    layout: "2x2";
    bullets: {
        "1x1": string;
        "2x1": string;
        "1x2": string;
        "2x2": string;
    }
}

export interface DailyboardCardBullet2x3ListFace {
    type: "bullet-list";
    layout: "2x3";
    bullets: {
        "1x1": string;
        "2x1": string;
        "1x2": string;
        "2x2": string;
        "1x3": string;
        "2x3": string;
    }
}