import { GridRect, GridSpan } from "@/src/modules/shared/types/common";

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