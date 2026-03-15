import { BoxStyle } from "@/src/core/types/shared/style";

export type LayoutStyle = {
    name: string;
    box: BoxStyle;
    sectionContainer?: LayoutSectionContainerStyle;
}

export type LayoutSectionContainerStyle = {
    box: BoxStyle;
}

export type LayoutSectionStyle = {
    name: string;
    box: BoxStyle;
    grid?: LayoutGridStyle;
}

export type LayoutGridStyle = {
    box: BoxStyle;
}