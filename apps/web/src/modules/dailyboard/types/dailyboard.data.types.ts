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
    | DailyboardCardBulletPointsSide;

export interface DailyboardCardSideBase {
    type: "plain-text" | "bullet-points"
}

export interface DailyboardCardPlainTextSide extends DailyboardCardSideBase {
    type: "plain-text";
    text: string;
}

export type DailyboardCardBulletPointsSide =
    | DailyboardCardBulletPoints1x2Side
    | DailyboardCardBulletPoints2x2Side
    | DailyboardCardBulletPoints2x3Side;

export interface DailyboardCardBulletPointsSideBase extends DailyboardCardSideBase {
    type: "bullet-points";
    layout: "1x2" | "2x2" | "2x3";
}

export interface DailyboardCardBulletPoints1x2Side extends DailyboardCardBulletPointsSideBase {
    layout: "1x2";
    pointUp: string;
    pointDown: string;
}

export interface DailyboardCardBulletPoints2x2Side extends DailyboardCardBulletPointsSideBase {
    layout: "2x2";
    pointTopLeft: string;
    pointTopRight: string;
    pointBottomLeft: string;
    pointBottomRight: string;
}

export interface DailyboardCardBulletPoints2x3Side extends DailyboardCardBulletPointsSideBase {
    layout: "2x3";
    pointTopLeft: string;
    pointTopRight: string;
    pointMiddleLeft: string;
    pointMiddleRight: string;
    pointBottomLeft: string;
    pointBottomRight: string;
}