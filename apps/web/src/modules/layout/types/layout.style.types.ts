import { BoxStyle } from "@/src/modules/shared/types/style";
import { LayoutBase, LayoutSectionBase } from "./layout.base.types";

export interface LayoutStyle extends LayoutBase{
    box: BoxStyle;
}

export interface LayoutSectionStyle extends LayoutSectionBase {
    box: BoxStyle;
    grid?: BoxStyle;
}