export interface LayoutBase {
    name: string;
    version: number;
    sections: LayoutSectionBase[];
}

export interface LayoutSectionBase {
    name: string;
}

//

export type LayoutBaseContent = Omit<LayoutBase, "sections">;

export type LayoutSectionBaseContent = LayoutSectionBase;