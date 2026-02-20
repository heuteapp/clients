import { UniqueData, Bounds, Placement, DataProps, createDataWithId } from "@heuteapp/common";
import { BoardGridModel } from "./boardGrid";

export interface BoardFieldModel extends UniqueData {
    grid: BoardGridModel;
    bounds: Bounds;
    placement?: Placement;
}

export function boardField(id: string, props: DataProps<BoardFieldModel>): BoardFieldModel {
    return createDataWithId<BoardFieldModel>(id, props);
}