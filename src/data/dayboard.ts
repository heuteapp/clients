import { Bounds } from "./core";

export interface DayboardObject {
    id: string;
}

export interface DayboardGridData {
    width: number;
    height: number;
    position: Bounds;
}

export interface DayboardLayoutData {
    grids: DayboardGrid[];
}

//

export interface DayboardGrid extends DayboardGridData, DayboardObject {
}

export interface DayboardLayout extends DayboardLayoutData, DayboardObject {
}