import { HeuteObject, Bounds, GridSize, createObjectWithId, HeuteData } from "./core";

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

export function createGrid(id: string, data: HeuteData<DayboardGrid>): DayboardGrid {
    return createObjectWithId<DayboardGrid>(id, data);
}

export function createLayout(id: string, data: HeuteData<DayboardLayout>): DayboardLayout {
    const layout = createObjectWithId<DayboardLayout>(id, data);
    const ids = new Set<string>();
    
    for (const grid of layout.grids) {
        if (ids.has(grid.id)) {
            throw new Error(`Layout ${id} has duplicate grid id: ${grid.id}`);
        }
        ids.add(grid.id);
    }

    return layout;
}