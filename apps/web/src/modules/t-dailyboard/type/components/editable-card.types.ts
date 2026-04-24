import { GridRect, GridSpan } from "@/src/modules/d-core/types/common";

export interface DailyboardEditableCardProps {
    initialRect: GridRect;
    minSpan: GridSpan;
    maxSpan: GridSpan;
    cellStep: number;
}

export type ResizeMode = 
    | "move" 
    | "top" 
    | "bottom" 
    | "left" 
    | "right" 
    | "topLeft" 
    | "topRight" 
    | "bottomLeft" 
    | "bottomRight";