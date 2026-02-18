import { HeuteObject, Bounds, GridSize, createObjectWithId, HeuteData, Alignment, ContentPlacement } from "./core";

export interface DayboardData extends HeuteObject {
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

export function createGrid(id: string, data: HeuteData<DayboardGridData>): DayboardGridData {
    return createObjectWithId<DayboardGridData>(id, data);
}

export function createLayout(id: string, data: HeuteData<DayboardLayoutData>): DayboardLayoutData {
    const layout = createObjectWithId<DayboardLayoutData>(id, data);
    const ids = new Set<string>();

    for (const grid of layout.grids) {
        if (ids.has(grid.id)) {
            throw new Error(`Layout ${id} has duplicate grid id: ${grid.id}`);
        }
        ids.add(grid.id);
    }

    return layout;
}