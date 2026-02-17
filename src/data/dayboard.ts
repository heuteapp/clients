import { HeuteObject, Bounds, GridSize, createObject, HeuteData } from "./core";

export interface DayboardObject extends HeuteObject {
}

export interface DayboardGrid extends DayboardObject {
    size: GridSize;
    bounds: Bounds;
}

export interface DayboardLayout extends DayboardObject {
    grids: DayboardGrid[];
}

//

export function createGrid(data: HeuteData<DayboardGrid>): DayboardGrid {
    return createObject<DayboardGrid>(data);
}

export function createLayout(data: HeuteData<DayboardLayout>): DayboardLayout {
    return createObject<DayboardLayout>(data);
}