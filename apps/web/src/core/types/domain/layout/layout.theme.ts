import { LayoutStyle, LayoutSectionStyle } from "@/src/core/types/domain/layout/layout.style";

export type LayoutThemeStore = LayoutThemeValue & {
    setState: (value: LayoutThemeValue) => void
} & LayoutThemeActions;

export interface LayoutThemeValue {
    layout: LayoutStyle | null;
    sections: LayoutSectionStyle[];
}

export type LayoutThemeActions = {

}