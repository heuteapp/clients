import { BoxStyle } from "@/src/modules/shared/types/style";
import { CanvasBase, CanvasGridBase } from "./canvas.base.types";

export interface CanvasStyle extends CanvasBase{
    box: BoxStyle;
    grids: CanvasGridStyle[];
}

export interface CanvasGridStyle extends CanvasGridBase {
    box: BoxStyle;
    grid?: BoxStyle;
}

export type CanvasStyleContent = Omit<CanvasStyle, "grids">;

export type CanvasGridStyleContent = CanvasGridStyle;