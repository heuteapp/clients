import { GridRect } from "../../d-core/types/common";

export interface BoardCardContent {
    title: string | null;
    color: BoardCardColor;
    frontFace: BoardCardFace | null;
    backFace: BoardCardFace | null;
}

export interface BoardCardPlacement {
    gridName: string;
    position: GridRect;
}

export enum BoardCardColor {
    Default = "default",
    Brown = "brown",
    Blue = "blue",
    LightBlue = "light-blue",
    Teal = "teal",
    Aqua = "aqua",
    Green = "green",
    LimeGreen = "lime-green",
    Yellow = "yellow",
    LightOrange = "light-orange",
    Orange = "orange",
    Red = "red",
    DarkRed = "dark-red",
    LightPink = "light-pink",
    Pink = "pink",
    Magenta = "magenta",
    Purple = "purple",
    DarkPurple = "dark-purple",
    DarkGrey = "dark-grey",
    MediumGrey = "medium-grey",
    LightGrey = "light-grey",
    White = "white"
}

export type BoardCardFace = 
    | BoardCardPlainTextFace 
    | BoardCardBulletListFace

export interface BoardCardPlainTextFace {
    type: "plain-text";
    text: string;
}

export type BoardCardBulletListFace =
    | BoardCardBullet1x2ListFace
    | BoardCardBullet2x2ListFace
    | BoardCardBullet2x3ListFace;

export interface BoardCardBullet1x2ListFace {
    type: "bullet-list";
    canvas: "1x2";
    bullets: {
        "1x1": string;
        "1x2": string;
    }
}

export interface BoardCardBullet2x2ListFace {
    type: "bullet-list";
    canvas: "2x2";
    bullets: {
        "1x1": string;
        "2x1": string;
        "1x2": string;
        "2x2": string;
    }
}

export interface BoardCardBullet2x3ListFace {
    type: "bullet-list";
    canvas: "2x3";
    bullets: {
        "1x1": string;
        "2x1": string;
        "1x2": string;
        "2x2": string;
        "1x3": string;
        "2x3": string;
    }
}

//

import { YYMMDDDate } from "../../d-core/types/date.types";

export interface DailyboardPathConfig {
    minCategories?: number;
    maxCategories?: number;
    requireDate?: boolean;
}

export interface DailyboardPath {
    categories: string[];
    date: YYMMDDDate | null;
}

export interface DailyboardPathValidationResult {
    isValid: boolean;
    errors?: string[];
}