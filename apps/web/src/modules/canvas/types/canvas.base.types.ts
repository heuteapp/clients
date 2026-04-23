export interface CanvasBase {
    name: string;
    version: number;
    grids: CanvasGridBase[];
}

export interface CanvasGridBase {
    name: string;
}

//

export type CanvasBaseContent = Omit<CanvasBase, "grids">;

export type CanvasGridBaseContent = CanvasGridBase;