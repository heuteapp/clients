import { GridRect } from "@/src/modules/shared/types/common";
import { CanvasBase, CanvasGridBase } from "./canvas.base.types";

export interface CanvasData extends CanvasBase {
    colCount: number;
    rowCount: number;
    grids: CanvasGridData[];
}

export interface CanvasGridData extends CanvasGridBase {
    position: GridRect;
}

//

export type CanvasDataContent = Omit<CanvasData, "grids">;

export type CanvasGridDataContent = CanvasGridData;