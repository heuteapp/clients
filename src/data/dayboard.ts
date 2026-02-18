import { GridSize, UniqueData, Bounds, assignDataWithId, DataWithoutId, Placement } from "./core";

export interface DayboardData {
    layout: DayboardLayoutData;
}

//

export interface DayboardLayoutData extends UniqueData {
    fields: DayboardFieldData[];
}

export function assignLayout(id: string, data: DataWithoutId<DayboardLayoutData>): DayboardLayoutData {
    const layout = assignDataWithId<DayboardLayoutData>(id, data);
    const ids = new Set<string>();

    for (const field of layout.fields) {
        if (ids.has(field.id)) {
            throw new Error(`Layout ${id} has duplicate field id: ${field.id}`);
        }
        ids.add(field.id);
    }

    return layout;
}

//

export interface DayboardFieldData extends UniqueData {
    grid: DayboardGridData;
    bounds: Bounds;
    placement?: Placement;
}

export function assignField(id: string, data: DataWithoutId<DayboardFieldData>): DayboardFieldData {
    return assignDataWithId<DayboardFieldData>(id, data);
}

//

export interface DayboardGridData extends GridSize {
}