import { GridRect, GridSize } from "@/src/modules/shared/types/common";

export interface DailyboardEditableCardProps {
    initialRect: GridRect;
    minSpan: GridSize;
    maxSpan: GridSize;
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