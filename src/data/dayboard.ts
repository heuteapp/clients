import { UniqueData, Bounds, GridSize, assignDataWithId, DataWithoutId, ContentPlacement } from "./core";

export interface DayboardData extends UniqueData {
}

export interface DayboardGridData extends DayboardData {
    size: GridSize;
    bounds: Bounds;
    contentPlacement?: Partial<ContentPlacement>;
}

export interface DayboardLayoutData extends DayboardData {
    grids: DayboardGridData[];
}

//

export function assignGrid(id: string, data: DataWithoutId<DayboardGridData>): DayboardGridData {
    return assignDataWithId<DayboardGridData>(id, data);
}

export function assignLayout(id: string, data: DataWithoutId<DayboardLayoutData>): DayboardLayoutData {
    const layout = assignDataWithId<DayboardLayoutData>(id, data);
    const ids = new Set<string>();

    for (const grid of layout.grids) {
        if (ids.has(grid.id)) {
            throw new Error(`Layout ${id} has duplicate grid id: ${grid.id}`);
        }
        ids.add(grid.id);
    }

    return layout;
}