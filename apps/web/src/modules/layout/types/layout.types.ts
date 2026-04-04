import { GridRect } from "@/src/modules/shared/types/common";
import { LayoutBase, LayoutSectionBase } from "./layout.base.types";

export interface Layout extends LayoutBase {
    colCount: number;
    rowCount: number;
    sections: LayoutSection[];
}

export interface LayoutSection extends LayoutSectionBase {
    position: GridRect;
}

//

export type LayoutData = Omit<Layout, "sections">;

export type LayoutSectionData = Omit<LayoutSection, "">;