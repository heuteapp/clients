import { BoxStyle } from "@/src/modules/shared/types/style";
import { CanvasBase, CanvasSectionBase } from "./canvas.base.types";

export interface CanvasStyle extends CanvasBase{
    box: BoxStyle;
    sections: CanvasSectionStyle[];
}

export interface CanvasSectionStyle extends CanvasSectionBase {
    box: BoxStyle;
    grid?: BoxStyle;
}

export type CanvasStyleContent = Omit<CanvasStyle, "sections">;

export type CanvasSectionStyleContent = CanvasSectionStyle;