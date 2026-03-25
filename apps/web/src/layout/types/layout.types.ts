import { GridRect } from "@/src/shared/types/common";

export interface Layout {
    columnCount: number
    rowCount: number
    sections: LayoutSection[];
}

export interface LayoutSection {
    name: string
    position: GridRect;
}

//

export type LayoutData = Omit<Layout, "sections">;

export type LayoutSectionData = Omit<LayoutSection, "">;