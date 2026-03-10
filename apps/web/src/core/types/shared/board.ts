import { GridRect } from "./common";
import { Identifier } from "./data";

export interface CardPlacement {
    sectionName: string;
    position: GridRect;
}

export interface CardPlacementById {
    sectionId: Identifier;
    position: GridRect;
}