import { BoxStyle } from "@/src/modules/shared/types/style";
import { LayoutBase, LayoutSectionBase } from "./layout.base.types";

export interface LayoutStyle extends LayoutBase{
    box: BoxStyle;
    sections: LayoutSectionStyle[];
}

export interface LayoutSectionStyle extends LayoutSectionBase {
    box: BoxStyle;
    grid?: BoxStyle;
}

export type LayoutStyleContent = Omit<LayoutStyle, "sections">;

export type LayoutSectionStyleContent = LayoutSectionStyle;