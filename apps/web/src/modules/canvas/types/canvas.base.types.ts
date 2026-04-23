export interface CanvasBase {
    name: string;
    version: number;
    sections: CanvasSectionBase[];
}

export interface CanvasSectionBase {
    name: string;
}

//

export type CanvasBaseContent = Omit<CanvasBase, "sections">;

export type CanvasSectionBaseContent = CanvasSectionBase;