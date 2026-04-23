import { GridRect } from "@/src/modules/shared/types/common";
import { CanvasBase, CanvasSectionBase } from "./canvas.base.types";

export interface CanvasData extends CanvasBase {
    colCount: number;
    rowCount: number;
    sections: CanvasSectionData[];
}

export interface CanvasSectionData extends CanvasSectionBase {
    position: GridRect;
}

//

export type CanvasDataContent = Omit<CanvasData, "sections">;

export type CanvasSectionDataContent = CanvasSectionData;