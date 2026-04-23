export interface CanvasBase {
    name: string;
    version: number;
    grids: CanvasGridBase[];
}

export interface CanvasGridBase {
    name: string;
}

//

export type CanvasBaseData = Omit<CanvasBase, "grids">;

export type CanvasGridBaseData = CanvasGridBase;