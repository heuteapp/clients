import { LayoutData } from "@/src/modules/layout/types/layout.data.types";
import { LayoutBaseState, StoredLayoutItem, StoredLayoutRootItem, StoredLayoutSectionItem } from "./layout.base.types";
import { LayoutSectionStyle, LayoutStyle } from "@/src/modules/layout/types/layout.style.types";

export interface LayoutStyleState extends LayoutBaseState<LayoutStyle, StoredLayoutStyle, StoredLayoutRootStyle, StoredLayoutSectionStyle> {

}

//

export interface StoredLayoutStyle extends StoredLayoutItem, LayoutStyle {

}

export interface StoredLayoutRootStyle extends StoredLayoutStyle, StoredLayoutRootItem<StoredLayoutSectionStyle> {

}

export interface StoredLayoutSectionStyle extends StoredLayoutSectionItem, LayoutSectionStyle {
    layoutId: () => string;
}