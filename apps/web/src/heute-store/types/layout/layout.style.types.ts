import { LayoutBaseState, StoredLayoutItem, StoredLayoutSectionItem } from "./layout.base.types";
import { LayoutSectionStyleContent, LayoutStyle, LayoutStyleContent } from "@/src/modules/layout/types/layout.style.types";

export interface LayoutStyleState extends LayoutBaseState<
    LayoutStyle, 
    StoredLayoutStyle, 
    StoredLayoutStyleContent,
    StoredLayoutSectionStyle,
    StoredLayoutSectionStyleContent> {

}

//

export interface StoredLayoutStyle extends StoredLayoutItem<StoredLayoutSectionStyle>, LayoutStyleContent {

}

export interface StoredLayoutSectionStyle extends StoredLayoutSectionItem, LayoutSectionStyleContent {

}

export type StoredLayoutStyleContent = Omit<StoredLayoutStyle, "sections">;

export type StoredLayoutSectionStyleContent = StoredLayoutSectionStyle;