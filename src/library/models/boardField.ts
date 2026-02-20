import { UniqueData, Bounds, Placement, DataProps, assignDataWithId } from "@/src/library/base";
import BoardGridModel from "./boardGrid";

export interface BoardFieldModel extends UniqueData {
    grid: BoardGridModel;
    bounds: Bounds;
    placement?: Placement;
}

export default BoardFieldModel;

export function boardField(id: string, data: DataProps<BoardFieldModel>): BoardFieldModel {
    return assignDataWithId<BoardFieldModel>(id, data);
}