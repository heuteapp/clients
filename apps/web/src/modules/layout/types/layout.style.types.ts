import { BoxStyle } from "@/src/modules/shared/types/style";

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