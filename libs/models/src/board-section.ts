import { GridSize, UniqueData, Bounds, Placement, DataProps, createDataWithId } from "@heuteapp/common";

export interface BoardSectionModel extends GridSize, UniqueData {
    bounds: Bounds;
    placement?: Placement;
}

export function boardField(id: string, props: DataProps<BoardSectionModel>): BoardSectionModel {
    return createDataWithId<BoardSectionModel>(id, props);
}