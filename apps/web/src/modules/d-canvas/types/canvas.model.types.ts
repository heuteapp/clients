import { GridRect } from "@/src/modules/d-shared/types/common";
import { CanvasBase, CanvasGridBase } from "./canvas.base.types";

export interface CanvasModel extends CanvasBase {
    colCount: number;
    rowCount: number;
    grids: CanvasGridModel[];
}

export interface CanvasGridModel extends CanvasGridBase {
    position: GridRect;
}

//

export type CanvasModelData = Omit<CanvasModel, "grids">;

export type CanvasGridModelData = Omit<CanvasGridModel, "">;