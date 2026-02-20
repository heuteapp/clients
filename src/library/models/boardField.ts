import { UniqueData, Bounds, Placement } from "@/src/library/base";
import BoardGridModel from "./boardGrid";

export interface DayboardFieldModel extends UniqueData {
    grid: BoardGridModel;
    bounds: Bounds;
    placement?: Placement;
}