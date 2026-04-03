import { GridRect } from "@/src/modules/shared/types/common";

export interface Layout {
    name: string;
    version: string;
    columnCount: number;
    rowCount: number;
    sections: LayoutSection[];
}

export interface LayoutSection {
    name: string;
    position: GridRect;
}

//

export type LayoutData = Omit<Layout, "sections">;

export type LayoutSectionData = Omit<LayoutSection, "">;