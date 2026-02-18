export interface Point {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

// (x, y) + (x + width, y + height)
export interface Rect extends Point, Size {}

// (x1, y1) + (x2, y2)
export interface Bounds {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

// like padding/margin
export interface Edges {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export type Alignment = "start" | "center" | "end";

export interface Placement {
    horizontal: Alignment;
    vertical: Alignment;
}

//

export interface UniqueData {
    id: string;
}

export type DataWithoutId<T extends UniqueData> = Omit<T, "id">;

export function assignData<T extends UniqueData>(data: DataWithoutId<T>, genId?: () => string): T {
    const id = genId ? genId() : crypto.randomUUID();

    return {
        id,
        ...data,
    } as T;
}

export function assignDataWithId<T extends UniqueData>(id: string, data: Omit<T, "id">): T {
    return {
        id,
        ...data,
    } as T;
}