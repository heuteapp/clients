import { GridRect } from "@/src/modules/shared/types/common";
import { LayoutBase, LayoutSectionBase } from "./layout.base.types";

export interface LayoutData extends LayoutBase {
    colCount: number;
    rowCount: number;
    sections: LayoutSectionData[];
}

export interface LayoutSectionData extends LayoutSectionBase {
    position: GridRect;
}

//

export type LayoutDataContent = Omit<LayoutData, "sections">;

export type LayoutSectionDataContent = LayoutSectionData;