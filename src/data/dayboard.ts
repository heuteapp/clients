import { AbsolutePosition } from "./core";

export interface DayboardObject {
    id: string;
}

export interface DayboardGrid extends DayboardObject {
    width: number;
    height: number;
    position: AbsolutePosition;
}

export interface DayboardLayout extends DayboardObject {
    grids: DayboardGrid[];
}